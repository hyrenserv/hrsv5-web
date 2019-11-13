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
                <el-form-item label="半结构化设置编号" :label-width="formLabelWidth">
                    <el-input v-model="form.obj_number" placeholder="半结构化设置编号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="半结构化任务名称" :label-width="formLabelWidth">
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
                <el-form-item label="开始日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="form.s_date" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集开始日期" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>
            <el-col :span="11">
                <el-form-item label="结束日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="form.e_date" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集结束日期，不填写默认为9999-12-31" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据字符编码" :label-width="formLabelWidth">
                    <el-select v-model="form.dataBaseCodevalue" placeholder="请选择数据字符编码" clearable style="width: 100%;">
                        <el-option v-for="item in dataBaseCode" :key="item.value" :label="item.value" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="采集方式" :label-width="formLabelWidth">
                    <el-radio-group v-model="radio">
                        <el-radio v-for="item in collect_type" :key="item.value" :label="item.value"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="启动方式" :label-width="formLabelWidth">
                    <el-select v-model="form.runWayvalue" placeholder="请选择启动方式" clearable style="width: 100%;">
                        <el-option v-for="item in runWay" :key="item.value" :label="item.value" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="行分隔符" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="列分隔符" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否为隐藏字符" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.resource">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.value"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="18">
                <el-form-item label="选择采集路径" :label-width="formLabelWidth">
                    <el-input v-model="form.file_path"></el-input>
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
                <el-button type="primary" style="float:right" @click="nextSteps"> 下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>
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
export default {
    data() {
        return {
            form: {
                name: "",
                month: "",
                week: "",
                database_code: "",
                dataBaseCodevalue: "",
                runWayvalue: ""
            },
            active: 0,
            collect_type: [],
            dataBaseCode: [],
            runWay: [],
            YesNo:[],
            disabled: true,
            radio: 0,
            formLabelWidth: "150px"
        }
    },
    created() {
        this.getCategoryItems("DataBaseCode");
        this.getCategoryItems("ObjectCollectType");
        this.getCategoryItems("ExecuteWay");
        this.getCategoryItems("IsFlag");
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 下一步
        nextSteps() {
            this.$router.push({
                name: "collectFileOption"
            })
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
    margin-top: 12px;
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
