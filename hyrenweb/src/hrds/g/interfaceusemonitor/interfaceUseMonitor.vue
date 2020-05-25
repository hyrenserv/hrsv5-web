<template>
    <div class="interfaceUseInfo">
        <el-row class="topTitle">
            <span class="el-icon-s-check">接口使用监控</span>
            <router-link to="/serviceMage">
                <el-button class="goIndex" type="primary" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="接口信息">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <span>有效日期：
                        <el-date-picker type="date" placeholder="结束日期" value-format="yyyyMMdd"
                                        v-model="use_valid_date" size="small"/>
                        </span>
                    </el-col>
                    <el-col :span="8">
                        <span>用户选择：
                            <el-select v-model="user_id" size="small" filterable clearable placeholder="请选择">
                                <el-option
                                        v-for="item in userData"
                                        :label="item.user_name"
                                        :value="item.user_id">
                                </el-option>
                            </el-select>
                         </span>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="success" size="mini" icon="el-icon-search"
                                   @click="searchInterfaceInfoByIdOrDate">查询
                        </el-button>
                        <el-button type="danger" size="mini" icon="el-icon-refresh"
                                   @click="resetInterfaceTable">重置
                        </el-button>
                    </el-col>
                </el-row>
                <!--接口信息列表展示-->
                <el-table :data="interfaceData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                          border style="width: 100%" size="medium">
                    <el-table-column label="序号" width="50px" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="interface_name" label="接口名称" align="center"/>
                    <el-table-column prop="interface_code" label="接口代码" align="center"/>
                    <el-table-column prop="user_name" label="使用用户" align="center"/>
                    <el-table-column prop="start_use_date" :formatter="dateFormat" label="开始日期"
                                     align="center"/>
                    <el-table-column prop="use_valid_date" :formatter="dateFormat" label="结束日期"
                                     align="center"/>
                    <el-table-column prop="use_state" width="80px" label="接口使用状态" align="center">
                        <template slot-scope="scope">{{useState[scope.row.use_state]}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" class='sendcolor'
                                       @click="interfaceDisableEnable(scope.row)">
                                <!--如果是启用那么显示禁用-->
                                <span v-if="scope.row.use_state==='1'">禁用</span>
                                <span v-else>启用</span>
                            </el-button>
                            <el-button size="mini" type="text" class='editcolor'
                                       @click="searchInterfaceUseInfoById(scope.row)">
                                编辑
                            </el-button>
                            <el-button size="mini" type="text" class='delcolor'
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
                        <el-select v-model="user_id" size="small" filterable clearable placeholder="请选择">
                            <el-option
                                    v-for="item in userData"
                                    :label="item.user_name"
                                    :value="item.user_id">
                            </el-option>
                        </el-select>
                        </span>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="success" size="mini" icon="el-icon-search"
                                   @click="searchTableDataById">查询
                        </el-button>
                        <el-button type="danger" size="mini" icon="el-icon-refresh"
                                   @click="resetDataTable">重置
                        </el-button>
                    </el-col>
                </el-row>
                <el-table :data="dataTableData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                          border style="width: 100%" size="medium">
                    <el-table-column label="序号" width="50px" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sysreg_name" label="系统登记表名" align="center"/>
                    <el-table-column prop="original_name" label="原始表中文名" align="center"/>
                    <el-table-column prop="user_name" label="使用用户" align="center"/>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" class='editcolor'
                                       @click="searchFieldInfoById(scope.row)">
                                查看字段
                            </el-button>
                            <el-button size="mini" type="text" class='delcolor'
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
                                    v-model="form.start_use_date" size="small"/>
                </el-form-item>
                <el-form-item label="有效截止日期:" prop="use_valid_date" :rules="filter_rules([{required: true}])">
                    <el-date-picker type="date" placeholder="有效截止日期" value-format="yyyyMMdd"
                                    v-model="form.use_valid_date" size="small"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="updateInterfaceUseInfo('form')">保 存</el-button>
            </div>
        </el-dialog>
        <!--查看字段弹出框-->
        <el-dialog title="查看字段列表" :visible.sync="dialogViewFieldFormVisible"
                   :before-close="beforeViewFieldClose">
            <el-table :data="fieldData" border style="width: 100%">
                <el-table-column label="序号" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="table_en_column" label="字段英文名" align="center"/>
                <el-table-column prop="table_ch_column" label="字段中文名" align="center"/>
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

    export default {
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
                useState: {},
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
        created() {
            this.getUseState();
        },
        mounted() {
            this.searchUserInfo();
            this.searchInterfaceInfo();
        },
        methods: {
            // 获取接口状态代码项
            getUseState() {
                this.$Code.getCategoryItems({
                    'category': 'InterfaceState'
                }).then(res => {
                    res.data.forEach(row => {
                        this.useState[row.code] = row.value;
                    })
                })
            },
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
                let confirmMessage;
                if (row.use_state === "1") {
                    params["use_state"] = "2";
                    confirmMessage = "确定禁用" + row.interface_name + "接口吗？"
                } else {
                    params["use_state"] = "1";
                    confirmMessage = "确定启用" + row.interface_name + "接口吗？"
                }
                message.confirmMsg(confirmMessage).then(res => {
                    interfaceFunctionAll.interfaceDisableEnable(params).then((res) => {
                        if (res && res.success) {
                            if (row.use_state == "1") {
                                message.customizTitle("禁用" + row.interface_name + "接口成功", "success");
                            } else {
                                message.customizTitle("启用" + row.interface_name + "接口成功", "success");
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
                this.currPage = 1;
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
            },
            // 表格日期格式化展示
            dateFormat(row, column) {
                const date = row[column.property];
                if (date != null) {
                    const year = date.substring(0, 4);
                    const month = date.substring(4, 6);
                    const day = date.substring(6, 8);
                    return year + "-" + month + "-" + day;
                }
            },
        }
    };
</script>
<style scoped>
    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }

    .el-table {
        margin-top: 10px;
    }
</style>