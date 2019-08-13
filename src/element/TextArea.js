import React, { PureComponent } from 'react';
import './TextArea.css';
class TextArea extends PureComponent {
    render() {
        return (
            <textarea
                className={'join_us_textarea'}
                placeholder={this.props.placeHolder || ''}
                onChange={this.props.changeHandler || (() =>{})}
                id={this.props.id}
                style={this.props.style}
            />
        )
    }
}
export default TextArea;