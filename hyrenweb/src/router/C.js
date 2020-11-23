export default [
    //详情首页
    {
        path: '/menus',
        name: 'menus',
        title: '工程详情',
        redirect: '/subSystem',
        component: () => import('@/hrds/c/detailsPages/menus/menus.vue'),
        meta: [
            { name: '首页' },
            { name: '作业调度', url: '/etlMage' },
            { name: '工程详情' },
        ],
        children: [
            //监控当前批量详情页面
            {
                path: '/currentBatch',
                name: 'currentBatch',
                title: '当前批量',
                component: () => import('@/hrds/c/detailsPages/Monitor/currentBatch/currentBatch.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '监控', url: '/menus' },
                    { name: '当前批量' }
                ],
            },
            //监控历史批量详情页面
            {
                path: '/historyBatch',
                name: 'historyBatch',
                title: '历史批量',
                component: () => import('@/hrds/c/detailsPages/Monitor/historyBatch/historyBatch.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '监控', url: '/menus' },
                    { name: '历史批量' }
                ],
            },
            //监控当前作业详情页面
            {
                path: '/currentJob',
                name: 'currentJob',
                title: '当前作业',
                component: () => import('@/hrds/c/detailsPages/Monitor/currentJob/currentJob.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '监控', url: '/menus' },
                    { name: '当前作业' }
                ],
            },
            //监控历史作业详情页面
            {
                path: '/historyJob',
                name: 'historyJob',
                title: '历史作业',
                component: () => import('@/hrds/c/detailsPages/Monitor/historyJob/historyJob.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '监控', url: '/menus' },
                    { name: '历史作业' }
                ],
            },
            //监控依赖作业详情页面
            {
                path: '/relyJob',
                name: 'relyJob',
                title: '依赖作业',
                component: () => import('@/hrds/c/detailsPages/Monitor/relyJob/relyJob.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '监控', url: '/menus' },
                    { name: '依赖作业' }
                ],
            },
            //监控系统资源详情页面
            {
                path: '/systemResource',
                name: 'systemResource',
                title: '系统资源',
                component: () => import('@/hrds/c/detailsPages/Monitor/systemResource/systemResource.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '监控', url: '/menus' },
                    { name: '系统资源' }
                ],
            },
            //干预系统级干预详情页面
            {
                path: '/sysLevelIntervente',
                name: 'sysLevelIntervente',
                title: '系统级干预',
                component: () => import('@/hrds/c/detailsPages/Intervene/sysLevelIntervente/sysLevelIntervente.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '干预', url: '/menus' },
                    { name: '系统级干预' }
                ],
            },
            //干预作业级干预详情页面
            {
                path: '/jobLevelIntervente',
                name: 'jobLevelIntervente',
                title: '作业级干预',
                component: () => import('@/hrds/c/detailsPages/Intervene/jobLevelIntervente/jobLevelIntervente.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '干预', url: '/menus' },
                    { name: '作业级干预' }
                ],
            },
            //配置任务详情页面
            {
                path: '/subSystem',
                name: 'subSystem',
                title: '任务',
                component: () => import('@/hrds/c/detailsPages/Configure/subSystem/subSystem.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '配置', url: '/menus' },
                    { name: '任务' }
                ],
            },
            //配置作业模板详情页面
            {
                path: '/etlJobDefTemplate',
                name: 'etlJobDefTemplate',
                title: '作业模板',
                component: () => import('@/hrds/c/detailsPages/Configure/etlJobDefTemplate/etlJobDefTemplate.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '配置', url: '/menus' },
                    { name: '作业模板' }
                ],
            },
            //配置作业详情页面
            {
                path: '/etlJobDef',
                name: 'etlJobDef',
                title: '作业',
                component: () => import('@/hrds/c/detailsPages/Configure/etlJobDef/etlJobDef.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '配置', url: '/menus' },
                    { name: '作业' }
                ],
            },
            //配置资源定义详情页面
            {
                path: '/resourcesAvailable',
                name: 'resourcesAvailable',
                title: '资源定义',
                component: () => import('@/hrds/c/detailsPages/Configure/resourcesAvailable/resourcesAvailable.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '配置', url: '/menus' },
                    { name: '资源定义' }
                ],
            },
            //配置资源分配详情页面
            {
                path: '/resourcesUsage',
                name: 'resourcesUsage',
                title: '资源分配',
                component: () => import('@/hrds/c/detailsPages/Configure/resourcesUsage/resourcesUsage.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '配置', url: '/menus' },
                    { name: '资源分配' }
                ],
            },
            //配置作业依赖详情页面
            {
                path: '/etlDependency',
                name: 'etlDependency',
                title: '作业依赖',
                component: () => import('@/hrds/c/detailsPages/Configure/etlDependency/etlDependency.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '配置', url: '/menus' },
                    { name: '作业依赖' }
                ],
            },
            //配置系统参数详情页面
            {
                path: '/systemParameter',
                name: 'systemParameter',
                title: '系统参数',
                component: () => import('@/hrds/c/detailsPages/Configure/systemParameter/systemParameter.vue'),
                meta: [
                    { name: '首页' },
                    { name: '作业调度', url: '/etlMage' },
                    { name: '配置', url: '/menus' },
                    { name: '系统参数' }
                ],
            },
        ]
    },
    {
        path: '/etlMage',
        name: 'etlMage',
        title: 'etlMage',
        component: () => import('@/hrds/c/etlMage/etlMage.vue'),
        meta: [
            { name: '首页' },
            { name: '作业调度', url: 'etlMage' },
            { name: '工程管理' },

        ],
    }
]