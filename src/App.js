import React from 'react';
import Demo from "./testPage";
import { Lost } from './component/Lost';
import Index from "./component/Index";
import { Switch, Route } from 'react-router-dom';
import { routeConfig } from './config/route.config';
import './init.css';
class App extends React.Component {
    constructor(props){
        super(props);
        this.componentsMap = {
            'app': Index,
            '404': Lost,
            'test': Demo
        }
    }
    render() {
        return (
            <Switch>
                <Route path={'/test'} component={this.componentsMap['test']}/>
                {
                    routeConfig.map((item) => (
                        <Route path={item.pattern} component={this.componentsMap[item.type]} key={item.type}/>
                    ))
                }
            </Switch>
        )
    }
}

export default App;
