import request from '@/utils/request'

// 接口服务管理首页

/**
 * 获取接口响应时间列表
 */
export function interfaceResponseTime() {
    return request({
        url: '/G/interfaceResponseTime',
    })
}