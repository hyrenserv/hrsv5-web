<template>
<div class="step1">
    <Step :active="active"></Step>
    <div class="oneContent">
        <el-form ref="form" :model="form" status-icon>
            <el-col :span="12">
                <el-form-item label="采集任务名" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="采集任务名" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业编号" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="作业编号" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="分类编号" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="分类编号" :size="size">
                        <el-button slot="append" @click="getNumber()" class="addButton"> <i class="el-icon-circle-plus-outline"></i>新增</el-button>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="分类名称" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="分类名称" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="采集任务编码" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="采集任务编码" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="文件格式" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="文件格式" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据字符集" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="数据字符集" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据分隔" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="数据分隔" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="换行符" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="换行符" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据字典文件" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="数据字典文件" :size="size"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
    <div class="step1Footer">
        <el-col :span="12">
            <el-button size="medium" type="primary" @click="goBackQuit"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div>
                <el-button size="medium" type="primary" style="float:right" @click="unStructuredCollect('form')">下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </div>
    <!-- 选择编号弹出框 -->
    <el-dialog title="采集任务分类" :visible.sync="showDiolag" width="50%" :before-close="beforeClose">
        <el-button @click="cancelSelectHbase" size="mini" style="float:right" type="success"> <i class="el-icon-circle-plus-outline"></i>新增</el-button>
        <el-table :data="arryCheckNumber.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border stripe size="mini">
            <el-table-column label="序号" align="center" prop="col_seq"></el-table-column>
            <el-table-column label="序号" width="62" align="center" show-overflow-tooltip prop="col_seq">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="分类编号" align="center" show-overflow-tooltip prop="col_seq"></el-table-column>
            <el-table-column label="分类名称" align="center" show-overflow-tooltip prop="col_seq"></el-table-column>
            <el-table-column label="描述" align="center" show-overflow-tooltip prop="col_seq"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,arryHabse) ">编辑</el-button>
                    <el-button type="danger" size="mini" @click="moveDown(scope.$index, scope.row,arryHabse)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageDiv">
            <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="arryCheckNumber.length"></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelectHbase" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveHbase" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import Step from "./step";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    components: {
        Step
    },
    data() {
        return {
            active: 0,
            form: {

            },
            formLabelWidth: "150px",
            size: "medium",
            showDiolag: false,
            arryCheckNumber: [],
            pagesize: 5,
            currentPage: 1,

        }
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 获取分类编号和分类名称
        getNumber() {
            this.showDiolag = true;
        },
    },
}
</script>

<style scoped>
/* 采集任务表单 */
.step1 .oneContent {
    min-height: 300px;
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
    padding: 2%;
}

/* 按钮设置 */
.step1 .addButton {
    color: black
}
</style>
