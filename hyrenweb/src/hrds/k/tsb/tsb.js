import request from '@/utils/request'

//获取表结构对标树信息
export function getTSBTreeData(data) {
    return request({
        url: '/K/tsbenchmarking/getTSBTreeData',
        params: data,
    })
}

//获取表字段列表信息
export function getColumnByFileId(data) {
    return request({
        url: '/K/tsbenchmarking/getColumnByFileId',
        params: data,
    })
}
//点击对标
export function predictBenchmarking(data) {
    return request({
        url: '/K/tsbenchmarking/predictBenchmarking',
        params: data,
    })
}
//对标结果显示数据
export function getPredictResult() {
    return request({
        url: '/K/tsbenchmarking/getPredictResult',
    })
}
//人工对标方法
export function getDbmNormbasicInfo(data) {
    return request({
        url: '/K/dbmnormbasic/getDbmNormbasicInfo',
        params: data,
    })
}
// 获取代码类下拉框
export function getDbmCodeTypeIdAndNameInfo() {
    return request({
        url: '/K/dbmcodetypeinfo/getDbmCodeTypeIdAndNameInfo',
    })
}
//获取分类树信息
export function getDbmSortInfoTreeData() {
    return request({
        url: '/K/dbmtree/getDbmSortInfoTreeData',
    })
}