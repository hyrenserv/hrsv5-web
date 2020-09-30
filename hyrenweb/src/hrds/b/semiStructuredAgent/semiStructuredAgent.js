import request from '@/utils/request'
import Qs from 'qs'

//collectOption页面
/**(0)
 * 获取半结构化采集配置页面初始化的值
 */
export function getInitObjectCollectConf(data) {
    return request({
        url: '/B/agent/semistructured/collectconf/getInitObjectCollectConf',
        params: data
    })
}
/**(0)
 * 获取新增时未发送的采集任务
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
/**(2)
 * 在配置字段存储信息时，更新表中文名
 */
export function updateTableZhName(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/updateTableZhName',
        params: data
    })
}
/**(3)
 * 根据存储层配置ID获取当前存储层配置属性信息
 */
export function getStorageLayerAttrById(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/getStorageLayerAttrById',
        params: data
    })
}
/**(4)
 * 获取当前表对应列存储信息
 */
export function getColumnStorageLayerInfo(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/getColumnStorageLayerInfo',
        params: data
    })
}
/**(5)
 * 根据对象采集任务编号获取存储目的地信息
 */
export function getStorageLayerDestById(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/getStorageLayerDestById',
        params: data
    })
}
/**(6)
 *保存数据表存储关系表信息
 */
export function saveDtabRelationStoreInfo(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/saveDtabRelationStoreInfo',
        params: data
    })
}
/**(7)
 * 保存列存储层附加信息
 */
export function saveColRelationStoreInfo(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/saveColRelationStoreInfo',
        params: data
    })
}
/**(8)
 * 在配置字段存储信息时，更新字段中文名
 */
export function updateColumnZhName(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/updateColumnZhName',
        params: data
    })
}
/**(9)
 * 查询数据存储层配置信息
 */
export function searchDataStore(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/searchDataStore',
        params: data
    })
}
/**(10)
 * 保存前检查
 */
export function checkDtabRelationStore(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/checkDtabRelationStore',
        params: data
    })
}
/**(11)
 * 设置所有表的目的地
 */
export function batchSaveDtabRelationStoreInfo(data) {
    return request({
        url: '/B/agent/semistructured/collectstoragelayerconf/batchSaveDtabRelationStoreInfo',
        params: data
    })
}

/**(12)
 * 立即启动
 */
export function execute(data) {
    return request({
        url: '/B/agent/sendObjectCollectTaskById',
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
        data: Qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}

/**(5)
 * 获取工程信息
 */
export function getEtlSysData() {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/getEtlSysData',
    })
}
/**(5)
 * 根据工程编号获取任务
 */
export function getEtlSubSysData(data) {
    return request({
        url: '/B/agent/dbagentconf/startwayconf/getEtlSubSysData',
        params: data
    })
}
/**(6)
 * 查询作业下拉框信息
 */
export function searchEtlJob(data) {
    return request({
        url: '/C/jobconfig/searchEtlJob',
        params: data
    })
}

// ----end-------