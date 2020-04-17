import request from '@/utils/request'

// 数据范围管理页面

/**
 *查询数据使用范围信息
 */
export function searchDataUsageRangeInfoToTreeData() {
    return request({
        url: '/G/datarangemanage/searchDataUsageRangeInfoToTreeData'
    })
}
/**
 * 查询接口用户信息
 */
export function searchUserInfo() {
    return request({
        url: '/G/releasemanage/searchUserInfo'
    })
}

/**
 * 根据ID查询列信息
 */
export function searchFieldById(data) {
    return request({
        url: '/G/datarangemanage/searchFieldById',
        params:data
    })
}
/**
 * 保存数据表数据
 */
export function saveTableData(data) {
    return request({
        url: '/G/datarangemanage/saveTableData',
        params:data
    })
}