import request from '@/utils/request'


//collectOption页面
/**(0)
 * 获取半结构化采集配置页面初始化的值
 */
export function searchObjectCollect(data) {
    return request({
        url: '/B/agent/objectcollect/searchObjectCollect',
        params: data
    })
}

/**(1)
 * 获取半结构化采集配置页面初始化的值
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}

/**(2)
 * 保存半结构化文件采集设置页面信息
 */
export function addObjectCollect(data) {
    return request({
        url: '/B/agent/objectcollect/addObjectCollect',
        params: data
    })
}
/**(3)
 * 选择文件夹Agent所在服务器的文件夹
 */
export function selectPath(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/selectPath',
        params: data
    })
}
/**(4)
 * 选择文件夹Agent所在服务器的文件夹
 */
export function viewTable(data) {
    return request({
        url: '/B/agent/objectcollect/viewTable',
        params: data
    })
}

//collectFileOption页面
/**(0)
 * 获取半结构化采集文件配置页面初始化的值
 */
export function searchObjectCollectTask(data) {
    return request({
        url: '/B/agent/objectcollect/searchObjectCollectTask',
        params: data
    })
}
/**(1)
 * 获取当前表的码表信息(操作码表)
 */
export function searchObjectHandleType(data) {
    return request({
        url: '/B/agent/objectcollect/searchObjectHandleType',
        params: data
    })
}
/**(2)
 * 查询半结构化采集列结构信息
 */
export function searchCollectColumnStruct(data) {
    return request({
        url: '/B/agent/objectcollect/searchCollectColumnStruct',
        params: data
    })
}
