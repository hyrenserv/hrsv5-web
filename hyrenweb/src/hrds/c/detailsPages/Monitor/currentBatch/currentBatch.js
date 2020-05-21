import request from '@/utils/request'
// 监控当前批量
export function monitorCurrentBatchInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorCurrentBatchInfo',
        method: 'post',
        params: data
    })
}
// 监控当前批量状态
export function monitorCurrentBatchInfoByTask(data) {
    return request({
        url: '/C/etlmonitor/monitorCurrentBatchInfoByTask',
        method: 'post',
        params: data
    })
}
// 监控作业依赖信息（单作业搜索）
export function searchMonitorJobStateBySubCd(data) {
    return request({
        url: '/C/etlmonitor/searchMonitorJobStateBySubCd',
        method: 'post',
        params: data
    })
}
// 获取代码项信息
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}
