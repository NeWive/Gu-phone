import React, { PureComponent } from 'react';
import { inputList } from "../../config/list.config";
import Input from "../../element/Input";
import TextArea from '../../element/TextArea';
import './JoinUsForm.css';
import fake_img from '../../static/fake_validate_img.png';
import {Button} from "../../element/Button";
import { connect } from 'react-redux';
import { setFormHandler } from "../../function/OnChangeHandler";


function mapStataToProps(state) {
    return {
        phoneNumber: state.phoneNumber,
        major: state.major,
        email: state.email,
        ps: state.ps,
    }
}

class JoinUsForm extends PureComponent {
    constructor(props){
        super(props);
        this.setFormHandler = setFormHandler.bind(this);
    }

    render() {
        return (
            <div id="JoinUsForm">
                {
                    inputList.map((item) => (
                        <div className={'input_sel'} key={item.name}>
                            <label htmlFor="" style={item.name === 'ps' ? { verticalAlign: 'top'} : {}}>
                                {
                                    item.name !== 'validateCode' ?  item.label : <img src={ fake_img } alt="" width={'75px'} height={'32px'}/>
                                }
                            </label>
                            { item.name === 'ps' ? (
                                <TextArea
                                    placeHolder={item.placeholder}
                                    id={item.name}
                                    changeHandler={this.setFormHandler(this)}
                                />
                            ) : (
                                <Input
                                    placeHolder={item.placeholder || ''}
                                    type={item.type} css={item.name === 'validateCode' ? { width: '147px'} : ''}
                                    id={item.name}
                                    changeHandler={this.setFormHandler(this)}
                                />
                            )}
                            {
                                item.name === 'validateCode' ? (<Button value={'确认'} clickHandler={()=>{}}/>) : ''
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(mapStataToProps)(JoinUsForm);