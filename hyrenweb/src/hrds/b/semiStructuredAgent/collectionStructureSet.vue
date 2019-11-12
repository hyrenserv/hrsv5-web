<template>
<div class="collectionStructureSet">
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
            <el-table-column label="采集列结构"  width="160" align="center">
                <template slot-scope="scope">
                    <b @click="dialogFormVisibleAdd = true;handleEdit(scope.$index, scope.row);departmentInfo()">采集列结构</b>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
