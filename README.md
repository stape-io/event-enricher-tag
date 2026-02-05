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
- If you use the **same Event Name** as the triggering event: Add a new parameter (e.g., *is_enriched = true*) to the Event Data. Use this parameter to create a new trigger, add it as the firing trigger for this tag and as an exception trigger to the other tags.
  - **Example**:
    - If the triggering event is *conversion*, add the *is_enriched = true* parameter to the Event Data.
    - Create an Event Data variable for *is_enriched*.
    - Create a trigger and add the variable to it (e.g., *is_enriched equals undefined*).
    - Use this trigger as the firing trigger of this tag and as an exception trigger to the rest of the tags in the container.
- If you use a **different Event Name** than the triggering event, simply modify the event name and update any dependent tags to trigger off the new name.
  - **Example**:
    - If the triggering event is *conversion*, use *conversion_enriched* or any name other than *conversion*.
    - Update the event name in the triggers of all related tags to match the new one.

## Optional Settings

- **Copy Event Data** – If enabled, the tag will copy all parameters from the original Event Data and merge them with any additional parameters specified.
- **Convert Dot Notation Flat Parameter Into JSON** – If enabled, the tag will convert dot notation flat parameters into JSON. For example, if you define `user.email = 'test@example.com'` and enable this option, the tag will convert it to `{ user: { email: 'test@example.com' } }`.
- **Additional Event Data Parameters** – Add or overwrite specific parameters in the new event. For example, you can define `{ currency: 'USD', source: 'enricher' }` to enhance or replace data.

## Useful Resources
- [Step-by-step guide on how to configure Event Enricher tag](https://stape.io/helpdesk/documentation/event-enricher-tag)


## Open Source

The **Event Enricher Tag for GTM Server Side** is developed and maintained by the [Stape Team](https://stape.io/) under the Apache 2.0 license.
