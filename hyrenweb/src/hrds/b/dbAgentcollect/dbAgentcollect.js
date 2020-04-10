import request from '@/utils/request'

/**(0)
 * 获取非结构化采集配置页面初始化的值（代码项）
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}