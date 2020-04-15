<template>
<div class="step2">
    <Step :active="active"></Step>
    <el-table :data="tableData" border size="medium">
        <el-table-column property label="序号" width="60px" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column property="a" label="表名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="中文表名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="查看列" width="150px" align="center">
            <template slot-scope="scope">
                <el-button type="text" size="mini" @click="watchText(scope.row)">查看列</el-button>
            </template>
        </el-table-column>
    </el-table>
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
    <el-dialog width="50%" :visible.sync="innerVisible" append-to-body>
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">查看列信息</span>
        </div>
        <el-table :data="tableData" border size="medium">
            <el-table-column property label="序号" width="60px" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="a" label="列名" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column property="b" label="列中文名" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="类型" property="b" show-overflow-tooltip align="center"></el-table-column>
        </el-table>
        <div slot="footer">
            <el-button size="mini" type="danger" @click="cancelWatch">取 消</el-button>
            <el-button type="primary" size="mini" @click="selectWatch">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import Step from "./step";
import * as functionAll from "./dbAgentcollect"
export default {
    components: {
        Step
    },
    data() {
        return {
            active: 1,
            tableData: [{
                a: "1",
                b: "2"
            }, {
                a: "1",
                b: "2"
            }],
            pagesize: 5,
            currentPage: 1,
            innerVisible: false,
        }
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 获取表格数据

        // 查看列数据
        watchText(val) {
            this.innerVisible = true;
        },
        //取消查看列
        cancelWatch() {
            this.innerVisible = false;
        },
        // 保存查看列
        selectWatch() {

        },
        // 下一步
        // 接口
        nextSteps() {
            this.$router.push({
                name: "step3",
                // query: {
                //     agent_id: this.$route.query.agent_id,
                //     id: this.$route.query.odc_id
                // }
            })
        },
        //上一步
        backSteps() {
            this.$router.push({
                name: "collection4_1",
                query: {
                    agent_id: this.$route.query.agent_id,
                    source_id: this.$route.query.sourceId
                }
            })
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
</style>
