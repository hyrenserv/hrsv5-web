import request from '@/utils/request'
import Qs from 'qs'
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
// 删除所有表（表设置为无效）
export function allTableSetToInvalid() {
    return request({
        url: '/K/dm/metadatamanage/allTableSetToInvalid',
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
// 恢复所有表
export function restoreDRBAllTable() {
    return request({
        url: '/K/dm/metadatamanage/restoreDRBAllTable',
    })
}
// 彻底删除所有表
export function removeCompletelyAllTable() {
    return request({
        url: '/K/dm/metadatamanage/removeCompletelyAllTable',
    })
}
// 根据存储层id获取信息
export function getStorageLayerConfInfo(data) {
    return request({
        url: '/K/dm/metadatamanage/getStorageLayerConfInfo',
        params: data,
    })
}
// 创建表保存
export function createTable(data) {
    return request({
        url: '/K/dm/metadatamanage/createTable',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}