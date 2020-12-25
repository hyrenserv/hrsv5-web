import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取登录用户数据集市首页信息
 */
export function getAllDslInMart() {
    return request({
        url: '/H/market/getAllDslInMart'
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
 * 获取集市表的信息
 */
export function querytablenameifrepeat(data) {
    return request({
        url: '/H/market/queryTableNameIfRepeat',
        params:data
    })
}


/**
 * 获取集市表的信息
 */
export function querydatatableidifrepeat(data) {
    return request({
        url: '/H/market/queryDataTableIdIfRepeat',
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
        headers: { 'Content-Type': 'multipart/form-data' },
        data: data
    })
}

//根据sql,解析,获取字段
export function getColumnBySql(data) {
    return request({
        url: '/H/market/getColumnBySql',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
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


//根据集市表ID,获取所有来源字段值
export function getFromColumnList(data) {
    return request({
        url: '/H/market/getFromColumnList',
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



//下载集市工程
export function downloadMart(data) {
    return request({
        url: '/H/market/downloadMart',
        method: 'post',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//下载集市数据表
// export function downloadDmDatatable(data) {
//     return request({
//         url: '/H/market/downloadDmDatatable',
//         method: 'post',
//         params: data,
//         responseType: 'blob',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
// }


//导出集市mapping信息表
export function exportMappingExcel(data) {
    return request({
        url: '/H/market/exportMappingExcel',
        method: 'post',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//导入集市工程
export function uploadFile(data) {
    return request({
        url: '/H/market/uploadFile',
        params: data,
    })
}
//获取集市工程审核文件路径
export function getImportFilePath(data) {
    return request({
        url: '/H/market/getImportFilePath',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
//导入集市工程审核
export function getImportReviewData(data) {
    return request({
        url: '/H/market/getImportReviewData',
        params: data,
    })
}
export function deleteImportFilePath(data) {
    return request({
        url: '/H/market/deleteImportFilePath',
        params: data,
    })
}
//删除集市工程
export function deleteMart(data) {
    return request({
        url: '/H/market/deleteMart',
        params: data
    })
}

//获取表名
export function getTableName(data) {
    return request({
        url: '/H/market/getTableName',
        params: data
    })
}


//获取各个存储层中表大小的前五名
export function getTableTop5InDsl(data) {
    return request({
        url: '/H/market/getTableTop5InDsl',
        params: data
    })
}

//保存前置和后置作业作业
export function savePreAndAfterJob(data) {
    return request({
        url: '/H/market/savePreAndAfterJob',
        params: data
    })
}


//保存前置和后置作业作业
export function getPreAndAfterJob(data) {
    return request({
        url: '/H/market/getPreAndAfterJob',
        params: data
    })
}
/**
 * Excel模板下载
 */
export function downloadExcel() {
    return request({
        url: '/H/market/downloadExcel',
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
//上传execl表格
export function uploadExcelFile(data) {
    return request({
        url: '/H/market/uploadExcelFile',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

//上传execl表格
export function uploadExcelFile2(data) {
    return request({
        url: '/H/market/uploadExcelFile2',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

//查询所有集市表名
export function getalldatatable_en_name(data) {
    return request({
        url: '/H/market/getAllDatatable_En_Name',
        params: data
    })
}

//编辑集市工程
export function getdminfo(data) {
    return request({
        url: '/H/market/getdminfo',
        params: data
    })
}

//查询与当前datatable_id拥有相同datatable_en_name的另外一组datatable_id
export function getTableIdFromSameNameTableId(data) {
    return request({
        url: '/H/market/getTableIdFromSameNameTableId',
        params: data
    })
}


//检查集市状态
export function checkRunStatus(data) {
    return request({
        url: '/H/market/checkRunStatus',
        params: data
    })
}

//检查集市状态
export function checkOracle(data) {
    return request({
        url: '/H/market/checkOracle',
        params: data
    })
}
//保存集市分类
export function saveDmCategory(data) {
    return request({
        url: '/H/market/saveDmCategory',
        params: data
    })
}
//根据数据集市id查询是否需要显示前置作业
export function getIfRelationDatabase(data) {
    return request({
        url: '/H/market/getIfRelationDatabase',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

//根据数据集市id查询是否需要显示前置作业
export function getIfRelationDatabase2(data) {
    return request({
        url: '/H/market/getIfRelationDatabase2',
        params: data
    })
}

//根据数据集市id查询集市分类信息
export function getDmCategoryInfo(data) {
    return request({
        url: '/H/market/getDmCategoryInfo',
        params: data
    })
}


//获取数的数据信息
export function getDmCategoryTreeData(data) {
    return request({
        url: '/H/market/getDmCategoryTreeData',
        params: data
    })
}
//根据集市id删除分类信息
export function deleteDmCategory(data) {
    return request({
        url: '/H/market/deleteDmCategory',
        params: data
    })
}
//获取所有节点分类信息
export function getDmCategoryNodeInfo(data) {
    return request({
        url: '/H/market/getDmCategoryNodeInfo',
        params: data
    })
}
//获取数据表所有信息分类集合
export function getDmCategoryForDmDataTable(data) {
    return request({
        url: '/H/market/getDmCategoryForDmDataTable',
        params: data
    })
}
//修改分类名称
export function updateDmCategoryName(data) {
    return request({
        url: '/H/market/updateDmCategoryName',
        params: data
    })
}
//获取分类信息
export function getDmCategoryNodeInfoByIdAndName(data) {
    return request({
        url: '/H/market/getDmCategoryNodeInfoByIdAndName',
        params: data
    })
}
//获取详情表信息
export function getDmDataTableByDmCategory(data) {
    return request({
        url: '/H/market/getDmDataTableByDmCategory',
        params: data
    })
}

/////////////////////////////////////////////////////////////////////////////
//获取规则信息
export function getSparkSqlGram(data) {
    return request({
        url: '/H/market/getSparkSqlGram',
        params: data
    })
}


//获取预聚合SQL信息
export function prePolymerization(data) {
    return request({
        url: '/H/market/prePolymerization',
        params: data
    })
}

//保存预聚合SQL
export function savePrePolymerization(data) {
    return request({
        url: '/H/market/savePrePolymerization',
        params: data,
    })
}

//删除预聚合SQL
export function deletePrePolymerization(data) {
    return request({
        url: '/H/market/deletePrePolymerization',
        params: data,
    })
}

//生成作业脚本
export function generatingScript(data) {
    return request({
        url: '/H/scriptsql/generatingScript',
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//获取表的关联信息
export function getRelationTable(data) {
    return request({
        url: '/H/market/getRelationTable',
        params: data
    })
}

