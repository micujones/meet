import React from 'react';
import { useState } from 'react';

const Event = ({ event }) => {
    const [detailsDisplay, setDetailsDisplay] = useState('none');

    const handleDetailsDisplay = () => {
        const showButton = document.getElementById('show-details');

        if (detailsDisplay === 'none') {
            showButton.style.display = 'none';
            setDetailsDisplay('block');
        } else {
            showButton.style.display = 'block';
            setDetailsDisplay('none');
        }
    };

    return (
        <li>
            {event ? (
                <>
                    <div className="event">
                        <div id="general-info">
                            <h2 id="summary">{event.summary}</h2>
                            <p id="start-time">{event.start.dateTime}</p>
                            <p id="location">{event.location}</p>
                            <button
                                className="details-btn"
                                id="show-details"
                                onClick={handleDetailsDisplay}
                            >
                                Show Details
                            </button>
                        </div>
                        <div
                            id="details"
                            style={{ display: `${detailsDisplay}` }}
                        >
                            <h3>About event:</h3>
                            <p id="description">{event.description}</p>
                            <button
                                className="details-btn"
                                id="hide-details"
                                onClick={handleDetailsDisplay}
                            >
                                Hide Details
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
        </li>
    );
};

export default Event;
