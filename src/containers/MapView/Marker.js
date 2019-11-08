import React, {Fragment} from "react";
import MapInfoWindow from "./MapInfoWindow";

export default (props) => {

    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: props.$hover ? 12 : 10,
        width: props.$hover ? 12 : 10,
        backgroundColor: 'red',
        cursor: 'pointer',
        zIndex: 10,
    };

    if (props.event) {
        if (props.event.hover !== props.$hover) {
            props.event.hover = props.$hover;
            props.onHover(props.event, props.$hover);
        }
        markerStyle.backgroundColor = props.event.showWindow ? 'red' : 'blue';
    }

    return (
        <Fragment>
            <div style={markerStyle}/>
            {props.event && props.event.showWindow &&
            <MapInfoWindow event={props.event.title} details={props.event.description}/>}
        </Fragment>
    );
};
