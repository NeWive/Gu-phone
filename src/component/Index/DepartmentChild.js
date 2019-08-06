import React, { PureComponent } from 'react';
import ElementPanel from "../../element/ElementPanel";
import { departmentList } from "../../config/list.config";
import { colorDepartment } from "../../config/style.config";
import android from '../../static/icons8-android-64.png';
import js from '../../static/icons8-js-64.png';
import navigation from '../../static/icons8-navigation-toolbar-bottom-64.png';
import python from '../../static/icons8-python-64.png';
import unity from '../../static/icons8-unity-50.png';
import { connect } from 'react-redux';
import './DepartmentChild.css';

function map(state) {
    return {
        isDepartmentSelMotive: state.isDepartmentSelMotive,
        departmentMotionIndex: state.departmentMotionIndex,
    }
}

class DepartmentChild extends PureComponent {
    constructor(props){
        super(props);
        this.logo = {
            'UI': navigation,
            'FrontEnd Develop': js,
            'BackEnd Develop': python,
            'Android Develop': android,
            'Game Develop': unity,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(index) {
        let ctx = this;
        return () => {
            ctx.props.dispatch({
                type: 'SET_DEPARTMENT_MOTION_INDEX',
                value: index,
            })
        }
    }
    render() {
        return (
            <div id="DepartmentChild">
                {
                    departmentList.map((item, index) => (
                        <ElementPanel
                            key={item.key}
                            name={item.key}
                            style={colorDepartment[index]}
                            clickHandler={this.clickHandler(index)}
                            isCoverOn={this.props.isDepartmentSelMotive && this.props.departmentMotionIndex === index}
                            identity={'DepartmentChild'}
                            >
                            <div className="container">
                                <div className="logo">
                                    <img src={this.logo[item.key]} alt=""/>
                                </div>
                                <div className="name">
                                    {
                                        item.name
                                    }
                                </div>
                            </div>
                        </ElementPanel>
                    ))
                }
            </div>
        )
    }
}

export default connect(map)(DepartmentChild);