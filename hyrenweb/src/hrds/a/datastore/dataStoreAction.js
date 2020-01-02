import request from '@/utils/request'

/**(0)
   * 新增数据存储层、数据存储附加、数据存储层配置属性信息
   */
  export function addDataStore(data) {
    return request({
        url: '/A/datastore/addDataStore',
        params: data
    })
}

/**(1)
 * 获取ftp采集配置页面初始化的值（代码项）
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}

/**(2)
 * 关联查询数据存储层信息
 */
export function searchDataStore(data) {
    return request({
        url: '/A/datastore/searchDataStore',
        params: data
    })
}

/**(3)
 * 删除数据存储层信息
 */
export function deleteDataStore(data) {
    return request({
        url: '/A/datastore/deleteDataStore',
        params: data
    })
}

/**(4)
 * 根据权限数据存储层配置ID关联查询数据存储层信息
 */
export function searchDataStoreById(data) {
    return request({
        url: '/A/datastore/searchDataStoreById',
        params: data
    })
}

/**(5)
 * 编辑保存数据存储层信息
 */
export function updateDataStore(data) {
    return request({
        url: '/A/datastore/updateDataStore',
        params: data
    })
}

/**(6)
 * 根据代码项分组编号和代码项值，获取中文名称
 */
export function getValue(data) {
    return request({
        url: '/A/codes/getValue',
        params: data
    })
}

// 存储层数据类型长度接口
/**(7)
 * 查询数据存储层数据类型对照以及长度对照主表信息
 */
export function searchDataTypeMasterTableInfo() {
    return request({
        url: '/A/datastore/searchDataTypeMasterTableInfo'
    })
}

/**(8)
 * 添加存储层数据类型长度对照信息
 */
export function addTypeLengthContrastInfo(data) {
    return request({
        url: '/A/datastore/addTypeLengthContrastInfo',
        params: data
    })
}