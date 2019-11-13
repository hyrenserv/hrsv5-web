import request from '@/utils/request'


//collectOption页面
/**(0)
 * 获取半结构化采集配置页面初始化的值
 */
export function searchObjectCollect(data) {
    return request({
        url: '/B/agent/objectcollect/searchObjectCollect',
        method: 'post',
        params: data
    })
}

/**(1)
 * 获取半结构化采集配置页面初始化的值
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        method: 'post',
        params: data
    })
}