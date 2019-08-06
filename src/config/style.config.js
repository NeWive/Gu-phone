const aboutUsDetail = {
    width: '390px',
    height: '299px',
    backgroundColor: '#F5F5F5',
};
let department = {
    width: '240px',
    height: '299px',
    display: '',
};
let colorDepartment = [
    {
        backgroundColor: '#7CD1FF',
    },
    {
        backgroundColor: '#ED6C9E',
    },
    {
        backgroundColor: '#B062C0',
    },
    {
        backgroundColor: '#89C2AA',
    },
    {
        backgroundColor: '#F5B57E',
    }
];
let colorMembers = [
    {
        backgroundColor: '#B7E6FF',
    },
    {
        backgroundColor: '#94D9FF',
    },
    {
        backgroundColor: '#79D0FF',
    },
    {
        backgroundColor: '#58C4FF',
    },
    {
        backgroundColor: '#19AEFF',
    }
];

// eslint-disable-next-line array-callback-return
colorDepartment.map((item) => {
    for(let i in department) {
        item[i] = department[i];
    }
});

// eslint-disable-next-line array-callback-return
colorMembers.map((item) => {
    for(let i in department) {
        item[i] = department[i];
    }
});

const departmentPanel = {
    opacity: {
        start: 0,
        end: 1,
    },
    baseStartArgs: {
        width: 240,
        height: 299,
    },
    baseEndArg: {
        width: 1300,
        height: 610,
    },
    panelStartArgs: {
        left: 0,
        bottom: 0,
    },
    panelEndArgs: [
        {
            left: 0,
            bottom: 0,
        },
        {
            left: -265,
            bottom: 0,
        },
        {
            left: -530,
            bottom: 0,
        },
        {
            left: -795,
            bottom: 0,
        },
        {
            left: -1060,
            bottom: 0
        }
    ]
};

const blueArrowStyles = [
    109, 372, 638, 902, 1166,
];

const workDetailedStyles = {
    notCenter: {
        paddingTop: 23,
        paddingRight: 19,
        paddingBottom: 26,
        paddingLeft: 19,
        marginLeft: 0,
        marginRight: 0,
        zIndex: 5,
        backgroundColor: '#B7E6FF',
        width: 493,
        height: 250,
        ImgZIndex: 6,
    },
    center: {
        paddingTop: 43,
        paddingRight: 27,
        paddingBottom: 45,
        paddingLeft: 30,
        marginLeft: -220,
        marginRight: -194,
        zIndex: 7,
        backgroundColor: '#19AEFF',
        width: 595,
        height: 302,
        ImgZIndex: 6,
    },
    leftList: {
        7: -3186,
        6: -2656,
        5: -2124,
        4: -1593,
        3: -1062,
        2: -531,
        1: 0,
    }
};

const worksCover = {
    width: {
        end: 1300,
        start: 652,
    },
    height: {
        end: 762,
        start: 390,
    },
    top: {
        end: -256,
        start: 0,
    }
};


export {
    aboutUsDetail,
    colorDepartment,
    departmentPanel,
    colorMembers,
    blueArrowStyles,
    workDetailedStyles,
    worksCover,
}