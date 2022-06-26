import React from "react";
import "./Button.scss";

export default class Button extends React.Component {
    render() {
        return (
            <a className="Links Button" href={this.props.href}>
                <div className="ButtonText">
                    <span>
                        {this.props.children}
                    </span>
                </div>
            </a>
        )
    }
}