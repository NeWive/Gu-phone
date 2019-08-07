import React from 'react';
import { Logo } from '../../element/Logo';
import { groupInfoList } from "../../config/list.config";
import './IndexFooter.css';

function IndexFooter() {
    return (
        <div id="IndexFooter">
            <div className="container">
                <div className="logo_box">
                    <Logo/>
                    <div className="other">
                        <span>  · Contribute the future </span>
                    </div>
                </div>
                <div className="info_box">
                    {
                        groupInfoList.map((item, index) => (
                            <p key={index} style={index === 3 ? {
                                marginBottom: 10,
                            } : {}}>
                                {
                                    item
                                }
                            </p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default IndexFooter;