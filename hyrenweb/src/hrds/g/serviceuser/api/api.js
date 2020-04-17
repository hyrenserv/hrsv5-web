import request from '@/utils/request'

// api

/**
 * 获取当前用户的ip与端口信息
 */
export function getIpAndPort() {
    return request({
        url: '/G/serviceuser/impl/getIpAndPort',
    })
}
/**
 * 获取token值
 */
export function getToken(data) {
    return request({
        url: '/G/serviceuser/impl/getToken',
        params:data
    })
}