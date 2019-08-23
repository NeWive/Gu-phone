import React from 'react';
import Circle from '../../element/Circle';
import Right from '../../element/Right';
import './Successful.css';

function Successful() {
    return (
        <div id="successful">
            <div className="container">
                <div className="circle_box">
                    <Circle>
                        <Right/>
                    </Circle>
                </div>
                <div className="message">
                    <p className={`success`}>
                        注册成功
                    </p>
                    <p className={'wait'}>
                        激活邮件已经发送至您的邮箱
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Successful;
