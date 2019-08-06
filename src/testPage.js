// // import React from 'react';
// // import { spring, StaggeredMotion } from "react-motion";
// // import './testPage.css';
// // export class testPage extends React.Component {
// //     render() {
// //         // return (
// //         //     {/*<Motion defaultStyle={{x: 0, left: 0}} style={{x: spring(10), left: spring(1000)}}>*/}
// //         //     {/*    {*/}
// //         //     {/*        value => (*/}
// //         //     {/*            <div id='test' style={{left: value.left}}>*/}
// //         //     {/*                {*/}
// //         //     {/*                    value.x*/}
// //         //     {/*                }*/}
// //         //     {/*            </div>*/}
// //         //     {/*        )*/}
// //         //     {/*    }*/}
// //         //     {/*</Motion>*/}
// //         //
// //         // )
// //         // return (
// //         //     <StaggeredMotion
// //         //         defaultStyles={[{h: 0}, {h: 0}, {h: 0}]}
// //         //         styles={pre => pre.map((_, i) => {
// //         //             return i === 0
// //         //                 ? {h: spring(100)}
// //         //                 : {h: spring(pre[i - 1].h)}
// //         //         })}>
// //         //         {pre =>
// //         //             <div>
// //         //                 {pre.map((style, i) =>
// //         //                     <div key={i} style={{border: '1px solid', height: style.h}} />)
// //         //                 }
// //         //             </div>
// //         //         }
// //         //     </StaggeredMotion>
// //         // )
// //         return (
// //             <StaggeredMotion
// //                 defaultStyles = {[{w: 0}, {w: 0}, {w: 0}]}
// //                 styles = {pre => pre.map((item, index) => {
// //                     return index === 0 ? {w: spring(1024)} : {w: spring(pre[index - 1].w)}
// //                 })}>
// //                 {
// //                     pre => (
// //                         <div>
// //                             {
// //                                 pre.map((style, i) => (
// //                                     <div key={i} style={{border: '1px solid', width: style.w}}>
// //
// //                                     </div>
// //                                 ))
// //                             }
// //                         </div>
// //                     )
// //                 }
// //
// //             </StaggeredMotion>
// //         )
// //     }
// // }
// // //spring(value, config(normally no need to config))
// // //Motion
// // /*
// // <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
// //     {
// //         (interpolating) => (
// //             <div style={interpolatingStyle}>
// //
// //             </div>
// //         )
// //     }
// // </Motion>
// //  */
// //
// // //staggeredMotion
// // /*
// //
// //  */
//
// // import React from 'react';
// // import { connect } from 'react-redux';
// //
// // function mapStateToProps(state) {
// //     return {
// //         count: state.count,
// //     }
// // }
// //
// // class Counter extends React.Component {
// //
// //     increment = () => {
// //         /*
// //         // 删除
// //         this.setState({
// //           count: this.state.count + 1
// //         });
// //         */
// //         this.props.dispatch({
// //             type: 'INCREMENT'
// //         })
// //     };
// //
// //     decrement = () => {
// //         /*
// //         // 同样删除
// //         this.setState({
// //           count: this.state.count - 1
// //         });
// //         */
// //         this.props.dispatch({
// //             type: 'DECREMENT'
// //         })
// //     };
// //
// //     render() {
// //         return (
// //             <div className="counter">
// //                 <h2>Counter</h2>
// //                 <div>
// //                     <button onClick={this.decrement}>-</button>
// //                     <span className="count">{
// //                         // 把 state:
// //                         //// this.state.count
// //                         // 替换成:
// //                         this.props.count
// //                     }</span>
// //                     <button onClick={this.increment}>+</button>
// //                 </div>
// //             </div>
// //         );
// //     }
// // }
// //
// // export default connect(mapStateToProps)(Counter);
//
// import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import {Motion, spring} from "react-motion";
// import {departmentPanel} from "./config/style.config";
//
// function map(state) {
//     return {
//         isCoverOpen: state.isCoverOpen,
//         departmentMotionIndex: state.departmentMotionIndex,
//     }
// }
//
// class ElementPanelCover extends PureComponent {
//     render() {
//         return (
//             <Motion
//                 // style={generateStyle(this.props.isCoverOpen, this.props.departmentMotionIndex)}
//                 style={{
//                     width: spring(!this.props.isCoverOpen ? departmentPanel.baseEndArg.width : departmentPanel.baseStartArgs.width, {
//                         precision: 0.01
//                     }),
//                     height: spring(!this.props.isCoverOpen ? departmentPanel.baseEndArg.height : departmentPanel.baseStartArgs.height,{
//                         precision: 0.01
//                     }),
//                     left: spring(!this.props.isCoverOpen ? departmentPanel.panelEndArgs[this.props.departmentMotionIndex].left : departmentPanel.panelStartArgs.left, {
//                         precision: 0.01
//                     })
//                 }}
//             >
//                 {
//                     ({
//                          width, height, left
//                      }) => (
//                         <div className="element_panel_cover" style={{
//                             backgroundColor: this.props.backgroundColor,
//                             width: width,
//                             height: height,
//                             left: left,
//                         }}>
//                             {
//                                 this.props.coverChild || ''
//                             }
//                         </div>
//                     )
//                 }
//             </Motion>
//         )
//     }
// }
//
// export default connect(map)(ElementPanelCover);

// import React, { PureComponent } from 'react';
// import Loading from "./element/Loading";
// class testPage extends PureComponent {
//     render() {
//         return (
//             <div id="Loading">
//                 <Loading/>
//             </div>
//         )
//     }
// }
// export default testPage;

import { spring, TransitionMotion } from "react-motion/lib/react-motion";
import React from 'react';
class Demo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}],
        };
        this.willLeave = this.willLeave.bind(this);
    }
    componentDidMount() {
        this.setState({
            items: [{key: 'a', size: 10}, {key: 'b', size: 20}], // remove c.
        });
    }
    willLeave() {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        return {width: spring(0), height: spring(0)};
    }
    render() {
        return (
            <TransitionMotion
                willLeave={this.willLeave}
                styles={this.state.items.map(item => ({
                    key: item.key,
                    style: {width: item.size, height: item.size},
                }))}>
                {interpolatedStyles =>
                    // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                    <div>
                        {interpolatedStyles.map(config => {
                            return <div key={config.key} style={{...config.style, border: '1px solid'}} />
                        })}
                    </div>
                }
            </TransitionMotion>
        );
    }
}
export default Demo;