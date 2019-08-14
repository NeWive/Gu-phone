import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";
import { reducer } from "./config/redux.config";
import './init.css';

const store = createStore(reducer);
ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById(`root`)
);
// const initState = {
//     count: 0
// };
//
// const recducers = {
//     'INCREMENT': (state) => ({ count: state.count + 1 }),
//     'DECREMENT': (state) => ({ count: state.count - 1 }),
//     'RESET': () => ({ count: 0 }),
// };
//
// const reducer = (state = initState, action) => {
//     console.log('reducer', state, action);
//     return recducers[action.type] ? (recducers[action.type])(state) : state
// };
//
// const store = createStore(reducer);
//
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "DECREMENT" });
//
// ReactDom.render(
//     <Provider store={store}>
//         <Counter/>
//     </Provider>,
//     document.getElementById('root')
// );