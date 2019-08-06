import React, { PureComponent } from 'react';
import DisplayTable from "../../element/DisplayTable";
import './CommentChild.css';
import Comment from "../../element/Comment";

class CommentChild extends PureComponent {
    render() {
        return (
            <div id="CommentChild">
                <div className="display_table_box">
                    <DisplayTable/>
                </div>
                <div className="comment_table_box">
                    <Comment/>
                </div>
            </div>
        )
    }
}

export default CommentChild;