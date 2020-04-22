<template>
    <div id="marketIndex">
        <el-row class='topTitle'>
            <!--<i class="block_icon fa text-warning fa-globe blue"></i>-->
            <span>数据集市</span>
            <!--<el-button type="primary" class="el1 els goIndex" tab-position="top" @click="dialogofmarketadd = true;"-->
            <!--size="small">-->
            <!--<i class="el-icon-circle-plus-outline"></i>新增集市-->
            <!--</el-button>-->
        </el-row>

        <el-row class="bottomMargin">
            <el-col :span="5">
                <el-tabs class="tabes" type="card">
                    <el-table :data="totalstorage" border style="width: 100%">
                        <el-table-column prop="sources" label="总数据存储量" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-tabs class="tabes" type="card">
                    <el-table :data="hyrendbstorage" border style="width: 100%">
                        <el-table-column prop="count" label="HIVE数据表数" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-tabs class="tabes" type="card">
                    <el-table :data="kvstorage" border style="width: 100%">
                        <el-table-column prop="count" label="HBASE数据表数" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-tabs class="tabes" type="card">
                    <el-table :data="solrdbstorage" border style="width: 100%">
                        <el-table-column prop="count" label="SOLR数据表数" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>
        </el-row>
        <el-row class='top3style'>
            <span class="top3title">集市列表</span>
            <div class="elButton">
                <el-button type="primary" tab-position="top" @click="dialogofmarketadd = true;"
                           size="small">
                    <i class="el-icon-circle-plus-outline"></i>新增集市
                </el-button>
                <el-button type="primary" tab-position="top" @click="dialogofmarketadd = true;"
                           size="small">
                    <i class="el-icon-circle-plus-outline"></i>导入集市
                </el-button>
            </div>
        </el-row>
        <div class="dataSheetmain">
            <div class="dataSheetmainDiv" v-for="(item,index) in marketinfo" :key="index">
                <el-row>
                    <div @click="gotomartdetail(item.data_mart_id)">
                        <i class="fa fa-folder-open-o fa-3x"></i>
                        <p>{{item.mart_name}}</p>
                    </div>
                </el-row>
                <el-row class="boxshletr">
                    <el-col>
                        <i class="fa fa-download fa-lg" @click="downloadmart(item.mart_name,item.data_mart_id)"></i>
                    </el-col>
                </el-row>
            </div>
        </div>


        <el-row class="bottomMargin">
            <el-col :span="5">
                <el-row type="flex" justify="center">
                    <el-tabs class="tabes" type="card">
                        <span class="top3title">集市占用存储</span>
                    </el-tabs>
                </el-row>
                <el-row>
                    <el-tabs class="tabes" type="card">
                        <el-table :data="totalstoragetop3" border style="width: 100%">
                            <el-table-column prop="mart_name" label="集市名称" align='center'>
                            </el-table-column>
                            <el-table-column prop="source_size" label="占用空间" align='center'>
                            </el-table-column>
                        </el-table>
                    </el-tabs>
                </el-row>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-row type="flex" justify="center">
                    <el-tabs class="tabes" type="card">
                        <span class="top3title">HIVE占用存储前三表</span>
                    </el-tabs>
                </el-row>
                <el-tabs class="tabes" type="card">
                    <el-table :data="hyrendbstoragetop3" border style="width: 100%">
                        <el-table-column prop="mart_name" label="数据名称" align='center'>
                        </el-table-column>
                        <el-table-column prop="source_size" label="占用空间" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-row type="flex" justify="center">
                    <el-tabs class="tabes" type="card">
                        <span class="top3title">HBASE占用存储前三表</span>
                    </el-tabs>
                </el-row>
                <el-tabs class="tabes" type="card">
                    <el-table :data="kvstoragetop3" border style="width: 100%">
                        <el-table-column prop="mart_name" label="数据名称" align='center'>
                        </el-table-column>
                        <el-table-column prop="source_size" label="占用空间" align='center'>
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-row type="flex" justify="center">
                    <el-tabs class="tabes" type="card">
                        <span class="top3title">SOLR占用存储前三表</span>
                    </el-tabs>
                </el-row>
                <el-tabs class="tabes" type="card">
                    <el-table :data="solrdbstoragetop3" border style="width: 100%">
                        <el-table-column prop="mart_name" label="数据名称" align='center'>
                        </el-table-column>
                        <el-table-column prop="source_size" label="占用空间" align='center'>
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

        <!--<el-dialog title="上传文件" :visible.sync="dialogFormVisibleImport" width="42%">-->
            <!--<el-form>-->
                <!--<el-form-item label="上传要导入的数据源" :label-width="formLabelWidth">-->
                    <!--<el-upload class="upload-demo" ref="upload" accept=".hrds" :fileList="fileList" action="" :auto-upload="false" :on-change="handleChange">-->
                        <!--<el-button size="small" type="primary">选择上传文件</el-button>-->
                    <!--</el-upload>-->
                    <!--<el-tooltip class="item" effect="dark" content="在本系统中要上传的数据源，后缀名为hrds的加密文件" placement="right">-->
                        <!--<i class="fa fa-question-circle " aria-hidden="true"></i>-->
                    <!--</el-tooltip>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="cancleImport" size="mini" type="danger">取 消</el-button>-->
                <!--<el-button type="primary" @click="upload('formImport')" size="mini">上传</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->
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
                dialogFormVisibleImport:false,
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
            downloadmart(mart_name, data_mart_id) {
                let that = this;
                functionAll.downLoadMart({
                    data_mart_id: data_mart_id
                }).then(res => {
                    debugger;
                    // if (res && res.success) {
                    let filename = mart_name + ".hrds"
                    const blob = new Blob([res]);
                    if (window.navigator.msSaveOrOpenBlob) {
                        // 兼容IE10
                        navigator.msSaveBlob(blob, filename);
                    } else {
                        //  chrome/firefox
                        let aTag = document.createElement("a");
                        // document.body.appendChild(aTag);
                        aTag.download = filename;
                        aTag.href = URL.createObjectURL(blob);
                        if (aTag.all) {
                            aTag.click();
                        } else {
                            //  兼容firefox
                            var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            aTag.dispatchEvent(evt);
                        }
                        URL.revokeObjectURL(aTag.href);
                    }
                    // } else {
                    //     this.$message({
                    //         type: "error",
                    //         message: "下载集市工程失败"
                    //     });
                    // }
                })
            },
            deletemart() {

            }
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

    .boxshletr {
        margin-top: 10px;
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

    .top3title {
        /*border-bottom: 1px solid #e6e3e3;*/
        margin-bottom: 10px;
        /*margin-left: px;*/
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #2196f3;
    }

    .elButton {
        float: right;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
