import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert } from './components/Alert';

import { extractLocations, getEvents } from './api';

import './App.css';

function App() {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32); // NOE = number of events
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState('See all cities');

    // Alerts
    const [infoAlert, setInfoAlert] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentCity, currentNOE]);

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
        <div className="App">
            <div className="alerts-container">
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
            </div>
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
                setInfoAlert={setInfoAlert}
            />
            <NumberOfEvents setCurrentNOE={setCurrentNOE} />
            <EventList events={events} />
        </div>
    );
}

export default App;
