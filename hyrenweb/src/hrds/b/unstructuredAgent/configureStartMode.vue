<template>
<div class="configureStartMode">
    <el-row>

    </el-row>

    <el-row class="partTwo">
        <el-form ref="form" :model="form">
            <el-col :span="12">
                <el-form-item label="归属Agent" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_number" placeholder="ftp任务编号" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="非结构化任务名称" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_name" placeholder="非结构化任务名称" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="操作系统类型" :label-width=" formLabelWidth">
                    <el-input v-model="form.system_type" placeholder="ftp服务IP" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="主机名" :label-width="formLabelWidth">
                    <el-input v-model="form.host_name" placeholder="ftp服务端口" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="本地系统时间" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_username" placeholder="ftp用户名" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="数据采集服务器时间" :label-width="formLabelWidth">
                    <el-input v-model="form.ftp_password" placeholder="ftp密码" :size="size"></el-input>
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
                <el-form-item label="是否建立全文检索" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_read_realtime" @change="handerChange_realtime">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
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

            <el-col :span="12">
                <el-form-item label="设置文件源" :label-width="formLabelWidth">
                    <el-button size="medium" type="success">设置文件源</el-button>
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
                <el-button size="medium" type="primary" style="float:right" @click="addFtpCollect">下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./unstructuredAgent";
export default {
    data() {
        return {
            form: {
                is_read_realtime: "0",
                ftp_model: "0",
                is_unzip: "0"
            },
            FtpRule: [],
            dataBaseCode: [],
            runWay: [],
            YesNo: [],
            reduceType: [],
            disabled: true,
            showOrHidden_realtime: false,
            showOrHidden_reduce: false,
            showOrHidden_unzip: false,
            size: "medium",
            formLabelWidth: "150px"
        }
    },
    created() {
        functionAll.selectPath({
            agent_id: this.$route.query.agent_id
        }).then((res) => {
            if (res && res.success) {
                console.log(res.data)
            }
        });
        // //// 是否实时读取判断是否实时读取间隔时间
        if (this.form.is_read_realtime == "0") {
            this.showOrHidden_realtime = false;
        } else if (this.form.is_read_realtime == "1") {
            this.showOrHidden_realtime = true;
        };
        // 是否解压控制解压类型
        if (this.form.is_unzip == "0") {
            this.showOrHidden_reduce = false;
        } else if (this.form.is_unzip == "1") {
            this.showOrHidden_reduce = true;
        };
        // 是否推拉模式控制是否解压
        if (this.form.ftp_model == "0") {
            this.showOrHidden_unzip = true;
        } else if (this.form.ftp_model == "1") {
            this.showOrHidden_unzip = false;
        };
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
            } else if (e == "ReduceType") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.reduceType = res.data;
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
        },
        // 是否实时读取控制实时读取间隔时间
        handerChange_realtime(val) {
            if (val == 1) {
                this.showOrHidden_realtime = true;
            } else if (val == 0) {
                this.showOrHidden_realtime = false;
            }
        },
        // 是否推拉模式控制是否解压
        handerChange_model(val) {
            if (val == 1) {
                this.showOrHidden_unzip = false;
            } else if (val == 0) {
                this.showOrHidden_unzip = true;
            }
        },
        // 是否解压控制解压类型
        handerChange_unzip(val) {
            if (val == 1) {
                this.showOrHidden_reduce = true;
                this.getCategoryItems("ReduceType");
            } else if (val == 0) {
                this.showOrHidden_reduce = false;
            }
        },
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
