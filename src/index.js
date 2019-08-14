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