import React, {Component} from "react";
import "./EventList.css"
import {Header, Icon, List, Segment} from "semantic-ui-react";

export default class EventList extends Component {

    handleEventClick = event => {
        this.props.onEventClick(event);
    };

    render() {
        if (this.props.events.length) {
            return (
                <List className={"Panel-List"} divided relaxed>
                    {this.props.events.map((event, index) => (
                        <List.Item
                            key={index}
                            onClick={() => this.handleEventClick(event)}
                            className={event.hover ? 'event-item grey-background' : 'event-item'}
                        >
                            <List.Icon name='marker' size='large' verticalAlign='middle'/>
                            <List.Content>
                                <List.Header>{event.title}</List.Header>
                                <List.Description>{event.description}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>

            );
        } else {
            return (
                <Segment placeholder>
                    <Header icon>
                        <Icon name='search'/>
                        No events are listed for this search.
                    </Header>
                </Segment>
            );
        }
    }
}
