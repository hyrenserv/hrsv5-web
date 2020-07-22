<template>
<div class="codeValue">
    <el-row class="elRows">
        <span>编码信息</span>
    </el-row>
    <div class="lines"></div>
    <el-tabs type="border-card" v-model="value" @tab-click="changeTabPane">
        <!-- 统一编码 -->
        <el-tab-pane label="统一编码" name="统一编码">
            <el-row>
                <el-button size="small" type="primary" @click="dialogFormVisibleAdd = true;" class="addCodeButton"> <i class="el-icon-circle-plus-outline"></i>新增统一编码</el-button>
            </el-row>
            <el-table stripe :data="codeMaintenanceTableData" border size="medium" :span-method="arraySpanMethod">

                <el-table-column type="index" label="序号" width="62" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="code_classify" show-overflow-tooltip label="编码分类" align="center"></el-table-column>

                <el-table-column prop="code_classify_name" show-overflow-tooltip label="编码分类名称" align="center"></el-table-column>

                <el-table-column prop="code_type_name" show-overflow-tooltip label="编码名称" align="center"></el-table-column>

                <el-table-column prop="code_value" show-overflow-tooltip label="编码值" align="center"></el-table-column>

                <el-table-column label="操作" align="center" width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
                        <el-button size="mini" type="danger" @click="delteThisData(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页内容 -->
            <!-- <el-row class="pagination">
                <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
            </el-row> -->
        </el-tab-pane>
        <el-tab-pane label="源系统编码" name="源系统编码">
            <div v-show="showOrhidden">
                <el-row>
                    <el-button size="small" type="primary" @click="dialogFormVisibleAddScoure = true;" class="addCodeButton"> <i class="el-icon-circle-plus-outline"></i>新增源系统编码</el-button>
                </el-row>
                <el-table stripe :data="sourceCodeTabledata" border size="medium">

                    <el-table-column type="index" label="序号" width="62" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="orig_sys_code" show-overflow-tooltip label="源系统编码" align="center">
                        <template slot-scope="scope">
                            <span class="tabaleSpan" @click="gotoInfos(scope.row)">{{scope.row.orig_sys_code}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="orig_sys_name" show-overflow-tooltip label="源系统名称" align="center"></el-table-column>

                    <el-table-column prop="orig_sys_remark" show-overflow-tooltip label="描述" width="180" align="center"></el-table-column>
                </el-table>

                <!-- 分页内容 -->
                <!-- <el-row class="pagination">
                    <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
                </el-row> -->
            </div>

            <div v-show="hiddenOrshow">
                <el-row class="hiddenOrshowRow">
                    <el-col :span="24">
                        <strong class="strongSpan"> 编码分类:</strong>
                        <el-select v-model="form.job_status" size="small" placeholder="--选择编码分类--" @change="changeValue">
                            <el-option v-for="item in jobStatus" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <el-button class="buttonAdd" size="small" type="primary" @click="addFromaJAX">新增</el-button>
                    </el-col>

                </el-row>
                <el-form ref="formScoureAdd" :model="formScoureAdd">
                    <el-table stripe :data="formScoureAdd.codeMaintenanceTableDataScoureAdd" border size="medium" :span-method="arraySpanMethodScoure">

                        <el-table-column type="index" label="序号" width="62" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="code_classify" label="编码分类" align="center"></el-table-column>

                        <el-table-column prop="code_classify_name" label="编码分类名称" align="center"></el-table-column>

                        <el-table-column prop="code_type_name" label="编码名称" align="center"></el-table-column>

                        <el-table-column prop="code_value" label="编码值" align="center"></el-table-column>

                        <el-table-column label="源系统编码值" align="center">
                            <template slot-scope="scope">
                                <el-form-item v-if="scope.row.show == false" :prop="`codeMaintenanceTableDataScoureAdd.${scope.$index}.orig_value`" :rules="filter_rules([{required: true}])">
                                    <el-input size="small" v-model="scope.row.orig_value" placeholder="源系统编码值"></el-input>
                                </el-form-item>
                                <el-input size="small" v-else v-model="scope.row.orig_value" disabled placeholder="源系统编码值"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" align="center" width="160">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" v-if="scope.row.show" @click="dialogFormVisibleUpdateScoure = true;handleEditScoure(scope.$index, scope.row);">编辑</el-button>
                                <el-button size="mini" type="danger" @click="delteThisDataScoure(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-col :span="24">
                        <div class="saveOrgohome">
                            <el-button size="small" type="primary" @click="saveOrgohome">返回</el-button>
                            <el-button size="small" type="success" @click="saveCodeList('formScoureAdd')">保存</el-button>
                        </div>
                    </el-col>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>

    <!-- 添加统一编码 -->
    <el-dialog title="统一编码" :visible.sync="dialogFormVisibleAdd" :before-close="beforeCloseAdd" width="80%">
        <el-row class="partOne">
            <el-form ref="form" :model="form" label-width="140px">
                <el-row>
                    <el-col :span="12">
                        <el-col>
                            <el-form-item label="编码分类" prop="code_classify" :rules="filter_rules([{required: true}])">
                                <el-input v-model="form.code_classify" placeholder="编码分类"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>

                    <el-col :span="12">
                        <el-col>
                            <el-form-item label="编码分类名称" prop="code_classify_name" :rules="filter_rules([{required: true}])">
                                <el-input v-model="form.code_classify_name	" placeholder="编码分类名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="code_remark">
                            <el-input v-model="form.code_remark	" placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-button size="small" class="partTwoBtn" type="success" @click="addTableData">增加行</el-button>

                <el-table :data="form.tableData" border stripe size="medium">
                    <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                    <el-table-column label="编码名称" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableData.${scope.$index}.code_type_name`" :rules="filter_rules([{required: true}])">
                                <el-input size="meduim" v-model="scope.row.code_type_name" placeholder="编码名称"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="编码值" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableData.${scope.$index}.code_value`" :rules="filter_rules([{required: true}])">
                                <el-input size="meduim" placeholder="编码名称" v-model="scope.row.code_value"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="deleteArry(scope.$index, scope.row);">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-row>
        <el-row class="partFour">
            <div class="elButton">
                <el-button type="primary" size="small" @click="beforeCloseAdd">取消</el-button>
                <el-button type="primary" size="small" @click="add('form')">保存</el-button>
            </div>
        </el-row>
    </el-dialog>

    <!-- 更新统一编码信息 -->
    <el-dialog title="更新统一编码信息" :visible.sync="dialogFormVisibleUpdate" :before-close="beforeCloseupdate" width="80%">
        <el-row class="partOne">
            <el-form ref="formUpdate" :model="formUpdate" label-width="140px">
                <el-row>
                    <el-col :span="12">
                        <el-col>
                            <el-form-item class="elformitem" label="编码分类" prop="code_classify" :rules="filter_rules([{required: true}])">
                                <el-input v-model="formUpdate.code_classify" readonly placeholder="编码分类"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>

                    <el-col :span="12">
                        <el-col>
                            <el-form-item class="elformitem" label="编码分类名称" prop="code_classify_name" :rules="filter_rules([{required: true}])">
                                <el-input v-model="formUpdate.code_classify_name	" placeholder="编码分类名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="code_remark">
                            <el-input v-model="formUpdate.code_remark	" placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-button size="small" class="partTwoBtn" type="success" @click="addTableData">增加行</el-button>

                <el-table :data="formUpdate.tableData" border stripe size="medium">
                    <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                    <el-table-column label="编码名称" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableData.${scope.$index}.code_type_name`" :rules="filter_rules([{required: true}])">
                                <el-input size="meduim" v-model="scope.row.code_type_name" placeholder="编码名称"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="编码值" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableData.${scope.$index}.code_value`" :rules="filter_rules([{required: true}])">
                                <el-input size="meduim" placeholder="编码名称" v-model="scope.row.code_value"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="deleteArry(scope.$index, scope.row);">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-row>
        <el-row class="partFour">
            <div class="elButton">
                <el-button type="primary" size="small" @click="beforeCloseupdate">取消</el-button>
                <el-button type="primary" size="small" @click="formUpdateSubmit('formUpdate')">保存</el-button>
            </div>
        </el-row>
    </el-dialog>

    <!-- 添加系统编码 -->
    <el-dialog title="源系统编码" :visible.sync="dialogFormVisibleAddScoure" :before-close="beforeCloseAddScoure" width="550px">
        <el-row class="partOne">
            <el-form ref="formScoure" :model="formScoure" label-width="140px">

                <el-col :span="24">
                    <el-col>
                        <el-form-item label="源系统编码" prop="orig_sys_code" :rules="filter_rules([{required: true}])">
                            <el-input v-model="formScoure.orig_sys_code" style="width:284px" placeholder="源系统编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="24">
                    <el-col>
                        <el-form-item label="源系统名称" prop="orig_sys_name" :rules="filter_rules([{required: true}])">
                            <el-input v-model="formScoure.orig_sys_name	" style="width:284px" placeholder="源系统名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="描述" prop="orig_sys_remark">
                        <el-input v-model="formScoure.orig_sys_remark" style="width:284px" placeholder="描述"></el-input>
                    </el-form-item>
                </el-col>

            </el-form>
        </el-row>
        <el-row class="partFour">
            <div class="elButton">
                <el-button type="primary" size="small" @click="beforeCloseAddScoure">取消</el-button>
                <el-button type="primary" size="small" @click="addOrigSysInfo('formScoure')">保存</el-button>
            </div>
        </el-row>
    </el-dialog>

    <!-- 编辑源系统编码 -->
    <el-dialog title="源系统编码" :visible.sync="dialogFormVisibleUpdateScoure" :before-close="beforeCloseupdateScoure" width="80%">
        <el-row class="partOne">
            <el-form ref="formScoureRef" :model="formScoureRef" label-width="140px">

                <el-col :span="12">
                    <el-col>
                        <el-form-item label="编码分类" prop="code_classify" :rules="filter_rules([{required: true}])">
                            <el-input v-model="formScoureRef.code_classify" disabled style="width:284px" placeholder="编码分类"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="12">
                    <el-col>
                        <el-form-item label="编码分类名称" prop="code_classify_name" :rules="filter_rules([{required: true}])">
                            <el-input v-model="formScoureRef.code_classify_name" disabled style="width:284px" placeholder="编码分类名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-table :data="formScoureRef.tableData" border stripe size="medium">

                    <el-table-column prop="code_type_name" label="编码名称" align="center"></el-table-column>

                    <el-table-column prop="code_value" label="编码值" align="center"></el-table-column>

                    <el-table-column label="源系统编码值" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableData.${scope.$index}.orig_value`" :rules="filter_rules([{required: true}])">
                                <el-input size="meduim" v-model="scope.row.orig_value" placeholder="源系统编码值"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form>
        </el-row>
        <el-row class="partFour">
            <div class="elButton">
                <el-button type="primary" size="small" @click="beforeCloseupdateScoure">取消</el-button>
                <el-button type="primary" size="small" @click="addOrigSysInfoScoure('formScoureRef')">保存</el-button>
            </div>
        </el-row>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./codeMaintenance";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as message from "@/utils/js/message";
export default {
    data() {
        return {
            form: {
                tableData: [],
                code_classify: '',
                code_classify_name: '',
                code_remark: ''
            },
            value: '统一编码',
            rule: validator.default,
            codeMaintenanceTableData: [],
            sourceCodeTabledata: [],
            totalItem: 0,
            currentPage: 1,
            pageSize: 10,
            jobStatus: [],
            dialogFormVisibleAdd: false,
            dialogFormVisibleUpdate: false,
            dialogFormVisibleAddScoure: false,
            dialogFormVisibleUpdateScoure: false,
            // 添加数据与导入源字段
            formScoure: {
                orig_sys_code: '',
                orig_sys_name: '',
                orig_sys_remark: ''
            },
            formUpdate: {
                tableData: [],
                code_classify: '',
                code_classify_name: '',
                code_remark: ''
            },
            formScoureAdd: {
                codeMaintenanceTableDataScoureAdd: []
            },
            formScoureRef: {
                tableData: [],
                code_classify: '',
                code_classify_name: ''
            },
            spanArr: [],
            pos: 0,
            spanArr2: [],
            pos2: 0,
            hiddenOrshow: false,
            showOrhidden: true,
            onlyId: '',
            onlyArry: [],
            markId: '',
            resultArryData: [],
        }
    },
    mounted() {
        this.getCodeInfo();
        this.getOrigSysInfo();
    },
    methods: {
        // 统一编码信息
        //查询统一编码信息
        getCodeInfo() {
            functionAll.getCodeInfo().then(res => {
                this.codeMaintenanceTableData = res.data;
                this.dataRosolve(res.data);
            })
        },
        // 查询所有统一编码分类
        getAllCodeClassify() {
            functionAll.getAllCodeClassify().then(res => {
                this.jobStatus = res.data
            })
        },
        // 添加统一编码行数据
        addTableData() {
            this.form.tableData.push({
                code_type_name: "",
                code_value: ""
            })
        },
        // 删除统一编码表格的当前行
        deleteArry(index, row) {
            if (this.form.tableData.length > 1) {
                this.form.tableData.splice(index, 1)
            } else {
                message.customizTitle('请至少选择一项', 'warning')
            }

        },
        // 点击esc取消添加统一编码 
        beforeCloseAdd() {
            this.dialogFormVisibleAdd = false;
            this.$refs.form.resetFields();
            this.form.tableData = [];
        },
        // 新增保存统一编码
        add(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.form.tableData.length == 0) {
                        message.customizTitle('编码名称与编码值不能为空', 'warning')
                    } else if (this.form.tableData.length > 0) {
                        this.form.tableData.forEach(item => {
                            item.code_classify = this.form.code_classify;
                            item.code_classify_name = this.form.code_classify_name;
                            item.code_remark = this.form.code_remark;
                        })
                        functionAll.saveCodeInfo({
                            hyren_code_infos: JSON.stringify(this.form.tableData)
                        }).then((res) => {
                            if (res && res.success) {
                                message.saveSuccess(res);
                                this.$refs.form.resetFields();
                                this.dialogFormVisibleAdd = false;
                                this.getCodeInfo();
                            }
                        })
                    }
                }
            })

        },
        // 获取合并行数据，初始化数据
        dataRosolve(tableData) {
            this.spanArr = [];
            this.pos = 0;
            this.spanArr2 = [];
            this.pos2 = 0;
            tableData.forEach((item, index) => {
                if (index === 0) {
                    this.spanArr.push(1);
                    this.pos = 0;
                    this.spanArr2.push(1);
                    this.pos2 = 0;
                } else {
                    if (tableData[index].code_classify === tableData[index - 1].code_classify) { //第一列需合并相同内容的判断条件
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = index;
                    };
                    if (tableData[index].code_classify_name === tableData[index - 1].code_classify_name) {
                        this.spanArr2[this.pos2] += 1;
                        this.spanArr2.push(0);
                    } else {
                        this.spanArr2.push(1);
                        this.pos2 = index;
                    };
                }

            });
        },
        // 合并行统一编码信息
        arraySpanMethod({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
            if (columnIndex === 2 || columnIndex === 5) {
                const _row = this.spanArr2[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        // 编辑统一码表信息
        handleEdit(index, row) {
            this.getCodeInfoByCodeClassify(row);
        },
        //查询统一编码信息ByCodeClassify
        getCodeInfoByCodeClassify(row) {
            functionAll.getCodeInfoByCodeClassify({
                code_classify: row.code_classify
            }).then(res => {
                this.formUpdate.code_classify = res.data[0].code_classify;
                this.formUpdate.code_classify_name = res.data[0].code_classify_name;
                this.formUpdate.code_remark = res.data[0].code_remark;
                this.formUpdate.tableData = res.data;
            })
        },
        //编辑更新统一编码信息
        formUpdateSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.formUpdate.tableData.forEach(item => {
                        item.code_classify = this.formUpdate.code_classify;
                        item.code_classify_name = this.formUpdate.code_classify_name;
                        item.code_remark = this.formUpdate.code_remark;
                    })
                    functionAll.updateCodeInfo({
                        hyren_code_infos: JSON.stringify(this.formUpdate.tableData)
                    }).then((res) => {
                        if (res && res.success) {
                            message.customizTitle('更新成功', 'success')
                            this.$refs.formUpdate.resetFields();
                            this.dialogFormVisibleUpdate = false;
                            this.getCodeInfo();
                        }
                    })
                } else {
                    return false;
                }
            });

        },
        // 关闭编辑弹出框之前触发事件
        beforeCloseupdate() {
            this.dialogFormVisibleUpdate = false;
            this.$refs.formUpdate.resetFields();
        },
        // 删除当前统一码表信息
        delteThisData(val) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteCodeInfo({
                        code_classify: val.code_classify
                    })
                    .then(res => {
                        if (res && res.success) {
                            message.customizTitle('删除成功', 'success')
                            // 从新渲染表格
                            this.getCodeInfo();
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 源系统编码
        // 查询源系统信息
        getOrigSysInfo() {
            functionAll.getOrigSysInfo().then(res => {
                this.sourceCodeTabledata = res.data;
            })
        },
        // 关闭新增源系统编码弹出框
        beforeCloseAddScoure() {
            this.dialogFormVisibleAddScoure = false;
            this.$refs.formScoure.resetFields();
        },
        // 保存新增源系统编码
        addOrigSysInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.addOrigSysInfo({
                        orig_sys_code: this.formScoure.orig_sys_code,
                        orig_sys_name: this.formScoure.orig_sys_name,
                        orig_sys_remark: this.formScoure.orig_sys_remark,
                    }).then(res => {
                        if (res && res.success) {
                            message.customizTitle('保存成功', 'success')
                            this.getOrigSysInfo();
                            this.dialogFormVisibleAddScoure = false;
                            this.$refs.formScoure.resetFields();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 去往详情页
        gotoInfos(row) {
            this.markId = row.orig_sys_code
            this.hiddenOrshow = true;
            this.showOrhidden = false;
            this.getOrigCodeInfo(row.orig_sys_code);
            this.getAllCodeClassify();
        },
        // 查询初始化源系统编码信息
        getOrigCodeInfo(row) {
            functionAll.getOrigCodeInfo({
                orig_sys_code: row
            }).then(res => {
                res.data.forEach((item) => {
                    item.show = true;
                })
                this.formScoureAdd.codeMaintenanceTableDataScoureAdd = res.data;
                this.resultArryData = res.data;
                this.dataRosolve(res.data);

            })
        },
        // 返回上一步
        saveOrgohome() {
            this.hiddenOrshow = false;
            this.showOrhidden = true;
            this.getOrigSysInfo();
        },
        // 获取select对应的选择值
        changeValue(val) {
            this.onlyArry = [];
            this.onlyId = val;
            functionAll.getCodeInfoByCodeClassify({
                code_classify: this.onlyId
            }).then(res => {
                res.data.forEach((item) => {
                    item.show = false;
                })
                this.onlyArry = res.data
            })
        },
        //表格新增数据
        addFromaJAX() {
            if (this.formScoureAdd.codeMaintenanceTableDataScoureAdd.length == 0) { //分辨有没有数据展示表格
                this.formScoureAdd.codeMaintenanceTableDataScoureAdd = this.onlyArry;
            } else {
                let arr1 = [];
                this.formScoureAdd.codeMaintenanceTableDataScoureAdd.forEach(item => {
                    arr1.push(item.code_classify)
                })
                if (arr1.indexOf(this.onlyArry[0].code_classify) == -1) {
                    this.formScoureAdd.codeMaintenanceTableDataScoureAdd = [...this.formScoureAdd.codeMaintenanceTableDataScoureAdd, ...this.onlyArry];
                } else {
                    message.customizTitle('添加信息已存在', 'warning');
                }
            }
            this.dataRosolve(this.formScoureAdd.codeMaintenanceTableDataScoureAdd);
        },
        // 删除表格数据
        delteThisDataScoure(row) {
            if (row.show == false) { //本地未保存时删除表格对应的数据
                this.formScoureAdd.codeMaintenanceTableDataScoureAdd = this.formScoureAdd.codeMaintenanceTableDataScoureAdd.filter((item) => { //过滤表格信息
                    return item.code_classify != row.code_classify
                })
            } else { //调用接口
                this.$confirm('确认删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    functionAll.deleteOrigCodeInfo({
                            code_classify: row.code_classify,
                            orig_sys_code: this.markId,
                        })
                        .then(res => {
                            if (res && res.success) {
                                message.customizTitle('删除成功', 'success')
                                // 从新渲染表格
                                this.getOrigCodeInfo(this.markId);
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
        // 合并行统一编码信息
        arraySpanMethodScoure({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
            if (columnIndex === 2 || columnIndex === 6) {
                const _row = this.spanArr2[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        // 保存源系统编码值
        saveCodeList(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = [];
                    let arr = JSON.parse(JSON.stringify(this.formScoureAdd.codeMaintenanceTableDataScoureAdd));
                    data = this.resultArryData.concat(this.formScoureAdd.codeMaintenanceTableDataScoureAdd).filter((v, i, arr) => {
                        return arr.indexOf(v) === arr.lastIndexOf(v);
                    })

                    data.forEach((item) => {
                        delete item.show;
                        item.orig_sys_code = this.markId;
                    })
                    functionAll.addOrigCodeInfo({
                        orig_sys_code: this.markId,
                        orig_code_infos: JSON.stringify(data)
                    }).then(res => {
                        if (res && res.success) {
                            message.customizTitle('添加成功', 'success');
                            // 从新渲染表格
                            this.getOrigCodeInfo(this.markId);
                            this.$refs.formScoureAdd.resetFields();
                            this.formScoureAdd.codeMaintenanceTableDataScoureAdd = [];
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 编辑源系统编码值
        handleEditScoure(index, row) {
            functionAll.getOrigCodeInfoByCode({
                code_classify: row.code_classify,
                orig_sys_code: this.markId
            }).then(res => {
                this.formScoureRef.code_classify = res.data[0].code_classify;
                this.formScoureRef.tableData = res.data;
                this.formScoureRef.code_classify_name = res.data[0].code_classify_name;
            })
        },
        // 更新源系统编码值
        addOrigSysInfoScoure(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let arr = JSON.parse(JSON.stringify(this.formScoureRef.tableData));
                    functionAll.updateOrigCodeInfo({
                        orig_sys_code: this.markId,
                        orig_code_infos: JSON.stringify(arr)
                    }).then(res => {
                        // 从新渲染表格
                        if (res && res.success) {
                            message.customizTitle('更新成功', 'success')
                            this.getOrigCodeInfo(this.markId);
                            this.$refs.formScoureRef.resetFields();
                            this.dialogFormVisibleUpdateScoure = false;
                            this.formScoureRef.tableData = [];
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 关闭弹出框beforeCloseupdateScoure
        beforeCloseupdateScoure() {
            this.$refs.formScoureRef.resetFields();
            this.dialogFormVisibleUpdateScoure = false;
            this.formScoureRef.tableData = [];
        },
        // 点击选项卡获取初始值
        changeTabPane(tab, event) {
            if (tab.label == "统一编码") {
                this.getCodeInfo();
            } else if (tab.label == "源系统编码") {
                this.getOrigSysInfo();
            }
        },
        // 获取数据管理列表数据实现分页功能
        // handleCurrentChangeList(val) {
        //     //把val赋给当前页面
        //     this.currentPage = val;
        //     this.getDepartmentInfoAll();
        // },
        // 改变每页显示条数
        // handleSizeChange(val) {
        //     this.pageSize = val;
        //     this.getDepartmentInfoAll();
        //     this.currentPage = 1;
        // },
    }
}
</script>

<style scoped>
.el-icon-s-check,
.el-row span {
    color: #2196f3;
    font-size: 18px;
}

.elRows {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;

}

.el1 {
    margin-left: 10px;
}

.item {
    float: right;
}

.upload-demo {
    float: left;
}

.fa-question-circle {
    margin-top: 12px;
}

.addCodeButton {
    float: right;
    margin-bottom: 4px;
}

.partTwoBtn {
    float: right;
}

.elButton {
    float: right;
    margin-top: 20px;
}

/* 表格input */
.codeValue>>>.el-table .el-form-item__content {
    margin-left: 0px !important;
}

.codeValue>>>.el-table .el-form-item {
    margin-bottom: 20px;
}

.codeValue>>>.el-table {
    margin-bottom: 20px;
}

.tabaleSpan {
    color: #337ab7;
    cursor: pointer;
}

.strongSpan {
    font-weight: normal;
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
}

.buttonAdd {
    margin-left: 10px;
}

.hiddenOrshowRow {
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
}

.saveOrgohome {
    margin: 20px 0 10px 0;
    float: right;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}

.lines {
    margin-top: 4px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}
</style>
