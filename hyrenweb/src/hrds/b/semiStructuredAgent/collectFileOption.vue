<template>
<div class="collectFileOption">
    <el-row><i class="fa fa-signal"></i>采集文件列表</el-row>
    <el-row>
        <el-button size="medium" type="success" @click="addOneColumn">添加</el-button>
    </el-row>
    <el-table :data="tableData" border stripe size="mini">
        <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>
        <el-table-column prop="datasource_name" label="英文名" align="center">
            <template slot-scope="scope">
                <el-input v-model="scope.row.tableChName" placeholder="英文名"></el-input>
            </template></el-table-column>
        <el-table-column prop="dep_name" label="中文名" align="center">
            <template slot-scope="scope">
                <el-input v-model="scope.row.tableChName" placeholder="中文名"></el-input>
            </template></el-table-column>
        <el-table-column label="数据类型" align="center">
            <template slot-scope="scope">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column prop="datasource_name" label="数据更新方式" align="center">
            <template slot-scope="scope">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column prop="dep_name" label="数据字符编码" align="center">
            <template slot-scope="scope">
                <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="96" align="center">
            <template slot-scope="scope">
                <b @click="dialogFormVisibleAdd = true;handleEdit(scope.$index, scope.row);departmentInfo()">删除</b>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.collectFileOption .el-row {
    margin-top: 20px;
}
</style>
