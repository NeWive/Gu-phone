import React, { PureComponent } from 'react';
import axios from 'axios';
import { urlInterfaceGroup } from "../config/url.config";
import { connect } from 'react-redux';
import './DisplayTable.css';

function map(state) {
    return {
        comments: state.comments,
        containerHeight: state.containerHeight,
        commentListWindowHeight: state.commentListWindowHeight,
    }
}

class DisplayTable extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            bottom: 0,
            height: 342,
            top: 0,
            marginTop: 0,
        };
        this.commentsHandler = this.commentsHandler.bind(this);
        this.setComments = this.setComments.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.mouseMoveLock = false;
        this.lastY = null;
        this.containerHeight = 0;
    }
    scrollHandler(e) {
        e.stopPropagation();
        let currentY = this.state.top;
        let y = 2.5;
        if(currentY + y > 0 && currentY + y < 342 - this.props.commentListWindowHeight) {
            this.setState((pre) => (
                {
                    top: pre.top + y,
                    marginTop: -(pre.top + y) * this.props.containerHeight/342,
                }
            ));
        }
    }
    mouseLeaveHandler(e) {
        e.stopPropagation();
        console.log('out');
        this.mouseMoveLock = false;
    }
    mouseMoveHandler(e) {
        if(this.lastY && this.mouseMoveLock) {
            console.log('moving');
            let currentY = this.state.top;
            let y = e.screenY - this.lastY;
            if(currentY + y >= 0 && currentY + y <= 342 - this.props.commentListWindowHeight) {
                this.setState((pre) => (
                    {
                        top: pre.top + y,
                        marginTop: -(pre.top + y) * this.props.containerHeight/342,
                    }
                ));
            }
        }
        this.lastY = e.screenY;
    }
    mouseUpHandler() {
        console.log('up');
        this.mouseMoveLock = false;
    }
    mouseDownHandler() {
        console.log('down');
        this.mouseMoveLock = true;
    }
    setHeight(height) {
        this.props.dispatch({
            type: 'COMMENT_LIST_WINDOW_HEIGHT',
            value: height,
        });
    }
    async commentsHandler() {
        let { 'data': { list } } = await axios.get(urlInterfaceGroup.commentList.interface);
        await this.setComments(list);
        await this.setHeight(342/list.length);
    }
    setComments(comments) {
        this.props.dispatch({
            type: 'SET_COMMENT',
            value: comments,
        });
    }
    componentDidMount() {
        this.commentsHandler().then( () => {
            this.props.dispatch({
                type: 'SET_CONTAINER_HEIGHT',
                value: (this.props.comments.length - 2) * 119 - 15,
            })
        });
    }
    render() {
        return (
            <div id="DisplayTable"
                 onMouseMove={this.mouseMoveHandler}
                 onMouseLeave={this.mouseLeaveHandler}
                 onMouseUp={this.mouseUpHandler}>
                <div className="window" onWheel={this.scrollHandler}>
                    <div className="container"
                        style={{
                            marginTop: this.state.marginTop,
                        }}>
                        {
                            this.props.comments ? this.props.comments.map((item, index) => (
                                <div className="comment_sel"
                                    key={index}>
                                    <div className="content_box">
                                        <span>
                                            {
                                                item.content.length > 63 ? `${item.content.slice(0, 60)}...` : item.content
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
                <div className="scroll">
                    <div className="scroll_container">
                        <div className="scroll_panel"
                            style={{
                                height: this.props.commentListWindowHeight,
                                top: this.state.top,
                            }}
                            onMouseDown={this.mouseDownHandler}
                            onMouseUp={this.mouseUpHandler}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(map)(DisplayTable);