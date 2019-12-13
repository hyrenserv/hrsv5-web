<template>
<div class="collectFileOption">
    <el-row class="partOne">
        <el-col :span="24">
            <el-steps :active="active" finish-status="success" align-center style="margin: 10px 60px 20px 60px;">
                <el-step title="步骤 1" description="采集设置"></el-step>
                <el-step title="步骤 2" description="采集文件设置"></el-step>
                <el-step title="步骤 3" description="采集结构化设置"></el-step>
                <el-step title="步骤 4" description="存储设置"></el-step>
            </el-steps>
        </el-col>
    </el-row>

    <el-row class="partTwo">

        <el-row class="spanCollect"><i class="fa fa-signal"></i>采集文件列表</el-row>
        <div class="partTwoContent">

            <el-row>
                <el-button size="mini" type="success" @click="addOneRow">添加</el-button>
            </el-row>

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

                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteArry(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="pagination">
                <el-pagination prev-text="上一页" next-text="下一页" @current-change="handleCurrentChangeList" :current-page="currentPage" :page-size="pageSize" layout=" total,prev, pager, next,jumper" :total="totalItem"></el-pagination>
            </el-row>
        </div>
    </el-row>
    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:left" @click="backSteps"><i class="el-icon-back"></i>上一步</el-button>
                <el-button type="primary" style="float:right" @click="nextSteps"> 下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>
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
            } else if (e == "ExecuteWay") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.upDateWay = res.data;
                    }
                })
            }
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
    }
}
</script>

<style scoped>
.collectFileOption {
    padding: 0 2% 0 2%;
}

.collectFileOption .partTwo {
    padding: 0 0 2% 0;
    width: 100%;
    border: 1px solid #e6e6e6;
}

.collectFileOption .partTwoContent {
    padding: 0 2%;
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
    margin-top: 5px;
}

/* 按钮设置 */
.collectFileOption .partFourDiv {
    float: right;
}

.collectFileOption.partFourDiv .el-button {
    margin-bottom: 20px;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}
</style>
