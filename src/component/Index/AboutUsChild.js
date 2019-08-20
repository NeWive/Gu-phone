import React, { PureComponent } from 'react';
import ElementPanel from '../../element/ElementPanel';
import { aboutUsDetail } from "../../config/style.config";
import { featuresList } from "../../config/list.config";
import './AboutUsChild.css';

class AboutUsChild extends PureComponent {
    render() {
        return (
            <div id="AboutUsChild">
                {
                    featuresList.map((item, index) => (
                        <ElementPanel style={aboutUsDetail} key={item.key} name={item.key}>
                            <div className="up" key={item.key}>
                                <div className={`left left${index}`}/>
                                <div className="right">
                                    <div className="title">
                                        <span>
                                            {
                                                item.title
                                            }
                                        </span>
                                    </div>
                                    <div className="feature">
                                        <span>
                                            {
                                                item.feature
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="down">
                                <p>
                                    {
                                        item.content
                                    }
                                </p>
                            </div>
                        </ElementPanel>
                    ))
                }
            </div>
        )
    }
}

export default AboutUsChild;