import request from '@/utils/request'
import Qs from 'qs'
/**(0)
 * 获取非结构化采集配置页面初始化的值（代码项）
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}
// step1
/**(0)
 * 获取DB采集配置页面初始化的值
 */
export function addDataFileData(data) {
    return request({
        url: '/B/agent/datafileconf/fileconf/addDataFileData',
        params: data
    })
}
/**(1)
 * 根据数据源ID获取分类信息
 */
export function getClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/getClassifyInfo',
        params:data
    })
}
/**(2)
 * 保存采集任务分类信息
 */
export function saveClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/saveClassifyInfo',
        params:data
    })
}
/**(3)
 * 编辑更新后点击保存任务分类信息
 */
export function updateClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/updateClassifyInfo',
        params:data
    })
}
/**(4)
 * 删除采集任务分类信息
 */
export function deleteClassifyInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/dbconf/deleteClassifyInfo',
        params:data
    })
}
/**(6)
 * 保存数据文件的配置信息
 */
export function saveDataFile(data) {
    return request({
        url: '/B/agent/datafileconf/fileconf/saveDataFile',
        params: data
    })
}
/**(7)
 * 更新数据文件的配置信息
 */
export function updateDataFile(data) {
    return request({
        url: '/B/agent/datafileconf/fileconf/updateDataFile',
        params: data
    })
}
/**(8)
 * 编辑数据文件采集
 */
export function getInitDataFileData(data) {
    return request({
        url: '/B/agent/datafileconf/fileconf/getInitDataFileData',
        params: data
    })
}
// step2
/**(0)
 * 获取表格信息
 */
export function getTableData(data) {
    return request({
        url: '/B/agent/datafileconf/tableconf/getTableData',
        params: data
    })
}
/**(1)
 * 根据表ID获取列信息
 */
export function getTableColumnByTableId(data) {
    return request({
        url: '/B/agent/datafileconf/tableconf/getTableColumnByTableId',
        params: data
    })
}
/**(2)
 * 根据表名称获取列信息
 */
export function getTableColumnByTableName(data) {
    return request({
        url: '/B/agent/datafileconf/tableconf/getTableColumnByTableName',
        params: data
    })
}
/**(3)
 * 保存数据文件的表和列信息
 */
export function saveTableData(data) {
    return request({
        url: '/B/agent/datafileconf/tableconf/saveTableData',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
/**(4)
 * 根据表的ID更新列的信息
 */
export function updateColumnByTableId(data) {
    return request({
        url: '/B/agent/datafileconf/tableconf/updateColumnByTableId',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
// steps3
// 获取初始数据
export function getInitDataTransfer(data) {
    return request({
        url: '/B/agent/datafileconf/datatransfer/getInitDataTransfer',
        params: data
    })
}
// 保存数据
export function saveDataTransferData(data) {
    return request({
        url: '/B/agent/datafileconf/datatransfer/saveDataTransferData',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
//steps4
// 清洗规则配置页面初始信息
export function getCleanConfInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCleanConfInfo',
        params:data
    })
}
//所有表清洗设置-字符替换规则
export function getAllTbCleanReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getAllTbCleanReplaceInfo',
        params:data
    })
}
//所有表清洗设置-字符补齐规则
export function getAllTbCleanCompInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getAllTbCleanCompInfo',
        params:data
    })
}
//保存所有表清洗设置 
export function saveAllTbCleanConfigInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveAllTbCleanConfigInfo',
        params:data
    })
}
// 根据表id获取字符补齐信息
export function getTbCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getTbCompletionInfo',
        params:data
    })
}
// 表字符补齐提交确定接口
export function saveSingleTbCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveSingleTbCompletionInfo',
        params:data
    })
}
// 表-字符替换弹框
export function getSingleTbReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getSingleTbReplaceInfo',
        params:data
    })
}
//表字符替换提交确定接口
export function saveSingleTbReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveSingleTbReplaceInfo',
        params:data
    })
}
//根据数据库设置ID回显全表清洗优先级
export function getAllTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getAllTbCleanOrder',
        params:data
    })
}
// 全表清洗优先级提交保存
export function saveAllTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveAllTbCleanOrder',
        params:data
    })
}
//根据表ID获取该表所有的列清洗信息 
export function getColumnInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColumnInfo',
        params:data
    })
}
// 列清洗--根据列ID获得列字符补齐信息
export function getColCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColCompletionInfo',
        params:data
    })
}
//列清洗-字符补齐保存 
export function saveColCompletionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColCompletionInfo',
        params:data
    })
}
// 列清洗--根据列ID获得列字符替换信息
export function getColReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColReplaceInfo',
        params:data
    })
}
//列清洗-字符替换保存 
export function saveColReplaceInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColReplaceInfo',
        params:data
    })
}
//列清洗-日期格式化 
export function getDateFormatInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getDateFormatInfo',
        params:data
    })
}
// 列清洗-日期格式化保存 
export function saveDateFormatInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveDateFormatInfo',
        params:data
    })
}
// 列清洗-列拆分
export function getColSplitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColSplitInfo',
        params:data
    })
}
//列清洗-列拆分保存 
export function saveColSplitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColSplitInfo',
        params:data
    })
}
//列清洗-列拆分删除  agent/dbagentconf/cleanconf/deleteColSplitInfo
export function deleteColSplitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/deleteColSplitInfo',
        params:data
    })
}
//列清洗-清洗优先级显示数据 
export function getColCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColCleanOrder',
        params:data
    })
}
//列清洗-清洗优先级保存 
export function saveColCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColCleanOrder',
        params:data
    })
}
//列清洗  -整表优先级回显数据 
export function getSingleTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getSingleTbCleanOrder',
        params:data
    })
}
//列清洗-整表优先级保存
export function saveSingleTbCleanOrder(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveSingleTbCleanOrder',
        params:data
    })
}
//列清洗-列合并 agent/dbagentconf/cleanconf/getColMergeInfo
export function getColMergeInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getColMergeInfo',
        params:data
    })
}
//列清洗-列合并保存
export function saveColMergeInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColMergeInfo',
        params:data
    })
}
// 列清洗-列合并删除
export function deleteColMergeInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/deleteColMergeInfo',
        params:data
    })
}
//根据列ID获取该列在列清洗参数表中定义码值系统编码(codesys)的和编码分类(codename)
export function getCVConversionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCVConversionInfo',
        params:data
    })
}
// 获取当前系统中的所有码值信息
export function getAgentInfoList() {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getSysCVInfo',
    })
}
//  根据码值系统编码获取编码分类
export function getCVClassifyBySysCode(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCVClassifyBySysCode',
        params:data
    })
}
// 根据码值系统编码和编码分类获得原码值和新码值
export function getCVInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/getCVInfo',
        params:data
    })
}
// 保存码值转换信息
export function saveCVConversionInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveCVConversionInfo',
        params:data
    })
}
// 保存列清洗信息
export function saveColCleanConfig(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveColCleanConfig',
        params:data
    })
}
//保存配置数据清洗页面信息
export function saveDataCleanConfig(data) {
    return request({
        url: '/B/agent/dbagentconf/cleanconf/saveDataCleanConfig',
        // params:data
         data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

// 第五步  存储目的地

export function stodegetInitInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getInitInfo',
        params:data
    })
}
// 存储目的地弹框
export function getStoDestByTableId(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getStoDestByTableId',
        params:data
    })
}
// 全表存储目的地弹框
export function getStorageData() {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getStorageData',
    })
}
// 点击详情
export function getStoDestDetail(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getStoDestDetail',
        params:data
    })
}
// 点击配置属性按钮
export function getColumnStoInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getColumnStoInfo',
        params:data
    })
}
// getColumnHeader
export function getColumnHeader(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getColumnHeader',
        params:data
    })
}
// 获取特殊字段id接口
export function getDataStoreLayerAddedId(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getDataStoreLayerAddedId',
        params:data
    })
}
// 配置字段属性的提交
export function saveColStoInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/saveColStoInfo',
        params:data
    })
}
//配置字段属性弹框保存中文名称
export function updateColumnZhName(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/updateColumnZhName',
        params:data
    })
}
// 存储目的地下一步保存
export function saveTbStoInfo(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/saveTbStoInfo',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
// 保存表名
export function updateTableName(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/updateTableName',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
//编辑状态下获取目的地起初数据
export function getTbStoDestByColSetId(data) {
    return request({
        url: '/B/agent/dbagentconf/stodestconf/getTbStoDestByColSetId',
        params:data
    })
}

//发送此次任务
export function sendDBCollectTaskById(data) {
    return request({
        url: '/B/agent/sendDBCollectTaskById',
        params:data
    })
}

// 获取数据字典文件
export function selectPath(data) {
   return request({
       url: '/B/agent/datafileconf/fileconf/selectPath',
       params: data
   })
}

//查询作业名称信息
export function searchEtlJob(data) {
    return request({
        url: '/C/jobconfig/searchEtlJob',
        params: data
    })
}

//获取工程信息
export function getEtlSysData() {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/getEtlSysData',
    })
}
//根据工程编号获取任务
export function getEtlSubSysData(data) {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/getEtlSubSysData',
        params: data
    })
 }
// 获取目录路径
export function getAgentPath(data) {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/getAgentPath',
        params: data
    })
 }
//获取任务下的作业信息

export function getPreviewJob(data) {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/getPreviewJob',
        params: data
    })
 }
//编辑状态下获取作业信息
export function getEtlJobData(data) {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/getEtlJobData',
        params: data
    })
 }
//  保存完成
export function saveJobDataToDatabase(data) {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/saveJobDataToDatabase',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
 }