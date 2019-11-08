import React, {Component} from "react"
import './MainPanel.css'
import {Menu, Segment} from "semantic-ui-react";
import HashtagList from "../HashtagList/HashtagList";
import NewEvent from "../NewEvent/NewEvent";
import EventList from "../EventList/EventList";
import {emitEventSearch} from "../../util/socket";

export default class MainPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: props.mainAction
        }
    }

    handleChangeAction = (name) => {
        this.setState({activeItem: name});
        this.props.onActionChange(name);
        emitEventSearch();
    };

    render() {
        return (
            <>
                <Menu pointing widths={3} className={"no-margin"}>
                    {['events', 'hashtags', 'newEvent'].map((button, index) => (
                        <Menu.Item
                            key={index}
                            name={button}
                            active={this.state.activeItem === button}
                            onClick={(e, {name}) => this.handleChangeAction(name)}
                        />
                    ))}
                </Menu>
                <Segment className={"scrollable no-margin no-padding"}>
                    {this.state.activeItem === 'events' && (
                        <EventList
                            onEventClick={this.props.onEventClick}
                            events={this.props.events}
                        />
                    )}
                    {this.state.activeItem === 'hashtags' && (
                        <HashtagList
                            events={this.props.events}
                            onEventClick={this.props.onEventClick}
                            hashtags={this.props.hashtags}
                        />
                    )}
                    {this.state.activeItem === 'newEvent' && (
                        <NewEvent
                            hashtags={this.props.hashtags}
                            changeActionHandler={this.handleChangeAction}
                            lat={this.props.selectedCoordinates.lat}
                            lng={this.props.selectedCoordinates.lng}
                        />
                    )}
                </Segment>
            </>
        );
    }

}
