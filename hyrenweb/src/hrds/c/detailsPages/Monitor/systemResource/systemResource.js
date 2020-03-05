import request from '@/utils/request'
// 监控当前批量
export function monitorSystemResourceInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorSystemResourceInfo',
        method: 'post',
        params: data
    })
}