const url = `http://39.96.208.176`;

let urlInterfaceGroup = {
    validateCode: {
        interface: '/captcha/',
        method: 'GET',
    },
    departmentList: {
        interface: '/show/api/department/',
        method: 'GET',
    },
    comment: {
        interface: '/show/api/comment/',
        method: 'POST',
        body: ['content', 'code'],
    },
    commentList: {
        interface: '/show/api/comment_list/',
        method: 'GET',
    },
    memberIntroduction: {
        interface: '/show/api/member/',
        method: 'GET',
        para: ['year'],
    },
    memberList: {
        interface: '/show/api/member_list/',
        method: 'GET',
    },
    works: {
        interface: '/show/api/work/',
        method: 'GET',
    },
    story: {
        interface: '/show/api/story/',
        method: 'GET',
    },
    department: {
        interface: '/show/api/department/',
        method: 'GET',
    },
    process: {
        interface: '/join/api/status/',
        method: 'GET',
        para: ['email'],
    },
    require: {
        interface: '/join/api/apply/',
        method: 'POST',
        body: ['name', 'phone', 'email', 'year', 'college', 'speciality', 'department_id', 'message', 'code'],
    },
    validateImg: {
        interface: '/captcha/',
    }
};

const urlHandler = () => {
    for(let item in urlInterfaceGroup) {
        (urlInterfaceGroup[item])['interface'] = `${url}${(urlInterfaceGroup[item])['interface']}`;
    }
};

urlHandler();

const getMembersByYear = (year, id) => (
    `${urlInterfaceGroup.memberIntroduction.interface}?year=${year}&id=${id}`
);

const getStatusByEmail = (email) => (
    `${urlInterfaceGroup.process.interface}?email=${email}`
);

export {
    urlInterfaceGroup,
    getMembersByYear,
    getStatusByEmail,
    url,
}