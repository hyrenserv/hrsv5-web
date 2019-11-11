import request from '@/utils/request'

// datasourceManagement页面

/**(0)
 * 获取datasourceManagement首页的数据
 */
export function searchDataSourceInfo() {
    return request({
        url: '/B/datasource/searchDataSourceInfo',
        method: 'post'
    })
}