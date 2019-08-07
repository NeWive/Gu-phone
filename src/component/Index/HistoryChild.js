import React, { PureComponent } from 'react';
import HistoriesContainer from "../../element/HistoriesContainer";
import HistoriesSelection from '../../element/HistoriesSelection';
import { connect } from 'react-redux';
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
            histories: [
                [
                    {
                        title: '部门拆分',
                        content: 'UI设计，前端开发',
                    },
                    {
                        title: '新增成员',
                        content: '6人',
                    },
                    {
                        title: '项目上线',
                        content: '中国海洋大学iGEM比赛团队展示页面',
                    },
                    {
                        title: '项目上线',
                        content: '海洋技术系网站上线运营',
                    },
                ],
                [
                    {
                        title: '项目上线',
                        content: '海洋技术系网站上线运营',
                    }
                ]
            ],
            start: 0,
            end: 1,
        };
        this.requestHandler = this.requestHandler.bind(this);
        this.exchangeHandler = this.exchangeHandler.bind(this);
    }
    requestHandler() {
        setTimeout(async () => {//模拟请求
            console.log(this.props.historyIndex);
            this.exchangeHandler({
                start: 0,
                end: 1,
            });
            await this.props.dispatch({
                type: 'SET_IS_HISTORY_REQUESTING',
                value: false,
            });
        }, 1000)
    }
    exchangeHandler({start, end}) {
        this.setState({
            start: start,
            end: end,
        })
    }
    render() {
        return (
            <div id="HistoryChild">
                <HistoriesContainer
                    histories={this.state.histories}
                    start={this.state.start}
                    end={this.state.end}
                    requestHandler={this.requestHandler}
                    />
                <HistoriesSelection
                    exchangeHandler={this.exchangeHandler}
                    start={this.state.start}/>
            </div>
        )
    }
}

export default connect(map)(HistoryChild);