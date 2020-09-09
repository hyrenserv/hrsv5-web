import request from '@/utils/request'

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
//保存模板配置页面的信息
export function saveTemplateConfInfo(data) {
    return request({
        url: '/L/autoanalysis/manage/saveTemplateConfInfo',
        params: data
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
        params: data
    })
}
