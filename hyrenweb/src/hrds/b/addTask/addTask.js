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
