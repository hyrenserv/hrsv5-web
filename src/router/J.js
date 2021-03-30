export default [
    {
        path: '/streamDataManagement',
        name: 'streamDataManagement',
        title: '流数据管理',
        component: () => import('@/hrds/j/streamDataManagement/streamDataManagement.vue'),
        meta: [
            { name: '首页' },
            { name: '流数据管理' },
        ],
    },
    {
        path: '/streamDataProduction',
        name: 'streamDataProduction',
        title: 'streamDataProduction',
        component: () => import('@/hrds/j/streamDataProduction/streamDataProduction.vue'),
        meta: [
            { name: '首页' },
            { name: '流数据生产' },
        ],
    },
    {
        path: '/streamDataConsumption',
        name: 'streamDataConsumption',
        title: '流数据消费',
        component: () => import('@/hrds/j/streamDataConsumption/streamDataConsumption.vue'),
        meta: [
            { name: '首页' },
            { name: '流数据消费' },
        ],
    },
]