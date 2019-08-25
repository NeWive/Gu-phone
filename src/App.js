import React from 'react';
import { Lost } from './component/Lost';
import { Success } from "./component/Success";
import JoinUs from './component/Index/JoinUs';
import Index from "./component/Index";
import { Route } from 'react-router-dom';
import { routeConfig } from './config/route.config';
import AnimatedRouter from 'react-animated-router';
import 'react-animated-router/animate.css';
import './init.css';
class App extends React.Component {
    constructor(props){
        super(props);
        this.componentsMap = {
            'app': Index,
            '404': Lost,
            'success': Success,
            'join_us': JoinUs,
        }
    }
    render() {
        return (
            <AnimatedRouter>
                {
                    routeConfig.map((item) => (
                        <Route path={item.pattern} component={this.componentsMap[item.type]} key={item.type}/>
                    ))
                }
            </AnimatedRouter>
        )
    }
}

export default App;
