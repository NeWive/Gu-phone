import React, { PureComponent } from 'react';
import ElementPanel from "../../element/ElementPanel";
// import { membersList } from "../../config/list.config";
import { urlInterfaceGroup } from "../../config/url.config";
import {colorMembers} from "../../config/style.config";
import { connect } from 'react-redux';
import axios from 'axios';
import './MembersChild.css';
// import {membersList} from "../../config/list.config";

function map(state) {
    return {
        isMemberSelMotive: state.isMemberSelMotive,
        memberMotionIndex: state.memberMotionIndex,
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
    }
    setMemberList(memberList) {
        this.setState({
            memberList: memberList,
        })
    }
    async requestForMembersByYear() {
        let { 'data': { 'member': list } } = await axios.get(urlInterfaceGroup.memberList.interface);
        list = list.slice(0, 5);
        this.setMemberList(list);
    }
    componentDidMount() {
        this.requestForMembersByYear();
    }
    clickHandler(index, year) {
        let ctx = this;
        return () => {
            console.log(index);
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
                {
                    this.state.memberList.map((item, index) => (
                        <ElementPanel
                            key={item.year}
                            name={item.year}
                            style={colorMembers[index]}
                            clickHandler={this.clickHandler(index, item.year)}
                            isCoverOn={this.props.isMemberSelMotive && this.props.memberMotionIndex === index}
                            identity={'MemberChild'}
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
}

export default connect(map)(MembersChild);