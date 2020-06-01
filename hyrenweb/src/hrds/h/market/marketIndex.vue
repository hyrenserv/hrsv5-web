<template>
    <div id="marketIndex">
        <el-row class='topTitle'>
            <span>数据集市</span>
        </el-row>
        <span class="top3title">存储层表数量</span>
        <div class="dataSheetmain">
            <div class="dataSheetmainDiv2" v-for="(item,index) in alldslinfomart" :key="index">
                <i class="fa fa-database fa-3x tree"></i>
                <p>{{item.dsl_name}}</p>
                <p class="postionP">集市表个数：{{item.count}} </p>
                <span>{{item.count}}</span>
            </div>
        </div>
        <el-row class='top3style'>
            <span class="top3title">集市列表</span>
            <div class="elButton">
                <el-button type="primary" tab-position="top" @click="dialogofmarketadd = true;"
                           size="small">
                    <i class="el-icon-circle-plus-outline"></i>新增集市
                </el-button>
                <el-upload class="buttonStyle" accept=".hrds" action="" :show-file-list="false" :auto-upload="false"
                           :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
                    <el-button size="small" type="primary">
                        <i class="el-icon-circle-plus-outline"></i> 导入数据
                    </el-button>
                </el-upload>

            </div>
        </el-row>
        <div class="dataSheetmain">
            <div class="dataSheetmainDiv" v-for="(item,index) in marketinfo" :key="index">
                <div @click="gotomartdetail(item.data_mart_id)">
                    <i class="block_icon fa fa-archive fa-3x tree"></i>
                    <p>{{item.mart_name}}</p>
                </div>
                <div class="boxshletr">
                    <el-button type="text" class="editBtn" title="编辑" @click="editmart(item.data_mart_id)">
                        <i class="fa fa-pencil fa-lg"></i>
                    </el-button>
                    <el-button type="text" class="editBtn" title="下载"
                               @click="downloadmart(item.mart_name,item.data_mart_id)">
                        <i class="fa fa-download fa-lg"></i>
                    </el-button>
                    <el-button type="text" class="editBtn" title="删除"
                               @click="deletemart(item.mart_name,item.data_mart_id)">
                        <i class="fa fa-trash fa-lg"></i>
                    </el-button>
                </div>
            </div>
        </div>
        <span class="top3title">存储层表top5</span>
        <div class="dataSheetmain">
            <el-row>
                <el-col :span="8" v-for="(item,index) in tabletop5indsl" :key="index">
                    <div class="">
                        <el-row>
                            <el-col :span="6" :offset="10">
                                <span class="top3title"> <p>{{item.dsl_name}}</p></span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-table :data="item.result" border="true" size="medium ">
                                <el-table-column label="集市数据表名" prop="datatable_en_name" align="center">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.datatable_en_name}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="占用空间大小" prop="soruce_size" align="center">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.soruce_size}}</p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-row class="bottomMargin">

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
        <!--<el-form :model="formImport" ref="formImport">-->
        <!--<el-form-item label="上传要导入的集市工程">-->
        <!--<el-upload class="upload-demo" ref="upload" accept=".hrds" :fileList="fileList" action=""-->
        <!--:auto-upload="false" :on-change="handleChange">-->
        <!--<el-button size="small" type="primary">选择上传文件</el-button>-->
        <!--</el-upload>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogFormVisibleImport = false" size="mini" type="danger">取 消</el-button>-->
        <!--<el-button type="primary" @click="upload('formImport')" size="mini">上传</el-button>-->
        <!--</div>-->
        <!--</el-dialog>-->

        <el-dialog title="导入Excel" :visible.sync="dialogImportData" :before-close="importDatacancel">
            <span v-if="fileList != ''">确认导入 “ {{fileList[0].name}} ” </span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="importDatacancel" size="mini" type="danger">取消</el-button>
                <el-button type="primary" @click="importData" size="mini">确定</el-button>
            </div>
        </el-dialog>

        <transition name="fade">
            <loading v-if="isLoading"/>
        </transition>

    </div>

</template>

<script>
    import * as validator from "@/utils/js/validator";
    import regular from "@/utils/js/regular";
    import * as functionAll from "./marketAction";
    import * as message from "@/utils/js/message";
    import Loading from '../../components/loading'

    let arr = [];
    export default {
        components: {
            Loading
        },
        data() {
            return {
                fileList: [],
                dialogImportData: false,
                SumTotal: [],
                formLabelWidth: "150px",
                alldslinfomart: [],
                marketinfo: {},
                dialogofmarketadd: false,
                formAdd: {
                    mart_name: "",
                    mart_number: "",
                    mart_desc: ""
                },
                rule: validator.default,
                formImport: {},
                isLoading: false,
                tabletop5indsl: [],
            };
        },
        mounted() {
            this.getAllDslInMart();
            this.getMarketInfo();
            this.getTableTop5InDsl();
        },
        methods: {
            getAllDslInMart() {
                functionAll.getAllDslInMart().then(res => {
                    this.alldslinfomart = res.data;
                })
            },
            getTableTop5InDsl() {
                functionAll.getTableTop5InDsl().then(res => {
                    this.tabletop5indsl = res.data;
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
                message.confirmMsg('确定导出 ' + mart_name + ' 吗').then(res => {
                    let that = this;
                    functionAll.downloadMart({
                        data_mart_id: data_mart_id
                    }).then(res => {
                        // if (res && res.success) {
                        let filename = mart_name + ".hrds"
                        const blob = new Blob([res.data]);
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
                    })
                }).catch(() => {
                })
            },
            // upload(formName) {
            //     this.isLoading = true;
            //     this.$refs[formName].validate(valid => {
            //         console.log(this.fileList[0]);
            //         if (valid) {
            //             let param = new FormData() // 创建form对象
            //             param.append('file', this.fileList[0].raw);
            //             functionAll.uploadFile(param).then(res => {
            //                 this.isLoading = false;
            //                 if (res && res.success) {
            //                     this.$message({
            //                         type: "success",
            //                         message: "上传成功!"
            //                     });
            //                     // 隐藏对话框
            //                     this.dialogFormVisibleImport = false;
            //                     // 表单清空
            //                     this.formImport = {};
            //                     location.reload();
            //                 } else {
            //                     this.$emit(response.message);
            //                 }
            //             });
            //         }
            //     })
            // },
            deletemart(mart_name, data_mart_id) {
                message.confirmMsg('确定删除 ' + mart_name + ' 吗').then(res => {
                    this.isLoading = true;
                    functionAll.deleteMart({"data_mart_id": data_mart_id}).then(res => {
                        this.isLoading = false;
                        if (res && res.success) {
                            this.$message({
                                type: "success",
                                message: "删除成功"
                            });
                            location.reload();
                        }
                    });
                }).catch(() => {
                })
            },
            editmart(data_mart_id) {
                this.dialogofmarketadd = true;
                functionAll.getdminfo({"data_mart_id": data_mart_id}).then(res => {
                    this.formAdd = res.data[0];
                });
            },
            handleChange(file, fileList) {
                this.fileList = fileList;
                if (fileList.length != 0) {
                    this.dialogImportData = true;
                } else {
                    this.dialogImportData = false;
                }
                arr = fileList;
            },
            //文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.warning(`只能选择一个文件`);
            },
            importDatacancel() {
                this.dialogImportData = false;
                this.fileList = [];
                this.$message.info('已取消上传');
            },
            importData() {
                if (arr.length > 0) {
                    let param = new FormData() // 创建form对象
                    for (let i = 0; i < arr.length; i++) {
                        param.append('file', arr[i].raw);
                    }
                    this.isLoading = true;
                    functionAll.uploadFile(param).then(res => {
                        this.isLoading = false;
                        this.dialogImportData = false;
                        if (res.code == 200) {
                            message.customizTitle("文件上传成功", "success");
                            this.querydmdatatable(this.data_mart_id);
                            this.fileList = [];
                            location.reload();
                        }
                    });
                    this.isLoading = false;
                } else {
                    message.customizTitle("请选择上传文件", "warning");
                }
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


    /* 遮料层样式 */
    .boxshletr {
        width: 106px;
        height: 28px;
        background: black;
        opacity: 0.6;
        position: absolute;
        bottom: -20px;
        left: -3px;
        display: none;
    }

    .dataSheetmainDiv:hover {
        background: #286090;
        cursor: pointer;
    }

    .dataSheetmainDiv:hover .boxshletr {
        display: block;
    }

    .dataSheetmainDiv2:hover .boxshletr {
        display: block;
    }

    .dataSheetmainDiv {
        margin-bottom: 50px;
        padding-top: 10px;
        width: 100px;
        height: 80px;
        background: #337ab7;
        border-radius: 10px;
        margin-right: 50px;
        text-align: center;
        float: left;
        position: relative;
    }

    .dataSheetmainDiv2 {
        margin-bottom: 50px;
        padding-top: 10px;
        width: 100px;
        height: 80px;
        background: #337ab7;
        border-radius: 10px;
        margin-right: 50px;
        text-align: center;
        float: left;
        position: relative;
    }

    .el-tabs {
        margin-top: 0px
    }


    .dataSheetmainDiv p {
        color: #fff;
        margin-left: 5px;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .dataSheetmainDiv2 p {
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

    /* 标签定位 */
    .dataSheetmainDiv2 span {
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

    /* 字体描述定位 */
    .dataSheetmainDiv2 .postionP {
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
        margin-bottom: 15px;
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

    /* 按钮设置 */
    .editBtn {
        padding: 0;
    }

    .buttonStyle {
        display: block;
        float: left;
        margin-right: 10px;
        margin-left: 0px;
    }

</style>
