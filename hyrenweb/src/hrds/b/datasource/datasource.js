import request from '@/utils/request'

// datasourceManagement页面

/**(0)
 * 获取datasourceManagement首页的数据
 */
export function searchDataSourceInfo() {
    return request({
        url: '/B/datasource/searchDataSourceAndAgentCount'
    })
}

/**(1)
 * 点击导入按钮获取数据采集信息
 */
export function searchDataCollectUser() {
    return request({
        url: '/B/datasource/searchDataCollectUser'
    })
}


/**(2)
 * 点击上传按钮上传数据
 */
export function uploadFile(data) {
    return request({
        url: '/B/datasource/uploadFile',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/**(3)
 * 点击数据来源表添加按钮获取所属部门,或者传参获取source_id的所有信息
 */
export function searchDataSourceOrDepartment(data) {
    return request({
        url: '/B/datasource/searchDepartmentInfo',
        params:data
    })
}

/**(4)
 * 添加数据来源表一条数据
 */
export function saveDataSource(data) {
    return request({
        url: '/B/datasource/saveDataSource',
        params: data
    })
}

/**(5)
 * 点击数据源下载按钮下载数据
 */
export function downloadFile(data) {
    return request({
        url: '/B/datasource/downloadFile',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/**(6)
 * 点击数据源编辑按钮更新数据
 */
export function updateDataSource(data) {
    return request({
        url: '/B/datasource/updateDataSource',
        params: data
    })
}


/**(7)
   *点击数据源删除按钮删除数据
   */
  export function deleteDataSource(data) {
    return request({
        url: '/B/datasource/deleteDataSource',
        params:data
    })
}

/**(8)
   *数据管理列表权限收回
   */
  export function deleteAudit(data) {
    return request({
        url: '/B/datasource/deleteAudit',
        params:data
    })
}


/**(9)
   *数据管理列表分页查询
   */
  export function getDataAuditInfoForPage(data) {
    return request({
        url: '/B/datasource/getDataAuditInfoForPage',
        params:data
    })
}



/**(10)
 * 数据权限管理，更新数据源关系部门信息
 */
export function updateAuditSourceRelationDep(data) {
    return request({
        url: '/B/datasource/updateAuditSourceRelationDep',
        params: data
    })
}


/**(11)
   *数据权限管理分页查询
   */
  export function searchSourceRelationDepForPage(data) {
    return request({
        url: '/B/datasource/searchSourceRelationDepForPage',
        params:data
    })
}

/**(12)
 * 点击数据来源表获取source_id的所有信息
 */
export function searchDataSourceById(data) {
    return request({
        url: '/B/datasource/searchDataSourceById',
        params:data
    })
}
// datasource页面

/**(0)
   * 查询数据源对应agent所有信息，数据源页面到agent页面
   */
  export function searchDatasourceAndAgentInfo(data) {
    return request({
        url: '/B/agentinfo/searchDatasourceAndAgentInfo',
        params: data
    })
}


/**(1)
 * 点击新增数据库按钮增加信息
 */
export function saveAgent(data) {
    return request({
        url: '/B/agentinfo/saveAgent',
        params:data
    })
}

/**(2)
 * 点击编辑数据库更新信息
 */
export function updateAgent(data) {
    return request({
        url: '/B/agentinfo/updateAgent',
        params:data
    })
}

/**(3)
 * 删除agent信息
 */
export function deleteAgent(data) {
    return request({
        url: '/B/agentinfo/deleteAgent',
        params:data
    })
}
/**(4)
 * 获取代码项信息
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}

















 







