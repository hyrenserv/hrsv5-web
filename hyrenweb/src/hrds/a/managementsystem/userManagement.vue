<template>
<div class="userManagement">
    <el-row>
        <i class="el-icon-view"></i>
        <span>用户列表</span>
        <router-link to="managementsystem">
            <el-button type="primary" class="el1 els" size="small">
                <i class="block_icon fa fa-cubes"></i>返回首页
            </el-button>
        </router-link>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true; getDepartAndUsertype()" size="small">
            <i class="el-icon-circle-plus-outline"></i>新增用户
        </el-button>
    </el-row>
    <el-table stripe :data="userTablelist" border>
        <el-table-column type="index" label="序号" width="62" align="center"></el-table-column>
        <el-table-column prop="user_id" label="用户登录账号" align="center"></el-table-column>
        <el-table-column prop="user_name" label="创建用户名" align="center"></el-table-column>
        <el-table-column prop="usertype_group" label="用户功能类型" width="370" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="create_date" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="dialogFormVisibleview = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
                <el-button size="mini" type="danger" @click="delteThisData();handleEdit(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination prev-text="上一页" next-text="下一页" @current-change="handleCurrentChangeList" :current-page="currentPage" :page-size="pageSize" layout=" total,prev, pager, next,jumper" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 实现点击添加按钮增加新的用户信息-->
    <!-- 新增用户弹出框 -->
    <el-dialog title="添加部门信息" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="formAdd" ref="formAdd">

            <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="depIds" :rules="rule.selected">
                <el-select v-model="formAdd.depIds" filterable placeholder="请选择部门" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.dep_name" :value="item.dep_id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label=" 用户类型" :label-width="formLabelWidth" prop="useris_admin" :rules="rule.selected">
                <el-radio-group v-model="formAdd.useris_admin">
                    <el-radio @change="getUserFunctionMenu" label="0">管理员</el-radio>
                    <el-radio @change="getUserFunctionMenu" label="1">操作员</el-radio>
                </el-radio-group>

            </el-form-item>

            <el-form-item label=" 功能菜单" :label-width="formLabelWidth" prop="usertype_group" :rules="rule.selected">
                <el-select v-model="formAdd.usertype_group" filterable multiple placeholder="请选择功能类型" style="width:284px">
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
</div>
</template>

<script>
import * as functionAll from "@/hrds/a/managementsystem/managementsystem";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            userTablelist: [],
            totalItem: 0,
            currentPage: 1,
            pageSize: 5,
            options: [],
            functionalTypes: [],
            defaultFunction: [],
            dialogFormVisibleAdd: false,
            // 添加数据表单
            formAdd: {
                datasource_number: "",
                datasource_name: "",
                source_remark: "",
                useris_admin: "0",
                depIds: [],
                usertype_group:[]
            },
            rule: validator.default,
            formLabelWidth: "150px"
        }
    },
    created() {
        // 获取用户所有信息
        this.getSysUserInfoAll();
    },
    methods: {
        // 用户信息方法封装
        getSysUserInfoAll() {
            functionAll.getSysUserInfo().then(async (res) => {
                if (res && res.success) {
                    for (let index = 0; index < res.data.length; index++) {
                        // 更改日期格式
                        let year = res.data[index].create_date.substring(0, 4);
                        let month = res.data[index].create_date.substring(4, 6);
                        let day = res.data[index].create_date.substring(6, 9);
                        let date = year + "-" + month + "-" + day;
                        res.data[index].create_date = date;
                        // getvalue代码项
                        let typeArr = res.data[index].usertype_group.split(",");
                        let dataType = this.getValueWithcode(typeArr);
                        res.data[index].usertype_group = JSON.stringify(dataType).replace(/\[/g, "").replace(/\]/g, "").replace(/\"/g, "")
                    }
                    this.userTablelist = res.data;
                    this.totalItem = res.data.length;
                }
            })
        },
        // 点击新增用户按钮获取部门信息和用户默认菜单
        getDepartAndUsertype() {
            this.getUserFunctionMenuAll(0);
            this.getDepartmentInfo()
        },
        // 点击添加弹出框的取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            this.depIds = [];
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
        },
        // 部门信息获取
        getDepartmentInfo() {
            functionAll.getDepartmentInfoAndUserFunctionMenuInfo().then((res) => {
                this.options = res.data.departmentList;
            })
        },
        // 获取数据管理列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            this.currentPage = val;
            functionAll.getDataAuditInfoForPage({
                currPage: this.currentPage,
                pageSize: this.pageSize
            }).then(res => {
                this.tableDatalist = res.data.dataAuditList;
            })
        },
        // 根据不同值获取新增时对应数据
        getUserFunctionMenu(e) {
            if (e == 0) {
                this.getUserFunctionMenuAll(0);
            } else if (e == 1) {
                this.getUserFunctionMenuAll(1);
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
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.user_id = row.user_id;
        },
        // 添加部门信息
        add(formName) {
            // 处理参数
            // this.formAdd['dep_id'] = this.formAdd.depIds;
            if (this.formAdd.useris_admin == 0) {
                this.formAdd.useris_admin = 1;
            } else if (this.formAdd.useris_admin == 1) {
                this.formAdd.useris_admin = 0;
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.saveSysUser(this.formAdd).then((res) => {

                    })
                } else {
                    return false;
                }
            });
        },
        // 删除部门信息
        delteThisData() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteSysUser({
                        user_id: this.user_id,
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            // 从新渲染表格
                            this.getSysUserInfoAll();
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // getvalue代码项
        getValueWithcode(type) {
            for (let j = 0; j < type.length; j++) {
                if (type[j] == "01") {
                    type[j] = "采集管理"
                } else if (type[j] == "02") {
                    type[j] = "数据采集"
                } else if (type[j] == "03") {
                    type[j] = "数据查询"
                } else if (type[j] == "04") {
                    type[j] = "作业调度"
                } else if (type[j] == "05") {
                    type[j] = "作业操作员"
                } else if (type[j] == "06") {
                    type[j] = "数据可视化管理"
                } else if (type[j] == "07") {
                    type[j] = "可视化数据源"
                } else if (type[j] == "08") {
                    type[j] = "数据可视化分析"
                } else if (type[j] == "09") {
                    type[j] = "数据可视化查看"
                } else if (type[j] == "10") {
                    type[j] = "监控管理"
                } else if (type[j] == "11") {
                    type[j] = "服务接口管理"
                } else if (type[j] == "12") {
                    type[j] = "服务接口用户"
                } else if (type[j] == "13") {
                    type[j] = "分词器管理"
                } else if (type[j] == "14") {
                    type[j] = "数据集市"
                } else if (type[j] == "15") {
                    type[j] = "数据加工"
                } else if (type[j] == "16") {
                    type[j] = "机器学习工作台"
                } else if (type[j] == "17") {
                    type[j] = "机器学习业务"
                } else if (type[j] == "18") {
                    type[j] = "流数据管理"
                } else if (type[j] == "19") {
                    type[j] = "流数据生产"
                } else if (type[j] == "20") {
                    type[j] = "数据库配置(永洪)"
                } else if (type[j] == "21") {
                    type[j] = "报表创建(永洪)"
                } else if (type[j] == "22") {
                    type[j] = "报表查看(永洪)"
                } else if (type[j] == "23") {
                    type[j] = "流数据消费"
                } else if (type[j] == "24") {
                    type[j] = "数据管控"
                } else if (type[j] == "25") {
                    type[j] = "自主分析管理"
                } else if (type[j] == "26") {
                    type[j] = "自主分析操作"
                } else if (type[j] == "00") {
                    type[j] = "系统管理员"
                } else if (type[j] == "95") {
                    type[j] = "数据存储层定义"
                } else if (type[j] == "96") {
                    type[j] = "数据整理"
                } else if (type[j] == "97") {
                    type[j] = "系统参数管理"
                } else if (type[j] == "98") {
                    type[j] = "部门管理"
                } else if (type[j] == "99") {
                    type[j] = "用户管理"
                }

            }
            return type;
        },
    }
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
    margin-top: 18px;

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

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}
</style>
