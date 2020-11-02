import request from '@/utils/request'

// 服务接口用户页面

/**
 * 查询数据表信息
 */
export function searchDataTableInfo(data) {
    return request({
        url: '/G/serviceuser/searchDataTableInfo',
        params:data
    })
}

/**
 * 根据表使用ID查询当前用户对应的列信息
 */
export function searchColumnInfoById(data) {
    return request({
        url: '/G/serviceuser/searchColumnInfoById',
        params:data
    })
}

/**
 * 查询接口信息
 */
export function searchInterfaceInfo(data) {
    return request({
        url: '/G/serviceuser/searchInterfaceInfo',
        params:data
    })
}
