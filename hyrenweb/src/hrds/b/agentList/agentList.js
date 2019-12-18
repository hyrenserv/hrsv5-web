import request from '@/utils/request'
// 获取数据源Agent列表信息
export function getAgentInfoList() {
    return request({
        url: '/B/agent/getAgentInfoList',
        method: 'post',
    })
}
//任务配置
export function getAgentInfo(data) {
    return request({
        url: '/B/agent/getAgentInfo',
        method: 'post',
        params:data
    })
}
//数据采集任务管理
export function getTaskInfo(data) {
    return request({
        url: '/B/agent/getTaskInfo',
        method: 'post',
        params:data
    })
}
//数据采集任务管理-删除
export function deleteDBTask(data) {
    return request({
        url: '/B/agent/deleteDBTask',
        method: 'post',
        params:data
    })
}
//查看任务日志
export function viewTaskLog(data) {
    return request({
        url: '/B/agent/viewTaskLog',
        method: 'post',
        params:data
    })
}
// 获取所有数据库的编码和名称 //获取字符补齐
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        method: 'post',
        params:data
    })
}
