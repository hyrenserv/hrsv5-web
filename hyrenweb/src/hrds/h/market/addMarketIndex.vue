<template>
<div class="addMarketIndex">
    <el-row class='topTitle'>
        <span>工程信息</span>
        <router-link to="/dataMart">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>

    <el-row>
        <el-col :span="6" class="elCol8Marketindex" style="height:70vh">
            <el-row>
                <p class="workInfoMarketindex">
                    工程分类信息
                </p>

                <div class="mytree"  hight='200'>
                    <el-tree :indent='0' :data="dataTree" :check-strictly="true" :props="defaultProps" @node-click="handleNodeClick" ref="tree">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </el-row>
        </el-col>

        <el-col :span="18">
            <el-row>
                <el-col :span="23" :offset="1" class="elCol8Marketindex">
                    <div class="workInfoMarketindex">
                        <span>分类节点信息</span>
                        <div class="buttonDivMarketindex">
                            <el-button type="primary" size="mini" @click="changeName">修改</el-button>
                            <el-button type="danger" size="mini" @click="deleteName">删除</el-button>
                            <el-button type="success" size="mini" @click="addDataName">新建分类</el-button>
                        </div>
                    </div>
                    <div id="jsmind_container" @click="getclickNode" :style="{width: '100%', height: '180px'}"></div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="23" :offset="1">
                    <p class="workInfoMarketindex">
                        该分类下的模型表
                    </p>
                    <el-table :data="tableData" border stripe size="medium" style="width: 100%">
                        <el-table-column type="index" width="60" label="序号" align='center'>
                        </el-table-column>
                        <el-table-column prop="category_name" width="110" label="分类名称" align='center'>
                        </el-table-column>
                        <el-table-column prop="datatable_en_name" label="英文表名" show-overflow-tooltip align='center'>
                        </el-table-column>
                        <el-table-column prop="datatable_cn_name" label="中文表名" show-overflow-tooltip align='center'>
                        </el-table-column>
                        <el-table-column label="操作" width="250" align='center'>
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="editdmdatatable(scope.row)">编辑
                                </el-button>
                                <el-button size="mini" type="text" @click="producefun(scope.row)">生成作业
                                </el-button>
                                <el-button size="mini" type="text" @click="pushtoaddmart3(scope.row)">立即执行
                                </el-button>
                                <el-button size="mini" type="text" @click="downloaddmdatatable(scope.row)">导出
                                </el-button>
                                <el-button size="mini" type="text" @click="deletedmdatatable(scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <!-- 更改当前分类名 -->
    <el-dialog title="修改分类" :visible.sync="dialogchangeName" width="540px" :before-close="cancleAdd">
        <el-form :model="formChangeName" ref="formChangeName" class="demo-ruleForm" label-width="130px">
            <el-form-item label="分类名称" prop="category_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formChangeName.category_name" style="width:300px" autocomplete="off" placeholder="分类名称"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="addChangeName('formChangeName')" size="mini">修改</el-button>
        </div>
    </el-dialog>

    <!-- 新建分类名 -->
    <el-dialog title="新增分类" :visible.sync="dialogDataName" width="540px" :before-close="cancleDataName">
        <el-form :model="formDataName" ref="formDataName" class="demo-ruleForm" label-width="130px">
            <el-form-item label="分类名称" prop="category_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDataName.category_name" style="width:300px" autocomplete="off" placeholder="分类名称"></el-input>
            </el-form-item>

            <el-form-item label="分类编号" prop="category_num" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDataName.category_num" style="width:300px" autocomplete="off" placeholder="分类编号"></el-input>
            </el-form-item>

            <el-form-item label="工程名称" prop="data_mart_ids" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDataName.data_mart_ids" readonly style="width:300px" autocomplete="off" placeholder="工程名称"></el-input>
            </el-form-item>

            <el-form-item label="选择上级分类" prop="parent_category_id">
                <el-select v-model="formDataName.parent_category_id" clearable placeholder="--选择上级分类--" style="width:300px">
                    <el-option v-for="item in codeStatus" :key="item.category_id" :label="item.category_name" :value="item.category_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类描述" prop="category_desc">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formDataName.category_desc" style="width:300px">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleDataName" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="addDataNamesave('formDataName')" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 生成作业 -->
    <el-dialog title="生成作业" :visible.sync="dialogProdeceJobs" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">生成作业</span>
        </div>
        <el-form ref="separatorData" label-width="240px" text-align="center">
            <el-form-item label="选择工程">
                <el-select placeholder="选择工程" v-model="selectedetlsys" @change="queryetltaskbyetlsys" style="width: 190px;" size="medium">
                    <el-option v-for="(item,index) in alletlsys" :key="index" :label="item.etl_sys_cd" :value="item.etl_sys_cd"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择任务">
                <el-select placeholder="选择任务" v-model="selectedetltask" style="width: 190px;" size="medium">
                    <el-option v-for="(item,index) in alletltask" :key="index" :label="item.sub_sys_cd" :value="item.sub_sys_cd"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialogProdeceJobs = false">取 消</el-button>
            <el-button type="primary" size="mini" @click="savemartjobtoetl()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 导入excel表 -->
    <!-- <el-dialog title="导入Excel" :visible.sync="dialogImportData" :before-close="importDatacancel">
        <span v-if="fileList != ''">确认导入 “ {{fileList[0].name}} ” </span>
        <div slot="footer" class="dialog-footer">
            <el-button @click="importDatacancel" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="importData" size="mini">保存</el-button>
        </div>
    </el-dialog> -->
</div>
</template>

<script>
import * as functionAll from "./marketAction";
import * as message from "@/utils/js/message";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as chartMind from 'jsmind';
require('@/assets/css/jsmind.css');
let _jm = null;
let flag = 0;
export default {
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            dataTree: [],
            dialogchangeName: false,
            dialogDataName: false,
            dialogProdeceJobs: false,
            dialogImportData: false,
            formChangeName: {
                category_name: '',
            },
            formDataName: {
                category_name: '',
                category_num: '',
                parent_category_id: '',
                data_mart_ids: this.$route.query.name,
                category_desc: ''
            },
            timeObj: {},
            codeStatus: [],
            rule: validator.default,
            tableData: [],
            alletlsys: [],
            alletltask: [],
            selecteddatatable_id: "",
            selectedetltask: "",
            selectedetlsys: "",
        }

    },
    mounted() {
        // 获取页面初始数据
        this.getDmCategoryTreeData(this.$route.query.id);
        this.getDmCategoryNodeInfo(this.$route.query.id);
        this.querydmdatatable(this.$route.query.id);
        flag = 0;
    },
    methods: {
        // 获取初始的数据
        getDmCategoryTreeData(data_mart_id) { //树信息
            functionAll.getDmCategoryTreeData({
                data_mart_id: data_mart_id
            }).then((res) => {
                this.dataTree = res.data;
            })
        },
        getDmCategoryNodeInfo(data_mart_id) { //所有节点信息
            functionAll.getDmCategoryNodeInfo({
                data_mart_id: data_mart_id
            }).then((res) => {
                if (flag == 0) {
                    this.open_empty();
                    this.tree(res.data);
                    flag = 1;
                } else {
                    this.tree(res.data);
                }
            })
        },
        getDmDataTableByDmCategory(data_mart_id, category_id) { //获取所有信息表通过节点
            functionAll.getDmDataTableByDmCategory({
                data_mart_id: data_mart_id,
                category_id: category_id
            }).then((res) => {
                this.tableData = res.data;
            })
        },

        // 点击树获取对应的节点信息详情
        handleNodeClick(val) {
            this.getDmCategoryNodeInfoByIdAndName(val.label, val.id); //树信息
            this.getDmDataTableByDmCategory(this.$route.query.id, val.id) //表格信息
        },
        // 点击树节点获取jsmind对应信息
        getDmCategoryNodeInfoByIdAndName(name, id) {
            functionAll.getDmCategoryNodeInfoByIdAndName({
                data_mart_id: this.$route.query.id,
                category_name: name,
                category_id: id
            }).then(res => {
                if (flag == 0) {
                    this.open_empty();
                    this.tree(res.data);
                    flag = 1;
                } else {
                    this.tree(res.data);
                }
            })
        },
        // jsmind方法
        open_empty() {
            var options = {
                container: 'jsmind_container',
                theme: 'info',
                editable: false, //是否启用编辑
                support_html: true
            }
            _jm = chartMind.show(options);
        },
        tree(data) {
            var mind = {
                "meta": {

                },
                "format": "node_array",
                "data": data
            }
            _jm.show(mind);
        },
        // 获取选择的节点信息
        getclickNode() {
            if (_jm.get_selected_node() == null) {
                return false
            } else {
                this.timeObj.category_id = _jm.get_selected_node().id;
                this.timeObj.category_name = _jm.get_selected_node().topic;
                this.getDmDataTableByDmCategory(this.$route.query.id, _jm.get_selected_node().id)
            }
        },
        // 修改分类名称
        changeName() {
            if (JSON.stringify(this.timeObj) == "{}") {
                this.$Msg.customizTitle("请选择一个分类名称修改", "warning");
                return false;
            } else {
                this.dialogchangeName = true;
            }

        },
        // 修改分类名称
        addChangeName(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.updateDmCategoryName({
                        category_id: this.timeObj.category_id,
                        category_name: this.formChangeName.category_name
                    }).then(res => {
                        if (res && res.success) {
                            this.$Msg.customizTitle('修改成功', 'success')
                            this.dialogchangeName = false;
                            this.$refs.formChangeName.resetFields();
                            this.getDmCategoryTreeData(this.$route.query.id);
                            this.getDmCategoryNodeInfo(this.$route.query.id);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 取消修改
        cancleAdd() {
            this.dialogchangeName = false;
            this.$refs.formChangeName.resetFields();
        },
        // 删除分类名称
        deleteName() {
            if (JSON.stringify(this.timeObj) == "{}") {
                this.$Msg.customizTitle("请选择一个分类名称删除", "warning");
                return false;
            } else {
                this.$confirm('确认删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    functionAll.deleteDmCategory({
                        category_id: this.timeObj.category_id
                    }).then(res => {
                        if (res && res.success) {
                            this.$Msg.customizTitle('删除成功', 'success')
                            this.getDmCategoryTreeData(this.$route.query.id);
                            this.getDmCategoryNodeInfo(this.$route.query.id);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        // 新建分类
        addDataName() {
            this.dialogDataName = true;
            this.getDmCategoryInfo()
        },
        // 获取上级分类信息
        getDmCategoryInfo() {
            functionAll.getDmCategoryInfo({
                data_mart_id: this.$route.query.id
            }).then(res => {
                this.codeStatus = res.data
            })
        },
        //保存新增名称
        addDataNamesave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let arr = [];
                    if (this.formDataName.parent_category_id == undefined || this.formDataName.parent_category_id == "") {
                        this.formDataName.parent_category_id = this.$route.query.id;

                    }
                    arr[0] = this.formDataName;
                    delete arr[0].data_mart_ids
                    functionAll.saveDmCategory({
                        data_mart_id: this.$route.query.id,
                        dmCategories: JSON.stringify(arr)
                    }).then(res => {
                        if (res && res.success) {
                            this.$Msg.customizTitle('添加成功', 'success')
                            this.dialogDataName = false;
                            this.$refs.formDataName.resetFields();
                            this.getDmCategoryTreeData(this.$route.query.id);
                            this.getDmCategoryNodeInfo(this.$route.query.id);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        //取消保存新增
        cancleDataName() {
            this.dialogDataName = false;
            this.$refs.formDataName.resetFields();
        },
        //编辑表格信息
        editdmdatatable(row) {
            this.$router.push({
                name: 'addMartTable_1',
                query: {
                    data_mart_id: this.$route.query.id,
                    datatable_id: row.datatable_id,
                    is_add: 1
                }
            });
        },
        // 生成作业
        producefun(row) {
            this.dialogProdeceJobs = true;
            this.selecteddatatable_id = row.datatable_id;
            functionAll.queryAllEtlSys().then((res) => {
                if (res && res.success) {
                    this.alletlsys = res.data;
                }
            })
        },
        // 更改select选择项
        queryetltaskbyetlsys() {
            functionAll.queryEtlTaskByEtlSys({
                "etl_sys_cd": this.selectedetlsys
            }).then((res) => {
                if (res && res.success) {
                    this.alletltask = res.data;
                }
            })
        },
        // 保存生成作业
        savemartjobtoetl() {
            let param = {
                "etl_sys_cd": this.selectedetlsys,
                "sub_sys_cd": this.selectedetltask,
                "datatable_id": this.selecteddatatable_id,
            }
            functionAll.generateMartJobToEtl(param).then((res) => {
                if (res && res.success) {
                    this.$message({
                        type: "success",
                        message: "成功"
                    });
                }
                this.dialogProdeceJobs = false;
            })
        },
        // 立即执行
        pushtoaddmart3(row) {
            this.$router.push({
                name: 'addMartTable_3',
                query: {
                    data_mart_id: this.$route.query.id,
                    datatable_id: row.datatable_id,
                }
            });
        },
        // 立即导出
        downloaddmdatatable(row) {
            let datatable_id = row.datatable_id;
            let datatable_en_name = row.datatable_en_name;
            message.confirmMsg('确定导出 ' + datatable_en_name + ' 吗').then(res => {
                let that = this;
                functionAll.downloadDmDatatable({
                    datatable_id: datatable_id
                }).then(res => {
                    // if (res && res.success) {
                    let filename = datatable_en_name + ".xlsx"
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
        // 删除表格的某一列
        deletedmdatatable(row) {
            let datatable_en_name = row.datatable_en_name;
            message.confirmMsg('确定删除 ' + datatable_en_name + ' 吗').then(res => {
                let param = {
                    "datatable_id": row.datatable_id
                }
                functionAll.deleteDMDataTable(param).then((res) => {
                    if (res && res.success) {
                        message.deleteSuccess(res);
                        this.querydmdatatable(this.$route.query.id);
                    }
                })
            }).catch(() => {})
        },
        // 获取表格初始值
        querydmdatatable(data_mart_id) {
            let param = {
                "data_mart_id": data_mart_id
            }
            functionAll.queryDMDataTableByDataMartID(param).then((res) => {
                if (res && res.success) {
                    this.tableData = res.data;
                }
            })
        },
    }
}
</script>

<style>
/* 按钮设置 */
.addMarketIndex .buttonDivMarketindex {
    float: right;
    margin-bottom: 4px;
    margin-right: 4px;
}

/* 左边数样式设置 */
.addMarketIndex .elCol8Marketindex {
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.addMarketIndex .workInfoMarketindex {
    height: 40px;
    line-height: 40px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 16px;
    padding-left: 10px;
    margin-bottom: 10px;
}
</style>
