import React, { PureComponent } from 'react';
import { statusEnumList, resultEnumList } from "../../config/list.config";
import './Status.css';
import Circle from "../../element/Circle";
import Right from '../../element/Right';
import { Button } from "../../element/Button";
import Input from '../../element/Input';
import Wrong from '../../element/Wrong';
import Pending from '../../element/Pending';
import { setFormHandler } from "../../function/OnChangeHandler";

// const status_test = ['0', '1', '2', '0', '1'];

class Status extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            statusList: ['2', '2', '2', '2', '2'],
        }
    }
    render() {
        return (
            <div id="Status">
                <div className="input_email_box">
                    <div className="container">
                        <Input css={{ width: '245px'}} placeHolder={'请输入邮箱地址'} changeHandler={setFormHandler(this)} id={'email_for_status'}/>
                        <Button value={'确认'}/>
                    </div>
                </div>
                {
                    this.state.statusList.map((item, index) => (
                        <div key={index} className={'status_detailed'}>
                            <div className="img">
                                <Circle style={{ width: '130px', height: '130px', borderColor: statusEnumList[item].borderColor}}>
                                    {
                                        (() => {
                                            switch (item) {
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

export default Status;