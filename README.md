# Event Enricher Tag for Google Tag Manager Server Side

The **Event Enricher Tag** is a custom tag template for the Google Tag Manager (GTM) Server container. It allows you to **modify and re-run events** within the same container execution, enabling enhanced data transformation, cleaner logic, and more flexibility when building advanced server-side setups.

This tag is useful when you want to:
- Enrich Event Data before it reaches other tags.
- Change the event name to be used in triggers or analytics.
- Use transformed variable data in other variables and/or triggers without triggering additional unwanted requests.

## Getting Started

1. Add the **Event Enricher Tag by Stape** to your GTM server container.
2. Configure the **New Event Name** – this is how the enriched event will be identified.
3. Choose whether to **copy the existing Event Data** from the original event.
4. Define **additional parameters** that should be added or overwritten in the new event.
5. Set up triggers that use the enriched event for further tag execution.

## Required Field

- **New Event Name** – The new name assigned to the event. **Important**: Do not use the same name as the triggering event to avoid infinite loops.
  Example: If the original event is `conversion`, use something like `conversion_enriched`.

## Optional Settings

- **Copy Event Data** – If enabled, the tag will copy all parameters from the original Event Data and merge them with any additional parameters specified.
- **Additional Event Data Parameters** – Add or overwrite specific parameters in the new event. For example, you can define `{currency: 'USD', source: 'enriched'}` to enhance or replace data.

## Open Source

The **Event Enricher Tag for GTM Server Side** is developed and maintained by the [Stape Team](https://stape.io/) under the Apache 2.0 license.
