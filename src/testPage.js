import React, { PureComponent } from 'react';
import { urlInterfaceGroup } from "./config/url.config";
import axios from 'axios';

class TestPage extends PureComponent{
    constructor(props){
        super(props);
        this.request = this.request.bind(this);
    }
    request() {
        setInterval(async () => {
            let {data} = await axios({
                method: 'GET',
                url: urlInterfaceGroup.validateCode.interface,
                responseType: 'blob'
            });
            console.log(data);
        }, 1000);
    }
    componentDidMount() {
        this.request();
    }

    render() {
        return (
            <div>
                123
            </div>
        );
    }
}

export default TestPage;