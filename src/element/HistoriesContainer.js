import React, { PureComponent } from 'react';
import Loading from './Loading';
import { blueArrowStyles, colorMembers } from "../config/style.config";
import { Motion, spring } from "react-motion";
import { connect } from 'react-redux';
import './HistoriesContainer.css';

function map(state) {
    return {
        historyIndex: state.historyIndex,
        isHistoryArrowSettled: state.isHistoryArrowSettled,
        isHistoryRequesting: state.isHistoryRequesting,
    }
}

class HistoriesContainer extends PureComponent {
    constructor(props){
        super(props);
        this.timer = null;
        this.wait = 10;
        this.restHandler = this.restHandler.bind(this);
    }
    restHandler() {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            console.log('arrow settled');
            this.props.dispatch({
                type: 'SET_IS_HISTORY_ARROW_SETTLED',
                value: true,
            });
            this.props.dispatch({
                type: 'SET_IS_HISTORY_REQUESTING',
                value: true,
            });
            this.props.requestHandler();
        }, this.wait);
    }
    render() {
        return (
            <div id="HistoriesContainer" style={{
                background: colorMembers[this.props.historyIndex].backgroundColor
            }}>
                <div className="window">
                    {
                        !this.props.isHistoryRequesting ? (
                            <Motion style={{
                                opacity: spring(this.props.end, {
                                    precision: 0.4,
                                }),
                            }} defaultStyle={{
                                opacity: this.props.start,
                            }}>
                                {
                                    ({opacity}) => (
                                        <div className="container" style={{
                                            opacity: opacity,
                                        }}>
                                            {
                                                this.props.histories.map(
                                                    (item, index) => (
                                                        <div className={'sel'} key={index}>
                                                            <div className="detailed">
                                                                <div className="title">
                                                            <span>
                                                                {
                                                                    item.title
                                                                }
                                                            </span>
                                                                </div>
                                                                <div className="content">
                                                            <span>
                                                                {
                                                                    item.content
                                                                }
                                                            </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </Motion>
                            ) : (<Loading/>)
                        }
                </div>
                <Motion style={{
                    left: spring(blueArrowStyles[this.props.historyIndex])
                }} defaultStyle={{
                    left: blueArrowStyles[0]
                }} onRest={this.restHandler}>
                    {
                        ({ left }) => (
                            <div className="blue_arrow_box" style={{
                                left: left,
                            }}>
                                <div className="blue_arrow" style={{
                                    borderTopColor: colorMembers[this.props.historyIndex].backgroundColor
                                }}/>
                            </div>
                        )
                    }
                </Motion>
            </div>
        )
    }
}

export default connect(map)(HistoriesContainer);