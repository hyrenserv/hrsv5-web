<template>
<div id='dui_two'>
    <el-row style="margin-bottom:10px">
        <el-col :span='5'>
            <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="codeValue">
                <el-button slot="append" icon="el-icon-search" @click="searchDbmCodeTypeInfo"></el-button>
            </el-input>
        </el-col>
        <el-col :span='11'>&nbsp;</el-col>
        <el-col :span='8' style="text-align:right" class='allbutton'>
            <el-button size="mini" type="success" class="el-icon-upload" @click="batchReleaseDbmCodeTypeInfo">发布代码类</el-button>
            <el-button size="mini" type="primary" class='el-icon-circle-plus-outline' @click="addCodeClass()">新增代码类</el-button>
            <el-button size="mini" type="danger" class='el-icon-remove-outline' @click="delectcodeclassALLFun()">删除代码类</el-button>
        </el-col>
    </el-row>
    <!--  -->
    <el-table :data="tableData" :row-key="(row)=>{ return row.code_type_id}" @select-all='allselect' @selection-change="handleSelectionChange" style="width: 100%;min-height:200px" border class='outtable' size='medium' ref="multipleTable" @cell-click="cellClick" @filter-change="codeClass_fulterChangeFun">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-row style="margin-bottom:10px">
                    <el-col :span='5'>
                        <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="codeItem_Value">
                            <el-button slot="append" icon="el-icon-search" @click="searchDbmCodeItemInfo"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span='13'>&nbsp;</el-col>
                    <el-col :span='6' style="text-align:right" class='allbutton'>
                        <el-button size="mini" type="primary" @click="addCodeItemFun()">新增代码项</el-button>
                        <el-button size="mini" type="danger" class='el-icon-remove-outline' @click="delectcodeitemALLFun()">删除代码项</el-button>
                    </el-col>
                </el-row>
                <el-table :data="dataList.slice((itemcurrentPage - 1) * itempagesize, itemcurrentPage * itempagesize)" align="center" :empty-text="tableloadingInfo" stripe size='mini' class='in_tableColor' :row-key="(row)=>{ return row.code_item_id}" @selection-change="item_handleSelectionChange" @select-all='item_allselect'>
                    <el-table-column width="55" align="center" type="selection" :reserve-selection="true">
                    </el-table-column>
                    <el-table-column label="序号" align="center" width="60">
                        <template scope="scope">
                            <span>{{scope.$index+(itemcurrentPage - 1) * itempagesize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="code_encode" label="代码编号">
                    </el-table-column>
                    <el-table-column align="center" prop="code_item_name" label="代码名称" width="100" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column align="center" prop="code_value" label="代码值">
                    </el-table-column>
                    <el-table-column align="center" prop="dbm_level" label="层级">
                    </el-table-column>
                    <el-table-column align="center" prop="code_remark" label="代码描述" width="150" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class='editcolor' @click="editCodeItemFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" class='delcolor' @click="delCodeItemFun(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="item_handleSizeChange" @current-change="item_handleCurrentChange" :current-page="itemcurrentPage" :page-sizes="[10, 50, 100, 200]" :page-size="itempagesize" layout="total,prev, pager, next" :total="dataList.length" class='pagerigth'></el-pagination>
            </template>
        </el-table-column>
        <el-table-column width="55" align="center" type="selection" :reserve-selection="true">
        </el-table-column>
        <el-table-column label="序号" align="center" width="60">
            <template scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column label="代码编码" prop="code_encode" align="center">
        </el-table-column>
        <el-table-column label="代码类名" prop="code_type_name" align="center">
        </el-table-column>
        <el-table-column label="代码描述" prop="code_remark" align="center" width="150" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="发布状态" :filters="Releasestatus" column-key='Releasestatus' :filter-multiple="false" align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.code_status=='1'" class='issuecolor'>已发布</span>
                <span v-else>未发布</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text" size="small" class='editcolor' @click="EditCodeClassFun(scope.row)">编辑</el-button>
                <el-button type="text" size="small" class='issuecolor' @click="issueFun(scope.row)">发布</el-button>
                <el-button type="text" size="small" class='delcolor' @click="delectCodeClassFun(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" @prev-click='sig_preclickFun' @next-click='sig_nextclickFun' :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class='locationcenter'></el-pagination>
    <!-- 新增代码类弹框 -->
    <el-dialog title="新增代码类" :visible.sync="dialogaddCodeclassableVisible" width="40%" class='data_edit'>
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">{{title}}代码类</span>
        </div>
        <el-row>
            <el-form ref="codeClassData" label-width="86px" :model="codeClassData">
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="代码编码 : " prop="code_encode">
                                <el-input placeholder="代码编码" v-model="codeClassData.code_encode">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="代码类名 : " prop="code_type_name" :rules="filter_rules([{required: true}])">
                                <el-input placeholder="代码类名" v-model="codeClassData.code_type_name">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="代码描述 : " prop="code_remark">
                                <el-input placeholder="代码描述" v-model="codeClassData.code_remark" type="textarea">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-row>
                            <el-form-item label="发布状态 : " prop="code_status" :rules="rule.selected">
                                <el-select placeholder="发布状态" v-model="codeClassData.code_status" size="medium">
                                    <el-option v-for="(item,index) in Releasestatus" :key="index" :label="item.text" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialogaddCodeclassableVisible=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="codeClassSaveFun('codeClassData')">保存</el-button>
        </div>
    </el-dialog>
    <!-- 新增代码项弹框 -->
    <el-dialog title="新增代码项" :visible.sync="dialogaddCodeXableVisible" width="40%" class='data_edit'>
         <div slot="title">
            <span class="dialogtitle el-icon-caret-right">{{title}}代码项</span>
        </div>
        <el-row>
            <el-form ref="codeItemData" label-width="86px" :model="codeItemData">
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="代码编码 : " prop="codeNum">
                                <el-input placeholder="代码编码" v-model="codeItemData.codeNum">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="代码名称 : " prop="codeName" :rules="filter_rules([{required: true}])">
                                <el-input placeholder="代码名称" v-model="codeItemData.codeName">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="代码值 : " prop="codeValue">
                                <el-input placeholder="代码值" v-model="codeItemData.codeValue">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="层级 : " prop="codeleav">
                                <el-input placeholder="层级" v-model="codeItemData.codeleav">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="代码描述 : " prop="codeDesc">
                                <el-input placeholder="代码描述" type="textarea" v-model="codeItemData.codeDesc">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialogaddCodeXableVisible=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="codeItemSaveFun('codeItemData')">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as dataBenchmarkingAllFun from './dbm'
import * as message from "@/utils/js/message";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            tableloadingInfo: "数据加载中...",
            rule: validator.default,
            codeTypeValue: '',
            currentPage: 1,
            pagesize: 10,
            totalSize: 0,
            itemcurrentPage: 1,
            itempagesize: 10,
            dialogaddCodeclassableVisible: false,
            dialogaddCodeXableVisible: false,
            expands: [],
            tableData: [],
            codeItemData: {
                codeNum: '',
                codeName: '',
                codeValue: '',
                codeleav: '',
                codeDesc: ''
            },
            dataList: [],
            Releasestatus: [{
                text: '未发布',
                value: '0'
            }, {
                text: '已发布',
                value: '1'
            }, ],
            codeClassData: {
                code_encode: '',
                code_type_name: '',
                code_remark: '',
                code_status: ''
            },
            status: '',
            code_type_id: '',
            code_item_id: '',
            open: 'false',
            selectrow: [],
            code_type_id_s: [],
            code_status: '',
            item_selectrow: [],
            searchCodeTyp_status: '',
            codeValue: '',
            codeItem_Value: '',
            codeItemValue: '',
            codeItem_Status: '',
            title: ''
        }
    },
    mounted() {
        this.getDbmCodeTypeInfo(1, 10)
    },
    methods: {
        cleanFun() {
            this.status = ''
            this.code_type_id = ''
            this.code_item_id = ''
            this.open = 'false'
            this.selectrow = []
            this.code_type_id_s = []
            this.code_status = ''
            this.item_selectrow = []
            this.searchCodeTyp_status = ''
            this.codeValue = ''
            this.codeItem_Value = ''
            this.codeItemValue = ''
            this.codeItem_Status = ''
            this.title = ''
        },
        //批量发布
        batchReleaseDbmCodeTypeInfo() {
            this.code_type_id_s = [];
            this.selectrow.forEach(o => {
                this.code_type_id_s.push(o.code_type_id);
            });
            let that = this,
                arr = [];
            arr = this.code_type_id_s
            dataBenchmarkingAllFun.batchReleaseDbmCodeTypeInfo({
                "code_type_id_s": arr
            }).then(res => {
                message.issueSuccess(res)
                that.code_type_id_s = []
                that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
            });
        },
        //单个代码类发布
        issueFun(row) {
            let that = this
            dataBenchmarkingAllFun.releaseDbmCodeTypeInfoById({
                "code_type_id":row.code_type_id
            }).then(res => {
                message.issueSuccess(res)
                that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
            });
        },
        sig_handleSizeChange(size) {
            this.pagesize = size;
            if (this.code_status == '1' || this.code_status == '0') {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
                } else {
                    this.codefilterFun(this.currentPage, this.pagesize, this.code_status)
                }
            } else if (this.searchCodeTyp_status == 'search' && this.codeTypeValue != '') {
                this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
            } else {
                this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
            }
        },
        sig_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            if (this.code_status == '1' || this.code_status == '0') {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
                } else {
                    this.codefilterFun(this.currentPage, this.pagesize, this.code_status)
                }
            } else if (this.searchCodeTyp_status == 'search' && this.codeTypeValue != '') {
                this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
            } else {
                this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
            }
        },
        sig_preclickFun(currentPage) {
            this.sig_handleCurrentChange(currentPage)
        },
        sig_nextclickFun(currentPage) {
            this.sig_handleCurrentChange(currentPage)
        },
        item_handleSizeChange(size) {
            this.itempagesize = size;
        },
        item_handleCurrentChange(currentPage) {
            this.itemcurrentPage = currentPage;
        },
        // 复选框选中
        handleSelectionChange(selectTrue) {
            this.selectrow = selectTrue
        },
        // 复选框选中
        item_handleSelectionChange(selectTrue) {
            this.item_selectrow = selectTrue
        },
        //点击展开代码项
        cellClick(row, column, event) {
            this.dataList = []
            let $table = this.$refs.multipleTable;
            this.tableData.map((item) => {
                $table.toggleRowExpansion(item, false)
            })
            if (this.open == 'false') {
                if (event.cellIndex != 1 && event.cellIndex != 7) {
                    this.open = 'true'
                    this.$refs.multipleTable.toggleRowExpansion(row)
                    this.code_type_id = row.code_type_id
                    this.getAllCodeItemFun(row.code_type_id)
                }
            } else {
                this.open = 'false'
                this.$refs.multipleTable.toggleRowExpansion(row, false)
            }
        },
        //获取所有代码项方法
        getAllCodeItemFun(id) {
            let params = {}
            params["code_type_id"] = id;
            dataBenchmarkingAllFun.getDbmCodeItemInfoByCodeTypeId(params).then(res => {
                if (res.data.dbmCodeItemInfos.length > 0) {
                    this.dataList = res.data.dbmCodeItemInfos
                } else {
                    this.tableloadingInfo = '暂无数据'
                }
            });
        },
        // 新增代码类
        addCodeClass() {
            this.title = '新增'
            this.dialogaddCodeclassableVisible = true
            this.status = 'add'
            this.codeClassData.code_encode = ''
            this.codeClassData.code_type_name = ''
            this.codeClassData.code_remark = ''
            this.codeClassData.code_status = ''
        },
        // 新增编辑代码类保存
        codeClassSaveFun(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    // 新增
                    let params = {}
                    params["code_encode"] = this.codeClassData.code_encode;;
                    params["code_type_name"] = this.codeClassData.code_type_name;
                    params["code_remark"] = this.codeClassData.code_remark;
                    params["code_status"] = this.codeClassData.code_status;
                    if (this.status == 'edit') {
                        params["code_type_id"] = this.code_type_id;
                        dataBenchmarkingAllFun.updateDbmCodeTypeInfo(params).then(res => {
                            this.dialogaddCodeclassableVisible = false;
                            this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
                        });
                    } else {
                        dataBenchmarkingAllFun.addDbmCodeTypeInfo(params).then(res => {
                            this.dialogaddCodeclassableVisible = false;
                            this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
                        });
                    }
                }
            })
        },
        //代码类- 获取分页数据
        getDbmCodeTypeInfo(page, size) {
            let params = {}
            params["currPage"] = page;
            params["pageSize"] = size;
            dataBenchmarkingAllFun.getDbmCodeTypeInfo(params).then(res => {
                this.tableData = res.data.dbmCodeTypeInfos
                this.totalSize = res.data.totalSize
            });
        },
        //编辑打开方法
        EditCodeClassFun(row) {
            this.title = '编辑'
            this.dialogaddCodeclassableVisible = true;
            this.status = 'edit'
            this.code_type_id = row.code_type_id
            let params = {}
            params["code_type_id"] = row.code_type_id;
            dataBenchmarkingAllFun.getDbmCodeTypeInfoById(params).then(res => {
                this.codeClassData.code_encode = res.data.code_encode
                this.codeClassData.code_type_name = res.data.code_type_name
                this.codeClassData.code_remark = res.data.code_remark
                this.codeClassData.code_status = res.data.code_status
            });
        },
        // 删除分类方法
        delectCodeClassFun(row) {
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
                let params = {}
                params["code_type_id"] = row.code_type_id;
                dataBenchmarkingAllFun.deleteDbmCodeTypeInfo(params).then(res => {
                    message.deleteSuccess(res);
                    that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)

                });
            }).catch(() => {})

        },
        // 新增代码项
        addCodeItemFun() {
            this.title = '新增'
            this.dialogaddCodeXableVisible = true;
            this.codeItemStatus = 'add'
            this.codeItemData.codeNum = ''
            this.codeItemData.codeName = ''
            this.codeItemData.codeValue = ''
            this.codeItemData.codeleav = ''
            this.codeItemData.codeDesc = ''
        },
        //编辑代码项
        editCodeItemFun(row) {
            this.title = '编辑'
            this.dialogaddCodeXableVisible = true;
            this.codeItemStatus = 'edit'
            this.code_item_id = row.code_item_id
            let params = {},
                that = this;
            params['code_item_id'] = row.code_item_id
            dataBenchmarkingAllFun.getItemDbmCodeItemById(params).then(res => {
                this.codeItemData.codeNum = res.data.code_encode
                this.codeItemData.codeName = res.data.code_item_name
                this.codeItemData.codeValue = res.data.code_value
                this.codeItemData.codeleav = res.data.dbm_level
                this.codeItemData.codeDesc = res.data.code_remark
            });
        },
        //代码项 编辑和新增保存
        codeItemSaveFun(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    let params = {},
                        that = this;
                    params['code_encode'] = this.codeItemData.codeNum
                    params['code_item_name'] = this.codeItemData.codeName
                    params['code_value'] = this.codeItemData.codeValue
                    params['dbm_level'] = this.codeItemData.codeleav
                    params['code_remark'] = this.codeItemData.codeDesc
                    params['code_type_id'] = this.code_type_id
                    if (this.codeItemStatus == 'add') {
                        dataBenchmarkingAllFun.addDbmCodeItemInfo(params).then(res => {
                            message.saveSuccess(res);
                            that.dialogaddCodeXableVisible = false
                            that.getAllCodeItemFun(that.code_type_id)
                        });
                    } else {
                        params['code_item_id'] = that.code_item_id
                        dataBenchmarkingAllFun.updateDbmCodeItemInfo(params).then(res => {
                            message.updateSuccess(res);
                            that.dialogaddCodeXableVisible = false
                            that.getAllCodeItemFun(that.code_type_id)

                        });
                    }
                }
            })
        },
        // 删除代码项
        delCodeItemFun(row) {
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
                let params = {}
                params['code_item_id'] = row.code_item_id
                dataBenchmarkingAllFun.deleteDbmCodeItemInfo(params).then(res => {
                    message.deleteSuccess(res);
                    that.dialogaddCodeXableVisible = false
                    that.getAllCodeItemFun(row.code_type_id)
                });
            }).catch(() => {})

        },
        //过滤发布状态
        codeClass_fulterChangeFun(filter) {
            this.code_status = filter.Releasestatus[0] ? filter.Releasestatus[0] : ''
            if (this.code_status == '1' || this.code_status == '0') {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, 1, this.pagesize, this.code_status)
                } else {
                    this.codefilterFun(1, this.pagesize, this.code_status)
                }
            } else {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, 1, this.pagesize, this.code_status)
                } else {
                    this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)

                }
            }

        },
        codefilterFun(curr, pagesize, code_status) {
            dataBenchmarkingAllFun.getDbmCodeTypeInfoByStatus({
                'code_status': code_status,
                'currPage': curr,
                'pageSize': pagesize
            }).then(res => {
                this.tableData = res.data.dbmCodeTypeInfos
                this.totalSize = res.data.totalSize
            });
        },
        // 全选
        allselect(all) {
            this.selectrow = all
        },
        //代码项全选
        item_allselect(all) {
            this.item_selectrow = all
        },
        // 批量删除代码类
        delectcodeclassALLFun() {
            this.code_type_id_s = [];
            this.selectrow.forEach(o => {
                this.code_type_id_s.push(o.code_type_id);
            });
            let that = this,
                arr = [];
            arr = this.code_type_id_s
            message.confirmMsg('确定删除吗').then(res => {
                dataBenchmarkingAllFun.batchDeleteDbmCodeTypeInfo({
                    "code_type_id_s": arr
                }).then(res => {
                    message.deleteSuccess(res)
                    that.code_type_id_s = []
                    that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
                });
            }).catch(() => {})
        },
        // 批量删除代码项
        delectcodeitemALLFun() {
            this.code_item_id_s = [];
            this.item_selectrow.forEach(o => {
                this.code_item_id_s.push(o.code_item_id);
            });
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
                dataBenchmarkingAllFun.batchDeleteDbmCodeItemInfo({
                    "code_item_id_s": that.code_item_id_s
                }).then(res => {
                    message.deleteSuccess(res)
                    that.code_item_id_s = []
                    this.getAllCodeItemFun(that.code_type_id)
                });
            }).catch(() => {})
        },
        //代码类搜索
        searchDbmCodeTypeInfo() {
            this.codeTypeValue = this.codeValue
            if (this.codeTypeValue != '') {
                this.searchCodeTyp_status = 'search'
                this.searchCodeTypeInfo(this.codeTypeValue, '1', this.pagesize, this.code_status)
            } else {
                this.searchCodeTyp_status = ''
            }
        },
        searchCodeTypeInfo(codeTypeValue, currentpage, pagesize, code_status) {
            dataBenchmarkingAllFun.searchDbmCodeTypeInfo({
                "search_cond": codeTypeValue,
                'currPage': currentpage,
                'pageSize': pagesize,
                'status': code_status
            }).then(res => {
                if (res.data.dbmCodeTypeInfos.length > 0) {
                    this.tableData = res.data.dbmCodeTypeInfos
                } else {
                    this.tableloadingInfo = '暂无数据'
                }
                this.totalSize = res.data.totalSize
            })
        },
        //代码项搜索
        searchDbmCodeItemInfo() {
            this.codeItemValue = this.codeItem_Value
            if (this.codeItemValue != '') {
                this.codeItem_Status = 'seach'
                this.searchDbmCodeItemInfoFun(this.codeItemValue, this.itemcurrentPage, this.itempagesize, this.code_type_id)
            }
        },
        searchDbmCodeItemInfoFun(codeItemValue, currentpage, pagesize, code_type_id) {
            dataBenchmarkingAllFun.searchDbmCodeItemInfo({
                "search_cond": codeItemValue,
                'currPage': currentpage,
                'pageSize': pagesize,
                'code_type_id': code_type_id
            }).then(res => {
                if (res.data.dbmCodeItemInfos.length > 0) {
                    this.dataList = res.data.dbmCodeItemInfos
                } else {
                    this.tableloadingInfo = '暂无数据'
                }
            })
        }
    }
}
</script>

<style lang="less">
#dui_two {
    .pagerigth {
        text-align: right;
        margin-top: 10px;
    }

    .locationcenter {
        text-align: center;
        margin-top: 10px;
    }

    .allbutton /deep/ {

        .el-button--mini,
        .el-button--mini.is-round {
            padding: 4px 5px;
        }
    }

    .outtable /deep/ {

        .el-icon-arrow-down,
        .el-icon-arrow-up {
            color: #fff;
        }
    }

    .in_tableColor /deep/ {
        .el-table__header-wrapper {
            .el-table__header>thead>tr th {
                background-color: #829cfb !important
            }
        }
    }
}
</style>
