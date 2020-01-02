import request from '@/utils/request'

//分页查询作业调度某工程任务信息
export function searchEtlSubSysByPage(data) {
    return request({
        url: '/C/jobschedule/searchEtlSubSysByPage',
        method: 'post',
        params: data
    })
}

//新增保存任务
export function saveEtlSubSys(data) {
    return request({
        url: '/C/jobschedule/saveEtlSubSys',
        method: 'post',
        params: data
    })
}

//根据工程编号，任务编号删除任务信息
export function deleteEtlSubSys(data) {
    return request({
        url: '/C/jobschedule/deleteEtlSubSys',
        method: 'post',
        params: data
    })
}

//更新保存任务
export function updateEtlSubSys(data) {
    return request({
        url: '/C/jobschedule/updateEtlSubSys',
        method: 'post',
        params: data
    })
}

//批量删除任务信息
export function batchDeleteEtlSubSys(data) {
    return request({
        url: '/C/jobschedule/batchDeleteEtlSubSys',
        method: 'post',
        params: data
    })
}