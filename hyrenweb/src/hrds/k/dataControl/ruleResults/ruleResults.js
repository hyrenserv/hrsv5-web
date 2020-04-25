import request from '@/utils/request'

//获取规则执行结果信息
export function getRuleResultInfos(data) {
    return request({
        url: '/K/dm/ruleresults/getRuleResultInfos',
        params: data,
    })
}

//检索规则结果信息
export function searchRuleResultInfos(data) {
    return request({
        url: '/K/dm/ruleresults/searchRuleResultInfos',
        params: data,
    })
}

//规则执行详细信息
export function getRuleDetectDetail(data) {
    return request({
        url: '/K/dm/ruleresults/getRuleDetectDetail',
        params: data,
    })
}

//规则执行历史信息
export function getRuleExecuteHistoryInfo(data) {
    return request({
        url: '/K/dm/ruleresults/getRuleExecuteHistoryInfo',
        params: data,
    })
}

//获取指标3的数据集
export function getCheckIndex3(data) {
    return request({
        url: '/K/dm/ruleconfig/getCheckIndex3',
        params: data,
    })
}
