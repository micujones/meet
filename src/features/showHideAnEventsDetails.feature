# Feature: Filter events by city
#     Scenario: When user hasn't searched for a city, show upcoming events from all cities.
#         Given user hasn't searched for any city
#         When the user opens the app
#         Then the user should see the list of all upcoming events.

Feature: Show and hide event details
    Scenario: When the user hasn't clicked the 'show details' button, the details element is collapsed
        Given user hasn't clicked the 'show details' button
        When the user opens the app
        Then the event's details element is null

        Scenario: When the user clicks the 'show details' button, the details element expands
            Given the details element is collapsed
            When user clicks the 'show details' button
            Then the details element expands

        Scenario: When the user clicks the 'hide details' button, the details element collapses
            Given the details element is expanded
            When user clicks the 'hide details' button
            Then the details element collapses