<template>
<div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
    </el-pagination>
    <p>使用了<code>size-change</code>和<code>current-change</code>事件来处理页码大小和当前页变动时候触发的事件。<code>jumper</code> 属性来进行自行输入页码跳转</p>
    
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
            demo: `<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
    </el-pagination>
            `,
            currentPage: 1,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
