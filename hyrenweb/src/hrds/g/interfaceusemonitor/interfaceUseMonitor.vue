<template>
    <div class="interfaceUseInfo">
        <el-row>
            <i class="el-icon-s-check">接口使用监控</i>
            <router-link to="/serviceMage">
                <el-button type="primary" size="medium" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-divider/>
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="接口信息">
                <el-row style="margin-bottom:10px">
                    <el-col :span="8">
                <span>
                    有效日期：
                <el-date-picker type="date" placeholder="结束日期" value-format="yyyyMMdd"
                                v-model="use_valid_date"/>
                </span>
                    </el-col>
                    <el-col :span="8">
                <span>用户选择：
                <el-select v-model="user_id" clearable placeholder="请选择">
                    <el-option
                            v-for="item in userData"
                            :label="item.user_name"
                            :value="item.user_id">
                    </el-option>
                </el-select>
                </span>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="success" size="medium" icon="el-icon-search"
                                   @click="searchInterfaceInfoByIdOrDate">查询
                        </el-button>
                        <el-button type="danger" size="medium" icon="el-icon-refresh"
                                   @click="resetInterfaceTable">重置
                        </el-button>
                    </el-col>
                </el-row>
                <!--接口信息列表展示-->
                <el-table :data="interfaceData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                          border style="width: 100%">
                    <el-table-column label="序号" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="interface_name" label="接口名称" align="center"/>
                    <el-table-column prop="interface_code" label="接口代码" align="center"/>
                    <el-table-column prop="user_name" label="使用用户" align="center"/>
                    <el-table-column prop="start_use_date" label="开始日期" align="center"/>
                    <el-table-column prop="use_valid_date" label="结束日期" align="center"/>
                    <el-table-column prop="interface_state" label="接口状态" align="center"
                                     :filters="interfaceState"
                                     :filter-multiple="false" column-key='interfaceState'>
                        <template slot-scope="scope">
                            <span v-if="scope.row.interface_state==='1'">禁用</span>
                            <span v-else>启用</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope" :filters="interfaceState">
                            <el-button size="medium" type="text" class='sendcolor'
                                       @click="interfaceDisableEnable(scope.row)">
                                <span v-if="scope.row.interface_state==='1'">启用</span>
                                <span v-else>禁用</span>
                            </el-button>
                            <el-button size="medium" type="text" class='editcolor'
                                       @click="searchInterfaceUseInfoById(scope.row)">
                                编辑
                            </el-button>
                            <el-button size="medium" type="text" class='delcolor'
                                       @click="deleteInterfaceUseInfo(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页内容 -->
                <el-row class="pagination">
                    <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage"
                                   @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]"
                                   :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper"
                                   :total="totalSize" class='locationcenter'/>
                </el-row>
            </el-tab-pane>
            <!-- 数据表信息-->
            <el-tab-pane label="数据表信息">
                <el-row style="margin-bottom:10px">
                    <el-col :span="8">
                        <span>用户选择：
                        <el-select v-model="user_id" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in userData"
                                    :label="item.user_name"
                                    :value="item.user_id">
                            </el-option>
                        </el-select>
                        </span>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="success" size="medium" icon="el-icon-search"
                                   @click="searchTableDataById">查询
                        </el-button>
                        <el-button type="danger" size="medium" icon="el-icon-refresh"
                                   @click="resetDataTable">重置
                        </el-button>
                    </el-col>
                </el-row>
                <el-table :data="dataTableData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                          border style="width: 100%">
                    <el-table-column label="序号" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="original_name" label="数据表名称" align="center"/>
                    <el-table-column prop="sysreg_name" label="数据表中文名称" align="center"/>
                    <el-table-column prop="user_name" label="使用用户" align="center"/>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="medium" type="text" class='editcolor'
                                       @click="searchFieldInfoById(scope.row)">
                                查看字段
                            </el-button>
                            <el-button size="medium" type="text" class='delcolor'
                                       @click="deleteDataTableUseInfo(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页内容 -->
                <el-row class="pagination">
                    <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage"
                                   @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]"
                                   :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper"
                                   :total="totalSize" class='locationcenter'/>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <!--编辑弹出框-->
        <el-dialog title="接口修改" :visible.sync="dialogUpdateFormVisible" :before-close="beforeUpdateClose">
            <el-form :model="form" ref="form" label-width="120px">
                <el-form-item label="开始日期:" prop="start_use_date" :rules="filter_rules([{required: true}])">
                    <el-date-picker type="date" placeholder="开始日期" value-format="yyyyMMdd"
                                    v-model="form.start_use_date" size="medium" style="width:450px"/>
                </el-form-item>
                <el-form-item label="有效截止日期:" prop="use_valid_date" :rules="filter_rules([{required: true}])">
                    <el-date-picker type="date" placeholder="有效截止日期" value-format="yyyyMMdd"
                                    v-model="form.use_valid_date" size="medium" style="width:450px"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="updateInterfaceUseInfo('form')">保 存</el-button>
            </div>
        </el-dialog>
        <!--查看字段弹出框-->
        <el-dialog title="接口修改" :visible.sync="dialogViewFieldFormVisible"
                   :before-close="beforeViewFieldClose">
            <el-table :data="fieldData" border style="width: 100%">
                <el-table-column label="序号" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="table_column_name" label="字段名" align="center"/>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="dialogViewFieldFormVisible = false">
                    确 认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./interfaceUseMonitor";
    import * as validator from "@/utils/js/validator";
    import * as message from "@/utils/js/message";
    import Scrollbar from '../../components/scrollbar';
    import Loading from "../../components/loading/index";

    export default {
        components: {
            Scrollbar,
            Loading
        },
        props: ['data', 'options', 'tip'],
        //写定义的变量数据方法等
        data() {
            return {
                rule: validator.default,
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                selectRow: [],
                dataTableData: [],
                interfaceData: [],
                selectColumn: [],
                userData: [],
                fieldData: [],
                interfaceState: [],
                interface_use_id: '',
                dialogUpdateFormVisible: false,
                dialogViewFieldFormVisible: false,
                use_valid_date: '',
                user_id: '',
                dataTableStatus: false,
                form: {
                    interface_use_id: '',
                    start_use_date: '',
                    use_valid_date: ''
                }
            }
        },
        create() {
            // 获取接口类型代码项
            this.$Code.getCategoryItems({
                'category': 'InterfaceState'
            }).then(res => {
                this.interfaceState = res.data
            })
        },
        mounted() {
            this.searchUserInfo();
            this.searchInterfaceInfo();
        },
        methods: {
            // 查看接口信息
            searchInterfaceInfo() {
                interfaceFunctionAll.searchInterfaceInfo().then(res => {
                    this.interfaceData = res.data;
                    this.totalSize = res.data.length;
                })
            },
            // 查看数据表信息
            searchTableData() {
                interfaceFunctionAll.searchTableData().then(res => {
                    this.dataTableData = res.data;
                    this.totalSize = res.data.length;
                })
            },
            // 查看用户信息
            searchUserInfo() {
                interfaceFunctionAll.searchUserInfo().then(res => {
                    this.userData = res.data;
                })
            },
            // 根据用户ID或有效日期查询接口信息
            searchInterfaceInfoByIdOrDate() {
                let params = {};
                params["user_id"] = this.user_id;
                params["use_valid_date"] = this.use_valid_date;
                interfaceFunctionAll.searchInterfaceInfoByIdOrDate(params).then(res => {
                    this.interfaceData = res.data;
                    this.totalSize = res.data.length;
                })
            },
            // 根据接口使用ID查询接口信息
            searchInterfaceUseInfoById(row) {
                this.dialogUpdateFormVisible = true;
                let params = {};
                params["interface_use_id"] = row.interface_use_id;
                interfaceFunctionAll.searchInterfaceUseInfoById(params).then(res => {
                    this.form = res.data;
                })
            },
            // 删除接口
            deleteInterfaceUseInfo(row) {
                let params = {}
                params["interface_use_id"] = row.interface_use_id;
                message.confirmMsg('确定删除吗').then(res => {
                    interfaceFunctionAll.deleteInterfaceUseInfo(params).then((res) => {
                        message.deleteSuccess(res);
                        this.searchInterfaceInfo();
                    })
                }).catch(() => {
                })
            },
            // 编辑
            updateInterfaceUseInfo(formName) {
                console.log(this.form)
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        interfaceFunctionAll.updateInterfaceUseInfo(this.form).then((res) => {
                            message.updateSuccess(res);
                            this.searchInterfaceInfo();
                            this.dialogUpdateFormVisible = false;
                        })
                    }
                });
            },
            // 接口的禁用与启用
            interfaceDisableEnable(row) {
                let params = {}
                params["interface_use_id"] = row.interface_use_id;
                params["use_state"] = row.use_state;
                let confirmMessage;
                if (row.use_state == "1") {
                    confirmMessage = "确定禁用" + row.interface_name + "接口吗？"
                } else {
                    confirmMessage = "确定启用" + row.interface_name + "接口吗？"
                }
                message.confirmMsg(confirmMessage).then(res => {
                    interfaceFunctionAll.interfaceDisableEnable(params).then((res) => {
                        if (res && res.success) {
                            if (row.use_state == "1") {
                                this.$message({
                                    message: "禁用" + row.interface_name + "接口成功",
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: "启用" + row.interface_name + "接口成功",
                                    type: 'success'
                                });
                            }
                        }
                        this.searchInterfaceInfo();
                    })
                }).catch(() => {
                })
            },
            // 根据用户ID查询数据表信息
            searchTableDataById() {
                let params = {};
                params["user_id"] = this.user_id;
                interfaceFunctionAll.searchTableDataById(params).then((res) => {
                    this.dataTableData = res.data;
                    this.totalSize = res.data.length;
                })
            },
            // 根据表使用ID查看字段信息
            searchFieldInfoById(row) {
                this.dialogViewFieldFormVisible = true;
                let params = {};
                params["use_id"] = row.use_id;
                interfaceFunctionAll.searchFieldInfoById(params).then((res) => {
                    this.fieldData = res.data;
                })
            },
            // 删除数据表信息
            deleteDataTableUseInfo(row) {
                let params = {}
                params["use_id"] = row.use_id;
                message.confirmMsg('确定删除吗').then(res => {
                    interfaceFunctionAll.deleteDataTableUseInfo(params).then((res) => {
                        message.deleteSuccess(res);
                        this.searchTableData();
                    })
                }).catch(() => {
                })
            },
            //表数据实现分页功能
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
            },
            // 改变每页显示条数
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            // 改变tabs框
            handleClick(tab) {
                if (tab.paneName === "0") {
                    this.searchInterfaceInfo();
                } else {
                    this.dataTableStatus = true;
                    this.searchTableData();
                }
            },
            beforeUpdateClose() {
                this.$refs.form.resetFields();
                this.dialogUpdateFormVisible = false;
            },
            beforeViewFieldClose() {
                this.dialogViewFieldFormVisible = false;
            },
            resetInterfaceTable() {
                this.searchInterfaceInfo()
                this.user_id = '';
                this.use_valid_date = '';
            },
            resetDataTable() {
                this.searchTableData();
                this.user_id = '';
            }
        }
    };
</script>
<style scoped>
    .el-icon-s-check {
        margin-bottom: 10px;
        margin-right: 1050px;
        font-size: 20px;
        text-align: center;
        color: #2196f3;
    }

    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }
</style>