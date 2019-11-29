import request from '@/utils/request'

/**(0)
   * 新增数据存储层、数据存储附加、数据存储层配置属性信息
   */
  export function addDataStore(data) {
    return request({
        url: '/A/datastore/addDataStore',
        method: 'post',
        params: data
    })
}

/**(1)
 * 获取ftp采集配置页面初始化的值（代码项）
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        method: 'post',
        params: data
    })
}

/**(2)
 * 关联查询数据存储层信息
 */
export function searchDataStore(data) {
    return request({
        url: '/A/datastore/searchDataStore',
        method: 'post',
        params: data
    })
}

/**(3)
 * 删除数据存储层信息
 */
export function deleteDataStore(data) {
    return request({
        url: '/A/datastore/deleteDataStore',
        method: 'post',
        params: data
    })
}

/**(4)
 * 根据权限数据存储层配置ID关联查询数据存储层信息
 */
export function searchDataStoreById(data) {
    return request({
        url: '/A/datastore/searchDataStoreById',
        method: 'post',
        params: data
    })
}

/**(5)
 * 编辑保存数据存储层信息
 */
export function updateDataStore(data) {
    return request({
        url: '/A/datastore/updateDataStore',
        method: 'post',
        params: data
    })
}

/**(5)
 * 根据代码项分组编号和代码项值，获取中文名称
 */
export function getValue(data) {
    return request({
        url: '/A/codes/getValue',
        method: 'post',
        params: data
    })
}