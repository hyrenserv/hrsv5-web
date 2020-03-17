import request from '@/utils/request'

//获取表结构对标树信息
export function getTSBTreeData() {
    return request({
        url: '/K/tsbenchmarking/getTSBTreeData',
    })
}

//获取表字段列表信息
export function getColumnByTableNames(data) {
    return request({
        url: '/K/tsbenchmarking/getColumnByTableNames',
        params: data,
    })
}