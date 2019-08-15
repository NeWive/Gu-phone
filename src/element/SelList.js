import React, { PureComponent } from 'react';
import { naviList } from '../config/list.config';
import { connect } from 'react-redux';
import './SelList.css';

function mapStateToProps(state) {
    return {
        isPortalOn: state.isPortalOn,
        motive: state.motive,
    }
}

class SelList extends PureComponent{
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
    }
    clickHandler() {
        let root = document.getElementById(`root`);
        root.style.overflow = 'hidden';
        root.style.height = `${window.innerHeight}px`;
        this.props.dispatch({
            type: 'OPERATING_PORTAL'
        });
    }
    async scrollHandler(top) {
        if(!this.props.motive) {
            await this.props.dispatch({
                type: 'SET_MOTIVE'
            });
        }
        window.scrollTo({
            top: top,
            behavior: 'smooth',
        })
    }
    render() {
        return (
            <div id="SelList">
                <ul className="list">
                    {
                        naviList.map((item) => (
                            <li className={item.name} key={item.name}>
                                {/* eslint-disable-next-line no-script-url,jsx-a11y/anchor-is-valid */}
                                <a href='' onClick={item.name === 'joinUs' ? this.clickHandler : () => { this.scrollHandler(item.top).then(r => {}) }}>
                                    {
                                        item.value
                                    }
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SelList);