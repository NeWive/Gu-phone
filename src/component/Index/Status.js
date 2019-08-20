import React, { PureComponent } from 'react';
import { statusEnumList, resultEnumList } from "../../config/list.config";
import './Status.css';
import Circle from "../../element/Circle";
import Right from '../../element/Right';
import { Button } from "../../element/Button";
import Input from '../../element/Input';
import Wrong from '../../element/Wrong';
import Pending from '../../element/Pending';
import { setCommentHandler } from "../../function/OnChangeHandler";
import { connect } from 'react-redux';
import { validate } from "../../function/Validate";
import { getStatusByEmail } from '../../config/url.config';
import LoadingForButton from "../../element/LoadingForButton";
import axios from 'axios';

function map(state) {
    return {
        emailForStatus: state.emailForStatus,
    }
}


class Status extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            statusList: ['2', '2', '2', '2', '2'],
            isRequesting: false,
        };
        this.onChangeHandler = setCommentHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.setIsRequesting = this.setIsRequesting.bind(this);
        this.setStatusList = this.setStatusList.bind(this);
    }
    setStatusList(list) {
        this.setState({
            statusList: list,
        })
    }
    setIsRequesting(value) {
        this.setState({
            isRequesting: value,
        })
    }
    async submitHandler() {
        if(!this.state.isRequesting) {
            let obj = {};
            obj['value'] = this.props['emailForStatus'];
            obj['id'] = 'emailForStatus';
            let msg = validate(obj);
            if (msg !== 'pass') {
                alert(msg);
                return;
            }
            await this.setIsRequesting(true);
            try {
                let {'data': {status, statusList}} = await axios.get(getStatusByEmail(this.props['emailForStatus']));
                if (status === 'msg_error') {
                    alert('查无信息');
                } else if (status === 'ok') {
                    // alert('查询成功');
                    this.setStatusList(statusList)
                }
            }catch (e) {
                console.log(e);
            }finally {
                await this.setIsRequesting(false);
            }
        }
    }
    render() {
        return (
            <div id="Status">
                <div className="input_email_box">
                    <div className="container">
                        <Input css={{ width: '245px'}} placeHolder={'请输入邮箱地址'} changeHandler={this.onChangeHandler(this)} id={'email_for_status'}/>
                        <Button clickHandler={this.submitHandler}
                                style={{
                                    cursor: this.state.isRequesting ? 'not-allowed' : 'pointer'
                                }}>
                            {
                                this.state.isRequesting ? <LoadingForButton/> : '查询'
                            }
                        </Button>
                    </div>
                </div>
                {
                    this.state.statusList.map((item, index) => (
                        <div key={index} className={'status_detailed'}>
                            <div className="img">
                                <Circle style={{ width: '130px', height: '130px', borderColor: statusEnumList[item].borderColor}}>
                                    {
                                        (() => {
                                            switch (`${item}`) {
                                                case '0':
                                                    return <Wrong/>;
                                                case '1':
                                                    return <Right/>;
                                                case '2':
                                                    return <Pending/>;
                                                default:
                                                    break;
                                            }
                                        })()
                                    }
                                </Circle>
                            </div>
                            <div className="description">
                                <p className={`stage ${statusEnumList[item].type}`}>
                                    {
                                        resultEnumList[index]
                                    }
                                </p>
                                <p className={`result ${statusEnumList[item].type}`}>
                                    {
                                        statusEnumList[item].value
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(map)(Status);