import React, { PureComponent } from 'react';
import ElementPanel from "../../element/ElementPanel";
import { urlInterfaceGroup } from "../../config/url.config";
import {colorMembers} from "../../config/style.config";
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import Arrow from '../../element/Arrow';
import axios from 'axios';
import './MembersChild.css';

function map(state) {
    return {
        isMemberSelMotive: state.isMemberSelMotive,
        memberMotionIndex: state.memberMotionIndex,
        memberBeginVisible: state.memberBeginVisible,
    }
}

class MembersChild extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            memberList: [],
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.requestForMembersByYear = this.requestForMembersByYear.bind(this);
        this.setMemberList = this.setMemberList.bind(this);
        this.setMemberBeginVisible = this.setMemberBeginVisible.bind(this);
        this.toLeftHandler = this.toLeftHandler.bind(this);
        this.toRightHandler = this.toRightHandler.bind(this);
        this.departListByYear = [];
    }
    toLeftHandler() {
        if(this.props.memberBeginVisible > 0) {
            console.log('left');
            this.setMemberBeginVisible(this.props.memberBeginVisible - 1);
        }
    }
    toRightHandler() {
        if(this.props.memberBeginVisible < this.state.memberList.length - 5) {
            console.log('right');
            this.setMemberBeginVisible(this.props.memberBeginVisible + 1);
        }
    }
    setMemberBeginVisible(value) {
        this.props.dispatch({
            type: 'SET_MEMBER_BEGIN_VISIBLE',
            value: value,
        });
    }
    setMemberList(memberList) {
        this.setState({
            memberList: memberList,
        })
    }
    async requestForMembersByYear() {
        let { 'data': { 'member': list } } = await axios.get(urlInterfaceGroup.memberList.interface);
        if(list) {
            // list = list.slice(2);
            this.setMemberList(list);
        }else {
            this.setMemberList([]);
        }
    }
    componentDidMount() {
        this.requestForMembersByYear();
    }
    clickHandler(index, year) {
        let ctx = this;
        return () => {
            this.state.memberList.map((item) => {
                if(item.year === year) {
                    this.departListByYear = item.departments_id;
                }
                return '';
            });
            ctx.props.dispatch({
                type: 'SET_MEMBER_MOTION_INDEX',
                value: index,
            });
            ctx.props.dispatch({
                type: 'SET_MEMBER_COVER_YEAR',
                value: year,
            });
        };
    }
    render() {
        return (
            <div id="MembersChild">
                <div id="arrow_left" className="arrow_page_box">
                    <Arrow id={''} clickHandler={this.toLeftHandler}/>
                </div>
                <div id="arrow_right" className={'arrow_page_box'}>
                    <Arrow id={''} clickHandler={this.toRightHandler}/>
                </div>
                <Motion defaultStyle={{
                    left: 0,
                }} style={{
                    left: spring(this.props.memberBeginVisible * -265),
                }}>
                    {
                        ({ left }) => (
                            <div className="members_child_container" style={{
                                width: `${this.state.memberList.length * 265 - 25}px`,
                                left: left,
                            }}>
                                {
                                    this.state.memberList.map((item, index) => (
                                        <ElementPanel
                                            key={item.year}
                                            name={item.year}
                                            style={index >= this.state.memberList.length - 5 ? colorMembers[index - this.state.memberList.length + colorMembers.length] : colorMembers[0]}
                                            clickHandler={this.clickHandler((index), item.year)}
                                            isCoverOn={this.props.isMemberSelMotive && this.props.memberMotionIndex === index}
                                            identity={'MemberChild'}
                                            memberList={this.departListByYear}
                                        >
                                            <div className="container">
                                                <div className="year_large">
                                        <span>
                                            {
                                                `${item.year % 2000}’`
                                            }
                                        </span>
                                                </div>
                                                <div className="year_small">
                                        <span>
                                            {
                                                `${item.year}届`
                                            }
                                        </span>
                                                </div>
                                            </div>
                                        </ElementPanel>
                                    ))
                                }
                            </div>
                        )
                    }
                </Motion>
            </div>
        )
    }
}

export default connect(map)(MembersChild);