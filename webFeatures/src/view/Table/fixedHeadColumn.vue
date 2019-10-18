<template>
<div>
    <el-table :data="tableData" style="width: 100%" height="250">
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
    </el-table>
    <p>固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 4}" readonly placeholder="请输入内容" v-model="demo">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        return {
            demo: `
                <el-table :data="tableData" style="width: 100%" height="250">
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
                </el-table>
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
