import { validateGroup, message } from "../config/validate.config";
const mapEnglishToChinese = {
    phoneNumber: '手机号码',
    major: '年级专业',
    email: '电子邮箱',
    ps: '备注留言',
    validateCode: '验证码',
    email_for_status: '电子邮箱',
};
const isEmpty = (target) => {
    return target.value === 'undefined' || target.value === null || target.value === '' ? `${mapEnglishToChinese[target.id]}不能为空` : message.pass;
};
const validate = (target) => {
    const pattern = validateGroup[target.id];
    if(target.id !== 'ps') {
        let result = isEmpty(target);
        if (result !== message.pass) {
            return result;
        }
    }else {
        return pattern.test(target.value) ? message.pass : `${ mapEnglishToChinese[target.id] }长度不可超过80字`;
    }
    return pattern.test(target.value) ? message.pass : `${ mapEnglishToChinese[target.id] }格式不正确`;
};

export {
    validate
}