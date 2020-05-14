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
// 任务日志下载downloadTaskLog
export function downloadTaskLog(data) {
    return request({
        url: '/B/agent/downloadTaskLog',
        params:data
    })
}
//获取工程信息
 export function getProjectInfo() {
    return request({
        url: '/B/agent/getProjectInfo',
    })
} 
//根据工程id获取任务信息
export function getTaskInfoByTaskId(data) {
    return request({
        url: '/B/agent/getTaskInfoByTaskId',
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
//发送此次任务--数据库采集
export function sendJDBCCollectTaskById(data) {
    return request({
        url: '/B/agent/sendJDBCCollectTaskById',
        params:data
    })
}
//发送此次任务--db文件发送
export function sendDBCollectTaskById(data) {
    return request({
        url: '/B/agent/sendDBCollectTaskById',
        params:data
    })
}
//读取日志
export function agentDeployData(data) {
    return request({
        url: '/B/agent/agentDeployData',
        params:data
    })
}