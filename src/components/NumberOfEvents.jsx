import React from 'react';

const NumberOfEvents = () => {
    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events">Number of Events</label>
            <input type="text" defaultValue={32} placeholder="32" />
        </div>
    );
};

export default NumberOfEvents;
