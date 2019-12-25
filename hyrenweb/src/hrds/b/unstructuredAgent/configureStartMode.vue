<template>
<div class="configureStartMode">
    <el-row class="partOne">
        卸数 > 配置启动方式
    </el-row>

    <el-row class="partTwo">
        <el-form ref="form" :model="form">
            <el-col :span="12">
                <el-form-item label="归属Agent" :label-width="formLabelWidth">
                    <el-input v-model="form.agent_name" placeholder="归属Agent" :size="size" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="非结构化任务名称" :label-width="formLabelWidth" prop="fcs_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.fcs_name" placeholder="非结构化任务名称" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="操作系统类型" :label-width=" formLabelWidth">
                    <el-input v-model="form.system_type" placeholder="操作系统类型" :size="size" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="主机名" :label-width="formLabelWidth">
                    <el-input v-model="form.host_name" placeholder="主机名" :size="size" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="本地系统时间" :label-width="formLabelWidth">
                    <el-input v-model="form.systemtime" placeholder="本地系统时间" :size="size" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="数据采集服务器时间" :label-width="formLabelWidth">
                    <el-input v-model="form.agent_time" placeholder="数据采集服务器时间" :size="size" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="11">
                <el-form-item label="开始日期" :label-width="formLabelWidth" prop="start_date" :rules="rule.selected">
                    <el-date-picker type="date" v-model="form.start_date" placeholder="选择开始日期" style="width:100%;"></el-date-picker>
                    <el-input v-model="DifferenceValue" v-if="hidden = false"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集开始日期" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="11">
                <el-form-item label="结束日期" :label-width="formLabelWidth" prop="end_date" :rules="rule.selected">
                    <el-date-picker type="date" v-model="form.end_date" placeholder="选择结束日期" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集结束日期，不填写默认为9999-12-31" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="12">
                <el-form-item label="是否建立全文检索" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_solr" @change="handerChange_realtime">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
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

            <!-- <el-col :span="12">
                <el-form-item label="设置文件源" :label-width="formLabelWidth">
                    <el-button size="medium" type="success">设置文件源</el-button>
                </el-form-item>
            </el-col> -->
        </el-form>
    </el-row>

    <el-row class="partThree">
        <el-col :span="12">
            <el-button size="medium" type="primary" @click="goBackQuit"> 返回</el-button>
        </el-col>

        <el-col :span="12">
            <div class="partThreeDiv">
                <el-button size="medium" type="primary" style="float:right" @click="unStructuredCollect('form')">下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./unstructuredAgent";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            form: {
                is_solr: "1",
                fcs_name: "",
                run_way: ""
            },
            runWay: [],
            YesNo: [],
            disabled: true,
            showOrHidden_realtime: false,
            showOrHidden_reduce: false,
            showOrHidden_unzip: false,
            size: "medium",
            rule: validator.default,
            formLabelWidth: "150px"
        }
    },
    async created() {
        // 获取首页数据
        await this.searchFileCollect();
        // 获取代码项对应值
        this.getCategoryItems("IsFlag");
        this.getCategoryItems("ExecuteWay");
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 获取首页数据（同时判断是新加任务还是编辑任务)
        searchFileCollect() {
            let fcs_id = this.$route.query.fcs_id;
            if (fcs_id || '') {
                functionAll.searchFileCollect({
                    agent_id: this.$route.query.agent_id,
                    fcs_id: fcs_id
                }).then((res) => {
                    // 数据回显
                    this.form.fcs_name = res.data.file_collect_set_info.fcs_name
                    this.form.system_type = res.data.file_collect_set_info.system_type;
                    this.form.agent_name = this.$route.query.agent_name;
                    this.form.host_name = res.data.file_collect_set_info.host_name;
                    this.form.is_solr = res.data.file_collect_set_info.is_solr;
                    let date = new Date();
                    this.form.systemtime = date.toLocaleString('chinese', {
                        hour12: false
                    }).replace(/\//g, '-');
                    // 处理传来的年月日
                    let year = res.data.agentdate.substring(0, 4);
                    let month = res.data.agentdate.substring(4, 6);
                    let day = res.data.agentdate.substring(6, 9);
                    let dateChange = year + "-" + month + "-" + day;
                    // 处理传来的时分秒
                    let hour = res.data.agenttime.substring(0, 2);
                    let minutes = res.data.agenttime.substring(2, 4);
                    let seconds = res.data.agenttime.substring(4, 6);
                    let hourChange = hour + ":" + minutes + ":" + seconds;
                    this.form.agent_time = dateChange + " " + hourChange;
                });
            } else {
                functionAll.searchFileCollect({
                    agent_id: this.$route.query.agent_id
                }).then((res) => {
                    this.form.system_type = res.data.osName;
                    this.form.agent_name = this.$route.query.agent_name;
                    this.form.host_name = res.data.userName;
                    let date = new Date();
                    this.form.systemtime = date.toLocaleString('chinese', {
                        hour12: false
                    }).replace(/\//g, '-');
                    // 处理传来的年月日
                    let year = res.data.agentdate.substring(0, 4);
                    let month = res.data.agentdate.substring(4, 6);
                    let day = res.data.agentdate.substring(6, 9);
                    let dateChange = year + "-" + month + "-" + day;
                    // 处理传来的时分秒
                    let hour = res.data.agenttime.substring(0, 2);
                    let minutes = res.data.agenttime.substring(2, 4);
                    let seconds = res.data.agenttime.substring(4, 6);
                    let hourChange = hour + ":" + minutes + ":" + seconds;
                    this.form.agent_time = dateChange + " " + hourChange;
                });
            }

        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "ExecuteWay") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    this.runWay = res.data;
                })
            } else if (e == "IsFlag") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    this.YesNo = res.data;
                })
            }
        },
        // 保存非结构化文件采集页面信息跳转下一步和更新非结构化文件采集到下一步
        unStructuredCollect(formName) {
            if (this.DifferenceValue < 0) {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: '结束日期不能小于开始日期!',
                    duration: 0
                })
            } else {
                this.$refs[formName].validate(valid => {
                    function changeData(num) {
                        return num > 9 ? (num + "") : ("0" + num);
                    }
                    // 处理传参日期与form
                    let s_date = (this.form.start_date.getFullYear() + '-' + changeData((this.form.start_date.getMonth() + 1)) + '-' + changeData(this.form.start_date.getDate())).replace(/\-/g, '');
                    let e_date = (this.form.end_date.getFullYear() + '-' + changeData((this.form.end_date.getMonth() + 1)) + '-' + changeData(this.form.end_date.getDate())).replace(/\-/g, '');
                    this.form["start_date"] = s_date;
                    this.form["end_date"] = e_date;
                    let fcs_id = this.$route.query.fcs_id;
                    this.form["agent_id"] = this.$route.query.agent_id;
                    this.form["fcs_id"] = fcs_id;
                    // 通过fcs_id判断是更新还是新建任务
                    if (valid) {
                        if (fcs_id || '') {
                            // 更新任务
                            functionAll.updateFileCollect(
                                this.form
                            ).then((res) => {
                                if (res && res.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '更新成功!'
                                    })
                                    this.$router.push({
                                        path: "/configureFileOption",
                                        query: {
                                            fcs_id: fcs_id,
                                            agent_id: this.$route.query.agent_id,
                                            agent_name: this.$route.query.agent_name
                                        }
                                    });
                                } else {
                                    this.form["start_date"] = "";
                                    this.form["end_date"] = "";
                                }
                            })
                        } else {
                            // 新建任务
                            functionAll.addFileCollect(
                                this.form
                            ).then((res) => {
                                if (res && res.success) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功!'
                                    })
                                    this.$router.push({
                                        path: "/configureFileOption",
                                        query: {
                                            fcs_id: res.data,
                                            agent_id: this.$route.query.agent_id,
                                            agent_name: this.$route.query.agent_name
                                        }
                                    });
                                } else {
                                    this.form["start_date"] = "";
                                    this.form["end_date"] = "";
                                }
                            })
                        }
                    } else {
                        this.form["start_date"] = "";
                        this.form["end_date"] = "";
                    }
                });
            }
        },
        // 是否实时读取控制实时读取间隔时间
        handerChange_realtime(val) {
            if (val == 1) {
                this.showOrHidden_realtime = true;
            } else if (val == 0) {
                this.showOrHidden_realtime = false;
            }
        },
    },
    computed: {
        DifferenceValue() {
            return this.form.end_date - this.form.start_date
        }
    }
}
</script>

<style scoped>
.configureStartMode {
    padding: 0 2% 0 2%;
}

.configureStartMode .el-row {
    margin-top: 20px;
}

.configureStartMode .partOne {
    font-size: 13px;
    color: #777;
}

/* form表单 */
.configureStartMode .partTwo {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
}

/* 按钮设置 */
.configureStartMode .partThreeDiv {
    float: right;
}

.configureStartMode .partThreeDiv .el-button {
    margin-bottom: 20px;
}

/* 提示信息 */
.configureStartMode .item {
    float: right;
    /* margin-top: 12px; */
    margin-top: 24%;
}
</style>
