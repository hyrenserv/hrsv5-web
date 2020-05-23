<template>
<div class="userManagement">
    <el-row class="elRows">
        <!-- <i class="el-icon-view"></i> -->
        <span>用户列表</span>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true; getDepartAndUsertype()" size="small">
            <i class="el-icon-circle-plus-outline"></i>新增用户
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-table stripe :data="userTablelist" border size="medium">
        <el-table-column type="index" label="序号" width="62" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户登录账号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="user_name" label="创建用户名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="usertype_group" label="用户功能类型" width="370" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="create_date" show-overflow-tooltip label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
                <el-button size="mini" type="danger" @click="delteThisData(scope.row.user_id);">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 实现点击添加按钮增加新的用户信息-->
    <!-- 新增用户弹出框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisibleAdd" :before-close="beforeClose">
        <el-form :model="formAdd" ref="formAdd">

            <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="depIds" :rules="rule.selected">
                <el-select v-model="formAdd.depIds" filterable placeholder="请选择部门" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.dep_name" :value="item.dep_id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label=" 用户类型" :label-width="formLabelWidth" prop="useris_admin" :rules="filter_rules([{required: true}])">
                <el-radio-group v-model="formAdd.useris_admin">
                    <el-radio @change="getUserFunctionMenu" label="0">管理员</el-radio>
                    <el-radio @change="getUserFunctionMenu" label="1">操作员</el-radio>
                </el-radio-group>

            </el-form-item>

            <el-form-item label=" 功能菜单" :label-width="formLabelWidth" prop="usertype_group" :rules="rule.selected">
                <el-select v-model="formAdd.usertype_group" filterable multiple placeholder="请选择功能类型（可多选）" style="width:284px">
                    <el-option v-for="(item,index) in functionalTypes" :key="index" :label="item.user_name" :value="item.user_type"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label=" 默认功能" :label-width="formLabelWidth" prop="user_type" :rules="rule.selected">
                <el-select v-model="formAdd.user_type" filterable placeholder="请选择默认功能" style="width:284px">
                    <el-option v-for="(item,index) in defaultFunction" :key="index" :label="item.user_name" :value="item.user_type"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label=" 用户名" :label-width="formLabelWidth" prop="user_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.user_name" autocomplete="off" placeholder="请输入用户名" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label=" 密码" :label-width="formLabelWidth" prop="user_password" :rules="filter_rules([{required: true,dataType:'password'}])">
                <el-input show-password v-model="formAdd.user_password" autocomplete="off" placeholder="请输入密码" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label=" 邮箱" :label-width="formLabelWidth" prop="user_email" :rules="filter_rules([{required: true,dataType: 'email'}])">
                <el-input v-model="formAdd.user_email" autocomplete="off" placeholder="请输入邮箱" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" :label-width="formLabelWidth" prop="user_mobile" :rules="filter_rules([{required: true,dataType:'mobilePhone'}])">
                <el-input v-model="formAdd.user_mobile" autocomplete="off" placeholder="请输入联系电话" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label=" 数据源详细描述" :label-width="formLabelWidth" prop="user_remark">
                <el-input type="textarea" v-model="formAdd.user_remark" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 实现点击编辑按钮更新用户信息-->
    <!-- 编辑用户弹出框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleUpdate" :before-close="beforeClosechange">
        <el-form :model="formUpdate" ref="formUpdate">

            <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="dep_id" :rules="rule.selected">
                <el-select v-model="formUpdate.dep_id" filterable placeholder="请选择部门" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.dep_name" :value="item.dep_id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label=" 用户类型" :label-width="formLabelWidth" prop="useris_admin" :rules="rule.selected">
                <el-radio-group v-model="formUpdate.useris_admin">
                    <el-radio @change="getUserFunctionMenu" label="0">管理员</el-radio>
                    <el-radio @change="getUserFunctionMenu" label="1">操作员</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label=" 功能菜单" :label-width="formLabelWidth" prop="usertype_group" :rules="rule.selected">
                <el-select v-model="formUpdate.usertype_group" filterable multiple placeholder="请选择功能类型（可多选）" style="width:284px">
                    <el-option v-for="(item,index) in functionalTypes" :key="index" :label="item.user_name" :value="item.user_type"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label=" 默认功能" :label-width="formLabelWidth" prop="user_type" :rules="rule.selected">
                <el-select v-model="formUpdate.user_type" filterable placeholder="请选择默认功能" style="width:284px">
                    <el-option v-for="(item,index) in defaultFunction" :key="index" :label="item.user_name" :value="item.user_type"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label=" 用户名" :label-width="formLabelWidth" prop="user_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formUpdate.user_name" autocomplete="off" placeholder="请输入用户名" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label=" 密码" :label-width="formLabelWidth" prop="user_password" :rules="filter_rules([{required: true,dataType:'password'}])">
                <el-input show-password v-model="formUpdate.user_password" autocomplete="off" placeholder="请输入密码" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label=" 邮箱" :label-width="formLabelWidth" prop="user_email" :rules="filter_rules([{required: true,dataType: 'email'}])">
                <el-input v-model="formUpdate.user_email" autocomplete="off" placeholder="请输入邮箱" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" :label-width="formLabelWidth" prop="user_mobile" :rules="filter_rules([{required: true,dataType:'mobilePhone'}])">
                <el-input v-model="formUpdate.user_mobile" autocomplete="off" placeholder="请输入联系电话" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label=" 数据源详细描述" :label-width="formLabelWidth" prop="user_remark">
                <el-input type="textarea" v-model="formUpdate.user_remark" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleUpdate" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="update('formUpdate')" size="mini">更新</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "@/hrds/a/managementsystem/managementsystem";
import * as validator from "@/utils/js/validator";
import * as fixedAll from "@/utils/js/fileOperations";
import regular from "@/utils/js/regular";
import {
    watch
} from 'fs';
let saveData0;
let saveNum0;
let saveData1;
let saveNum1;
let saveType0;
let saveType1;
//保存后台传过来未处理的usertype_group
let arryCode = [];
// 保存当前为第几页
let pageNow;
export default {
    data() {
        return {
            userTablelist: [],
            totalItem: 0,
            currentPage: 1,
            pageSize: 10,
            options: [],
            user_id: '',
            arryCode: [],
            functionalTypes: [],
            defaultFunction: [],
            UserType: [],
            dialogFormVisibleAdd: false,
            dialogFormVisibleUpdate: false,
            // 添加新增用户表单
            formAdd: {
                useris_admin: "0",
                depIds: '',
                usertype_group: [],
                user_type: ''
            },
            formUpdate: {
                useris_admin: "",
                dep_id: '',
                user_type: '',
                usertypeGroup: [],
            },
            usertypeGroup: [],
            userType: '',
            rule: validator.default,
            formLabelWidth: "150px"
        }
    },
    created() {
        this.getCodeItems("UserType")
        // 获取用户所有信息
        this.getSysUserInfoAll(1);

    },
    methods: {
        // 用户信息方法封装
        getSysUserInfoAll(e) {
            functionAll.getSysUserInfo({
                currPage: e,
                pageSize: this.pageSize
            }).then(async (res) => {
                if (res && res.success) {
                    arryCode = [];
                    for (let i = 0; i < res.data.sysUsers.length; i++) {
                        arryCode.push(res.data.sysUsers[i].usertype_group);
                    }
                    for (let index = 0; index < res.data.sysUsers.length; index++) {
                        // 更改日期格式
                        res.data.sysUsers[index].create_date = fixedAll.dateFormat(res.data.sysUsers[index].create_date);
                        // getvalue代码项
                        let typeArr = res.data.sysUsers[index].usertype_group.split(",");
                        let dataType = this.getValueWithcode(typeArr);
                        res.data.sysUsers[index].usertype_group = JSON.stringify(dataType).replace(/\[/g, "").replace(/\]/g, "").replace(/\"/g, "")
                    }
                    this.userTablelist = res.data.sysUsers;
                    this.totalItem = res.data.totalSize;
                }
            })
        },
        // 点击新增用户按钮获取部门信息和用户默认菜单
        getDepartAndUsertype() {
            this.formAdd.useris_admin = "0";
            this.getUserFunctionMenuAll(0);
            this.getDepartmentInfo();
        },

        // 部门信息获取
        getDepartmentInfo() {
            functionAll.getDepartmentInfoAndUserFunctionMenuInfo().then((res) => {
                this.options = res.data.departmentList;
            })
        },
        // 根据不同值获取新增时对应数据
        getUserFunctionMenu(e) {
            if (e == 0) {
                this.formAdd.user_type = '';
                this.formAdd.usertype_group = [];
                this.formUpdate.user_type = '';
                this.formUpdate.usertype_group = [];
                this.getUserFunctionMenuAll(0);
                if (JSON.stringify(saveData0) != "{}") {
                    saveData0['usertype_group'] = arryCode[saveNum0].split(",");
                    this.formUpdate.user_type = saveType0;
                }

            } else if (e == 1) {
                this.formAdd.user_type = '';
                this.formAdd.usertype_group = [];
                this.formUpdate.user_type = '';
                this.formUpdate.usertype_group = [];
                this.getUserFunctionMenuAll(1);
                if (JSON.stringify(saveData1) != "{}") {
                    saveData1['usertype_group'] = arryCode[saveNum1].split(",");
                    this.formUpdate.user_type = saveType1;
                }

            }
        },
        // 获取新增时对应数据
        getUserFunctionMenuAll(val) {
            let arrJson = [];
            let arrJsonData = [];
            functionAll.getUserFunctionMenu({
                userIsAdmin: val
            }).then((res) => {
                if (res && res.success) {
                    // 获取的参数处理
                    for (let i = 0; i < res.data.length; i++) {
                        arrJsonData.push({
                            user_type: res.data[i]
                        })
                    }
                    let getValueWithcode = this.getValueWithcode(res.data);
                    for (let i = 0; i < getValueWithcode.length; i++) {
                        arrJson.push({
                            user_name: getValueWithcode[i]
                        })
                    }
                    var arrJsonDatas = arrJsonData.map((item, index) => {
                        return {
                            ...item,
                            ...arrJson[index]
                        };
                    });
                    // 下拉框赋值
                    this.functionalTypes = arrJsonDatas;
                    this.defaultFunction = arrJsonDatas;
                }
            })
        },
        // 添加部门信息
        add(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 处理参数
                    this.formAdd['usertype_group'] = JSON.stringify(this.formAdd.usertype_group).replace(/\[/g, "").replace(/\]/g, "").replace(/\"/g, "");
                    this.formAdd['dep_id'] = this.formAdd.depIds;
                    functionAll.saveSysUser(this.formAdd).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            })
                            this.getSysUserInfoAll("1");
                            this.currentPage = 1;
                            this.dialogFormVisibleAdd = false;
                            // 表单清空
                            this.formAdd = {};
                        } else {
                            this.formAdd.usertype_group = [];
                            this.formAdd.user_type = '';
                        }
                    })
                } else {
                    this.formAdd.usertype_group = [];
                    this.formAdd.user_type = '';
                }
            });
        },
        // 点击添加弹出框的取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
            this.$refs.formAdd.resetFields();
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.$refs.formAdd.resetFields();
            this.dialogFormVisibleAdd = false;
        },
        // 点击编辑按钮回显数据和更新用户信息
        // 获取表格当前行数据
        handleEdit(index, row) {
            // 先让表单为空在赋值
            saveType0 = '';
            saveData0 = {};
            saveNum0 = '';
            saveType1 = '';
            saveData1 = {};
            saveNum1 = '';
            if (row.useris_admin == 0) {
                saveType0 = row.user_type;
                saveData0 = row;
                saveNum0 = index
            } else if (row.useris_admin == 1) {
                saveType1 = row.user_type;
                saveData1 = row;
                saveNum1 = index;
            }
            this.formUpdate = {};
            this.user_id = row.user_id;
            this.getUserFunctionMenu(row.useris_admin);
            this.getDepartmentInfo();
            let json = row;
            json['usertype_group'] = arryCode[index].split(",")
            this.formUpdate = json;
        },
        // 更新用户信息
        update(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.formUpdate['create_date'] = this.formUpdate.create_date.replace(/-/g, "");
                    this.formUpdate['usertype_group'] = JSON.stringify(this.formUpdate.usertype_group).replace(/\[/g, "").replace(/\]/g, "").replace(/\"/g, "");
                    functionAll.updateSysUser(this.formUpdate).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '更新成功!'
                            })
                            // 表单清空
                            this.formUpdate = {};
                            this.getSysUserInfoAll(pageNow);
                            this.dialogFormVisibleUpdate = false;

                        } else {
                            this.formUpdate.usertype_group = [];
                            this.formUpdate.user_type = '';
                        }
                    })
                } else {
                    this.formUpdate.usertype_group = [];
                    this.formUpdate.user_type = '';
                }
            });

        },
        // 点击添加弹出框的取消按钮
        cancleUpdate() {
            // 表单清空
            this.formUpdate = {};
            // 隐藏对话框
            this.dialogFormVisibleUpdate = false;
            this.getSysUserInfoAll(pageNow);
            this.$refs.formUpdate.resetFields();
        },
        // 关闭弹出框之前触发事件
        beforeClosechange() {
            this.getSysUserInfoAll(pageNow);
            this.dialogFormVisibleUpdate = false;
            this.$refs.formUpdate.resetFields();
        },
        // 删除部门信息
        delteThisData(val) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteSysUser({
                        user_id: val,
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            // 从新渲染表格
                            this.getSysUserInfoAll(pageNow);
                        }
                    })
            }).catch(() => {
                // 未删除时数据回显
                this.getSysUserInfoAll(pageNow);
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //用户列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            pageNow = val;
            this.getSysUserInfoAll(pageNow);
        },
        // 改变每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getSysUserInfoAll("1");
            this.currentPage = 1;
        },
        // 获取表格代码项
        getCodeItems(val) {
            if (val == "UserType") { //调度频率
                functionAll.getCategoryItems({
                    category: 'UserType'
                }).then(res => {
                    this.UserType = res.data;
                })
            }
        },
        // getvalue代码项
        getValueWithcode(type) {
            for (let j = 0; j < type.length; j++) {
                this.UserType.forEach(item => {
                    if (type[j] == item.code) {
                        type[j] = item.value;
                    }
                })
                // if (type[j] == "01") {
                //     type[j] = "采集管理"
                // } else if (type[j] == "02") {
                //     type[j] = "数据采集"
                // } else if (type[j] == "03") {
                //     type[j] = "数据查询"
                // } else if (type[j] == "04") {
                //     type[j] = "作业调度"
                // } else if (type[j] == "05") {
                //     type[j] = "作业操作员"
                // } else if (type[j] == "06") {
                //     type[j] = "数据可视化管理"
                // } else if (type[j] == "07") {
                //     type[j] = "可视化数据源"
                // } else if (type[j] == "08") {
                //     type[j] = "数据可视化分析"
                // } else if (type[j] == "09") {
                //     type[j] = "数据可视化查看"
                // } else if (type[j] == "10") {
                //     type[j] = "监控管理"
                // } else if (type[j] == "11") {
                //     type[j] = "服务接口管理"
                // } else if (type[j] == "12") {
                //     type[j] = "服务接口用户"
                // } else if (type[j] == "13") {
                //     type[j] = "分词器管理"
                // } else if (type[j] == "14") {
                //     type[j] = "数据集市"
                // } else if (type[j] == "15") {
                //     type[j] = "数据加工"
                // } else if (type[j] == "16") {
                //     type[j] = "机器学习工作台"
                // } else if (type[j] == "17") {
                //     type[j] = "机器学习业务"
                // } else if (type[j] == "18") {
                //     type[j] = "流数据管理"
                // } else if (type[j] == "19") {
                //     type[j] = "流数据生产"
                // } else if (type[j] == "20") {
                //     type[j] = "数据库配置(永洪)"
                // } else if (type[j] == "21") {
                //     type[j] = "报表创建(永洪)"
                // } else if (type[j] == "22") {
                //     type[j] = "报表查看(永洪)"
                // } else if (type[j] == "23") {
                //     type[j] = "流数据消费"
                // } else if (type[j] == "24") {
                //     type[j] = "数据管控"
                // } else if (type[j] == "25") {
                //     type[j] = "自主分析管理"
                // } else if (type[j] == "26") {
                //     type[j] = "自主分析操作"
                // } else if (type[j] == "00") {
                //     type[j] = "系统管理员"
                // } else if (type[j] == "95") {
                //     type[j] = "数据存储层定义"
                // } else if (type[j] == "96") {
                //     type[j] = "数据整理"
                // } else if (type[j] == "97") {
                //     type[j] = "系统参数管理"
                // } else if (type[j] == "98") {
                //     type[j] = "部门管理"
                // } else if (type[j] == "99") {
                //     type[j] = "用户管理"
                // } else if (type[j] == "55") {
                //     type[j] = "数据对标"
                // } else if (type[j] == '37') {
                //     type[j] = '数据对标'
                // } else if (type[j] == '27') {
                //     type[j] = '资源管理'
                // }

            }
            return type;
        },
    },
}
</script>

<style scoped>
.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
}

.el-icon-view,
.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;

}

.elRows {
    width: 100%;
    height: 40px;
    line-height: 40px;
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

.lines {
    margin-top: 4px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}
</style>
