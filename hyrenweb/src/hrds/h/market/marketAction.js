import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取登录用户集市所有表加起来的存储量大小
 */
export function getTotalStorage() {
    return request({
        url: '/H/market/getTotalStorage'
    })
}

/**
 * 获取登录用户集市的所有Hbase表的个数
 */
export function getHbaseStorage() {
    return request({
        url: '/H/market/getHbaseStorage'
    })
}

/**
 * 获取登录用户集市的所有Hive表的个数
 */
export function getHyRenDBStorage() {
    return request({
        url: '/H/market/getHyRenDBStorage'
    })
}



/**
 * 获取登录用户集市的所有Solr表的个数
 */
export function getSolrDBStorage() {
    return request({
        url: '/H/market/getSolrDBStorage'
    })
}


/**
 * 获取登录用户集市占用存储量前三的集市工程名和存储量大小
 */
export function getMarketTakesUpTop3Storage() {
    return request({
        url: '/H/market/getMarketTakesUpTop3Storage'
    })
}

/**
 * 获取登录用户集市Hbase表占用存储前三的集市工程
 */
export function getMarketHbaseTop3Storage() {
    return request({
        url: '/H/market/getMarketHbaseTop3Storage'
    })
}

/**
 * 获取登录用户集市Hive表占用存储前三的集市工程
 */
export function getMarketHyRenDbTop3Storage() {
    return request({
        url: '/H/market/getMarketHyRenDbTop3Storage'
    })
}


/**
 * 获取登录用户集市Solr表占用存储前三的集市工程
 */
export function getMarketSolrDBTop3Storage() {
    return request({
        url: '/H/market/getMarketSolrDBTop3Storage'
    })
}

/**
* 获取登录用户数据集市首页信息
*/
export function getMarketInfo() {
    return request({
        url: '/H/market/getMarketInfo'
    })
}

/**
 * 新增集市工程
 * @param data
 */
export function addMarket(data) {
    return request({
        url: '/H/market/addMarket',
        params:data
    })
}

/**
* 获取登录用户集市查询存储配置表
* @param data
*/
export function searchDataStore() {
    return request({
        url: '/H/market/searchDataStore'
    })
}


/**
 * 获取登录用户集市查询存储配置表（模糊查询）
 * @param data
 */
export function searchDataStoreByFuzzyQuery(data) {
    return request({
        url: '/H/market/searchDataStoreByFuzzyQuery',
        params: data
    })
}

/**
 * 根据权限数据存储层配置ID关联查询数据存储层信息
 */
export function searchDataStoreById(data) {
    return request({
        url: '/A/datastore/searchDataStoreById',
        params: data
    })
}

/**
 * 保存集市添加表页面1的信息
 */
export function addDMDataTable(data) {
    return request({
        url: '/H/market/addDMDataTable',
        params:data
    })
}


/**
 * 编辑更新集市添加表页面1的信息
 */
export function updateDMDataTable(data) {
    return request({
        url: '/H/market/updateDMDataTable',
        params:data
    })
}

/**
 * 获取登录用户查询数据集市工程下的所有集市表
 */
export function queryDMDataTableByDataMartID(data) {
    return request({
        url: '/H/market/queryDMDataTableByDataMartID',
        params:data
    })
}

/**
 * 获取集市表的信息
 */
export function queryDMDataTableByDataTableId(data) {
    return request({
        url: '/H/market/queryDMDataTableByDataTableId',
        params:data
    })
}

/**
 * 删除集市表及其相关信息
 */
export function deleteDMDataTable(data) {
    return request({
        url: '/H/market/deleteDMDataTable',
        params:data
    })
}

/**
 *
 * @param data
 */
//根据SQL获取采集数据，默认显示10条
export function getDataBySQL(data) {
    return request({
        url: '/H/market/getDataBySQL',
        params: data
    })
}

//根据sql,解析,获取字段
export function getColumnBySql(data) {
    return request({
        url: '/H/market/getColumnBySql',
        params: data
    })
}

//根据数据表ID,获取数据库类型，获取选中数据库的附件属性字段
export function getColumnMore(data) {
    return request({
        url: '/H/market/getColumnMore',
        params: data
    })
}

//根据集市表ID,获取字段类型的所有类型
export function getAllField_Type(data) {
    return request({
        url: '/H/market/getAllField_Type',
        params: data
    })
}

//新增datafiels_info信息
export function addDFInfo(data) {
    return request({
        url: '/H/market/addDFInfo',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

//新增datafiels_info信息
export function sortHbae(data) {
    return request({
        url: '/H/market/sortHbae',
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

//根据集市表ID,获取回显字段
export function getColumnFromDatabase(data) {
    return request({
        url: '/H/market/getColumnFromDatabase',
        params: data
    })
}

//根据集市表ID,获取回显SQL
export function getQuerySql(data) {
    return request({
        url: '/H/market/getQuerySql',
        params: data
    })
}


//获取树菜单数据
export function getTreeDataInfo(data) {
    return request({
        url: '/H/market/getTreeDataInfo',
        params: data
    })
}

//获取是否是数据进入Hbase
export function getIfHbase(data) {
    return request({
        url: '/H/market/getIfHbase',
        params: data
    })
}


//获取是否是数据进入Hbase
export function excutMartJob(data) {
    return request({
        url: '/H/market/excutMartJob',
        params: data
    })
}


//查询所有字段
export function queryAllColumnOnTableName(data) {
    return request({
        url: '/H/market/queryAllColumnOnTableName',
        params: data
    })
}

//查询作业调度所有工程
export function queryAllEtlSys(data) {
    return request({
        url: '/H/market/queryAllEtlSys',
        params: data
    })
}


//查询作业调度所有工程
export function queryEtlTaskByEtlSys(data) {
    return request({
        url: '/H/market/queryEtlTaskByEtlSys',
        params: data
    })
}


//查询作业调度所有工程
export function generateMartJobToEtl(data) {
    return request({
        url: '/H/market/generateMartJobToEtl',
        params: data
    })
}



//查询作业调度所有工程
export function downLoadMart(data) {
    return request({
        url: '/H/market/downLoadMart',
        method: 'post',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}