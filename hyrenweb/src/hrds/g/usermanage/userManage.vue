<template>
    <div class="userManage">
        <el-row class="topTitle">
            <span class="el-icon-user">用户列表</span>
            <router-link to="/serviceMage">
                <el-button class="goIndex" type="primary" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
            <el-button class="goIndex" type="primary" size="mini" icon="el-icon-user-solid"
                       @click="addUserButton()" style="margin-right: 20px">
                添加用户
            </el-button>
        </el-row>
        <el-form :inline=true :model="searchForm" ref="searchForm" label-width="80px">
            <el-form-item label="用户名称:" prop="user_name">
                <el-input v-model="searchForm.user_name" size="small" clearable placeholder="请输入用户名称"/>
            </el-form-item>
            <el-form-item>
                <el-button type="success" size="mini" icon="el-icon-search" @click="selectUserInfo()">查询
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" size="mini" icon="el-icon-refresh" @click="resetUser()">重置
                </el-button>
            </el-form-item>
        </el-form>
        <!--用户信息列表展示-->
        <el-table :data="tableData.slice((currPage - 1) * pageSize,currPage * pageSize)" border
                  style="width: 100%">
            <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="user_name" label="用户名称" align="center"/>
            <el-table-column prop="user_id" label="操作员登录账号" align="center"/>
            <el-table-column prop="user_password" label="密码" align="center"/>
            <el-table-column prop="user_email" label="邮箱地址" align="center"/>
            <el-table-column prop="user_remark" label="备注" align="center"/>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="medium" type="text" class='editcolor'
                               @click="selectUserById(scope.row)">
                        编辑
                    </el-button>
                    <el-button size="medium" type="text" class='delcolor'
                               @click="deleteUser(scope.row)">删除
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
        <!--新增/编辑用户弹出框-->
        <el-dialog :title="customTitle" :visible.sync="dialogUserFormVisible" :before-close="beforeClose">
            <el-form :model="userForm" ref="userForm" label-width="120px">
                <el-form-item label="用户名称:" prop="user_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="userForm.user_name" clearable placeholder="用户名称"/>
                </el-form-item>
                <el-form-item label="用户密码:" prop="user_password"
                              :rules="filter_rules([{required: true,dataType:'password'}])">
                    <el-input v-model="userForm.user_password" show-password clearable placeholder="用户密码"/>
                </el-form-item>
                <el-form-item label="邮箱地址:" prop="user_email"
                              :rules="filter_rules([{required: true,dataType: 'email'}])">
                    <el-input v-model="userForm.user_email" clearable placeholder="邮箱地址"/>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="userForm.user_remark" type="textarea" autosize clearable
                              placeholder="备注" style="width: 300px"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" v-if="isEditor"
                           @click="updateUser('userForm')">更 新
                </el-button>
                <el-button type="primary" size="mini" v-else
                           @click="addUser('userForm')">保 存
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./userManage";
    import * as message from "@/utils/js/message";
    import * as validator from "@/utils/js/validator";

    export default {
        //写定义的变量数据方法等
        data() {
            return {
                rule: validator.default,
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                tableData: [],
                customTitle: '',
                isEditor: false,
                user_name: "",
                dialogUserFormVisible: false,
                userForm: {
                    user_name: "",
                    user_password: "",
                    user_email: "",
                    user_remark: "",
                },
                searchForm: {
                    user_name: ""
                }
            }
        },
        mounted() {
            this.selectUserInfo()
        },
        methods: {
            //查询获取用户管理首页数据
            selectUserInfo() {
                let params = {};
                params["user_name"] = this.searchForm.user_name;
                interfaceFunctionAll.selectUserInfo(params).then(res => {
                    this.tableData = res.data;
                    this.totalSize = res.data.length;
                });
            },
            // 重置
            resetUser() {
                this.searchForm.user_name = "";
                this.selectUserInfo();
            },
            // 根据用户ID查询用户信息
            selectUserById(row) {
                this.dialogUserFormVisible = true;
                this.customTitle = "修改用户";
                this.isEditor = true;
                let params = {}
                params["user_id"] = row.user_id;
                interfaceFunctionAll.selectUserById(params).then(res => {
                    this.userForm = res.data
                });
            },
            addUserButton() {
                // 表单清空
                this.userForm = {};
                this.isEditor = false;
                this.dialogUserFormVisible = true;
                this.customTitle = "新增用户";
            },
            // 新增用户
            addUser(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        interfaceFunctionAll.addUser(this.userForm).then((res) => {
                            message.saveSuccess(res)
                            this.selectUserInfo();
                            this.dialogUserFormVisible = false;
                            // 表单清空
                            this.$refs.userForm.resetFields();
                        })
                    }
                });
            },
            // 编辑更新用户
            updateUser(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        interfaceFunctionAll.updateUser(this.userForm).then((res) => {
                            message.updateSuccess(res);
                            this.selectUserInfo();
                            this.dialogUserFormVisible = false;
                            // 表单清空
                            this.$refs.userForm.resetFields();
                        })
                    }
                });
            },
            // 删除用户
            deleteUser(row) {
                let params = {};
                params["user_id"] = row.user_id;
                message.confirmMsg('确定删除吗').then(res => {
                    interfaceFunctionAll.deleteUser(params).then((res) => {
                        message.deleteSuccess(res);
                        this.selectUserInfo();
                    })
                }).catch(() => {
                })
            },
            // 关闭弹出框之前触发事件
            beforeClose() {
                this.dialogUserFormVisible = false;
                this.$refs.userForm.resetFields();
            },
            // 点击取消按钮
            cancel() {
                this.dialogUserFormVisible = false;
                this.$refs.userForm.resetFields();
            },
            //用户列表数据实现分页功能
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
                this.selectUserInfo();
            },
            // 改变每页显示条数
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.selectUserInfo();
            },
        },
    };
</script>

<style scoped>
    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }

    .el-input {
        width: 300px;
    }
</style>
