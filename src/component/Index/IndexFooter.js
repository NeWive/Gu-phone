import React from 'react';
import { Logo } from '../../element/Logo';
import { groupInfoList } from "../../config/list.config";
import './IndexFooter.css';

class IndexFooter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        };
        this.resizeHandler = this.resizeHandler.bind(this);
        this.setWidth = this.setWidth.bind(this);
    }
    setWidth(w) {
        this.setState({
            width: w,
        })
    }
    resizeHandler() {
        let winWidth = window.innerWidth;
        console.log(winWidth);
        this.setWidth(winWidth);
    }
    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
        this.resizeHandler();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }
    render() {
        return (
            <div id="IndexFooter" style={{
                width: this.state.width
            }}>
                <div className="container">
                    <div className="logo_box">
                        <Logo/>
                        <div className="other">
                            <span>  · Contribute the future </span>
                        </div>
                    </div>
                    <div className="info_box">
                        {
                            groupInfoList.map((item, index) => (
                                <p key={index} style={index === 3 ? {
                                    marginBottom: 10,
                                } : {}}>
                                    {
                                        item
                                    }
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default IndexFooter;