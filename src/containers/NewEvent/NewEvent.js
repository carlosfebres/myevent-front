import React, {Component} from "react"
import {Divider, Form, Header, Message, Segment} from "semantic-ui-react";
import postData from "../../util/postData";
import InputTags from "../../components/InputTags/InputTags";


export default class NewEvent extends Component {

    state = {
        title: '',
        hashtags: [],
        description: ''
    };

    handleChange = (name, value) => this.setState({[name]: value});

    handleFormSubmit = async () => {
        const event = {
            title: this.state.title,
            description: this.state.description,
            hashtags: this.state.hashtags,
            coordinate: {
                lat: this.props.lat,
                lng: this.props.lng
            }
        };
        try {
            await postData(`${SERVER_URL}/event`, event);
            this.props.changeActionHandler("events");
        } catch (e) {
            alert("We can't add a new event at this moment");
        }
    };


    render() {

        return (
            <Segment>
                <Header>New Event</Header>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Input required fluid label='Title' placeholder='Title' value={this.state.title}
                                onChange={(e, {value}) => this.handleChange('title', value)}/>
                    <Form.TextArea required label='Description' placeholder='Tell us more about the event...'
                                   value={this.state.description}
                                   onChange={(e, {value}) => this.handleChange('description', value)}/>
                    <Divider/>
                    <Form.Field>
                        <label>Hashtags</label>
                        <InputTags
                            suggestions={this.props.hashtags}
                            onChange={hashtags => {
                                console.log(hashtags);
                                this.handleChange('hashtags', hashtags);
                            }}
                        />
                    </Form.Field>
                    <Divider/>
                    <Message>
                        Click on the map to selected the coordinates of the event.
                    </Message>
                    <Form.Group>
                        <Form.Input required readOnly width={8} label='Latitude' placeholder='0.0000'
                                    value={this.props.lat}/>
                        <Form.Input required readOnly width={8} label='Longitude' placeholder='0.0000'
                                    value={this.props.lng}/>
                    </Form.Group>
                    <Form.Button fluid>Submit</Form.Button>
                </Form>
            </Segment>
        );
    }

}
