<template>
    <div class="userManage">
        <el-row>
            <i class="el-icon-user"><span>用户列表</span></i>
            <router-link to="/serviceMage">
                <el-button class="elButton" type="primary" size="medium" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
            <el-button class="elButton" type="primary" size="medium" icon="el-icon-user-solid"
                       @click="addUserFun()">
                添加用户
            </el-button>
        </el-row>
        <el-divider/>
        <el-row style="margin-bottom:10px">
            <span>用户名称：
                 <el-input placeholder="请输入内容"  clearable size="medium" v-model="user_name">
                 </el-input>
                <el-button type="success" size="medium" icon="el-icon-search"
                           @click="selectUserInfoByPage(1,10)">查询
                </el-button>
                <el-button type="danger" size="medium" icon="el-icon-refresh"
                           @click="selectUserInfoByPage(1,10)">重置</el-button>
            </span>
        </el-row>
        <!--用户信息列表展示-->
        <el-table :data="tableData" border style="width: 100%">
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
        <!--新增用户弹出框-->
        <el-dialog title="新增用户" :visible.sync="dialogAddUserFormVisible" :before-close="beforeClose">
            <el-form :model="addUserForm" ref="addUserForm" label-width="180px">
                <el-form-item label="用户名称:" prop="user_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="addUserForm.user_name" autocomplete="off" clearable placeholder="用户名称"
                    />
                </el-form-item>
                <el-form-item label="用户密码:" prop="user_password"
                              :rules="filter_rules([{required: true,dataType:'password'}])">
                    <el-input v-model="addUserForm.user_password" show-password autocomplete="off" clearable
                              placeholder="用户密码"/>
                </el-form-item>
                <el-form-item label="邮箱地址:" prop="user_email"
                              :rules="filter_rules([{required: true,dataType: 'email'}])">
                    <el-input v-model="addUserForm.user_email" autocomplete="off" clearable
                              placeholder="邮箱地址"/>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="addUserForm.user_remark" type="textarea" autosize autocomplete="off"
                              clearable placeholder="备注" style="width: 360px;"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddUserFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserFun('addUserForm')">保 存</el-button>
            </div>
        </el-dialog>
        <!--编辑用户弹出框-->
        <el-dialog title="编辑用户" :visible.sync="dialogUpdateUserFormVisible" :before-close="beforeUpdateClose">
            <el-form :model="updateUserForm" ref="updateUserForm" label-width="120px">
                <el-form-item label="用户名称:" prop="user_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="updateUserForm.user_name" autocomplete="off" clearable
                              placeholder="用户名称"/>
                </el-form-item>
                <el-form-item label="用户密码:" prop="user_password"
                              :rules="filter_rules([{required: true,dataType:'password'}])">
                    <el-input v-model="updateUserForm.user_password" show-password autocomplete="off"
                              clearable placeholder="用户密码"/>
                </el-form-item>
                <el-form-item label="邮箱地址:" prop="user_email"
                              :rules="filter_rules([{required: true,dataType: 'email'}])">
                    <el-input v-model="updateUserForm.user_email" autocomplete="off" clearable
                              placeholder="邮箱地址"/>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="updateUserForm.user_remark" type="textarea" autosize autocomplete="off"
                              clearable placeholder="备注" style="width: 360px;"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateUserFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUserFun('updateUserForm')">保 存</el-button>
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
                user_name: "",
                dialogAddUserFormVisible: false,
                dialogUpdateUserFormVisible: false,
                addUserForm: {
                    user_name: "",
                    user_password: "",
                    user_email: "",
                    user_remark: "",
                },
                updateUserForm: {
                    user_name: "",
                    user_password: "",
                    user_email: "",
                    user_remark: "",
                }
            }
        },
        mounted() {
            this.selectUserInfoByPage(1, 10)
        },
        methods: {
            //分页查询获取用户管理首页数据
            selectUserInfoByPage(currPage, pageSize) {
                this.currPage = currPage;
                this.pageSize = pageSize;
                let params = {}
                params["currPage"] = currPage;
                params["pageSize"] = pageSize;
                params["user_name"] = this.user_name;
                interfaceFunctionAll.selectUserInfoByPage(params).then(res => {
                    this.tableData = res.data;
                    this.totalSize = res.data.totalSize
                });
            },
            // 根据用户名分页查询用户信息
            selectUserById(row) {
                this.dialogUpdateUserFormVisible = true;
                let params = {}
                params["user_id"] = row.user_id;
                interfaceFunctionAll.selectUserById(params).then(res => {
                    this.updateUserForm = res.data
                });
            },
            // 新增用户
            addUserFun(formName) {
                this.dialogAddUserFormVisible = true;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        interfaceFunctionAll.addUser(this.addUserForm).then((res) => {
                            message.saveSuccess(res)
                            this.selectUserInfoByPage(1, 10);
                            this.dialogAddUserFormVisible = false;
                            // 表单清空
                            this.addUserForm = {};
                        })
                    }
                });
            },
            // 编辑更新用户
            updateUserFun(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        interfaceFunctionAll.updateUser(this.updateUserForm).then((res) => {
                            message.updateSuccess(res);
                            this.selectUserInfoByPage(1, 10);
                            this.dialogUpdateUserFormVisible = false;
                            // 表单清空
                            this.updateUserForm = {};
                        })
                    }
                });
            },
            // 删除用户
            deleteUser(row) {
                let params = {}
                params["user_id"] = row.user_id;
                message.confirmMsg('确定删除吗').then(res => {
                    interfaceFunctionAll.deleteUser(params).then((res) => {
                        message.deleteSuccess(res);
                        this.selectUserInfoByPage(1, 10);
                    })
                }).catch(() => {
                })
            },
            // 关闭弹出框之前触发事件
            beforeClose() {
                this.$refs.addUserForm.resetFields();
                this.dialogAddUserFormVisible = false;
            },
            beforeUpdateClose() {
                this.$refs.updateUserForm.resetFields();
                this.dialogUpdateUserFormVisible = false;
            },
            //用户列表数据实现分页功能
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
                this.selectUserInfoByPage(currPage, this.pageSize);
            },
            // 改变每页显示条数
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.selectUserInfoByPage(this.currPage, pageSize);
            },
        },
    };
</script>

<style scoped>
    .el-icon-user {
        margin-bottom: 10px;
        margin-right: 960px;
        font-size: 20px;
        text-align: center;
        color: #2196f3;
    }

    .elButton {
        margin-right: 5px;
    }

    .el-icon-search {
        margin-right: 10px;
        width: 260px;
    }

    .el-input {
        margin-right: 10px;
        width: 360px;
    }

    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }
</style>
