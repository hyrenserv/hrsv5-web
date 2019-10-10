import request from '@/utils/request'

export function getAgentNumAndSourceNum() {

    return request({
        url : '/hrds_B/B/action/hrds/b/biz/collectmonitor/getAgentNumAndSourceNum',
        method : 'post'
    })
}