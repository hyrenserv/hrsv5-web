import request from '@/utils/request'

/**
 * 
 * @param data.username  登陆的用户名
 * @param data.password  登陆的用户密码
 * 
 */
export function login(data) {
  return request({
    url: '/hrds_A/A/action/hrds/a/biz/login/login',
    method: 'post',
    params : data
  })
}
