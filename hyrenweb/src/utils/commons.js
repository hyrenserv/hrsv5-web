import request from '@/utils/request'

//获取平台登记的所有表名信息
export function getAllTableNameByPlatform(data) {
    return request({
        url: '/B/websqlquery/getAllTableNameByPlatform',
        params: data
    })
}

//获取平台登记的表字段信息
export function getColumnsByTableName(data) {
    return request({
        url: '/B/websqlquery/getColumnsByTableName',
        params: data
    })
}

//根据sql获取sql中相关表的字段信息
export function getTableColumnInfoBySql(data) {
    return request({
        url: '/B/websqlquery/getTableColumnInfoBySql',
        params: data
    })
}
