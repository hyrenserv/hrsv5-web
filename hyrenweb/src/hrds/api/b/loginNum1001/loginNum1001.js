import request from '@/utils/request'


/**
 * 获取首页的数据
 */
export function getIndexDataAll() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataSourceInfo',
        method: 'post'
    })
}



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
 * 编辑更新数据源信息
 */
export function upDateDataResource(data) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/updateDataSource',
        method: 'post',
        params: data
    })
}

/**
 * 点击添加按钮获取部门信息
 */
export function getDepartmentInfo(sourceId) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataSource?sourceId=123',
        method: 'post',
        params:sourceId
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

/**
 * 数据权限管理，更新数据源关系部门信息
 */
export function upDatechargeDate(data,sourceId) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/updateAuditSourceRelationDep?sourceId',
        method: 'post',
        params: data,sourceId
    })
}