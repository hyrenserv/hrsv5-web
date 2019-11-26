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