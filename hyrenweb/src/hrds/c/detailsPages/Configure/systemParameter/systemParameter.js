import request from '@/utils/request'

//分页查询作业调度系统参数信息
export function searchEtlParaByPage(data) {
    return request({
        url: '/C/jobconfig/searchEtlParaByPage',
        method: 'post',
        params: data
    })
}

//新增保存作业系统参数
export function saveEtlPara(data) {
    return request({
        url: '/C/jobconfig/saveEtlPara',
        method: 'post',
        params: data
    })
}

//更新保存作业系统参数
export function updateEtlPara(data) {
    return request({
        url: '/C/jobconfig/updateEtlPara',
        method: 'post',
        params: data
    })
}

//删除作业系统参数
export function deleteEtlPara(data) {
    return request({
        url: '/C/jobconfig/deleteEtlPara',
        method: 'post',
        params: data
    })
}

//批量删除作业系统参数
export function batchDeleteEtlPara(data) {
    return request({
        url: '/C/jobconfig/batchDeleteEtlPara',
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

//根据代码项分组编号和代码项值，获取中文名称
export function getValue(data) {
    return request({
        url: '/A/codes/getValue',
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