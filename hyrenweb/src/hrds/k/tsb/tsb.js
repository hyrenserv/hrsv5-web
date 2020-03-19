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