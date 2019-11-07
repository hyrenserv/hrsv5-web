import request from '@/utils/request'

// ueserManagement页
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
  export function getValue(data) {
    return request({
        url: '/A/codes/getValue',
        method: 'post',
        params: data
    })
}

/**(2)
   * 新增系统用户
   */
  export function addSysUser(data) {
    return request({
        url: '/A/sysuser/addSysUser',
        method: 'post',
        params: data
    })
}

/**(3)
   * 删除系统用户
   */
  export function deleteSysUser(data) {
    return request({
        url: '/A/sysuser/deleteSysUser',
        method: 'post',
        params: data
    })
}

// departmentalList页
/**(0)
   * 获取所有部门信息
   */
  export function getDepartmentInfo(data) {
    return request({
        url: '/A/department/getDepartmentInfo',
        method: 'post',
        params: data
    })
}

/**(1)
   * 获取用户功能菜单
   */
  export function getUserFunctionMenu(data) {
    return request({
        url: '/A/sysuser/getUserFunctionMenu',
        method: 'post',
        params: data
    })
}

/**(2)
   * 新增部门
   */
  export function addDepartmentInfo(data) {
    return request({
        url: '/A/department/addDepartmentInfo',
        method: 'post',
        params: data
    })
}

/**(3)
   * 删除部门
   */
  export function deleteDepartmentInfo(data) {
    return request({
        url: '/A/department/deleteDepartmentInfo',
        method: 'post',
        params: data
    })
}

/**(4)
   * 修改部门信息
   */
  export function updateDepartmentInfo(data) {
    return request({
        url: '/A/department/updateDepartmentInfo',
        method: 'post',
        params: data
    })
}

// sysyemParameters页
/**(0)
   * 模糊查询获取系统参数信息
   */
  export function getSysPara(data) {
    return request({
        url: '/A/syspara/getSysPara',
        method: 'post',
        params: data
    })
}

/**(1)
   *新增系统参数
   */
  export function addSysPara(data) {
    return request({
        url: '/A/syspara/addSysPara',
        method: 'post',
        params: data
    })
}

/**(2)
   *更新系统参数
   */
  export function updateSysPara(data) {
    return request({
        url: '/A/syspara/updateSysPara',
        method: 'post',
        params: data
    })
}

/**(3)
   *删除系统参数
   */
  export function deleteSysPara(data) {
    return request({
        url: '/A/syspara/deleteSysPara',
        method: 'post',
        params: data
    })
}