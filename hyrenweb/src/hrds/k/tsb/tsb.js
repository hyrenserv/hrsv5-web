import request from '@/utils/request'

//获取表结构对标树信息
export function getTSBTreeData() {
    return request({
        url: '/K/tsb/getTSBTreeData',
    })
}

//获取表字段列表信息
export function getColumnByFileId(data) {
    return request({
        url: '/K/tsb/getColumnByFileId',
        params: data,
    })
}

//点击对标
export function predictBenchmarking(data) {
    return request({
        url: '/K/tsb/predictBenchmarking',
        params: data,
    })
}

//对标结果显示数据
export function getPredictResult() {
    return request({
        url: '/K/tsb/getPredictResult',
    })
}

//保存对标结果信息
export function saveTSBConfData(data) {
    return request({
        url: '/K/tsb/saveTSBConfData',
        params: data,
    })
}
