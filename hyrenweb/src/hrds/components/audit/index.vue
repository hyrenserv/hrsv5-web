<template>
<div id='bbgl'>
    <el-dialog :visible.sync="dialogFormAudit" width="85%" top="50px" :show-close="false" :destroy-on-close="true">
        <el-row class='topTitle'>
            <span class='el-icon-location'>审计详情</span>
            <el-button type="info" size="mini" @click="dialogFormAudit = false" style="position: relative;float: right;">取消</el-button>
            <el-button type="success" size="mini" @click="activeBtn" style="position: relative;float: right;right: 20px;">审批</el-button>
        </el-row>
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="tabPosition" style="height: 550px;" :stretch="true"> -->
        <!-- <el-tab-pane label="上传信息" name="first"> -->
        <el-row>
            <el-row style="text-align: left;">
                <h3>基本信息</h3>
            </el-row>
            <el-table stripe size="mini" height="500" :data="tableData" :show-header="false">
                <el-table-column label="表名" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.tableName}}
                    </template>
                </el-table-column>
                <template>
                    <el-table-column label="表中文名" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-if="scope.row[scope.row.tableName]['originTableName原表中文名'] != null">
                                <p>原名称：【{{scope.row[scope.row.tableName]['originTableName原表中文名']}}】</p>
                                <p>修改后：【{{scope.row[scope.row.tableName]['updateTableChName更新后表中文名']}}】</p>
                            </div>
                            <div v-else-if="scope.row[scope.row.tableName]['addTableChName新增表中文名'] != null">
                                <p>新增表中文名：【{{scope.row[scope.row.tableName]['addTableChName新增表中文名']}}】</p>
                            </div>
                        </template>
                    </el-table-column>
                </template>
                <template>
                    <el-table-column label="表卸数方式" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!-- {{scope.row[scope.row.tableName]}} -->
                            <div v-if="scope.row[scope.row.tableName]['originUnloadType原卸数方式'] != null">
                                <p>原卸数方式：【{{scope.row[scope.row.tableName]['originUnloadType原卸数方式']}}】</p>
                                <p>修改后：【{{scope.row[scope.row.tableName]['updateUnloadType更新后卸数方式']}}】</p>
                            </div>
                            <div v-else-if="scope.row[scope.row.tableName]['addUnloadType新增卸数方式'] != null">
                                <p>新增卸数：【{{scope.row[scope.row.tableName]['addUnloadType新增卸数方式']}}】</p>
                            </div>
                        </template>
                    </el-table-column>
                </template>
                <template>
                    <el-table-column label="数据落地格式" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!-- {{scope.row[scope.row.tableName]}} -->

                            <div v-if="scope.row[scope.row.tableName]['originType原表落地方式'] != null">
                                <p>原落地格式：【{{scope.row[scope.row.tableName]['originType原表落地方式']}}】</p>
                                <p>修改后：【{{scope.row[scope.row.tableName]['updateType更新后表落地方式']}}】</p>
                            </div>
                            <div v-else-if="scope.row[scope.row.tableName]['addTableType新增表落地方式'] != null">
                                <p>新增落地格式：【{{scope.row[scope.row.tableName]['addTableType新增表落地方式']}}】</p>
                            </div>
                        </template>
                    </el-table-column>
                </template>
                <template>
                    <el-table-column label="表字段" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-for="item in scope.row[scope.row.tableName]['columnInfo']" :key="item.columnName字段">
                                <dl v-if="item.originColumnType原字段类型 != null">
                                    <dt>字段名称【{{item.columnName字段}}】</dt>
                                    <dd>原类型【{{item.originColumnType原字段类型}}】</dd>
                                    <dt>修改后【{{item.updateColumnType更新字段类型}}】</dt>
                                </dl>
                                <dl v-else-if="item.addColumnName字段 != null">
                                    <dt>新增字段【{{item.addColumnName字段}}】</dt>
                                    <dd>新增类型【{{item.addColumnType新增字段类型}}】</dd>
                                </dl>
                                <!-- <p>原名称：【{{item.columnName字段}}】</p>
                                        <p>原类型：【{{item.originColumnType原字段类型}}】</p>
                                        <p>修改后：【{{item.updateColumnType更新字段类型}}】</p> -->
                            </div>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </el-row>
        <!-- </el-tab-pane> -->
        <!-- <el-tab-pane label="表影响信息" name="jsmind_table"> -->
        <!-----------------------------表影响开始--------------------------->
        <!-- <el-col style="text-align: left;">对表的影响</el-col> -->
        <el-row>
            <el-divider></el-divider>
            <el-row>
                <h3>上下游作业影响</h3>
            </el-row>
            <!-- <h3 class="medium">{{ item }}</h3> -->
            <el-carousel indicator-position="outside" height="500px">
                <el-carousel-item v-for="item in etlJob" :key="item.tableName">
                    <h3>{{ item.tableNameem }}</h3>
                    <div :id="item.tableName" :style="{width: '100%', height: '500px'}"></div>
                </el-carousel-item>
            </el-carousel>
        </el-row>
        <!-----------------------------表影响结束--------------------------->
        <!-- </el-tab-pane> -->
        <!-- <el-tab-pane label="上下游作业影响" name="jsmind_job"> -->
        <!-----------------------------表作业影响开始--------------------------->
        <!-- <el-col style="text-align: left;">对上下游作业影响</el-col> -->
        <el-row>
            <el-divider></el-divider>
            <el-row>
                <h3>表影响</h3>
            </el-row>
            <el-carousel indicator-position="outside" height="500px">
                <el-carousel-item v-for="item in dclTable" :key="item.tableName">
                    <h3>{{ item.tableNameem }}</h3>
                    <div :id="item.tableName" :style="{width: '100%', height: '500px'}"></div>
                </el-carousel-item>
            </el-carousel>
        </el-row>
        <!-----------------------------表作业影响结束--------------------------->
        <!-- </el-tab-pane> -->
        <!-- </el-tabs> -->
    </el-dialog>
</div>
</template>

<script>
import jsMind from 'jsmind';
require('@/assets/css/jsmind.css');
export default {
    props: ['dialogFormAudit', 'excelAuditData'],
    data() {
        return {
            showOrHidden: false,
            activeName: 'first',
            tabPosition: 'left',
            etlJob: [],
            mind: null,
            tableData: [],
            auditData: [],
            etlAllData: [],
            dclTable: []

        }
    },
    mounted() {
        this.auditData.push(this.excelAuditData.table)
        this.etlAllData.push(this.excelAuditData.etlJob)
        this.auditData.map(item => {
            item.tableList.forEach((key, val) => {
                let obj = {}
                obj[key] = item[key]
                obj['tableName'] = key
                this.tableData.push(obj)
            })
        })

        //////////////////////////////////上下游作业影响/////////////////////////
        for (let key in this.excelAuditData.etlJob) {
            let obj = {}
            obj['etlData'] = this.excelAuditData.etlJob[key]
            obj['tableName'] = 'dclTable' + key;
            this.etlJob.push(obj)
        }

        /////////////////////////////////表影影响///////////////////////////////
        for (let key in this.excelAuditData.dclTable) {
            let obj = {}
            obj['etlData'] = this.excelAuditData.dclTable[key]
            obj['tableName'] = 'tableName' + key;
            this.dclTable.push(obj)
        }

        setTimeout(() => {
            this.etlJob.map(item => {
                this.load_jsmind(item.tableName, item.etlData)
            })
            this.dclTable.map(item => {
                this.load_jsmind(item.tableName, item.etlData)
            })
        }, 1000)
    },
    methods: {
        // 关闭弹框之前
        beforeClose() {
            this.tableData = [];
        },
        load_jsmind(id, data) {
            let options = {
                container: id,
                editable: false,
                theme: 'primary'
            }
            let mind = {
                'meta': {},
                'format': 'node_array',
                'data': data
            }
            jsMind.show(options, mind)
        },
        activeBtn() {
            this.$parent.excelUpload(true)
        }
    }
}
</script>

<style scoped>

</style>
