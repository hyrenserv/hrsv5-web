export default [
    {
        path: '/dataDashboard',
        name: 'dataDashboard',
        title: '数据仪表盘',
        component: () => import('@/hrds/l/dataDashboard/dataDashboard.vue'),
        meta: [
            { name: '首页' },
            { name: '数据仪表盘', url: '/dataDashboardList' },
            { name: '选择样式' },
        ],
    },
    {
        path: '/dataDashboardList',
        name: 'dataDashboardList',
        title: '数据仪表盘',
        component: () => import('@/hrds/l/dataDashboard/dataDashboardList.vue'),
        meta: [
            { name: '首页' },
            { name: '数据仪表盘' }
        ],
    },
    {
        path: '/autonomousAnalysisOperate',
        name: 'autonomousAnalysisOperate',
        title: '自主取数',
        component: () => import('@/hrds/l/selfAcess/selfAccess.vue'),
        meta: [
            { name: '首页' },
            { name: '自主取数' },
        ],
    },
    {
        path: '/access',
        name: 'access',
        title: '查看自主取数',
        component: () => import('@/hrds/l/selfAcess/access.vue'),
        meta: [
            { name: '首页' },
            { name: '自主取数' },
        ],
    },
    {
        path: '/autonomousAnalysisManage',
        name: 'autonomousAnalysisManage',
        title: '自主取数模板',
        component: () => import('@/hrds/l/selfAcess/template.vue'),
        meta: [
            { name: '首页' },
            { name: '自主取数' },
        ],
    },
    {
        path: '/configTemplate',
        name: 'configTemplate',
        title: '配置自主取数模板',
        component: () => import('@/hrds/l/selfAcess/configTemplate.vue'),
        meta: [
            { name: '首页' },
            { name: '自主取数' },
        ],
    },
    {
        path: '/myAccess',
        name: 'myAccess',
        title: '我的取数',
        component: () => import('@/hrds/l/selfAcess/myAccess.vue'),
        meta: [
            { name: '首页' },
            { name: '自主取数' },
        ],
    },
    {
        path: '/visualization',
        name: 'visualization',
        title: '可视化',
        component: () => import('@/hrds/l/selfAcess/visualization.vue'),
        meta: [
            { name: '首页' },
            { name: '自主取数' },
            { name: '数据可视化' },
            { name: '数据可视化设置' },
        ],
    },
    {
        path: '/visualizationindex',
        name: 'visualizationindex',
        title: '数据可视化',
        component: () => import('@/hrds/l/selfAcess/visualizationindex.vue'),
        meta: [
            { name: '首页' },
            { name: '自主取数' },
            { name: '数据可视化' },
        ],
    },
]