import React, { PureComponent } from 'react';
import { UpArrow } from "../../element/UpArrow";
import { Motion, spring } from "react-motion/lib/react-motion";
import { connect } from 'react-redux';
import './Banner.css';

function map(state) {
    return {
        motive: state.motive
    }
}

class Banner extends PureComponent {
    render() {
        return (
            <Motion style={{
                height: spring(!this.props.motive ? 886 : 648),
                left: spring(!this.props.motive ? 815 : 1141),
                top: spring(!this.props.motive ? 410 : 187),
            }}>
                {
                    ({height, left, top}) => (
                        <div id="Banner" style={{height: height}}>
                            <div className="code" style={{left: left, top: top}}>
                                <p className="function">
                                    Create(<span className="args">future</span>);
                                </p>
                                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                <p className="annotation">
                                    //以灵感 构未来
                                </p>
                            </div>
                            {
                                !this.props.motive ? (
                                    <div className="temp">
                                        <div className="arrow_box">
                                            <div className="up_arrow_box">
                                                <UpArrow/>
                                            </div>
                                        </div>
                                        <div className="arrow_box arrow_box_motion">
                                            <div className="up_arrow_box">
                                                <UpArrow/>
                                            </div>
                                        </div>
                                        <div className="arrow_box arrow_box_motion_delay">
                                            <div className="up_arrow_box">
                                                <UpArrow/>
                                            </div>
                                        </div>
                                        <div className="words_box">
                                            <p>向上滑动</p>
                                        </div>
                                    </div>
                                ) : ''
                            }
                        </div>
                    )
                }
            </Motion>
        )
    }
}

export default connect(map)(Banner);