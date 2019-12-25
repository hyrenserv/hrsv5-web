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
                    <el-checkbox name="nature" v-model="c" @change="handleChangeHbase"></el-checkbox>&nbsp;Hbase
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.c" @change="selectAllHbase(scope.row.c)"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="d" label="Solr" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="d" @change="handleChangeSolr"></el-checkbox>&nbsp;Solr
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.d" @change="selectAllSolr(scope.row.d)"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop=" e" label="是否存入HDFS" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="e" @change="handleChangeHDFS"></el-checkbox>&nbsp;是否存入HDFS
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.e" @change="selectAllHDFS(scope.row.e)"></el-checkbox>
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
    <el-dialog title="Hbase" :visible.sync="showDiolag" width="50%" :before-close="beforeClose">
        <el-table :data="arry" border stripe size="mini">
            <el-table-column label="多列作rowkey的顺序" align="center" prop="key"></el-table-column>

            <el-table-column label="字段英文名" align="center" prop="name">
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.d"></el-checkbox> &nbsp;<span class="spanName">{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,arry) ">上移</el-button>
                    <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,arry)">下移</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- Solr弹出框 -->
    <el-dialog title=" 查看列" :visible.sync=" solrDiolag" width="50%">
        <el-table :data="arry" border stripe size="mini">
            <el-table-column align="center" width="134">
                <template slot="header" slot-scope="scope">
                    <el-checkbox name="nature" v-model="d"></el-checkbox>&nbsp;是否进入Solr
                </template>
                <template slot-scope="scope">
                    <el-checkbox name="nature" v-model="scope.row.c"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="74" align="center">
                <!-- <template slot-scope="scope">
                    {{scope.$index+(currentPage - 1) * pageSize + 1}}
                </template> -->
            </el-table-column>

            <el-table-column label="列名" align="center" prop="name">
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="success" size="mini">保存</el-button>
        </div>
        <!-- 分页内容 -->
        <el-row class="pagination">
            <el-pagination prev-text="上一页" next-text="下一页" @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
        </el-row>
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
            solrDiolag: false,
            tableData: [{
                    a: "sss",
                    b: "sa",
                    c: false,
                    d: true,
                    e: false
                }, {
                    a: "aaa",
                    b: "zzz",
                    c: false,
                    d: true,
                    e: true
                },
                {
                    a: "dcv",
                    b: "vd",
                    c: false,
                    d: true,
                    e: true
                }
            ],
            arry: []
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
            this.tableData.every((item) => {
                if (item.c == true) {
                    this.c = true
                } else {
                    this.c = false
                };
                if (item.d == true) {
                    this.d = true
                } else {
                    this.d = false
                };
                if (item.e == true) {
                    this.e = true
                } else {
                    this.e = false
                };

            })

        },
        // 实现全选和全不选功能
        handleChangeHbase(val) {
            this.tableData.forEach((item) => {
                if (val == true) {
                    item.c = true
                } else {
                    item.c = false
                }

            })
        },
        handleChangeSolr(val) {
            this.tableData.forEach((item) => {
                if (val == true) {
                    item.d = true
                } else {
                    item.d = false
                }

            })
        },
        handleChangeHDFS(val) {
            this.tableData.forEach((item) => {
                if (val == true) {
                    item.e = true
                } else {
                    item.e = false
                }

            })
        },
        selectAllHbase(val) {
            if (val == false) {
                this.c = false;
            } else if (val == true) {
                this.showDiolag = true;
                this.showDiolagData();
            }
        },
        selectAllSolr(val) {
            if (val == false) {
                this.d = false;
            } else if (val == true) {
                this.solrDiolag = true;
                this.showDiolagData();
            }
        },
        selectAllHDFS(val) {
            if (val == false) {
                this.e = false;
            }
        },
        // 弹出框表格信息
        showDiolagData() {
            this.arry = [{
                key: 1,
                name: "jamessssssssssssssss"
            }, {
                key: 2,
                name: "kb"
            }, {
                key: 3,
                name: "kg"
            }, {
                key: 4,
                name: "allen"
            }, {
                key: 5,
                name: "wade"
            }]
        },
        // 数据上移
        moveUp(val, data, tableData) {
            if (val > 0) {
                let upDate = tableData[val - 1];
                tableData.splice(val - 1, 1);
                tableData.splice(val, 0, upDate);
            } else {
                this.$message({
                    message: '已经是第一条，不可上移',
                    type: 'warning',
                });
            }
        },
        // 数据下移
        moveDown(val, data, tableData) {
            if (val + 1 === tableData.length) {
                this.$message({
                    message: '已经是最后一条，不可下移',
                    type: 'warning',
                });
            } else {
                let downDate = tableData[val + 1];
                tableData.splice(val + 1, 1);
                tableData.splice(val, 0, downDate);
            }
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.showDiolag = false;
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

.collectionStructureSet .partFour .el-button {
    margin-bottom: 20px
}

.spanName {
    width: 85%;
    display: inline-block;
    text-align: left;
}
</style>
