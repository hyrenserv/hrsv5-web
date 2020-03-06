import request from '@/utils/request'
// 监控历史批量
export function monitorHistoryBatchInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorHistoryBatchInfo',
        method: 'post',
        params: data
    })
}
// 监控当前历史批量任务下的作业信息
export function searchMonitorHisBatchJobBySubCd(data) {
    return request({
        url: '/C/etlmonitor/searchMonitorHisBatchJobBySubCd',
        method: 'post',
        params: data
    })
}