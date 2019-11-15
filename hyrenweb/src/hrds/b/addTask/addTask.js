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
//所有表清洗设置-字符替换规则
export function getAllTbCleanReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getAllTbCleanReplaceInfo',
        method: 'post',
        params:data
    })
}
//所有表清洗设置-字符补齐规则
export function getAllTbCleanCompInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getAllTbCleanCompInfo',
        method: 'post',
        params:data
    })
}
//保存所有表清洗设置 
export function saveAllTbCleanConfigInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveAllTbCleanConfigInfo',
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
// 表字符补齐提交确定接口
export function saveSingleTbCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveSingleTbCompletionInfo',
        method: 'post',
        params:data
    })
}
// 表-字符替换弹框
export function getSingleTbReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getSingleTbReplaceInfo',
        method: 'post',
        params:data
    })
}
//表字符替换提交确定接口
export function saveSingleTbReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveSingleTbReplaceInfo',
        method: 'post',
        params:data
    })
}
// 全表清洗优先级提交保存
export function saveAllTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveAllTbCleanOrder',
        method: 'post',
        params:data
    })
}
//根据表ID获取该表所有的列清洗信息 
export function getColumnInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColumnInfo',
        method: 'post',
        params:data
    })
}
// 列清洗--根据列ID获得列字符补齐信息
export function getColCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColCompletionInfo',
        method: 'post',
        params:data
    })
}
//列清洗-字符补齐保存 
export function saveColCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColCompletionInfo',
        method: 'post',
        params:data
    })
}
// 列清洗--根据列ID获得列字符替换信息
export function getColReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColReplaceInfo',
        method: 'post',
        params:data
    })
}
//列清洗-字符替换保存 
export function saveColReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColReplaceInfo',
        method: 'post',
        params:data
    })
}
//列清洗-日期格式化 
export function getDateFormatInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getDateFormatInfo',
        method: 'post',
        params:data
    })
}
// 列清洗-日期格式化保存 
export function saveDateFormatInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveDateFormatInfo',
        method: 'post',
        params:data
    })
}
// 列清洗-列拆分
export function getColSplitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColSplitInfo',
        method: 'post',
        params:data
    })
}
//列清洗-列拆分保存 
export function saveColSplitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColSplitInfo',
        method: 'post',
        params:data
    })
}
//列清洗-列拆分删除  agent/dbagentconf/cleanconf/deleteColSplitInfo
export function deleteColSplitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/deleteColSplitInfo',
        method: 'post',
        params:data
    })
}
//列清洗-清洗优先级保存 
export function saveColCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColCleanOrder',
        method: 'post',
        params:data
    })
}
//列清洗-整表优先级保存
export function saveSingleTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveSingleTbCleanOrder',
        method: 'post',
        params:data
    })
}
//列清洗-列合并 agent/dbagentconf/cleanconf/getColMergeInfo
export function getColMergeInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColMergeInfo',
        method: 'post',
        params:data
    })
}
//列清洗-列合并保存
export function saveColMergeInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColMergeInfo',
        method: 'post',
        params:data
    })
}
// 列清洗-列合并删除
export function deleteColMergeInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/deleteColMergeInfo',
        method: 'post',
        params:data
    })
}