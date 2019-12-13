<template>
<div class="collectOption">
    <el-row class="partOne">
        <el-col :span="24">
            <el-steps :active="active" finish-status="success" align-center style="margin: 10px 60px 20px 60px;">
                <el-step title="步骤 1" description="采集设置"></el-step>
                <el-step title="步骤 2" description="采集文件设置"></el-step>
                <el-step title="步骤 3" description="采集结构化设置"></el-step>
                <el-step title="步骤 4" description="存储设置"></el-step>
            </el-steps>
        </el-col>
    </el-row>

    <el-row class="partTwo">
        <el-form ref="form" :model="form">
            <el-col :span="12">
                <el-form-item label="半结构化设置编号" :label-width="formLabelWidth" prop="obj_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.obj_number" placeholder="半结构化设置编号"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="半结构化任务名称" :label-width="formLabelWidth" prop="obj_collect_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.obj_collect_name" placeholder="半结构化任务名称"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="操作系统类型" :label-width="formLabelWidth">
                    <el-input v-model="form.system_name	" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="主机名" :label-width="formLabelWidth">
                    <el-input v-model="form.host_name" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="本地系统时间" :label-width="formLabelWidth">
                    <el-input v-model="form.local_time" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="服务器日期" :label-width="formLabelWidth">
                    <el-input v-model="form.server_date" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="11">
                <el-form-item label="开始日期" :label-width="formLabelWidth" prop="s_date" :rules="rule.selected">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="form.s_date" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集开始日期" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="11">
                <el-form-item label="结束日期" :label-width="formLabelWidth" prop="e_date" :rules="rule.selected">
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="form.e_date" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集结束日期，不填写默认为9999-12-31" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="12">
                <el-form-item label="数据字符编码" :label-width="formLabelWidth" prop="database_code" :rules="rule.selected">
                    <el-select v-model="form.database_code" placeholder="请选择数据字符编码" clearable style="width: 100%;">
                        <el-option v-for="item in dataBaseCode" :key="item.value" :label="item.value" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="采集方式" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.object_collect_type">
                        <el-radio v-for="item in collect_type" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="启动方式" :label-width="formLabelWidth" prop="run_way" :rules="rule.selected">
                    <el-select v-model="form.run_way" placeholder="请选择启动方式" clearable style="width: 100%;">
                        <el-option v-for="item in runWay" :key="item.value" :label="item.value" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="行分隔符" :label-width="formLabelWidth">
                    <el-input v-model="form.row_remark"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="列分隔符" :label-width="formLabelWidth">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="是否为隐藏字符" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_sendok">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="18">
                <el-form-item label="选择采集路径" :label-width="formLabelWidth" prop="file_path" :rules="rule.selected">
                    <el-input v-model="form.file_path" :disabled="disabled">
                        <template slot="prepend">
                            <el-button @click="dialogSelectfolder = true">选择文件夹</el-button>
                        </template>
                        <template slot="append">
                            <el-button type="primary" @click="dialogWatchSheet = true">查看表</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>

    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit"> 返回</el-button>
        </el-col>

        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:right" @click="nextSteps('form')"> 下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>

    <!-- 选择文件夹弹窗框 -->
    <el-dialog title="选择文件夹" :visible.sync="dialogSelectfolder">
        <el-tree :data="data2" show-checkbox :props="defaultProps" @check-change="handleCheckChange">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button class="netxNUM" type="text" @click="() => append(data)">
                        点击获取下一级目录，回去对应的不同目录下的不同目录展示出来。
                    </el-button>
                </span>
            </span>
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="dialogSelectfolder = false" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 查看表弹出框 -->
    <el-dialog title="选择文件夹" :visible.sync="dialogWatchSheet">
        <el-tree :data="data2" show-checkbox :props="defaultProps" @check-change="handleCheckChange">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button class="netxNUM" type="text" @click="() => append(data)">
                        点击获取下一级目录，回去对应的不同目录下的不同目录展示出来。
                    </el-button>
                </span>
            </span>
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="dialogSelectfolder = false" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- <el-row class="partThree">
        <el-row>
            <el-col :span="8" class="tabcol">
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="月" name="first">
                        <el-radio-group v-model="form.month">
                            <el-radio label="每月"></el-radio>
                            <el-radio label="指定月"></el-radio>
                        </el-radio-group>
                        <p>
                            当前采集频率为 :{{form.month}} -- {{form.week}}
                        </p>
                    </el-tab-pane>
                </el-tabs>
                <p class="elTabinfo">第一步，设置月频率</p>
            </el-col>
            <el-col :span="8" class="tabcol">
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="星期" name="first">
                        <el-radio-group v-model="form.week">
                            <el-radio label="星期"></el-radio>
                            <el-radio label="指定星期"></el-radio>
                        </el-radio-group>
                    </el-tab-pane>
                    <el-tab-pane label="天" name="second">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-tab-pane>
                </el-tabs>
                <p class="elTabinfo">第二步，设置星期/天频率</p>
            </el-col>
            <el-col :span="8" class="tabcol">
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="时间" name="first">用户管理</el-tab-pane>
                </el-tabs>
                <p class="elTabinfo">第三步，设置数据采集时间</p>
            </el-col>
        </el-row>
    </el-row> -->
</div>
</template>

<script>
import * as functionAll from "./semiStructuredAgent";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            form: {
                database_code: "",
                run_way: "",
                object_collect_type: "1",
                is_sendok: "1",
                s_date: '',
                e_date: ''
            },
            dialogSelectfolder: false,
            dialogWatchSheet:false,
            active: 0,
            collect_type: [],
            dataBaseCode: [],
            runWay: [],
            YesNo: [],
            data2: [],
            defaultProps: {
                children: "children",
                label: "path"
            },
            disabled: true,
            rule: validator.default,
            formLabelWidth: "150px"
        }
    },
    created() {
        this.getCategoryItems("DataBaseCode");
        this.getCategoryItems("ObjectCollectType");
        this.getCategoryItems("ExecuteWay");
        this.getCategoryItems("IsFlag");
        // 1.需要调用一个接口拿到操作系统，本地时间和系统时间等disabled的input值；
    },
    methods: {
        // 1.一个点击下一步添加的接口
        //  获取目录下一级选择文件夹
        append(data) {
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            functionAll
                .selectPath({
                    agent_id: this.$route.query.agent_id,
                    path: data.path
                })
                .then(res => {
                    data.children = res.data
                });
        },
        //获取选中状态下的数据
        handleCheckChange(data) {
            this.form.file_path = data.path;
        },
        //3.首次获取操作系统，本地时间和系统时间的接口方法

        // 取消选择目录并且关闭弹出框
        cancelSelect() {
            this.form.file_path = "";
            this.dialogSelectfolder = false;
        },
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 下一步
        nextSteps(formName) {
            this.form.file_path = "/";
            console.log()
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //这里有一个保存的接口成功才会跳转
                    this.form["s_date"] = this.form.s_date.toLocaleString().substring(0, 10).replace(/\//g, '');
                    this.form["e_date"] =this.form.e_date.toLocaleString().substring(0, 10).replace(/\//g, '');
                    functionAll.addObjectCollect(this.form).then((res) => {
                        if (res && res.success) {
                            this.$router.push({
                                name: "collectFileOption"
                            })
                        } else {
                            this.form["s_date"] = "";
                            this.form["e_date"] = "";
                        }
                    })
                } else {
                    this.form["s_date"] = "";
                    this.form["e_date"] = "";
                }
            });

        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "ObjectCollectType") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.collect_type = res.data;
                    }
                })
            } else if (e == "DataBaseCode") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.dataBaseCode = res.data;
                    }
                })
            } else if (e == "ExecuteWay") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.runWay = res.data;
                    }
                })
            } else if (e == "IsFlag") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.YesNo = res.data;
                    }
                })
            }

        }
    }
}
</script>

<style scoped>
.collectOption {
    padding: 0 2% 0 2%;
}

.collectOption .el-row {
    margin-top: 20px;
}

/* form表单 */
.collectOption .partTwo {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
}

/* 提示信息 */
.collectOption .item {
    float: right;
    /* margin-top: 12px; */
    margin-top: 24%;
}

/* 选项卡作用描述信息 */
.collectOption .tabcol {
    position: relative;
    padding: 0 2% 0 0;
}

.collectOption .elTabinfo {
    position: absolute;
    top: 13%;
    right: 10%;
    font-size: 80%;
    color: #191c83;
}

/* 按钮设置 */
.collectOption .partFourDiv {
    float: right;
}

.collectOption .partFourDiv .el-button {
    margin-bottom: 20px;
}
</style>
