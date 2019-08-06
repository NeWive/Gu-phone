import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Motion, spring} from "react-motion";
import {departmentPanel} from "../config/style.config";
import MemberDetailed from "../component/Index/MemberDetailed";

function map(state) {
    return {
        memberMotionIndex: state.memberMotionIndex,
        isMemberCoverMotive: state.isMemberCoverMotive,
    }
}

class MemberPanelCover extends PureComponent {
    constructor(props){
        super(props);
        this.restHandler = this.restHandler.bind(this);
    }
    restHandler() {
        if(!this.props.isMemberCoverMotive) {
            this.props.dispatch({
                type: 'SET_IS_MEMBER_SEL_MOTIVE'
            })
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'SET_IS_MEMBER_COVER_MOTIVE'
        })
    }
    render() {
        return (
            <Motion
                style={{
                    opacity: spring(this.props.isMemberCoverMotive ? departmentPanel.opacity.end : departmentPanel.opacity.start, {
                        precision: 0.01
                    }),
                    width: spring(this.props.isMemberCoverMotive ? departmentPanel.baseEndArg.width : departmentPanel.baseStartArgs.width, {
                        precision: 0.01
                    }),
                    height: spring(this.props.isMemberCoverMotive ? departmentPanel.baseEndArg.height : departmentPanel.baseStartArgs.height,{
                        precision: 0.01
                    }),
                    left: spring(this.props.isMemberCoverMotive ? departmentPanel.panelEndArgs[this.props.memberMotionIndex].left : departmentPanel.panelStartArgs.left, {
                        precision: 0.01
                    })
                }} onRest={this.restHandler}>
                {
                    ({
                         opacity, width, height, left
                     }) => (
                        <div className="element_panel_cover" style={{
                            opacity: opacity,
                            width: width,
                            height: height,
                            left: left,
                            cursor: 'default',
                        }}
                             onClick={(e) => {e.stopPropagation()}}>
                            <MemberDetailed/>
                        </div>
                    )
                }
            </Motion>
        )
    }
}
export default connect(map)(MemberPanelCover);

