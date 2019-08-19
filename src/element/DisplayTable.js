import React, { PureComponent } from 'react';
// import generateDate from "../function/GenerateFormatDate";
import axios from 'axios';
import { urlInterfaceGroup } from "../config/url.config";
import './DisplayTable.css';

class DisplayTable extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            bottom: 0,
            comments: [],
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
        let y = e.nativeEvent.deltaY / 20;
        if(currentY + y > 0 && currentY + y < 342 - this.state.height) {
            this.setState((pre) => (
                {
                    top: pre.top + y,
                    marginTop: -(pre.top + y) * this.containerHeight/342,
                }
            ));
        }
    }
    mouseLeaveHandler() {
        this.mouseMoveLock = false;
    }
    mouseMoveHandler(e) {
        if(this.lastY && this.mouseMoveLock) {
            let currentY = this.state.top;
            let y = e.screenY - this.lastY;
            if(currentY + y >= 0 && currentY + y <= 342 - this.state.height) {
                this.setState((pre) => (
                    {
                        top: pre.top + y,
                        marginTop: -(pre.top + y) * this.containerHeight/342,
                    }
                ));
            }
        }
        this.lastY = e.screenY;
    }
    mouseUpHandler() {
        this.mouseMoveLock = false;
    }
    mouseDownHandler() {
        this.mouseMoveLock = true;
    }
    setHeight(height) {
        this.setState({
            height: height
        })
    }
    async commentsHandler() {
        let { 'data': { list } } = await axios.get(urlInterfaceGroup.commentList.interface);
        await this.setComments(list);
        await this.setHeight(342/list.length);
    }
    setComments(comments) {
        this.setState({
            comments: comments,
        })
    }
    componentDidMount() {
        this.commentsHandler().then( () => {
            this.containerHeight = (this.state.comments.length - 2) * 119 - 15;
        });
    }
    render() {
        return (
            <div id="DisplayTable">
                <div className="window" onWheel={this.scrollHandler}>
                    <div className="container"
                        style={{
                            marginTop: this.state.marginTop,
                        }}>
                        {
                            this.state.comments.map((item, index) => (
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
                            ))
                        }
                    </div>
                </div>
                <div className="scroll">
                    <div className="scroll_container">
                        <div className="scroll_panel"
                            style={{
                                height: this.state.height,
                                top: this.state.top,
                            }}
                            onMouseDown={this.mouseDownHandler}
                            onMouseUp={this.mouseUpHandler}
                            onMouseMove={this.mouseMoveHandler}
                            onMouseOut={this.mouseLeaveHandler}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayTable;