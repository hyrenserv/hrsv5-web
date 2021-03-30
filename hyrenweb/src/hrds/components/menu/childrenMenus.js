/**
 * 二级菜单配置
 */
 const childrenMemus = {
    /** 数据加工 */
    14: [
        { path: '/dataMart', name: 'dataMart', title: '数据加工', icon: 'el-icon-s-finance', component: () => import('@/hrds/h/market/marketIndex.vue') },
        { path: '/marketVersionManage', name: 'marketVersionManage', title: '版本管理', icon: 'el-icon-monitor'}
    ],
    /** 自主分析操作 */
    26: [
        { path: '/autonomousAnalysisOperate', name: 'autonomousAnalysisOperate', title: '自主取数', icon: 'el-icon-folder-opened', component: () => import('@/hrds/l/selfAcess/selfAccess.vue') },
        { path: '/visualizationindex', name: 'visualizationindex', title: '数据可视化', icon: 'el-icon-view', component: () => import('@/hrds/l/selfAcess/visualizationindex.vue') },
        { path: '/dataDashboardList', name: 'dataDashboardList', title: '数据仪表盘', icon: 'el-icon-pie-chart', component: () => import('@/hrds/l/dataDashboard/dataDashboardList.vue') }
    ],
    /** 资源管理 */
    27: [
        { path: '/dataQuery', name: 'dataQuery', title: '文件资源管理', icon: 'el-icon-files', component: () => import('@/hrds/b/dataQuery/dataQuery.vue') },
        { path: '/webSqlConsole', name: 'webSqlConsole', title: 'SQL控制台', icon: 'el-icon-monitor', component: () => import('@/hrds/b/dataQuery/webSqlConsole.vue') },
        { path: '/fullTextSearch', name: 'fullTextSearch', title: '全文检索', icon: 'el-icon-search', component: () => import('@/hrds/b/dataQuery/fullTextSearch.vue') },
    ],
    /** 数据对标 */
    55: [
        { path: '/dbck', name: 'dbck', title: '标准元查看', icon: 'el-icon-files', component: () => import('@/hrds/b/dataQuery/dataQuery.vue') },
        { path: '/tsb', name: 'tsb', title: '表结构对标', icon: 'el-icon-receiving', component: () => import('@/hrds/k/tsb/tsb.vue') },
        { path: '/tdb', name: 'tdb', title: '表数据对标', icon: 'el-icon-film', component: () => import('@/hrds/k/tdb/tdb.vue') },
        { path: '/tdb_result', name: 'tdb_result', title: '表数据对标结果查看', icon: 'el-icon-film', component: () => import('@/hrds/k/tdb_result/tdb_result.vue') }
    ],
    /** 数据存储层定义 */
    95: [
        { path: '/dataStoreLayer', name: 'dataStoreActionIndex', title: '存储层定义', icon: 'el-icon-s-unfold', component: () => import('@/hrds/a/datastore/dataStoreActionIndex.vue') },
        { path: '/typeLengthContrastInfo', name: 'typeLengthContrastInfo', title: '数据长度对比', icon: 'el-icon-search', component: () => import('@/hrds/a/datastore/typeLengthContrastInfo.vue') },
        { path: '/dataTypeContrastInfo', name: 'dataTypeContrastInfo', title: '数据类型对比', icon: 'el-icon-search', component: () => import('@/hrds/a/datastore/dataTypeContrastInfo.vue') }
    ],
    /** 流数据操作 */
    19: [
        { path: '/streamDataProduction', name: 'streamDataProduction', title: '流数据生产', icon: 'el-icon-files', component: () => import('@/hrds/j/streamDataProduction/streamDataProduction.vue') },
        { path: '/streamDataConsumption', name: 'streamDataConsumption', title: '流数据消费', icon: 'el-icon-receiving', component: () => import('@/hrds/j/streamDataConsumption/streamDataConsumption.vue') }
    ],
};

export default childrenMemus