import React, { PureComponent } from 'react';
import './Loading.css';

class Loading extends PureComponent {
    render() {
        return (
            <div className="loader">
                <div className="loader-inner">
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading;