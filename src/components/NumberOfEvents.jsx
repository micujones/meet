import React from 'react';

const NumberOfEvents = () => {
    return (
        <div>
            <label htmlFor="number-of-events">Number of Events</label>
            <input
                id="number-of-events"
                type="text"
                defaultValue={32}
                placeholder="32"
            />
        </div>
    );
};

export default NumberOfEvents;
