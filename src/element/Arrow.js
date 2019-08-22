import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import './Arrow.css';

class Arrow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.3,
        };
        this.setOpacity = this.setOpacity.bind(this);
        this.mouseHandler = this.mouseHandler.bind(this);
    }
    mouseHandler(e, value) {
        e.preventDefault();
        e.stopPropagation();
        this.setOpacity(value);
    }
    setOpacity(value) {
        this.setState({
            opacity: value,
        })
    }
    render() {
        return (
            <Motion defaultStyle={{
                opacity: 0.3,
            }} style={{
                opacity: spring(this.state.opacity, {
                    precision: 0.2,
                })
            }}>
                {
                    ({ opacity }) => (
                        <div className="arrow_box_for_page"
                             id={this.props.id}
                             onClick={this.props.clickHandler ? this.props.clickHandler : () => {}}
                            style={{
                                opacity: opacity,
                            }} onMouseEnter={(e) => { this.mouseHandler(e, 0.6); }}
                                onMouseLeave={(e) => { this.mouseHandler(e, 0.3); }}
                                onMouseDown={(e) => { this.mouseHandler(e, 0.9); }}
                                onMouseUp={(e) => { this.mouseHandler(e, 0.6); }}>
                            <div className="arrow_for_page_edge"/>
                        </div>
                    )
                }
            </Motion>
        )
    }
}

export default Arrow;