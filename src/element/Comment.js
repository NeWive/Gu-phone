import React, { PureComponent } from 'react';
import './Comment.css';
import TextArea from "./TextArea";
import Input from "./Input";
import {Button} from "./Button";
import { connect } from 'react-redux';
import { setCommentHandler } from "../function/OnChangeHandler";
import {validate} from "../function/Validate";
import axios from "axios";

function map(state) {
    return {
        commentSingle: state.commentSingle,
        commentValidate: state.commentValidate,
    }
}

class Comment extends PureComponent {
    constructor(props) {
        super(props);
        this.onChangeHandler = setCommentHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.inputListName = [ 'commentSingle', 'commentValidate' ];
        this.mapToPostParam = {
            'commentSingle': 'content',
            'commentValidate': 'code',
        };
    }
    async submitHandler() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        let formObj = {};
        for(let item of this.inputListName) {
            let obj = {};
            obj['value'] = this.props[item];
            obj['id'] = item;
            let msg = validate(obj);
            if(msg !== 'pass'){
                alert(msg);
                return ;
            }
            formObj[this.mapToPostParam[item]] = this.props[item];
        }
        console.log(JSON.stringify(formObj));
        try {
            let { 'data': { status } } = await axios.post('http://39.96.208.176/show/api/comment/', JSON.stringify(formObj));
            if(status !== 'ok') {
                alert(status);
            }else {

            }
        }catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div id="Comment">
                <div className="textarea_box">
                    <TextArea style={{
                                width: 556,
                                height: 231,
                                paddingLeft: 15,
                                paddingTop: 14,
                                paddingBottom: 14,
                                paddingRight: 15,
                                }}
                                placeHolder={'写点什么...'}
                                id={'commentSingle'}
                                changeHandler={this.onChangeHandler(this)}/>
                </div>
                <div className="validate_box">
                    {/* eslint-disable-next-line no-script-url,jsx-a11y/anchor-is-valid */}
                    <a href={"javascript:void(0)"}>
                        <img src={'http://39.96.208.176/captcha/'}
                             alt=""
                            width={"75px"}
                            height={'32px'}/>
                    </a>
                    <Input css={{
                        width: 147,
                        height: 37,
                        backgroundColor: '#FFFFFF',
                    }} placeHolder={'验证码'}
                        id={'commentValidate'}
                           changeHandler={this.onChangeHandler(this)}/>
                    <Button style={{
                        width: 163,
                        height: 37,
                        backgroundColor: '#58C4FF',
                    }} value={'发送'}
                        clickHandler={this.submitHandler}/>
                </div>
            </div>
        )
    }
}

export default connect(map)(Comment);