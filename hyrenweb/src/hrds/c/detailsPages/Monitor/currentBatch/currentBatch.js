import request from '@/utils/request'
// 监控当前批量
export function monitorCurrentBatchInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorCurrentBatchInfo',
        method: 'post',
        params: data
    })
}