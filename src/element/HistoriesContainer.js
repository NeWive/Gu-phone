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
        this.state = {
            index: 0,
            marginLeft: 0,
        };
        this.timer = null;
        this.wait = 10;
        this.restHandler = this.restHandler.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.setLeftHandler = this.setLeftHandler.bind(this);
    }
    setLeftHandler(marginLeft, index) {
        this.setState({
            marginLeft: marginLeft,
            index: index,
        })
    }
    pageHandler(index) {
        let ctx = this;
        return () => {
            ctx.setLeftHandler(index * - 1300, index);
        }
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
    componentDidMount() {
        this.setLeftHandler(0, 0);
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
                                marginLeft: spring(this.state.marginLeft)
                            }} defaultStyle={{
                                opacity: this.props.start,
                                marginLeft: 0,
                            }}>
                                {
                                    ({opacity, marginLeft}) => (
                                        <div className="container" style={{
                                            opacity: opacity,
                                            marginLeft: marginLeft,
                                        }}>
                                            {
                                                this.props.histories.map(
                                                    (fItem, index) => (
                                                        <div className={'father_item'} key={`father_item${index}`}>
                                                            {
                                                                fItem.map((item, index) => (
                                                                    <div className={'sel'}
                                                                         key={index}
                                                                        style={
                                                                            fItem.length <= 1 ? {
                                                                                borderLeft: '1px solid #FFFFFF',
                                                                                borderRight: '1px solid #FFFFFF',
                                                                            } : {}
                                                                        }>
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
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                )
                                            }
                                            <div className="page_selection">
                                                {
                                                    this.props.histories.length > 1 ? (
                                                        this.props.histories.map((item, index) => (
                                                            <div className={`selection ${this.state.index === index ? 'selected' : ''}`}
                                                                 key={index}
                                                                 onClick={this.pageHandler(index)}/>
                                                        ))
                                                    ) : ''
                                                }
                                            </div>
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