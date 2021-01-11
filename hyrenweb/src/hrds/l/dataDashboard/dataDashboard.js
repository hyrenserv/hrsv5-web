import request from '@/utils/request'

// 获取代码项
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}
//获取数据仪表盘首页数据展示
export function getDataDashboardInfo() {
    return request({
        url: '/L/autoanalysis/operate/getDataDashboardInfo'
    })
}
//根据仪表盘ID与仪表盘名称获取仪表盘信息
export function getDataDashboardInfoById(data) {
    return request({
        url: '/L/autoanalysis/operate/getDataDashboardInfoById',
        params:data
    })
}
//数据仪表盘发布
export function releaseDashboardInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/releaseDashboardInfo',
        params:data
    })
}
//数据仪表盘删除
export function deleteDashboardInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/deleteDashboardInfo',
        params:data
    })
}
//获取可视化组件信息
export function getVisualComponentInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/getVisualComponentInfo',
        params:data
    })
}
//将可视化组件信息展示在仪表盘上
export function showComponentOnDashboard(data) {
    return request({
        url: '/L/autoanalysis/operate/showComponentOnDashboard',
        data:data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
//保存仪表盘
export function saveDataDashboardInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/saveDataDashboardInfo',
        data:data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
//更新仪表盘
export function updateDataDashboardInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/updateDataDashboardInfo',
        data:data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export function getComponentByDashboardId(data) {
    return request({
        url: '/L/autoanalysis/operate/getComponentByDashboardId',
        params:data
    })
}

//可视化组件回显
export function getVisualComponentInfoById(data) {
    return request({
        url: '/L/autoanalysis/operate/getVisualComponentInfoById',
        params: data
    })
}

//获取图表显示
export function getChartShow(data) {
    return request({
        url: '/L/autoanalysis/operate/getChartShow',
        params: data
    })
}


//保存大屏展示图
export function saveLargeScreen(data) {
    return request({
        url: '/L/autoanalysis/operate/saveLargeScreen',
        params: data
    })
}


//更新大屏展示图
export function updateLargeScreen(data) {
    return request({
        url: '/L/autoanalysis/operate/updateLargeScreen',
        params: data
    })
}

//查看大屏组件
export function getLargeScreenComponentInfoByDashboardId(data) {
    return request({
        url: '/L/autoanalysis/operate/getLargeScreenComponentInfoByDashboardId',
        params: data
    })
}

