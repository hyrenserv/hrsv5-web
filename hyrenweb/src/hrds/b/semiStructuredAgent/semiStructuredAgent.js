import request from '@/utils/request'
import Qs from 'qs'

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
/**(5)
 * 更新半结构化文件采集页面信息
 */
export function updateObjectCollect(data) {
    return request({
        url: '/B/agent/objectcollect/updateObjectCollect',
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
/**(3)
 * 保存操作码表
 */
export function saveHandleType(data) {
    return request({
        url: '/B/agent/objectcollect/saveHandleType',
        params: data
    })
}
/**(4)
 * 保存对象采集结构信息（采集列结构）
 */
export function saveCollectColumnStruct(data) {
    return request({
        url: '/B/agent/objectcollect/saveCollectColumnStruct',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
/**(5)
 * 检查采集文件设置
 */
export function checkFieldsForSaveObjectCollectTask(data) {
    return request({
        url: '/B/agent/objectcollect/checkFieldsForSaveObjectCollectTask',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
/**(6)
 * 获取对象采集树节点信息
 */
export function getObjectCollectTreeInfo(data) {
    return request({
        url: '/B/agent/objectcollect/getObjectCollectTreeInfo',
        params: data
    })
}
/**(7)
 * 保存文件设置信息
 */
export function saveObjectCollectTask(data) {
    return request({
        url: '/B/agent/objectcollect/saveObjectCollectTask',
        params: data
    })
}
//collectionStructureSet页面
/**(0)
 * 获取存储信息
 */
export function searchObjectStorage(data) {
    return request({
        url: '/B/agent/objectcollect/searchObjectStorage',
        params: data
    })
}
/**(1)
 * 查询solr配置信息
 */
export function searchSolrConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/searchSolrConfInfo',
        params: data
    })
}
/**(2)
 * 根据ocs_id查询hbase配置信息
 */
export function searchHBaseConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/searchHBaseConfInfo',
        params: data
    })
}
/**(3)
 * 保存SOLR
 */
export function saveSolrConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/saveSolrConfInfo',
        params: data
    })
}
/**(4)
 * 保存hbase
 */
export function saveHBaseConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/saveHBaseConfInfo',
        params: data
    })
}
/**(4)
 * 保存对象文件配置信息时检查字段
 */
export function checkFieldsForSaveObjectStorage(data) {
    return request({
        url: '/B/agent/objectcollect/checkFieldsForSaveObjectStorage',
        params: data
    })
}
/**(5)
 * 保存存储设置
 */
export function saveObjectStorage(data) {
    return request({
        url: '/B/agent/objectcollect/saveObjectStorage',
        params: data
    })
}