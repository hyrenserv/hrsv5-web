<template>
<div>

    <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop=date label="日期" width="150">
        </el-table-column>
        <el-table-column prop=name label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="gender" label="姓别" width="150">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="150">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="150">
        </el-table-column>
        <el-table-column prop=address label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="220">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <p>固定列需要使用<code>fixed</code>属性，它接受 Boolean 值或者<code>left</code>--<code>right</code>，表示左边固定还是右边固定。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    methods: {
        handleClick(row) {
            console.log(row);
        }
    },
    data() {
        return {
            textarea2 : `
                <template>
                    <div>
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column fixed prop=date label="日期" width="150">
                            </el-table-column>
                            <el-table-column prop=name label="姓名" width="120">
                            </el-table-column>
                            <el-table-column prop="gender" label="姓别" width="150">
                            </el-table-column>
                            <el-table-column prop="province" label="省份" width="120">
                            </el-table-column>
                            <el-table-column prop="city" label="市区" width="120">
                            </el-table-column>
                            <el-table-column prop=address label="地址" width="300">
                            </el-table-column>
                            <el-table-column prop="zip" label="邮编" width="120">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            `,
            tableData: [{
                    date: "2016-05-02",
                    name: "小中",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '男',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "李强",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '男',
                    province: '上海',
                    city: '浦东新区',
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "徐超",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '男',
                    province: '陕西',
                    city: '西安',
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "胡利利",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '男',
                    province: '陕西',
                    city: '西安',
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "杜华伟",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '男',
                    province: '陕西',
                    city: '西安',
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "黄芳芳",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '女',
                    province: '陕西',
                    city: '西安',
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "尹俊杰",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '男',
                    province: '陕西',
                    city: '西安',
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                    gender: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    zip: 200333
                }
            ]
        }
    }
}
</script>
