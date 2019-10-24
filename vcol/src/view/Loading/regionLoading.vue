<template>
<div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
    </el-table>
    <p>Element 提供了两种调用 Loading 的方法：指令和服务。对于自定义指令<code>v-loading</code>，只需要绑定<code>Boolean</code>即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，通过添加<code>body</code>修饰符，可以使遮罩插入至 DOM 中的 body 上。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 4}" readonly placeholder="请输入内容" v-model="demo">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<style>
body {
    margin: 0;
}
</style>

<script>
export default {
    data() {
        return {
            demo: `
                <el-table v-loading="loading" :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            `,
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            loading: true
        };
    }
};
</script>
