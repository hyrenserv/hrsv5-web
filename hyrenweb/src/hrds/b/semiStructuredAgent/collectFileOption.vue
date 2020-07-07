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
                        <el-button type="success" size="mini" @click="searchCollectColumnStruct(scope.row,scope.$index)">采集列结构</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作码表" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="operationCodeTable = true;searchObjectHandleType(scope.row,scope.$index)">操作码表</el-button>
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
            <el-col :span="6" class="colContent" v-if="showORhidden">
                <!-- <div class="mytree"  hight='200'>
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
                </div> -->

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
                            <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,tableDataColum) " class="buttonSpeical">上移</el-button>
                            <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,tableDataColum)" class="buttonSpeical">下移</el-button>
                            <el-button type="danger" size="mini" @click="deleteArry(scope.$index, scope.row)" class="buttonSpeical">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect(0)" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveTableColum" size="mini">确定</el-button>
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
            <el-button @click="cancelSelect(1)" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveOperationCode" size="mini">确定</el-button>
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
            objectHandleTypes: [],
            checkedDataArr: [],
            defaultProps: {
                children: "children",
                label: "name",
                isLeaf: "leaf",
                disabled: 'disabled'
            },
            englishName: "",
            cnName: "",
            radio: " ",
            dataTypeCode: "",
            upDateWayCode: "",
            optionsCode: "",
            dialogCollectStructure: false,
            operationCodeTable: false,
            width: '',
            showORhidden: false,
            span: '',
            offset: '',
            isDictionary: '',
            enName: '',
            column_index: '',
            handeleType_index: ''

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
            this.column_index = val2;
            // 有数据字典查询采集列信息
            if (this.isDictionary == "1") {
                // 没有保存采集列时的数据回显
                let arr = [];
                if (val.objectCollectStructs != undefined) {
                    if (val.objectCollectStructs.length > 0) {
                        arr = JSON.parse(JSON.stringify(val.objectCollectStructs));
                        this.dialogCollectStructure = true;
                        this.tableDataColum = arr;
                    }
                }
                // 有id通过id查询（编辑的时候）
                if (val.ocs_id) {
                    functionAll.getObjectCollectStructById({
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
                } else {
                    // 通过表名查询（新增的时候）
                    functionAll.getObjectCollectStructByTableName({
                        en_name: val.en_name,
                        odc_id: this.$route.query.odc_id
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
                }
            } else if (this.isDictionary == "0") { //没有数据字典的时候查询采集列信息
                // 没有保存采集列时的数据回显
                let arr = [];
                if (val.objectCollectStructs != undefined) {
                    if (val.objectCollectStructs.length > 0) {
                        arr = JSON.parse(JSON.stringify(val.objectCollectStructs));
                        this.dialogCollectStructure = true;
                        this.tableDataColum = arr;
                        arr.forEach(item => {
                            this.checkedDataArr.push(item.column_name);
                        })
                    }
                }
                this.enName = val.en_name;
                functionAll.getFirstLineInfo({ //没有id的时候通过表名查询左边的树结构信息
                    en_name: val.en_name,
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
                if (val.ocs_id) { //有id时通过id查询右边表格的信息
                    ocSid = val.ocs_id
                    functionAll.getObjectCollectStructList({
                        ocs_id: val.ocs_id
                    }).then(res => {

                    })
                }
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
            if (this.tableDataColum.length > 0) {
                this.tableDataMain[this.column_index].objectCollectStructs = JSON.parse(JSON.stringify(this.tableDataColum));
                this.dialogCollectStructure = false;
                this.data2 = [];
                this.tableDataColum = [];
            } else {
                message.customizTitle('采集列结构不能为空', 'warning')
            }
        },
        //  获取目录下一级
        // append(data) {
        //     let val;
        //     if (data.location) {
        //         val = data.location;
        //     } else {
        //         val = data.name;
        //     }
        //     if (data.isParent == true) {
        //         functionAll.getObjectCollectTreeInfo({
        //             ocs_id: ocSid,
        //             location: val
        //         }).then(res => {
        //             res.data.forEach((item, index) => {
        //                 item.label = item.name;
        //                 if (item.isParent == true) {
        //                     item.children = []
        //                 }
        //             })
        //             data.children = res.data
        //         })
        //     } else {
        //         message.customizTitle('暂无下一级数据', 'warning')
        //     }

        // },
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
                            en_name: this.enName
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
            object.is_key = false;
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
            this.handeleType_index = val2;
            if (this.isDictionary == "1") {
                functionAll.searchObjectHandleType({
                    odc_id: this.$route.query.odc_id,
                    en_name: val.en_name
                }).then(res => {

                })
            } else if (this.isDictionary == "0") {
                this.getCategoryItems("OperationType");
            }
            // ocSid = val.ocs_id

        },
        // 保存操作码表信息
        saveOperationCode() {
            if (this.isDictionary == "0") {
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
                this.tableDataMain[this.handeleType_index].objectHandleTypes = val;
            } else if (this.isDictionary == "1") {
                this.tableDataMain[this.handeleType_index].objectHandleTypes = this.operationType;
            }
            this.operationCodeTable = false;

            // functionAll.saveHandleType({
            //     handleType: JSON.stringify(val),
            //     ocs_id: ocSid
            // }).then(res => {
            //     if (res.code == 200) {
            //         message.customizTitle('操作码表保存成功', 'success')
            //         
            //     }
            // })
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
        cancelSelect(val) {
            if (val == 0) {
                this.data2 = [];
                this.tableDataColum = [];
                this.dialogCollectStructure = false;
            } else {
                this.operationCodeTable = false;
            }
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            if (this.tableDataColum.length > 0) {
                this.tableDataColum.splice(index, 1)
            }
        },
        // 数据上移
        moveUp(val, data, tableData) {
            if (val > 0) {
                let upDate = tableData[val - 1];
                tableData.splice(val - 1, 1);
                tableData.splice(val, 0, upDate);
            } else {
                message.customizTitle("已经是第一条，不可上移", "warning");
            }
        },
        // 数据下移
        moveDown(val, data, tableData) {
            if (val + 1 === tableData.length) {
                message.customizTitle("已经是最后一条，不可下移", "warning");
            } else {
                let downDate = tableData[val + 1];
                tableData.splice(val + 1, 1);
                tableData.splice(val, 0, downDate);
            }
        },
        // 保存采集文件设置前检查
        checkFieldsForSaveObjectCollectTask() {
            // 深拷贝处理参数
            let arrdata = JSON.parse(JSON.stringify(this.tableDataMain));
            arrdata.forEach(item => {
                item.agent_id = this.$route.query.agent_id;
                item.odc_id = this.$route.query.odc_id;
                item.collect_data_type = item.dataTypeCode;
                item.database_code = item.optionsCode;
                delete item.dataTypeCode;
                delete item.optionsCode;
            })
            functionAll.checkFieldsForSaveObjectCollectTask({
                objectCollectTasks: JSON.stringify(arrdata)
            }).then(res => {
                // if (res.code == 200) {
                //     this.saveObjectCollectTask(this.tableDataMain);
                // }

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

/* .collectFileOption .colTableContent {
    margin-top: 1%;
    padding: 0 .5% 2% .5%;
    border: 1px solid #e6e6e6;
} */

/* .netxNUM {
    color: transparent;
} */

.collectFileOption .partFour .el-button {
    margin-bottom: 20px;
}
</style>
