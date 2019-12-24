import request from '@/utils/request'

// configureStartMode 页面
/**(0)
 * 获取非结构化采集页面初始信息和编辑非结构化采集信息回显
 */
export function searchFileCollect(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/searchFileCollect',
        params: data
    })
}

/**(1)
 * 获取非结构化采集配置页面初始化的值（代码项）
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}

/**(2)
 * 保存非结构化文件采集页面信息到文件系统设置表对象
 */
export function addFileCollect(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/addFileCollect',
        params: data
    })
}

// configureFileOption 页面

/**(0)
 * 根据文件系统设置表id获取源文件设置表的合集
 */
export function searchFileSource(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/searchFileSource',
        params: data
    })
}

/**(1)
 * 选择文件夹Agent所在服务器的文件夹
 */
export function selectPath(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/selectPath',
        params: data
    })
}

/**(2)
 * 将页面选择的需要采集的源文件路径保存到数据库
 */
export function saveFileSource(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/saveFileSource',
        params: data
    })
}

/**(3)
 * 更新非结构化文件采集页面信息到文件系统设置表对象
 */
export function updateFileCollect(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/updateFileCollect',
        params: data
    })
}