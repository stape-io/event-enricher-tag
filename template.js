const getAllEventData = require('getAllEventData');
const makeString = require('makeString');
const runContainer = require('runContainer');

/**********************************************************************************************/

let newEventData = {
  event_name: makeString(data.newEventName)
};

// Override with Event Data parameters from template fields.
const additionalEventDataParameters = data.additionalEventDataParameters;
if (additionalEventDataParameters) {
  additionalEventDataParameters.forEach((d) => {
    // Skip 'event_name' since it has already been set from another input field.
    if (d.name !== 'event_name') newEventData[d.name] = d.value;
  });
}

if (data.copyCurrentEventData) {
  const currentEventData = getAllEventData();
  newEventData = mergeObjects(currentEventData, newEventData);
}

runContainer(newEventData, () => {
  // Calling data.gtmOnSuccess() inside the onComplete callback ensures proper execution.
  // Although sGTM's internal process waits for this function and related tags to finish
  // before completing execution, best practice dictates calling it here to maintain clarity,
  // and to avoid any undesired problems related to asynchronicity.
  data.gtmOnSuccess();
});

/**********************************************************************************************/

function mergeObjects(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) target[key] = source[key];
  }
  return target;
}
