import request from '@/utils/request'

/**
 * 添加数据源数据信息
 */
export function addDataResource() {
    return request({
        url: 'http://10.71.4.57:8889/B/action/hrds/b/biz/url/datasource/saveDataSource',
        method: 'post',
        data:{
            "source_remark":this.source_remark,
            "datasource_name":this.datasource_name,
            "depIds":this.depIds,
            "datasource_number":this.datasource_number
        }
    })
}

/**
 * 导入源数据信息
 */
export function importDataResource() {
    return request({
        url: 'http://10.71.4.57:8889/B/action/hrds/b/biz/url/datasource/uploadFile',
        method: 'post',
        data:{
            "agentIp":this.agentIp,
            "agentPort":this.agentPort,
            "userCollectId":this.userCollectId
        }
    })
}