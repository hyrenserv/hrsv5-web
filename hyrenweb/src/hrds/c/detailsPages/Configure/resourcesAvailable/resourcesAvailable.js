import request from '@/utils/request'

//分页查询etl资源定义信息
export function searchEtlResourceByPage(data) {
    return request({
        url: '/C/jobschedule/searchEtlResourceByPage',
        method: 'post',
        params: data
    })
}

//新增保存etl资源定义信息
export function saveEtlResource(data) {
    return request({
        url: '/C/jobschedule/saveEtlResource',
        method: 'post',
        params: data
    })
}

//更新资源信息
export function updateEtlResource(data) {
    return request({
        url: '/C/jobschedule/updateEtlResource',
        method: 'post',
        params: data
    })
}

//删除作业资源定义
export function deleteEtlResource(data) {
    return request({
        url: '/C/jobschedule/deleteEtlResource',
        method: 'post',
        params: data
    })
}

//批量删除作业资源定义
export function batchDeleteEtlResource(data) {
    return request({
        url: '/C/jobschedule/batchDeleteEtlResource',
        method: 'post',
        params: data
    })
}