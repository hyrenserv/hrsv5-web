export default [
    {
        path: '/dbm',
        name: 'dbm',
        title: 'dbm',
        component: () => import('@/hrds/k/dbm/dbm.vue'),
        meta: [
            { name: '首页' },
            { name: '标准元管理' },
        ],
    },
    {
        path: '/dbck',
        name: 'dbck',
        title: 'dbck',
        component: () => import('@/hrds/k/dbm_check/dbm_check.vue'),
        meta: [
            { name: '首页' },
            { name: '数据对标' },
            { name: '标准元查看' },
        ],
    },
    {
        path: '/tsb',
        name: 'tsb',
        title: 'tsb',
        component: () => import('@/hrds/k/tsb/tsb.vue'),
        meta: [
            { name: '首页' },
            { name: '数据对标' },
            { name: '表结构对标' },
        ],
    },
    {
        path: '/tsb_result',
        name: 'tsb_result',
        title: 'tsb_result',
        component: () => import('@/hrds/k/tsb/tsb_result.vue'),
        meta: [
            { name: '首页' },
            { name: '数据对标' },
            { name: '表结构对标', url: '/tsb' },
            { name: '对标结果' },
        ],
    },
    {
        path: '/tdb',
        name: 'tdb',
        title: 'tdb',
        component: () => import('@/hrds/k/tdb/tdb.vue'),
        meta: [
            { name: '首页' },
            { name: '数据对标' },
            { name: '数据对标' },
        ],
    },
    {
        path: '/dataControl',
        name: 'dataControl',
        title: 'dataControl',
        component: () => import('@/hrds/k/dataControl/dataControl.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控' },
        ],
    },
    //元数据管理
    {
        path: '/mateDataManagement',
        name: 'mateDataManagement',
        title: '元数据管理',
        component: () => import('@/hrds/k/dataControl/mateDataManage/mateDataManage.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '工程详情' },
        ],
    },
    //元数据管理-创建关系型数据库数据表
    {
        path: '/createDatabaseTable',
        name: 'createDatabaseTable',
        title: '创建关系型数据库数据表',
        component: () => import('@/hrds/k/dataControl/mateDataManage/createDatabaseTable.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '元数据管理', url: '/mateDataManagement' },
            { name: '创建关系型数据库数据表' },
        ],
    },
    //元数据管理-创建Hive数据库数据表
    {
        path: '/createHiveTable',
        name: 'createHiveTable',
        title: '创建Hive数据库数据表',
        component: () => import('@/hrds/k/dataControl/mateDataManage/createHiveTable.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '元数据管理', url: '/mateDataManagement' },
            { name: '创建Hive数据库数据表' },
        ],
    },
    //元数据管理-创建Hbase数据库数据表
    {
        path: '/createHbaseTable',
        name: 'createHbaseTable',
        title: '创建Hbase数据库数据表',
        component: () => import('@/hrds/k/dataControl/mateDataManage/createHbaseTable.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '元数据管理', url: '/mateDataManagement' },
            { name: '创建Hbase数据库数据表' },
        ],
    },
    //元数据管理-创建CarBonData数据库数据表
    {
        path: '/createCarbondataTable',
        name: 'createCarbondataTable',
        title: '创建CarBonData数据库数据表',
        component: () => import('@/hrds/k/dataControl/mateDataManage/createCarbondataTable.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '元数据管理', url: '/mateDataManagement' },
            { name: '创建CarBonData数据库数据表' },
        ],
    },
    //血缘分析
    {
        path: '/bloodAnalysis',
        name: 'bloodAnalysis',
        title: '血缘分析',
        component: () => import('@/hrds/k/dataControl/bloodAnalysis/bloodAnalysis.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '血缘分析' },
        ],
    },
    //变量配置
    {
        path: '/variableConfig',
        name: 'variableConfig',
        title: '变量配置',
        component: () => import('@/hrds/k/dataControl/variableConfig/variableConfig.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '变量配置' },
        ],
    },
    //规则配置
    {
        path: '/ruleConfig',
        name: 'ruleConfig',
        title: '规则配置',
        component: () => import('@/hrds/k/dataControl/ruleConfig/ruleConfig.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '规则配置' },
        ],
    },
    //规则信息
    {
        path: '/ruleInfo',
        name: 'ruleInfo',
        title: '规则配置',
        component: () => import('@/hrds/k/dataControl/ruleConfig/ruleInfo.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '规则配置', url: '/ruleConfig' },
            { name: '编辑规则详情' },
        ],
    },
    //规则检测详情
    {
        path: '/ruleDetectionDetail',
        name: 'ruleDetectionDetail',
        title: '规则详情',
        component: () => import('@/hrds/k/dataControl/ruleConfig/ruleDetectionDetail.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '规则结果', url: '/ruleResults' },
            { name: '规则详情' },
        ],
    },
    //规则调度状态
    {
        path: '/ruleETLStatus',
        name: 'ruleETLStatus',
        title: '规则详情',
        component: () => import('@/hrds/k/dataControl/ruleConfig/ruleETLStatus.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '规则配置', url: '/ruleConfig' },
            { name: '规则详情' },
        ],
    },
    //规则结果
    {
        path: '/ruleResults',
        name: 'ruleResults',
        title: '规则结果',
        component: () => import('@/hrds/k/dataControl/ruleResults/ruleResults.vue'),
        meta: [
            { name: '首页' },
            { name: '数据管控', url: '/dataControl' },
            { name: '规则结果' },
        ],
    },
]