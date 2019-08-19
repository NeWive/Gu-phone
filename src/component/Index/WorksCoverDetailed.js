import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import './WorksCoverDetailed.css';
import {CloseButton} from "../../element/CloseButton";

function map(state) {
    return {
        isWorksCoverMotive: state.isWorksCoverMotive,
        websiteForDisplay: state.websiteForDisplay,
    }
}

class WorksCoverDetailed extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            start: 0,
            end: 1,
            left: 0,
            index: 0,
            maxTop: 0,
        };
        this.closeHandler = this.closeHandler.bind(this);
        this.exchangeState = this.exchangeState.bind(this);
        this.setLeftHandler = this.setLeftHandler.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
    }
    pageHandler(index) {
        let ctx = this;
        return () => {
            ctx.setLeftHandler(index * - 1300, index);
        }
    }
    setLeftHandler(left, index) {
        this.setState({
            left: left,
            index: index,
        })
    }
    exchangeState() {
        this.setState((preState) => ({
            start: preState.end,
            end: preState.start,
        }))
    }
    async closeHandler() {
        await this.props.dispatch({
            type: 'SET_WEBSITE_FOR_DISPLAY',
            value: '',
        });
        this.setState({
            index: 0,
            left: 0,
        });
        this.props.dispatch({
            type: 'SET_IS_WORKS_COVER_MOTIVE',
            isWorksCoverMotive: false
        })
    }
    render() {
        return (
            <div id="WorksCoverDetailed">
                <div className="close_button_box">
                    <CloseButton
                        style={{borderColor: '#FFFFFF'}}
                        clickHandler={this.closeHandler}/>
                </div>
                <div className="title_box">
                    <div className="main">
                        <span>
                            作品介绍 Works
                        </span>
                    </div>
                    <div className="children">
                        <span>
                            网页作品系列
                        </span>
                    </div>
                </div>
                <div className="works_window">
                    {
                        this.props.websiteForDisplay ? (
                            <Motion defaultStyle={{
                                opacity: this.state.start,
                                left: 0,
                            }} style={{
                                opacity: spring(this.state.end),
                                left: spring(this.state.left),
                            }}>
                                {
                                    ({opacity, left}) => (
                                        <div className="content"
                                            style={{
                                                opacity: opacity,
                                            }}>
                                            <div className="container"
                                                style={{
                                                    left: left,
                                                }}>
                                                {
                                                    this.props.websiteForDisplay.map((item, index) => (
                                                        <div className="father_item"
                                                            key={`father_item_${index}`}>
                                                            {
                                                                item.map((childItem, index) => (
                                                                    <div className={'child_item'}
                                                                        key={`child_item_${index}`}
                                                                        onClick={()=>{window.location.href = childItem.url}}>
                                                                        <div className="img_box">
                                                                            <img src={childItem.image}
                                                                                 alt=""
                                                                                width={'330px'}
                                                                                height={'169px'}/>
                                                                        </div>
                                                                        <div className="name_box">
                                                                            <span>
                                                                                {
                                                                                    childItem.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="page_selection">
                                                {
                                                    this.props.websiteForDisplay.map((item, index) => (
                                                        <div className={`selection ${this.state.index === index ? 'selected' : ''}`}
                                                            key={index}
                                                            onClick={this.pageHandler(index)}/>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </Motion>
                        ) : (
                            ''
                        )
                    }
                </div>
            </div>
        )
    }
}
export default connect(map)(WorksCoverDetailed);