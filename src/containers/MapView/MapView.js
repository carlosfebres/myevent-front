import React, {Component} from "react"
import GoogleMap from 'google-map-react';
import "./MapView.css";
import Marker from "./Marker";

export default class MapView extends Component {

    onChildClickCallback = (key) => {
        this.props.events[key].showWindow = !this.props.events[key].showWindow;
    };

    onMarkerHover = () => {
        this.props.hoverHandler();
    };

    handleMapClick = (eventData) => {
        this.props.onMapClick(eventData)
    };

    render() {
        const isNewEvent = this.props.action === "newEvent";

        const eventMarkers = this.props.events.map(
            (event, index) => <Marker
                key={index}
                lat={event.coordinate.lat}
                lng={event.coordinate.lng}
                event={event}
                onHover={this.onMarkerHover}
            />
        );

        let markerForSelection;
        if (isNewEvent && this.props.selectedCoordinates.lat) {
            markerForSelection = <Marker
                key={1}
                lat={this.props.selectedCoordinates.lat}
                lng={this.props.selectedCoordinates.lng}
            />
        }

        return (
            <div
                className="Map">
                <GoogleMap
                    bootstrapURLKeys={{key: 'AIzaSyCmavOiZeF5kEoMHXX-cTMoWIEl7cleRaE'}}
                    defaultCenter={this.props.center}
                    center={this.props.center}
                    defaultZoom={this.props.zoom}
                    zoom={this.props.zoom}
                    className="Map"
                    hoverDistance={20}
                    onChildClick={this.onChildClickCallback}
                    onClick={this.handleMapClick}
                >
                    {!isNewEvent && eventMarkers}
                    {isNewEvent && markerForSelection}
                </GoogleMap>
            </div>
        );
    }
}
