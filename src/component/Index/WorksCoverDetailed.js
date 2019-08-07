import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import './WorksCoverDetailed.css';
import Loading from "../../element/Loading";
import shortCut from '../../static/891543.png';
import {CloseButton} from "../../element/CloseButton";

function map(state) {
    return {
        isWorksCoverMotive: state.isWorksCoverMotive,
    }
}

class WorksCoverDetailed extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            start: 0,
            end: 1,
            content: '',
            left: 0,
            index: 0,
            maxTop: 0,
        };
        this.closeHandler = this.closeHandler.bind(this);
        this.setContent = this.setContent.bind(this);
        this.contentHandler = this.contentHandler.bind(this);
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
    contentHandler() {
        let pages = [];//每页6个
        let total = 7;//fake request
        let j = 0;
        for(let i = 0; i < total / 6; i++) {
            let tempArr = [];
            for(let temp = 0; j < total && temp < 6; j++, temp++) {
                tempArr.push({
                    name: '爱特展示网',
                    shortCut: shortCut,
                    url: 'http://www.bilibili.com',
                })
            }
            pages.push(tempArr);
        }
        console.log(pages);
        this.setContent(pages);
    }
    componentDidMount() {
        setTimeout(this.contentHandler, 2000);
    }

    setContent(content) {
        this.setState({
            content: content,
        })
    }
    exchangeState() {
        this.setState((preState) => ({
            start: preState.end,
            end: preState.start,
        }))
    }
    async closeHandler() {
        await this.setContent('');
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
                        this.state.content ? (
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
                                                    this.state.content.map((item, index) => (
                                                        <div className="father_item"
                                                            key={`father_item_${index}`}>
                                                            {
                                                                item.map((childItem, index) => (
                                                                    <div className={'child_item'}
                                                                        key={`child_item_${index}`}
                                                                        onClick={()=>{window.location.href = childItem.url}}>
                                                                        <div className="img_box">
                                                                            <img src={childItem.shortCut}
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
                                                    this.state.content.map((item, index) => (
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
                            <Loading/>
                        )
                    }
                </div>
            </div>
        )
    }
}
export default connect(map)(WorksCoverDetailed);