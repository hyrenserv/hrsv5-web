<template>
<div class="ftpCollect">
    <el-row>

    </el-row>

    <el-row class="partTwo">
        <el-form ref="form" :model="form">
            <el-col :span="12">
                <el-form-item label="ftp任务编号" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_number" placeholder="ftp任务编号" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp名称" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_name" placeholder="ftp名称"  :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="11">
                <el-form-item label="开始日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" v-model="form.start_date" placeholder="选择开始日期" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集开始日期" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="11">
                <el-form-item label="结束日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" v-model="form.end_date" placeholder="选择结束日期" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集结束日期，不填写默认为9999-12-31" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp服务IP" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_ip" placeholder="ftp服务IP"  :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp服务端口" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_port" placeholder="ftp服务端口"  :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_username" placeholder="ftp用户名"  :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp密码" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_password" placeholder="ftp密码"  :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="18">
                <el-form-item label="ftp服务器目录" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_dir" placeholder="ftp服务器目录"  :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="18">
                <el-form-item label="agent机器目录" :label-width="formLabelWidth">
                    <el-input :disabled="disabled"  :size="size">
                        <template slot="prepend">
                            <el-button @click="dialogSelectfolder = true">选择目录</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="是否实时读取" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_read_realtime">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp模式" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.ftp_model">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="下级目录规则" :label-width="formLabelWidth">
                    <el-select v-model="form.ftp_rule_path" placeholder="请选择数据下级目录规则" clearable style="width: 100%;">
                        <el-option v-for="item in FtpRule" :key="item.value" :label="item.value" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="是否解压" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_unzip">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="获取文件后缀" :label-width="formLabelWidth">
                    <el-input v-model="form.file_suffix" placeholder="文件后缀名称"  :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="启动方式" :label-width="formLabelWidth">
                    <el-select v-model="form.run_way" placeholder="请选择启动方式" clearable style="width: 100%;">
                        <el-option v-for="item in runWay" :key="item.value" :label="item.value" :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>

    <el-row class="partThree">
        <el-col :span="12">
            <el-button size="medium" type="primary" @click="goBackQuit"> 返回</el-button>
        </el-col>

        <el-col :span="12">
            <div class="partThreeDiv">
                <el-button size="medium" type="success" style="float:right" @click="addFtpCollect">完成<i class="el-icon-check"></i></el-button>
            </div>
        </el-col>
    </el-row>

</div>
</template>

<script>
import * as functionAll from "./ftpCollect";
export default {
    data() {
        return {
            form: {

            },
            FtpRule: [],
            dataBaseCode: [],
            runWay: [],
            YesNo: [],
            disabled: true,
            size:"medium",
            formLabelWidth: "150px"
        }
    },
    created() {
        // functionAll.selectPath({
        //     agent_id: this.$route.query.agent_id
        // }).then((res) => {
        //     if (res && res.success) {
        //         console.log("908")
        //     }
        // }),
        this.getCategoryItems("IsFlag");
        this.getCategoryItems("ExecuteWay");
        this.getCategoryItems("FtpRule");
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "FtpRule") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.FtpRule = res.data;
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
        },
        // 添加ftp收集任务
        addFtpCollect() {
            functionAll.addFtp_collect(
                this.form
            ).then((res) => {
                if (res && res.success) {

                }
            })
        }
    }

}
</script>

<style scoped>
.ftpCollect {
    padding: 0 2% 0 2%;
}

.ftpCollect .el-row {
    margin-top: 20px;
}

/* form表单 */
.ftpCollect .partTwo {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
}

/* 按钮设置 */
.ftpCollect .partThreeDiv {
    float: right;
}

.ftpCollect .partThreeDiv .el-button {
    margin-bottom: 20px;
}

/* 提示信息 */
.ftpCollect .item {
    float: right;
    margin-top: 12px;
}
</style>
