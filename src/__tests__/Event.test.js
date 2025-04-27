import React from 'react';
import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event />);
    });

    test('renders event title', async () => {
        const allEvents = await getEvents();
        const index = Math.floor(Math.random() * allEvents.length);
        const event = allEvents[index];

        EventComponent.rerender(<Event event={event} />);
        const eventTitle = event.summary;

        expect(EventComponent.queryByText(eventTitle)).toBeInTheDocument();
    });
});
