import React, { PureComponent } from 'react';
import { Logo } from '../../element/Logo';
import SelList from '../../element/SelList';
import './Navigator.css';
export class Navigator extends PureComponent {
    render() {
        return (
            <div id="Navigator">
                <div className="container">
                    <div className="logo_box">
                        <Logo option={this.props.option || ''}/>
                    </div>
                    <div className="sel_box">
                        <SelList/>
                    </div>
                </div>
            </div>
        );
    }
}