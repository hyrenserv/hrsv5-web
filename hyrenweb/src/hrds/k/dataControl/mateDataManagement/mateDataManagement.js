import request from '@/utils/request'


//获取表结构对标树信息
export function getMDMTreeData() {
    return request({
        url: '/K/dm/matedatamanage/getMDMTreeData',
    })
}
