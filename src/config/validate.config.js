const message = {
    empty: '不能为空',
    invalidFormat: '格式不正确',
    pass: 'pass',
};
const validateGroup = {
    phoneNumber: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    major: /^20[1][8,9]级[\u4e00-\u9fa5]{2,10}$/,
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z_-]+)+$/,
    ps: /^.{0,80}$/,
    validateCode: /^.{4}$/,
    yourName: /^[\u4e00-\u9fa5]{2,10}$/,
    emailForStatus: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z_-]+)+$/,
    commentSingle: /^.{0,80}$/,
    commentValidate: /^.{4}$/,
};

export {
    validateGroup,
    message
};