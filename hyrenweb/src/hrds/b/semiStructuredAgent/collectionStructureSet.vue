<template>
<div class="collectionStructureSet">
    <el-row class="partOne">
        <el-col :span="24">
            <el-steps :active="active" finish-status="success" align-center style="margin: 10px 0 20px 0;">
                <el-step title="步骤 1" description="采集设置"></el-step>
                <el-step title="步骤 2" description="采集文件设置"></el-step>
                <el-step title="步骤 3" description="采集结构化设置"></el-step>
                <el-step title="步骤 4" description="存储设置"></el-step>
            </el-steps>
        </el-col>
    </el-row>
    <el-row>
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="a" label="英文名" align="center">

            </el-table-column>

            <el-table-column prop="b" label="中文名" align="center">

            </el-table-column>

            <el-table-column prop="c" label="Hbase" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="c"></el-checkbox>&nbsp;Hbase
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.c" @change="showDiolag = true"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="d" label="Solr" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="d"></el-checkbox>&nbsp;Solr
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.d"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="e" label="是否存入HDFS" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="e"></el-checkbox>&nbsp;是否存入HDFS
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.e"></el-checkbox>
                </template>
            </el-table-column>

        </el-table>
    </el-row>
    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit" size="medium"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:left" @click="backSteps" size="medium"><i class="el-icon-back"></i>上一步</el-button>
                <el-button type="primary" style="float:right" @click="nextSteps" size="medium"> 下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>

    <!-- Hbase弹出框 -->
    <el-dialog title="Hbase" :visible.sync="showDiolag">
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

            <el-table-column label="多列作rowkey的顺序" align="center"></el-table-column>

            <el-table-column label="字段英文名" align="center">
                <template slot-scope="scope">
                      <el-checkbox name="nature" v-model="scope.row.d"></el-checkbox>
                </template>
            </el-table-column>

            <!-- <el-table-column label="操作" width="134" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,tableData) " class="buttonSpeical">上移</el-button>
                    <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,tableData)" class="buttonSpeical">下移</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            active: 2,
            c: '',
            d: '',
            e: '',
            showDiolag: false,
            tableData: [{
                    a: "sss",
                    b: "sa",
                    c: true,
                    d: true,
                    e: true
                }, {
                    a: "aaa",
                    b: "zzz",
                    c: true,
                    d: true,
                    e: true
                },
                {
                    a: "dcv",
                    b: "vd",
                    c: true,
                    d: true,
                    e: true
                }
            ]
        }
    },
    created() {
        this.checkAll()
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 上一步
        backSteps() {
            this.$router.push({
                name: "collectFileOption"
            })
        },
        // 下一步
        nextSteps() {
            this.$router.push({
                name: "collectionStructureSet"
            })
        },
        // 判断表格表头是否为全选状态
        checkAll() {
            // this.tableData.forEach((item) => {
            //     if (item.c == true) {
            //         this.c = true
            //     } else {
            //         this.c = false
            //     };
            //     if (item.d == true) {
            //         this.d = true
            //     } else {
            //         this.d = false
            //     };
            //     if (item.e == true) {
            //         this.e = true
            //     } else {
            //         this.e = false
            //     };

            // })
            this.tableData.every(this.func)
        },
        // 检测
        func(item) {
            return
            console.log("1")

        },
    },
}
</script>

<style scoped>
.collectionStructureSet {
    padding: 0 2% 0 2%;
}

.collectionStructureSet .el-row {
    margin-top: 20px;
}

.collectionStructureSet .partFourDiv {
    float: right;
}

.collectionStructureSet .el-button {
    margin-bottom: 20px;
}
</style>
