<template>
<div>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
    </el-table>

    <p>默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用<code>border</code>属性，它接受一个<code>Boolean</code>，设置为<code>true</code>即可启用。</p>
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
            textarea2 : `
            <template>
                <div>
                    <el-table :data="tableData" border style="width: 100%">
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
            tableData: tableData
        }
    }
}
</script>
