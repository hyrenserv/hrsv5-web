import request from '@/utils/request'

/**(0)
 * 选择文件夹Agent所在服务器的文件夹
 */
export function selectPath(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/selectPath',
        params: data
    })
}

/**(1)
 * 保存ftp采集表对象
 */
export function addFtp_collect(data) {
    return request({
        url: '/B/agent/ftpcollect/addFtp_collect',
        params: data
    })
}

/**(2)
 * 更新ftp采集表对象
 */
export function updateFtp_collect(data) {
    return request({
        url: '/B/agent/ftpcollect/updateFtp_collect',
        params: data
    })
}

/**(3)
 * 根据ftp_id查询ftp采集设置表
 */
export function searchFtp_collect(data) {
    return request({
        url: '/B/agent/ftpcollect/searchFtp_collect',
        params: data
    })
}

/**(4)
 * 获取ftp采集配置页面初始化的值（代码项）
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}