<template>
<div class="collectionStructureSet">
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
    <el-row>
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>
            <el-table-column prop="datasource_name" label="英文名" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.tableChName" placeholder="英文名"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="dep_name" label="中文名" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.tableChName" placeholder="数据类型"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="采集列结构" width="160" align="center">
                <template slot-scope="scope">
                    <b @click="dialogFormVisibleAdd = true;handleEdit(scope.$index, scope.row);departmentInfo()">采集列结构</b>
                </template>
            </el-table-column>
        </el-table>
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
export default {
    data() {
        return {
            active: 2
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
                name: "collectFileOption"
            })
        },
        // 下一步
        nextSteps() {
            this.$router.push({
                name: "collectionStructureSet"
            })
        },
    },
}
</script>

<style scoped>
.collectionStructureSet {
    padding: 0 2% 0 2%;
}

.collectionStructureSet .el-row {
    margin-top: 20px;
}

.collectionStructureSet .partFourDiv {
    float: right;
}

.collectionStructureSet .el-button {
    margin-bottom: 20px;
}
</style>
