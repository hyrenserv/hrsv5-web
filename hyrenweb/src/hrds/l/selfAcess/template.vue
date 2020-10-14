<template>
<div class="templateDiv">
    <el-row class="elRows">
        <span>模板清单</span>
        <div class="lines"></div>
    </el-row>
    <el-row class="titleRow">
        <el-button type="primary" class="templateButton" @click="addTemplates" size="small">
            模板配置
        </el-button>
        <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="inputText">
            <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
        </el-input>
    </el-row>
    <el-table size="medium" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="70px" align='center'>
        </el-table-column>
        <el-table-column prop="template_name" show-overflow-tooltip label="名称" align='center'>
        </el-table-column>
        <el-table-column prop="template_desc" show-overflow-tooltip label="模板描述" align='center'>
        </el-table-column>
        <el-table-column prop="create_dateFormat" show-overflow-tooltip label="日期" align='center'>
        </el-table-column>
        <el-table-column prop="create_user" show-overflow-tooltip label="创建人" align='center'>
        </el-table-column>
        <el-table-column label="模板状态" prop="template_status" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center' width="140">
            <template slot-scope="scope">
                <el-button size="mini" type="text" v-if=" scope.row.template_status =='发布'" @click="viewOnlineData(scope.$index, scope.row)">查看
                </el-button>
                <el-button size="mini" type="text" v-if=" scope.row.template_status !=='发布'" @click="reportOnline(scope.$index, scope.row)">发布
                </el-button>
                <el-button size="mini" type="text" v-if=" scope.row.template_status !=='发布'" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini" type="text" v-if=" scope.row.template_status !=='发布'" @click="deleteRow(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import * as functionAll from "./selfAcess";
import * as fixedAll from "@/utils/js/fileOperations";
export default {
    data() {
        return {
            inputText: null,
            tableData: [],
            options: []
        }
    },
    mounted() {
        this.getCategoryItems();
    },
    methods: {
        // 获取初始数据
        getTemplateConfInfo() {
            functionAll.getTemplateConfInfo().then(res => {
                res.data.forEach(item => {
                    if (item.create_date && item.create_time) {
                        item.create_dateFormat = fixedAll.dateFormat(item.create_date) + " " + fixedAll.hourFormat(item.create_time);
                    }
                    this.options.forEach(val => {
                        if (item.template_status == val.code) {
                            item.template_status = val.value;
                        }
                    })
                })
                this.tableData = res.data
            })
        },
        // 模板配置
        addTemplates() {
            this.$router.push({
                name: 'configTemplate'
            })
        },
        // 查看模板配置
        handleEdit(index, row) {
            this.$router.push({
                name: 'configTemplate',
                query: {
                    template_id: row.template_id
                }
            })
        },
        // 发布查看
        viewOnlineData(index, row) {
            this.$router.push({
                name: 'configTemplate',
                query: {
                    template_id: row.template_id,
                    template_status: row.template_status
                }
            })
        },
        // 发布取数
        reportOnline(index, row) {
            this.$confirm('确认发布(' + row.template_name + ')模板吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.releaseAutoAnalysisTemplate({
                    template_id: row.template_id,
                }).then(res => {
                    if (res && res.success) {
                        this.$Msg.customizTitle('发布成功', 'success')
                        // 从新渲染表格
                        this.getTemplateConfInfo();
                    }
                })
            }).catch(() => {
                this.$Msg.customizTitle('已取消发布', 'info')
            });
        },
        // 获取代码项
        getCategoryItems() {
            functionAll.getCategoryItems({
                category: 'AutoTemplateStatus'
            }).then(res => {
                this.options = res.data;
                this.getTemplateConfInfo();
            })
        },
        // 查询按钮
        searchInfo() {
            if (this.inputText == "") {
                this.getTemplateConfInfo();
            } else {
                functionAll.getTemplateConfInfoByName({
                    template_name: this.inputText,
                }).then(res => {
                    res.data.forEach(item => {
                        if (item.create_date && item.create_time) {
                            item.create_dateFormat = fixedAll.dateFormat(item.create_date) + " " + fixedAll.hourFormat(item.create_time);
                        }
                        this.options.forEach(val => {
                            if (item.template_status == val.code) {
                                item.template_status = val.value;
                            }
                        })
                    })
                    this.tableData = res.data
                })
            }

        },
        // 删除
        deleteRow(index, row) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteAutoAnalysisTemplate({
                    template_id: row.template_id,
                }).then(res => {
                    if (res && res.success) {
                        this.$Msg.customizTitle('删除成功', 'success')
                        // 从新渲染表格
                        this.getTemplateConfInfo();
                    }
                })
            }).catch(() => {
                this.$Msg.customizTitle('已取消删除', 'info')
            });
        }
    }
}
</script>

<style scoped>
/* 标题信息 */
.elRows {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* 搜索按钮 */
.titleRow {
    margin-top: 14px;
    margin-bottom: 2px;
}

.templateButton {
    float: left;
}

.input-with-select {
    float: right;
    width: 284px;
}
</style>
