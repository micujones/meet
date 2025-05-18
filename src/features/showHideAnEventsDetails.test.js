import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import Event from '../components/Event';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
    test("When the user hasn't clicked the 'show details' button, the details element is collapsed", ({
        given,
        when,
        then,
    }) => {
        let AppComponent;
        let AppDOM;
        let EventComponent;
        given("user hasn't clicked the 'show details' button", () => {});

        when('the user opens the app', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            EventComponent = AppDOM.querySelector('.event');
        });

        then("the event's details element is null", async () => {
            const allEvents = await getEvents();
            const event = allEvents[0];

            waitFor(() => {
                const detailsComponent = within(EventComponent).queryByText(
                    event.description
                );
                expect(detailsComponent).toBeNull();
            });
        });
    });

    test("When the user clicks the 'show details' button, the details element expands", ({
        given,
        when,
        then,
    }) => {
        let allEvents;
        let event;
        let EventComponent;
        let EventComponentDOM;

        let detailsElement;
        given('the details element is collapsed', async () => {
            allEvents = await getEvents();
            event = allEvents[0];
            EventComponent = render(<Event event={event} />);
            EventComponentDOM = EventComponent.container.firstChild;

            detailsElement = EventComponentDOM.querySelector('#details');
        });

        when("user clicks the 'show details' button", async () => {
            const user = userEvent.setup();
            const showDetailsButton =
                EventComponentDOM.querySelector('#show-details');

            await user.click(showDetailsButton);
        });

        then('the details element expands', () => {
            expect(detailsElement).toBeDefined();
        });
    });

    test("When the user clicks the 'hide details' button, the details element collapses", ({
        given,
        when,
        then,
    }) => {
        const user = userEvent.setup();

        let allEvents;
        let event;
        let EventComponent;
        let EventComponentDOM;

        let detailsElement;
        given('the details element is expanded', async () => {
            allEvents = await getEvents();
            event = allEvents[0];
            EventComponent = render(<Event event={event} />);
            EventComponentDOM = EventComponent.container.firstChild;

            detailsElement = EventComponentDOM.querySelector('#details');

            // User has clicked the 'Show Details' button
            const showDetailsButton =
                EventComponentDOM.querySelector('#show-details');

            await user.click(showDetailsButton);
        });

        when("user clicks the 'hide details' button", async () => {
            const hideDetailsButton =
                EventComponentDOM.querySelector('#hide-details');

            await user.click(hideDetailsButton);
        });

        then('the details element collapses', () => {
            expect(detailsElement).toBeNull();
        });
    });
});
