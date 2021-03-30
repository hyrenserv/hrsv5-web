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
//获取表主键分析表名列表
export function getPKAnalysisTableCodeList(data) {
    return request({
        url: '/K/tdbresult/getPKAnalysisTableCodeList',
        method: 'post',
        params: data
    })
}
//根据表名获取表主键分析结果
export function searchPKAnalysisResult(data) {
    return request({
        url: '/K/tdbresult/searchPKAnalysisResult',
        method: 'post',
        params: data
    })
}
//获取表联合主键和表函数分析表名list
export function getJoinPKAnalysisAndTableFuncDepTableCodeList(data) {
    return request({
        url: '/K/tdbresult/getJoinPKAnalysisAndTableFuncDepTableCodeList',
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
//获取字段相等类别分析统计结果
export function getFieldSameStatisticalResult(data) {
    return request({
        url: '/K/tdbresult/getFieldSameStatisticalResult',
        method: 'post',
        params: data
    })
}
//获取字段相等类别分析统计结果
export function getFieldSameResultByCategorysame(data) {
    return request({
        url: '/K/tdbresult/getFieldSameResultByCategorysame',
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
//根据表名获取字段特征分析结果
export function searchColumnFeatureAnalysisResult(data) {
    return request({
        url: '/K/tdbresult/searchColumnFeatureAnalysisResult',
        method: 'post',
        params: data
    })
}
//根据表名获取字段特征分析结果
export function getColumnFeatureAnalysisTableCodeList(data) {
    return request({
        url: '/K/tdbresult/getColumnFeatureAnalysisTableCodeList',
        method: 'post',
        params: data
    })
}
//获取外键分析结果
export function getFKAnalysisResults(data) {
    return request({
        url: '/K/tdbresult/getFKAnalysisResults',
        method: 'post',
        params: data
    })
}
//获取联合主键分析结果
export function getJoinPKAnalysisResult(data) {
    return request({
        url: '/K/tdbresult/getJoinPKAnalysisResult',
        method: 'post',
        params: data
    })
}
//获取表函数分析结果
export function getTableFuncDepResult(data) {
    return request({
        url: '/K/tdbresult/getTableFuncDepResult',
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
//查询所有字段信息
export function searchAllColumnOfNodes() {
    return request({
        url: '/K/tdbresult/searchAllColumnOfNodes',
        method: 'post',
    })
}
//查询所有字段关系信息
export function searchColumnOfRelation(data) {
    return request({
        url: '/K/tdbresult/searchColumnOfRelation',
        method: 'post',
        params:data
    })
}