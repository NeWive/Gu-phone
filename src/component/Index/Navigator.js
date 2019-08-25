import React from 'react';
import { Logo } from '../../element/Logo';
// import SelList from '../../element/SelList';
import './Navigator.css';
import {Link} from "react-router-dom";
import {Button} from "../../element/Button";
function Navigator() {
    return (
        <div id="Navigator">
            <div className="top_box">
                <Logo/>
                <Link to={'/join_us'}>
                    <Button
                        value={'加入我们'}
                        style={{
                            width: 89,
                        }}/>
                </Link>
            </div>
        </div>
    );
}

export default Navigator;