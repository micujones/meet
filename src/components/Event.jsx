import React from 'react';

const Event = ({ event }) => {
    return (
        <li>
            <h2 id="summary">{event ? event.summary : null}</h2>
        </li>
    );
};

export default Event;
