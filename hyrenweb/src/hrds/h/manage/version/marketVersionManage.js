import request from '@/utils/request'

//获取集市版本树菜单数据
export function getMarketVerManageTreeData(data) {
    return request({
        url: '/H/manage/version/getMarketVerManageTreeData',
        params: data
    })
}
//获取数据表结构版本信息
export function getDataTableStructureInfos(data) {
        return request({
            url: '/H/manage/version/getDataTableStructureInfos',
            params: data
        })
    }