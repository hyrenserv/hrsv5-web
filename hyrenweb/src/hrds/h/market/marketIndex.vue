<template>
    <div id="marketIndex">
        <el-row class='topTitle'>
            <i class="block_icon fa text-warning fa-globe blue"></i>
            <span>数据集市</span>
            <el-button type="primary" class="el1 els goIndex" tab-position="top" @click="dialogofmarketadd = true;"
                       size="small">
                <i class="el-icon-circle-plus-outline"></i>新增集市
            </el-button>
        </el-row>

        <el-row class="bottomMargin">
            <el-col :span="5">
                <el-tabs class="tabes" type="card">
                    <el-table :data="totalstorage" border style="width: 100%">
                        <el-table-column prop="sources" label="总数据存储量" width="344x" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-tabs class="tabes" type="card">
                    <el-table :data="hyrendbstorage" border style="width: 100%">
                        <el-table-column prop="count" label="HIVE数据表数" width="344x" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-tabs class="tabes" type="card">
                    <el-table :data="kvstorage" border style="width: 100%">
                        <el-table-column prop="count" label="HBASE数据表数" width="344x" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-tabs class="tabes" type="card">
                    <el-table :data="solrdbstorage" border style="width: 100%">
                        <el-table-column prop="count" label="SOLR数据表数" width="344x" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>
        </el-row>

        <div class="dataSheetmain">
            <div class="dataSheetmainDiv" v-for="(item,index) in marketinfo" :key="index">
                <div @click="gotomartdetail(item.data_mart_id)">
                    <i class="fa fa-bed"></i>
                    <p>{{item.mart_name}}</p>
                </div>
                <!--<div class="boxshletr">-->
                <!--<i class="fa fa-download fa-lg" @click="downloadData(item.data_mart_id)"></i>-->
                <!--<el-button type="text" class="delbtn" @click="dialogFormVisibleAdd = true;clickEditButton(index)">-->
                <!--<i class="fa fa-pencil fa-lg"></i>-->
                <!--</el-button>-->
                <!--</div>-->
            </div>
        </div>


        <el-row class="bottomMargin">
            <el-col :span="5">
                <el-row>
                    <el-tabs class="tabes" type="card">
                        <span>数据集市</span>
                    </el-tabs>
                </el-row>
                <el-row>
                    <el-tabs class="tabes" type="card">
                        <el-table :data="totalstoragetop3" border style="width: 100%">
                            <el-table-column prop="mart_name" label="集市名称" width="172px" align='center'>
                            </el-table-column>
                            <el-table-column prop="source_size" label="占用空间" width="172px" align='center'>
                            </el-table-column>
                        </el-table>
                    </el-tabs>
                </el-row>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-row>
                    <el-tabs class="tabes" type="card">
                        <span>HIVE</span>
                    </el-tabs>
                </el-row>
                <el-tabs class="tabes" type="card">
                    <el-table :data="hyrendbstoragetop3" border style="width: 100%">
                        <el-table-column prop="mart_name" label="数据名称" width="172px" align='center'>
                        </el-table-column>
                        <el-table-column prop="source_size" label="占用空间" width="172px" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-row>
                    <el-tabs class="tabes" type="card">
                        <span>HBASE</span>
                    </el-tabs>
                </el-row>
                <el-tabs class="tabes" type="card">
                    <el-table :data="kvstoragetop3" border style="width: 100%">
                        <el-table-column prop="mart_name" label="数据名称" width="172px" align='center'>
                        </el-table-column>
                        <el-table-column prop="source_size" label="占用空间" width="172px" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-row>
                    <el-tabs class="tabes" type="card">
                        <span>SOLR</span>
                    </el-tabs>
                </el-row>
                <el-tabs class="tabes" type="card">
                    <el-table :data="solrdbstoragetop3" border style="width: 100%">
                        <el-table-column prop="mart_name" label="数据名称" width="172px" align='center'>
                        </el-table-column>
                        <el-table-column prop="source_size" label="占用空间" width="172px" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>
        </el-row>


        <el-dialog title="新增集市" :visible.sync="dialogofmarketadd" width="40%">
            <el-form :model="formAdd" ref="formAdd">
                <el-form-item label="集市名称" :label-width="formLabelWidth" prop="mart_name" :rules="rule.default">
                    <el-input v-model="formAdd.mart_name" autocomplete="off" placeholder="集市名称"
                              style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="集市编号" :label-width="formLabelWidth" prop="mart_number" :rules="rule.default">
                    <el-input v-model="formAdd.mart_number" autocomplete="off" placeholder="集市编号"
                              style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth" prop="mart_desc">
                    <el-input type="textarea" v-model="formAdd.mart_desc" autocomplete="off" placeholder="备注"
                              style="width:284px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
                <el-button type="primary" @click="addmarket('formAdd')" size="mini">保存</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import * as validator from "@/utils/js/validator";
    import regular from "@/utils/js/regular";
    import * as functionAll from "./marketAction";
    import * as message from "@/utils/js/message";

    export default {
        data() {
            return {
                SumTotal: [],
                formLabelWidth: "150px",
                totalstorage: [],
                totalstoragetop3: [],
                kvstorage: [],
                kvstoragetop3: [],
                hyrendbstorage: [],
                hyrendbstoragetop3: [],
                solrdbstorage: [],
                solrdbstoragetop3: [],
                marketinfo: {},
                dialogofmarketadd: false,
                formAdd: {
                    mart_name: "",
                    mart_number: "",
                    mart_desc: ""
                },
                rule: validator.default
            };
        },
        mounted() {
            this.getTotalStorage();
            this.getHyRenDBStorage();
            this.getKVStorage();
            this.getSolrDBStorage();
            this.getMarketInfo();
            this.getMarketTakesUpTop3Storage();
        },
        methods: {
            getTotalStorage() {
                functionAll.getTotalStorage().then(res => {
                    this.totalstorage = res.data;
                })
            },
            getKVStorage() {
                functionAll.getHbaseStorage().then(res => {
                    this.kvstorage = res.data;
                })
            },
            getHyRenDBStorage() {
                functionAll.getHyRenDBStorage().then(res => {
                    this.hyrendbstorage = res.data;
                })
            },
            getSolrDBStorage() {
                functionAll.getSolrDBStorage().then(res => {
                    this.solrdbstorage = res.data;
                })
            },

            getMarketTakesUpTop3Storage() {
                functionAll.getMarketTakesUpTop3Storage().then(res => {
                    this.totalstoragetop3 = res.data;
                })
            },

            getMarketHyRenDbTop3Storage() {
                functionAll.getMarketHyRenDbTop3Storage().then(res => {
                    this.kvstoragetop3 = res.data;
                })
            },

            getMarketKeyValueTop3Storage() {
                functionAll.getMarketHbaseTop3Storage().then(res => {
                    this.hyrendbstoragetop3 = res.data;
                })
            },

            getMarketSolrDBTop3Storage() {
                functionAll.getMarketSolrDBTop3Storage().then(res => {
                    this.solrdbstoragetop3 = res.data;
                })
            },

            getMarketInfo() {
                functionAll.getMarketInfo().then(res => {
                    this.marketinfo = res.data;
                })
            },
            addmarket(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 调用添加方法
                        functionAll.addMarket(this.formAdd).then(response => {
                            if (response && response.success) {
                                this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                // 隐藏对话框
                                this.dialogofmarketadd = false;
                                // 表单清空
                                this.formAdd = {};
                                location.reload();
                            } else {
                                this.$emit(response.message);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            gotomartdetail(data_mart_id) {
                this.$router.push({
                    name: 'detailMart',
                    query: {
                        data_mart_id: data_mart_id
                    }
                });
            },
            cancleAdd() {
                // 表单清空
                this.formAdd = {};
                // 隐藏对话框
                this.dialogofmarketadd = false;
                this.$refs.formAdd.resetFields();
            },

        }
    };
</script>

<style scoped>

    .dataSheetmain {
        padding-left: 44px;
        border: 1px solid #dddddd;
        min-height: 124px;
        padding-top: 30px;
        overflow: hidden;
    }

    .dataSheetmainDiv:hover .boxshletr {
        display: block;
    }

    .dataSheetmainDiv:hover {
        background: #286090;
        cursor: pointer;
    }

    .dataSheetmainDiv {
        margin-bottom: 50px;
        padding-top: 10px;
        width: 100px;
        height: 80px;
        background: #337ab7;
        border-radius: 10px;
        margin-right: 82px;
        text-align: center;
        float: left;
        position: relative;
    }

    .dataSheetmainDiv p {
        color: #fff;
        margin-left: 5px;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* 标签定位 */
    .dataSheetmainDiv span {
        display: block;
        width: 18px;
        height: 18px;
        background: #f89406;
        border-radius: 50%;
        color: white;
        position: absolute;
        right: -2px;
        top: -3px;
        font-size: 12px;
    }

    /* 字体描述定位 */
    .dataSheetmainDiv .postionP {
        position: absolute;
        bottom: -20px;
        left: 4px;
        font-size: 13px;
        color: black;
    }

    /* 小图标样式 */
    .tree {
        color: aliceblue;
    }


    #marketIndex {
        padding: 0 40px;
    }

    /* 图标字体设置 */
    /* .el-row {
        width: 100%;
        height: 64px;
        line-height: 64px;
    } */

    /*!* button样式设置 *!*/
    /*.goIndex {*/
    /*float: right;*/
    /*background: #337ab7;*/
    /*margin-top: 18px;*/
    /*margin-right: 14px;*/
    /*}*/

    /* 下划线样式 */
    .lines {
        width: 100%;
        min-height: 1px;
        background: #dddddd;
        margin-bottom: 15px;
    }

    .edilt {
        text-align: center;
        color: #4691ef;
        font-size: 22px;
        font-weight: bold;
    }

    .sendmsg {
        text-align: center;
        color: #4691ef;
        font-size: 22px;
        font-weight: bold;
    }

    .delbtn {
        text-align: center;
        color: #4691ef;
        font-size: 22px;
        font-weight: bold;
    }

    .taskEx >>> .el-dialog__body {
        padding: 8px 20px;
    }

    .taskEx >>> .el-table__row > td {
        padding: 0;
    }

    .title-sourceName,
    .title-agentType {
        font-size: 18px;
    }

    .successlink {
        color: rgb(3, 97, 3);
    }

    .unlink {
        color: red;
    }

    .linking {
        color: #000;
    }

    .editcolor {
        color: #2bc73e;
    }

    .delcolor {
        color: #e83a3a;
    }

    .sendcolor {
        color: #76b8f1;
    }

    .workcolor {
        color: #8c8b8b
    }

    .optheight {
        height: 20px;
        line-height: 20px;
    }

    /* 底部边距 */
    .bottomMargin {
        margin-bottom: 1%;
        margin-left: 40px;
    }
</style>
