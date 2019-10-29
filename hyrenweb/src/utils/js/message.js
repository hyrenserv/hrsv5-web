import { Message } from 'element-ui'

/**
 * 
 * @param {Object} data 更新请求处理后的信息
 */
export function updateSuccess(data) {
    if (data && data.success) {
        Message({
            message: '更新成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
}

/**
 * 
 * @param {Object} data 删除请求处理后的信息
 */
export function deleteSuccess(data) {
    if (data && data.success) {
        Message({
            message: '删除成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
}
/**
 * 
 * @param {Object} data 保存请求处理后的信息
 */
export function saveSuccess(data) {
    if (data && data.success) {
        Message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000
        })
    }
}