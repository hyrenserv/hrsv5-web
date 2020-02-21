import request from '@/utils/request'

//获取标准信息
export function getDbmNormbasicInfo(data) {
    return request({
        url: '/K/dbmnormbasic/getDbmNormbasicInfo',
        params: data
    })
}
