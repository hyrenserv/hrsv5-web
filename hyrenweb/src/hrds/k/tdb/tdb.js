import request from '@/utils/request'
import Qs from 'qs'
//获取表数据对标树信息
export function getTDBTreeData() {
    return request({
        url: '/K/tdb/getTDBTreeData',
    })
}
// 选择表
export function saveTDBTable(data) {
    return request({
        url: '/K/tdb/saveTDBTable',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

