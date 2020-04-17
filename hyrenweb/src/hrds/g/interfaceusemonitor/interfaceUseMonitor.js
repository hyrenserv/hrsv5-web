import request from '@/utils/request'

// 接口使用监控页面

/**
 * 查询接口用户信息
 */
export function searchUserInfo() {
    return request({
        url: '/G/releasemanage/searchUserInfo'
    })
}

/**
 * 查询数据表信息
 */
export function searchTableData() {
    return request({
        url: '/G/interfaceusemonitor/datatableuseinfo/searchTableData'
    })
}

/**
 * 根据用户ID查询数据表信息
 */
export function searchTableDataById(data) {
    return request({
        url: '/G/interfaceusemonitor/datatableuseinfo/searchTableDataById',
        params: data
    })
}

/**
 * 根据表使用ID查看字段信息
 */
export function searchFieldInfoById(data) {
    return request({
        url: '/G/interfaceusemonitor/datatableuseinfo/searchFieldInfoById',
        params: data
    })
}

/**
 * 根据表使用ID删除数据表信息
 */
export function deleteDataTableUseInfo(data) {
    return request({
        url: '/G/interfaceusemonitor/datatableuseinfo/deleteDataTableUseInfo',
        params: data
    })
}

/**
 * 根据用户ID或有效日期查询接口信息
 */
export function searchInterfaceInfoByIdOrDate(data) {
    return request({
        url: '/G/interfaceusemonitor/interfaceuseinfo/searchInterfaceInfoByIdOrDate',
        params: data
    })
}

/**
 * 查询接口信息
 */
export function searchInterfaceInfo() {
    return request({
        url: '/G/interfaceusemonitor/interfaceuseinfo/searchInterfaceInfo'
    })
}

/**
 * 根据接口使用ID查询接口信息
 */
export function searchInterfaceUseInfoById(data) {
    return request({
        url: '/G/interfaceusemonitor/interfaceuseinfo/searchInterfaceUseInfoById',
        params: data
    })
}

/**
 * 接口的启用禁用
 */
export function interfaceDisableEnable(data) {
    return request({
        url: '/G/interfaceusemonitor/interfaceuseinfo/interfaceDisableEnable',
        params: data
    })
}

/**
 * 编辑
 */
export function updateInterfaceUseInfo(data) {
    return request({
        url: '/G/interfaceusemonitor/interfaceuseinfo/updateInterfaceUseInfo',
        params: data
    })
}

/**
 * 删除
 */
export function deleteInterfaceUseInfo(data) {
    return request({
        url: '/G/interfaceusemonitor/interfaceuseinfo/deleteInterfaceUseInfo',
        params: data
    })
}
