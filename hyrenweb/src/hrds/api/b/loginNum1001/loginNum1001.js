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
 * 导入数据源数据信息
 */
export function importDataResource(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/uploadFile',
        method: 'post',
        params: data
    })
}


/**
 * 点击添加按钮获取部门信息
 */
export function getDepartmentInfo() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataSource?sourceId=123',
        method: 'get',
    })
}



/**
 * 点击导入按钮获取数据采集用户
 */
export function getDataUserInfo() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataCollectUser',
        method: 'post',
    })
}

/**
 * 点击上传按钮上传数据
 */
export function tapUploadData(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/uploadFile',
        method: 'post',
        params: data
    })
}