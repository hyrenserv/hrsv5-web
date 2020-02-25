import request from '@/utils/request'

/**
 * 返回部署Agent首页所需的数据信息(数据源列表)
 */
export function getCollectData() {
    return request({
        url: '/B/agentdepoly/getDataSourceInfo',
    })
}


/**
 * 当前数据源需要部署的Agent列表信息
 * @param data.agent_type Agent类型
 * @param data 请求后台的数据
 */
export function deployAgentList(data) {
    return request({
        url: '/B/agentdepoly/getAgentInfo',
        params: data
    })
}

/**
 * 编辑部署Agent信息
 */
export function getAgentDownInfo(data) {

    return request({
        url: '/B/agentdepoly/getAgentDownInfo',
        params: data
    })
}


/**
 * 
 * @param {JSON} data : agent部署信息
 */
export function saveAgentDownInfo(data) {
    return request({
        url: '/B/agentdepoly/saveAgentDownInfo',
        params: data
    })
}
