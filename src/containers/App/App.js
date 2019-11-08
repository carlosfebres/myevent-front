import React, {Component} from 'react';
import logo from '../../images/logo.svg';
import {emitEventSearch, emitRefreshHashtags, eventList, hashtagList, refreshEvents} from "../../util/socket";
import {Header} from "semantic-ui-react";
import FloatingContainer from "../../components/FlotingContainer/FloatingContainer";
import MapView from "../MapView/MapView";
import MainPanel from "../MainPanel/MainPanel";
import './App.css';

export const SERVER_URL = "http://localhost:3000"

class App extends Component {

    state = {
        mapCenter: {
            lat: 12.2122,
            lng: 54.954
        },
        mapZoom: 3,
        events: [],
        hashtags: [],
        action: "events"
    };

    constructor(props) {
        super(props);

        refreshEvents.subscribe(this.searchEvents);
        eventList.subscribe(this.handleEvents);
        hashtagList.subscribe(this.handleHashtags);

        this.searchEvents();
    }

    searchEvents = () => {
        let hashtags = this.state.hashtags
            .filter(hashtag => hashtag.selected)
            .map(hashtag => hashtag.name);
        if (!hashtags) {
            hashtags = this.state.hashtags
                .map(hashtag => hashtag.name);
        }

        emitEventSearch(hashtags);
        emitRefreshHashtags();
    };

    handleEvents = (events) => {
        this.setState({
            events
        })
    };

    handleHashtags = hashtags => {
        console.log(hashtags);
        this.setState({
            hashtags
        })
    };

    handleHoverEvent = () => {
        this.handleEvents(this.state.events);
    };

    handleActionChange = action => {
        this.setState({
            action
        });
        if (action === "newEvent") {
            this.setState({
                selectedCoordinates: {
                    lat: '',
                    lng: ''
                }
            })
        }
    };

    handleMapClick = coordinates => {
        this.setState({
            selectedCoordinates: coordinates
        })
    };

    handleEventClick = event => {
        this.setState({
            mapCenter: event.coordinate,
            mapZoom: 13
        })
    };

    render() {
        return (
            <>
                <header className="App-header">
                    <Header as="h3" image={logo} content="My Events" color="teal"/>
                </header>

                <FloatingContainer
                    left={<MainPanel
                        mainAction={this.state.action}
                        onActionChange={this.handleActionChange}
                        onEventClick={this.handleEventClick}
                        events={this.state.events}
                        selectedCoordinates={this.state.selectedCoordinates}
                        hashtags={this.state.hashtags}
                    />}
                    right={<MapView
                        center={this.state.mapCenter}
                        zoom={this.state.mapZoom}
                        action={this.state.action}
                        onMapClick={this.handleMapClick}
                        hoverHandler={this.handleHoverEvent}
                        events={this.state.events}
                        selectedCoordinates={this.state.selectedCoordinates}
                    />}
                />
            </>
        );
    }
}

export default App;
