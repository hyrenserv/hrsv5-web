# 5.0.1

- k\dataControl.js ：getDMStatistics 删除,无用方法
- k\dataControl.js ：getTableStatistics 添加,用于替代getDMStatistics
- k\dataControl.js ：getRuleStatistics 添加,用于替代getDMStatistics
- k\dataControl.vue ： 调整样式,添加规则校验结果统计栏显示信息
- k\mateDataManager\mateDataManage.vue ： 调整样式,修改获取返回数据方式
- k\tsb\tsb.vue ： 修改获取返回数据方式

- components/menu/index.vue：修改header样式；增加面包屑导航；左侧导航栏增加点击收缩效果，增加点击方法meanClickFun()；去掉底部
- src/router/index.js:修改路由 meta为了显示面包屑导航

- b\addTask\steps1.vue：updateClassifyInfo(agent_id/colSetId),testConnection(agent_id) 的传参panseInt
- b\addTask\steps2.vue：checkTablePrimary(colSetId)/saveAllSQL(colSetId)/saveCollTbInfo(tableid，colSetId)/getTableDataCount(colSetId)    的传参parseInt  
- b\addTask\steps4.vue：saveFileConf(colSetId)/saveJobDataToDatabase(colSetId)   的传参panseInt
- b\dbAgentcollect\step3.vue：saveDataTransferData(colSetId)   的传参panseInt
- b\dbAgentcollect\step4.vue：saveDataCleanConfig(colSetId)    的传参panseInt
- b\dbAgentcollect\step5.vue：saveTbStoInfo(colSetId)    的传参panseInt
- b\dbAgentcollect\step6.vue：saveJobDataToDatabase(colSetId)    的传参panseInt
- k\dbm_check\dbm_check_normbasic.vue：getDbmNormbasicInfoBySortId（sort_id）    的传参panseInt
