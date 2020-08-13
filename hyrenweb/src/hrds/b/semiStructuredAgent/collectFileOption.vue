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
            <el-table :data="tableDataMain.slice((ex_destinationcurrentPage - 1) * ex_destinationpagesize, ex_destinationcurrentPage *ex_destinationpagesize)" border stripe size="medium">
                <el-table-column label="序号" width="64" align="center">
                    <template scope="scope">
                        <span>{{scope.$index+(ex_destinationcurrentPage - 1) * ex_destinationpagesize + 1}}</span>
                    </template>
                </el-table-column>

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

                <el-table-column prop="collect_data_type" label="数据类型" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据类型" style="width: 100%;" v-model="scope.row.collect_data_type">
                            <el-option v-for="item in dataType" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column prop="updatetype" label="数据更新方式" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据更新方式" style="width: 100%;" v-model="scope.row.updatetype">
                            <el-option v-for="item in upDateWay" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column prop="database_code" label="数据字符编码" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据字符编码" style="width: 100%;" v-model="scope.row.database_code">
                            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="采集列结构" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="searchCollectColumnStruct(scope.row,scope.$index)">采集列结构</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作码表" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="searchObjectHandleType(scope.row,scope.$index)">操作码表</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-row>
    <el-pagination @size-change="ex_destination_handleSizeChange" @current-change="ex_destination_handleCurrentChange" :current-page="ex_destinationcurrentPage" :page-sizes="[100, 200, 300, 400]" :page-size="ex_destinationpagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableDataMain.length" class="locationcenter"></el-pagination>
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
            <el-col :span="6" class="colContent" v-if="showORhidden">
                <div class="mytree"  hight='200'>
                    <el-tree ref='tree' :data="data2" :check-strictly="true" node-key="name" :default-checked-keys="checkedDataArr" show-checkbox :props="defaultProps" lazy :load="loadNode" accordion :indent='0' @check-change="handleCheckChange">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </el-col>

            <el-col :span=span class="colTableContent" :offset=offset>
                <el-table :data="tableDataColum" border stripe size="medium">
                    <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

                    <el-table-column label="是否为操作字段" width="120" align="center">
                        <template slot-scope="scope">
                            <el-radio v-model="radio" :label="scope.row.column_name">&thinsp;</el-radio>
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
                            <!-- <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,tableDataColum) " class="buttonSpeical">上移</el-button>
                            <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,tableDataColum)" class="buttonSpeical">下移</el-button> -->
                            <el-button type="danger" size="mini" @click="deleteArry(scope.$index, scope.row)" class="buttonSpeical">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect(0)" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveTableColum" size="mini">保 存</el-button>
        </div>
    </el-dialog>

    <!-- 操作码表弹出框 -->
    <el-dialog title="操作码表" :visible.sync="operationCodeTable">
        <el-table :data="operationType" border stripe size="mini">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

            <!-- <el-table-column label="KEY" prop="value" align="center" v-if="this.isDictionary == '0'">
                <template slot-scope="scope">
                    <el-input placeholder="KEY" v-model="scope.row.value" disabled></el-input>
                </template>
            </el-table-column> -->
            <el-table-column label="KEY" prop="handle_type" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="KEY" v-model="scope.row.handle_type" disabled></el-input>
                </template>
            </el-table-column>

            <el-table-column label="VALUE" prop="handle_value" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="VALUE" v-model="scope.row.handle_value"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect(1)" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveOperationCode" size="mini">保 存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./semiStructuredAgent";
import Step from "./step";
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
            operationTypeData: [],
            data2: [],
            objectHandleTypes: [],
            checkedDataArr: [],
            defaultProps: {
                children: "children",
                label: "name",
                isLeaf: "leaf",
                disabled: 'disabled'
            },
            radio: " ",
            dialogCollectStructure: false,
            operationCodeTable: false,
            width: '',
            showORhidden: false,
            span: '',
            offset: '',
            isDictionary: '',
            ocSid: '',
            handeleType_ocSid: '',
            ex_destinationcurrentPage: 1,
            ex_destinationpagesize: 100,

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
                odc_id: this.$route.query.odc_id
            }).then(res => {
                this.isDictionary = res.data.is_dictionary;
                this.tableDataMain = res.data.tableInfo;
            })
        },
        // 查询采集列结构信息
        searchCollectColumnStruct(val, val2) {
            this.ocSid = val.ocs_id;
            // 有数据字典查询采集列信息
            if (this.isDictionary == "1") {
                functionAll.getObjectCollectStruct({
                    odc_id: this.$route.query.odc_id,
                    ocs_id: val.ocs_id,
                    en_name: val.en_name
                }).then(res => {
                    if (res && res.success) {
                        this.dialogCollectStructure = true;
                        this.span = 24;
                        this.offset = 0;
                        this.showORhidden = false;
                        this.width = 72 + '%';
                        this.tableDataColum = res.data;
                        let length = this.tableDataColum.length;
                        for (let i = 0; i < length; i++) {
                            if (this.tableDataColum[i].is_operate == "1") {
                                this.radio = this.tableDataColum[i].column_name;
                            }
                        }
                    }
                })
            } else if (this.isDictionary == "0") { //没有数据字典的时候查询采集列信息
                functionAll.getObjectCollectStructById({ //获取右边表格的信息，可能为空；
                    ocs_id: val.ocs_id
                }).then(res => {
                    if (res && res.success) {
                        if (res.data.length > 0) {
                            res.data.forEach(item => {
                                this.checkedDataArr.push(item.column_name);
                                if (item.is_operate == "1") {
                                    this.radio = item.column_name;
                                }
                            })
                        }
                        this.tableDataColum = res.data;
                    }
                })
                functionAll.getFirstLineTreeInfo({ //通过ocs_id查询左边的树结构信息
                    ocs_id: val.ocs_id,
                    odc_id: this.$route.query.odc_id
                }).then(res => {
                    if (res && res.success) {
                        this.dialogCollectStructure = true;
                        this.span = 17;
                        this.offset = 1;
                        this.showORhidden = true;
                        this.width = 80 + '%';
                        res.data.forEach((item, index) => {
                            if (item.isParent == true) {
                                item.disabled = true;
                                item.leaf = false;
                            } else {
                                item.disabled = false;
                                item.leaf = true;
                            }
                        })
                        this.data2 = res.data;
                    }
                });
            }
        },
        // 保存采集列结构
        saveTableColum() {
            // 更改给后台发送的数据
            let length = this.tableDataColum.length;
            for (let i = 0; i < length; i++) {
                if (this.tableDataColum[i].column_name == this.radio) {
                    this.tableDataColum[i].is_operate = "1"
                } else {
                    this.tableDataColum[i].is_operate = "0"
                }
            }
            // 直接调用接口保存列结构
            functionAll.saveObjectCollectStruct({
                odc_id: this.$route.query.odc_id,
                ocs_id: this.ocSid,
                objectCollectStructs: JSON.stringify(this.tableDataColum)
            }).then(res => {
                if (res && res.success) {
                    this.$Msg.customizTitle('采集列结构保存成功', 'success');
                    this.dialogCollectStructure = false;
                    this.data2 = [];
                    this.tableDataColum = [];
                    this.checkedDataArr = [];
                }
            })
        },
        //  获取目录下一级选择文件夹
        loadNode(node, resolve) {
            if (node.level == 0) {
                return resolve(this.data2)
            }
            if (node.level > 0) {
                setTimeout(() => {
                    functionAll.getObjectCollectTreeInfo({
                            odc_id: this.$route.query.odc_id,
                            location: node.data.location,
                            ocs_id: this.ocSid
                        })
                        .then(res => {
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].isParent == 'true') {
                                    res.data[i].disabled = true;
                                    res.data[i].leaf = false;
                                } else {
                                    res.data[i].disabled = false;
                                    res.data[i].leaf = true;
                                }
                            }
                            resolve(res.data);
                        });

                }, 500);
            }

        },
        // 获取当前选中节点
        handleCheckChange(val, value, val3) {
            let object = {};
            object.column_name = val.name;
            object.column_type = 'varchar(256)';
            object.is_operate = false;
            // 选中节点添加数据表格
            if (value == true) {
                if (val.location) {
                    object.columnposition = val.location;
                } else {
                    object.columnposition = val.name;
                }
                if (JSON.stringify(this.tableDataColum).indexOf(JSON.stringify(object)) === -1) {
                    this.tableDataColum.push(object)
                }
            } else { //选中后取消节点的表格数据
                this.tableDataColum.forEach((item, index) => {
                    if (item.column_name == object.column_name) {
                        this.tableDataColum.splice(index, 1)
                    }
                })
            }

        },
        // 获取操作码表
        searchObjectHandleType(val, val2) {
            this.handeleType_ocSid = val.ocs_id;
            this.getCategoryItems("OperationType"); //获取代码项；
            if (this.isDictionary == "1") { //有数据字典获取操作码表    
                functionAll.searchObjectHandleType({
                    odc_id: this.$route.query.odc_id,
                    en_name: val.en_name
                }).then(res => {
                    if (res && res.success) {
                        res.data.forEach(item => {
                            this.operationTypeData.forEach(val => {
                                if (item.handle_type == val.code) {
                                    item.handle_type = val.value;
                                }
                            })
                        })
                        this.operationType = res.data;
                        this.operationCodeTable = true;
                    }
                })
            } else if (this.isDictionary == "0") { //没有数据字典获取操作码表
                functionAll.getObjectHandleType({
                    ocs_id: val.ocs_id
                }).then(res => {
                    if (res.data.length > 0) { //接口数据为空时显示代码项数据
                        res.data.forEach(item => {
                            this.operationTypeData.forEach(val => {
                                if (item.handle_type == val.code) {
                                    item.handle_type = val.value;
                                }
                            })

                        })
                        this.operationType = res.data;
                    } else {
                        this.operationType.forEach(item => {
                            item.handle_type = item.value;
                        })
                    }
                    this.operationCodeTable = true;
                })
            }
        },
        // 保存操作码表信息
        saveOperationCode() {
            // 后台传参处理
            let arr = [];
            arr = JSON.parse(JSON.stringify(this.operationType));
            arr.forEach((item) => {
                if (item.catCode && item.code && item.catValue) { //判断第一次通过代码项保存还是其他方式保存
                    item.handle_type = item.code;
                    delete item.value;
                    delete item.catCode;
                    delete item.code;
                    delete item.catValue;
                } else {
                    this.operationTypeData.forEach(val => {
                        if (item.handle_type == val.value) {
                            item.handle_type = val.code
                        }
                    })
                }
            })
            functionAll.saveObjectHandleType({ //保存方法调用
                ocs_id: this.handeleType_ocSid,
                objectHandleTypes: JSON.stringify(arr)
            }).then(res => {
                if (res && res.success) {
                    this.$Msg.customizTitle('操作码表保存成功', 'success');
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
            if (this.$route.query.edit == 'yes') {
                this.$router.push({
                    name: "collectOption",
                    query: {
                        agent_id: this.$route.query.agent_id,
                        id: this.$route.query.odc_id,
                        edit: this.$route.query.edit
                    }
                })
            } else {
                this.$router.push({
                    name: "collectOption",
                    query: {
                        agent_id: this.$route.query.agent_id,
                        id: this.$route.query.odc_id
                    }
                })
            }
        },
        // 下一步
        nextSteps() {
            this.saveObjectCollectTask();
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
                        this.operationTypeData = res.data;
                    }
                })
            }
        },
        // 取消弹出框
        cancelSelect(val) {
            if (val == 0) {
                this.data2 = [];
                this.tableDataColum = [];
                this.checkedDataArr = [];
                this.dialogCollectStructure = false;
            } else {
                this.operationCodeTable = false;
            }
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            if (this.tableDataColum.length > 0) {
                this.tableDataColum.splice(index, 1);
            }
        },
        // 数据上移
        moveUp(val, data, tableData) {
            if (val > 0) {
                let upDate = tableData[val - 1];
                tableData.splice(val - 1, 1);
                tableData.splice(val, 0, upDate);
            } else {
                this.$Msg.customizTitle("已经是第一条，不可上移", "warning");
            }
        },
        // 数据下移
        moveDown(val, data, tableData) {
            if (val + 1 === tableData.length) {
                this.$Msg.customizTitle("已经是最后一条，不可下移", "warning");
            } else {
                let downDate = tableData[val + 1];
                tableData.splice(val + 1, 1);
                tableData.splice(val, 0, downDate);
            }
        },
        // 保存采集文件设置
        saveObjectCollectTask() {
            functionAll.saveObjectCollectTask({
                objectCollectTasks: JSON.stringify(this.tableDataMain),
                agent_id: this.$route.query.agent_id,
                odc_id: this.$route.query.odc_id
            }).then(res => {
                if (res && res.success) {
                    if (this.$route.query.edit == 'yes') {
                        this.$router.push({
                            name: "dataStorage",
                            query: {
                                agent_id: this.$route.query.agent_id,
                                odc_id: this.$route.query.odc_id,
                                edit: this.$route.query.edit
                            }
                        })
                    } else {
                        this.$router.push({
                            name: "dataStorage",
                            query: {
                                agent_id: this.$route.query.agent_id,
                                odc_id: this.$route.query.odc_id
                            }
                        })
                    }
                }
            })
        },
        //分页
        ex_destination_handleCurrentChange(current) {
            this.ex_destinationcurrentPage = current;
        },
        ex_destination_handleSizeChange(size) {
            this.ex_destinationpagesize = size;
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

/* .collectFileOption .buttonSpeical {
    padding: 7px 1px;
} */

/* 分页 */
.locationcenter {
    text-align: center;
    margin-top: 5px;
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

.collectFileOption .partFour .el-button {
    margin-bottom: 20px;
}
</style>
