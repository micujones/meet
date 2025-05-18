import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    test('When the user opens the app, 32 events are rendered.', ({
        given,
        when,
        then,
    }) => {
        given("user hasn't opened the app", () => {});

        let AppComponent;
        when('user opens the app', async () => {
            AppComponent = render(<App />);
        });

        then('32 events are rendered', async () => {
            waitFor(() => {
                const eventListItems = screen.getAllByRole('listitem');
                expect(eventListItems).toHaveLength(32);
            });
        });
    });

    test('When user inputs a number, the list renders that number of events.', ({
        given,
        when,
        then,
    }) => {
        const user = userEvent.setup();
        let AppComponent;
        given("user hasn't typed a number", () => {
            AppComponent = render(<App />);
        });

        let currentNOE;
        when('user types a number in the input field', async () => {
            const NumberOfEventsComponent =
                AppComponent.container.querySelector('#number-of-events');
            const inputField = within(NumberOfEventsComponent).queryByRole(
                'textbox'
            );

            currentNOE = Math.floor(Math.random() * 31);
            await user.type(inputField, `{backspace}{backspace}${currentNOE}`);
        });

        then('the list renders the input value', async () => {
            waitFor(() => {
                const eventListItems = screen.getAllByRole('listitem');
                expect(eventListItems).toHaveLength(currentNOE);
            });
        });
    });
});
