# Event Enricher Tag for Google Tag Manager Server Side

The **Event Enricher Tag** is a custom tag template for the Google Tag Manager (GTM) Server container. It allows you to **modify and re-run events** within the same container execution, enabling enhanced data transformation, cleaner logic, and more flexibility when building advanced server-side setups.

This tag is useful when you want to:
- Enrich Event Data before it reaches other tags.
- Change the event name to be used in triggers or analytics.
- Use transformed variable data in other variables and/or triggers without triggering additional unwanted requests (such as requests triggered by Transformations that sometimes evaluate variables that produce HTTP requests multiple times).
- Evaluate variables that contain heavy logic and are referenced in multiple other entities only a single time for container performance optimization.


## Getting Started

1. Add the **Event Enricher Tag by Stape** to your GTM server container.
2. Configure the **New Event Name** – this is how the enriched event will be identified.
3. Choose whether to **copy the existing Event Data** from the original event.
4. Define **additional parameters** that should be added or overwritten in the new event.
5. Set up triggers that use the enriched event for further tag execution.

## Required Field

- **New Event Name** – The new name assigned to the event.

⚠️ **Important**: To prevent an infinite loop in your container, use one of the following techniques:
- If you use the **_same Event Name_** as the triggering event: Add a new parameter (e.g., *`is_enriched` = true*) to the Event Data. Use this parameter to create a new trigger, add it as the firing trigger for this tag and as an exception trigger to the other tags.
  - **Example**:
    - If the triggering event is *conversion*, add the *`is_enriched` = true* parameter to the Event Data.
    - Create an Event Data variable for *`is_enriched`*.
    - Create a trigger and add the variable to it (e.g., *`is_enriched` equals `undefined`*).
    - Use this trigger as the firing trigger of this tag and as an exception trigger to the rest of the tags in the container.
- If you use a **_different Event Name_** than the triggering event, simply modify the event name and update any dependent tags to trigger off the new name.
  - **Example**:
    - If the triggering event is *conversion*, use *conversion_enriched* or any name other than *conversion*.
    - Update the event name in the triggers of all related tags to match the new one.

### Additional configuration for GA4 Advanced Consent Mode
<details>
<summary>⬇️ Click to learn more ⬇️</summary>
<br/>

When using **GA4 Advanced Consent** mode, additional trigger configuration is required.

GA4 includes a special parameter called `x-ga-gcu` in events that are redispatched after the user's consent status changes from **denied** to **granted**. When server-side GTM receives these redispatched events, it only fires **Google-related tags** (GA4, Google Ads, Floodlight, and Conversion Linker) — all other tags, including the Event Enricher, are suppressed. This means the enrichment logic won't run, and downstream tags that depend on the enriched event won't receive the modified data.

To ensure correct behavior, configure triggers so that downstream tags can still fire for these consent-update events. See [Simo Ahava's article on automatic hits to sGTM after consent is granted](https://www.simoahava.com/gtmtips/automatic-page-view-hits-to-sgtm-after-consent-granted/) for more background.

**If using the _same Event Name_ option:**
- Create an Event Data variable for `x-ga-gcu`.
- Add it as a condition to the trigger that is used both as a firing trigger for this tag and as an exception trigger for other tags.
- The condition should be: *`x-ga-gcu` equals `undefined`*.
- Adapt the logic to your specific needs.

**If using the _different Event Name_ option:**
- Create a new trigger with the same conditions as the existing one, **except**:
  - The event name must be the **original** event name (not the enriched one), since the Event Enricher tag won't fire for these events.
  - Add an extra condition: *`x-ga-gcu` does not equal `undefined`*.
- Add this new trigger as a firing trigger to the Google-related tags.
- Adapt the logic to your specific needs.

This ensures that events collected before consent are correctly processed when redispatched, preserving attribution in GA4 and proper functioning of other platforms.

</details>

## Optional Settings

- **Copy Event Data** – If enabled, the tag will copy all parameters from the original Event Data and merge them with any additional parameters specified.
- **Convert Dot Notation Flat Parameter Into JSON** – If enabled, the tag will convert dot notation flat parameters into JSON. For example, if you define `user.email = 'test@example.com'` and enable this option, the tag will convert it to `{ user: { email: 'test@example.com' } }`.
- **Additional Event Data Parameters** – Add or overwrite specific parameters in the new event. For example, you can define `{ currency: 'USD', source: 'enricher' }` to enhance or replace data.

## Useful Resources
- [Step-by-step guide on how to configure Event Enricher tag](https://stape.io/helpdesk/documentation/event-enricher-tag)


## Open Source

The **Event Enricher Tag for GTM Server Side** is developed and maintained by the [Stape Team](https://stape.io/) under the Apache 2.0 license.
