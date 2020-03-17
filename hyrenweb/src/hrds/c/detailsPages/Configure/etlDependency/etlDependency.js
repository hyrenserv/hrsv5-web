import request from '@/utils/request'

//分页查询作业依赖信息
export function searchEtlDependencyByPage(data) {
    return request({
        url: '/C/jobconfig/searchEtlDependencyByPage',
        method: 'post',
        params: data
    })
}

//新增保存作业依赖
export function saveEtlDependency(data) {
    return request({
        url: '/C/jobconfig/saveEtlDependency',
        method: 'post',
        params: data
    })
}

//更新保存作业依赖
export function updateEtlDependency(data) {
    return request({
        url: '/C/jobconfig/updateEtlDependency',
        method: 'post',
        params: data
    })
}

//删除作业依赖
export function deleteEtlDependency(data) {
    return request({
        url: '/C/jobconfig/deleteEtlDependency',
        method: 'post',
        params: data
    })
}

//批量新增保存作业依赖
export function batchSaveEtlDependency(data) {
    return request({
        url: '/C/jobconfig/batchSaveEtlDependency',
        method: 'post',
        params: data
    })
}

//批量删除作业依赖
export function batchDeleteEtlDependency(data) {
    return request({
        url: '/C/jobconfig/batchDeleteEtlDependency',
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