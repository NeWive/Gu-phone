import React, { PureComponent } from 'react';
import './Button.css';
class Button extends PureComponent {
    render() {
        return (
            <button className={`button_blue`}
                    onClick={this.props.clickHandler || null}
                    type={`button`}
                    style={this.props.style || {}}
                    >
                { this.props.value }
            </button>
        )
    }
}

export {
    Button
}
