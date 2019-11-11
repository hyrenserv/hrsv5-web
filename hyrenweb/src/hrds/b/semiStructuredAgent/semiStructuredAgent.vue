<template>
<div class="semiStructuredAgent">
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
                    <el-input v-model="form.name" placeholder="半结构化设置编号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="半结构化任务名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="半结构化任务名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="操作系统类型" :label-width="formLabelWidth">
                    <el-input v-model="form.name" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="主机名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="本地系统时间" :label-width="formLabelWidth">
                    <el-input v-model="form.name" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="服务器日期" :label-width="formLabelWidth">
                    <el-input v-model="form.name" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="开始日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集开始日期" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>
            <el-col :span="11">
                <el-form-item label="结束日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date1" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集结束日期，不填写默认为9999-12-31" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>
            <el-col :span="12">
                <el-form-item label="数据字符编码" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="采集方式" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="启动方式" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
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
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="18">
                <el-form-item label="选择采集路径" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
    <el-row class="partThree">
        <el-row><i class="fa fa-signal"></i>对象数据采集频率设置</el-row>
        <el-row>
            <el-col :span="8" class="tabcol">
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="月" name="first">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-tab-pane>
                </el-tabs>
                <p class="elTabinfo">第一步，设置月频率</p>
            </el-col>
            <el-col :span="8" class="tabcol">
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="星期" name="first">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
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
    </el-row>
    </el-row>

    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" style="float:right" @click="nextSteps"> 下一步<i class="el-icon-right"></i></el-button>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            form: {
                name: ""
            },
            disabled: true,
            formLabelWidth: "150px"
        }
    },
    methods: {
        nextSteps() {
            this.$router.push({
                name: "collectOptions"
            })
        }
    },
}
</script>

<style scoped>
.semiStructuredAgent {
    padding: 0 2% 0 2%;
}

.semiStructuredAgent .el-row {
    margin-top: 20px;
}

/* form表单 */
.semiStructuredAgent .partTwo {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
}

/* 提示信息 */
.semiStructuredAgent .item {
    float: right;
    margin-top: 12px;
}

/* 选项卡作用描述信息 */
.semiStructuredAgent .tabcol {
    position: relative;
    padding: 0 2% 0 0;
}

.semiStructuredAgent .elTabinfo {
    position: absolute;
    top: 13%;
    right: 10%;
    font-size: 80%;
    color: #191c83;
}
</style>
