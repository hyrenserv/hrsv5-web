import request from '@/utils/request'

//获取元数据管理-元数据树信息
export function getMDMTreeData() {
    return request({
        url: '/K/dm/metadatamanage/getMDMTreeData',
    })
}

//获取表结构对标树信息
export function getDRBTreeData() {
    return request({
        url: '/K/dm/metadatamanage/getDRBTreeData',
    })
}

//获取源数据列表的表结构信息
export function getMDMTableColumnInfo(data) {
    return request({
        url: '/K/dm/metadatamanage/getMDMTableColumnInfo',
        params: data,
    })
}

//获取数据回收站的表结构信息
export function getDRBTableColumnInfo(data) {
    return request({
        url: '/K/dm/metadatamanage/getDRBTableColumnInfo',
        params: data,
    })
}

//保存元数据
export function saveMetaData(data) {
    return request({
        url: '/K/dm/metadatamanage/saveMetaData',
        params: data,
    })
}

//删除表(表设置为无效)
export function tableSetToInvalid(data) {
    return request({
        url: '/K/dm/metadatamanage/tableSetToInvalid',
        params: data,
    })
}

//恢复回收站表
export function restoreDRBTable(data) {
    return request({
        url: '/K/dm/metadatamanage/restoreDRBTable',
        params: data,
    })
}
//彻底删除表
export function removeCompletelyTable(data) {
    return request({
        url: '/K/dm/metadatamanage/removeCompletelyTable',
        params: data,
    })
}
