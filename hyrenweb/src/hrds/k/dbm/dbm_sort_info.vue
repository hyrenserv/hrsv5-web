<template>
<div>
    <el-row style="margin-bottom:10px">
        <el-col :span='5' style="text-align:right">
            <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="codeClass_Value">
                <el-button slot="append" icon="el-icon-search" @click="searchDbmSortInfo"></el-button>
            </el-input>
        </el-col>
        <el-col :span='11'>&nbsp;</el-col>
        <el-col :span='8' style="text-align:right" class='allbutton'>
            <el-button size="mini" type="success" class="el-icon-upload" @click="batchReleaseDbmSortInfo()">发布分类</el-button>
            <el-button size="mini" type="primary" class='el-icon-circle-plus-outline' @click="addClass()">新增分类</el-button>
            <el-button size="mini" type="danger" class='el-icon-remove-outline' @click="batchDeleteDbmSortInfoFun()">删除分类</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-table :data="tableData" border size='medium' style="min-height: 200px;" class='outtable' @filter-change="Class_fulterChangeFun" :row-key="(row)=>{ return row.sort_id}" @selection-change="handleSelectionChange" @select-all='allselect'>
            <el-table-column width="55" align="center" type="selection" :reserve-selection="true">
            </el-table-column>
            <el-table-column label="序号" align="center" width="60">
                <template scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="parentName" label="上级分类名" align="center" width="100" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sort_level_num" label="分类层级数" align="center" width="80">
            </el-table-column>
            <el-table-column prop="sort_name" label="分类名称" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="sort_remark" label="分类描述" align="center" width="160" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="create_user" label="创建人" align="center" width="100" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.create_date.substring(0,4)}}-{{scope.row.create_date.substring(4,6)}}-{{scope.row.create_date.substring(6,8)}} {{scope.row.create_time.substring(0,2)}}:{{scope.row.create_time.substring(2,4)}}:{{scope.row.create_time.substring(4,6)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sort_status" label="发布状态" align="center" column-key='Releasestatus' :filters="Releasestatus" :filter-multiple="false">
                <template slot-scope="scope">
                    <span v-if="scope.row.sort_status=='1'" class='issuecolor'>已发布</span>
                    <span v-else>未发布</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="EditFun(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="issuFun(scope.row)" class='issuecolor'>发布</el-button>
                    <el-button type="text" size="small" class='delcolor' @click="delectClassFun(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" @prev-click='sig_preclickFun' @next-click='sig_nextclickFun' :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class='locationcenter'></el-pagination>
    </el-row>
    <!-- 新增分类 -->
    <el-dialog title="新增标准分类" :visible.sync="dialogaddclassableVisible" width="40%" class='data_edit'>
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">{{title}}标准分类</span>
        </div>
        <el-row>
            <el-form ref="standardClassifiFormRule" label-width="86px" :model="standardClassifiFormRule">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-row>
                            <el-form-item label="归属分类 : " prop="belongsClass">
                                <el-cascader :options="options" :show-all-levels="false" v-model="standardClassifiFormRule.belongsClass" clearable :props="SetKesDept" filterable></el-cascader>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span='20'>
                        <el-row>
                            <el-form-item label="中文名称 : " prop="chNmae" :rules="filter_rules([{required: true}])">
                                <el-input placeholder="中文名称" v-model="standardClassifiFormRule.chNmae">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-row>
                            <el-form-item label="标准描述 : " prop="standardMark">
                                <el-input type="textarea" v-model="standardClassifiFormRule.standardMark" placeholder="请输入内容">
                                </el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-row>
                            <el-form-item label="发布状态 : " prop="code_status" :rules="rule.selected">
                                <el-select placeholder="发布状态" v-model="standardClassifiFormRule.code_status" size="medium">
                                    <el-option v-for="(item,index) in Releasestatus" :key="index" :label="item.text" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialogaddclassableVisible=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="standardClassifiSave('standardClassifiFormRule')">保存</el-button>
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
    props: ['options'],
    data() {
        return {
            rule: validator.default,
            currentPage: 1,
            pagesize: 10,
            totalSize: 0,
            Allis_selectionState: false,
            dialogaddclassableVisible: false,
            SetKesDept: {
                checkStrictly: true,
                value: 'id',
                label: 'label',
                children: 'children'
            },
            status: '',
            edit_sortId: '',
            standardClassifiFormRule: {
                belongsClass: [],
                chNmae: '',
                standardMark: '',
                code_status: ''
            },
            tableData: [],
            Releasestatus: [{
                text: '未发布',
                value: '0'
            }, {
                text: '已发布',
                value: '1'
            }, ],
            // options: [],
            sort_id_s: [],
            selectRow: [],
            sort_status: '',
            codeClass_Value: '',
            codeClassValue: '',
            searchCodeClass_status: '',
            title: ''
        }
    },
    created() {
        // this.getDbmSortTreeInfo()

    },
    mounted() {
        this.getDbmCodeTypeInfo(1, 10)
    },
    methods: {
        cleanFun() {
            this.sort_id_s = [],
                this.selectRow = [],
                this.sort_status = '',
                this.codeClass_Value = '',
                this.codeClassValue = '',
                this.searchCodeClass_status = '',
                this.title = ''
            this.status = ''
        },
        sig_handleSizeChange(size) {
            this.pagesize = size;
            if (this.sort_status == '1' || this.sort_status == '0') {
                if (this.codeClassValue != '') {
                    this.searchCodeClassInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.sort_status)
                } else {
                    this.filterFun(this.currentPage, this.pagesize, this.sort_status)
                }
            } else if (this.searchCodeClass_status == 'search' && this.codeClassValue != '') {
                this.searchCodeClassInfo(this.codeClassValue, this.currentPage, this.pagesize, this.sort_status)
            } else {
                this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
            }
        },
        sig_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            if (this.sort_status == '1' || this.sort_status == '0') {
                if (this.codeClassValue != '') {
                    this.searchCodeClassInfo(this.codeClassValue, this.currentPage, this.pagesize, this.sort_status)
                } else {
                    this.filterFun(this.currentPage, this.pagesize, this.sort_status)
                }
            } else if (this.searchCodeClass_status == 'search' && this.codeClassValue != '') {
                this.searchCodeClassInfo(this.codeClassValue, this.currentPage, this.pagesize, this.sort_status)
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
        // 复选框选中
        handleSelectionChange(selectTrue) {
            this.selectRow = selectTrue
        },
        //单个发布
        issuFun(row) {
            let that = this
            dataBenchmarkingAllFun.releaseDbmSortInfoById({
                "sort_id": row.sort_id
            }).then(res => {
                message.issueSuccess(res)
                that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
                that.$emit('handleClick');
            });
        },
        /* //归属分类
        getDbmSortTreeInfo() {
            dataBenchmarkingAllFun.getDbmSortInfoTreeData().then(res => {
                this.options = res.data.dbmSortInfoTreeDataList
            });
        }, */
        // 编辑和新增点击保存方法
        standardClassifiSave(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    // 新增
                    let params = {},
                        that = this;
                    params["parent_id"] = this.standardClassifiFormRule.belongsClass[this.standardClassifiFormRule.belongsClass.length - 1] ? parseInt(this.standardClassifiFormRule.belongsClass[this.standardClassifiFormRule.belongsClass.length - 1]) : 0;
                    params["sort_level_num"] = this.standardClassifiFormRule.belongsClass.length;
                    params["sort_name"] = this.standardClassifiFormRule.chNmae;
                    params["sort_remark"] = this.standardClassifiFormRule.standardMark;
                    params["sort_status"] = this.standardClassifiFormRule.code_status;
                    if (this.status == 'edit') {
                        params["sort_id"] = this.edit_sortId;
                        dataBenchmarkingAllFun.updateDbmSortInfo(params).then(res => {
                            message.updateSuccess(res);
                            that.dialogaddclassableVisible = false;
                            that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
                            that.$emit('handleClick');
                        });
                    } else {
                        dataBenchmarkingAllFun.addDbmSortInfo(params).then(res => {
                            message.saveSuccess(res);
                            that.dialogaddclassableVisible = false;
                            that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
                            that.$emit('handleClick');
                        });
                    }

                }
            })
        },
        // 获取分页数据
        getDbmCodeTypeInfo(page, size) {
            this.sort_status = ''
            this.codeClass_Value = ''
            this.codeClassValue = ''
            this.searchCodeClass_status = ''
            let params = {}
            params["currPage"] = page;
            params["pageSize"] = size;
            dataBenchmarkingAllFun.getClassDbmSortInfo(params).then(res => {
                let arr = res.data.dbmSortInfos
                for (let i = 0; i < arr.length; i++) {
                    arr[i].parentName = this.getparentClassNmae(arr[i].parent_id, this.options)
                }
                this.tableData = arr
                this.totalSize = res.data.totalSize
            });
        },
        //通过id递归遍历树得到中文名
        getparentClassNmae(key, treeData) {
            let returnname = '';

            function childrenEach(childrenData) {
                for (var j = 0; j < childrenData.length; j++) {
                    if (childrenData[j].id == key) {
                        returnname = childrenData[j].label;
                        break
                    } else {
                        if (childrenData[j].children) {
                            childrenEach(childrenData[j].children);
                        }
                    }
                }
                return returnname;
            }
            return childrenEach(treeData);
        },
        //批量发布分类
        batchReleaseDbmSortInfo() {
            this.sort_id_s = [];
            this.selectRow.forEach(o => {
                this.sort_id_s.push(o.sort_id);
            });
            let that = this
            dataBenchmarkingAllFun.batchReleaseDbmSortInfo({
                "sort_id_s": this.sort_id_s
            }).then(res => {
                message.issueSuccess(res)
                that.sort_id_s = []
                that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
                that.$emit('handleClick');
            });
        },
        //新增分类打开方法
        addClass() {
            this.title = '新增'
            this.dialogaddclassableVisible = true;
            this.status = 'add'
            this.standardClassifiFormRule.belongsClass = ''
            this.standardClassifiFormRule.chNmae = ''
            this.standardClassifiFormRule.standardMark = ''
            this.standardClassifiFormRule.code_status = ''
            this.$emit('handleClick');
        },
        //编辑打开方法
        EditFun(row) {
            this.title = '编辑'
            this.$emit('handleClick');
            this.dialogaddclassableVisible = true;
            this.status = 'edit'
            this.edit_sortId = row.sort_id
            let params = {}
            params["sort_id"] = row.sort_id;
            dataBenchmarkingAllFun.getclassDbmSortInfoById(params).then(res => {
                this.standardClassifiFormRule.chNmae = res.data.sort_name
                this.standardClassifiFormRule.standardMark = res.data.sort_remark
                this.standardClassifiFormRule.code_status = res.data.sort_status
                this.standardClassifiFormRule.belongsClass = this.changeDetSelect(res.data.sort_id, this.options)

            });
        },
        // 级联获取数组
        changeDetSelect(key, treeData) {
            let arr = []; // 在递归时操作的数组
            let returnArr = []; // 存放结果的数组
            let depth = 0; // 定义全局层级
            // 定义递归函数
            function childrenEach(childrenData, depthN) {
                for (var j = 0; j < childrenData.length; j++) {
                    depth = depthN; // 将执行的层级赋值 到 全局层级
                    arr[depthN] = (childrenData[j].id);
                    if (childrenData[j].id == key) {
                        returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
                        break
                    } else {
                        if (childrenData[j].children) {
                            depth++;
                            childrenEach(childrenData[j].children, depth);
                        }
                    }
                }
                return returnArr;
            }
            return childrenEach(treeData, depth);
        },
        // 删除分类方法
        delectClassFun(row) {
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
                let params = {}
                params["sort_id"] = row.sort_id;
                dataBenchmarkingAllFun.deleteDbmSortInfo(params).then(res => {
                    message.deleteSuccess(res);
                    that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
                    that.$emit('handleClick');
                });
            }).catch(() => {})

        },
        //过滤发布状态
        Class_fulterChangeFun(filter) {
            this.sort_status = filter.Releasestatus[0] ? filter.Releasestatus[0] : ''
            if (this.sort_status == '1' || this.sort_status == '0') {
                if (this.codeClassValue != '') {
                    this.searchCodeClassInfo(this.codeClassValue, 1, this.pagesize, this.sort_status)
                } else {
                    this.filterFun(1, this.pagesize, this.sort_status)
                }

            } else {
                if (this.codeClassValue != '') {
                    this.searchCodeClassInfo(this.codeClassValue, 1, this.pagesize, this.sort_status)

                } else {
                    this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)

                }
            }
        },
        //状态过滤
        filterFun(curr, pagesize, sort_status) {
            dataBenchmarkingAllFun.getDbmSortInfoByStatus({
                'sort_status': sort_status,
                'currPage': curr,
                'pageSize': pagesize
            }).then(res => {
                let arr = res.data.dbmSortInfos
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].parentName = this.getparentClassNmae(arr[i].parent_id, this.options)
                    }
                }
                this.tableData = arr
                this.totalSize = res.data.totalSize
            });
        },
        // 全选
        allselect(all) {
            this.selectRow = all
        },
        //批量删除
        batchDeleteDbmSortInfoFun() {
            this.sort_id_s = [];
            this.selectRow.forEach(o => {
                this.sort_id_s.push(o.sort_id);
            });
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
                dataBenchmarkingAllFun.batchDeleteDbmSortInfo({
                    "sort_id_s": this.sort_id_s
                }).then(res => {
                    message.deleteSuccess(res)
                    that.sort_id_s = []
                    that.getDbmCodeTypeInfo(that.currentPage, that.pagesize)
                    that.$emit('handleClick');
                });
            }).catch(() => {})
        },
        //
        searchDbmSortInfo() {
            this.codeClassValue = this.codeClass_Value
            if (this.codeClassValue != '') {
                this.searchCodeClass_status = 'search'
                this.searchCodeClassInfo(this.codeClassValue, '1', this.pagesize, this.sort_status)
            } else {
                this.searchCodeClass_status = ''
            }
        },
        searchCodeClassInfo(codeClassValue, currentpage, pagesize, sort_status) {
            // let that = this;
            dataBenchmarkingAllFun.searchDbmSortInfo({
                "search_cond": codeClassValue,
                'currPage': currentpage,
                'pageSize': pagesize,
                'status': sort_status
            }).then(res => {
                let arr = res.data.dbmSortInfos
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].parentName = this.getparentClassNmae(arr[i].parent_id, this.options)
                    }
                }
                this.tableData = arr
                this.totalSize = res.data.totalSize
            })
        },
    }
}
</script>

<style lang="less" scoped>
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
</style>
