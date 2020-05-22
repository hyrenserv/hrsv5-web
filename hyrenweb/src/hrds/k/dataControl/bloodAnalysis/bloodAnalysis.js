import request from '@/utils/request'

// 血缘关系

/**
 * 模糊搜索表名
 */
export function fuzzySearchTableName(data) {
    return request({
        url: '/K/dm/bloodanalysis/fuzzySearchTableName',
        method: 'post',
        params: data
    })
}
/**
 * 根据表名称获取表与表之间的血缘关系
 */
export function getTableBloodRelationship(data) {
    return request({
        url: '/K/dm/bloodanalysis/getTableBloodRelationship',
        method: 'post',
        params: data
    })
}