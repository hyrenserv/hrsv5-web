import request from '@/utils/request'

/**(0)
   * 查询数据用户管理用户信息
   */
  export function getSysUserInfo(data) {
    return request({
        url: '/A/sysuser/getSysUserInfo',
        method: 'post',
        params: data
    })
}


/**(1)
   * 查询数据用户管理用户信息用户功能类型
   */
  export function getAllCodeItems(data) {
    return request({
        url: '/A/codes/getAllCodeItems',
        method: 'post',
        params: data
    })
}

// departmentalList页
/**()
   * 获取所有部门信息
   */
  export function getDepartmentInfo(data) {
    return request({
        url: '/A/department/getDepartmentInfo',
        method: 'post',
        params: data
    })
}