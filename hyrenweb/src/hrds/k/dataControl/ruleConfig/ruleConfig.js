import request from '@/utils/request'

//添加规则
export function addDqDefinition(data) {
    return request({
        url: '/K/dm/ruleconfig/addDqDefinition',
        params: data,
    })
}

//删除规则
export function deleteDqDefinition(data) {
    return request({
        url: '/K/dm/ruleconfig/deleteDqDefinition',
        params: data,
    })
}

//批量删除规则
export function releaseDeleteDqDefinition(data) {
    return request({
        url: '/K/dm/ruleconfig/releaseDeleteDqDefinition',
        params: data,
    })
}

//修改删除规则
export function updateDqDefinition(data) {
    return request({
        url: '/K/dm/ruleconfig/updateDqDefinition',
        params: data,
    })
}

//获取规则信息列表
export function getDqDefinitionInfos(data) {
    return request({
        url: '/K/dm/ruleconfig/getDqDefinitionInfos',
        params: data,
    })
}

//获取规则信息
export function getDqDefinition(data) {
    return request({
        url: '/K/dm/ruleconfig/getDqDefinition',
        params: data,
    })
}

//获取规则类型信息
export function getDqRuleDef() {
    return request({
        url: '/K/dm/ruleconfig/getDqRuleDef',
    })
}

//获取系统帮助提示信息
export function getDqHelpInfo() {
    return request({
        url: '/K/dm/ruleconfig/getDqHelpInfo',
    })
}

//保存作业信息
export function saveETLJob(data) {
    return request({
        url: '/K/dm/ruleconfig/saveETLJob',
        params: data,
    })
}

//搜索规则信息
export function searchDqDefinitionInfos(data) {
    return request({
        url: '/K/dm/ruleconfig/searchDqDefinitionInfos',
        params: data,
    })
}

//手动执行规则检测
export function manualExecution(data) {
    return request({
        url: '/K/dm/ruleconfig/manualExecution',
        params: data,
    })
}

//获取工程信息
export function getProInfos(data) {
    return request({
        url: '/K/dm/ruleconfig/getProInfos',
        params: data,
    })
}

//获取任务信息
export function getTaskInfo(data) {
    return request({
        url: '/K/dm/ruleconfig/getTaskInfo',
        params: data,
    })
}

//查看规则调度状态
export function viewRuleSchedulingStatus(data) {
    return request({
        url: '/K/dm/ruleconfig/viewRuleSchedulingStatus',
        params: data,
    })
}

//获取数据管控-规则配置数据源树信息
export function getRuleConfigTreeData() {
    return request({
        url: '/K/dm/ruleconfig/getRuleConfigTreeData',
    })
}

//获取字段信息
export function getColumnsByTableName(data) {
    return request({
        url: '/K/dm/ruleconfig/getColumnsByTableName',
        params: data,
    })
}

//指定SQL（校验SQL）检查，检查所有的系统变量是否合法以及sql是否能运行
export function specifySqlCheck(data) {
    return request({
        url: '/K/dm/ruleconfig/specifySqlCheck',
        params: data,
    })
}

//异常数据sql检查，检查所有的系统变量是否合法以及sql是否能运行
export function errDataSqlCheck(data) {
    return request({
        url: '/K/dm/ruleconfig/errDataSqlCheck',
        params: data,
    })
}
