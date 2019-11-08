import React, {Component} from "react";
import {Button, Divider, Message, Segment} from "semantic-ui-react";
import {emitEventSearch} from "../../util/socket";
import EventList from "../EventList/EventList";

export default class HashtagList extends Component {

    state = {
        hashtags: this.props.hashtags.map(hashtag => ({
            text: hashtag,
            selected: false
        }))
    };

    handleHashtagClick = hashtag => {
        hashtag.selected = !hashtag.selected;
        this.setState({
            hashtags: this.state.hashtags
        });

        const hashtagSelectedNames = this.state.hashtags
            .filter(obj => obj.selected)
            .map(obj => obj.text);

        console.log(hashtagSelectedNames);
        emitEventSearch(hashtagSelectedNames);
    };

    render() {
        return (
            <Segment>
                <Message>Select which hashtags you what search for.</Message>
                {this.state.hashtags.map((hashtag, index) => (
                    <Button
                        key={index}
                        size={'tiny'}
                        compact
                        positive={hashtag.selected}
                        onClick={() => this.handleHashtagClick(hashtag)}
                    >{hashtag.text}</Button>
                ))}
                <Divider/>
                <EventList
                    onEventClick={this.props.onEventClick}
                    events={this.props.events}
                />
            </Segment>
        );
    }

}
