import React, { PureComponent } from 'react';
import axios from 'axios';
import ElementPanel from "../../element/ElementPanel";
import { colorDepartment } from "../../config/style.config";
import android from '../../static/icons8-android-64.png';
import js from '../../static/icons8-js-64.png';
import navigation from '../../static/icons8-navigation-toolbar-bottom-64.png';
import python from '../../static/icons8-python-64.png';
import unity from '../../static/icons8-unity-50.png';
import { urlInterfaceGroup } from "../../config/url.config";
import { connect } from 'react-redux';
import './DepartmentChild.css';

function map(state) {
    return {
        isDepartmentSelMotive: state.isDepartmentSelMotive,
        departmentMotionIndex: state.departmentMotionIndex,
        departmentDescription: state.departmentDescription,
    }
}

class DepartmentChild extends PureComponent {
    constructor(props){
        super(props);
        this.logo = {
            '3': navigation,
            '2': js,
            '1': python,
            '5': android,
            '4': unity,
        };
        this.state = {
            departmentList: [],
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.requestHandler = this.requestHandler.bind(this);
        this.setDepartmentList = this.setDepartmentList.bind(this);
        this.requestDepartmentDetailed = this.requestDepartmentDetailed.bind(this);
    }
    setDepartmentList(list) {
        this.setState({
            departmentList: list,
        })
    }
    async requestDepartmentDetailed() {
        let { 'data': { list } } = await axios.get(urlInterfaceGroup.department.interface);
        this.props.dispatch({
            type: 'SET_DEPARTMENT_DESCRIPTION',
            value: list
        });
    }
    async requestHandler() {
        let { 'data': { list } } = await axios.get(urlInterfaceGroup.departmentList.interface);
        await this.setDepartmentList(list);
        if(!this.props.departmentDescription) {
            this.requestDepartmentDetailed();
        }
    }
    clickHandler(index, id) {
        this.props.dispatch({
            type: 'SET_DEPARTMENT_MOTION_INDEX',
            value: index,
        });
        this.props.dispatch({
            type: 'SET_DEPARTMENT_ID',
            value: id,
        });
    }
    componentDidMount() {
        this.requestHandler();
    }
    render() {
        return (
            <div id="DepartmentChild">
                {
                    this.state.departmentList.map((item, index) => (
                        <ElementPanel
                            key={item.id}
                            name={item.id}
                            style={colorDepartment[index]}
                            clickHandler={() => {
                                this.clickHandler(index, item.id)
                            }}
                            isCoverOn={this.props.isDepartmentSelMotive && this.props.departmentMotionIndex === index}
                            identity={'DepartmentChild'}
                            >
                            <div className="container">
                                <div className="logo">
                                    <img src={this.logo[`${item.id}`]} alt=""/>
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