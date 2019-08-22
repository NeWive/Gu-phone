import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Motion, spring} from "react-motion";
import {departmentPanel} from "../config/style.config";
import DepartmentDetailed from "../component/Index/DepartmentDetailed";

function map(state) {
    return {
        departmentMotionIndex: state.departmentMotionIndex,
        isCoverMotive: state.isCoverMotive,
    }
}

class ElementPanelCover extends PureComponent {
    constructor(props){
        super(props);
        this.restHandler = this.restHandler.bind(this);
        this.state = {
            isFinish: false,
        };
        this.setIsFinish = this.setIsFinish.bind(this);
    }
    setIsFinish() {
        this.setState((pre) => (
            {
                isFinish: !pre.isFinish,
            }
        ));
    }
    restHandler() {
        this.props.dispatch({
            type: 'SET_IS_DEPARTMENT_READY'
        });
        this.setIsFinish();
        if(!this.props.isCoverMotive) {
            this.props.dispatch({
                type: 'SET_IS_DEPARTMENT_SEL_MOTIVE'
            });
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'SET_IS_COVER_MOTIVE',
        })
    }
    render() {
        return (
            <Motion
                style={{
                    opacity: spring(this.props.isCoverMotive ? departmentPanel.opacity.end : departmentPanel.opacity.start, {
                        precision: 0.01
                    }),
                    width: spring(this.props.isCoverMotive ? departmentPanel.baseEndArg.width : departmentPanel.baseStartArgs.width, {
                        precision: 0.01
                    }),
                    height: spring(this.props.isCoverMotive ? departmentPanel.baseEndArg.height : departmentPanel.baseStartArgs.height,{
                        precision: 0.01
                    }),
                    left: spring(this.props.isCoverMotive ? departmentPanel.panelEndArgs[this.props.departmentMotionIndex].left : departmentPanel.panelStartArgs.left, {
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
                                <DepartmentDetailed isFinish={this.state.isFinish}/>
                        </div>
                    )
                }
            </Motion>
        )
    }
}

export default connect(map)(ElementPanelCover);