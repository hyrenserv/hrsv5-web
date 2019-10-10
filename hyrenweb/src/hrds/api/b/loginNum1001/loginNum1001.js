import request from '@/utils/request'

/**
 * 添加数据源数据信息
 */
export function addDataResource(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/saveDataSource',
        method: 'post',
        params: data
    })
}

/**
 * 导入源数据信息
 */
export function importDataResource() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/url/datasource/uploadFile',
        method: 'post'
    })
}