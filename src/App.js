import React from 'react';
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
        }
    }
    render() {
        return (
            <Switch>
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
