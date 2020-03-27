import request from '@/utils/request'

//获取统计数据
export function getDMStatistics() {
    return request({
        url: '/K/dm/getDMStatistics',
    })
}
