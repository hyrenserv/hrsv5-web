import request from '@/utils/request'
import Qs from 'qs'
//获取表数据对标树信息
export function getTDBTreeData() {
    return request({
        url: '/K/tdb/getTDBTreeData',
    })
}
//点击确定对标
// 选择表
export function generateDataBenchmarking(data) {
    return request({
        url: '/K/tdb/generateDataBenchmarking',
        params: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}


