import request from '@/utils/request'

//获取平台登记的所有表名信息
export function getAllTableNameByPlatform(data) {
    return request({
        url: '/B/websqlquery/getAllTableNameByPlatform',
        params: data
    })
}

//获取平台登记的表字段信息
export function getTableInfoByTableName_cache(data) {
    return request({
        url: '/B/websqlquery/getTableInfoByTableName_cache',
        params: data
    })
}

//根据sql获取sql中相关表的字段信息
export function getTableColumnInfoBySql(data) {
    return request({
        url: '/B/websqlquery/getTableColumnInfoBySql',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
