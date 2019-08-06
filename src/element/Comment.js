import React, { PureComponent } from 'react';
import validate from '../static/fake_validate_img.png';
import './Comment.css';
import TextArea from "./TextArea";
import Input from "./Input";
import {Button} from "./Button";

class Comment extends PureComponent {
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
                    }} placeHolder={'写点什么...'}/>
                </div>
                <div className="validate_box">
                    {/* eslint-disable-next-line no-script-url,jsx-a11y/anchor-is-valid */}
                    <a href={"javascript:void(0)"}>
                        <img src={validate}
                             alt=""
                            width={"75px"}
                            height={'32px'}/>
                    </a>
                    <Input css={{
                        width: 147,
                        height: 37,
                        backgroundColor: '#FFFFFF',
                    }} placeHolder={'验证码'}/>
                    <Button style={{
                        width: 163,
                        height: 37,
                        backgroundColor: '#58C4FF',
                    }} value={'发送'}/>
                </div>
            </div>
        )
    }
}

export default Comment;