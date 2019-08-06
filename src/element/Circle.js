import React, { PureComponent } from 'react';
import './Circle.css';

class Circle extends PureComponent {
    render() {
        return (
            <div className="circle" style={this.props.style || {}}>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default Circle;