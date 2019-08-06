import React, { PureComponent } from 'react';
import { selTitleList } from "../../config/list.config";
import SelPanel from "../../element/SelTitlePanel";
import { connect } from 'react-redux';
import { Motion, spring } from "react-motion/lib/react-motion";
import AboutUsChild from './AboutUsChild';
import DepartmentChild from "./DepartmentChild";
import MembersChild from "./MembersChild";
import HistoryChild from "./HistoryChild";
import WorksDetailed from "./WorksDetailed";
import CommentChild from "./CommentChild";
import './IndexBody.css';
import IndexFooter from "./IndexFooter";

function map(state) {
    return {
        motive: state.motive,
        isDepartmentSelMotive: state.isDepartmentSelMotive,
    }
}
class IndexBody extends PureComponent {
    constructor(props){
        super(props);
        this.childComponentHandler = this.childComponentHandler.bind(this);
    }
    childComponentHandler(item) {
        switch (item.name) {
            case 'aboutUs' : {
                return (
                    <AboutUsChild/>
                );
            }
            case 'departments': {
                return (
                    <DepartmentChild/>
                );
            }
            case 'members': {
                return (
                    <MembersChild/>
                )
            }
            case 'history': {
                return (
                    <HistoryChild/>
                )
            }
            case 'works': {
                return (
                    <WorksDetailed/>
                )
            }
            case 'comments': {
                return (
                    <CommentChild/>
                )

            }
            default :
                return '';
        }
    }
    render() {
        return (
            <div>
                <Motion style={{
                    marginTop: spring(!this.props.motive ? 0 : -178),
                }}>
                    {
                        ({marginTop}) => (
                            <div id="IndexBody" style={{marginTop: marginTop}}>
                                {
                                    selTitleList.map((item) => (
                                        <SelPanel
                                            description={item.description}
                                            key={item.name}
                                            name={item.name}>
                                            {
                                                this.childComponentHandler(item)
                                            }
                                        </SelPanel>
                                    ))
                                }
                            </div>
                        )
                    }
                </Motion>
                <div className="index_footer_box">
                    <IndexFooter/>
                </div>
            </div>
        )
    }
}

export default connect(map)(IndexBody);