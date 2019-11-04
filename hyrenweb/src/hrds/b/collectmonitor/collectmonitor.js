import request from '@/utils/request'

/**
 * @returns {Object} 返回Agent和采集任务数量
 */
export function getAgentNumAndSourceNum() {

  return request({
    url: '/B/collectmonitor/getAgentNumAndSourceNum',
  })
}

/**
 * @returns {Object} 返回当前用户采集任务信息
 */
export function getDatabaseSet() {
  return request({
    url: '/B/collectmonitor/getDatabaseSet'
  })
}


/**
 * @returns {Object} 采集信息总况(总采集任务数,数据采集(数据库,数据文件)和文件采集大小)
 */
export function getDataCollectInfo() {
  return request({
    url: '/B/collectmonitor/getDataCollectInfo'
  })
}

/**
 * @returns {Object} 返回历史最近15天的采集数据信息
 */
export function getHostoryCollect() {
  return request({
    url: '/B/collectmonitor/getHoStoryCollect'
  })
}

/**
 * @returns {Object} 返回当前选择任务的采集表信息情况
 */
export function getCurrentTaskJob(data) {
  return request({
    url: '/B/collectmonitor/getCurrentTaskJob',
    params: data
  })
}

export function lineData() {
  let data = {
    columns: ['日期', '访问用户', '下单用户', '下单率'],
    rows: [
      { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
      { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
      { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
      { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
      { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
      { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
    ]
  }

  return data;
}