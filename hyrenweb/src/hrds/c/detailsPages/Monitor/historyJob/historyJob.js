import request from '@/utils/request'
// 监控历史作业
export function monitorHistoryJobInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorHistoryJobInfo',
        method: 'post',
        params: data
    })
}