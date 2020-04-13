<template>
<div class="step3">
    <Step :active="active"></Step>
    <el-table :data="tableData" border size="medium">
        <el-table-column property label="序号" width="60px" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column property="a" label="表名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="中文表名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="checkList1" width="84" label="是否转存" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-checkbox :true-label="1" :false-label="0" v-model="scope.row.checkList1"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column property="b" label="文件格式" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="is_head" width="94" label="是否有表头" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-checkbox :true-label="1" :false-label="0" v-model="scope.row.is_head"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column property="b" label="行分隔符" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="列分隔符" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="文件编码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="源文件路径" show-overflow-tooltip align="center"></el-table-column>
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
            active: 2,
            tableData: [{
                a: "1",
                b: "2",
                checkList1: 1,
                is_head: 0
            }, {
                a: "1",
                b: "2",
                checkList1: 0,
                is_head: 1
            }],
            pagesize: 5,
            currentPage: 1,
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

        },
        //上一步
        backSteps() {
            this.$router.push({
                name: "step2",
                // query: {
                //     agent_id: this.$route.query.agent_id,
                //     id: this.$route.query.odc_id
                // }
            })
        },
    },
}
</script>

<style scoped>
/* 按钮设置 */
.step3 .el-table {
    margin-bottom: 20px;
}

.step3 .partFourDiv {
    float: right;
}

.step3 .partFourDiv .el-button {
    margin-bottom: 20px;
}
</style>
