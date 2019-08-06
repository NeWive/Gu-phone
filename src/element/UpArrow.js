import React, { PureComponent } from 'react';
import './UpArrow.css';
export class UpArrow extends PureComponent {
    render() {
        return (
            <div id="UpArrow">
                <div className="left edge"/>
                <div className="right edge"/>
            </div>
        )
    }
}