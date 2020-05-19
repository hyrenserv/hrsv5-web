<template>
<div class="collectFileOption">
    <el-row class="partOne">
        <el-col :span="24">
            <Step :active="active"></Step>
        </el-col>
    </el-row>

    <el-row class="partTwo">
        <el-row class="spanCollect"><i class="fa fa-signal"></i>采集文件列表</el-row>
        <div class="partTwoContent">
            <el-table :data="tableDataMain" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                <el-table-column prop="en_name" label="英文名" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="英文名" v-model="scope.row.en_name"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="zh_name" label="中文名" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="中文名" v-model="scope.row.zh_name"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="dataTypeCode" label="数据类型" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据类型" style="width: 100%;" v-model="scope.row.dataTypeCode">
                            <el-option v-for="item in dataType" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column prop="upDateWayCode" label="数据更新方式" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据更新方式" style="width: 100%;" v-model="scope.row.upDateWayCode">
                            <el-option v-for="item in upDateWay" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column prop="optionsCode" label="数据字符编码" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据字符编码" style="width: 100%;" v-model="scope.row.optionsCode">
                            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="采集列结构" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="searchCollectColumnStruct(scope.row)">采集列结构</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作码表" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="operationCodeTable = true;searchObjectHandleType(scope.row)">操作码表</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页内容 -->
            <!-- <el-row class="pagination">
                <el-pagination prev-text="上一页" next-text="下一页" @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
            </el-row> -->
        </div>
    </el-row>
    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit" size="medium"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:left" @click="backSteps" size="medium">上一步</el-button>
                <el-button type="primary" style="float:right" @click="nextSteps" size="medium"> 下一步</el-button>
            </div>
        </el-col>
    </el-row>

    <!-- 采集列结构弹出框 -->
    <el-dialog title="采集列结构" :visible.sync="dialogCollectStructure" :width=width>
        <el-row class="rowDioloag">
            <el-col :span="8" class="colContent" v-if="showORhidden">
                <div class="mytree"  hight='200'>
                    <el-tree :data="data2" :check-strictly="true" show-checkbox @check-change="handleCheckChange">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span @click="() => append(data)" :title="node.label">{{ node.label }}</span>
                            <span>
                                <el-button class="netxNUM" type="text" @click="() => append(data)">
                                    点击获取下一级
                                </el-button>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </el-col>

            <el-col :span=span class="colTableContent" :offset=offset>
                <el-table :data="tableDataColum" border stripe size="mini" :height=height>
                    <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

                    <el-table-column prop="is_key" label="是否为主键" width="90" align="center">
                        <template slot-scope="scope">
                            <el-checkbox name="nature" v-model="scope.row.is_key"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column prop="is_operate" label="是否为操作字段" width="120" align="center">
                        <template slot-scope="scope">
                            <el-checkbox name="nature" v-model="scope.row.is_operate"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column prop="column_name" label="列名称" align="center">
                        <template slot-scope="scope">
                            <el-input placeholder="列名称" v-model="scope.row.column_name"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="column_type" label="类型" align="center">
                        <template slot-scope="scope">
                            <el-input placeholder="类型" v-model="scope.row.column_type"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="columnposition" label="字段位置" align="center">
                        <template slot-scope="scope">
                            <el-input placeholder="字段位置" v-model="scope.row.columnposition"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="134" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,tableDataColum) " class="buttonSpeical">上移</el-button>
                            <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,tableDataColum)" class="buttonSpeical">下移</el-button>
                            <el-button type="danger" size="mini" @click="deleteArry(scope.$index, scope.row)" class="buttonSpeical">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveTableColum" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 操作码表弹出框 -->
    <el-dialog title="操作码表" :visible.sync="operationCodeTable">
        <el-table :data="operationType" border stripe size="mini">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

            <el-table-column label="KEY" prop="value" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="KEY" v-model="scope.row.value" disabled></el-input>
                </template>
            </el-table-column>

            <el-table-column label="VALUE" prop="handle_value" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="VALUE" v-model="scope.row.handle_value"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveOperationCode" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./semiStructuredAgent";
import * as message from "@/utils/js/message";
import Step from "./step";
let ocSid;
export default {
    components: {
        Step,
    },
    data() {
        return {
            active: 1,
            tableData: [],
            options: [],
            dataType: [],
            tableDataMain: [],
            tableDataColum: [],
            upDateWay: [],
            operationType: [],
            data2: [],
            englishName: "",
            cnName: "",
            dataTypeCode: "",
            upDateWayCode: "",
            optionsCode: "",
            dialogCollectStructure: false,
            operationCodeTable: false,
            width: '',
            showORhidden: false,
            span: '',
            offset: '',
            height: ''

        }
    },
    mounted() {
        // 获取代码项和页面初始值
        this.searchObjectCollectTask();
        this.getCategoryItems("DataBaseCode");
        this.getCategoryItems("CollectDataType");
        this.getCategoryItems("UpdateType");
    },
    methods: {
        // 获取采集文件设置初始数据
        searchObjectCollectTask() {
            functionAll.searchObjectCollectTask({
                odc_id: this.$route.query.odc_id,
                agent_id: this.$route.query.agent_id
            }).then(res => {
                this.tableDataMain = res.data;
            })
        },
        // 查询采集列结构信息
        searchCollectColumnStruct(val) {
            ocSid = val.ocs_id
            functionAll.searchCollectColumnStruct({
                ocs_id: val.ocs_id
            }).then(res => {
                if (res.code == 200) {
                    this.dialogCollectStructure = true;
                    if (res.data.isDictionary == "1") {
                        this.span = 24;
                        this.offset = 0;
                        this.height = 400;
                        this.showORhidden = false;
                        this.width = 70 + '%';
                        this.tableDataColum = res.data.objectStructList;
                        let length = this.tableDataColum.length;
                        for (let i = 0; i < length; i++) {
                            if (this.tableDataColum[i].is_key == "0") {
                                this.tableDataColum[i].is_key = false;
                            } else if (this.tableDataColum[i].is_key == "1") {
                                this.tableDataColum[i].is_key = true;
                            }
                            if (this.tableDataColum[i].is_operate == "0") {
                                this.tableDataColum[i].is_operate = false;
                            } else if (this.tableDataColum[i].is_operate == "1") {
                                this.tableDataColum[i].is_operate = true;
                            }
                        }
                    } else if (res.data.isDictionary == "0") {
                        this.height = 300;
                        this.span = 15;
                        this.offset = 1;
                        this.showORhidden = true;
                        this.width = 94 + '%';
                        res.data.treeConstruct.forEach((item, index) => {
                            item.label = item.name;
                            if (item.isParent == true) {
                                item.children = []
                            }
                        })
                        this.data2 = res.data.treeConstruct;
                    }

                }
            })
        },
        // 保存采集列结构
        saveTableColum() {
            let length = this.tableDataColum.length;
            for (let i = 0; i < length; i++) {
                if (this.tableDataColum[i].is_key == false) {
                    this.tableDataColum[i].is_key = 0;
                } else if (this.tableDataColum[i].is_key == true) {
                    this.tableDataColum[i].is_key = 1;
                }
                if (this.tableDataColum[i].is_operate == false) {
                    this.tableDataColum[i].is_operate = 0;
                } else if (this.tableDataColum[i].is_operate == true) {
                    this.tableDataColum[i].is_operate = 1;
                }
                this.tableDataColum[i].col_seq = i + 1;
            }
            functionAll.saveCollectColumnStruct({
                collectStruct: JSON.stringify(this.tableDataColum),
                ocs_id: ocSid
            }).then(res => {
                if (res.code == 200) {
                    message.customizTitle('采集列结构保存成功', 'success')
                    this.dialogCollectStructure = false;
                    this.tableDataColum = [];
                }
            })
        },
        //  获取目录下一级
        append(data) {
            let val;
            if (data.location) {
                val = data.location;
            } else {
                val = data.name;
            }
            if (data.isParent == true) {
                functionAll.getObjectCollectTreeInfo({
                    ocs_id: ocSid,
                    location: val
                }).then(res => {
                    res.data.forEach((item, index) => {
                        item.label = item.name;
                        if (item.isParent == true) {
                            item.children = []
                        }
                    })
                    data.children = res.data
                })
            } else {
                message.customizTitle('暂无下一级数据', 'warning')
            }

        },
        // 获取当前选中节点
        handleCheckChange(val, value, val3) {
            if (val.children) {
                if (val.children == 0) {
                    message.customizTitle('请先打开节点', 'warning')
                } else {
                    if (val.isParent = false) {
                        let obj = {};
                        obj.column_name = val.name;
                        obj.column_type = 'varchar(256)';
                        obj.is_key = true;
                        obj.is_operate = true;
                        if (val.location) {
                            obj.columnposition = val.location;
                        } else {
                            obj.columnposition = val.name;
                        }
                        if (JSON.stringify(this.tableDataColum).indexOf(JSON.stringify(obj)) === -1) {
                            this.tableDataColum.push(obj)
                        } else {
                            obj = {}
                        }
                    }

                }
            } else {
                let object = {};
                object.column_name = val.name;
                object.column_type = 'varchar(256)';
                object.is_key = false;
                object.is_operate = false;
                if (val.location) {
                    object.columnposition = val.location;
                } else {
                    object.columnposition = val.name;
                }
                if (JSON.stringify(this.tableDataColum).indexOf(JSON.stringify(object)) === -1) {
                    this.tableDataColum.push(object)
                } else {
                    object = {}
                }
            }

        },
        // 获取操作码表
        searchObjectHandleType(val) {
            ocSid = val.ocs_id
            this.getCategoryItems("OperationType");
        },
        // 保存操作码表信息
        saveOperationCode() {
            this.operationType.forEach((item) => {
                if (item.value == 'INSERT') {
                    item.handle_type = item.code;
                } else if (item.value == 'UPDATE') {
                    item.handle_type = item.code;
                } else if (item.value == 'DELETE') {
                    item.handle_type = item.code;
                }
            })
            let val = this.operationType;
            val.forEach(item => {
                delete item.value;
                delete item.catCode;
                delete item.code;
                delete item.catValue;
            })
            functionAll.saveHandleType({
                handleType: JSON.stringify(val),
                ocs_id: ocSid
            }).then(res => {
                if (res.code == 200) {
                    message.customizTitle('操作码表保存成功', 'success')
                    this.operationCodeTable = false;
                }
            })
        },
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 上一步
        backSteps() {
            this.$router.push({
                name: "collectOption",
                query: {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.odc_id
                }
            })
        },
        // 下一步
        nextSteps() {
            this.checkFieldsForSaveObjectCollectTask();
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "CollectDataType") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.dataType = res.data;
                    }
                })
            } else if (e == "DataBaseCode") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.options = res.data;
                    }
                })
            } else if (e == "UpdateType") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.upDateWay = res.data;
                    }
                })
            } else if (e == "OperationType") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        res.data.forEach(item => {
                            item.handle_value = item.value;
                        })
                        this.operationType = res.data;
                    }
                })
            }
        },
        // 取消弹出框
        cancelSelect() {
            this.tableDataColum = [];
            this.operationCodeTable = false;
            this.dialogCollectStructure = false;
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            if (this.tableDataColum.length > 1) {
                this.tableDataColum.splice(index, 1)
            } else if (this.tableDataColum.length <= 1) {
                this.$message({
                    showClose: true,
                    message: '请至少填写一项',
                    type: 'warning',
                    duration: 0
                });
            }

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
        // 保存采集文件设置前检查
        checkFieldsForSaveObjectCollectTask() {
            functionAll.checkFieldsForSaveObjectCollectTask({
                objColTask: JSON.stringify(this.tableDataMain)
            }).then(res => {
                if (res.code == 200) {
                    this.saveObjectCollectTask(this.tableDataMain);
                }

            })
        },
        // 保存采集文件设置
        saveObjectCollectTask(val) {
            functionAll.saveObjectCollectTask({
                object_collect_task_array: JSON.stringify(val),
                agent_id: this.$route.query.agent_id,
                odc_id: this.$route.query.odc_id
            }).then(res => {
                if (res.code == 200) {
                    this.$router.push({
                        name: "collectionStructureSet",
                        query: {
                            agent_id: this.$route.query.agent_id,
                            odc_id: this.$route.query.odc_id
                        }
                    })
                }

            })
        }
    }
}
</script>

<style scoped>
.collectFileOption .partTwo {
    padding: 0 0 2% 0;
    width: 100%;
    border: 1px solid #e6e6e6;
}

.collectFileOption .partTwoContent {
    padding: 0 1.5%;
}

/* 行设置 */
.collectFileOption .el-row {
    margin-top: 20px;
}

.collectFileOption .partTwo .spanCollect {
    width: 100%;
    background-color: #f5f5f5;
    margin-top: 0;
    height: 40px;
    line-height: 40px;
    padding-left: 2%;
}

/* 表格设置 */
.collectFileOption .el-table {
    margin-top: 10px;
}

/* 按钮设置 */
.collectFileOption .partFourDiv {
    float: right;
}

.collectFileOption.partFourDiv .el-button {
    margin-bottom: 20px;
}

.collectFileOption .buttonSpeical {
    padding: 7px 1px;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}

/* 弹出框样式 */
.collectFileOption .rowDioloag {
    margin-top: 0px;
    border: 1px solid #e6e6e6;
    padding: 0 1% 2% 1%;
}

.collectFileOption .colContent {
    padding: 1% 1% 2% 1%;
    margin-top: 1%;
    border: 1px solid #e6e6e6;
}

.collectFileOption .colTableContent {
    margin-top: 1%;
    padding: 0 .5% 2% .5%;
    border: 1px solid #e6e6e6;
}

.netxNUM {
    color: transparent;
}

.collectFileOption .partFour .el-button {
    margin-bottom: 20px;
}
</style>
