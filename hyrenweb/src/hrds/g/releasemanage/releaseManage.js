import request from '@/utils/request'

// 接口发布管理页面

/**
 * 查询接口用户信息
 */
export function searchUserInfo() {
    return request({
        url: '/G/releasemanage/searchUserInfo'
    })
}

/**
 * 根据类型查看接口信息
 *
 * @param data
 */
export function searchInterfaceInfoByType(data) {
    return request({
        url: '/G/releasemanage/searchInterfaceInfoByType',
        params:data
    })
}
/**
 * 保存接口使用信息
 *
 * @param data
 */
export function saveInterfaceUseInfo(data) {
    return request({
        url: '/G/releasemanage/saveInterfaceUseInfo',
        params:data
    })
}


















 







