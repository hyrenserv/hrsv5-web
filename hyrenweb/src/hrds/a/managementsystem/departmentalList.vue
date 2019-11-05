<template>
<div class="userManagement">
    <el-row>
        <i class="el-icon-view"></i>
        <span>部门列表</span>
        <router-link to="managementsystem">
            <el-button type="primary" class="el1 els" size="small">
                <i class="block_icon fa fa-cubes"></i>返回首页
            </el-button>
        </router-link>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true;departmentInfo()" size="small">
            <i class="fa fa-cloud-upload"></i>新增部门
        </el-button>
    </el-row>
    <el-table stripe :data="departmentalList" border>
        <el-table-column type="index" label="序号" width="62" align="center"></el-table-column>
        <el-table-column prop="dep_name" label="部门名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="dialogFormVisibleview = true;handleEdit(scope.$index, scope.row);DataCathInfo()">编辑</el-button>
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
    <el-dialog title="新增部门" :visible.sync="dialogFormVisibleAdd" width="40%">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label=" 部门名称" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.datasource_number" autocomplete="off" placeholder="请输入部门名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 备注" :label-width="formLabelWidth" prop="source_remark">
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
export default {
    data() {
        return {
            departmentalList: [],
            totalItem: 0,
            getAllCodeItems: [],
            currentPage: 1,
            pageSize: 5,
            options: [],
            depIds: [],
            dialogFormVisibleAdd: false,
            radio: 1,
            // 添加数据与导入源字段
            formAdd: {
                datasource_number: "",
                datasource_name: "",
                source_remark: ""
            },
            formLabelWidth: "150px"
        }
    },
    created() {
        functionAll.getDepartmentInfo({
            currPage: this.currentPage,
            pageSize: this.pageSize
        }).then((res) => {
            if (res && res.success) {
                this.departmentalList = res.data;
                this.totalItem = res.data.length;
            }
        })
    },
    methods: {
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
            this.currentPage= val;
            functionAll.getDataAuditInfoForPage({
                currPage: this.currentPage,
                pageSize: this.pageSize
            }).then(res => {
                this.tableDatalist = res.data.dataAuditList;
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
