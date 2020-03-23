import request from '@/utils/request'

//监控当前作业信息
export function monitorCurrJobInfo(data) {
    return request({
        url: '/C/etlmonitor/monitorCurrJobInfo',
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

//根据代码项分组编号，获取该代码项所
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
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