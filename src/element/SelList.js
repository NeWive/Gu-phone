import React from 'react';
import { naviList } from '../config/list.config';
import { Link } from "react-router-dom";
import './SelList.css';
import {Button} from "./Button";


function SelList() {
    return (
        <div id="SelList">
            <div className="list">
                {
                    naviList.map((item) => (
                        <Button className={item.name} key={item.name}>
                            {/* eslint-disable-next-line no-script-url,jsx-a11y/anchor-is-valid */}
                            <Link to={'/join_us'}>
                                {
                                    item.value
                                }
                            </Link>
                        </Button>
                    ))
                }
            </div>
        </div>
    );
}

export default SelList;