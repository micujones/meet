Feature: Render number of events based on user input.
    Scenario: When the user opens the app, 32 events are rendered.
        Given user hasn't opened the app
        When user opens the app
        Then 32 events are rendered
    Scenario: When user inputs a number, the list renders that number of events.
        Given user hasn't typed a number
        When user types a number in the input field
        Then the list renders the input value