import React from 'react';

const Event = ({ event }) => {
    return (
        <li>
            {event ? (
                <>
                    <h2 id="summary">{event.summary}</h2>
                    <p id="start-time">{event.start.dateTime}</p>
                </>
            ) : null}
        </li>
    );
};

export default Event;
