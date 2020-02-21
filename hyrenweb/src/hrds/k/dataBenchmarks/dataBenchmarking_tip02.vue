<template>
<div>
    <el-row style="margin-bottom:10px">
        <el-col :span='5'>
            <el-input placeholder="请输入内容" class="input-with-select" size="mini">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span='13'>&nbsp;</el-col>
        <el-col :span='6' style="text-align:right" class='allbutton'>
            <el-button size="mini" type="success" class="el-icon-upload">发布所有</el-button>
            <el-button size="mini" type="primary" class='el-icon-circle-plus-outline' @click="addCodeClass()">新增代码类</el-button>
            <!-- <el-button size="mini" type="danger" class='el-icon-remove-outline'>删除所有代码类</el-button> -->
        </el-col>
    </el-row>
    <!--  -->
    <el-table :data="tableData" style="width: 100%" border class='outtable' size='medium' ref="multipleTable" @cell-click="cellClick">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-row style="margin-bottom:10px">
                    <el-col :span='5'>
                        <el-input placeholder="请输入内容" class="input-with-select" size="mini">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span='13'>&nbsp;</el-col>
                    <el-col :span='6' style="text-align:right" class='allbutton'>
                        <el-button size="mini" type="primary" @click="addCodeItemFun()">新增代码项</el-button>
                    </el-col>
                </el-row>
                <el-table :data="dataList.slice((itemcurrentPage - 1) * itempagesize, itemcurrentPage * itempagesize)" align="center" stripe size='mini' class='in_tableColor'>
                    <el-table-column width="55" align="center" prop="selectionState">
                        <template slot="header" slot-scope="scope">
                            <el-checkbox></el-checkbox>
                        </template>
                        <template slot-scope="scope">
                            <el-checkbox></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" align="center" width="60">
                        <template scope="scope">
                            <span>{{scope.$index+(itemcurrentPage - 1) * itempagesize + 1}}</span>
                        </template>item
                    </el-table-column>
                    <el-table-column align="center" prop="code_encode" label="代码编号">
                    </el-table-column>
                    <el-table-column align="center" prop="code_item_name" label="代码名称">
                    </el-table-column>
                    <el-table-column align="center" prop="code_value" label="代码值">
                    </el-table-column>
                    <el-table-column align="center" prop="dbm_level" label="层级">
                    </el-table-column>
                    <el-table-column align="center" prop="code_remark" label="代码描述">
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class='delcolor' @click="delCodeItemFun(scope.row)">删除</el-button>
                            <el-button type="text" size="small" class='delcolor' @click="editCodeItemFun(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" :current-page="itemcurrentPage" :page-sizes="[10, 50, 100, 200]" :page-size="itempagesize" layout="total,prev, pager, next" :total="dataList.length" class='pagerigth'></el-pagination>
            </template>
        </el-table-column>
        <!-- <el-table-column width="55" align="center" prop="selectionState">
            <template slot="header" slot-scope="scope">
                <el-checkbox></el-checkbox>
            </template>
            <template slot-scope="scope">
                <el-checkbox></el-checkbox>
            </template>
        </el-table-column> -->
        <el-table-column label="序号" align="center" width="60">
            <template scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column label="代码编码" prop="code_encode" align="center">
        </el-table-column>
        <el-table-column label="代码类名" prop="code_type_name" align="center">
        </el-table-column>
        <el-table-column label="代码描述" prop="code_remark" align="center">
        </el-table-column>
        <el-table-column label="状态"  :filters="Releasestatus" :filter-multiple="false" align="center">
         <template slot-scope="scope">
                    <span v-if="scope.row.code_status=='1'">已发布</span>
                    <span v-else>未发布</span>
                </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="EditCodeClassFun(scope.row)">编辑</el-button>
                <el-button type="text" size="small" class='delcolor' @click="delectCodeClassFun(scope.row)">删除</el-button>
                <el-button type="text" size="small">发布</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class='locationcenter'></el-pagination>
    <!-- 新增代码类弹框 -->
    <el-dialog title="代码类" :visible.sync="dialogaddCodeclassableVisible" width="50%" class='data_edit'>
        <el-row>
            <el-form ref="codeClassData" label-width="80px" :model="codeClassData">
                <el-row :gutter="20">
                    <el-col :span='16'>
                        <el-row>
                            <el-form-item label="代码编码 : " prop="code_encode">
                                <el-input placeholder="代码编码" v-model="codeClassData.code_encode">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='16'>
                        <el-row>
                            <el-form-item label="代码类名 : " prop="code_type_name">
                                <el-input placeholder="代码类名" v-model="codeClassData.code_type_name">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='16'>
                        <el-row>
                            <el-form-item label="代码描述 : " prop="code_remark">
                                <el-input placeholder="代码描述" v-model="codeClassData.code_remark">>
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-row>
                            <el-form-item label="发布状态 : " prop="code_status">
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
    <el-dialog title="代码项" :visible.sync="dialogaddCodeXableVisible" width="50%" class='data_edit'>
        <el-row>
            <el-form ref="codeItemData" label-width="80px" :model="codeItemData">
                <el-row :gutter="20">
                    <el-col :span='16'>
                        <el-row>
                            <el-form-item label="代码编码 : " prop="codeNum">
                                <el-input placeholder="代码编码" v-model="codeItemData.codeNum">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='16'>
                        <el-row>
                            <el-form-item label="代码名称 : " prop="codeName">
                                <el-input placeholder="代码名称" v-model="codeItemData.codeName">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='16'>
                        <el-row>
                            <el-form-item label="代码值 : " prop="codeValue">
                                <el-input placeholder="代码值" v-model="codeItemData.codeValue">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='16'>
                        <el-row>
                            <el-form-item label="层级 : " prop="codeleav">
                                <el-input placeholder="层级" v-model="codeItemData.codeleav">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='16'>
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
            <el-button type="primary" size="mini" @click="codeItemSaveFun()">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as dataBenchmarkingAllFun from './dataBenchmarking'
import * as message from "@/utils/js/message";
export default {
    data() {
        return {
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
            dataList: [
            ],
            Releasestatus: [{
                text: '未发布',
                value: '01'
            }, {
                text: '已发布',
                value: '02'
            }, ],
            codeClassData: {
                code_encode: '',
                code_type_name: '',
                code_remark: '',
                code_status: ''
            },
            status: '',
            code_type_id:'',
            code_item_id:''
        }
    },
    mounted() {
        this.getDbmCodeTypeInfo(1, 10)
    },
    methods: {
        sig_handleSizeChange(size) {
            this.pagesize = size;
        },
        sig_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        cellClick(row, column, event) {
            console.log(row)

            if (event.cellIndex != 0 && event.cellIndex != 6) {

                this.$refs.multipleTable.toggleRowExpansion(row)
                this.code_type_id=row.code_type_id
                this.getAllCodeItemFun(row.code_type_id)
            }

        },
        //获取所有代码项方法
        getAllCodeItemFun(id) {
            let params = {}
            params["code_type_id"] = id;
            console.log(params)
            dataBenchmarkingAllFun.getDbmCodeItemInfoByCodeTypeId(params).then(res => {
                this.dataList=res.data.dbmCodeItemInfos
            });
        },
        // 新增代码类
        addCodeClass() {
            this.dialogaddCodeclassableVisible = true
            this.status = 'add'
            this.codeClassData.code_encode = ''
            this.codeClassData.code_type_name = ''
            this.codeClassData.code_remark = ''
            this.codeClassData.code_status = ''
        },
        codeClassSaveFun(form) {
            // 新增
            let params = {}
            params["code_encode"] = this.codeClassData.code_encode;;
            params["code_type_name"] = this.codeClassData.code_type_name;
            params["code_remark"] = this.codeClassData.code_remark;
            params["code_status"] = this.codeClassData.code_status;
            console.log(params, this.status)
            if (this.status == 'edit') {
            params["code_type_id"] = this.code_type_id;

                dataBenchmarkingAllFun.updateDbmCodeTypeInfo(params).then(res => {
                    console.log(res, 11)
                    this.dialogaddCodeclassableVisible = false;
                    this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
                });
            } else {
                dataBenchmarkingAllFun.addDbmCodeTypeInfo(params).then(res => {
                    console.log(res)
                    this.dialogaddCodeclassableVisible = false;
                    this.getDbmCodeTypeInfo(1, 10)
                });
            }

        },
        // 获取分页数据
        getDbmCodeTypeInfo(page, size) {
            let params = {}
            params["currPage"] = page;
            params["pageSize"] = size;
            console.log(params)
            dataBenchmarkingAllFun.getDbmCodeTypeInfo(params).then(res => {
                console.log(res)
                this.tableData = res.data.dbmCodeTypeInfos
                this.totalSize = res.data.totalSize
            });
        },
        //编辑打开方法
        EditCodeClassFun(row) {
            this.dialogaddCodeclassableVisible = true;
            this.status = 'edit'
            this.code_type_id=row.code_type_id
            let params = {}
            params["code_type_id"] = row.code_type_id;
            dataBenchmarkingAllFun.getDbmSortInfoById(params).then(res => {
                console.log(res)
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
            this.dialogaddCodeXableVisible = true;
            this.codeItemStatus = 'edit'
            this.code_item_id=row.code_item_id
            let params = {},
                that = this;
            params['code_item_id'] = row.code_item_id
            dataBenchmarkingAllFun.getItemDbmSortInfoById(params).then(res => {
                console.log(res,11)
                 this.codeItemData.codeNum=res.data.code_encode
            this.codeItemData.codeName=res.data.code_item_name
            this.codeItemData.codeValue=res.data.code_value
            this.codeItemData.codeleav=res.data.dbm_level
            this.codeItemData.codeDesc=res.data.code_remark
            });
        },
        codeItemSaveFun() {
            console.log(this.codeItemData)
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
                    that.getDbmCodeTypeInfo(that.itemcurrentPage, that.itempagesize)

                });
            } else {
            params['code_item_id'] = that.code_item_id	
                dataBenchmarkingAllFun.updateDbmCodeItemInfo(params).then(res => {
                    message.updateSuccess(res);
                    that.dialogaddCodeXableVisible = false
                    that.getDbmCodeTypeInfo(that.itemcurrentPage, that.itempagesize)

                });
            }

        },
        delCodeItemFun(row) {
            // deleteDbmCodeItemInfo
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
               let params = {}
            params['code_item_id'] = row.code_item_id
            dataBenchmarkingAllFun.deleteDbmCodeItemInfo(params).then(res => {
                message.deleteSuccess(res);
                that.dialogaddCodeXableVisible = false
                that.getDbmCodeTypeInfo(that.itemcurrentPage, that.itempagesize)

            });
            }).catch(() => {})
           
        }
    }
}
</script>

<style lang="less">
.pagerigth {
    text-align: right;
    margin-top: 10px;
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
</style>
