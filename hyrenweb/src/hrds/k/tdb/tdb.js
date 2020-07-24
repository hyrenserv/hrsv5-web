import request from '@/utils/request'

//获取表数据对标树信息
export function getTDBTreeData() {
    return request({
        url: '/K/tdb/getTDBTreeData',
    })
}