import request from '@/utils/request'
import Qs from 'qs'

//codeMaintenance统一编码
/**(0)
 * 查询统一编码信息
 */
export function getCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/getCodeInfo',
        params: data
    })
}
/**(1)
 * 查询所有统一编码分类
 */
export function getAllCodeClassify(data) {
    return request({
        url: '/A/codemaintenance/getAllCodeClassify',
        params: data
    })
}
/**(2)
 * 新增统一编码分类
 */
export function saveCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/saveCodeInfo',
        params: data
    })
}
/**(3)
 * 更新统一编码信息
 */
export function updateCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/updateCodeInfo',
        params: data
    })
}
/**(4)
 * 删除统一编码信息
 */
export function deleteCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/deleteCodeInfo',
        params: data
    })
}
/**(5)
 * 查询统一码值信息
 */
export function getCodeInfoByCodeClassify(data) {
    return request({
        url: '/A/codemaintenance/getCodeInfoByCodeClassify',
        params: data
    })
}
// 源系统信息
/**(0)
 * 新增源系统信息
 */
export function addOrigSysInfo(data) {
    return request({
        url: '/A/codemaintenance/addOrigSysInfo',
        params: data
    })
}
/**(1)
 * 查询源系统信息
 */
export function getOrigSysInfo(data) {
    return request({
        url: '/A/codemaintenance/getOrigSysInfo',
        params: data
    })
}
/**(2)
 * 查询初始化源系统编码信息
 */
export function getOrigCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/getOrigCodeInfo',
        params: data
    })
}
/**(3)
 * 新增源系统编码信息
 */
export function addOrigCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/addOrigCodeInfo',
        params: data
    })
}
/**(4)
 * 更新源系统编码信息
 */
export function updateOrigCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/updateOrigCodeInfo',
        params: data
    })
}
/**(5)
 * 删除源系统编码信息
 */
export function deleteOrigCodeInfo(data) {
    return request({
        url: '/A/codemaintenance/deleteOrigCodeInfo',
        params: data
    })
}
/**(6)
 * 根据码值系统编码与编码分类获取源信息
 */
export function getOrigCodeInfoByCode(data) {
    return request({
        url: '/A/codemaintenance/getOrigCodeInfoByCode',
        params: data
    })
}

