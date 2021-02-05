import request from '@/utils/request'
import Qs from 'qs'
//获取表主键分析结果
export function getPageTablePkData(data) {
    return request({
        url: '/K/tdbresult/getPageTablePkData',
        method: 'post',
        params: data
    })
}
//获取表联合主键分析结果
export function getPageTableJoinPkData(data) {
    return request({
        url: '/K/tdbresult/getPageTableJoinPkData',
        method: 'post',
        params: data
    })
}
//获取表内函数依赖分析结果
export function getPageTableFuncDepData(data) {
    return request({
        url: '/K/tdbresult/getPageTableFuncDepData',
        method: 'post',
        params: data
    })
}
//获取外键分析结果
export function getPageTableFkData(data) {
    return request({
        url: '/K/tdbresult/getPageTableFkData',
        method: 'post',
        params: data
    })
}
//获取字段相等类别分析结果
export function getPageFieldSameResult(data) {
    return request({
        url: '/K/tdbresult/getPageFieldSameResult',
        method: 'post',
        params: data
    })
}
//获取字段特征分析结果
export function getColumnFeatureAnalysisResult(data) {
    return request({
        url: '/K/tdbresult/getColumnFeatureAnalysisResult',
        method: 'post',
        params: data
    })
}
//获取外键分析结果
export function searchFKAnalysisResults(data) {
    return request({
        url: '/K/tdbresult/searchFKAnalysisResults',
        method: 'post',
        params: data
    })
}
//自定义图计算查询语句查询
export function searchFromNeo4j(data) {
    return request({
        url: '/K/tdbresult/searchFromNeo4j',
        method: 'post',
        params: data
    })
}
//LPA社区发现算法
export function searchLabelPropagation(data) {
    return request({
        url: '/K/tdbresult/searchLabelPropagation',
        method: 'post',
        params: data
    })
}
//LOUVAIN社区发现算法
export function searchLouVain(data) {
    return request({
        url: '/K/tdbresult/searchLouVain',
        method: 'post',
        params: data
    })
}
//求全部最短路径
export function searchAllShortPath(data) {
    return request({
        url: '/K/tdbresult/searchAllShortPath',
        method: 'post',
        params: data
    })
}
//求最长路径
export function searchLongestPath(data) {
    return request({
        url: '/K/tdbresult/searchLongestPath',
        method: 'post',
        params: data
    })
}
//求远近邻关系
export function searchNeighbors(data) {
    return request({
        url: '/K/tdbresult/searchNeighbors',
        method: 'post',
        params: data
    })
}
//三角关系展示
export function searchTriangleRelation(data) {
    return request({
        url: '/K/tdbresult/searchTriangleRelation',
        method: 'post',
        params: data
    })
}