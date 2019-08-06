import React, { PureComponent } from 'react';
import WorksCoverDetailed from "../component/Index/WorksCoverDetailed";
import { Motion, spring} from 'react-motion';
import { connect } from 'react-redux';
import { departmentPanel, worksCover } from "../config/style.config";
import './WorksCover.css';

function map(state) {
    return {
        isWorksCoverOn: state.isWorksCoverOn,
        isWorksCoverMotive: state.isWorksCoverMotive,
    }
}

class WorksCover extends PureComponent {
    render() {
        return (
            <div id="WorksCover">
                <Motion style={{
                    opacity: spring(this.props.isWorksCoverMotive ? departmentPanel.opacity.end : departmentPanel.opacity.start),
                    width: spring(this.props.isWorksCoverMotive ? worksCover.width.end : worksCover.width.start),
                    height: spring(this.props.isWorksCoverMotive ? worksCover.height.end : worksCover.height.start),
                    top: spring(this.props.isWorksCoverMotive ? worksCover.top.end : worksCover.top.start),
                }}>
                    {
                        ({opacity, width, height, top}) => (
                            <div className="works_cover_box"
                                style={{
                                    opacity: opacity,
                                    width: width,
                                    height: height,
                                    top: top,
                                }}>
                                <WorksCoverDetailed/>
                            </div>
                        )
                    }
                </Motion>
            </div>
        )
    }
}

export default connect(map)(WorksCover);