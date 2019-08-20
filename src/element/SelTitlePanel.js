import React, { PureComponent } from 'react';
import'./SelTitlePanel.css';
class SelPanel extends PureComponent{
    render() {
        return (
            <div className={`SelPanel ${this.props.name}`} key={this.props.name}>
                <div className="title_container"  style={this.props.style}>
                    <div className="title_box">
                        <div className="up">
                            <span className="left">
                                {
                                    this.props.description.left
                                }
                            </span>

                            <span className="right">
                                {
                                    this.props.description.right
                                }
                            </span>
                        </div>
                        <div className="down">
                            <span>
                                {
                                    this.props.description.down
                                }
                            </span>
                        </div>
                    </div>
                    <div className="detailed_box">
                        {
                            this.props.description.detailed ? this.props.description.detailed.map((item, index) => (
                                <div className="detailed" key={index}>
                                    {
                                        item
                                    }
                                </div>
                            )) : ''
                        }
                    </div>
                </div>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default SelPanel;