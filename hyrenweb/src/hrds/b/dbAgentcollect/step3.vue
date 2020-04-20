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
                <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.checkList1"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column property="b" label="文件格式" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="is_head" width="94" label="是否有表头" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.is_head"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column property="b" label="行分隔符" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="列分隔符" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="文件编码" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" width="94" label="源文件路径" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="换行符" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" label="数据分隔" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="b" width="138" label="数据字符集" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-select placeholder="数据字符集" clearable style="width: 100%;">
                    <el-option v-for="item in runWay" :key="item.value" :label="item.value" :value="item.run_way">
                    </el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column property="b" width="124" label="文件格式" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-select placeholder="文件格式" clearable style="width: 100%;">
                    <el-option v-for="item in FileFormat" :key="item.value" :label="item.value" :value="item.FileFormat">
                    </el-option>
                </el-select>
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
                checkList1: '1',
                is_head: '1'
            }, {
                a: "1",
                b: "2",
                checkList1: '1',
                is_head: '0'
            }],
            FileFormat: [],
            runWay: [],
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
                    let data = {}
            if (this.$route.query.edit == 'yes') {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    sourceId: this.$route.query.sourceId,
                    source_name: this.$route.query.source_name,
                    edit: "yes"
                }
            } else {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    sourceId: this.$route.query.sourceId,
                    source_name: this.$route.query.source_name,
                }
            }
            this.$router.push({
                path: "/collection4_4",
                query: data
            })
        },
        //上一步
        backSteps() {
                let data = {}
            if (this.$route.query.edit == 'yes') {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    sourceId: this.$route.query.sourceId,
                    source_name: this.$route.query.source_name,
                    edit: "yes"
                }
            } else {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    sourceId: this.$route.query.sourceId,
                    source_name: this.$route.query.source_name,
                }
            }
            this.$router.push({
                path: "/collection4_2",
                query: data
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
