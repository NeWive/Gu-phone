import React, { PureComponent } from 'react';
import { inputList, departmentSelectionList } from "../../config/list.config";
import Input from "../../element/Input";
import './JoinUsForm.css';
import { Button } from "../../element/Button";
import { connect } from 'react-redux';
import axios from 'axios';
import { validate } from '../../function/Validate';
import { setFormHandler } from "../../function/OnChangeHandler";
// import { urlInterfaceGroup } from '../../config/url.config';

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
        this.validImgInterface = 'http://39.96.208.176/captcha/';
        this.inputListName = [ 'yourName','phoneNumber', 'major', 'email', 'ps', 'validateCode',];
        this.submitHandler = this.submitHandler.bind(this);
        this.mapToPostParam = {
            'phoneNumber': 'phone',
            'email': 'email',
            'yourName': 'name',
            'major': 'major',
            'ps': 'department_id',
            'validateCode': 'code',
        };
        this.state = {
            isRequesting: false,
        }
    }
    async submitHandler() {
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
        // console.log(JSON.stringify(formObj));
        try {
            let response = await axios.post('http://39.96.208.176/join/api/apply/', JSON.stringify(formObj));
            console.log(response);
        }catch (e) {
            console.log(e);
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
                                    item.name !== 'validateCode' ?  item.label : <div><img src={ this.validImgInterface }
                                                                                      alt=""
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
                                item.name === 'validateCode' ? (<Button value={'确认'} clickHandler={this.submitHandler}/>) : ''
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(mapStataToProps)(JoinUsForm);