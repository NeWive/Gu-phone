import React, { PureComponent } from 'react';
import { Navigator } from './Index/Navigator';
import Banner from './Index/Banner';
import { PortalContainer } from "../element/PortalContainer";
import JoinUs from "./Index/JoinUs";
import { connect } from 'react-redux';
import IndexBody from './Index/IndexBody';
import './Index.css';
function map(state) {
    return {
        isPortalOn: state.isPortalOn,
        motive: state.motive,
    }
}

class Index extends PureComponent{
    constructor(props){
        super(props);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        if(!this.props.motive) {
            this.props.dispatch({
                type: 'SET_MOTIVE',
            });
        }
    }
    scrollHandler(e) {
        if(e.nativeEvent.deltaY < 0 && !this.props.motive) {
            this.props.dispatch({
                type: 'SET_MOTIVE',
            });
        }
    }
    render() {
        return (
            <div id={'Index'}
                 onWheel={this.scrollHandler}
                 onClick={this.clickHandler}>
                {
                    !this.props.isPortalOn ? '' : (
                        <PortalContainer>
                            <JoinUs/>
                        </PortalContainer>
                    )
                }
                <div className="navigator_box">
                    <Navigator/>
                </div>
                <div className="banner_box">
                    <Banner/>
                </div>
                <div className="index_body_box" style={{display: !this.props.motive ? 'none' : 'block'}}>
                    <IndexBody/>
                </div>
            </div>
        )
    }
}

export default connect(map)(Index);