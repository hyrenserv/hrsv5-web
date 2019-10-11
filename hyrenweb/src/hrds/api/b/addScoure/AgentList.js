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