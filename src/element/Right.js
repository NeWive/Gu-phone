import React, { PureComponent } from 'react';
import './Right.css';

class Right extends PureComponent {
    render() {
        return (
            <div className="right">
                <div className="short_edge"/>
                <div className="long_edge"/>
            </div>
        )
    }
}

export default Right;