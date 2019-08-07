import React, { PureComponent } from 'react';
import generateDate from "../function/GenerateFormatDate";
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
        this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
        this.mouseMoveLock = false;
        this.mouseEnterLock = false;
        this.lastY = null;
        this.containerHeight = 0;
    }
    mouseEnterHandler(e) {
        this.mouseEnterLock = true;
    }
    mouseLeaveHandler(e) {
        this.mouseEnterLock = false;
    }
    mouseMoveHandler(e) {
        if(this.lastY && this.mouseMoveLock && this.mouseEnterLock) {
            // console.log(`y:${e.clientY}`);
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
    mouseUpHandler(e) {
        this.mouseMoveLock = false;
    }
    mouseDownHandler(e) {
        this.mouseMoveLock = true;
    }
    setHeight(height) {
        this.setState({
            height: height
        })
    }
    async commentsHandler() {
        const comments = [
            {
                content: '前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有啊啊啊啊前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有学妹啦呵呵哈哈哈前端有啊啊啊啊',
                time: generateDate(new Date()),
            },
            {
                content: '蔡佬牛逼',
                time: generateDate(new Date()),
            },
            {
                content: '我是你爸爸',
                time: generateDate(new Date()),
            }
        ];//临时数据
        const commentsList = [...comments, ...comments, ...comments];
        await this.setComments(commentsList);
        await this.setHeight(342/commentsList.length);
    }
    setComments(comments) {
        this.setState({
            comments: comments,
        })
    }
    componentDidMount() {
        this.commentsHandler().then(r => {
            this.containerHeight = (this.state.comments.length - 2) * 119 - 15;
            console.log(this.containerHeight);
        });
    }
    render() {
        return (
            <div id="DisplayTable">
                <div className="window">
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
                            onMouseOver={this.mouseEnterHandler}
                            onMouseOut={this.mouseLeaveHandler}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayTable;