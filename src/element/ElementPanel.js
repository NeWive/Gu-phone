import React, { PureComponent } from 'react';
import ElementPanelCover from "./ElementPanelCover";
import MemberPanelCover from "./MemberPanelCover";
import './ElementPanel.css';

class ElementPanel extends PureComponent {
    render() {
        return (
            <div className="ElementPanel"
                 style={this.props.style || ''}
                 key={this.props.name}
                 onClick={this.props.clickHandler}>
                {
                    this.props.children
                }
                {
                    (() => {
                        switch(this.props.identity) {
                            case 'DepartmentChild': {
                                return (
                                    this.props.isCoverOn ? (
                                        <ElementPanelCover identity={this.props.identity}/>
                                    ) : ''
                                )
                            }case 'MemberChild': {
                                return (
                                    this.props.isCoverOn ? (
                                        <MemberPanelCover identity={this.props.identity}/>
                                    ) : ''
                                )
                            }default:
                                break;
                        }
                    })()
                }
            </div>
        )
    }
}

export default ElementPanel;