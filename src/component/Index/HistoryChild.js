import React, { PureComponent } from 'react';
import HistoriesContainer from "../../element/HistoriesContainer";
import HistoriesSelection from '../../element/HistoriesSelection';
import axios from 'axios';
import { connect } from 'react-redux';
import { urlInterfaceGroup } from "../../config/url.config";
import './HistoryChild.css';

function map(state) {
    return {
        isHistoryArrowSettled: state.isHistoryArrowSettled,
        historyIndex: state.historyIndex,
    }
}

class HistoryChild extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            start: 0,
            end: 1,
            index: 0,
            marginLeft: 0,
        };
        this.requestHandler = this.requestHandler.bind(this);
        this.exchangeHandler = this.exchangeHandler.bind(this);
        this.contentHandler = this.contentHandler.bind(this);
        HistoryChild.pageHandler = HistoryChild.pageHandler.bind(this);
        this.setLeftHandler = this.setLeftHandler.bind(this);
    }
    setLeftHandler(marginLeft, index) {
        this.setState({
            marginLeft: marginLeft,
            index: index,
        });
    }
    static pageHandler(historyList) {
        for(let item in historyList) {
            if(historyList.hasOwnProperty(item)) {
                let pages = [];//每页4个
                let total = historyList[item].length;//fake request
                let j = 0;
                for (let i = 0; i < total / 4; i++) {
                    let tempArr = [];
                    for (let temp = 0; j < total && temp < 4; j++, temp++) {
                        tempArr.push(historyList[item][j]);
                    }
                    pages.push(tempArr);
                }
                historyList[item] = pages;
            }
        }
        return historyList;
    }
    async contentHandler(list) {
        let historyList = {};
        let yearList = [];
        for(let item of list) {
            if(!historyList[item.year]) {
                historyList[item.year] = [];
                yearList.push(item.year);
            }
            historyList[item.year].push(item);
        }
        historyList = HistoryChild.pageHandler(historyList);
        console.log(historyList);
        await this.props.dispatch({
            type: 'SET_HISTORY_BY_YEAR',
            value: historyList,
        });
        await this.props.dispatch({
            type: 'SET_HISTORY_YEAR_LIST',
            value: yearList,
        });
        await this.props.dispatch({
            type: 'SET_SELECTED_YEAR',
            value: yearList[0],
        });
    }
    async requestHandler() {
        let { 'data': { list } } = await axios.get(urlInterfaceGroup.story.interface);
        this.contentHandler(list);
    }
    exchangeHandler({start, end}) {
        this.setState({
            start: start,
            end: end,
        })
    }
    componentDidMount() {
        this.requestHandler();
    }
    render() {
        return (
            <div id="HistoryChild">
                <HistoriesContainer
                    start={this.state.start}
                    end={this.state.end}
                    exchangeHandler={this.exchangeHandler}
                    setLeftHandler={this.setLeftHandler}
                    index={this.state.index}
                    marginLeft={this.state.marginLeft}
                    />
                <HistoriesSelection
                    exchangeHandler={this.exchangeHandler}
                    start={this.state.start}
                    setLeftHandler={this.setLeftHandler}
                />
            </div>
        )
    }
}

export default connect(map)(HistoryChild);