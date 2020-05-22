<template>
    <div id='dataControl'>
        <el-row class='topTitle'>
            <span>变量配置</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row>
            <el-form :model="search_var_data" :inline="true">
                <el-form-item label="变量名:" prop='var_name' size="mini">
                    <el-input placeholder="变量名" v-model="search_var_data.var_name"/>
                </el-form-item>
                <el-form-item label="变量值 : " prop='var_value' size="mini">
                    <el-input placeholder="变量值" v-model="search_var_data.var_value"/>
                </el-form-item>
                <el-form-item label="开始日期 : " prop='start_date' size="mini">
                    <el-date-picker v-model="search_var_data.start_date" placeholder="开始日期"
                                    value-format="yyyyMMdd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期 : " prop='e_date' size="mini">
                    <el-date-picker v-model="search_var_data.end_date" placeholder="结束日期"
                                    value-format="yyyyMMdd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="variableSearch()">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="addVariableConfig()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-table :data="var_data_s.slice((currentPage-1) * pageSize,currentPage * pageSize)" size="mini">
                <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                    <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
                </el-table-column>
                <el-table-column prop="var_name" label="变量名" align="center"/>
                <el-table-column prop="var_value" label="变量值" align="center"/>
                <el-table-column prop="app_updt_dt" label="修改日期" align="center"/>
                <el-table-column prop="app_updt_ti" label="修改时间" align="center"/>
                <el-table-column prop="sys_var_id" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editVarData(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="delVarData(scope.row.sys_var_id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[10, 50, 100, 500]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" style="text-align: center"
                           :total="var_data_s.length">
            </el-pagination>
            <!-- 添加的弹出表单 -->
            <el-dialog title="新增和编辑系统变量" :visible.sync="sys_var_dialog">
                <div slot="title"><span>{{title}}系统变量</span></div>
                <el-form :model="form_var_data" ref="var_data_from">
                    <el-form-item label="变量名" prop="var_name">
                        <el-input v-model="form_var_data.var_name" v-if="isEditor"
                                  autocomplete="off"
                                  placeholder="变量名"/>
                        <el-input v-model="form_var_data.var_name" v-else disabled autocomplete="off"
                                  placeholder="变量名"/>
                    </el-form-item>
                    <el-form-item label="变量值" prop="var_value">
                        <el-input v-model="form_var_data.var_value" placeholder="变量值"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" size="mini" @click="sys_var_dialog=false">取 消</el-button>
                    <el-button type="primary" size="mini" @click="saveVarData('var_data_from')">保存</el-button>
                </div>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
    import * as message from '../../../../utils/js/message';
    import * as vcFun from './variableConfig'
    import Loading from "../../../components/loading/index";

    export default {
        name: 'variableConfig',
        components: {
            Loading,
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                totalSize: 0,
                search_var_data: {sys_var_id: '', var_name: '', var_value: '', start_date: '', end_date: '',},
                form_var_data: {sys_var_id: '', var_name: '', var_value: '', start_date: '', end_date: '',},
                var_data_s: [],
                selectRow: [],
                title: '',
                isEditor: true,
                sys_var_dialog: false,
                operation_type: '',
            }
        },
        created() {
            //获取变量信息列表
            this.getVariableConfigDataInfos();
        },
        watch: {},
        methods: {
            /* 设置每页显示条数 */
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            /* 查询页面 */
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            //检索变量
            variableSearch() {
                let var_name = this.search_var_data.var_name;
                let var_value = this.search_var_data.var_value;
                let start_date = this.search_var_data.start_date;
                let end_date = this.search_var_data.end_date;
                vcFun.searchVariableConfigData({
                    "var_name": var_name,
                    "var_value": var_value,
                    "start_date": start_date,
                    "end_date": end_date,
                }).then(res => {
                    this.var_data_s = res.data;
                })
            },
            //获取变量信息列表
            getVariableConfigDataInfos() {
                vcFun.getVariableConfigDataInfos().then(res => {
                    this.var_data_s = res.data;
                });
            },
            //新增变量
            addVariableConfig() {
                this.title = '新增';
                this.isEditor = true;
                this.sys_var_dialog = true;
                this.operation_type = 'add';
                this.form_var_data = {};
            },
            //编辑变量
            editVarData(row) {
                this.title = '编辑';
                this.isEditor = false;
                this.sys_var_dialog = true;
                this.operation_type = 'edit';
                //获取编辑的对象
                this.form_var_data = Object.assign({}, row)
            },
            //保存变量
            saveVarData(var_data_from) {
                this.$refs[var_data_from].validate(valid => {
                    if (valid) {
                        if (this.operation_type === 'add') {
                            vcFun.addVariableConfigDat(this.form_var_data).then(res => {
                                if (res.success) {
                                    message.saveSuccess(res);
                                    this.sys_var_dialog = false;
                                    //重新获取变量信息列表
                                    this.getVariableConfigDataInfos();
                                }
                            })
                        } else if (this.operation_type === 'edit') {
                            vcFun.updateVariableConfigData(this.form_var_data).then(res => {
                                if (res.success) {
                                    message.updateSuccess(res);
                                    this.sys_var_dialog = false;
                                    //重新获取变量信息列表
                                    this.getVariableConfigDataInfos();
                                }
                            })
                        } else {
                            this.$message({type: 'info', message: '操作类型错误!'});
                        }
                    }
                });
            },
            //删除变量
            delVarData(sys_var_id) {
                this.$confirm('确认删除吗?', '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
                }).then(() => {
                    vcFun.deleteVariableConfigData({"sys_var_id": sys_var_id}).then(res => {
                        if (res.success) {
                            message.deleteSuccess(res);
                            //删除完成后,重新查询新的变量信息
                            this.getVariableConfigDataInfos();
                        }
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除申请!'});
                });
            }
        },
    }
</script>
