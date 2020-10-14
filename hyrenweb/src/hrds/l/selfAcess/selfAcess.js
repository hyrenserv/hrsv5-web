import request from '@/utils/request'
import Qs from 'qs'
// 1001
//获取自主分析模板配置信息
export function getTemplateConfInfo(data) {
    return request({
        url: '/L/autoanalysis/manage/getTemplateConfInfo',
        params: data
    })
}

//生成自主分析模板配置参数
export function generateTemplateParam(data) {
    return request({
        url: '/L/autoanalysis/manage/generateTemplateParam',
        params: data
    })
}
//获取自主取数树数据
export function getAutoAnalysisTreeData(data) {
    return request({
        url: '/L/autoanalysis/manage/getAutoAnalysisTreeData',
        params: data
    })
}
//校验sql是否合法
export function verifySqlIsLegal(data) {
    return request({
        url: '/L/autoanalysis/manage/verifySqlIsLegal',
        params: data
    })
}
//自主取数模板结果预览数据
export function getPreviewData(data) {
    return request({
        url: '/L/autoanalysis/manage/getPreviewData',
        params: data
    })
}
// 获取代码项
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}
// 获取代码项
export function getAllCodeItems(data) {
    return request({
        url: '/A/codes/getAllCodeItems',
        params: data
    })
}
//保存模板配置页面的信息
export function saveTemplateConfInfo(data) {
    return request({
        url: '/L/autoanalysis/manage/saveTemplateConfInfo',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
//删除自主取数模板
export function deleteAutoAnalysisTemplate(data) {
    return request({
        url: '/L/autoanalysis/manage/deleteAutoAnalysisTemplate',
        params: data
    })
}
//根据模板ID获取自主取数模板配置信息
export function getAutoTpInfoById(data) {
    return request({
        url: '/L/autoanalysis/manage/getAutoTpInfoById',
        params: data
    })
}
//根据模板ID获取自主取数模板条件信息
export function getAutoTpCondInfoById(data) {
    return request({
        url: '/L/autoanalysis/manage/getAutoTpCondInfoById',
        params: data
    })
}
//根据模板ID获取自主取数模板结果信息
export function getAutoTpResSetById(data) {
    return request({
        url: '/L/autoanalysis/manage/getAutoTpResSetById',
        params: data
    })
}
//更新模板配置页面的信息
export function updateTemplateConfInfo(data) {
    return request({
        url: '/L/autoanalysis/manage/updateTemplateConfInfo',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}
//发布自主取数模板
export function releaseAutoAnalysisTemplate(data) {
    return request({
        url: '/L/autoanalysis/manage/releaseAutoAnalysisTemplate',
        params: data
    })
}

//根据模板获得配置名称
export function getTemplateConfInfoByName(data) {
    return request({
        url: '/L/autoanalysis/manage/getTemplateConfInfoByName',
        params: data
    })
}
// 2001
//自主取数
//查询自主取数模板信息
export function getAccessTemplateInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessTemplateInfo',
        params: data
    })
}
//根据模板ID查询自主取数模板信息
export function getAccessTemplateInfoById(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessTemplateInfoById',
        params: data
    })
}
//获取自主取数结果字段
export function getAccessResultFields(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessResultFields',
        params: data
    })
}
//获取自主取数过滤条件
export function getAutoAccessFilterCond(data) {
    return request({
        url: '/L/autoanalysis/operate/getAutoAccessFilterCond',
        params: data
    })
}
//获取自主取数选择历史信息
export function getAccessSelectHistory(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessSelectHistory',
        params: data
    })
}

//保存自主取数清单查询入库信息(清单查询前调用)
export function saveAutoAccessInfoToQuery(data) {
    return request({
        url: '/L/autoanalysis/operate/saveAutoAccessInfoToQuery',
        params: data
    })
}

//通过选择历史情况 获取之前的条件以前配置项
export function getAccessCondFromHistory(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessCondFromHistory',
        params: data
    })
}
//通过选择历史情况 获取之前的条件以前配置项
export function getAccessResultFromHistory(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessResultFromHistory',
        params: data
    })
}
//模糊查询自主取数
export function getAccessTemplateInfoByName(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessTemplateInfoByName',
        params: data
    })
}
//获取自主取数清单查询结果
export function getAutoAccessQueryResult(data) {
    return request({
        url: '/L/autoanalysis/operate/getAutoAccessQueryResult',
        params: data
    })
}
//保存自主取数信息
export function saveAutoAccessInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/saveAutoAccessInfo',
        params: data
    })
}

//取数时清单查询 显示条数方法
export function getAccessResultByNumber(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessResultByNumber',
        params: data
    })
}
//2001 我的取数
//查询我的取数信息
export function getMyAccessInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/getMyAccessInfo',
        params: data
    })
}
//模糊查询我的取数
export function getMyAccessInfoByName(data) {
    return request({
        url: '/L/autoanalysis/operate/getMyAccessInfoByName',
        params: data
    })
}
//查看取数sql
export function getAccessSql(data) {
    return request({
        url: '/L/autoanalysis/operate/getAccessSql',
        params: data
    })
}
//查看我的取数信息
export function getMyAccessInfoById(data) {
    return request({
        url: '/L/autoanalysis/operate/getMyAccessInfoById',
        params: data
    })
}
//我的取数下载模板
export function downloadMyAccessTemplate(data) {
    return request({
        url: '/L/autoanalysis/operate/downloadMyAccessTemplate',
        params: data
    })
}
// 2001可视化组件
//根据表名获取字段信息
export function getColumnByName(data) {
    return request({
        url: '/L/autoanalysis/operate/getColumnByName',
        params: data
    })
}
//可视化创建组件根据条件获取sql
export function getSqlByCondition(data) {
    return request({
        url: '/L/autoanalysis/operate/getSqlByCondition',
        params: data
    })
}

//获取可视化组件结果（获取答案）
export function getVisualComponentResult(data) {
    return request({
        url: '/L/autoanalysis/operate/getVisualComponentResult',
        params: data
    })
}

//获取图表显示
export function getChartShow(data) {
    return request({
        url: '/L/autoanalysis/operate/getChartShow',
        params: data
    })
}
//可视化首页列表展示
export function getVisualComponentInfo() {
    return request({
        url: '/L/autoanalysis/operate/getVisualComponentInfo',
    })
}
//可视化组件删除
export function deleteVisualComponent(data) {
    return request({
        url: '/L/autoanalysis/operate/deleteVisualComponent',
        params: data
    })
}
//保存可视化组件
export function addVisualComponentInfo(data) {
    return request({
        url: '/L/autoanalysis/operate/addVisualComponentInfo',
        params: data
    })
}


