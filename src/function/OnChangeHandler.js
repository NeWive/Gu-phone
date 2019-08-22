import {validate} from "./Validate";
import {message} from "../config/validate.config";

const mapNameToDispatch = {
    'phoneNumber': 'SET_PHONE_NUMBER',
    'major': 'SET_MAJOR',
    'email': 'SET_EMAIL',
    'ps': 'SET_PS',//部门名称,
    'validateCode': 'SET_VALIDATE_CODE',
    'yourName': 'SET_YOUR_NAME',
    'commentSingle': 'SET_SINGLE_COMMENT',
    'commentValidate': 'SET_COMMENT_VALIDATE',
    'email_for_status': 'SET_EMAIL_FOR_STATUS',
};

const setFormHandler = (ctx) => {
    return (event) => {
        let target = event.target;
        let msg = validate(target);
        if (msg !== message.pass) {
            target.style.border = '1px solid red';
            let action = {};
            action['type'] = mapNameToDispatch[target.id];
            action['value'] = target.value;
            ctx.props.dispatch(action);
        } else {
            if(target.id !== 'email_for_status') {
                let action = {};
                action['type'] = mapNameToDispatch[target.id];
                action['value'] = target.value;
                ctx.props.dispatch(action);
            }
            target.style.border = '1px solid transparent';
        }
    }
};

const setCommentHandler = (ctx) => {
    return (event) => {
        let target = event.target;
        let action = {};
        action['type'] = mapNameToDispatch[target.id];
        action['value'] = target.value;
        ctx.props.dispatch(action);
    }
};

export {
    setFormHandler,
    setCommentHandler,
};