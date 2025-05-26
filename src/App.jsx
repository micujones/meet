import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventList from './components/EventList';

import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import { extractLocations, getEvents } from './api';

import './App.css';

function App() {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32); // NOE = number of events
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState('See all cities');

    // Alerts
    const [infoAlert, setInfoAlert] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [warningAlert, setWarningAlert] = useState('');

    useEffect(() => {
        if (navigator.onLine) {
            setWarningAlert('');
        } else {
            setWarningAlert(
                'Warning! You are offline. Current list may not be up-to-date.'
            );
        }
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
            <h1>Meet App</h1>
            <div className="alerts-container">
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
                {warningAlert.length ? (
                    <WarningAlert text={warningAlert} />
                ) : null}
            </div>
            <p style={{ paddingTop: '12px' }}>Search for events by city</p>
            <CitySearch
                allLocations={allLocations}
                setCurrentCity={setCurrentCity}
                setInfoAlert={setInfoAlert}
            />
            <NumberOfEvents
                setCurrentNOE={setCurrentNOE}
                setErrorAlert={setErrorAlert}
            />
            <CityEventsChart allLocations={allLocations} events={events} />
            <EventList events={events} />
        </div>
    );
}

export default App;
