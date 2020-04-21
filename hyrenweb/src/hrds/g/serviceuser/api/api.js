import request from '@/utils/request'

// api

/**
 * 获取当前用户的ip与端口信息
 */
export function getIpAndPort() {
    return request({
        url: '/G/serviceuser/getIpAndPort',
    })
}