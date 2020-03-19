import request from '@/utils/request'

//查询作业调度工程信息
export function searchEtlSys(data) {
    return request({
        url: '/C/etlsys/searchEtlSys',
        method: 'post',
        params: data 
    })
}

//根据工程编号查询作业调度工程信息
export function searchEtlSysById(data) {
    return request({
        url: '/C/etlsys/searchEtlSysById',
        method: 'post',
        params: data
    })
}

//新增保存作业调度工程信息
export function addEtlSys(data) {
    return request({
        url: '/C/etlsys/addEtlSys',
        method: 'post',
        params: data
    })
}

//更新保存作业调度工程
export function updateEtlSys(data) {
    return request({
        url: '/C/etlsys/updateEtlSys',
        method: 'post',
        params: data
    })
}

//启动CONTROL
export function startControl(data) {
    return request({
        url: '/C/etlsys/startControl',
        method: 'post',
        params: data
    })
}

//启动TRIGGER
export function startTrigger(data) {
    return request({
        url: '/C/etlsys/startTrigger',
        method: 'post',
        params: data
    })
}

//读取Control或Trigger日志信息
export function readControlOrTriggerLog(data) {
    return request({
        url: '/C/etlsys/readControlOrTriggerLog',
        method: 'post',
        params: data
    })
}

//部署作业调度工程
export function deployEtlJobScheduleProject(data) {
    return request({
        url: '/C/etlsys/deployEtlJobScheduleProject',
        method: 'post',
        params: data
    })
}

//下载Control或Trigger日志
export function downloadControlOrTriggerLog(data) {
    return request({
        url: '/C/etlsys/downloadControlOrTriggerLog',
        method: 'post',
        params: data
    })
}
//监控所有项目图表数据
export function monitorAllProjectChartsData(data) {
    return request({
        url: '/C/etlmonitor/monitorAllProjectChartsData',
        method: 'post',
        params: data
    })
}