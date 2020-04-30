import request from '@/utils/request'

// 接口用户管理功能

/**
 * 获取用户管理首页的数据
 */
export function selectUserInfo(data) {
    return request({
        url: '/G/usermanage/selectUserInfo',
        params: data
    })
}

/**
 * 添加用户
 *
 * @param data
 */
export function addUser(data) {
    return request({
        url: '/G/usermanage/addUser',
        params: data
    })
}

/**
 * 编辑(更新）用户
 *
 * @param data
 */
export function updateUser(data) {
    return request({
        url: '/G/usermanage/updateUser',
        params: data
    })
}

/**
 * 删除用户
 *
 * @param data
 */
export function deleteUser(data) {
    return request({
        url: '/G/usermanage/deleteUser',
        params: data
    })
}
/**
 * 查询用户信息
 *
 * @param data
 */
export function selectUserById(data) {
    return request({
        url: '/G/usermanage/selectUserById',
        params: data
    })
}


















 







