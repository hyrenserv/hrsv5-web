export default [
    {
        path: '/dataMart',
        name: 'dataMart',
        title: 'dataMart',
        component: () => import('@/hrds/h/market/marketIndex.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工' },
        ],
    },
    {
        path: '/addMarketIndex',
        name: 'addMarketIndex',
        title: 'addMarketIndex',
        component: () => import('@/hrds/h/market/addMarketIndex.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工' },
        ],
    },
    {
        path: '/marketVersionManage',
        name: 'marketVersionManage',
        title: 'marketVersionManage',
        component: () => import('@/hrds/h/manage/version/marketVersionManage.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工' },
            { name: '版本管理' },
        ],
    },
    {
        path: '/detailMart',
        name: 'detailMart',
        title: 'detailMart',
        component: () => import('@/hrds/h/market/detailMart.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工' }
        ],
    },
    {
        path: '/addMartTable_1',
        name: 'addMartTable_1',
        title: 'addMartTable_1',
        component: () => import('@/hrds/h/market/addMartTable_1.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工' }
        ],
    },
    {
        path: '/addMartTable_2',
        name: 'addMartTable_2',
        title: 'addMartTable_2',
        component: () => import('@/hrds/h/market/addMartTable_2.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工 ' }
        ],
    },
    {
        path: '/addMartTable_3',
        name: 'addMartTable_3',
        title: 'addMartTable_3',
        component: () => import('@/hrds/h/market/addMartTable_3.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工' }
        ],
    },
    {
        path: '/importReview',
        name: 'importReview',
        title: '加工工程导入审核',
        component: () => import('@/hrds/h/market/importReview.vue'),
        meta: [
            { name: '首页' },
            { name: '数据加工', url: 'dataMart' },
            { name: '加工工程导入审核' },
        ],
    },
]