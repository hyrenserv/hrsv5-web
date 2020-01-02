import request from '@/utils/request'

//查询系统级当前干预情况
export function searchSysLevelCurrInterventionInfo(data) {
    return request({
        url: '/C/syslevelintervention/searchSysLevelCurrInterventionInfo',
        method: 'post',
        params: data
    })
}

//分页查询系统级历史干预情况
export function searchSysLeverHisInterventionByPage(data) {
    return request({
        url: '/C/syslevelintervention/searchSysLeverHisInterventionByPage',
        method: 'post',
        params: data
    })
}

//系统级干预操作
export function sysLevelInterventionOperate(data) {
    return request({
        url: '/C/syslevelintervention/sysLevelInterventionOperate',
        method: 'post',
        params: data
    })
}

//查询系统级干预系统批量情况
export function searchSystemBatchConditions(data) {
    return request({
        url: '/C/syslevelintervention/searchSystemBatchConditions',
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
