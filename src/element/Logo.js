import React, { PureComponent } from 'react';
import './Logo.css'
export class Logo extends PureComponent {
    render() {
        return (
            <div id="Logo">
                <div className="icon_box">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>
                <div className="name_box">
                    <p className={`Eng${this.props.option || ''}`}>ITStudio</p>
                    <p className={`CN${this.props.option || ''}`}>爱特工作室</p>
                </div>
            </div>
        )
    }
}