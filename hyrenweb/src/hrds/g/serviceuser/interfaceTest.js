import request from '@/utils/request'

// 接口测试页面

/**
 * 获取token
 */
export function getToken(data) {
    return request({
        url: '/G/serviceuser/impl/getToken',
        params: data
    })
}

/**
 * 获取接口响应数据
 */
export function getInterfaceData(data) {
    return request({
        url: '/G/serviceuser/impl/' + data.url,
        params: data
    })
}
/**
 * 获取接口响应数据
 */
export function uuidDownload(data) {
    return request({
        url: '/G/serviceuser/impl/' + data.url,
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}