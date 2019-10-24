<template>
<div>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期"  width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
    </el-table>
    <p><code>stripe</code>属性可以创建带斑马纹的表格。它接受一个<code>Boolean</code>，默认为<code>false</code>，设置为<code>true</code>即为启用。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 4}" placeholder="请输入内容" readonly v-model="textarea2">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
    import tableData from '@/data/tableData'
    export default {
        data() {
            return {
                textarea2: `
                <template>
                    <div>       
                        <el-table :data="tableData" stripe style="width: 100%">
                            <el-table-column prop="date" label="日期" width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="地址">
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
                `,
            tableData : tableData
        }
    }

}
</script>
