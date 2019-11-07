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
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true;" size="small">
            <i class="fa fa-cloud-upload"></i>新增用户
        </el-button>
    </el-row>
    <el-table stripe :data="userTablelist" border>
        <el-table-column type="index" label="序号" width="62" align="center"></el-table-column>
        <el-table-column prop="user_id" label="用户登录账号" align="center"></el-table-column>
        <el-table-column prop="user_name" label="创建用户名" align="center"></el-table-column>
        <el-table-column prop="usertype_group" label="用户功能类型" width="380" align="center"></el-table-column>
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
        <el-pagination prev-text="上一页" next-text="下一页" @current-change="handleCurrentChangeList" :current-page="currentPage" :page-size="pageSize" layout=" total,prev, pager, next" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 实现点击添加按钮进行页面数添加-->
    <!-- 添加的弹出表单 -->
    <el-dialog title="添加数据源" :visible.sync="dialogFormVisibleAdd" width="40%">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="depIds" :rules="filter_rules([{required: true}])">
                <el-select v-model="depIds" filterable placeholder="请选择部门" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.dep_name" :value="item.dep_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" 用户类型" :label-width="formLabelWidth" prop="datasource_name" :rules="filter_rules([{required: true}])">
                <el-radio @change="getUserFunctionMenu" v-model="radio" label="1">管理员</el-radio>
                <el-radio @change="getUserFunctionMenu" v-model="radio" label="2">操作员</el-radio>
            </el-form-item>
            <el-form-item label=" 功能菜单" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true,dataType: 'dataScourenum'}])">
                <el-select v-model="depIds" filterable  multiple placeholder="请选择功能类型" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item"  :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" 默认功能" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true,dataType: 'dataScourenum'}])">
                <el-select v-model="depIds" filterable placeholder="请选择默认功能" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" 用户名" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true,dataType: 'dataScourenum'}])">
                <el-input v-model="formAdd.datasource_number" autocomplete="off" placeholder="请输入用户名" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 密码" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true,dataType: 'dataScourenum'}])">
                <el-input show-password v-model="formAdd.datasource_number" autocomplete="off" placeholder="请输入密码" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 邮箱" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true,dataType: 'dataScourenum'}])">
                <el-input type="email" v-model="formAdd.datasource_number" autocomplete="off" placeholder="请输入邮箱" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true,dataType: 'dataScourenum'}])">
                <el-input v-model="formAdd.datasource_number" autocomplete="off" placeholder="请输入联系电话" style="width:284px"></el-input>
            </el-form-item>

            <el-form-item label=" 数据源详细描述" :label-width="formLabelWidth" prop="source_remark">
                <el-input type="textarea" v-model="formAdd.source_remark" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
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
// Promise封装
async function getPro(type, functionAll, selt) {
    return new Promise(function (resolve, reject) {
        let target = []; // 存放下面循环的所有值
        let n = 0; // 计数器
        let len = type.length;
        for (let i = 0; i < len; i++) {
            let e = type[i];
            functionAll.getValue({
                category: "UserType",
                code: e
            }).then((res) => {
                if (res && res.success) {
                    let cur = res.data;
                    target.push(cur);
                    selt.str += res.data;
                    n++;
                    if (n === len) {
                        resolve(target); // 所有循环完成，将所有数据返回；
                    }
                }
            }).catch((err) => {
                reject(`第${i}次的——请求过程  出错`);
            })
        }
    })
}
export default {
    data() {
        return {
            userTablelist: [],
            totalItem: 0,
            getAllCodeItems: [],
            currentPage: 1,
            pageSize: 5,
            options: [],
            depIds: [],
            dialogFormVisibleAdd: false,
            radio: "1",
            // 添加数据表单
            formAdd: {
                datasource_number: "",
                datasource_name: "",
                source_remark: ""
            },
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
                        let type = res.data[index].usertype_group.split(",");
                        let resAll = getPro(type, functionAll, this);
                        // 获取用户功能类型详细信息
                        let resAlls = await getPro(type, functionAll, this)
                        res.data[index].usertype_group = resAlls.join(",")
                    }
                    this.userTablelist = res.data;
                    this.totalItem = res.data.length;
                }
            })
        },
        // 点击添加弹出框的取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            this.depIds = [];
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
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
        getUserFunctionMenu(e) {
            if (e == 1) {
                this.getUserFunctionMenuAll(0);
              

            } else if (e == 2) {
                this.getUserFunctionMenuAll(1);
            }
        },
        getUserFunctionMenuAll(val) {
            functionAll.getUserFunctionMenu({
                user_is_admin: val
            }).then((res) => {
                if (res && res.success) {
                    this.options = res.data[0];
                }
            })
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.user_id = row.user_id;
        },
        // 删除部门信息
        delteThisData() {
            this.$confirm("确定要删除该条数据?", "提示", {
                type: "warning"
            }).then(() => {
                functionAll.deleteSysUser({
                        user_id: this.user_id,
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.getSysUserInfoAll();
                        }
                    })
            })

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
