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
                    <span>Contribute the future </span>
                </div>
                <div className="info_box">
                    {
                        groupInfoList.map((item, index) => (
                            <p key={index}>
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