import request from '@/utils/request'


/**
 * 点击查看按钮获取数据采集用户
 */
export function getDataUserInfo() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/datasource/searchDataCollectUser',
        method: 'post',
    })
}

/**
 * 点击新增数据库按钮增加信息
 */
export function addDataAgent(data,user_id,source_id) {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/agentinfo/saveAgent',
        method: 'post',
        params:data,user_id,source_id
    })
}

/**
 * 点击删除按钮删除信息
 */
export function deleteDataAgent() {
    return request({
        url: '/hrds_B/B/action/hrds/b/biz/agentinfo/deleteAgent',
        method: 'post',
    })
}