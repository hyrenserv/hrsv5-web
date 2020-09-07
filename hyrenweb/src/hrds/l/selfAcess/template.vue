<template>
<div class="templateDiv">
    <el-row class="elRows">
        <span>模板清单</span>
        <div class="lines"></div>
    </el-row>
    <el-row class="titleRow">
        <el-button type="primary" class="templateButton" @click="addTemplates" size="small">
            模板配置
        </el-button>
        <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="inputText">
            <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
        </el-input>
    </el-row>
    <el-table size="medium" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="70px" align='center'>
        </el-table-column>
        <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="名称" align='center'>
        </el-table-column>
        <el-table-column prop="etl_sys_name" show-overflow-tooltip label="模板描述" align='center'>
        </el-table-column>
        <el-table-column prop="comments" show-overflow-tooltip label="日期" align='center'>
        </el-table-column>
        <el-table-column prop="curr_bath_date" show-overflow-tooltip label="创建人" align='center'>
        </el-table-column>
        <el-table-column label="模板状态" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center' width="100">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">查看
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="140">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">发布
                </el-button>
                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import * as functionAll from "./selfAcess";
export default {
    data() {
        return {
            inputText: '',
            tableData: [{}]
        }
    },
    mounted(){
        this.getTemplateConfInfo()
    },
    methods: {
        // 获取初始数据
        getTemplateConfInfo() {
            functionAll.getTemplateConfInfo().then(res => {
                console.log(res.data)
            })
        },
        // 模板配置
        addTemplates() {
            this.$router.push({
                name: 'configTemplate'
            })
        },
        // 查看模板配置
        handleEdit(index, row) {

        }
    }
}
</script>

<style scoped>
/* 标题信息 */
.elRows {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* 搜索按钮 */
.titleRow {
    margin-top: 14px;
    margin-bottom: 2px;
}

.templateButton {
    float: left;
}

.input-with-select {
    float: right;
    width: 284px;
}
</style>
