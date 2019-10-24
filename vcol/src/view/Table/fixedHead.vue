<template>
<div>
    <el-table :data="tableData" height="450" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
    </el-table>
    <p>只要在<code>el-table</code>元素中定义了<code>height</code>属性，即可实现固定表头的表格，而不需要额外的代码。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 4}" placeholder="请输入内容" readonly v-model="textarea2">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        const item = {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        return {
            textarea2 : `
            <template>
                <div>
                    <el-table :data="tableData" height="450" border style="width: 100%">
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
            tableData: Array(30).fill(item)
        }
    }
}
</script>
