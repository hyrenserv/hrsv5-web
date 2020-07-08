import request from '@/utils/request'
import  Qs  from  'qs'

//collectOption页面
/**(0)
 * 获取半结构化采集配置页面初始化的值
 */
export function getAddObjectCollectConf(data) {
    return request({
        url: '/B/agent/semistructured/collectconf/getAddObjectCollectConf',
        params: data
    })
}
/**(0.1)
 * 获取半结构化采集配置编辑时页面初始化的值
 */
export function getObjectCollectConfById(data) {
    return request({
        url: '/B/agent/semistructured/collectconf/getObjectCollectConfById',
        params: data
    })
}
/**(1)
 * 获取半结构化采集配置页面初始化的值
 */
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}

/**(2)
 * 新增或更新半结构化文件采集设置页面信息
 */
export function saveObjectCollect(data) {
    return request({
        url: '/B/agent/semistructured/collectconf/saveObjectCollect',
        params: data
    })
}
/**(3)
 * 选择文件夹Agent所在服务器的文件夹
 */
export function selectPath(data) {
    return request({
        url: '/B/agent/unstructuredfilecollect/selectPath',
        params: data
    })
}
/**(4)
 * 选择文件夹Agent所在服务器的文件夹
 */
export function viewTable(data) {
    return request({
        url: '/B/agent/semistructured/collectconf/viewTable',
        params: data
    })
}

//collectFileOption页面
/**(0)
 * 获取半结构化采集文件配置页面初始化的值
 */
export function searchObjectCollectTask(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/searchObjectCollectTask',
        params: data
    })
}
/**(1)
 * 查询半结构化采集列结构信息（有数据字典）
 */
export function getObjectCollectStruct(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/getObjectCollectStruct',
        params: data
    })
}
/**(2)
 * 查询半结构化采集列结构信息（没有数据字典）
 */
export function getObjectCollectStructById(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/getObjectCollectStructById',
        params: data
    })
}
/**(3)
 * 查询半结构化采集列结构左边数的值（没有数据字典）
 */
export function getFirstLineTreeInfo(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/getFirstLineTreeInfo',
        params: data
    })
}
/**(4)
 * 保存对象采集列结构信息
 */
export function saveObjectCollectStruct(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/saveObjectCollectStruct',
        params: data
    })
}
/**(5)
 * 获取当前操作码表信息(有数据字典，没有数据字典调用代码项)
 */
export function searchObjectHandleType(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/searchObjectHandleType',
        params: data
    })
}
/**(6)
 * 保存操作码表信息
 */
export function saveObjectHandleType(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/saveObjectHandleType',
        params: data
    })
}
/**(7)
 * 获取对象采集树节点信息（下一级目录）
 */
export function getObjectCollectTreeInfo(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/getObjectCollectTreeInfo',
        params: data
    })
}
/**(8)
 * 保存文件设置信息
 */
export function saveObjectCollectTask(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/saveObjectCollectTask',
        params: data
    })
}
/**(9)
 * 无数据字典时查询返回对象采集操作码表
 */
export function getObjectHandleType(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/getObjectHandleType',
        params: data
    })
}
// dataStorage页面
/**(1)
 * 获取半结构化采集存储层配置初始化值
 */
export function getCollectStorageLayerInfo(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/getCollectStorageLayerInfo',
        params: data
    })
}
//startMode页面
/**(1)
 * 获取当前半结构化采集任务下的作业信息
 */
export function getPreviewJob(data) {
    return request({
        url: '/B/agent/semistructured/startmodeconf/getPreviewJob',
        params: data
    })
}
/**(2)
 * 获取任务Agent的部署路径及日志目录
 */
export function getAgentPath(data) {
    return request({
        url: '/B/agent/semistructured/startmodeconf/getAgentPath',
        params: data
    })
}
/**(3)
 * 获取半结构化采集作业配置
 */
export function getEtlJobConfInfoFromObj(data) {
    return request({
        url: '/B/agent/semistructured/startmodeconf/getEtlJobConfInfoFromObj',
        params: data
    })
}
/**(4)
 * 保存半结构化采集启动方式配置
 */
export function saveStartModeConfData(data) {
    return request({
        url: '/B/agent/semistructured/startmodeconf/saveStartModeConfData',
        params: data
    })
}
// ----end-------
/**(2.1)
 * 查询半结构化采集列结构信息右边表格信息（没有数据字典）
 */
export function getObjectCollectStructList(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/getObjectCollectStructList',
        params: data
    })
}



/**(4)
 * 保存对象采集结构信息（采集列结构）
 */
export function saveCollectColumnStruct(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/saveObjectCollectStruct',
        data:  Qs.stringify(data),
                headers:  {  'Content-Type':   'application/x-www-form-urlencoded'  }
    })
}
/**(5)
 * 检查采集文件设置
 */
export function checkFieldsForSaveObjectCollectTask(data) {
    return request({
        url: '/B/agent/semistructured/collectfileconf/checkFieldsForSaveObjectCollectTask',
        data:  Qs.stringify(data),
        headers:  {  'Content-Type':   'application/x-www-form-urlencoded'  }
    })
}


//collectionStructureSet页面
/**(0)
 * 获取存储信息
 */
export function searchObjectStorage(data) {
    return request({
        url: '/B/agent/objectcollect/searchObjectStorage',
        params: data
    })
}
/**(1)
 * 查询solr配置信息
 */
export function searchSolrConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/searchSolrConfInfo',
        params: data
    })
}
/**(2)
 * 根据ocs_id查询hbase配置信息
 */
export function searchHBaseConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/searchHBaseConfInfo',
        params: data
    })
}
/**(3)
 * 保存SOLR
 */
export function saveSolrConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/saveSolrConfInfo',
        params: data
    })
}
/**(4)
 * 保存hbase
 */
export function saveHBaseConfInfo(data) {
    return request({
        url: '/B/agent/objectcollect/saveHBaseConfInfo',
        params: data
    })
}
/**(4)
 * 保存对象文件配置信息时检查字段
 */
export function checkFieldsForSaveObjectStorage(data) {
    return request({
        url: '/B/agent/objectcollect/checkFieldsForSaveObjectStorage',
        params: data
    })
}
/**(5)
 * 保存存储设置
 */
export function saveObjectStorage(data) {
    return request({
        url: '/B/agent/objectcollect/saveObjectStorage',
        params: data
    })
}