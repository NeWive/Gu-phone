import React, {PureComponent} from 'react';
import {CloseButton} from "../../element/CloseButton";
import {connect} from 'react-redux';
import Loading from "../../element/Loading";
import {Motion, spring} from 'react-motion';
import {membersList} from "../../config/list.config";
import {colorMembers} from "../../config/style.config";
import android from '../../static/icons8-android-64.png';
import './MemberDetailed.css';

function map(state) {
    return {
        memberMotionIndex: state.memberMotionIndex,
        isMemberCoverMotive: state.isMemberCoverMotive,
    }
}

class MemberDetailed extends PureComponent {
    constructor(props) {
        super(props);
        this.tempData = [
            {
                img: android,
                name: '你爸爸1',
                description: '我是你爸爸'
            },
            {
                img: android,
                name: '你爸爸2',
                description: '我是你爸爸'
            }, {
                img: android,
                name: '你爸爸3',
                description: '我是你爸爸'
            }, {
                img: android,
                name: '你爸爸4',
                description: '我是你爸爸'
            }
        ];
        this.state = {
            departments: ['UI', '前端', '程序', '安卓', '游戏'],
            index: 0,
            currentDepartMembers: [],
            isListReady: false,
            isMemberReady: false,
            start: 0,
            end: 1,
            selectedIndex: -1,
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
    }
    memberHandler() {
        let pages = [];
        let total = 6;
        let j = 0;
        for(let i = 0; i < total/4; i++) {
            let tempArr = [];
            for(let temp = 0; j < total && temp < 6; j++, temp++) {
                tempArr.push({
                    img: android,
                    name: `你爸爸${j}`,
                    description: '我是你爸爸'
                });
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

    async changeDepartmentHandler(event) {  //模拟请求
        event.stopPropagation();
        let target = event.target;
        // essential
        await this.setIsMemberReady(false);
        //
        console.log(target);
        await this.setSelectedIndex(parseInt(target.getAttribute('indexof')));
        setTimeout(() => {
            this.setIsMemberReady(true);
        }, 2000);
    }

    setIsListReady(status) {
        this.setState({
            isListReady: status,
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setIsListReady(true);
            this.memberHandler();
        }, 2000)
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
                                `20${membersList[this.props.memberMotionIndex].year}届 The 20${membersList[this.props.memberMotionIndex].year} th`
                            }
                        </span>
                    </div>
                </div>
                <div className="content">
                    {
                        this.state.isListReady ? (
                            <Motion
                                style={{opacity: spring(this.state.end)}}
                                defaultStyle={{opacity: this.state.start}}
                            >
                                {
                                    ({opacity}) => (
                                        <div
                                            className="departmentList"
                                            style={{opacity: opacity}}>
                                            <ul>
                                                {
                                                    this.state.departments.map((item, index) => (
                                                        <li key={item}
                                                            className={this.state.selectedIndex === index ? 'selected' : ''}>
                                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
                                                            <a href="javascript: void(0)"
                                                               style={this.state.selectedIndex === index ? {color: colorMembers[this.props.memberMotionIndex].backgroundColor} : {}}
                                                               onClick={this.changeDepartmentHandler}
                                                               indexof={index}>
                                                                {
                                                                    item
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
                                        <Motion
                                            style={{opacity: spring(this.state.end)}}
                                            defaultStyle={{opacity: this.state.start}}
                                        >
                                            {
                                                ({opacity}) => (
                                                    <div
                                                        className="memberList_container"
                                                        style={{opacity: opacity}}>
                                                        {
                                                            this.state.currentDepartMembers.map((item, index) => (
                                                                <div className="father_item"
                                                                     key={`father_item${index}`}>
                                                                    {
                                                                        item.map((item, index) => (
                                                                            <div className="child_item">
                                                                                <a href={"javascript: void(0)"}>
                                                                                    <div className="img">
                                                                                        <img src={item.img} alt={''}/>
                                                                                    </div>
                                                                                    <div className="name">
                                                                                <span>
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </span>
                                                                                    </div>
                                                                                    <div className="description">
                                                                                <span>
                                                                                    {
                                                                                        item.description
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
                                                        <ul>
                                                            {
                                                                this.state.currentDepartMembers.map((item) => (
                                                                    <li key={item.name}>
                                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
                                                                        <a href={"javascript: void(0)"}>
                                                                            <div className="img">
                                                                                <img src={item.img} alt={''}/>
                                                                            </div>
                                                                            <div className="name">
                                                                                <span>
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="description">
                                                                                <span>
                                                                                    {
                                                                                        item.description
                                                                                    }
                                                                                </span>
                                                                            </div>
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