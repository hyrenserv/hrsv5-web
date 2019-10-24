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
    <p> 通过<code>v-loading</code>绑定<code>Boolean值</code>即可实现loading。</p>
    <p> 通过添加<code>element-loading-text</code>属性，设定加载文字</p>
    <p> 通过添加<code>element-loading-spinner</code>属性，设定图标类名</p>
    <p> 通过添加<code>element-loading-background</code>属性，设定背景色</p>

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
                <style>
                    body {
                        margin: 0;
                    }
                </style>

                <script>
                    export default {
                            data() {
                                return {
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
                <\/script>
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
