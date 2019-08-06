import React, { PureComponent } from 'react';
import { Button } from './Button';
import { historyYearList } from "../config/list.config";
import { colorMembers } from "../config/style.config";
import { connect } from "react-redux";
import './HistoriesSelection.css';

function map(state) {
    return {
        historyIndex: state.historyIndex,
        isHistoryArrowSettled: state.isHistoryArrowSettled,
        isHistoryRequesting: state.isHistoryRequesting,
    }
}

class HistoriesSelection extends PureComponent {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        // this.restHandler = this.restHandler.bind(this);
    }
    clickHandler(index) {
        return async () => {
            this.props.dispatch({
                type: 'SET_IS_HISTORY_ARROW_SETTLED',
                value: false,
            });
            this.props.dispatch({
                type: 'SET_HISTORY_INDEX',
                value: index,
            });
            if(this.props.start === 0) {
                await this.props.exchangeHandler({
                    start: 1,
                    end: 0,
                });
            }
            // await this.restHandler();
        }
    }

    render() {
        return (
            <div id="HistoriesSelection">
                {
                    historyYearList.map((item, index) => (
                        <Button value={item}
                                key={index}
                                style={{
                                    backgroundColor: colorMembers[index].backgroundColor
                                }}
                                clickHandler={this.clickHandler(index)}/>
                    ))
                }
            </div>
        )
    }
}

export default connect(map)(HistoriesSelection);