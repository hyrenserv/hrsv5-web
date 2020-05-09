import request from '@/utils/request'

//获取代码项
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}

// 获取文件分类总计
export function getFileClassifySum() {
    return request({
        url: '/B/dataquery/getFileClassifySum',
    })
}

// 获取最近七天采集
export function getSevenDayCollectFileSum() {
    return request({
        url: '/B/dataquery/getSevenDayCollectFileSum',
    })
}

// 获取最近三次采集
export function getLast3FileCollections() {
    return request({
        url: '/B/dataquery/getLast3FileCollections',
    })
}

// 获取部门的包含文件采集任务的数据源信息
export function getFileDataSource() {
    return request({
        url: '/B/dataquery/getFileDataSource',
    })
}

// 获取数据源下所有文件采集任务
export function getFileCollectionTask(data) {
    return request({
        url: '/B/dataquery/getFileCollectionTask',
        params: data
    })
}

// 自定义查询条件获取采集文件的信息
export function getConditionalQuery(data) {
    return request({
        url: '/B/dataquery/getConditionalQuery',
        params: data
    })
}

// 下载文件
export function downloadFile(data) {
    return request({
        url: '/B/dataquery/downloadFile',
        params: data
    })
}

// 申请处理
export function applicationProcessing(data) {
    return request({
        url: '/B/dataquery/applicationProcessing',
        params: data
    })
}

//查看文件
export function viewFile(data) {
    return request({
        url: '/B/dataquery/viewFile',
        params: data
    })
}

//获取申请数据
export function getApplyData(data) {
    return request({
        url: '/B/dataquery/getApplyData',
        params: data
    })
}

//取消文件申请
export function cancelApply(data) {
    return request({
        url: '/B/dataquery/cancelApply',
        params: data
    })
}

//我的申请记录
export function myApplyRecord(data) {
    return request({
        url: '/B/dataquery/myApplyRecord',
        params: data
    })
}

//获取WEB SQL控制台树菜单数据 (不推荐使用)
export function getTreeDataInfo(data) {
    return request({
        url: '/B/websqlquery/getTreeDataInfo',
        params: data
    })
}

//获取WEB SQL控制台树菜单数据
export function getWebSQLTreeData(data) {
    return request({
        url: '/B/websqlquery/getWebSQLTreeData',
        params: data
    })
}

//检索树菜单数据
export function getTreeNodeSearchInfo(data) {
    return request({
        url: '/B/websqlquery/getTreeNodeSearchInfo',
        params: data
    })
}

//根据表名获取采集数据，默认显示10条
export function queryDataBasedOnTableName(data) {
    return request({
        url: '/B/websqlquery/queryDataBasedOnTableName',
        params: data
    })
}

//根据SQL获取采集数据，默认显示10条
export function queryDataBasedOnSql(data) {
    return request({
        url: '/B/websqlquery/queryDataBasedOnSql',
        params: data
    })
}

//全文检索
export function fullTextSearch(data) {
    return request({
        url: '/B/fulltextsearch/fullTextSearch',
        params: data
    })

}
