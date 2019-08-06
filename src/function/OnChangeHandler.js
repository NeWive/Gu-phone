import {validate} from "./Validate";
import {message} from "../config/validate.config";

const mapNameToDispatch = {
    'phoneNumber': 'SET_PHONE_NUMBER',
    'major': 'SET_MAJOR',
    'email': 'SET_EMAIL',
    'ps': 'SET_PS',
    'validateCode': 'SET_VALIDATE_CODE',
};

const setFormHandler = (ctx) => {
    let lastTime = null;
    return (event) => {
        let nowTime = +new Date();
        if(nowTime - lastTime > 500 || !lastTime) {
            let target = event.target;
            let msg = validate(target);
            if (msg !== message.pass) {
                target.style.border = '1px solid red';
            } else {
                if(target.id !== 'email_for_status') {
                    let action = {};
                    action['type'] = mapNameToDispatch[target.id];
                    action['value'] = target.value;
                    ctx.props.dispatch(action);
                }
                target.style.border = '0';
            }
        }
    }
};

export {
    setFormHandler
};