import request from '@/utils/request'
// 监控历史作业
export function monitorHistoryJobInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorHistoryJobInfo',
        method: 'post',
        params: data
    })
}
// 查看作业日志信息
export function readHistoryJobLogInfo(data) {
    return request({
        url: '/C/etlmonitor/readHistoryJobLogInfo',
        method: 'post',
        params: data
    })
}

// 下载日志文件到本地
export function downHistoryJobLog(data) {
    return request({
        url: '/C/etlmonitor/downHistoryJobLog',
        method: 'post',
        params: data,
    })
}
//查询作业名称信息
export function searchEtlJob(data) {
    return request({
        url: '/C/jobconfig/searchEtlJob',
        method: 'post',
        params: data
    })
}
// 下载日志
export function downloadFile(data) {
    return request({
        url: '/C/etlsys/downloadFile',
        method: 'post',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}