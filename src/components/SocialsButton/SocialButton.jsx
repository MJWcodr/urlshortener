import React from "react";

export default class SocialButton extends React.Component {
    render() {
        return (
            <div class="round-box">
                <a class="social-container" href={this.props.href}>
                    {this.props.children}
                </a>
            </div>
        )
    }
}