import request from '@/utils/request'

// 日志审查

/**
 * 分页查询系统日志信息
 */
export function searchSystemLogByPage(data) {
    return request({
        url: '/A/logreview/searchSystemLogByPage',
        params: data
    })
}

/**
 * 根据用户ID或请求日期分页查询系统日志信息
 */
export function searchSystemLogByIdOrDate(data) {
    return request({
        url: '/A/logreview/searchSystemLogByIdOrDate',
        params: data
    })
}

/**
 * 下载系统日志
 */
export function downloadSystemLog(data) {
    return request({
        url: '/A/logreview/downloadSystemLog',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}