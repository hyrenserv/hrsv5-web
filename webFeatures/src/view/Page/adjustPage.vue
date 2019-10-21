<template>
<div>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
    </el-pagination>
    <p>使用了<code>size-change</code>和<code>current-change</code>事件来处理页码大小和当前页变动时候触发的事件。<code>page-sizes</code>接受一个整型数组，数组元素为展示的选择每页显示个数的选项，<code>[100, 200, 300, 400]</code>表示四个选项，每页显示 100 条，200 条，300 个或者 400 条。</p>
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
            demo: `<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
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
