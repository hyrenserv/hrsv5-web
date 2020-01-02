import request from '@/utils/request'

//分页查询作业调度系统参数信息
export function searchEtlParaByPage(data) {
    return request({
        url: '/C/jobschedule/searchEtlParaByPage',
        method: 'post',
        params: data
    })
}

//新增保存作业系统参数
export function saveEtlPara(data) {
    return request({
        url: '/C/jobschedule/saveEtlPara',
        method: 'post',
        params: data
    })
}

//更新保存作业系统参数
export function updateEtlPara(data) {
    return request({
        url: '/C/jobschedule/updateEtlPara',
        method: 'post',
        params: data
    })
}

//删除作业系统参数
export function deleteEtlPara(data) {
    return request({
        url: '/C/jobschedule/deleteEtlPara',
        method: 'post',
        params: data
    })
}

//批量删除作业系统参数
export function batchDeleteEtlPara(data) {
    return request({
        url: '/C/jobschedule/batchDeleteEtlPara',
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