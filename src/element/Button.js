import React, { PureComponent } from 'react';
import './Button.css';
class Button extends PureComponent {
    render() {
        return (
            <button className={`button_blue`}
                    onClick={this.props.clickHandler || null}
                    type={`button`}
                    style={this.props.style || {}}
                    key={this.props.va? this.props.va: ''}
                    >
                {
                    this.props.value
                }
                {
                    this.props.children
                }
            </button>
        )
    }
}

export {
    Button
}
