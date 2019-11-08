import React, {Component} from "react";
import {Divider, Responsive} from "semantic-ui-react";
import "./FloatingContainer.css";

export default class FloatingContainer extends Component {

    render() {
        return (
            <>
                <Responsive minWidth={700}>
                    <div className={"floating-container"}>
                        <div className={"floating-section floating-left"}>{this.props.left}</div>
                        <div className={"floating-section"}>{this.props.right}</div>
                    </div>
                </Responsive>
                <Responsive maxWidth={699}>
                    {this.props.left}
                    <Divider/>
                    {this.props.right}
                </Responsive>
            </>
        );
    }

}
