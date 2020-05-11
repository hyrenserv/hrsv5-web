import request from '@/utils/request'

/**(0)
   * 新增数据存储层、数据存储附加、数据存储层配置属性信息
   */
  export function addDataStore(data) {
    return request({
        url: '/A/datastore/addDataStore',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/**(1)
 * 获取页面初始化的值（代码项）
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

/**(3.5)
 * 下载配置文件
 */
export function downloadConfFile(data) {
    return request({
        url: '/A/datastore/downloadConfFile',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
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
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
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

/**(8)
 * 删除存储层数据类型长度对照信息
 */
export function deleteTypeLengthContrastInfo(data) {
    return request({
        url: '/A/datastore/deleteTypeLengthContrastInfo',
        params: data
    })
}

/**(9)
 * 查询存储层数据类型对照信息
 */
export function searchDataLayerDataTypeLengthInfo(data) {
    return request({
        url: '/A/datastore/searchDataLayerDataTypeLengthInfo',
        params: data
    })
}

/**(10)
 * 更新存储层数据类型对照信息
 */
export function updateTypeLengthContrastInfo(data) {
    return request({
        url: '/A/datastore/updateTypeLengthContrastInfo',
        params: data
    })
}

// dataTypeContrastInfo
/**(10)
 * 新增存储层数据类型对照信息
 */
export function addDataTypeContrastInfo(data) {
    return request({
        url: '/A/datastore/addDataTypeContrastInfo',
        params: data
    })
}

/**(11)
 * 查询存储层数据类型对照信息
 */
export function searchDataLayerDataTypeInfo(data) {
    return request({
        url: '/A/datastore/searchDataLayerDataTypeInfo',
        params: data
    })
}

/**(12)
 * 更新存储层数据类型对比信息
 */
export function updateDataTypeContrastInfo(data) {
    return request({
        url: '/A/datastore/updateDataTypeContrastInfo',
        params: data
    })
}

/**(13)
 * 删除数据类型对照信息
 */
export function deleteDataTypeContrastInfo(data) {
    return request({
        url: '/A/datastore/deleteDataTypeContrastInfo',
        params: data
    })
}
/**(14)
 * 根据存储层类型获取数据存储层配置
 */
export function getDataLayerAttrKey(data) {
    return request({
        url: '/A/datastore/getDataLayerAttrKey',
        params: data
    })
}