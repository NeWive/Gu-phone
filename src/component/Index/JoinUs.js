import React, { PureComponent } from 'react';
import { CloseButton } from "../../element/CloseButton";
import { connect } from 'react-redux';
import { joinUsSelList } from "../../config/list.config";
import JoinUsForm from '../../component/Index/JoinUsForm';
import Status from './Status';
import './JoinUs.css';
import Successful from "./Successful";
import { Motion, spring } from "react-motion/lib/react-motion";

//窗口滚动监听touchmove

function mapStateToProps(state) {
    return {
        isPortalOn: state.isPortalOn,
        emailForStatus: state.emailForStatus,
    }
}
class JoinUs extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            selected: 0,
            successful: 0,
            start: 0,
            end: 1,
        };
        this.closePortalHandler = this.closePortalHandler.bind(this);
        this.clickLayerHandler = this.clickLayerHandler.bind(this);
        this.setMode = this.setMode.bind(this);
        this.exchangeOpacity = this.exchangeOpacity.bind(this);
        this.setSuccessful = this.setSuccessful.bind(this);
        this.clearAllHandler = this.clearAllHandler.bind(this);
        this.clearJoinUsType = {
            'CLEAR_JOIN_US_FORM': ['SET_MAJOR', 'SET_EMAIL', 'SET_PS', 'SET_YOUR_NAME', 'SET_VALIDATE_CODE', 'SET_PHONE_NUMBER'],
            'CLEAR_JOIN_US_STATUS': ['SET_EMAIL_FOR_STATUS'],
        };
    }
    clearAllHandler() {
        this.props.dispatch({
            type: 'SET_PHONE_NUMBER',
            value: '',
        });
        this.props.dispatch({
            type: 'SET_MAJOR',
            value: '',
        });
        this.props.dispatch({
            type: 'SET_EMAIL',
            value: '',
        });
        this.props.dispatch({
            type: 'SET_PS',
            value: '',
        });
        this.props.dispatch({
            type: 'SET_YOUR_NAME',
            value: '',
        });
        this.props.dispatch({
            type: 'SET_VALIDATE_CODE',
            value: '',
        });
        this.props.dispatch({
            type: 'SET_EMAIL_FOR_STATUS',
            value: '',
        });
    }
    setSuccessful(value) {
        this.setState({
            successful: value,
        })
    }
    exchangeOpacity() {
        this.setState((pre) => ({
            start: pre.end,
            end: pre.start,
        }))
    }
    setMode(index) {
        const context = this;
        if(this.state.selectedIndex !== index) {
            return () => {
                switch (index) {
                    case 0:
                        context.clearAllHandler();break;
                    case 1:
                        context.clearAllHandler();break;
                    default:
                        break;
                }
                context.setState({
                    selected: index,
                })
            }
        }
    }
    async clickLayerHandler(e) {
        e.stopPropagation();
        if(e.target.className === 'popBox') {
            await this.clearAllHandler();
            this.closePortalHandler();
        }
    }
    async closePortalHandler() {
        await this.exchangeOpacity();
        this.props.dispatch({
            type: 'OPERATING_PORTAL'
        });
        const modalRoot = document.getElementById('modal-root');
        const child = modalRoot.childNodes[0];
        modalRoot.removeChild(child);
        let root = document.getElementById(`root`);
        root.style.overflow = 'auto';
        root.style.height = '';
    }

    render() {
        return (
            <Motion defaultStyle={{
                opacity: this.state.start,
            }} style={{
                opacity: spring(this.state.end),
            }}>
                {
                    ({ opacity }) => (
                        <div id="JoinUs"
                             onWheel={(e) => {e.stopPropagation()}}
                            style={{
                                opacity: opacity,
                            }}>
                            <div className="popLayer"/>
                            <div className="popBox" onClick={this.clickLayerHandler}>
                                <div className="form_box">
                                    <div className="button_box">
                                        <CloseButton clickHandler={this.closePortalHandler}/>
                                    </div>
                                    <div className="form_sel">
                                        <ul className="form_sel_box">
                                            {
                                                joinUsSelList.map((item, index) => (
                                                    <li key={item.name}>
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
                                                        <a href="javascript:void(0)" className={index === this.state.selected ? 'selected' : ''} onClick={this.setMode(index)}>
                                                <span>
                                                    {
                                                        item.value
                                                    }
                                                </span>
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="mode_func">
                                        {
                                            (() => {
                                                switch(this.state.selected) {
                                                    case 0:
                                                    {
                                                        return this.state.successful ? <Successful/> : <JoinUsForm jumpHandler={this.setSuccessful}/>;
                                                    }
                                                    case 1:
                                                    {
                                                        console.log(2);
                                                        return <Status/>;
                                                    }
                                                    default:
                                                        break;
                                                }
                                            })()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Motion>
        )
    }
}

export default connect(mapStateToProps)(JoinUs);