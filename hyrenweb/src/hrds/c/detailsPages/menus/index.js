/* import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Routers({
    mode: 'history',
    routes: [
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
                //配置系统参数详情页面
                {
                    path: '/systemParameter',
                    name: 'systemParameter',
                    title: '工程详情',
                    component: () => import('@/hrds/c/detailsPages/Configure/systemParameter/systemParameter.vue')
                },
                //配置作业依赖详情页面
                {
                    path: '/etlDependency',
                    name: 'etlDependency',
                    title: '工程详情',
                    component: () => import('@/hrds/c/detailsPages/Configure/etlDependency/etlDependency.vue')
                },
            ]
        }
    ]
}) */