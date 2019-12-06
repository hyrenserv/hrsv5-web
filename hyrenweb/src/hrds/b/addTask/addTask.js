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
//保存数据库采集Agent数据库配置信息 
export function saveDbConf(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/saveDbConf',
        method: 'post',
        params:data
    })
}
// steps2
// 获取初始信息
export function steps_getInitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getInitInfo',
        method: 'post',
        params:data
    })
}
//获取所有表信息 
export function getAllTableInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getAllTableInfo',
        method: 'post',
        params:data
    })
}
//是否并行抽取弹框显示sql
export function getPageSQL(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getPageSQL',
        method: 'post',
        params:data
    })
}
// sql测试
export function testParallelExtraction(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/testParallelExtraction',
        method: 'post',
        params:data
    })
}
// 使用sql抽取数据tap
export function getAllSQLs(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getAllSQLs',
        method: 'post',
        params:data
    })
}
// 使用sql抽取数据保存
export function saveAllSQL(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getAllSQLs',
        method: 'post',
        params:data
    })
}
// 定义过滤
export function getSingleTableSQL(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getSingleTableSQL',
        method: 'post',
        params:data
    })
}
// 选择列
export function getColumnsigleInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getColumnInfo',
        method: 'post',
        params:data
    })
}
// 保存全部走下一步
export function saveCollTbInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/saveCollTbInfo',
        method: 'post',
        params:data
    })
}
// 得到是否过滤和并行抽取之前原有数据
export function getSQLInfoByColSetId(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getSQLInfoByColSetId',
        method: 'post',
        params:data
    })
}
// 得到表的选择列之前原有数据
export function getColumnInfoByColSetId(data) {
    return request({
        url: '/B/agent/dbagentconf/tableconf/getColumnInfoByColSetId',
        method: 'post',
        params:data
    })
}
//steps3
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
//根据数据库设置ID回显全表清洗优先级
export function getAllTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getAllTbCleanOrder',
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
//列清洗-清洗优先级显示数据 
export function getColCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColCleanOrder',
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
//列清洗  -整表优先级回显数据 
export function getSingleTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getSingleTbCleanOrder',
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
//根据列ID获取该列在列清洗参数表中定义码值系统编码(codesys)的和编码分类(codename)
export function getCVConversionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCVConversionInfo',
        method: 'post',
        params:data
    })
}
// 获取当前系统中的所有码值信息
export function getAgentInfoList() {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getSysCVInfo',
        method: 'post',
    })
}
//  根据码值系统编码获取编码分类
export function getCVClassifyBySysCode(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCVClassifyBySysCode',
        method: 'post',
        params:data
    })
}
// 根据码值系统编码和编码分类获得原码值和新码值
export function getCVInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCVInfo',
        method: 'post',
        params:data
    })
}
// 保存码值转换信息
export function saveCVConversionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveCVConversionInfo',
        method: 'post',
        params:data
    })
}
// 保存列清洗信息
export function saveColCleanConfig(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColCleanConfig',
        method: 'post',
        params:data
    })
}
//保存配置数据清洗页面信息
export function saveDataCleanConfig(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveDataCleanConfig',
        method: 'post',
        params:data
    })
}
//steps4 卸数文件
export function getInitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/fileconf/getInitInfo',
        method: 'post',
        params:data
    })
}
//根据数据抽取方式返回卸数文件格式
export function getFileFormatByExtractType(data) {
    return request({
        url: '/B/agent/dbagentconf/fileconf/getFileFormatByExtractType',
        method: 'post',
        params:data
    })
}
// 抽取数据保存
export function saveFileConf(data) {
    return request({
        url: '/B/agent/dbagentconf/fileconf/saveFileConf',
        method: 'post',
        params:data
    })
}

// 第五步  存储目的地

export function stodegetInitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getInitInfo',
        method: 'post',
        params:data
    })
}
// 存储目的地弹框
export function getStoDestByTableId(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getStoDestByTableId',
        method: 'post',
        params:data
    })
}
// 点击详情
export function getStoDestDetail(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getStoDestDetail',
        method: 'post',
        params:data
    })
}
// 点击配置属性按钮
export function getColumnStoInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getColumnStoInfo',
        method: 'post',
        params:data
    })
}
// getColumnHeader
export function getColumnHeader(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getColumnHeader',
        method: 'post',
        params:data
    })
}
// 获取特殊字段id接口
export function getDataStoreLayerAddedId(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getDataStoreLayerAddedId',
        method: 'post',
        params:data
    })
}
// 配置字段属性的提交
export function saveColStoInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/saveColStoInfo',
        method: 'post',
        params:data
    })
}
//配置字段属性弹框保存中文名称
export function updateColumnZhName(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/updateColumnZhName',
        method: 'post',
        params:data
    })
}
// 存储目的地下一步保存
export function saveTbStoInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/saveTbStoInfo',
        method: 'post',
        params:data
    })
}
// 
export function updateTableName(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/updateTableName',
        method: 'post',
        params:data
    })
}