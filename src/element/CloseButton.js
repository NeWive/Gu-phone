import React, { PureComponent } from 'react';
import './CloseButton.css';

export class CloseButton extends PureComponent {
    render() {
        return (
            <div id="CloseButton" onClick={this.props.clickHandler || null}>
                <div className="close_button_box">
                    <div className="edge" style={this.props.style || {}}/>
                    <div className="edge" style={this.props.style || {}}/>
                </div>
            </div>
        );
    }
}