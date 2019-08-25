import React from 'react';
import Navigator from './Index/Navigator';
import IndexBody from './Index/IndexBody';
import './Index.css';

function Index() {
    return (
        <div id={'Index'}>
            <div className="navigator_box">
                <Navigator/>
            </div>
            <div className="index_body_box">
                <IndexBody/>
            </div>
        </div>
    );
}

export default Index;