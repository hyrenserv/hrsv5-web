import request from '@/utils/request'
// /hrds_B/B/action/hrds/b/biz
export function getSysPara() {
  return request({
    url: '/A/syspara/getSysPara',
  })
}

export function deleteSysPara(data) {
  return request({
    url: '/A/syspara/deleteSysPara',
    params: data
  })
}

export function addSysPara(data) {
  return request({
    url: '/A/syspara/addSysPara',
    params: data
  })
}

export function editorSysPara(data) {
  return request({
    url: '/A/syspara/updateSysPara',
    params: data
  })
}