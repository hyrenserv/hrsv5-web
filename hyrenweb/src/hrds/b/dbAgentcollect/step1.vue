<template>
<div class="step1">
    <Step :active="active"></Step>
    <div class="oneContent">
        <el-form ref="form" :model="form" status-icon>
            <el-col :span="12">
                <el-form-item label="采集任务名" :label-width="formLabelWidth" prop="task_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.task_name" placeholder="采集任务名" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业编号" :label-width="formLabelWidth" prop="database_number" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.database_number" placeholder="作业编号" :size="size"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="分类编号" :label-width="formLabelWidth" prop="classify_num" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.classify_num" disabled placeholder="分类编号" :size="size">
                        <el-button slot="append" @click="getNumber()" class="addButton"> <i class="el-icon-circle-plus-outline"></i></el-button>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="分类名称" :label-width="formLabelWidth" prop="classify_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.classify_name" disabled placeholder="分类名称" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="18">
                <el-form-item label="数据字典文件" :label-width="formLabelWidth" prop="plane_url" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.plane_url" placeholder="数据字典文件" :size="size">
                        <template slot="prepend">
                            <el-button :size="size" @click="dialogSelectfolder = true;seletFilePath()">选择文件</el-button>
                        </template>
                    </el-input>
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
                <el-button size="medium" type="primary" style="float:right" @click="nextCollect('form')">下一步</el-button>
            </div>
        </el-col>
    </div>
    <!-- 选择目录弹出框 -->
    <el-dialog title="选择文件" :visible.sync="dialogSelectfolder">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择文件</span>
        </div>
        <div class="mytree"  hight='200'>
            <el-tree ref='tree' :data="data2" :check-strictly="true" :show-checkbox='hiddenshow' node-key="name" lazy :load="loadNode" :props="defaultProps" accordion :indent='0' @check-change="handleCheckChange">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span :title="node.label">{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="dialogSelectfolder = false;" size="mini">保存</el-button>
        </div>
    </el-dialog>
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
                <el-form-item label=" 分类编号" prop="classify_num" :rules="filter_rules([{required: true,dataType:'composition'}])" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.classify_num" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" 分类名称" prop="classify_name" :rules="rule.default" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.classify_name" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.remark" type="textarea" style="width:284px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button size="mini" type="danger" @click="cancelAdd">取 消</el-button>
                <el-button type="primary" size="mini" @click="addClassTaskFun('addClassTask')">保存</el-button>
            </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-table :data="CollTaskData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border size="medium">
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
                <el-table-column label="操作" width="120px" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="12" style="text-align: center;">
                                <el-button type="text" circle @click="editText(scope.row)" class='editcolor'>编辑</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button class='delcolor' type="text" circle @click="deleteText(scope.row)">删除</el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="CollTaskData.length"></el-pagination>
            <div class="btntop">
                <el-button @click="cancelClassNumBtn()" type="danger" size="mini">取 消</el-button>
                <el-button @click="innerVisible = true" type="success" size="mini">新增</el-button>
                <el-button @click="saveClassNumBtn(CollTaskData)" type="primary" size="mini">确定</el-button>
            </div>
        </div>
    </el-dialog>
    <!-- 点击编辑弹层 -->
    <el-dialog width="40%" title="修改采集任务分类" :visible.sync="ediltVisible" append-to-body>
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">修改采集任务分类</span>
        </div>
        <el-form :model="editClassTask" ref="editClassTask">
            <el-form-item label=" 分类编号" prop="classify_num" :rules="rule.default" :label-width="formLabelWidth" width="130">
                <el-input v-model="editClassTask.classify_num" style="width:284px" disabled></el-input>
            </el-form-item>
            <el-form-item label=" 分类名称" prop="classify_name" :rules="rule.default" :label-width="formLabelWidth">
                <el-input v-model="editClassTask.classify_name" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                <el-input v-model="editClassTask.remark" type="textarea" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button size="mini" type="danger" @click="cancleEdit">取 消</el-button>
            <el-button size="mini" type="primary" @click="editClassTaskSane('editClassTask')">保存</el-button>
        </div>
    </el-dialog>
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import Step from "./step";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as functionAll from "./dbAgentcollect";
import * as message from "@/utils/js/message";
import Loading from '../../components/loading'
export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 0,
            form: {
                plane_url: ''
            },
            formLabelWidth: "150px",
            size: "medium",
            showDiolag: false,
            pagesize: 10,
            currentPage: 1,
            data2: [],
            radio: "1",
            isLoading: false,
            classify_id: '',
            hiddenshow: true,
            addClassTask: {

            },
            editClassTask: {

            },
            fileMark: '',
            updateMark: '',
            CollTaskData: [],
            defaultProps: {
                children: "children",
                label: "path",
                isLeaf: 'leaf'
            },
            radio: null,
            innerVisible: false,
            ediltVisible: false,
            dialogSelectfolder: false,
            rule: validator.default,
        }
    },
    mounted() {
        this.getAllInfo();
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        //获取首页信息
        getAllInfo() {
            if (this.$route.query.edit == 'yes') {
                this.getInitDataFileData();
            } else {
                functionAll.addDataFileData({
                    agent_id: this.$route.query.agent_id,
                    source_id: this.$route.query.source_id
                }).then(res => {
                    if (res.data.plane_url != undefined && res.data.task_name != undefined) {
                        this.updateMark = "1";
                        this.radio = res.data.classify_id;
                        this.classify_id = res.data.classify_id;
                        this.form = res.data;
                        this.fileMark = res.data.plane_url;
                    }
                })
            }
        },
        // 点击编辑获取的数据
        getInitDataFileData() {
            functionAll.getInitDataFileData({
                agent_id: this.$route.query.agent_id,
                colSetId: this.$route.query.id
            }).then(res => {
                if (res.data.plane_url != undefined && res.data.task_name != undefined) {
                    this.updateMark = "1";
                    this.radio = res.data.classify_id;
                    this.classify_id = res.data.classify_id;
                    this.form = res.data;
                    this.fileMark = res.data.plane_url;
                }
            })
        },
        // 获取分类编号和分类名称
        getNumber() {
            functionAll.getClassifyInfo({
                sourceId: this.$route.query.source_id
            }).then(res => {
                this.showDiolag = true;
                this.CollTaskData = res.data;
            });
        },
        //编辑任务分类
        editText(val) {
            this.editClassTask = Object.assign({}, val);
            this.ediltVisible = true;
        },
        // 编辑任务保存
        editClassTaskSane(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.editClassTask["agent_id"] = this.$route.query.agent_id;
                    this.editClassTask["sourceId"] = this.$route.query.source_id;
                    let page = this.editClassTask;
                    delete page.user_id;
                    functionAll.updateClassifyInfo(this.editClassTask).then(res => {
                        this.ediltVisible = false;
                        message.updateSuccess(res);
                        this.getNumber();
                    });
                }
            })
        },
        // 取消编辑任务
        cancleEdit() {
            this.ediltVisible = false;
            this.$refs.editClassTask.resetFields();
        },
        // 删除任务分类
        deleteText(row) {
            message.confirmMsg('确定删除吗').then(res => {
                let params = {};
                params["classifyId"] = row.classify_id;
                functionAll.deleteClassifyInfo(params).then(res => {
                    message.deleteSuccess(res);
                    this.getNumber();
                });
            }).catch(() => {})
        },
        // 保存新增任务
        addClassTaskFun(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    this.addClassTask["agent_id"] = this.$route.query.agent_id;
                    this.addClassTask["sourceId"] = this.$route.query.source_id;
                    functionAll.saveClassifyInfo(this.addClassTask).then(res => {
                        this.innerVisible = false;
                        message.saveSuccess(res);
                        this.getNumber();
                    });
                }
            })
        },
        //取消新增保存
        cancelAdd() {
            this.$refs.addClassTask.resetFields();
            this.innerVisible = false;
        },
        //取消选择名称
        cancelClassNumBtn() {
            this.showDiolag = false;
            this.radio = "";
        },
        //保存选择名称
        saveClassNumBtn(row) {
            if (row.length > 0) {
                if (this.radio != '') {
                    for (let i = 0; i < row.length; i++) {
                        if (row[i].classify_id == this.radio) {
                            this.classify_id = row[i].classify_id;
                            this.showDiolag = false;
                            this.form.classify_name = row[i].classify_name;
                            this.form.classify_num = row[i].classify_num;
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
        // 分页显示
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        // 取消选择目录文件并且关闭弹出框
        cancelSelect() {
            if (this.fileMark != '') {
                this.form.plane_url = this.fileMark;
            } else {
                this.form.plane_url = '';
            }

            this.dialogSelectfolder = false;
        },
        // 获取目录结构
        seletFilePath() {
            this.dialogSelectfolder = true;
            let arry = [],
                path = '';
            functionAll
                .selectPath({
                    agent_id: this.$route.query.agent_id,
                    path: path
                })
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].isFolder == 'true') {
                                res.data[i].children = [{}];
                                res.data[i].disabled = true;
                                res.data[i].leaf = false;
                            } else if (res.data[i].isFolder == 'false') {
                                res.data[i].disabled = false;
                                res.data[i].leaf = true;
                            }
                        }
                        this.data2 = res.data;
                    } else {
                        this.treenloadingInfo = '暂无数据'
                    }

                });
        },
        //获取选中状态下的数据
        handleCheckChange(data, checked, indeterminate) {
            if (checked) {
                let arr = [data.name];
                this.$refs.tree.setCheckedKeys(arr);
            }
            this.form.plane_url = data.path;
        },
        //  获取目录下一级
        loadNode(node, resolve) {
            if (node.level > 0) {
                let path = node.data.path,
                    id = this.$route.query.agent_id;
                setTimeout(() => {
                    functionAll
                        .selectPath({
                            agent_id: id,
                            path: path
                        })
                        .then(res => {
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].isFolder == 'true') {
                                    res.data[i].children = [{}];
                                    res.data[i].disabled = true;
                                    res.data[i].leaf = false;
                                } else if (res.data[i].isFolder == 'false') {
                                    res.data[i].disabled = false;
                                    res.data[i].leaf = true;
                                }
                            }
                            resolve(res.data);
                        });

                }, 500);
            }

        },
        // 保存采集任务跳转下一步
        nextCollect(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let object = Object.assign({}, this.form)
                    this.isLoading = true;
                    this.form['classify_id'] = this.classify_id;
                    this.form['agent_id'] = this.$route.query.agent_id;
                    let obj = this.form;
                    delete obj.classify_name;
                    delete obj.classify_num;
                    if (this.updateMark == "1") {
                        functionAll.updateDataFile(obj).then(res => {
                            this.isLoading = false;
                            if (res && res.success) {
                                let data = {}
                                if (this.$route.query.edit == 'yes') {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: res.data,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                        edit: "yes"
                                    }
                                } else {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: res.data,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                    }
                                }
                                this.$router.push({
                                    path: "/collection4_2",
                                    query: data
                                })
                            } else {
                                this.form = object;
                            }
                        })
                    } else {
                        functionAll.saveDataFile(obj).then(res => {
                            this.isLoading = false;
                            if (res && res.success) {
                                let data = {}
                                if (this.$route.query.edit == 'yes') {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: res.data,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                        edit: "yes"
                                    }
                                } else {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: res.data,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                    }
                                }
                                this.$router.push({
                                    path: "/collection4_2",
                                    query: data
                                })
                            } else {
                                this.form = object;
                            }
                        })
                    }
                }
            })
        },
    },

}
</script>

<style scoped>
/* 采集任务表单 */
.step1 .oneContent {
    min-height: 180px;
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
    padding: 2% 4% 2% 0;
}

/* 按钮设置 */
.step1 .addButton {
    color: black
}

.step1>>>.el-input-group__prepend button.el-button {
    background-color: #F56C6C;
    color: white;
}

.step1 .netxNUM {
    color: transparent;
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
