<template>
<div class="dataStoreAction">
    <el-row class="partOne">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="存储类型">
                <el-select v-model="form.region" placeholder="请选择存储类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-row>
    <el-row class="partTwo">
        <el-row><span>属性</span></el-row>
        <el-button size="mini" type="success" @click="addTableData">增加行</el-button>
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="file_source_path" label="key" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.file_source_path"></el-input>
                </template>
            </el-table-column>

            <el-table-column prop="is_pdf" label="value" align="center">
                <template slot-scope="scope">
                     <el-input v-model="scope.row.file_source_path"  ></el-input>
                </template>
            </el-table-column>

            <el-table-column prop="is_office" label="描述" align="center">
                <template slot-scope="scope">
                   <el-input type="textarea" v-model="scope.row.file_source_path"  ></el-input>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </el-row>
    <el-row class="partThree">
        <el-row><span>附加</span></el-row>
        <el-row>
            <el-checkbox-group v-model="type">
                <el-checkbox label="rowkey" name="type"></el-checkbox>
                <el-checkbox label="聚离合" name="type"></el-checkbox>
                <el-checkbox label="主键" name="type"></el-checkbox>
                <el-checkbox label="排序列" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="分区列" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-row>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
            },
            type: [],
            tableData:[]
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
           // 添加行数据
        addTableData() {
            this.tableData.push({
               
            })
        },
          // 删除表格的当前行
        deleteArry(index, row) {
            this.tableData.splice(index, 1)
        },
    }
}
</script>

<style scoped>

</style>
