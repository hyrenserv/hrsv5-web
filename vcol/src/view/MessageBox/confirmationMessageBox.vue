<template>
<div>
    <el-button type="text" @click="open">点击打开 Message Box</el-button>

    <p>
        调用
        <code>$confirm</code>方法即可打开消息提示，它模拟了系统的
        <code>confirm</code>。Message Box 组件也拥有极高的定制性，我们可以传入
        <code>options</code>作为第三个参数，它是一个字面量对象。
        <code>type</code>字段表明消息类型，可以为
        <code>success</code>，
        <code>error</code>，
        <code>info</code>和
        <code>warning</code>，无效的设置将会被忽略。注意，第二个参数
        <code>title</code>必须定义为
        <code>String</code>类型，如果是
        <code>Object</code>，会被理解为
        <code>options</code>。在这里我们用了 Promise 来处理后续响应。
    </p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly v-model="textarea2"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        return {
            textarea2: `
                <el-button type="text" @click="open">点击打开 Message Box</el-button>

                open() {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        // center: true//是否居中布局
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            `
        };
    },
    methods: {
        open() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    cancelButtonClass:"btn-cancel",
                    confirmButtonClass:"btn-confirm",
                    type: "warning",
                    // center: true//是否居中布局
                })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>
