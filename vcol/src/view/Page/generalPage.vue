<template>
<div>
    <el-pagination background layout="total, prev, pager,next" :total="1000">
    </el-pagination>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 4}" readonly placeholder="请输入内容" v-model="demo"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        return {
            demo: `<el-pagination background layout="total, prev, pager, next" :total="1000"></el-pagination>`
        }
    }
}
</script>
