# Meet App

A serverless application for users to find events in various locations.

## Features in User Stories (Gherkin's)

**Scenario 1**
User can show and hide details about an event.

-   Given an event is in the list;
-   When user clicks a show or hide details button;
-   Then details about the event expand or collapse, accordingly.

**Scenario 2**
User can specify the number of events viewed.

-   Given any number of events are loaded;
-   When user selects a number of events to display;
-   Then more or fewer events in the events list are displayed.

**Scenario 3**
User can use the app when offline.

-   Given user is offline _and_ wants to find events;
-   When user opens app;
-   Then user sees the events viewed when last online.

**Scenario 4**
User can add the app shortcut to home screen.

-   Given user is on their OS home screen;
-   When user chooses to add a shortcut to the home screen;
-   Then the app icon should appear on the device's home screen _and_ open the app when clicked.

**Scenario 5**
User can see a chart showing the upcoming events in each city.

-   Given the app has data about events in different cities;
-   When user opens the app;
-   Then events are organized into a chart, sorted by city.
