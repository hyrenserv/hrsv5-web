<template>
<div class="step1">
    <Step :active="active"></Step>
    <div class="oneContent">
        <el-form ref="form" :model="form" status-icon>
            <el-col :span="12">
                <el-form-item label="采集任务名" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_number" placeholder="采集任务名" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业编号" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_number" placeholder="作业编号" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="分类编号" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_number" disabled placeholder="分类编号" :size="size">
                        <el-button slot="append" @click="getNumber()" class="addButton"> <i class="el-icon-circle-plus-outline"></i></el-button>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="分类名称" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_number" disabled placeholder="分类名称" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="采集任务编码" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_number" placeholder="采集任务编码" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="文件格式" :label-width="formLabelWidth" prop="FileFormat" :rules="rule.selected">
                    <el-select v-model="form.FileFormat" placeholder="文件格式" clearable style="width: 100%;">
                        <el-option v-for="item in FileFormat" :key="item.value" :label="item.value" :value="item.FileFormat">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据字符集" :label-width="formLabelWidth" prop="run_way" :rules="rule.selected">
                    <el-select v-model="form.run_way" placeholder="数据字符集" clearable style="width: 100%;">
                        <el-option v-for="item in runWay" :key="item.value" :label="item.value" :value="item.run_way">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据分隔" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_number" placeholder="数据分隔" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="换行符" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_number" placeholder="换行符" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据字典文件" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true}])">
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
    <el-dialog title="采集任务分类" :visible.sync="showDiolag" class="collTask">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">采集任务分类</span>
        </div>
        <el-dialog width="40%" title="新增采集任务分类" :visible.sync="innerVisible" append-to-body>
            <div slot="title">
                <span class="dialogtitle el-icon-caret-right">新增采集任务分类</span>
            </div>
            <el-form :model="addClassTask" ref="addClassTask">
                <el-form-item label=" 分类编号" prop="class_num" :rules="filter_rules([{required: true,dataType:'composition'}])" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.class_num" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" 分类名称" prop="class_name" :rules="rule.default" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.class_name" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="class_des" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.class_des" type="textarea" style="width:284px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button size="mini" type="danger" @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="innerVisible = false;addClassTaskFun('addClassTask')">保存</el-button>
            </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-table :empty-text="tableloadingInfo" :data="CollTaskData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border size="medium" highlight-current-row @current-change="handleSelectionChange" @row-click="chooseone">
                <el-table-column property label="选择" width="60px" type="index" align="center">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.row.classify_id">&thinsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column property label="序号" width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="classify_num" label="分类编号" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column property="classify_name" label="分类名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column property="remark" label="描述" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="操作" width="150px" align="center">
                    <template slot-scope="scope">
                        <el-row>

                            <el-col :span="12" style="text-align: center;">
                                <el-button type="text" circle @click="colltaskEditBtn(scope.row)" class='editcolor'>编辑</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button class='delcolor' type="text" circle @click="colltaskDeleBtn(scope.row)" @row-click="chooseone">删除</el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="CollTaskData.length"></el-pagination>
            <div class="btntop">
                <el-button @click="cancelClassNumBtn()" type="danger" size="mini">取 消</el-button>
                <el-button @click="addClassNumBtn();innerVisible = true" type="success" size="mini">新增</el-button>
                <el-button @click="updataClassNumBtn(CollTaskData)" type="primary" size="mini">确定</el-button>

            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import Step from "./step";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as functionAll from "./dbAgentcollect"
export default {
    components: {
        Step
    },
    data() {
        return {
            active: 0,
            form: {
                run_way: '',
                FileFormat: '',
            },
            formLabelWidth: "150px",
            size: "medium",
            showDiolag: false,
            pagesize: 5,
            currentPage: 1,
            radio: "1",
            addClassTask: {

            },
            CollTaskData: [],
            runWay: [],
            FileFormat: [],
            radio: null,
            innerVisible: false,
            ediltVisible: false,
            rule: validator.default,
        }
    },
    mounted() {
        this.getCategoryItems("DataBaseCode");
        this.getCategoryItems("FileFormat");
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
        //编辑任务分类
        editText() {

        },
        // 删除任务分类
        deleteText() {

        },
        // 新增任务分类
        addClassNumBtn() {
            (this.addClassTask.class_num = ""),
            (this.addClassTask.class_name = ""),
            (this.addClassTask.class_des = "");
        },
        //取消选择名称
        cancelClassNumBtn() {
            this.showDiolag = false;
            this.radio = "";
        },
        //保存选择名称
        updataClassNumBtn(row) {
            if (row.length > 0) {
                if (this.radio != '') {
                    for (let i = 0; i < row.length; i++) {
                        if (row[i].classify_id == this.radio) {
                            this.showDiolag = false;
                            this.ruleForm.classify_name = row[i].classify_name;
                            this.ruleForm.classify_num = row[i].classify_num;
                        }
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: "请至少选择一项",
                        type: "error"
                    });
                }

            } else {
                this.$message({
                    showClose: true,
                    message: "请新增任务并选择",

                    type: "error"
                });
            }
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "DataBaseCode") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        res.data.forEach((item => {
                            item['run_way'] = item.code;
                        }))
                        this.runWay = res.data;
                    }
                })
            } else if (e == "FileFormat") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        res.data.forEach((item) => {
                            item['FileFormat'] = item.code;
                        })
                        this.FileFormat = res.data;
                    }
                })
            }
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
    padding: 2% 4% 2% 0;
}

/* 按钮设置 */
.step1 .addButton {
    color: black
}

/* 数据分页 */
.step1 .pageDiv {
    margin-top: 10px;
    height: 30px;
}

.step1 .page {
    float: right;
}
</style>
