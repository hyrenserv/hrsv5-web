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