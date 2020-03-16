import request from '@/utils/request'

//分页查询作业资源分配信息
export function searchEtlJobResourceRelaByPage(data) {
    return request({
        url: '/C/jobschedule/searchEtlJobResourceRelaByPage',
        method: 'post',
        params: data
    })
}

//根据工程编号、作业名称查询作业资源
export function searchEtlJobResourceRela(data) {
    return request({
        url: '/C/jobschedule/searchEtlJobResourceRela',
        method: 'post',
        params: data
    })
}

//新增保存资源分配信息
export function saveEtlJobResourceRela(data) {
    return request({
        url: '/C/jobschedule/saveEtlJobResourceRela',
        method: 'post',
        params: data
    })
}

//更新资源分配信息
export function updateEtlJobResourceRela(data) {
    return request({
        url: '/C/jobschedule/updateEtlJobResourceRela',
        method: 'post',
        params: data
    })
}

//根据工程编号，作业名称删除Etl作业资
export function deleteEtlJobResourceRela(data) {
    return request({
        url: '/C/jobschedule/deleteEtlJobResourceRela',
        method: 'post',
        params: data
    })
}

//批量删除Etl作业资源关系
export function batchDeleteEtlJobResourceRela(data) {
    return request({
        url: '/C/jobschedule/batchDeleteEtlJobResourceRela',
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

//查询资源类型
export function searchEtlResourceType(data) {
    return request({
        url: '/C/jobschedule/searchEtlResourceType',
        method: 'post',
        params: data
    })
}
//上传execl表格
export function uploadExcelFile(data) {
    return request({
        url: '/C/jobschedule/uploadExcelFile',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
//生成表格
export function generateExcel(data) {
    return request({
        url: '/C/jobschedule/generateExcel',
        method: 'post',
        params: data
    })
}
//下载表格
export function downloadFile(data) {
    return request({
        url: '/C/jobschedule/downloadFile',
        method: 'post',
        params: data
    })
}

