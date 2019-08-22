import React, { PureComponent } from 'react';
import { inputList, departmentSelectionList } from "../../config/list.config";
import Input from "../../element/Input";
import './JoinUsForm.css';
import { Button } from "../../element/Button";
import { connect } from 'react-redux';
import axios from 'axios';
import { validate } from '../../function/Validate';
import { setFormHandler } from "../../function/OnChangeHandler";
import { urlInterfaceGroup } from "../../config/url.config";
import LoadingForButton from "../../element/LoadingForButton";

function mapStataToProps(state) {
    return {
        phoneNumber: state.phoneNumber,
        major: state.major,
        email: state.email,
        ps: state.ps,
        validateCode: state.validateCode,
        yourName: state.yourName,
    }
}

class JoinUsForm extends PureComponent {
    constructor(props){
        super(props);
        this.setFormHandler = setFormHandler.bind(this);
        this.validImgInterface = urlInterfaceGroup.validateCode.interface;
        this.inputListName = [ 'yourName','phoneNumber', 'major', 'email', 'ps', 'validateCode',];
        this.submitHandler = this.submitHandler.bind(this);
        this.mapToPostParam = {
            'phoneNumber': 'phone',
            'email': 'email',
            'yourName': 'name',
            'major': 'message',
            'ps': 'department_id',
            'validateCode': 'code',
        };
        this.state = {
            isRequesting: false,
            isValidateCodeRequesting: false,
        };
        this.lastTime = null;
        this.gapTime = 1000;
        this.setIsRequesting = this.setIsRequesting.bind(this);
        this.requestForValidateImg = this.requestForValidateImg.bind(this);
        this.imgClickHandler = this.imgClickHandler.bind(this);
    }
    imgClickHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let nowTime = +new Date();
        if(nowTime - this.lastTime > this.gapTime || !this.lastTime) {
            this.requestForValidateImg();
            this.lastTime = nowTime;
        }
    }
    async requestForValidateImg() {
        let toRemoveDom = document.getElementById('validateImgForJoinUs');
        let parent = document.getElementById('validate_code_join_us_box');
        parent.removeChild(toRemoveDom);
        let {data} = await axios({
            method: 'GET',
            url: urlInterfaceGroup.validateCode.interface,
            responseType: 'blob'
        });
        let imgDom = document.createElement('img');
        imgDom.onload = () => {
            window.URL.revokeObjectURL(imgDom.src);
        };
        imgDom.src = window.URL.createObjectURL(data);
        imgDom.id = 'validateImgForJoinUs';
        parent.appendChild(imgDom);
    }
    setIsRequesting(v) {
        this.setState({
            isRequesting: v,
        })
    }
    async submitHandler() {
        let formObj = {};
        for(let item of this.inputListName) {
            let obj = {};
            obj['value'] = this.props[item] ? this.props[item] : document.getElementById('item');
            obj['id'] = item;
            let msg = validate(obj);
            if(msg !== 'pass'){
                alert(msg);
                return ;
            }
            formObj[this.mapToPostParam[item]] = obj['value'];
        }
        // console.log(formObj);
        this.setIsRequesting(true);
        try {
            axios.defaults.withCredentials = true;
            let { 'data': { status } } = await axios.post(urlInterfaceGroup.require.interface, JSON.stringify(formObj));
            if(status === 'ok') {
                this.props.jumpHandler(1);
            }else if(status === 'code_error'){
                alert('验证码错误');
                this.requestForValidateImg();
                document.getElementById('validateCode').value = '';
            }else if(status === 'phone_error'){
                alert('Ops~手机号已经被注册过了');
            }else if(status === 'already_error') {
                alert('Ops~邮箱已经被注册过了');
            } else {
                alert('Ops~网络开小差惹');
            }
        }catch (e) {
            console.log(e);
            alert('Ops~网络开小差惹');
        }finally{
            this.setIsRequesting(false);
        }
    }
    render() {
        return (
            <div id="JoinUsForm">
                {
                    inputList.map((item) => (
                        <div className={'input_sel'} key={item.name}>
                            <label htmlFor="" style={item.name === 'ps' ? { verticalAlign: 'top'} : {}}>
                                {
                                    item.name !== 'validateCode' ? item.label :
                                        <div id={'validate_code_join_us_box'} onClick={this.imgClickHandler}>
                                            <img src={this.validImgInterface}
                                                 alt="" id={'validateImgForJoinUs'}
                                                 width={'75px'}
                                                 height={'32px'}/></div>
                                }
                            </label>
                            { item.name === 'ps' ? (
                                <select onChange={this.setFormHandler(this)}
                                        id={item.name}>
                                    {
                                        departmentSelectionList.map((item, index) => (
                                            <option value={item.value} key={index}>
                                                {
                                                    item.name
                                                }
                                            </option>
                                        ))
                                    }
                                </select>
                            ) : (
                                <Input
                                    placeHolder={item.placeholder || ''}
                                    type={item.type} css={item.name === 'validateCode' ? { width: '147px'} : ''}
                                    id={item.name}
                                    changeHandler={this.setFormHandler(this)}
                                />
                            )}
                            {
                                item.name === 'validateCode' ? (
                                    <Button clickHandler={this.submitHandler}
                                            style={{
                                                cursor: this.state.isRequesting ? 'not-allowed' : 'pointer'
                                            }}>
                                        {
                                            this.state.isRequesting ? <LoadingForButton/> : '确认'
                                        }
                                    </Button>
                                    ) : ''
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(mapStataToProps)(JoinUsForm);