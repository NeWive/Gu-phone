import React, { PureComponent } from 'react';
// import first from '../../static/818997.jpg';
// import second from '../../static/891543.png';
// import third from '../../static/1002832.jpg';
import WorksCover from "../../element/WorksCover";
import { Button } from "../../element/Button";
import { connect } from 'react-redux';
import { StaggeredMotion, spring, Motion } from "react-motion/lib/react-motion";
import { workDetailedStyles } from "../../config/style.config";
import { url, urlInterfaceGroup } from "../../config/url.config";
import axios from 'axios';
import './WorksDetailed.css';

function map(state) {
    return {
        isWorksCoverOn: state.isWorksCoverOn,
        isWorksCoverMotive: state.isWorksCoverMotive,
        website: state.website,
    }
}

class WorksDetailed extends PureComponent {
    constructor(props){
        super(props);
        // this.displayList = [
        //     {
        //         shotCut: first,
        //         name: 'YoRha 2B',
        //     },
        //     {
        //         shotCut: second,
        //         name: '5Jo'
        //     },
        //     {
        //         shotCut: third,
        //         name: 'Alice',
        //     },
        // ];
        this.state = {
            index: 4,
            left: -1593,
            website: [],
            styles: [],
        };
        this.setIndex = this.setIndex.bind(this);
        this.setLeft = this.setLeft.bind(this);
        this.exchangeImgHandler = this.exchangeImgHandler.bind(this);
        this.openDetailedHandler = this.openDetailedHandler.bind(this);
        this.requestForWorks = this.requestForWorks.bind(this);
        this.setWorks = this.setWorks.bind(this);
        WorksDetailed.contentHandler = WorksDetailed.contentHandler.bind(this);
    }
    setWorks(website) {
        this.setState({
            website: website,
        })
    }
    async requestForWorks() {
        let { 'data': { list } } = await axios.get(urlInterfaceGroup.works.interface);
        list.map((item) => {
            item.image = `${url}${item.image}`;
            return '';
        });
        let listChild = list.slice(0, 3);
        this.setWorks([...listChild, ...listChild, ...listChild]);
        this.props.dispatch({
            type: 'SET_WEBSITE',
            value: list,
        });
    }
    static contentHandler(list) {
        let pages = [];//每页6个
        let total = 7;//fake request
        let j = 0;
        for(let i = 0; i < total / 6; i++) {
            let tempArr = [];
            for(let temp = 0; j < total && temp < 6; j++, temp++) {
                tempArr.push(list[j]);
            }
            pages.push(tempArr);
        }
        return pages;
    }
    async openDetailedHandler() {
        let pages = WorksDetailed.contentHandler(this.props.website);
        await this.props.dispatch({
            type: 'SET_IS_WORKS_COVER_ON',
            value: true,
        });
        await this.props.dispatch({
            type: 'SET_IS_WORKS_COVER_MOTIVE',
            value: true,
        });
        await this.props.dispatch({
            type: 'SET_WEBSITE_FOR_DISPLAY',
            value: pages,
        })
    }
    exchangeImgHandler(index, url) {
        let ctx = this;
        return () => {
            // eslint-disable-next-line no-restricted-globals
            // event.stopPropagation();
            // eslint-disable-next-line no-restricted-globals
            // console.log(event.target);
            if(index === 0 || index === 8) {
                document.getElementById('images').style.left = index === 0 ? `${workDetailedStyles.leftList[3]}px` : `${workDetailedStyles.leftList[5]}px`;
                ctx.setIndex(index === 0 ? 3 : 5);
            }else if(index === this.state.index) {
                window.location.href = url.url;
            }else {
                ctx.setIndex(index);
            }
        }
    }
    setLeft(left){
        this.setState({
            left: left,
        })
    }
    setIndex(index) {
        this.setState({
            index: index,
        })
    }
    componentDidMount() {
        this.requestForWorks();
    }
    render() {
        return (
            <div id="WorksDetailed">
                <div className="window">
                    <Motion
                        defaultStyle={{
                            left: -1593
                        }}
                        style={{
                            left: spring(workDetailedStyles.leftList[this.state.index])
                        }}>
                        {
                            ({ left }) => (
                                <div
                                    id={'images'}
                                    className="images"
                                    style={{
                                        left: left,
                                    }}>
                                    <StaggeredMotion
                                        defaultStyles={
                                            [workDetailedStyles.notCenter, workDetailedStyles.notCenter, workDetailedStyles.notCenter, workDetailedStyles.notCenter, workDetailedStyles.notCenter,
                                                workDetailedStyles.notCenter, workDetailedStyles.notCenter, workDetailedStyles.notCenter, workDetailedStyles.notCenter]
                                        }
                                        styles={preStyle => preStyle.map((item, index) => {
                                            return index === this.state.index ? {
                                                paddingTop: spring(43),
                                                paddingRight: spring(27),
                                                paddingBottom: spring(45),
                                                paddingLeft: spring(30),
                                                marginLeft: spring(-220),
                                                marginRight: spring(-194),
                                                width: spring(595),
                                                height: spring(302),
                                                imgZIndex: spring(6),
                                            } : {
                                                paddingTop: spring(23),
                                                paddingRight: spring(19),
                                                paddingBottom: spring(26),
                                                paddingLeft: spring(19),
                                                marginLeft: spring(0),
                                                marginRight: spring(0),
                                                width: spring(493),
                                                height: spring(250),
                                                imgZIndex: spring(6),
                                            }
                                        })}>
                                        {
                                            styles => (
                                                <div>
                                                    {
                                                        styles.map((item, index) => (
                                                            <div style={{
                                                                paddingTop: item.paddingTop,
                                                                paddingBottom: item.paddingBottom,
                                                                paddingLeft: item.paddingLeft,
                                                                paddingRight: item.paddingRight,
                                                                marginLeft: item.marginLeft,
                                                                marginRight: item.marginRight,
                                                                zIndex: this.state.index === index ? '7' : '5',
                                                                backgroundColor: this.state.index === index ? '#19AEFF' : '#B7E6FF',
                                                                display: 'inline-block',
                                                                verticalAlign: 'middle',
                                                                overflow: 'hidden',
                                                                borderRadius: '20px',
                                                                position: 'relative',
                                                                cursor: index === this.state.index ? 'pointer' : 'default'
                                                            }}
                                                                 onClick={this.exchangeImgHandler(index, this.state.website[index])}
                                                                key={index}>
                                                                <div className={`img`} style={{
                                                                    position: 'relative'
                                                                }}>
                                                                    <img
                                                                        src={this.state.website[index] ? this.state.website[index].image : ''}
                                                                        alt=""
                                                                        style={{
                                                                            position: 'relative',
                                                                            width: item.width,
                                                                            height: item.height,
                                                                            zIndex: item.imgZIndex + '',
                                                                        }}/>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </StaggeredMotion>
                                </div>
                            )
                        }
                    </Motion>
                </div>
                <div className="name">
                    {
                        this.state.website[this.state.index] ? this.state.website[this.state.index].name : ''
                    }
                </div>
                <div className="detailed">
                    <div className="button_box">
                        <Button value={'查看更多'}
                            clickHandler={this.openDetailedHandler}/>
                    </div>
                </div>
                {
                    this.props.isWorksCoverOn ? (
                        <WorksCover/>
                    ) : ''
                }
            </div>
        )
    }
}

export default connect(map)(WorksDetailed);