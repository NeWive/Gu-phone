import React, { PureComponent } from 'react';
import { Button } from './Button';
import { colorMembers } from "../config/style.config";
import { connect } from "react-redux";
import './HistoriesSelection.css';

function map(state) {
    return {
        historyIndex: state.historyIndex,
        isHistoryArrowSettled: state.isHistoryArrowSettled,
        isHistoryRequesting: state.isHistoryRequesting,
        historyYearList: state.historyYearList,
    }
}

class HistoriesSelection extends PureComponent {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        // this.restHandler = this.restHandler.bind(this);
    }
    clickHandler(index, selectedYear) {
        return async () => {
            this.props.setLeftHandler(0, 0);
            this.props.dispatch({
                type: 'SET_HISTORY_INDEX',
                value: index,
            });
            await this.props.dispatch({
                type: 'SET_SELECTED_YEAR',
                value: selectedYear,
            });
            if(this.props.start === 0) {
                await this.props.exchangeHandler(1,0);
            }
            // await this.restHandler();
        }
    }

    render() {
        return (
            <div id="HistoriesSelection">
                {
                    this.props.historyYearList.map((item, index) => (
                        <Button value={item}
                                key={index}
                                style={{
                                    backgroundColor: colorMembers[index].backgroundColor
                                }}
                                clickHandler={this.clickHandler(index, item)}/>
                    ))
                }
            </div>
        )
    }
}

export default connect(map)(HistoriesSelection);