import request from '@/utils/request'
// 获取数据源Agent列表信息
export function getAgentInfoList() {
    return request({
        url: '/B/agent/getAgentInfoList',
    })
}
//任务配置
export function getAgentInfo(data) {
    return request({
        url: '/B/agent/getAgentInfo',
        params:data
    })
}
//数据采集任务管理
export function getTaskInfo(data) {
    return request({
        url: '/B/agent/getTaskInfo',
        params:data
    })
}
//数据采集任务管理-删除
export function deleteDBTask(data) {
    return request({
        url: '/B/agent/deleteDBTask',
        params:data
    })
}
//查看任务日志
export function viewTaskLog(data) {
    return request({
        url: '/B/agent/viewTaskLog',
        params:data
    })
}
// 获取编码项
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params:data
    })
}
