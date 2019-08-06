import React, { PureComponent } from 'react';
import ElementPanel from "../../element/ElementPanel";
import { membersList } from "../../config/list.config";
import {colorMembers} from "../../config/style.config";
import { connect } from 'react-redux';
import './MembersChild.css';

function map(state) {
    return {
        isMemberSelMotive: state.isMemberSelMotive,
        memberMotionIndex: state.memberMotionIndex,
    }
}

class MembersChild extends PureComponent {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(index) {
        let ctx = this;
        return () => {
            console.log(index);
            ctx.props.dispatch({
                type: 'SET_MEMBER_MOTION_INDEX',
                value: index,
            })
        }
    }
    render() {
        return (
            <div id="MembersChild">
                {
                    membersList.map((item, index) => (
                        <ElementPanel
                            key={item.year}
                            name={item.year}
                            style={colorMembers[index]}
                            clickHandler={this.clickHandler(index)}
                            isCoverOn={this.props.isMemberSelMotive && this.props.memberMotionIndex === index}
                            identity={'MemberChild'}
                            >
                            <div className="container">
                                <div className="year_large">
                                    <span>
                                        {
                                            `${item.year}’`
                                        }
                                    </span>
                                </div>
                                <div className="year_small">
                                    <span>
                                        {
                                            `20${item.year}届`
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