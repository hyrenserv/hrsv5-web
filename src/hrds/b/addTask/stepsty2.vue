<template>
<div class="singlesearch">
    <Step :active="active"></Step>
    <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane name="first">
            <div id="singleTable">
                <div class="rightSearch">
                    <el-input v-model="search" placeholder="多表查询请用|分隔" style="width: 50%;margin-right: 10px;" @keyup.enter.native="searchEnterFun" />
                    <el-button size="mini" type="success" icon="el-icon-search" @click="schfilter(search)">查询</el-button>
                    <el-button size="mini" type="success" @click="getAllTableInfoFun()">查看全表</el-button>
                </div>
                <div class="singleTableinner">
                    <el-table ref="ty_Table" stripe :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" border :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" :row-key="(row)=>{ return row.table_name}" @selection-change="AllhandleSelectionChange" @select-all='allselectD'>
                        <!--  <el-table-column label='' align="center" width="60">
                <template slot="header" slot-scope="scope">
                    <el-checkbox  @change="Allis_SelectColumnFun(tableData,Allis_SelectTable)" v-model="Allis_SelectTable" :checked="Allis_SelectTable"></el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.is_get" @change="every_SelectTablefun(scope.row.is_get,tableData)"></el-checkbox>
                </template>
            </el-table-column> -->
                        <el-table-column type="selection" align="center" width="60" :reserve-selection="true"></el-table-column>
                        <el-table-column label="序号" align="center" width="60">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="table_name" label="表名" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="table_ch_name" label="表中文名" align="center" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.table_ch_name" placeholder="中文名" @blur="inputblur(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="selectCol" label="选择列" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="selectColFun(scope.$index,scope.row)" type="info">选择列</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="ty_handleSizeChange" @current-change="ty_handleCurrentChange" :current-page="currentPage" :page-sizes="[50, 100, 150, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="leftbtn" @click="allbackFun()">返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="rightbtn" @click="finshSubmit()">完成</el-button>
            <el-button type="primary" size="medium" class="rightbtn" @click="backFun()">上一步</el-button>
        </el-col>
    </el-row>
    <!-- 第一个页面 选择列弹层 -->
    <el-dialog title="选择列" :visible.sync="dialogSelectColumn" width="60%">
        <div slot="title" class="header-title">
            <span class="dialogtitle el-icon-caret-right">选择列</span>
            <span class="dialogtoptxt">
                表名:
                <p class="dialogtopname">{{coltable_name}}</p>
            </span>
        </div>
        <el-table ref='table' stripe :data="SelectColumnData" border size="medium" highlight-current-row>
            <el-table-column label="选择列" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)" v-model="Allis_SelectColumn" :checked="Allis_SelectColumn"></el-checkbox>&nbsp;选择列
                </template>
                <template slot-scope="scope">
                    <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.is_get" @change="every_SelectColumnfun(scope.row.is_get,SelectColumnData)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column property="column_name" label="列名" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="column_type" label="字段类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="column_ch_name" label="列中文名" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.column_ch_name" placeholder="中文名" size="medium"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialogSelectColumn=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="colSubmit()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import Step from "./step_ty";
import Loading from "../../components/loading";

export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 1,
            rule: validator.default,
            dialogSelectColumn: false,
            tableData: [],
            activeName: 'first',
            isLoading: false,
            SelectColumnData: [],
            currentPage: 1,
            pagesize: 100,
            search: '',
            selectTable: [], //选中的表
            selectCol: [], //选择列
            coltable_name: '',
            Allis_SelectColumn: false,
            Allis_SelectTable: false,
            SelectColumn2: []
        };
    },
    created() {
        this.dbid = this.$route.query.id;
        this.agentId = this.$route.query.agent_id;
        this.sourceId = this.$route.query.source_id;
        this.sourceName = this.$Base64.decode(this.$route.query.source_name);
        this.edit = this.$route.query.edit;
        // this.getAllTableInfo()
        this.getTableData()
    },
    mounted() {},
    methods: {
        // 获取表格数据
        getTableData() {
            addTaskAllFun.getTableData({
                databaseId: this.$route.query.id
            }).then(res => {
                this.tableData = res.data;
                this.tableData.forEach(item => {
                    this.$refs.ty_Table.toggleRowSelection(item, true)
                })
            })
        },
        ty_handleSizeChange(size) {
            this.pagesize = size
        },
        ty_handleCurrentChange(current) {
            this.currentPage = current
        },
        // 搜索
        schfilter(val) {
               this.isLoading = true
            if (val != "") {
                let params = {};
                params["colSetId"] = this.dbid;
                params["inputString"] = val;
                addTaskAllFun.getTableInfo(params).then(res => {
                       this.isLoading = false
                    if (res.data.length > 0) {
                        let data = res.data;
                        /* for (let i = 0; i < data.length; i++) {
                            if (data[i].table_id && data[i].table_id != "") {
                                data[i].is_get = '1';
                            } else {
                                data[i].is_get = '0';
                            }
                        } */
                        this.tableData = res.data;
                    } else {
                        this.tableData = [];
                    }
                });
            }
        },
        searchEnterFun(e) {
            var keyCode = window.event ? e.keyCode : e.which;
            if (keyCode == 13 && this.search) {
                this.schfilter(this.search);
            }
        },
        // 获取所有表信息
        getAllTableInfoFun() {
            this.onclickAll = true;
            this.Allis_selectionState = false;
            this.tableData.length = 0;
            this.getAllTableInfo()
        },
        getAllTableInfo() {
            this.isLoading = true
            let params = {};
            params["colSetId"] = this.dbid;
            addTaskAllFun.getAllTableInfo(params).then(res => {
                this.isLoading = false
                let data = res.data;
                this.tableData.length = 0
                this.tableData = JSON.parse(JSON.stringify(data));
            });
        },
        // 选择列
        selectColFun(value, row) {
            this.dialogSelectColumn = true
            if (this.SelectColumn2.length > 0) {
                for (let i = 0; i < this.SelectColumn2.length; i++) {
                    if (this.SelectColumn2[i].tablename == this.coltable_name) {
                        let list = this.SelectColumn2[i].data
                        for (let j = 0; j < list.length; j++) {
                            if (list[j].is_get == '1') {
                                this.$refs.table.toggleRowSelection(list[j], true);
                            }
                        }
                        this.SelectColumnData = list
                        break;
                    }
                }

            } else {
                this.SelectColumnShowFun(
                    row.table_name,
                    row.table_id,
                    row.collectState
                );
            }

        },
        //第一页 选择列弹框回显数据调接口
        SelectColumnShowFun(name, id, collectState) {
            let params = {};
            params["colSetId"] = this.dbid;
            params["tableName"] = name;
            params["tableId"] = id ? id : "";
            addTaskAllFun.getColumnsigleInfo(params).then(res => {
                let list = res.data.columnInfo
                this.coltable_name = res.data.tableName
                for (let i = 0; i < list.length; i++) {
                    if (list[i].is_get == '1') {
                        this.$refs.table.toggleRowSelection(list[i], true);
                    }
                }
                this.SelectColumnData = list
            });
        },
        // 选择列确定
        colSubmit() {
            if (this.SelectColumn2.length > 0) {
                for (let i = 0; i < this.SelectColumn2.length; i++) {
                    if (this.SelectColumn2[i].tablename == this.coltable_name) {
                        this.SelectColumn2.splice(i, 1);
                        break;
                    }
                }
                this.SelectColumn2.push({
                    tablename: this.coltable_name,
                    data: this.SelectColumnData,
                });
            } else {
                this.SelectColumn2.push({
                    tablename: this.coltable_name,
                    data: this.SelectColumnData,
                });
            }
            this.dialogSelectColumn = false
        },
        //第一页 选择列的弹框复选框全选
        Allis_SelectColumnFun(items, e) {
            items.forEach((item, i) => {
                if (e) {
                    item.is_get = '1';
                } else {
                    item.is_get = '0';
                }
            });
        },
        // 选择列单选
        every_SelectColumnfun(val, alldata) {
            let count = 0;
            if (val == '1') {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_get == '1') {
                        count++;
                    }
                }
                if (count == alldata.length) {
                    this.Allis_SelectColumn = true;
                } else {
                    this.Allis_SelectColumn = false;
                }
            } else {
                this.Allis_SelectColumn = false;
            }
        },
        // 表全选
        AllhandleSelectionChange(item) {
            this.selectTable = item
        },
        // 表单个选择
        allselectD(item) {
            this.selectTable = item
        },
        // 改变中文名
        inputblur(row) {
            if (this.selectTable.length > 0) {
                for (let i = 0; i < this.selectTable.length; i++) {
                    if (this.selectTable[i].table_name == row.table_name) {
                        this.selectTable[i].table_ch_name = row.table_ch_name
                    }
                }
            }

        },
        // 选择表
        /*  every_SelectTablefun(val, alldata) {
            let count = 0;
            if (val == '1') {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_get == '1') {
                        count++;
                    }
                }
                if (count == alldata.length) {
                    this.Allis_SelectTable =true;
                } else {
                    this.Allis_SelectTable =false;
                }
            } else {
                 this.Allis_SelectTable = false;
            }
        }, */
        // 最终完成点击
        finshSubmit() {
            this.isLoading = true
            let tableColumns = {}
            // this.selectTable和this.SelectColumn2对比表明相同合并
            for (let i = 0; i < this.selectTable.length; i++) {
                for (let j = 0; j < this.SelectColumn2.length; j++) {
                    if (this.selectTable[i].table_name == this.SelectColumn2[j].tablename) {
                        tableColumns[this.SelectColumn2[j].tablename] = this.SelectColumn2[j].data
                    }
                }
            }
            let params = {};
            params["databaseId"] = this.dbid;
            params["agent_id"] = this.agentId;
            params["source_id"] = this.sourceId;
            params["tableInfos"] = JSON.stringify(this.selectTable);
            params["tableColumns"] = JSON.stringify(tableColumns);
            params["dsl_id"] = this.$route.query.dsl_id;
            if (this.$route.query.edit == 'yes') {
                addTaskAllFun.updateTableData(params).then(res => {
                    this.isLoading = false
                    if (res.code == '200') {
                        this.$router.push({
                            path: "/agentList",
                        });
                    }
                })
            } else {
                addTaskAllFun.saveregisterTableData(params).then(res => {
                    this.isLoading = false
                    if (res.code == '200') {
                        this.$router.push({
                            path: "/agentList",
                        });
                    }
                })
            }

        },
        // 返回上一步
        backFun() {
            let data = {};
            if (this.$route.query.edit == 'yes') {
                data = {
                    agent_id: this.agentId,
                    id: this.dbid,
                    source_id: this.sourceId,
                    source_name: this.$Base64.encode(this.sourceName),
                    dsl_id: this.$route.query.dsl_id,
                    edit: 'yes'
                };
            } else {
                data = {
                    agent_id: this.agentId,
                    id: this.dbid,
                    source_id: this.sourceId,
                    source_name: this.$Base64.encode(this.sourceName),
                    dsl_id: this.$route.query.dsl_id,
                };
            }
            this.$router.push({
                path: "/collection1_1",
                query: data
            });
        },
        // 返回
        allbackFun(){
             this.$router.push({
                            path: "/agentList",
                        });
        }
    }

};
</script>

<style scoped>
.singlesearch>>>.el-tabs__content {
    overflow: visible !important;
}

#singleTable {
    position: relative;
}

.singlesearch>>>.el-tabs__nav {
    z-index: -1;
}

.rightSearch {
    /* width: 32%; */
    position: absolute;
    top: -53px;
    right: 0;
}

#singleTable>>>.el-pagination {
    text-align: center;
    margin-top: 6px;
}

.singleTableinner>>>.el-radio {
    color: #3d8dd2;
    margin: 6px 0 0 0;
}

.twopageradior>>>.el-radio {
    color: #3d8dd2;
    margin: -6px 6px 0 0;
}

/* #singleTable >>> .el-table__header tr,
#singleTable >>> .el-table__header th {
  padding: 0;
  height: 40px;
}
#singleTable >>> .el-table__body tr,
#singleTable >>> .el-table__body td {
  padding: 0;
  height: 40px;
}

#singleTable >>> .el-textarea__inner {
  height: 30px;
} */
.rightSearch>>>.el-input__inner {
    height: 30px;
}

.rightSearch>button {
    padding-top: 8px;
}

.locationcenter {
    text-align: center;
    margin-top: 5px;
}

.locationright {
    text-align: right;
}

.leftbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: left;
    margin: 15px;
    margin-bottom: 10px;
}

.rightbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: right;
    margin: 15px;
    margin-bottom: 10px;
}

.topcolumename {
    display: inline-block;
    background: #f3eded;
    color: #ec0b35;
    padding: 2px;
}

.alltable>>>.el-dialog__body {
    padding: 0 20px;
}

.textheight>textarea {
    min-height: 66px !important;
}

.testLinnk {
    text-align: center;
}

.testLinnk>span {
    font-size: 18px;
    color: #409eff;
}

.steps2>>>.el-form-item {
    margin-bottom: 0 !important;
}

.steps2>>>.el-form-item__content::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
    position: absolute;
    left: -8px;
}

.steps2>>>tr>td {
    padding: 0;
}

.steps2>>>tr>td>.cell {
    padding: 22px 10px;
}

.alltabletitle {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #d86b6b;
    background: #f3f0f0;
    margin-left: 4px;
}

.steps2>>>.el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 6px;
    position: absolute;
    top: 100%;
    left: 0%;
}

.steps2>>>.el-textarea>textarea {
    line-height: 14px;
}
</style>
