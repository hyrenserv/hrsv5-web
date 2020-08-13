<template>
<div id="marketIndex">
    <el-row class='topTitle topTitleLocal'>
        <span>数据加工</span>
    </el-row>
    <span class="top3title">存储层表数量</span>
    <el-row class="bottomMargins" :gutter="20">
        <el-col v-for="item in alldslinfomart" :key="item.dsl_name" :span="3">
            <div class="elcolFor">
                <i class='el-icon-menu' style="font-size:30px"></i>
                <el-row>
                    <div style="font-size: 12px;padding: 0 4px;text-align: center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.dsl_name}}表数</div>
                </el-row>
                <el-row class="elcolCount">{{item.count}}</el-row>
            </div>
        </el-col>
    </el-row>

    <el-row>
        <div>
            <span class="top3title">工程列表</span>
            <div class="elButton">
                <el-button type="primary" tab-position="top" @click="addClickDiloag" size="small">
                    <i class="el-icon-circle-plus-outline"></i>新增工程
                </el-button>
                <el-upload class="buttonStyle" accept=".hrds" action="" :show-file-list="false" :auto-upload="false" :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
                    <el-button size="small" type="primary">
                        <i class="fa fa-cloud-upload"></i> 导入工程
                    </el-button>
                </el-upload>
            </div>
        </div>
    </el-row>
    <div class="dataSheetmain">
        <el-col :span="3" v-for="(item,index) in marketinfo" :key="index">
            <div class="dataSheetmainDiv">
                <div @click="gotomartdetail(item.data_mart_id)" style="margin-top:6px;">
                    <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                    <p>{{item.mart_name}}</p>
                </div>
                <div class="boxshletr">
                    <el-button type="text" class="editBtn" title="编辑" @click="editmart(item.data_mart_id)">
                        <i class="fa fa-pencil fa-lg" style="width:12px;height:12px"></i>
                    </el-button>
                    <el-button type="text" class="editBtn" title="下载" @click="downloadmart(item.mart_name,item.data_mart_id)">
                        <i class="fa fa-download fa-lg"></i>
                    </el-button>
                    <el-button type="text" class="editBtn" title="查看工程信息" @click="viewmart(item.mart_name,item.data_mart_id)">
                        <i class="fa fa-eye fa-lg"></i>
                    </el-button>
                    <el-button type="text" class="editBtn" title="删除" @click="deletemart(item.mart_name,item.data_mart_id)">
                        <i class="fa fa-trash fa-lg"></i>
                    </el-button>
                </div>
            </div>
        </el-col>

    </div>
    <div class="titleSpan">
        <span class="top3title">存储层表top5</span>
    </div>

    <div>
        <el-col :span="8" v-for="(item,index) in tabletop5indsl" :key="index">
            <div class="tableDiv">
                <el-row>
                    <div class="titlep">存储层:{{item.dsl_name}}</div>
                </el-row>
                <el-row>
                    <el-table :data="item.result" border stripe size="medium " height="266">
                        <el-table-column label="工程数据表名" show-overflow-tooltip prop="datatable_en_name" align="center">
                        </el-table-column>
                        <el-table-column label="占用空间大小" show-overflow-tooltip prop="soruce_size" align="center">
                        </el-table-column>
                    </el-table>
                </el-row>
            </div>
        </el-col>
    </div>

    <el-row class="bottomMargin">

    </el-row>

    <el-dialog :title="titleChange" :visible.sync="dialogofmarketadd" width="1040px" :before-close="cancleAdd">
        <el-form :model="formAdd" ref="formAdd">
            <el-col :span="12">
                <el-form-item label="工程名称" :label-width="formLabelWidth" prop="mart_name" :rules="rule.default">
                    <el-input v-model="formAdd.mart_name" @input="getInputvalue" @focus="focusData" size="small" autocomplete="off" placeholder="工程名称" style="width:284px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="工程编号" :label-width="formLabelWidth" prop="mart_number" :rules="rule.default">
                    <el-input v-model="formAdd.mart_number" size="small" autocomplete="off" placeholder="工程编号" style="width:284px"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="备注" :label-width="formLabelWidth" prop="mart_desc">
                    <el-input type="textarea" v-model="formAdd.mart_desc" size="small" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-button size="small" class="addNew" @click="addNewData" type="primary">新建分类</el-button>
            </el-col>

            <el-table stripe :data="formAdd.tableDataAdd" border size="medium">
                <el-table-column prop="category_num" label="分类编号" align="center" width="180">
                    <template slot-scope="scope">
                        <!-- <el-form-item v-if="scope.row.show == false" :prop="`codeMaintenanceTableDataScoureAdd.${scope.$index}.orig_value`" :rules="filter_rules([{required: true}])"> -->
                        <el-input size="mini" v-model="scope.row.category_num" placeholder="分类编号"></el-input>
                        <!-- </el-form-item> -->
                    </template>
                </el-table-column>

                <el-table-column prop="category_name" label="分类名称" align="center" width="180">
                    <template slot-scope="scope">
                        <!-- <el-form-item :prop="`codeMaintenanceTableDataScoureAdd.${scope.$index}.orig_value`" :rules="filter_rules([{required: true}])"> -->
                        <el-input size="mini" v-model="scope.row.category_name" @input="changScopeValue(scope.row,scope.$index)" placeholder="分类名称"></el-input>
                        <!-- </el-form-item> -->
                    </template>
                </el-table-column>

                <el-table-column prop="parent_category_id" label="设置上级分类" align="center">
                    <template slot-scope="scope">
                        <el-input size="mini" v-model="scope.row.parent_category_id" readonly style="width:180px; margin-right:10px;" placeholder="源系统编码值"></el-input>
                        <el-button type="primary" @click="chooseScopeId(scope.$index, scope.row)" size="mini">选择上级分类</el-button>
                        <el-button type="danger" @click="resetScopeId(scope.$index)" size="mini">重置</el-button>
                    </template>
                </el-table-column>

                <el-table-column prop="category_desc" label="分类描述" align="center" width="130">
                    <template slot-scope="scope">
                        <el-button type="success" @click="addDecTbale(scope.$index)" size="mini">填写分类描述</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="delteThisDataScoure(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

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
            <el-button type="primary" @click="getImportFilePath" size="mini">确定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="分类描述" :visible.sync="diolagaddDecTbale" :before-close="diolagaddDecTbalecancel" width="680px">
        <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="textareaDsc">
        </el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="diolagaddDecTbalecancel" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="diolagaddDecTbalesave" size="mini">确定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="分类信息" :visible.sync="chooseScopeIdDiolag" :before-close="chooseScopeIdDiolagcancel" width="680px">
        <div class="mytree"  hight='200'>
            <el-tree :data="dataTree" show-checkbox :indent='0' node-key="label" ref="tree" :check-strictly="true" :props="defaultProps" @check-change="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span></span>
            </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="chooseScopeIdDiolagcancel" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="chooseScopeIdDiolagsave" size="mini">确定</el-button>
        </div>
    </el-dialog>

    <transition name="fade">
        <loading v-if="isLoading" />
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
            diolagaddDecTbale: false,
            chooseScopeIdDiolag: false,
            textareaDsc: "",
            formAdd: {
                mart_name: "",
                mart_number: "",
                mart_desc: "",
                tableDataAdd: [],
            },
            rule: validator.default,
            formImport: {},
            isLoading: false,
            tabletop5indsl: [],
            currentPage: 1,
            pageSize: 10,
            addDecindex: '',
            chooseScopeIdRow: '',
            chooseScopeIdIndex: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            dataTree: [],
            shortRowMark: '',
            addOrUpdate: false,
            markLength: '',
            markLengthTable: '',
            titleChange: '',
            focusDataTable: [],
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
                    let arr = JSON.parse(JSON.stringify(this.formAdd.tableDataAdd))
                    if (this.addOrUpdate == true) { //判断是新增还是更新
                        arr.forEach((item => {
                            if (item.parent_category_idMark) { //如果存在这个就是编辑时候被更改了
                                if (item.parent_category_idMarkNum == 'id') { //添加已经存入的后台数据为上一级信息
                                    item.parent_category_id = item.parent_category_idMark;
                                } else if (item.parent_category_idMarkNum == 'label') { //新增时未保存到后台的数据作为上一级信息
                                    item.parent_category_name = item.parent_category_idMark;
                                    item.parent_category_id = null;
                                }
                                delete item.parent_category_idMark;
                                delete item.parent_category_idMarkNum;
                            } else {
                                if (item.parent_category_ids) { //之前就存在的且没有更改这一项的东西
                                    item.parent_category_id = item.parent_category_ids
                                    delete item.parent_category_ids;
                                } else { //单纯的点击新增分类且以集市工程为上一级
                                    item.parent_category_name = item.parent_category_id;
                                    item.parent_category_id = null;
                                }
                            }
                        }))
                        this.formAdd.categoryRelationBeans = arr;
                        this.formAdd.categoryRelationBeans = JSON.stringify(this.formAdd.categoryRelationBeans)
                        let obj = Object.assign({}, this.formAdd)
                        delete obj.tableDataAdd;
                        functionAll.addMarket(obj).then((res => {
                            if (res && res.success) {
                                this.$message({
                                    type: "success",
                                    message: "更新成功!"
                                });
                                // 隐藏对话框
                                this.dialogofmarketadd = false;
                                // 表单清空
                                this.formAdd.tableDataAdd = [];
                                this.$refs.formAdd.resetFields();
                                this.getMarketInfo();
                                this.dataTree = [];
                            }
                        }))
                    } else if (this.addOrUpdate == false) {
                        arr.forEach(item => {
                            if (item.parent_category_id == this.formAdd.mart_name) { //集市工程作为上一级
                                item.parent_category_name = item.parent_category_id;
                                item.parent_category_id = null;
                            } else { //新建的分类信息作为上级的关系
                                item.parent_category_name = item.parent_category_id;
                                item.parent_category_id = null;
                            }
                        })
                        this.formAdd.categoryRelationBeans = arr;
                        this.formAdd.categoryRelationBeans = JSON.stringify(this.formAdd.categoryRelationBeans)
                        let obj = Object.assign({}, this.formAdd)
                        delete obj.tableDataAdd;
                        functionAll.addMarket(obj).then((res => {
                            if (res && res.success) {
                                this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                // 隐藏对话框
                                this.dialogofmarketadd = false;
                                // 表单清空
                                this.formAdd.tableDataAdd = [];
                                this.$refs.formAdd.resetFields();
                                this.getMarketInfo();
                                this.dataTree = [];
                            }
                        }))
                    }
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
            // 隐藏对话框
            this.dialogofmarketadd = false;
            this.formAdd.tableDataAdd = [];
            this.$refs.formAdd.resetFields();
            this.dataTree = [];
        },
        // 打开新增集市框
        addClickDiloag() {
            this.titleChange = "新增工程";
            this.dialogofmarketadd = true;
            this.addOrUpdate = false;
            this.formAdd = {
                mart_name: "",
                mart_number: "",
                mart_desc: "",
                tableDataAdd: [],
            }
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
            }).catch(() => {})
        },
        deletemart(mart_name, data_mart_id) {
            message.confirmMsg('确定删除 ' + mart_name + ' 吗').then(res => {
                this.isLoading = true;
                functionAll.deleteMart({
                    "data_mart_id": data_mart_id
                }).then(res => {
                    this.isLoading = false;
                    if (res && res.success) {
                        this.$message({
                            type: "success",
                            message: "删除成功"
                        });
                        this.getMarketInfo();
                    }
                });
            }).catch(() => {})
        },
        // 编辑集市
        editmart(data_mart_id) {
            this.titleChange = "编辑工程";
            this.addOrUpdate = true;
            this.dialogofmarketadd = true;
            let getformInfo = new Promise((resolve, reject) => {
                // 获取form数据
                functionAll.getdminfo({
                    "data_mart_id": data_mart_id
                }).then(res => {
                    resolve(res.data)
                });
            })
            let getTableinfo = new Promise((resolve, reject) => {
                // 获取表格数据
                functionAll.getDmCategoryInfo({
                    data_mart_id: data_mart_id
                }).then(res => {
                    resolve(res.data)
                })
            })

            let getDmCategoryTreeData = new Promise((resolve, reject) => {
                //获取树数据
                functionAll.getDmCategoryTreeData({
                    data_mart_id: data_mart_id
                }).then((res) => {
                    resolve(res.data)
                })
            })
            // 数据处理显示
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            Promise.all([getformInfo, getTableinfo, getDmCategoryTreeData]).then(res => {
                arr1 = res[0];
                arr2 = res[1];
                arr3 = res[2];
                arr3.forEach(item => {
                    item.label = item.description
                })
                this.dataTree = arr3;
                this.formAdd = arr1;
                this.treeForeach(arr3, node => {
                    arr2.forEach(val => {
                        if (val.parent_category_id == node.id) {
                            val.parent_category_ids = val.parent_category_id;
                            val.parent_category_id = node.label
                        }
                    })
                })
                this.markLengthTable = arr2.length;
                this.markLength = this.dataTree.length;
                this.formAdd.tableDataAdd = arr2;
            })
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
        getImportFilePath() {
            if (arr.length > 0) {
                let param = new FormData() // 创建form对象
                for (let i = 0; i < arr.length; i++) {
                    param.append('file', arr[i].raw);
                }
                this.isLoading = true;
                functionAll.getImportFilePath(param).then(res => {
                    this.isLoading = false;
                    if (res && res.success) {
                        this.dialogImportData = false;
                        this.$router.push({
                            path: 'importReview',
                            query: {
                                file_path: res.data,
                            }
                        })
                        this.fileList = [];
                    }
                });
            } else {
                this.$Msg.customizTitle("请选择上传文件", "warning");
            }
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
                        this.$Msg.customizTitle("文件上传成功", "success");
                        this.querydmdatatable(this.data_mart_id);
                        this.fileList = [];
                        location.reload();
                    }
                });
                this.isLoading = false;
            } else {
                this.$Msg.customizTitle("请选择上传文件", "warning");
            }
        },
        //根据默认显示
        getInputvalue(val) {
            if (this.formAdd.tableDataAdd.length != 0) {
                this.focusDataTable.forEach((item, index) => {
                    this.formAdd.tableDataAdd[item].parent_category_id = this.formAdd.mart_name;
                })
            }
        },
        // 更改前获取上一次的值
        focusData(val) {
            this.focusDataTable = []; //每次清空缓存
            this.formAdd.tableDataAdd.forEach((item, index) => {
                if (item.parent_category_id == this.formAdd.mart_name) {
                    this.focusDataTable.push(index)
                }
            })
        },
        //添加新分类
        addNewData() {
            if (this.addOrUpdate == true) { //编辑
                this.formAdd.tableDataAdd.push({
                    category_num: '',
                    category_name: '',
                    parent_category_id: this.formAdd.mart_name
                });
                this.dataTree.push({
                    label: '',
                    children: []
                })

            } else if (this.addOrUpdate == false) { //新增
                this.formAdd.tableDataAdd.push({
                    category_num: '',
                    category_name: '',
                    parent_category_id: this.formAdd.mart_name
                });
                this.dataTree.push({
                    label: '',
                    children: []
                })
            }

        },
        // 删除新分类
        delteThisDataScoure(index, row) {
            if (this.addOrUpdate == true) { //编辑的时候
                if (row.category_id) { //编辑时删除后台的表格信息
                    functionAll.deleteDmCategory({
                        category_id: row.category_id
                    }).then(res => {
                        if (res && res.success) {
                            this.formAdd.tableDataAdd.splice(index, 1);
                            this.dataTree.splice(index, 1);
                        }
                    })
                } else { //编辑时删除前台的表格信息
                    this.formAdd.tableDataAdd.splice(index, 1);
                    let indexinfo = this.dataTree.findIndex(item => item.label == row.category_name);
                    if (indexinfo != -1) {
                        this.dataTree.splice(indexinfo, 1);
                    } else {
                        this.treeForeach(this.dataTree, node => {
                            if (node.children.length > 0) {
                                let i = node.children.findIndex(item => item.label == row.category_name);
                                if (i != -1) {
                                    this.$refs.tree.remove(node.children[i])
                                }
                            }
                        })
                    }

                }

            } else if (this.addOrUpdate == false) { //新增时候
                this.formAdd.tableDataAdd.splice(index, 1);
                let indexinfo = this.dataTree.findIndex(item => item.label == row.category_name);
                if (indexinfo != -1) {
                    this.dataTree.splice(indexinfo, 1);
                } else {
                    this.treeForeach(this.dataTree, node => {
                        if (node.children.length > 0) {
                            let i = node.children.findIndex(item => item.label == row.category_name);
                            if (i != -1) {
                                this.$refs.tree.remove(node.children[i])
                            }
                        }
                    })
                }
            }
        },
        // 添加描述分类信息
        addDecTbale(index) {
            this.addDecindex = index;
            this.diolagaddDecTbale = true;
            this.textareaDsc = this.formAdd.tableDataAdd[this.addDecindex].category_desc;
        },
        // 确认按钮信息分类描述
        diolagaddDecTbalesave() {
            this.formAdd.tableDataAdd[this.addDecindex].category_desc = this.textareaDsc;
            this.diolagaddDecTbale = false;
            this.textareaDsc = '';
        },
        //取消按钮信息分类描述
        diolagaddDecTbalecancel() {
            this.diolagaddDecTbale = false;
            this.textareaDsc = '';
        },
        // 重置信息分类id
        resetScopeId(index) {
            this.formAdd.tableDataAdd[index].parent_category_id = this.formAdd.mart_name;
        },
        // 选择上级分类
        chooseScopeId(index, row) {
            this.chooseScopeIdRow = row;
            this.chooseScopeIdIndex = index;
            let mark = this.formAdd.tableDataAdd.every((item) => {
                return item.category_name != '' && item.category_num != ''
            })
            if (mark == false) {
                this.$Msg.customizTitle("请填写每项分类名称与编号", "warning");
            } else if (mark == true) {
                this.chooseScopeIdDiolag = true;
            }
        },
        // 取消上级分类弹出框
        chooseScopeIdDiolagcancel() {
            this.$refs.tree.setCheckedKeys([]);
            this.chooseScopeIdDiolag = false;
        },
        // 确认上级分类弹出框
        chooseScopeIdDiolagsave() {
            this.$refs.tree.setCheckedKeys([]); //清空树的选中状态
            this.chooseScopeIdDiolag = false; //关闭弹出框
        },
        //树循环递归
        treeForeach(tree, func) {
            tree.forEach(data => {
                func(data)
                data.children && this.treeForeach(data.children, func) // 遍历子树
            })
        },
        // 选择节点或者点击node
        handleNodeClick(val, val2, val3) {
            if (val2 == true) { //选中状态时
                if (val.label == this.chooseScopeIdRow.category_name) {
                    this.$refs.tree.setCheckedKeys([{ //改变更改的状态
                        label: val.label
                    }]);
                    this.$Msg.customizTitle("不能选择同名的分类", "warning");
                } else {
                    let object = {};
                    this.treeForeach(this.dataTree, node => { //获取新增节点的信息
                        if (node.label == this.chooseScopeIdRow.category_name) {
                            object = Object.assign({}, node);
                        }
                    })

                    let indexmark = val.children.findIndex(item => item.label == object.label);
                    if (indexmark == -1) {
                        val.children.push(object); //新增数
                    }
                    let indexs = this.dataTree.findIndex(item => item.label == this.chooseScopeIdRow.category_name);
                    if (indexs != -1) { //代表在第一层删除树
                        this.dataTree.splice(indexs, 1);
                    } else { //遍历寻找他的父节点然后去删除
                        this.treeForeach(this.dataTree, node => {
                            if (node.children.length > 0) {
                                let i = node.children.findIndex(item => item.label == this.chooseScopeIdRow.category_name);
                                if (i != -1) {
                                    this.$refs.tree.remove(node.children[i])
                                }
                            }
                        })
                    }
                    this.$refs.tree.setCheckedNodes([ //只选中当前的节点
                        {
                            label: val.label
                        }
                    ])
                }
            }
            if (val.id) {
                this.formAdd.tableDataAdd[this.chooseScopeIdIndex].parent_category_idMarkNum = 'id';
                this.formAdd.tableDataAdd[this.chooseScopeIdIndex].parent_category_idMark = val.id;
            } else {
                this.formAdd.tableDataAdd[this.chooseScopeIdIndex].parent_category_idMarkNum = 'label';
                this.formAdd.tableDataAdd[this.chooseScopeIdIndex].parent_category_idMark = val.label;
            }
            this.formAdd.tableDataAdd[this.chooseScopeIdIndex].parent_category_id = val.label;
        },
        // 填写每一个名称改变数的label
        changScopeValue(row, index) {
            this.shortRowMark = row;
            if (this.addOrUpdate == true) { //编辑
                this.dataTree[index - this.markLengthTable + this.markLength].label = row.category_name;
            } else { //新增
                this.dataTree[index].label = row.category_name;
            }

        },
        // 查看集市详情
        viewmart(name, id) {
            this.$router.push({
                name: 'addMarketIndex',
                query: {
                    name: name,
                    id: id
                }
            })
        },

    }
};
</script>

<style scoped>
.dataSheetmain {
    padding-left: 30px;
    border: 1px solid #dddddd;
    min-height: 124px;
    padding-top: 30px;
    overflow: hidden;
    margin-bottom: 10px;
}

/* 遮料层样式 */
.boxshletr {
    width: 106px;
    height: 28px;
    background: black;
    opacity: 0.6;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: none;
    border-radius: 4px;
}

.topTitleLocal {
    margin-bottom: 6px !important;
}

.dataSheetmainDiv:hover {
    background: #286090;
    cursor: pointer;
}

.dataSheetmainDiv:hover .boxshletr {
    display: block;
}

.fa {
    color: white;
}

.dataSheetmainDiv {
    margin: 0 auto;
    margin-bottom: 30px;
    padding-top: 10px;
    width: 106px;
    height: 80px;
    background: #337AB7;
    border-radius: 4px;
    margin-right: 30px;
    text-align: center;
    float: left;
    position: relative;
}

.el-tabs {
    margin-top: 0px
}

.dataSheetmainDiv p {
    margin-top: 4px;
    color: #fff;
    margin-left: 5px;
    font-size: 16px;
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

/* 底部边距 */
.bottomMargin {
    margin-bottom: 1%;
}

.top3title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #2196f3;
    font-size: 16px;
}

.titleSpan {
    border-bottom: 1px solid #e6e3e3;
    width: 100%;
}

.elButton {
    float: right;
    margin-top: 4px;

}

.addNew {
    float: right;
    margin-bottom: 2px;
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

/* top3设置 */
.tableDiv {
    padding: 10px;
    margin-bottom: 10px;
}

.elcolFor {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    background: #7BA9D0;
    padding: 10px 0;
    border-radius: 4px;
    color: #fff;
    margin: 0 10px;
}

.bottomMargins {
    border: 1px solid #e6e6e6;
    padding: 10px;
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 10px !important;
}

/* top5标题 */
.titlep {
    text-align: center;
    font-size: 17px;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #2196f3
}
</style>
