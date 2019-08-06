const message = {
    empty: '不能为空',
    invalidFormat: '格式不正确',
    pass: 'pass',
};
const validateGroup = {
    phoneNumber: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    major: /^20[1][8,9]级[\u4e00-\u9fa5]{2,10}$/,
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    ps: /^.{0,80}$/,
    validateCode: /^[0-9]{4}$/,
    email_for_status: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
};

export {
    validateGroup,
    message
};