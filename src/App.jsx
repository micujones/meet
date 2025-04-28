import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

import { extractLocations, getEvents } from './api';

function App() {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32); // NOE = number of events
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState('See all cities');

    useEffect(() => {
        fetchData();
    }, [currentCity]);

    const fetchData = async () => {
        const allEvents = await getEvents();
        const filteredEvents =
            currentCity === 'See all cities'
                ? allEvents
                : allEvents.filter((event) => event.location === currentCity);

        // setCurrentNOE(filteredEvents.length);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
    };

    return (
        <div>
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
            />
            <NumberOfEvents />
            <EventList events={events} />
        </div>
    );
}

export default App;
