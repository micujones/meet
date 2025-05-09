import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents, index, event;

    beforeEach(async () => {
        EventComponent = render(<Event />);

        allEvents = await getEvents();
        index = Math.floor(Math.random() * allEvents.length);
        event = allEvents[index];

        EventComponent.rerender(<Event event={event} />);
    });

    // Rendering event card
    test('renders event title', async () => {
        expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
    });

    test('render event start time', async () => {
        expect(
            EventComponent.queryByText(event.start.dateTime)
        ).toBeInTheDocument();
    });

    test('render event location', async () => {
        expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
    });

    test('render show details button', () => {
        expect(
            EventComponent.container.querySelector('#show-details')
        ).toBeInTheDocument();
    });

    // Rendering details
    test("by default, event's details section should be hidden", () => {
        expect(EventComponent.container.querySelector('#details')).toBeNull();
    });

    test("shows the details section when the user clicks on the 'show details' button", async () => {
        const user = userEvent.setup();
        const showDetailsButton =
            EventComponent.container.querySelector('#show-details');

        await user.click(showDetailsButton);
        const detailsContainer =
            EventComponent.container.querySelector('#details');

        expect(detailsContainer).toBeVisible();
    });

    test("hides the 'show details' button after the user clicks it", async () => {
        const user = userEvent.setup();
        const showDetailsButton =
            EventComponent.container.querySelector('#show-details');

        await user.click(showDetailsButton);

        expect(showDetailsButton).not.toBeVisible();
    });

    test("hides the details section when the user clicks on the 'hide details' button", async () => {
        const user = userEvent.setup();
        const showDetailsButton =
            EventComponent.container.querySelector('#show-details');

        await user.click(showDetailsButton);
        const detailsContainer =
            EventComponent.container.querySelector('#details');
        const hideDetailsButton =
            EventComponent.container.querySelector('#hide-details');

        await user.click(hideDetailsButton);

        expect(detailsContainer).not.toBeVisible();
    });

    test("shows the 'show details' button after the user clicks the 'hide details' button", async () => {
        const user = userEvent.setup();
        const showDetailsButton =
            EventComponent.container.querySelector('#show-details');

        await user.click(showDetailsButton);
        const hideDetailsButton =
            EventComponent.container.querySelector('#hide-details');

        await user.click(hideDetailsButton);

        expect(showDetailsButton).toBeVisible();
    });
});
