const getAllEventData = require('getAllEventData');
const JSON = require('JSON');
const makeString = require('makeString');
const runContainer = require('runContainer');

/*==============================================================================
==============================================================================*/

const eventNames = [makeString(data.newEventName)];
if (data.emitMultipleEvents && data.additionalEventNames) {
  data.additionalEventNames.forEach((d) => eventNames.push(makeString(d.eventName)));
}

let newEventData = {};
const additionalEventDataParameters = data.additionalEventDataParameters;
if (additionalEventDataParameters) {
  additionalEventDataParameters.forEach((d) => {
    // Skip 'event_name' since it will be set from another input field.
    if (d.name === 'event_name') return;

    if (data.convertDotNotationFlatParameterIntoJSON) {
      const names = d.name.split('.');
      names.reduce((acc, name, index) => {
        const isLastKey = index === names.length - 1;
        if (isLastKey) acc[name] = d.value;
        else acc[name] = acc[name] || {};
        return acc[name];
      }, newEventData);
    } else {
      newEventData[d.name] = d.value;
    }
  });
}

if (data.copyCurrentEventData) {
  const currentEventData = getAllEventData();
  newEventData = mergeObjects(currentEventData, newEventData);
}

let runContainerOnCompleteCounter = 0;
eventNames.forEach((eventName) => {
  const eventDataCopy = JSON.parse(JSON.stringify(newEventData));
  eventDataCopy.event_name = eventName;
  // runContainer is called in parallel for each event name.
  runContainer(eventDataCopy, () => {
    // Calling data.gtmOnSuccess() inside the onComplete callback ensures proper execution.
    // Although sGTM's internal process waits for this function and related tags to finish
    // before completing execution, best practice dictates calling it here to maintain clarity,
    // and to avoid any undesired problems related to asynchronicity.
    if (++runContainerOnCompleteCounter === eventNames.length) {
      data.gtmOnSuccess();
    }
  });
});

/*==============================================================================
  Helpers
==============================================================================*/

function mergeObjects(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) target[key] = source[key];
  }
  return target;
}
