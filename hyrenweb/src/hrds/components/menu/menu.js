/**
 * 定义菜单的数据结构
 * 这里的数据后期会从后台返回
 * 
 */
import request from '@/utils/request'
export function getMenu() {
    return request({
        url: '/A/login/getMenu',
    })
}
export function getDefaultPage() {
    return request({
        url: '/A/login/getDefaultPage',
    })
  }