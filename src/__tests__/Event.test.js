import React from 'react';
import { render } from '@testing-library/react';
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
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    });
});
