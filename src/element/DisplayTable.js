import React, { PureComponent } from 'react';
import axios from 'axios';
import { urlInterfaceGroup } from "../config/url.config";
import { connect } from 'react-redux';
import './DisplayTable.css';
import {Button} from "./Button";

function map(state) {
    return {
        comments: state.comments,
        isCommentRequesting: state.isCommentRequesting,
        commentButtonList: state.commentButtonList,
        buttonIndex: state.buttonIndex,
    }
}

class DisplayTable extends PureComponent {
    constructor(props){
        super(props);
        this.commentsHandler = this.commentsHandler.bind(this);
        this.setComments = this.setComments.bind(this);
        this.setIsRequesting = this.setIsRequesting.bind(this);
        this.setBegin = this.setBegin.bind(this);
        this.setIndex = this.setIndex.bind(this);
    }
    setIndex(i) {
        this.props.dispatch({
            type: 'SET_BUTTON_INDEX',
            value: i,
        })
    }
    setBegin(b) {
        this.props.dispatch({
            type: 'SET_BUTTON_LIST',
            value: b,
        })

    }
    setIsRequesting(v) {
        this.props.dispatch({
            type: 'SET_IS_COMMENT_REQUESTING',
            value: v,
        })
    }
    async commentsHandler(lastNumber, index) {
        await this.setIsRequesting(true);
        await this.setIndex(index);
        let { 'data': { list, begin } } = await axios.get(`${urlInterfaceGroup.commentList.interface}?${lastNumber ? `last=${lastNumber}` : '' }`);
        if(this.props.comments.length === 0) {
            let total = begin/10;
            let bList = [];
            for(let i = 0; i < total; i++) {
                bList.push({
                    value: i + 1,
                    last: begin - 10 * i + 1,
                });
            }
            await this.setBegin(bList);
        }
        await this.setComments(list);
        await this.setIsRequesting(false);
    }
    setComments(comments) {
        this.props.dispatch({
            type: 'SET_COMMENT',
            value: comments,
        });
    }
    async componentDidMount() {
        await this.commentsHandler();
    }
    async componentWillUnmount() {
        await this.setComments([]);
    }
    render() {
        return (
            <div id="DisplayTable">
                <div className="window" onWheel={this.scrollHandler}>
                    <div className="container">
                        {
                            this.props.comments ? this.props.comments.map((item, index) => (
                                <div className="comment_sel"
                                    key={index}>
                                    <div className="content_box">
                                        <span>
                                            {
                                                item.content
                                            }
                                        </span>
                                    </div>
                                    <div className="time_box">
                                        <span>
                                            {
                                                item.time
                                            }
                                        </span>
                                    </div>
                                </div>
                            )) : ''
                        }
                    </div>
                </div>
                <div className="button_box">
                    {
                        this.props.commentButtonList.map((item, index) => (
                            <Button value={item.value} clickHandler={index === this.props.buttonIndex ? () => {} : () => {
                                this.commentsHandler(item.last, index).then();
                            }} key={item.value ? item.value : ''}
                                style={{
                                    width: 60,
                                    height: 50,
                                    cursor: this.props.isCommentRequesting ? 'not-allowed' : 'pointer',
                                    opacity: index === this.props.buttonIndex ? 0.3 : 1,
                                }}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default connect(map)(DisplayTable);