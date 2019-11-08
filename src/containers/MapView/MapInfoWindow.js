import React from "react";

export default (props) => {
    const eventTitle = props.event;
    const eventDetails = props.details;

    const infoWindowStyle = {
        position: 'relative',
        bottom: 100,
        left: '-15px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    };

    return (
        <div style={infoWindowStyle}>
            <div style={{fontSize: 16}}>
                {eventTitle}
            </div>
            <p>{eventDetails}</p>
        </div>
    );
};
