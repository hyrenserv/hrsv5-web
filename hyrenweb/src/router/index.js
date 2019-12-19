import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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
export default new Router({routes: [
    {path: '/',name: 'login',component: () => import('@/hrds/login/login.vue')},
    //菜单路由地址配置
    {path: "/home",name: 'home',component: () => import('@/hrds/components/menu'),children: [
        {path: '/syspara',name: 'syspara',component: () => import('@/hrds/a/syspara/index.vue')},
        {path: '/agentdeploy',name: 'agentdeploy',component: () => import('@/hrds/b/agentdeploy/agentdeploylist.vue')},
        {path: '/collectmonitor',name: 'collectmonitor',title: '采集监控首页',component: () => import('@/hrds/b/collectmonitor/collectmonitor.vue')},
        {path: '/datasourceManagement',name: ' datasourceManagement',title: '数据源管理',component: () => import('@/hrds/b/datasource/datasourceManagement.vue') },
        {path: '/addScoure',name: 'addScoure',title: 'agent管理',component: () => import('@/hrds/b/datasource/datasource.vue')},
        {path: '/collection1_1',name: 'addTask01',title: '数据库采集',component: () => import('@/hrds/b/addTask/steps1.vue')},
        {path: '/collection1_2',name: 'addTask02',title: '数据库采集02',component: () => import('@/hrds/b/addTask/steps2.vue')},
        {path: '/collection1_3',name: 'addTask03',title: '数据库采集03',component: () => import('@/hrds/b/addTask/steps3.vue')},
        {path: '/collection1_4',name: 'addTask04',title: '数据库采集04',component: () => import('@/hrds/b/addTask/steps4.vue')},
        {path: '/collection1_5',name: 'addTask05',title: '数据库采集05',component: () => import('@/hrds/b/addTask/steps5.vue')},
        {path: '/collection1_6',name: 'addTask06',title: '数据库采集06',component: () => import('@/hrds/b/addTask/steps6.vue')},
        {path: '/agentList',name: 'agentList',title: 'agent列表',component: () => import('@/hrds/b/agentList/agentList.vue')},
        {path: '/taskLog1',name: 'taskLog',title: 'taskLog日志查看',component: () => import('@/hrds/b/agentList/taskLog.vue')},
        // 系统管理
        {path: '/managementsystem',name: 'managementsystem',title: '系统管理',component: () => import('@/hrds/a/managementsystem/managementsystem.vue')},
        // 用户列表
        {path: '/userManagement',name: 'userManagement',title: '用户列表',component: () => import('@/hrds/a/managementsystem/userManagement.vue')},
        // 部门列表
        {path: '/departmentalList',name: 'departmentalList',title: '部门列表',component: () => import('@/hrds/a/managementsystem/departmentalList.vue')},
        // 系统参数列表
        {path: '/systemParameters',name: 'systemParameters',title: '系统列表',component: () => import('@/hrds/a/managementsystem/systemParameters.vue')},
        // 半结构化agent采集
        {path: '/collection2_1',name: 'collectOption',title: '采集设置',component: () => import('@/hrds/b/semiStructuredAgent/collectOption.vue')},
        {path: '/collectFileOption',name: 'collectFileOption',title: '采集文件设置',component: () => import('@/hrds/b/semiStructuredAgent/collectFileOption.vue')},
        {path: '/collectionStructureSet',name: 'collectionStructureSet',title: '采集文件设置',component: () => import('@/hrds/b/semiStructuredAgent/collectionStructureSet.vue')},
        //ftp agent采集
        {path: '/collection3_1',name: 'ftpCollect',title: '采集ftp agent',component: () => import('@/hrds/b/ftpCollect/ftpCollect.vue')},
        // 非结构化 Agent采集
        {path: '/collection5_1',name: 'configureStartMode',title: '配置启动方式',component: () => import('@/hrds/b/unstructuredAgent/configureStartMode.vue')},
        {path: '/configureFileOption',name: 'configureFileOption',title: '配置连接属性',component: () => import('@/hrds/b/unstructuredAgent/configureFileOption.vue')},
        // dataStoreAction
        {path: '/dataStoreLayer',name: 'dataStoreActionIndex',title: 'dataStoreActionIndex',component: () => import('@/hrds/a/datastore/dataStoreActionIndex.vue')},
        {path: '/dataStoreAction',name: 'dataStoreAction',title: 'dataStoreAction',component: () => import('@/hrds/a/datastore/dataStoreAction.vue')},
        // 数据查询
        {path: '/dataQuery',name: 'dataQuery',title: 'dataQuery',component: () => import('@/hrds/b/dataQuery/dataQuery.vue')},
        {path: '/myApply',name: 'myApply',title: 'myApply',component: () => import('@/hrds/b/dataQuery/myApply.vue')},
        {path: '/myRequestRecord',name: 'myRequestRecord',title: 'myRequestRecord',component: () => import('@/hrds/b/dataQuery/myRequestRecord.vue')},
        {path: '/fullTextSearch',name: 'fullTextSearch',title: 'fullTextSearch',component: () => import('@/hrds/b/dataQuery/fullTextSearch.vue')},
        {path: '/webSqlConsole',name: 'webSqlConsole',title: 'webSqlConsole',component: () => import('@/hrds/b/dataQuery/webSqlConsole.vue')},

    ]},
    {path: '*',name: '*',component: () => import('@/hrds/components/notFound.vue')},
]})
