import React, { PureComponent } from 'react';
import './Input.css';
class Input extends PureComponent {
    render() {
        return (
            <input
                type={this.props.inputType || 'input'}
                className={'join_us_input'}
                placeholder={this.props.placeHolder || ''}
                style={this.props.css || {}}
                id={this.props.id}
                onChange={this.props.changeHandler || ''}
                />
        )
    }
}

export default Input;