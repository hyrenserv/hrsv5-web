import request from '@/utils/request'
//根据数据库采集任务ID进行查询并在页面上回显数据源配置信息
export function getDBConfInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/getDBConfInfo',
        method: 'post',
        params:data
    })
}
//根据数据源ID获取分类信息
export function getClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/getClassifyInfo',
        method: 'post',
        params:data
    })
}
//保存采集任务分类信息
export function saveClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/saveClassifyInfo',
        method: 'post',
        params:data
    })
}
//编辑更新后点击保存任务分类信息
export function updateClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/updateClassifyInfo',
        method: 'post',
        params:data
    })
}
//删除采集任务分类信息
export function deleteClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/deleteClassifyInfo',
        method: 'post',
        params:data
    })
}
// 获取所有数据库的编码和名称 //获取字符补齐
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        method: 'post',
        params:data
    })
}
//根据数据类型获取数据驱动
export function getJDBCDriver(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/getJDBCDriver',
        method: 'post',
        params:data
    })
}
// 根据数据类型获取jdbcurl
export function getDBConnectionProp(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/getDBConnectionProp',
        method: 'post',
        params:data
    })
}
// 测试连接
export function testConnection(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/testConnection',
        method: 'post',
        params:data
    })
}

// 第三步骤
// 清洗规则配置页面初始信息
export function getCleanConfInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCleanConfInfo',
        method: 'post',
        params:data
    })
}
//所有表清洗设置
export function getAllTbCleanConfInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getAllTbCleanConfInfo',
        method: 'post',
        params:data
    })
}
// 根据表id获取字符补齐信息
export function getTbCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getTbCompletionInfo',
        method: 'post',
        params:data
    })
}