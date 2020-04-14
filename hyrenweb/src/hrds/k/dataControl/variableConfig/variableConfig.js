import request from '@/utils/request'

//添加变量
export function addVariableConfigDat(data) {
    return request({
        url: '/K/dm/variableconfig/addVariableConfigDat',
        params: data,
    })
}

//删除变量
export function deleteVariableConfigData(data) {
    return request({
        url: '/K/dm/variableconfig/deleteVariableConfigData',
        params: data,
    })
}

//删除变量
export function updateVariableConfigData(data) {
    return request({
        url: '/K/dm/variableconfig/updateVariableConfigData',
        params: data,
    })
}

//获取变量列表信息
export function getVariableConfigDataInfos() {
    return request({
        url: '/K/dm/variableconfig/getVariableConfigDataInfos',
    })
}

//id获取变量列表信息
export function getVariableConfigDataInfo(data) {
    return request({
        url: '/K/dm/variableconfig/getVariableConfigDataInfo',
        params: data,
    })
}

//id获取变量列表信息
export function searchVariableConfigData(data) {
    return request({
        url: '/K/dm/variableconfig/searchVariableConfigData',
        params: data,
    })
}
