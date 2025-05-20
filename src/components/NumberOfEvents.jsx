import React from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const handleInputChange = (value) => {
        const errorText = 'Only positive numbers are allowed';
        if (isNaN(value) || value < 0) {
            setErrorAlert(errorText);
        } else {
            setErrorAlert('');
            setCurrentNOE(value);
        }
    };

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events">Number of Events</label>
            <input
                type="text"
                defaultValue={32}
                placeholder="32"
                onChange={(e) => handleInputChange(e.currentTarget.value)}
            />
        </div>
    );
};

export default NumberOfEvents;
