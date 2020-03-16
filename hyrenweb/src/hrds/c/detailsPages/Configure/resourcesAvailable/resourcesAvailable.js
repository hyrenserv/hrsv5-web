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
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}