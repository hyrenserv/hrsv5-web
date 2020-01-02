import request from '@/utils/request'

//分页查询作业依赖信息
export function searchEtlDependencyByPage(data) {
    return request({
        url: '/C/jobschedule/searchEtlDependencyByPage',
        method: 'post',
        params: data
    })
}

//新增保存作业依赖
export function saveEtlDependency(data) {
    return request({
        url: '/C/jobschedule/saveEtlDependency',
        method: 'post',
        params: data
    })
}

//更新保存作业依赖
export function updateEtlDependency(data) {
    return request({
        url: '/C/jobschedule/updateEtlDependency',
        method: 'post',
        params: data
    })
}

//删除作业依赖
export function deleteEtlDependency(data) {
    return request({
        url: '/C/jobschedule/deleteEtlDependency',
        method: 'post',
        params: data
    })
}

//批量新增保存作业依赖
export function batchSaveEtlDependency(data) {
    return request({
        url: '/C/jobschedule/batchSaveEtlDependency',
        method: 'post',
        params: data
    })
}

//批量删除作业依赖
export function batchDeleteEtlDependency(data) {
    return request({
        url: '/C/jobschedule/batchDeleteEtlDependency',
        method: 'post',
        params: data
    })
}

//根据代码项分组编号和代码项值，获取中文名称
export function getValue(data) {
    return request({
        url: '/A/codes/getValue',
        method: 'post',
        params: data
    })
}

//查询作业名称信息
export function searchEtlJob(data) {
    return request({
        url: '/C/jobschedule/searchEtlJob',
        method: 'post',
        params: data
    })
}

//查询任务信息
export function searchEtlSubSys(data) {
    return request({
        url: '/C/jobschedule/searchEtlSubSys',
        method: 'post',
        params: data
    })
}

//根据代码项分组编号，获取该代码项所
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        method: 'post',
        params: data
    })
}