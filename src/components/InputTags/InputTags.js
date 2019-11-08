import React, {Component} from "react"
import {WithContext as ReactTags} from 'react-tag-input';
import './InputTags.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class InputTags extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }

    handleDelete = i => {
        const {tags} = this.state;
        this.handleChange(tags.filter((tag, index) => index !== i));
    };

    handleAddition = tag => {
        const tags = [...this.state.tags, tag];
        this.handleChange(tags);
    };

    handleChange = (tags) => {
        this.setState({tags});
        const tagsArray = tags.map(tag => tag.text);
        this.props.onChange(tagsArray);
        console.log(tagsArray);
    };

    render() {
        let suggestions = this.props.suggestions || [];
        suggestions = suggestions.map(text => ({id: text, text}));

        const {tags} = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                           suggestions={suggestions}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           delimiters={delimiters}/>
            </div>
        )
    }
};
