import React, { PureComponent } from 'react';
import { CloseButton } from "../../element/CloseButton";
import { connect } from 'react-redux';
import { departmentList } from "../../config/list.config";
import Loading from "../../element/Loading";
import './DepartmentDetailed.css';
import {Motion, spring} from "react-motion/lib/react-motion";

function map(state) {
    return {
        departmentMotionIndex: state.departmentMotionIndex,
        isCoverMotive: state.isCoverMotive
    }
}

class DepartmentDetailed extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            isMotive: false,
            start: 0,
            end: 1,
            toClose: false,
        };
        this.closeHandler = this.closeHandler.bind(this);
        this.setContent = this.setContent.bind(this);
        this.contentHandler = this.contentHandler.bind(this);
        this.clearContent = this.clearContent.bind(this);
        this.exchangeState = this.exchangeState.bind(this);
    }
    exchangeState() {
        this.setState({
            start: 1,
            end: 0
        })
    }
    clearContent() {
        this.setState({
            content: '',
            toClose: true,
        })
    }
    setContent(content) {
        this.setState((preState) => {
            return {
                content: content,
                isMotive: !preState.isMotive,
            }
        });
    }
    contentHandler() {
        setTimeout(() => {
            this.setContent('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.');
        }, 2000);
    }
    async closeHandler() {
        this.exchangeState();
        this.clearContent();
        this.props.dispatch({
            type: 'SET_IS_COVER_MOTIVE'
        });
    }
    componentDidMount() {
        this.contentHandler();
    }

    render() {
        return (
            <div className="department_detailed">
                <div className="close_button_box">
                    <CloseButton
                        style={{borderColor: '#FFFFFF'}}
                        clickHandler={this.closeHandler}/>
                </div>
                <div className="title_box">
                    <div className="title">
                        <p>
                            部门介绍 Departments
                        </p>
                        <p>
                            {
                                `${departmentList[this.props.departmentMotionIndex].name} ${departmentList[this.props.departmentMotionIndex].key}`
                            }
                        </p>
                    </div>
                </div>
                <div className="content">
                    {
                        this.state.content && !this.state.toClose ? (
                            <Motion
                                style={{opacity: spring(this.state.end)}}
                                defaultStyle={{opacity: this.state.start}}>
                                {
                                    ({opacity}) => (
                                        <p style={{
                                            opacity: opacity
                                        }}>
                                            {
                                                this.state.content
                                            }
                                        </p>
                                    )
                                }
                            </Motion>
                        ) : (
                            <Loading/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default connect(map)(DepartmentDetailed);