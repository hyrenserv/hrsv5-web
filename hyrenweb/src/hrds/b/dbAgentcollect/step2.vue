<template>
<div class="step2">
    <Step :active="active"></Step>
    <el-table :data="tableData" border size="medium">
        <el-table-column property label="序号" width="60px" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column property="table_name" label="表名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="table_ch_name" label="中文表名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
                <el-button type="text" size="mini" @click="watchText(scope.row,scope.$index)">查看列</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" class="locationcenter"></el-pagination>
    <div class="step1Footer">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit" size="medium"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:left" @click="backSteps" size="medium">上一步</el-button>
                <el-button type="primary" style="float:right" @click="nextSteps" size="medium"> 下一步</el-button>
            </div>
        </el-col>
    </div>
    <!-- 查看列弹出框 -->
    <el-dialog width="50%" :visible.sync="innerVisible">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">查看列信息</span>
        </div>
        <el-table :data="tableDataDialog.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border size="medium">
            <el-table-column property label="序号" width="60px" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="is_primary_key" width="96" label="是否为主键" align="center">
                <template slot-scope="scope">
                    <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.is_primary_key"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column property="column_name" label="列名" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column property="column_ch_name" label="列中文名" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="类型" property="column_type" show-overflow-tooltip align="center"></el-table-column>
        </el-table>
        <div class="pageDiv">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" style="float:right;" :total="tableDataDialog.length"></el-pagination>
        </div>

        <div slot="footer">
            <el-button size="mini" type="danger" @click="cancelWatch">取 消</el-button>
            <el-button type="primary" size="mini" @click="selectWatch">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import Step from "./step";
import * as functionAll from "./dbAgentcollect";
import * as message from "@/utils/js/message";
export default {
    components: {
        Step
    },
    data() {
        return {
            active: 1,
            tableData: [],
            tableDataDialog: [],
            pagesize: 10,
            currentPage: 1,
            innerVisible: false,
            table_id: '',
            table_name: '',
            tableColumn: {}
        }
    },
    mounted() {
        this.getTableData();
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 获取表格数据
        getTableData() {
            functionAll.getTableData({
                colSetId: this.$route.query.id
            }).then(res => {
                this.tableData = res.data;
            })
        },
        // 查看列数据
        watchText(val, index) {
            this.table_id = val.table_id;
            this.table_name = val.table_name;
            if (val.table_id == undefined) {
                functionAll.getTableColumnByTableName({
                    colSetId: this.$route.query.id,
                    table_name: val.table_name
                }).then(res => {
                    let arry = [];
                    res.data.forEach((item, index) => {
                        if (item.column_name.toUpperCase() == 'HYREN_S_DATE') {
                            return false;
                        } else if (item.column_name.toUpperCase() == "HYREN_E_DATE") {
                            return false;
                        } else if (item.column_name.toUpperCase() == 'HYREN_MD5_VAL') {
                            return false;
                        } else {
                            arry.push(item)
                        }
                    })
                    this.tableDataDialog = arry;
                })
            } else {
                functionAll.getTableColumnByTableId({
                    colSetId: this.$route.query.id,
                    table_id: val.table_id
                }).then(res => {
                    let arry = [];
                    res.data.forEach((item, index) => {
                        if (item.column_name.toUpperCase() == 'HYREN_S_DATE') {
                            return false;
                        } else if (item.column_name.toUpperCase() == "HYREN_E_DATE") {
                            return false;
                        } else if (item.column_name.toUpperCase() == 'HYREN_MD5_VAL') {
                            return false;
                        } else {
                            arry.push(item)
                        }
                    })
                    this.tableDataDialog = arry;
                })
            }
            this.innerVisible = true;
        },
        //取消查看列
        cancelWatch() {
            this.innerVisible = false;
            this.tableDataDialog = [];
        },
        // 保存查看列
        selectWatch() {
            if (this.table_id == undefined) {
                let obj = {};
                obj[this.table_name] = this.tableDataDialog;
                this.tableColumn[this.table_name] = this.tableDataDialog;
                this.innerVisible = false;
                message.customizTitle("列保存成功", "success")
            } else {
                let obj = {};
                obj.table_id = this.table_id;
                obj['tableColumns'] = JSON.stringify(this.tableDataDialog);
                functionAll.updateColumnByTableId(obj).then(res => {
                    if (res && res.success) {
                        this.innerVisible = false;
                        message.customizTitle("列保存成功", "success");
                        this.tableDataDialog = [];
                    }
                })
            }
        },
        // 下一步
        nextSteps() {
            let paramas = {};
            paramas.colSetId = this.$route.query.id;
            paramas.tableInfos = JSON.stringify(this.tableData);
            if (JSON.stringify(this.tableColumn) != '{}') {
                paramas.tableColumns = this.tableColumn;
            }
            functionAll.saveTableData(paramas).then(res => {
                if (res && res.success) {
                    let data = {}
                    if (this.$route.query.edit == 'yes') {
                        data = {
                            agent_id: this.$route.query.agent_id,
                            id: res.data,
                            source_id: this.$route.query.source_id,
                            source_name: this.$route.query.source_name,
                            edit: "yes"
                        }
                    } else {
                        data = {
                            agent_id: this.$route.query.agent_id,
                            id: res.data,
                            source_id: this.$route.query.source_id,
                            source_name: this.$route.query.source_name,
                        }
                    }
                    this.$router.push({
                        path: "collection4_3",
                        query: data
                    })
                }
            })
        },
        //上一步
        backSteps() {
            let data = {}
            if (this.$route.query.edit == 'yes') {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    source_id: this.$route.query.source_id,
                    source_name: this.$route.query.source_name,
                    edit: "yes"
                }
            } else {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    source_id: this.$route.query.source_id,
                    source_name: this.$route.query.source_name,
                }
            }
            this.$router.push({
                path: "collection4_1",
                query: data
            })
        },
        // 分页显示
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
    },
}
</script>

<style scoped>
/* 按钮设置 */
.step2 .el-table {
    margin-bottom: 20px;
}

.step2 .partFourDiv {
    float: right;
}

.step2 .partFourDiv .el-button {
    margin-bottom: 20px;
}

/* 数据分页 */
.step2 .pageDiv {
    height: 10px;
}
</style>
