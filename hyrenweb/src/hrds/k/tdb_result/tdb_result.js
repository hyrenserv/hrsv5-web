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