import React, {PureComponent} from 'react';
import {CloseButton} from "../../element/CloseButton";
import {connect} from 'react-redux';
import Loading from "../../element/Loading";
import {Motion, spring} from 'react-motion';
import {colorMembers} from "../../config/style.config";
import axios from 'axios';
import {getMembersByYear, url} from '../../config/url.config';
import { departIdMap } from "../../config/list.config";
import './MemberDetailed.css';

function map(state) {
    return {
        memberMotionIndex: state.memberMotionIndex,
        isMemberCoverMotive: state.isMemberCoverMotive,
        memberCoverYear: state.memberCoverYear,
    }
}

class MemberDetailed extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // departments: [{name: 'UI', id: '3'}, { name: '前端', id: '2'}, { name: '程序', id: '1'}, { name: '安卓', id: '4'}, { name: '游戏', id: '5'}],
            index: 0,
            currentDepartMembers: [],
            isListReady: false,
            isMemberReady: false,
            start: 0,
            end: 1,
            selectedIndex: -1,
            marginLeft: 0,
            currentPage: 0,
        };
        this.setIsListReady = this.setIsListReady.bind(this);
        this.setIsMemberReady = this.setIsMemberReady.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
        this.setClose = this.setClose.bind(this);
        this.exchangeOpacity = this.exchangeOpacity.bind(this);
        this.memberHandler = this.memberHandler.bind(this);
        this.setMember = this.setMember.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.setMarginLeft = this.setMarginLeft.bind(this);
    }
    setMarginLeft(marginLeft, currentPage) {
        this.setState({
            marginLeft: marginLeft,
            currentPage: currentPage,
        });
    }
    pageHandler(index) {
        let ctx = this;
        return () => {
            ctx.setMarginLeft(index * -1091, index);
        }
    }
    memberHandler(members) {
        let pages = [];
        let total = members.length;
        let j = 0;
        for(let i = 0; i < total / 4; i++) {
            let tempArr = [];
            for(let temp = 0; j < total && temp < 4; j++, temp++) {
                tempArr.push(members[j]);
            }
            pages.push(tempArr);
        }
        this.setMember(pages);
    }
    exchangeOpacity() {
        this.setState({
            start: 1,
            end: 0,
        })
    }

    setClose() {
        this.setState({
            isListReady: false,
            isMemberReady: false
        })
    }

    async closeHandler() {
        await this.exchangeOpacity();
        await this.setClose();
        this.props.dispatch({
            type: 'SET_IS_MEMBER_COVER_MOTIVE',
        })
    }

    setMember(member) {
        this.setState({
            currentDepartMembers: member,
        })
    }

    setIsMemberReady(status) {
        this.setState({
            isMemberReady: status,
        })
    }

    setSelectedIndex(index) {
        this.setState({
            selectedIndex: index,
        })
    }

    async changeDepartmentHandler(event, id) {  //模拟请求
        event.stopPropagation();
        let target = event.target;
        // essential
        await this.setIsMemberReady(false);
        //
        await this.setSelectedIndex(parseInt(target.getAttribute('indexof')));
        let { 'data': {list} } = await axios.get(getMembersByYear(this.props.memberCoverYear, id));
        list.map((item) => {
            item.image = `${url}${item.image}`;
            return '';
        });
        await this.memberHandler(list);
        this.setIsMemberReady(true);
    }

    setIsListReady(status) {
        this.setState({
            isListReady: status,
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setIsListReady(true);
        }, 1000);
    }

    render() {
        return (
            <div className="MemberDetailed">
                <div className="close_button_box">
                    <CloseButton
                        style={{borderColor: '#FFFFFF'}}
                        clickHandler={this.closeHandler}/>
                </div>
                <div className="title_box">
                    <div className="title_small">
                        <span>
                            成员介绍 Members
                        </span>
                    </div>
                    <div className="title_large">
                        <span>
                            {
                                `${this.props.memberCoverYear}届 The ${this.props.memberCoverYear} th`
                            }
                        </span>
                    </div>
                </div>
                <div className="content">
                    {
                        this.state.isListReady ? (
                            <Motion
                                style={{
                                    opacity: spring(this.state.end),
                                }}
                                defaultStyle={{
                                    opacity: this.state.start,
                                }}
                            >
                                {
                                    ({opacity}) => (
                                        <div
                                            className="departmentList"
                                            style={{opacity: opacity}}>
                                            <ul>
                                                {
                                                    this.props.memberList.map((item, index) => (
                                                        <li key={item.name}
                                                            className={this.state.selectedIndex === index ? 'selected' : ''}>
                                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
                                                            <a href="javascript: void(0)"
                                                               style={this.state.selectedIndex === index ? {color: colorMembers[this.props.memberMotionIndex].backgroundColor} : {}}
                                                               onClick={(e) => {this.changeDepartmentHandler(e, item)}}
                                                               indexof={index}>
                                                                {
                                                                    departIdMap[item]
                                                                }
                                                            </a>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </Motion>
                        ) : (
                            <Loading/>
                        )
                    }
                    {
                        this.state.selectedIndex > -1 ? (
                            <div className="memberList">
                                {
                                    this.state.isMemberReady ? (
                                        <div>
                                            <Motion
                                                style={{
                                                    opacity: spring(this.state.end),
                                                    marginLeft: spring(this.state.marginLeft),
                                                }}
                                                defaultStyle={{
                                                    opacity: this.state.start,
                                                    marginLeft: this.state.marginLeft,
                                                }}
                                            >
                                                {
                                                    ({
                                                         opacity, marginLeft,
                                                    }) => (
                                                        <div
                                                            className="memberList_container"
                                                            style={{
                                                                opacity: opacity,
                                                                marginLeft: marginLeft,
                                                            }}>
                                                            {
                                                                this.state.currentDepartMembers.map((item, index) => (
                                                                    <div className="father_item"
                                                                         key={`father_item${index}`}>
                                                                        {
                                                                            item.map((item) => (
                                                                                <div className="child_item" key={`${item ? item.name : ''}`}>
                                                                                    {/*eslint-disable-next-line*/}
                                                                                    <a href='' onClick={(e) => {e.preventDefault();}}>
                                                                                        <div className="img">
                                                                                            <img src={item ? item.image : ''}
                                                                                                 alt={''}/>
                                                                                        </div>
                                                                                        <div className="name">
                                                                                            <span>
                                                                                                {
                                                                                                    item ? item.name : ''
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="description">
                                                                                            <span>
                                                                                                {
                                                                                                    item ? item.info : ''
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </a>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </Motion>

                                            {
                                                this.state.currentDepartMembers.length > 1 ? (
                                                    <div className="page_selection">
                                                        {
                                                            this.state.currentDepartMembers.map((item, index) => (
                                                                <div
                                                                    className={`selection ${this.state.currentPage === index ? 'selected' : ''}`}
                                                                    key={index}
                                                                    onClick={this.pageHandler(index)}>

                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                    ) : (
                                        <div className={'loading'}>
                                            <Loading/>
                                        </div>
                                    )
                                }
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        )
    }
}

export default connect(map)(MemberDetailed);