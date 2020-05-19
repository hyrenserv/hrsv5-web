<template>
<div class="collectionStructureSet">
    <el-row class="partOne">
        <el-col :span="24">
            <Step :active="active"></Step>
        </el-col>
    </el-row>
    <el-row>
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="en_name" label="英文名" align="center">

            </el-table-column>

            <el-table-column prop="zh_name" label="中文名" align="center">

            </el-table-column>

            <el-table-column prop="is_hbase" label="Hbase" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="is_hbase" @change="handleChangeHbase"></el-checkbox>&nbsp;Hbase
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" :checked="scope.row.is_hbase ==true" v-model="scope.row.is_hbase" @change="selectAllHbase(scope.row.is_hbase,scope.row,scope.$index)"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_solr" label="Solr" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="is_solr" @change="handleChangeSolr"></el-checkbox>&nbsp;Solr
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.is_solr" :checked="scope.row.is_solr ==true" @change="selectAllSolr(scope.row.is_solr,scope.row,scope.$index)"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop=" is_hdfs" label="是否存入HDFS" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="is_hdfs" @change="handleChangeHDFS"></el-checkbox>&nbsp;是否存入HDFS
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.is_hdfs" :checked="scope.row.is_hdfs ==true" @change="selectAllHDFS(scope.row.is_hdfs)"></el-checkbox>
                </template>
            </el-table-column>

        </el-table>
    </el-row>
    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit" size="medium"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:left" @click="backSteps" size="medium">上一步</el-button>
                <el-button type="success" style="float:right" @click="checkFieldsForSaveObjectStorage" size="medium">完 成</el-button>
            </div>
        </el-col>
    </el-row>

    <!-- Hbase弹出框 -->
    <el-dialog title="Hbase" :visible.sync="showDiolag" width="50%" :before-close="beforeClose">
        <el-table :data="arryHabse.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border stripe size="mini">
            <el-table-column label="多列作rowkey的顺序" align="center" prop="col_seq"></el-table-column>

            <el-table-column prop="column_name" label="字段英文名" align="center">
                <template slot-scope="scope">
                    <el-checkbox name="nature" :checked="scope.row.is_rowkey ==true" v-model="scope.row.is_rowkey"></el-checkbox> &nbsp;<span class="spanName">{{scope.row.column_name}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,arryHabse) ">上移</el-button>
                    <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,arryHabse)">下移</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageDiv">
            <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="arryHabse.length"></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelectHbase" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveHbase" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- Solr弹出框 -->
    <el-dialog title=" 查看列" :visible.sync=" solrDiolag" width="50%">
        <el-table :data="arry.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border stripe size="mini">
            <el-table-column prop='col_seq' label="序号" width="74" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="is_solrs" align="center" width="134">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="is_solrs" @change="handleChangeSolrDiolag"></el-checkbox>&nbsp;是否进入Solr
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" :checked="scope.row.is_solr ==true" @change="selectAllSolrDiolag" v-model="scope.row.is_solr"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column label="列名" align="center" prop="column_name">
            </el-table-column>
        </el-table>
        <div class="pageDiv">
            <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="arry.length"></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelectSolr" size="mini" type="danger">取 消</el-button>
            <el-button type="success" @click="saveSolr" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./semiStructuredAgent";
import * as message from "@/utils/js/message";
import Step from "./step";
let index;
let ocsId;
export default {
    components: {
        Step,
    },
    data() {
        return {
            active: 3,
            is_hdfs: '',
            is_solr: '',
            is_hbase: '',
            is_solrs: '',
            showDiolag: false,
            solrDiolag: false,
            tableData: [],
            arry: [],
            arryHabse: [],
            currentPage: 1,
            pagesize: 10,
        }
    },
    mounted() {
        this.searchObjectStorage();
    },
    methods: {
        // 获取初始信息
        searchObjectStorage() {
            functionAll.searchObjectStorage({
                odc_id: this.$route.query.odc_id
            }).then(res => {
                res.data.forEach(item => {
                    if (item.is_hdfs == '0') {
                        item.is_hdfs = false;
                    } else if (item.is_hdfs == '1') {
                        item.is_hdfs = true;
                    }
                    if (item.is_solr == '0') {
                        item.is_solr = false;
                    } else if (item.is_solr == '1') {
                        item.is_solr = true;
                    }
                    if (item.is_hbase == '0') {
                        item.is_hbase = false;
                    } else if (item.is_hbase == '1') {
                        item.is_hbase = true;
                    }
                })
                this.tableData = res.data;
                this.checkAll();

            })
        },
        // 取消存住solr或者hbase保存
        cancelSelectSolr() {
            this.tableData[index].is_solr = false;
            this.solrDiolag = false;
            this.checkAll();
        },
        cancelSelectHbase() {
            this.showDiolag = false;
            this.tableData[index].is_hbase = false;
            this.checkAll();
        },
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList",
                query: {
                    agent_id: this.$route.query.agent_id,
                    odc_id: this.$route.query.odc_id
                }
            })
        },
        // 上一步
        backSteps() {
            this.$router.push({
                name: "collectFileOption"
            })
        },
        // 判断表格表头是否为全选状态
        checkAll() {
            this.tableData.every((item) => {
                if (item.is_hbase == true) {
                    this.is_hbase = true
                } else {
                    this.is_hbase = false
                };
                if (item.is_solr == true) {
                    this.is_solr = true
                } else {
                    this.is_solr = false
                };
                if (item.is_hdfs == true) {
                    this.is_hdfs = true
                } else {
                    this.is_hdfs = false
                };

            })

        },
        // 实现全选和全不选功能 
        handleChangeHbase(val) {
            this.tableData.forEach((item) => {
                if (val == true) {
                    item.is_hbase = true
                } else {
                    item.is_hbase = false
                }

            })
        },
        handleChangeSolr(val) {
            this.tableData.forEach((item) => {
                if (val == true) {
                    item.is_solr = true
                } else {
                    item.is_solr = false
                }

            })
        },
        handleChangeHDFS(val) {
            this.tableData.forEach((item) => {
                if (val == true) {
                    item.is_hdfs = true
                } else {
                    item.is_hdfs = false
                }

            })
        },
        selectAllHbase(val, val2, val3) {
            index = val3;
            ocsId = val2.ocs_id;
            if (val == false) {
                this.selectAllTrue('Hbase');
            } else if (val == true) {
                this.showDiolag = true;
                this.searchHBaseConfInfo(val2);
                this.selectAllTrue('Hbase');

            }
        },
        // 获取hbase信息详情
        searchHBaseConfInfo(val) {
            functionAll.searchHBaseConfInfo({
                ocs_id: val.ocs_id
            }).then(res => {
                res.data.forEach(item => {
                    if (item.is_rowkey == "0") {
                        item.is_rowkey = false;
                    } else if (item.is_rowkey == "1") {
                        item.is_rowkey = true;
                    }
                })
                this.arryHabse = res.data;
            })
        },
        // 保存habse
        saveHbase() {
            let val = this.arryHabse;
            val.forEach(item => {
                if (item.is_rowkey == false) {
                    item.is_rowkey = 0;
                } else if (item.is_rowkey == true) {
                    item.is_rowkey = 1;
                }
                delete item.is_key
                delete item.ocs_id
                delete item.is_solr
                delete item.is_operate
                delete item.is_hbase
                delete item.columnposition
                delete item.column_type
            })

            functionAll.saveHBaseConfInfo({
                object_collect_struct_array: JSON.stringify(val),
                ocs_id: ocsId
            }).then(res => {
                if (res.code == 200) {
                    message.customizTitle('Hbase保存成功', 'success')
                    this.showDiolag = false;
                }
            })
        },
        // 控制表头checkBox true or false
        selectAllTrue(val) {
            this.tableData.every(item => {
                if (val == 'Hbase') {
                    if (item.is_hbase == true) {
                        return this.is_hbase = true;
                    } else {
                        return this.is_hbase = false;
                    }
                } else if (val == 'Solr') {
                    if (item.is_solr == true) {
                        return this.is_solr = true;
                    } else {
                        return this.is_solr = false;
                    }

                } else if (val == 'HDFS') {
                    if (item.is_hdfs == true) {
                        return this.is_hdfs = true;
                    } else {
                        return this.is_hdfs = false;
                    }
                }

            })
        },
        // solr模态框与checkbox
        selectAllSolr(val, val2, val3) {
            index = val3;
            ocsId = val2.ocs_id;
            if (val == false) {
                this.selectAllTrue('Solr');
            } else if (val == true) {
                this.showDiolagData(val2);
                this.solrDiolag = true;
                this.selectAllTrue('Solr');
            }
        },
        // solr模态框全选与反选
        handleChangeSolrDiolag(val) {
            this.arry.forEach((item) => {
                if (val == true) {
                    item.is_solr = true
                } else {
                    item.is_solr = false
                }

            })
        },
        selectAllSolrDiolag() {
            this.arry.every(item => {
                if (item.is_solr == true) {
                    return this.is_solrs = true;
                } else {
                    return this.is_solrs = false;
                }
            })
        },
        //hdfs checkbox
        selectAllHDFS(val) {
            if (val == false) {
                this.selectAllTrue('HDFS');
            } else if (val == true) {
                this.selectAllTrue('HDFS');
            }
        },
        // 弹出框表格信息
        showDiolagData(val) {
            functionAll.searchSolrConfInfo({
                ocs_id: val.ocs_id
            }).then(res => {
                res.data.forEach(item => {
                    if (item.is_solr == "0") {
                        item.is_solr = false;
                    } else if (item.is_solr == "1") {
                        item.is_solr = true;
                    }
                })
                this.arry = res.data;
            })
        },
        // 保存solr
        saveSolr() {
            this.arry.forEach(item => {
                if (item.is_solr == true) {
                    item.is_solr = 1;
                } else {
                    item.is_solr = 0;
                }
            })
            functionAll.saveSolrConfInfo({
                solrConfInfo: JSON.stringify(this.arry),
                ocs_id: ocsId
            }).then(res => {
                if (res.code == 200) {
                    message.customizTitle('Solr保存成功', 'success')
                    this.solrDiolag = false;
                    this.checkAll();

                }
            })
        },
        // 存储采集的保存前检查
        checkFieldsForSaveObjectStorage() {
            let val = this.tableData;
            val.forEach(item => {
                if (item.is_solr == true) {
                    item.is_solr = 1;
                } else {
                    item.is_solr = 0;
                }
                if (item.is_hdfs == true) {
                    item.is_hdfs = 1;
                } else {
                    item.is_hdfs = 0;
                }
                if (item.is_hbase == true) {
                    item.is_hbase = 1;
                } else {
                    item.is_hbase = 0;
                }
            })
            functionAll.checkFieldsForSaveObjectStorage({
                object_storage_array: JSON.stringify(val)
            }).then(res => {
                if (res.code == 200) {
                    this.saveObjectStorage(val);
                }
            })
        },
        //保存存储
        saveObjectStorage(val) {
            functionAll.saveObjectStorage({
                object_storage_array: JSON.stringify(val),
                odc_id: this.$route.query.odc_id
            }).then(res => {
                if (res.code == 200) {
                    message.customizTitle('文件添加成功', 'success');
                    this.$router.push({
                        name: "agentList"
                    });
                }
            })
        },
        // 数据上移
        moveUp(val, data, tableData) {
            if (val > 0) {
                let upDate = tableData[val - 1];
                tableData.splice(val - 1, 1);
                tableData.splice(val, 0, upDate);
            } else {
                this.$message({
                    message: '已经是第一条，不可上移',
                    type: 'warning',
                });
            }
        },
        // 数据下移
        moveDown(val, data, tableData) {
            if (val + 1 === tableData.length) {
                this.$message({
                    message: '已经是最后一条，不可下移',
                    type: 'warning',
                });
            } else {
                let downDate = tableData[val + 1];
                tableData.splice(val + 1, 1);
                tableData.splice(val, 0, downDate);
            }
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.showDiolag = false;
        },
        // 前端分页
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
    },
}
</script>

<style scoped>
.collectionStructureSet .el-row {
    margin-top: 20px;
}

.collectionStructureSet .partFourDiv {
    float: right;
}

.collectionStructureSet .partFour .el-button {
    margin-bottom: 20px
}

.spanName {
    width: 85%;
    display: inline-block;
    text-align: left;
}

.collectionStructureSet .pageDiv {
    margin-top: 10px;
    height: 30px;
}

.collectionStructureSet .page {
    float: right;
}
</style>
