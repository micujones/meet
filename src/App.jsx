import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

function App() {
    return (
        <div>
            <CitySearch />
            <NumberOfEvents />
            <EventList />
        </div>
    );
}

export default App;
