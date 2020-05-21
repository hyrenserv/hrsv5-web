import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

/**
 *
 * 路由配置信息
 *  routes : [{这里的第一层表示为普通的路由地址,children : [{这个里面的是二级路由配置}]
 * 路由配置如 :
 *  {
 *      @param path: "/home"   表示的是路由匹配路径,
 *      @param name: 'home' 理由的名称
 *      @param component: () => import('@/hrds/login/index') 后面为路由地址的具体页面
 *  }
 *
 */
export default new Router({
    routes: [
        {path: '/', name: 'login', component: () => import('@/hrds/login/login.vue')},
        //菜单路由地址配置
        {
            path: "/home", name: 'home', component: () => import('@/hrds/components/menu'), children: [
                {path: '/syspara', name: 'syspara', component: () => import('@/hrds/a/syspara/index.vue')},
                {
                    path: '/agentdeploy',
                    name: 'agentdeploy',
                    component: () => import('@/hrds/b/agentdeploy/agentdeploylist.vue')
                },
                {
                    path: '/collectmonitor',
                    name: 'collectmonitor',
                    title: '采集监控首页',
                    component: () => import('@/hrds/b/collectmonitor/collectmonitor.vue')
                },
                {
                    path: '/datasourceManagement',
                    name: ' datasourceManagement',
                    title: '数据源管理',
                    component: () => import('@/hrds/b/datasource/datasourceManagement.vue')
                },
                {
                    path: '/addScoure',
                    name: 'addScoure',
                    title: 'agent管理',
                    component: () => import('@/hrds/b/datasource/datasource.vue')
                },
                {
                    path: '/collection1_1',
                    name: 'addTask01',
                    title: '数据库采集',
                    component: () => import('@/hrds/b/addTask/steps1.vue')
                },
                {
                    path: '/collection1_2',
                    name: 'addTask02',
                    title: '数据库采集02',
                    component: () => import('@/hrds/b/addTask/steps2.vue')
                },
                {
                    path: '/collection1_3',
                    name: 'addTask03',
                    title: '数据库采集03',
                    component: () => import('@/hrds/b/addTask/steps3.vue')
                },
                {
                    path: '/collection1_4',
                    name: 'addTask04',
                    title: '数据库采集04',
                    component: () => import('@/hrds/b/addTask/steps4.vue')
                },
                /*  {
                     path: '/collection1_5',
                     name: 'addTask05',
                     title: '数据库采集05',
                     component: () => import('@/hrds/b/addTask/steps5.vue')
                 }, */
                {
                    path: '/collection1_5',
                    name: 'addTask05',
                    title: '数据库采集05',
                    component: () => import('@/hrds/b/addTask/steps6.vue')
                },
                {
                    path: '/agentList',
                    name: 'agentList',
                    title: 'agent列表',
                    component: () => import('@/hrds/b/agentList/agentList.vue')
                },
                {
                    path: '/taskLog',
                    name: 'taskLog',
                    title: 'taskLog日志查看',
                    component: () => import('@/hrds/b/agentList/taskLog.vue')
                },
                // 系统管理
                // 用户列表
                {
                    path: '/userManagement',
                    name: 'userManagement',
                    title: '用户列表',
                    component: () => import('@/hrds/a/managementsystem/userManagement.vue')
                },
                // 部门列表
                {
                    path: '/departmentalList',
                    name: 'departmentalList',
                    title: '部门列表',
                    component: () => import('@/hrds/a/managementsystem/departmentalList.vue')
                },
                // 系统参数列表
                {
                    path: '/systemParameters',
                    name: 'systemParameters',
                    title: '系统列表',
                    component: () => import('@/hrds/a/managementsystem/systemParameters.vue')
                },
                // 半结构化agent采集
                {
                    path: '/collection5_1',
                    name: 'collectOption',
                    title: '采集设置',
                    component: () => import('@/hrds/b/semiStructuredAgent/collectOption.vue')
                },
                {
                    path: '/collectFileOption',
                    name: 'collectFileOption',
                    title: '采集文件设置',
                    component: () => import('@/hrds/b/semiStructuredAgent/collectFileOption.vue')
                },
                {
                    path: '/collectionStructureSet',
                    name: 'collectionStructureSet',
                    title: '采集文件设置',
                    component: () => import('@/hrds/b/semiStructuredAgent/collectionStructureSet.vue')
                },
                //ftp agent采集
                {
                    path: '/collection3_1',
                    name: 'ftpCollect',
                    title: '采集ftp agent',
                    component: () => import('@/hrds/b/ftpCollect/ftpCollect.vue')
                },
                // db文件采集
                {
                    path: '/collection4_1',
                    name: 'ftpCollect1',
                    title: '采集ftp agent',
                    component: () => import('@/hrds/b/dbAgentcollect/step1.vue')
                },
                {
                    path: '/collection4_2',
                    name: 'ftpCollect2',
                    title: '采集ftp agent',
                    component: () => import('@/hrds/b/dbAgentcollect/step2.vue')
                },
                {
                    path: '/collection4_3',
                    name: 'ftpCollect3',
                    title: '采集ftp agent',
                    component: () => import('@/hrds/b/dbAgentcollect/step3.vue')
                },
                {
                    path: '/collection4_4',
                    name: 'ftpCollect4',
                    title: '采集ftp agent',
                    component: () => import('@/hrds/b/dbAgentcollect/step4.vue')
                },
                {
                    path: '/collection4_5',
                    name: 'ftpCollect5',
                    title: '采集ftp agent',
                    component: () => import('@/hrds/b/dbAgentcollect/step5.vue')
                },
                {
                    path: '/collection4_6',
                    name: 'ftpCollect6',
                    title: '采集ftp agent',
                    component: () => import('@/hrds/b/dbAgentcollect/step6.vue')
                },
                // 非结构化 Agent采集
                {
                    path: '/collection2_1',
                    name: 'configureStartMode',
                    title: '配置启动方式',
                    component: () => import('@/hrds/b/unstructuredAgent/configureStartMode.vue')
                },
                {
                    path: '/configureFileOption',
                    name: 'configureFileOption',
                    title: '配置连接属性',
                    component: () => import('@/hrds/b/unstructuredAgent/configureFileOption.vue')
                },
                // dataStoreAction
                {
                    path: '/dataStoreLayer',
                    name: 'dataStoreActionIndex',
                    title: 'dataStoreActionIndex',
                    component: () => import('@/hrds/a/datastore/dataStoreActionIndex.vue')
                },
                {
                    path: '/dataStoreAction',
                    name: 'dataStoreAction',
                    title: 'dataStoreAction',
                    component: () => import('@/hrds/a/datastore/dataStoreAction.vue')
                },
                {
                    path: '/typeLengthContrastInfo',
                    name: 'typeLengthContrastInfo',
                    title: 'typeLengthContrastInfo',
                    component: () => import('@/hrds/a/datastore/typeLengthContrastInfo.vue')
                },
                {
                    path: '/addTypeLengthContrastInfo',
                    name: 'addTypeLengthContrastInfo',
                    title: 'addTypeLengthContrastInfo',
                    component: () => import('@/hrds/a/datastore/addTypeLengthContrastInfo.vue')
                },
                {
                    path: '/addDataTypeContrastInfo',
                    name: 'addDataTypeContrastInfo',
                    title: 'addDataTypeContrastInfo',
                    component: () => import('@/hrds/a/datastore/addDataTypeContrastInfo.vue')
                },
                {
                    path: '/dataTypeContrastInfo',
                    name: 'dataTypeContrastInfo',
                    title: 'dataTypeContrastInfo',
                    component: () => import('@/hrds/a/datastore/dataTypeContrastInfo.vue')
                },
                // 数据查询
                {
                    path: '/dataQuery',
                    name: 'dataQuery',
                    title: 'dataQuery',
                    component: () => import('@/hrds/b/dataQuery/dataQuery.vue')
                },
                {
                    path: '/myApply',
                    name: 'myApply',
                    title: 'myApply',
                    component: () => import('@/hrds/b/dataQuery/myApply.vue')
                },
                {
                    path: '/myRequestRecord',
                    name: 'myRequestRecord',
                    title: 'myRequestRecord',
                    component: () => import('@/hrds/b/dataQuery/myRequestRecord.vue')
                },
                {
                    path: '/fullTextSearch',
                    name: 'fullTextSearch',
                    title: 'fullTextSearch',
                    component: () => import('@/hrds/b/dataQuery/fullTextSearch.vue')
                },
                {
                    path: '/webSqlConsole',
                    name: 'webSqlConsole',
                    title: 'webSqlConsole',
                    component: () => import('@/hrds/b/dataQuery/webSqlConsole.vue')
                },
                {
                    path: '/etlMage',
                    name: 'etlMage',
                    title: 'etlMage',
                    component: () => import('@/hrds/c/etlMage/etlMage.vue')
                },
                {
                    path: '/dbm',
                    name: 'dbm',
                    title: 'dbm',
                    component: () => import('@/hrds/k/dbm/dbm.vue')
                },
                {
                    path: '/dbck',
                    name: 'dbck',
                    title: 'dbck',
                    component: () => import('@/hrds/k/dbm_check/dbm_check.vue')
                },
                {
                    path: '/tsb',
                    name: 'tsb',
                    title: 'tsb',
                    component: () => import('@/hrds/k/tsb/tsb.vue')
                },
                {
                    path: '/tsb_result',
                    name: 'tsb_result',
                    title: 'tsb_result',
                    component: () => import('@/hrds/k/tsb/tsb_result.vue')
                },
                {
                    path: '/tdb',
                    name: 'tdb',
                    title: 'tdb',
                    component: () => import('@/hrds/k/tdb/tdb.vue')
                },
                {
                    path: '/dataControl',
                    name: 'dataControl',
                    title: 'dataControl',
                    component: () => import('@/hrds/k/dataControl/dataControl.vue'),
                },
                //元数据管理
                {
                    path: '/mateDataManagement',
                    name: 'mateDataManagement',
                    title: '元数据管理',
                    component: () => import('@/hrds/k/dataControl/mateDataManage/mateDataManage.vue')
                },
                //血缘分析
                {
                    path: '/bloodAnalysis',
                    name: 'bloodAnalysis',
                    title: '血缘分析',
                    component: () => import('@/hrds/k/dataControl/bloodAnalysis/bloodAnalysis.vue')
                },
                //变量配置
                {
                    path: '/variableConfig',
                    name: 'variableConfig',
                    title: '变量配置',
                    component: () => import('@/hrds/k/dataControl/variableConfig/variableConfig.vue')
                },
                //规则配置
                {
                    path: '/ruleConfig',
                    name: 'ruleConfig',
                    title: '规则配置',
                    component: () => import('@/hrds/k/dataControl/ruleConfig/ruleConfig.vue')
                },
                //规则信息
                {
                    path: '/ruleInfo',
                    name: 'ruleInfo',
                    title: '规则配置',
                    component: () => import('@/hrds/k/dataControl/ruleConfig/ruleInfo.vue')
                },
                //规则检测详情
                {
                    path: '/ruleDetectionDetail',
                    name: 'ruleDetectionDetail',
                    title: '规则详情',
                    component: () => import('@/hrds/k/dataControl/ruleConfig/ruleDetectionDetail.vue')
                },
                //规则调度状态
                {
                    path: '/ruleETLStatus',
                    name: 'ruleETLStatus',
                    title: '规则详情',
                    component: () => import('@/hrds/k/dataControl/ruleConfig/ruleETLStatus.vue')
                },
                //规则结果
                {
                    path: '/ruleResults',
                    name: 'ruleResults',
                    title: '规则结果',
                    component: () => import('@/hrds/k/dataControl/ruleResults/ruleResults.vue')
                },
                //详情首页
                {
                    path: '/menus',
                    name: 'menus',
                    title: '工程详情',
                    redirect: '/subSystem',
                    component: () => import('@/hrds/c/detailsPages/menus/menus.vue'),
                    children: [
                        //监控当前批量详情页面
                        {
                            path: '/currentBatch',
                            name: 'currentBatch',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Monitor/currentBatch/currentBatch.vue')
                        },
                        //监控历史批量详情页面
                        {
                            path: '/historyBatch',
                            name: 'historyBatch',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Monitor/historyBatch/historyBatch.vue')
                        },
                        //监控当前作业详情页面
                        {
                            path: '/currentJob',
                            name: 'currentJob',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Monitor/currentJob/currentJob.vue')
                        },
                        //监控历史作业详情页面
                        {
                            path: '/historyJob',
                            name: 'historyJob',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Monitor/historyJob/historyJob.vue')
                        },
                        //监控依赖作业详情页面
                        {
                            path: '/relyJob',
                            name: 'relyJob',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Monitor/relyJob/relyJob.vue')
                        },
                        //监控系统资源详情页面
                        {
                            path: '/systemResource',
                            name: 'systemResource',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Monitor/systemResource/systemResource.vue')
                        },
                        //干预系统级干预详情页面
                        {
                            path: '/sysLevelIntervente',
                            name: 'sysLevelIntervente',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Intervene/sysLevelIntervente/sysLevelIntervente.vue')
                        },
                        //干预作业级干预详情页面
                        {
                            path: '/jobLevelIntervente',
                            name: 'jobLevelIntervente',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Intervene/jobLevelIntervente/jobLevelIntervente.vue')
                        },
                        //配置任务详情页面
                        {
                            path: '/subSystem',
                            name: 'subSystem',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Configure/subSystem/subSystem.vue')
                        },
                        //配置作业模板详情页面
                        {
                            path: '/etlJobDefTemplate',
                            name: 'etlJobDefTemplate',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Configure/etlJobDefTemplate/etlJobDefTemplate.vue')
                        },
                        //配置作业详情页面
                        {
                            path: '/etlJobDef',
                            name: 'etlJobDef',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Configure/etlJobDef/etlJobDef.vue')
                        },
                        //配置资源定义详情页面
                        {
                            path: '/resourcesAvailable',
                            name: 'resourcesAvailable',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Configure/resourcesAvailable/resourcesAvailable.vue')
                        },
                        //配置资源分配详情页面
                        {
                            path: '/resourcesUsage',
                            name: 'resourcesUsage',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Configure/resourcesUsage/resourcesUsage.vue')
                        },
                        //配置作业依赖详情页面
                        {
                            path: '/etlDependency',
                            name: 'etlDependency',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Configure/etlDependency/etlDependency.vue')
                        },
                        //配置系统参数详情页面
                        {
                            path: '/systemParameter',
                            name: 'systemParameter',
                            title: '工程详情',
                            component: () => import('@/hrds/c/detailsPages/Configure/systemParameter/systemParameter.vue')
                        },
                    ]
                },
                {
                    path: '/dataMart',
                    name: 'dataMart',
                    title: 'dataMart',
                    component: () => import('@/hrds/h/market/marketIndex.vue')
                },
                {
                    path: '/detailMart',
                    name: 'detailMart',
                    title: 'detailMart',
                    component: () => import('@/hrds/h/market/detailMart.vue')
                },
                {
                    path: '/addMartTable_1',
                    name: 'addMartTable_1',
                    title: 'addMartTable_1',
                    component: () => import('@/hrds/h/market/addMartTable_1.vue')
                },
                {
                    path: '/addMartTable_2',
                    name: 'addMartTable_2',
                    title: 'addMartTable_2',
                    component: () => import('@/hrds/h/market/addMartTable_2.vue')
                },
                {
                    path: '/addMartTable_3',
                    name: 'addMartTable_3',
                    title: 'addMartTable_3',
                    component: () => import('@/hrds/h/market/addMartTable_3.vue')
                },
                {
                    path: '/serviceMage',
                    name: 'serviceMage',
                    title: '服务接口管理',
                    component: () => import('@/hrds/g/serviceMage.vue')
                },
                {
                    path: '/userManage',
                    name: 'userManage',
                    title: '用户管理',
                    component: () => import('@/hrds/g/usermanage/userManage.vue')
                },
                {
                    path: '/releaseManage',
                    name: 'releaseManage',
                    title: '发布管理',
                    component: () => import('@/hrds/g/releasemanage/releaseManage.vue')
                },
                {
                    path: '/dataRangeManage',
                    name: 'dataRangeManage',
                    title: '数据范围管理',
                    component: () => import('@/hrds/g/datarangemanage/dataRangeManage.vue')
                },
                {
                    path: '/interfaceUseMonitor',
                    name: 'interfaceUseMonitor',
                    title: '接口使用监控',
                    component: () => import('@/hrds/g/interfaceusemonitor/interfaceUseMonitor.vue')
                },
                {
                    path: '/serviceUser',
                    name: 'serviceUser',
                    title: '服务接口用户',
                    component: () => import('@/hrds/g/serviceuser/serviceUser.vue')
                },
                {
                    path: '/getToken',
                    name: 'getToken',
                    title: '获取token值接口',
                    component: () => import('@/hrds/g/serviceuser/api/getToken.vue')
                },
                {
                    path: '/generalQuery',
                    name: 'generalQuery',
                    title: '单表普通查询接口',
                    component: () => import('@/hrds/g/serviceuser/api/generalQuery.vue')
                },
                {
                    path: '/sqlInterfaceSearch',
                    name: 'sqlInterfaceSearch',
                    title: 'sql查询接口',
                    component: () => import('@/hrds/g/serviceuser/api/sqlInterfaceSearch.vue')
                },
                {
                    path: '/rowKeySearch',
                    name: 'rowKeySearch',
                    title: 'rowkey查询接口',
                    component: () => import('@/hrds/g/serviceuser/api/rowKeySearch.vue')
                },
                {
                    path: '/fileAttributeSearch',
                    name: 'fileAttributeSearch',
                    title: '文件属性搜索接口',
                    component: () => import('@/hrds/g/serviceuser/api/fileAttributeSearch.vue')
                },
                {
                    path: '/tableStructureQuery',
                    name: 'tableStructureQuery',
                    title: '表结构查询接口',
                    component: () => import('@/hrds/g/serviceuser/api/tableStructureQuery.vue')
                },
                {
                    path: '/tableUsePermissions',
                    name: 'tableUsePermissions',
                    title: '表使用权限查询接口',
                    component: () => import('@/hrds/g/serviceuser/api/tableUsePermissions.vue')
                },
                {
                    path: '/uuidDownload',
                    name: 'uuidDownload',
                    title: 'UUID下载接口',
                    component: () => import('@/hrds/g/serviceuser/api/uuidDownload.vue')
                },
                {
                    path: '/logReview',
                    name: 'logReview',
                    title: 'UUID下载接口',
                    component: () => import('@/hrds/a/logreview/logReview.vue')
                },
            ]
        },

        {path: '*', name: '*', component: () => import('@/hrds/components/notFound.vue')},
        {
            path: '/interfaceTest',
            name: 'interfaceTest',
            title: '接口测试',
            component: () => import('@/hrds/g/serviceuser/interfaceTest.vue')
        },
    ]
})
