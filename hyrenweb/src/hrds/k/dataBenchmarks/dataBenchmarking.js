import request from '@/utils/request'
// 1 基础信息
// 基础信息批量发布
export function batchReleaseDbmNormbasic(data) {
    return request({
        url: '/K/dbmnormbasic/batchReleaseDbmNormbasic',
        params: data,
    })
}
//单个发布
export function releaseDbmNormbasicById(data) {
    return request({
        url: '/K/dbmnormbasic/releaseDbmNormbasicById',
        params: data,
    })
}
// 发布状态筛选
export function getDbmNormbasicByStatus(data) {
    return request({
        url: '/K/dbmnormbasic/getDbmNormbasicByStatus',
        params: data,
    })
}
// 获取初始表信息
export function getDbmNormbasicInfo(data) {
    return request({
        url: '/K/dbmnormbasic/getDbmNormbasicInfo',
        params: data,
    })
}

// 获取代码类下拉框
export function getDbmCodeTypeIdAndNameInfo() {
    return request({
        url: '/K/dbmcodetypeinfo/getDbmCodeTypeIdAndNameInfo',
    })
}

//添加标准分类
export function addDbmNormbasicInfo(data) {
    return request({
        url: '/K/dbmnormbasic/addDbmNormbasicInfo',
        params: data,
    })
}

// 编辑打开
export function getDbmNormbasicInfoById(data) {
    return request({
        url: '/K/dbmnormbasic/getDbmNormbasicInfoById',
        params: data,
    })
}

// 编辑保存
export function updateDbmNormbasicInfo(data) {
    return request({
        url: '/K/dbmnormbasic/updateDbmNormbasicInfo',
        params: data,
    })
}

// 删除方法
export function deleteDbmNormbasicInfo(data) {
    return request({
        url: '/K/dbmnormbasic/deleteDbmNormbasicInfo',
        params: data,
    })
}

//获取所有标准信息
export function getDbmNormbasicIdAndNameInfo() {
    return request({
        url: '/K/dbmnormbasic/getDbmNormbasicIdAndNameInfo',
    })
}

//左侧树点击后显示数据
export function getDbmNormbasicInfoBySortId(data) {
    return request({
        url: '/K/dbmnormbasic/getDbmNormbasicInfoBySortId',
        params: data,
    })
}
// 批量删除
export function batchDeleteDbmNormbasic(data) {
    return request({
        url: '/K/dbmnormbasic/batchDeleteDbmNormbasic',
        params: data,
    })
}

//标准搜索
export function searchDbmNormbasic(data) {
    return request({
        url: '/K/dbmnormbasic/searchDbmNormbasic',
        params: data,
    })
}
//2:代码配置
// 代码类新增
export function addDbmCodeTypeInfo(data) {
    return request({
        url: '/K/dbmcodetypeinfo/addDbmCodeTypeInfo',
        params: data,
    })
}
// 批量删除代码类
export function batchDeleteDbmCodeTypeInfo(data) {
    return request({
        url: '/K/dbmcodetypeinfo/batchDeleteDbmCodeTypeInfo',
        params: data,
    })
}
// 批量删除代码项
export function batchDeleteDbmCodeItemInfo(data) {
    return request({
        url: '/K/dbmcodeiteminfo/batchDeleteDbmCodeItemInfo',
        params: data,
    })
}
// 代码类-分页获取数据
export function getDbmCodeTypeInfo(data) {
    return request({
        url: '/K/dbmcodetypeinfo/getDbmCodeTypeInfo',
        params: data,
    })
}

//
//代码类-编辑
export function getDbmSortInfoById(data) {
    return request({
        url: '/K/dbmcodetypeinfo/getDbmSortInfoById',
        params: data,
    })
}

//代码类-编辑保存
export function updateDbmCodeTypeInfo(data) {
    return request({
        url: '/K/dbmcodetypeinfo/updateDbmCodeTypeInfo',
        params: data,
    })
}

//代码类-删除分类方法
export function deleteDbmCodeTypeInfo(data) {
    return request({
        url: '/K/dbmcodetypeinfo/deleteDbmCodeTypeInfo',
        params: data,
    })
}

//根据类id获取所有代码项
export function getDbmCodeItemInfoByCodeTypeId(data) {
    return request({
        url: '/K/dbmcodeiteminfo/getDbmCodeItemInfoByCodeTypeId',
        params: data,
    })
}

// 新增代码项
export function addDbmCodeItemInfo(data) {
    return request({
        url: '/K/dbmcodeiteminfo/addDbmCodeItemInfo',
        params: data,
    })
}

// 编辑代码项
export function updateDbmCodeItemInfo(data) {
    return request({
        url: '/K/dbmcodeiteminfo/updateDbmCodeItemInfo',
        params: data,
    })
}

// 编辑代码项打开
export function getItemDbmSortInfoById(data) {
    return request({
        url: '/K/dbmcodeiteminfo/getDbmSortInfoById',
        params: data,
    })
}

// 删除代码项
export function deleteDbmCodeItemInfo(data) {
    return request({
        url: '/K/dbmcodeiteminfo/deleteDbmCodeItemInfo',
        params: data,
    })
}
//批量发布
export function batchReleaseDbmCodeTypeInfo(data) {
    return request({
        url: '/K/dbmcodetypeinfo/batchReleaseDbmCodeTypeInfo',
        params: data,
    })
}
//单个发布
export function releaseDbmCodeTypeInfoById(data) {
    return request({
        url: '/K/dbmcodetypeinfo/releaseDbmCodeTypeInfoById',
        params: data,
    })
}
//代码类发布筛选
export function getDbmCodeTypeInfoByStatus(data) {
    return request({
        url: '/K/dbmcodetypeinfo/getDbmCodeTypeInfoByStatus',
        params: data,
    })
}
//代码类搜索
export function searchDbmCodeTypeInfo(data) {
    return request({
        url: '/K/dbmcodetypeinfo/searchDbmCodeTypeInfo',
        params: data,
    })
}
// 3：标准分类配置
// 添加
export function addDbmSortInfo(data) {
    return request({
        url: '/K/dbmsortinfo/addDbmSortInfo',
        params: data,
    })
}

//编辑保存
export function updateDbmSortInfo(data) {
    return request({
        url: '/K/dbmsortinfo/updateDbmSortInfo',
        params: data,
    })
}

//获取
export function getClassDbmSortInfo(data) {
    return request({
        url: '/K/dbmsortinfo/getDbmSortInfo',
        params: data,
    })
}

//编辑打开
export function getclassDbmSortInfoById(data) {
    return request({
        url: '/K/dbmsortinfo/getDbmSortInfoById',
        params: data,
    })
}

//删除
export function deleteDbmSortInfo(data) {
    return request({
        url: '/K/dbmsortinfo/deleteDbmSortInfo',
        params: data,
    })
}

//获取分类树信息
export function getDbmSortInfoTreeData() {
    return request({
        url: '/K/dbmtree/getDbmSortInfoTreeData',
    })
}

// 3--标准分类管理
///getDbmRootSortInfo
// getDbmSubSortInfo

// 1---标准管理类
// getDbmNormbasicInfoBySortId
// getDbmNormbasicIdAndNameInfo

//导入excel数据
export function importExcelData(data) {
    return request({
        url: '/K/dbmdataimport/importExcelData',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'}
    })
}
//批量发布分类
export function batchReleaseDbmSortInfo(data) {
    return request({
        url: '/K/dbmsortinfo/batchReleaseDbmSortInfo',
        params: data,
    })
}
//单个发布
export function releaseDbmSortInfoById(data) {
    return request({
        url: '/K/dbmsortinfo/releaseDbmSortInfoById',
        params: data,
    })
}
//标准分类配置筛选发布状态
export function getDbmSortInfoByStatus(data) {
    return request({
        url: '/K/dbmsortinfo/getDbmSortInfoByStatus',
        params: data,
    })
}
// 批量删除
export function batchDeleteDbmSortInfo(data) {
    return request({
        url: '/K/dbmsortinfo/batchDeleteDbmSortInfo',
        params: data,
    })
}
//代码类搜索
export function searchDbmSortInfo(data) {
    return request({
        url: '/K/dbmsortinfo/searchDbmSortInfo',
        params: data,
    })
}
// 代码项搜索
export function searchDbmCodeItemInfo(data) {
    return request({
        url: '/K/dbmcodeiteminfo/searchDbmCodeItemInfo',
        params: data,
    })
}