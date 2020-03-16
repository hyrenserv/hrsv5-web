import request from '@/utils/request'

//监控依赖作业(全作业搜索)
export function monitorBatchEtlJobDependencyInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorBatchEtlJobDependencyInfo',
        method: 'post',
        params: data,
        headers: {
            'Content-Type': 'xml'
        },
    })
}
//监控作业依赖信息（单作业搜索）
export function monitorJobDependencyInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorJobDependencyInfo',
        method: 'post',
        params: data
    })
}
