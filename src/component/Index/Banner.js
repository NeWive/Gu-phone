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
    constructor(props) {
        super(props);
        this.state = {
            leftStart: 815,
            leftEnd: 1141,
            topStart: 410,
            topEnd: 187,
        };
        this.resizeHandler = this.resizeHandler.bind(this);
        this.setLeftEnd = this.setLeftEnd.bind(this);
    }
    setLeftEnd(value) {
        this.setState({
            leftEnd: value,
        })
    }
    resizeHandler() {
        if(document.body.clientWidth <= 1490) {
            this.setLeftEnd(document.body.clientWidth - 500);
        }else if(document.body.clientWidth > 1490) {
            this.setLeftEnd(1140);
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    render() {
        return (
            <Motion style={{
                height: spring(!this.props.motive ? 886 : 648),
                left: spring(!this.props.motive ? this.state.leftStart : this.state.leftEnd),
                top: spring(!this.props.motive ? this.state.topStart : this.state.topEnd),
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