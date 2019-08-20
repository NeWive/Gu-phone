const initState = {
    motive: false,
    isPortalOn: false,
    phoneNumber: '',
    major: '',
    email: '',
    ps: '1',
    yourName: '',
    validateCode: '',
    zeitgeistDetail: false,
    worksDetail: false,
    departmentMotionIndex: 0,
    isDepartmentSelMotive: false,//控制状态
    memberMotionIndex: 0,
    isMemberSelMotive: false,
    isCoverMotive: false,//Cover挂载完成后设置为true,
    isMemberCoverMotive: false,
    isHistoryRequesting: false,
    historyIndex: 0,
    isHistoryArrowSettled: true,//当为true的时候isHistoryRequesting才能为true
    isWorksCoverOn: false,
    isWorksCoverMotive: false,
    departmentId: -1,
    departmentDescription: '',
    isDepartmentReady: false,
    memberCoverYear: '',
    website: [],
    websiteForDisplay: '',
    commentSingle: '',
    commentValidate: '',
    emailForStatus: '',
    historyByYear: '',
    historyYearList: [],
    yearSelected: 2014,
    comments: [],
};

const notType = {
    'SET_IS_MEMBER_COVER_MOTIVE': 'isMemberCoverMotive',
    'SET_IS_COVER_MOTIVE': 'isCoverMotive',
    'OPERATING_PORTAL': 'isPortalOn',
    'SET_MOTIVE': 'motive',
    'SET_IS_DEPARTMENT_READY': 'isDepartmentReady'
};

const directType = {
    'SET_MEMBER_MOTION_INDEX': { name: 'isMemberSelMotive', value: true },//isMemberSelMotive true
    'SET_IS_MEMBER_SEL_MOTIVE': { name: 'isMemberSelMotive', value: false },//false,
    'SET_IS_DEPARTMENT_SEL_MOTIVE': { name: 'isDepartmentSelMotive', value: false },//false,
    'SET_DEPARTMENT_MOTION_INDEX': { name: 'isDepartmentSelMotive', value: true },//isDepartmentSelMotive true
};

const actionType = {
    'SET_IS_WORKS_COVER_MOTIVE': 'isWorksCoverMotive',
    'SET_IS_WORKS_COVER_ON': 'isWorksCoverOn',
    'SET_HISTORY_INDEX': 'historyIndex',
    'SET_IS_HISTORY_ARROW_SETTLED': 'isHistoryArrowSettled',
    'SET_IS_HISTORY_REQUESTING': 'isHistoryRequesting',
    'SET_PHONE_NUMBER': 'phoneNumber',
    'SET_MAJOR': 'major',
    'SET_EMAIL': 'email',
    'SET_PS': 'ps',
    'SET_YOUR_NAME': 'yourName',
    'SET_VALIDATE_CODE': 'validateCode',
    'SET_DEPARTMENT_MOTION_INDEX': 'departmentMotionIndex',
    'SET_MEMBER_MOTION_INDEX': 'memberMotionIndex',
    'SET_DEPARTMENT_ID': 'departmentId',
    'SET_DEPARTMENT_DESCRIPTION': 'departmentDescription',
    'SET_MEMBER_COVER_YEAR': 'memberCoverYear',
    'SET_WEBSITE': 'website',
    'SET_WEBSITE_FOR_DISPLAY': 'websiteForDisplay',
    'SET_SINGLE_COMMENT': 'commentSingle',
    'SET_COMMENT_VALIDATE': 'commentValidate',
    'SET_EMAIL_FOR_STATUS': 'emailForStatus',
    'SET_HISTORY_BY_YEAR': 'historyByYear',
    'SET_HISTORY_YEAR_LIST': 'historyYearList',
    'SET_SELECTED_YEAR': 'yearSelected',
    'SET_COMMENT': 'comments',
};

const updateGroup = [{ type: actionType, action: 0 }, { type: directType, action: 1 }, { type: notType, action: 2 }];
function updateStateHandler(state, action, type) {
    for(let item of updateGroup) {
        switch (item.action) {
            case 0:
                state[item.type[type]] = action.value;break;
            case 1:
                if(item.type[type]) {
                    state[(item.type[type]).name] = (item.type[type]).value;
                }
            break;
            case 2:
                state[item.type[type]] = !state[item.type[type]];break;
            default:
                break;
        }
    }
}

function getInitState(state) {
    let initState = {};
    for(let item in state) {
        initState[item] = state[item];
    }
    return initState;
}

const reducersHandler = (state, action) => {
    let initState = getInitState(state);
    updateStateHandler(initState, action, action.type);
    return initState;
};

const reducer = (state = initState, action) => {
    return reducersHandler(state, action);
};

export {
    reducer
}