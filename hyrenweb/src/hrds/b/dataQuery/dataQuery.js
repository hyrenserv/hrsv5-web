import request from '@/utils/request'

//获取代码项
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        method: 'post',
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
        method: 'post',
        params: data
    })
}

// 自定义查询条件获取采集文件的信息
export function getConditionalQuery(data) {
    return request({
        url: '/B/dataquery/getConditionalQuery',
        method: 'post',
        params: data
    })
}

// 下载文件
export function downloadFile(data) {
    return request({
        url: '/B/dataquery/downloadFile',
        method: 'post',
        params: data
    })
}

// 申请处理
export function applicationProcessing(data) {
    return request({
        url: '/B/dataquery/applicationProcessing',
        method: 'post',
        params: data
    })
}

//查看文件
export function viewFile(data) {
    return request({
        url: '/B/dataquery/viewFile',
        method: 'post',
        params: data
    })
}


//获取申请数据
export function getApplyData(data) {
    return request({
        url: '/B/dataquery/getApplyData',
        method: 'post',
        params: data
    })
}

//取消文件申请
export function cancelApply(data) {
    return request({
        url: '/B/dataquery/cancelApply',
        method: 'post',
        params: data
    })
}

//我的申请记录
export function myApplyRecord(data) {
    return request({
        url: '/B/dataquery/myApplyRecord',
        method: 'post',
        params: data
    })
}

//获取WEB SQL控制台树菜单数据
export function getTreeDataInfo(data) {
    return request({
        url: '/B/websqlquery/getTreeDataInfo',
        method: 'post',
        params: data
    })
}
