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
//数据采集任务管理-删除db
export function deleteDBTask(data) {
    return request({
        url: '/B/agent/deleteDBTask',
        params:data
    })
}
//数据采集任务管理-删除ftp
export function deleteFTPTask(data) {
    return request({
        url: '/B/agent/deleteFTPTask',
        params:data
    })
}
//数据采集任务管理-删除数据库文件
export function deleteDFTask(data) {
    return request({
        url: '/B/agent/deleteDFTask',
        params:data
    })
}
//数据采集任务管理-删除半结构化
export function deleteHalfStructTask(data) {
    return request({
        url: '/B/agent/deleteHalfStructTask',
        params:data
    })
}
//数据采集任务管理-删除非结构化
export function deleteNonStructTask(data) {
    return request({
        url: '/B/agent/deleteNonStructTask',
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
