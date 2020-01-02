import request from '@/utils/request'

//监控作业依赖信息
export function monitorJobDependencyInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorJobDependencyInfo',
        method: 'post',
        params: data
    })
}

const Menus = [
    {
        icon: 'el-icon-view', title: '监控', children: [
            { icon: 'el-icon-location-outline', title: '当前批量', path: '/currentBatch' },
            { icon: 'el-icon-location-outline', title: '历史批量', path: '/historyBatch' },
            { icon: 'el-icon-location-outline', title: '当前作业', path: '/currentJob' },
            { icon: 'el-icon-location-outline', title: '历史作业', path: '/historyJob' },
            { icon: 'el-icon-location-outline', title: '依赖作业', path: '/relyJob' },
            { icon: 'el-icon-location-outline', title: '系统资源', path: '/systemResource' },
        ]
    },
    {
        icon: 'el-icon-menu', title: '干预', children: [
            { icon: 'el-icon-location-outline', title: '系统级干预', path: '/sysLevelIntervente' },
            { icon: 'el-icon-location-outline', title: '作业级干预', path: '/jobLevelIntervente' },
        ]
    },
    {
        icon: 'el-icon-document', title: '配置', children: [
            { icon: 'el-icon-location-outline', title: '任务', path: '/subSystem' },
            { icon: 'el-icon-location-outline', title: '作业模板', path: '/etlJobDefTemplate' },
            { icon: 'el-icon-location-outline', title: '作业', path: '/etlJobDef' },
            { icon: 'el-icon-location-outline', title: '资源定义', path: '/resourcesAvailable' },
            { icon: 'el-icon-location-outline', title: '资源分配', path: '/resourcesUsage' },
            { icon: 'el-icon-location-outline', title: '系统参数', path: '/systemParameter' },
            { icon: 'el-icon-location-outline', title: '作业依赖', path: '/etlDependency' },
        ]
    }
]

export default Menus;