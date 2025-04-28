import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

import { getEvents } from './api';

function App() {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32); // NOE = number of events

    const fetchData = async () => {
        const allEvents = await getEvents();
        setEvents(allEvents.slice(0, currentNOE));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <CitySearch />
            <NumberOfEvents />
            <EventList events={events} />
        </div>
    );
}

export default App;
