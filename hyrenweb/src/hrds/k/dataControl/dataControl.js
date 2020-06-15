import request from '@/utils/request'

//获取表统计信息
export function getTableStatistics() {
    return request({
        url: '/K/dm/getTableStatistics',
    })
}

//获取各种规则统计结果
export function getRuleStatistics() {
    return request({
        url: '/K/dm/getRuleStatistics',
    })
}
