export default [
    { path: '/syspara', name: 'syspara', component: () => import('@/hrds/a/syspara/index.vue') },
    // 用户列表
    {
        path: '/userManagement',
        name: 'userManagement',
        title: '用户列表',
        component: () => import('@/hrds/a/managementsystem/userManagement.vue'),
        meta: [
            { name: '首页' },
            { name: '用户列表' },
        ],
    },
    // 部门列表
    {
        path: '/departmentalList',
        name: 'departmentalList',
        title: '部门列表',
        component: () => import('@/hrds/a/managementsystem/departmentalList.vue'),
        meta: [
            { name: '首页' },
            { name: '部门列表' },
        ],
    },
    // 系统参数列表
    {
        path: '/systemParameters',
        name: 'systemParameters',
        title: '系统列表',
        component: () => import('@/hrds/a/managementsystem/systemParameters.vue'),
        meta: [
            { name: '首页' },
            { name: '系统列表' },
        ],
    },
    // 码值维护
    {
        path: '/codeMaintenance',
        name: 'codeMaintenance',
        title: '系统列表',
        component: () => import('@/hrds/a/codeMaintenance/codeMaintenance.vue'),
        meta: [
            { name: '首页' },
            { name: '码值维护' },
        ],
    },
    // dataStoreAction
    {
        path: '/dataStoreLayer',
        name: 'dataStoreActionIndex',
        title: 'dataStoreActionIndex',
        component: () => import('@/hrds/a/datastore/dataStoreActionIndex.vue'),
        meta: [
            { name: '首页' },
            { name: '数据存储层定义' },
            { name: '存储层定义' },
        ],
    },
    {
        path: '/dataStoreAction',
        name: 'dataStoreAction',
        title: 'dataStoreAction',
        component: () => import('@/hrds/a/datastore/dataStoreAction.vue'),
        meta: [
            { name: '首页' },
            { name: '数据存储层定义' },
            { name: '新增数据存储层' },
        ],
    },
    {
        path: '/typeLengthContrastInfo',
        name: 'typeLengthContrastInfo',
        title: 'typeLengthContrastInfo',
        component: () => import('@/hrds/a/datastore/typeLengthContrastInfo.vue'),
        meta: [
            { name: '首页' },
            { name: '数据存储层定义' },
            { name: '数据长度对比' },
        ],
    },
    {
        path: '/addTypeLengthContrastInfo',
        name: 'addTypeLengthContrastInfo',
        title: 'addTypeLengthContrastInfo',
        component: () => import('@/hrds/a/datastore/addTypeLengthContrastInfo.vue'),
        meta: [
            { name: '首页' },
            { name: '数据存储层定义' },
            { name: '数据长度对比', url: '/typeLengthContrastInfo' },
            { name: '新增数据类型长度对照表' },
        ],
    },
    {
        path: '/addDataTypeContrastInfo',
        name: 'addDataTypeContrastInfo',
        title: 'addDataTypeContrastInfo',
        component: () => import('@/hrds/a/datastore/addDataTypeContrastInfo.vue'),
        meta: [
            { name: '首页' },
            { name: '数据存储层定义' },
            { name: '数据类型对比', url: "/dataTypeContrastInfo" },
            { name: '新增数据类型对照表' },
        ],
    },
    {
        path: '/dataTypeContrastInfo',
        name: 'dataTypeContrastInfo',
        title: 'dataTypeContrastInfo',
        component: () => import('@/hrds/a/datastore/dataTypeContrastInfo.vue'),
        meta: [
            { name: '首页' },
            { name: '数据存储层定义' },
            { name: '数据类型对比' },
        ],
    },
    {
        path: '/logReview',
        name: 'logReview',
        title: '日志审查',
        component: () => import('@/hrds/a/logreview/logReview.vue'),
        meta: [
            { name: '首页' },
            { name: '日志审查' },
        ],
    },
]