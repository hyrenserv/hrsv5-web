import request from '@/utils/request'

//分页查询作业定义信息
export function searchEtlJobDefByPage(data) {
    return request({
        url: '/C/jobconfig/searchEtlJobDefByPage',
        method: 'post',
        params: data
    })
}

//查询任务信息
export function searchEtlSubSys(data) {
    return request({
        url: '/C/jobconfig/searchEtlSubSys',
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

//新增保存作业信息
export function saveEtlJobDef(data) {
    return request({
        url: '/C/jobconfig/saveEtlJobDef',
        method: 'post',
        params: data
    })
}

//删除Etl作业定义信息
export function deleteEtlJobDef(data) {
    return request({
        url: '/C/jobconfig/deleteEtlJobDef',
        method: 'post',
        params: data
    })
}

//批量删除Etl作业定义信息
export function batchDeleteEtlJobDef(data) {
    return request({
        url: '/C/jobconfig/batchDeleteEtlJobDef',
        method: 'post',
        params: data
    })
}

//更新作业定义信息并返回更新后的最
export function updateEtlJobDef(data) {
    return request({
        url: '/C/jobconfig/updateEtlJobDef',
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
        url: '/C/jobconfig/searchEtlJob',
        method: 'post',
        params: data
    })
}

//根据工程编号、作业名称查询作业定义
export function searchEtlJobDefById(data) {
    return request({
        url: '/C/jobconfig/searchEtlJobDefById',
        method: 'post',
        params: data
    })
}
//上传execl表格
export function uploadExcelFile(data) {
    return request({
        url: '/C/jobconfig/uploadExcelFile',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
//生成表格
export function generateExcel(data) {
    return request({
        url: '/C/jobconfig/generateExcel',
        method: 'post',
        params: data
    })
}
//下载表格
export function downloadFile(data) {
    return request({
        url: '/C/jobconfig/downloadFile',
        method: 'post',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}