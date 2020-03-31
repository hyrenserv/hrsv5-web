import request from '@/utils/request'

//查询作业级干预作业情况
export function searchJobLevelIntervention(data) {
    return request({
        url: '/C/joblevelintervention/searchJobLevelIntervention',
        method: 'post',
        params: data
    })
}

//查询系统级当前干预情况
export function searchJobLevelCurrInterventionByPage(data) {
    return request({
        url: '/C/joblevelintervention/searchJobLevelCurrInterventionByPage',
        method: 'post',
        params: data
    })
}

//分页查询系统级历史干预情况
export function searchJobLeverHisInterventionByPage(data) {
    return request({
        url: '/C/joblevelintervention/searchJobLeverHisInterventionByPage',
        method: 'post',
        params: data
    })
}

//作业级干预操作
export function jobLevelInterventionOperate(data) {
    return request({
        url: '/C/joblevelintervention/jobLevelInterventionOperate',
        method: 'post',
        params: data
    })
}

//作业批量干预
export function batchJobLevelInterventionOperate(data) {
    return request({
        url: '/C/joblevelintervention/batchJobLevelInterventionOperate',
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