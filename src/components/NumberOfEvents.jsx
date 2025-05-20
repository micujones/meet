import React from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events">Number of Events</label>
            <input
                type="text"
                defaultValue={32}
                placeholder="32"
                onChange={(e) => setCurrentNOE(e.currentTarget.value)}
            />
        </div>
    );
};

export default NumberOfEvents;
