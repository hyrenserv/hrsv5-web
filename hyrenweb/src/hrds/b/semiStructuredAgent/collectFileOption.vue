<template>
<div class="collectFileOption">
    <el-row class="partOne">
        <el-col :span="24">
            <el-steps :active="active" finish-status="success" align-center style="margin: 10px 0 20px 0;">
                <el-step title="步骤 1" description="采集设置"></el-step>
                <el-step title="步骤 2" description="采集文件设置"></el-step>
                <el-step title="步骤 3" description="采集结构化设置"></el-step>
                <el-step title="步骤 4" description="存储设置"></el-step>
            </el-steps>
        </el-col>
    </el-row>

    <el-row class="partTwo">

        <el-row class="spanCollect"><i class="fa fa-signal"></i>采集文件列表</el-row>
        <el-row>
            <el-button size="mini" type="success" @click="addOneRow">添加</el-button>
        </el-row>
        <div class="partTwoContent">

            <el-table :data="tableData" border stripe size="mini">
                <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                <el-table-column prop="datasource_name" label="英文名" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="英文名" v-model="englishName"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="dep_name" label="中文名" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="中文名" v-model="cnName"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="数据类型" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据类型" style="width: 100%;" v-model="dataTypeCode">
                            <el-option v-for="item in dataType" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="数据更新方式" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据更新方式" style="width: 100%;" v-model="upDateWayCode">
                            <el-option v-for="item in upDateWay" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="数据字符编码" align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="数据字符编码" style="width: 100%;" v-model="optionsCode">
                            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code"> </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="采集列结构" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="dialogCollectStructure = true">采集列结构</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作码表" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="operationCodeTable = true">操作码表</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页内容 -->
            <el-row class="pagination">
                <el-pagination prev-text="上一页" next-text="下一页" @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
            </el-row>
        </div>
    </el-row>
    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit" size="medium"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:left" @click="backSteps" size="medium"><i class="el-icon-back"></i>上一步</el-button>
                <el-button type="primary" style="float:right" @click="nextSteps" size="medium"> 下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>

    <!-- 采集列结构弹出框 -->
    <el-dialog title="采集列结构" :visible.sync="dialogCollectStructure" width="96%">
        <el-row class="rowDioloag">
            <el-col :span="7" class="colContent">
                <el-tree :data="data2" show-checkbox :props="defaultProps" @check-change="handleCheckChange">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button class="netxNUM" type="text" @click="() => append(data)">
                                点击获取下一级目录，回去对应的不同目录下的不同目录展示出来。
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </el-col>

            <el-col :span="16" class="colTableContent" :offset="1">
                <el-table :data="tableData" border stripe size="mini">
                    <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

                    <el-table-column prop="datasource_name" label="是否为主键" width="90" align="center">
                        <template slot-scope="scope">
                            <el-checkbox name="nature"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column prop="dep_name" label="是否为操作字段" width="120" align="center">
                        <template slot-scope="scope">
                            <el-checkbox name="nature"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column label="列名称" align="center">
                        <template slot-scope="scope">
                            <el-input placeholder="中文名" v-model="cnName"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="类型" align="center">
                        <template slot-scope="scope">
                            <el-input placeholder="中文名" v-model="cnName"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="字段位置" align="center">
                        <template slot-scope="scope">
                            <el-input placeholder="中文名" v-model="cnName"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="134" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,tableData) " class="buttonSpeical">上移</el-button>
                            <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,tableData)" class="buttonSpeical">下移</el-button>
                            <el-button type="danger" size="mini" @click="deleteArry(scope.$index, scope.row)" class="buttonSpeical">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="dialogSelectfolder = false" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 操作码表弹出框 -->
    <el-dialog title="操作码表" :visible.sync="operationCodeTable">
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

            <el-table-column label="KEY" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="中文名" v-model="cnName"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="VALUE" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="中文名" v-model="cnName"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./semiStructuredAgent";
export default {
    data() {
        return {
            active: 1,
            tableData: [],
            options: [],
            dataType: [],
            englishName: "",
            cnName: "",
            dataTypeCode: "",
            upDateWayCode: "",
            optionsCode: "",
            dialogCollectStructure: false,
            operationCodeTable: false

        }
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 上一步
        backSteps() {
            this.$router.push({
                name: "collectOption"
            })
        },
        // 下一步
        nextSteps() {
            this.$router.push({
                name: "collectionStructureSet"
            })
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "CollectDataType") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    this.dataType = res.data;
                })
            } else if (e == "DataBaseCode") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    this.options = res.data;
                })
            } else if (e == "ExecuteWay") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    this.upDateWay = res.data;
                })
            }
        },
        // 取消弹出框
        cancelSelect() {
            this.operationCodeTable = false;
            this.dialogCollectStructure = false;
        },
        // 添加新的一行数据
        addOneRow() {
            this.tableData.push({});
            this.getCategoryItems("DataBaseCode");
            this.getCategoryItems("CollectDataType");
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            if (this.tableData.length > 1) {
                this.tableData.splice(index, 1)
            } else if (this.tableData.length <= 1) {
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
        }
    }
}
</script>

<style scoped>
.collectFileOption {
    padding: 0 1% 0 1%;
}

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
    padding: 0 1% 2% 1%;
    margin-top: 1%;
    border: 1px solid #e6e6e6;
}

.collectFileOption .colTableContent {
    margin-top: 1%;
    padding: 0 .5% 2% .5%;
    border: 1px solid #e6e6e6;
}

.collectFileOption .partFour .el-button {
    margin-bottom: 20px;
}
</style>
