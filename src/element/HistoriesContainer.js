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
        historyByYear: state.historyByYear,
        yearSelected: state.yearSelected,
    }
}

class HistoriesContainer extends PureComponent {
    constructor(props){
        super(props);
        this.wait = 10;
        this.pageHandler = this.pageHandler.bind(this);
    }
    pageHandler(index) {
        let ctx = this;
        return () => {
            ctx.props.setLeftHandler(index * - 1300, index);
        }
    }
    componentDidMount() {
        this.props.setLeftHandler(0, 0);
    }
    render() {
        return (
            <div id="HistoriesContainer" style={{
                background: colorMembers[this.props.historyIndex].backgroundColor
            }}>
                <div className="window">
                    {
                        this.props.historyByYear ? (
                            <Motion style={{
                                marginLeft: spring(this.props.marginLeft)
                            }} defaultStyle={{
                                marginLeft: 0,
                            }}>
                                {
                                    ({marginLeft}) => (
                                        <div className="container" style={{
                                            marginLeft: marginLeft,
                                        }}>
                                            {
                                                this.props.historyByYear[this.props.yearSelected].map(
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
                                                                                        item.info
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
                                                    this.props.historyByYear[this.props.yearSelected].length > 1 ? (
                                                        this.props.historyByYear[this.props.yearSelected].map((item, index) => (
                                                            <div className={`selection ${this.props.index === index ? 'selected' : ''}`}
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
                }}>
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