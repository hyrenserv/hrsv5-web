import request from '@/utils/request'

//获取自主分析模板配置信息
export function getTemplateConfInfo(data) {
    return request({
        url: '/L/autoanalysis/manage/getTemplateConfInfo',
        params: data
    })
}