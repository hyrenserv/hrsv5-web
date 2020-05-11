<template>
<div class="ftpCollect">
    <el-row class="partOne">
        卸数 > 配置数据源与启动方式
    </el-row>

    <el-row class="partTwo">
        <el-form ref="form" :model="form" status-icon>
            <el-col :span="12">
                <el-form-item label="ftp任务编号" :label-width="formLabelWidth" prop="ftp_number" :rules="filter_rules([{required: true,dataType: 'confignum'}])">
                    <el-input v-model="form.ftp_number" placeholder="ftp任务编号" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp名称" :label-width="formLabelWidth" prop="ftp_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_name" placeholder="ftp名称" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="11">
                <el-form-item label="开始日期" :label-width="formLabelWidth" prop="start_date" :rules="rule.selected">
                    <el-date-picker format="yyyy-MM-dd" value-format="yyyyMMdd" type="date" v-model="form.start_date" placeholder="选择开始日期" style="width:100%;"></el-date-picker>
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
                    <el-date-picker format="yyyy-MM-dd" value-format="yyyyMMdd" type="date" v-model="form.end_date" placeholder="选择结束日期" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集结束日期，不填写默认为9999-12-31" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp服务IP" :label-width="formLabelWidth" prop="ftp_ip" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_ip" placeholder="ftp服务IP" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp服务端口" :label-width="formLabelWidth" prop="ftp_port" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_port" placeholder="ftp服务端口" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp用户名" :label-width="formLabelWidth" prop="ftp_username" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_username" placeholder="ftp用户名" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp密码" :label-width="formLabelWidth" prop="ftp_password" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_password" placeholder="ftp密码" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="18">
                <el-form-item label="ftp服务器目录" :label-width="formLabelWidth" prop="ftp_dir" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.ftp_dir" placeholder="ftp服务器目录" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="18">
                <el-form-item label="agent机器目录" :label-width="formLabelWidth" prop="local_path" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.local_path" placeholder="agent机器目录" :disabled="false" :size="size">
                        <template slot="prepend">
                            <el-button @click="dialogSelectfolder = true;seletFilePath()">选择目录</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="是否实时读取" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_read_realtime" @change="handerChange_realtime">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12" v-if="showOrHidden_realtime">
                <el-form-item label="实时读取间隔时间" :label-width="formLabelWidth">
                    <el-input v-model="form.realtime_interval" placeholder="实时读取间隔时间 单位：秒" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="ftp推拉模式" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.ftp_model" @change="handerChange_model">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="下级目录规则" :label-width="formLabelWidth" prop="ftp_rule_path" :rules="rule.selected">
                    <el-select v-model="form.ftp_rule_path" placeholder="请选择数据下级目录规则" clearable style="width: 100%;">
                        <el-option v-for="item in FtpRule" :key="item.value" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12" v-if="showOrHidden_unzip">
                <el-form-item label="是否解压" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_unzip" @change="handerChange_unzip">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12" v-if="showOrHidden_reduce">
                <el-form-item label="解压方式" :label-width="formLabelWidth">
                    <el-select v-model="form.reduce_type" placeholder="请选择解压方式" clearable style="width: 100%;">
                        <el-option v-for="item in reduceType" :key="item.value" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="获取文件后缀" :label-width="formLabelWidth">
                    <el-input v-model="form.file_suffix" placeholder="文件后缀名称" :size="size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="启动方式" :label-width="formLabelWidth" prop="run_way" :rules="rule.selected">
                    <el-select v-model="form.run_way" placeholder="请选择启动方式" clearable style="width: 100%;">
                        <el-option v-for="item in runWay" :key="item.value" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

        </el-form>
    </el-row>

    <el-row class="partThree">
        <el-col :span="12">
            <el-button size="medium" type="primary" @click="goBackQuit">返回</el-button>
        </el-col>

        <el-col :span="12">
            <div class="partThreeDiv">
                <el-button size="medium" type="success" style="float:right" @click="submitForm('form')">
                    完成
                </el-button>
            </div>
        </el-col>
    </el-row>
    <!-- 选择目录弹出框 -->
    <el-dialog title="选择目录" :visible.sync="dialogSelectfolder">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择目录</span>
        </div>
        <div class="mytree"  hight='200'>
            <el-tree ref='tree' :data="data2" :check-strictly="true" show-checkbox node-key="name" lazy :load="loadNode" :props="defaultProps" accordion :indent='0' @check-change="handleCheckChange">
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
    <!-- 添加ftp采集成功后选择下一步的弹出框 -->
    <el-dialog title="提示信息" :visible.sync="dialogSelectOk" width="30%">
        <p>设置完成！请等待Agent运行...不运行请点击取消按钮</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSelectOk=false" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="addFtpCollect" size="mini">确定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./ftpCollect";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import {
    log
} from 'util';
let arrData = []
let DataAll = {}
let objjson;
let itemChildrenPath = [];
export default {
    data() {
        return {
            form: {
                ftp_number: "",
                ftp_name: "",
                ftp_ip: "",
                ftp_port: "",
                ftp_username: "",
                is_read_realtime: "0",
                ftp_model: "0",
                is_unzip: "0",
                local_path: '',
                ftp_number: "",
                ftp_password: "",
                ftp_dir: "",
                ftp_rule_path: "",
                run_way: "",
                start_date: "",
                end_date: "",
                file_suffix: ""
            },
            FtpRule: [],
            dataBaseCode: [],
            runWay: [],
            YesNo: [],
            reduceType: [],
            data2: [],
            item: {},
            defaultProps: {
                children: "children",
                label: "path"
            },
            disabled: true,
            showOrHidden_realtime: false,
            showOrHidden_reduce: false,
            showOrHidden_unzip: false,
            size: "medium",
            dialogSelectfolder: false,
            dialogSelectOk: false,
            rule: validator.default,
            formLabelWidth: "150px",
        };
    },
    created() {
        //判断是新增采集还是编辑更新采集
        this.addOrUpdate();
        //  是否实时读取判断是否实时读取间隔时间
        if (this.form.is_read_realtime == "0") {
            this.showOrHidden_realtime = false;
        } else if (this.form.is_read_realtime == "1") {
            this.showOrHidden_realtime = true;
        }
        // 是否解压控制解压类型
        if (this.form.is_unzip == "0") {
            this.showOrHidden_reduce = false;
        } else if (this.form.is_unzip == "1") {
            this.showOrHidden_reduce = true;
        }
        // 是否推拉模式控制是否解压
        if (this.form.ftp_model == "0") {
            this.showOrHidden_unzip = true;
        } else if (this.form.ftp_model == "1") {
            this.showOrHidden_unzip = false;
        }
        this.getCategoryItems("IsFlag");
        this.getCategoryItems("ExecuteWay");
        this.getCategoryItems("FtpRule");
    },
    methods: {
        //判断是新增采集还是编辑更新采集
        addOrUpdate() {
            let ftp_id = this.$route.query.id;
            if (this.$route.query.id) {
                functionAll.searchFtp_collect({
                    ftp_id: ftp_id,
                    agent_id: this.$route.query.agent_id
                }).then((res) => {
                    this.form = res.data;
                })
            }
        },
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            });
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "FtpRule") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.FtpRule = res.data;
                        }
                    });
            } else if (e == "ReduceType") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.reduceType = res.data;
                        }
                    });
            } else if (e == "ExecuteWay") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.runWay = res.data;
                        }
                    });
            } else if (e == "IsFlag") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.YesNo = res.data;
                        }
                    });
            }
        },
        // 添加ftp收集任务或者编辑更新判断
        addFtpCollect() {
            let ftp_id = this.$route.query.id;
            this.form["agent_id"] = this.$route.query.agent_id;
            if (this.$route.query.id) {
                this.form["ftp_id"] = this.$route.query.id;
                functionAll.updateFtp_collect(this.form).then(res => {
                    if (res && res.success) {
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        })
                        this.$router.push({
                            name: "agentList"
                        });
                    }
                });
            } else {
                functionAll.addFtp_collect(this.form).then(res => {
                    if (res && res.success) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        })
                        this.$router.push({
                            name: "agentList"
                        });
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
                                res.data[i].children = [{}]
                            }
                        }
                        this.data2 = res.data;
                    } else {
                        this.treenloadingInfo = '暂无数据'
                    }

                });
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
                                    res.data[i].children = [{}]
                                }
                            }
                            resolve(res.data);
                        });

                }, 500);
            }

        },
        //获取选中状态下的数据
        handleCheckChange(data) {
            this.form.local_path = data.path;
        },
        // 取消选择目录并且关闭弹出框
        cancelSelect() {
            this.form.local_path = "";
            this.dialogSelectfolder = false;
        },
        // 检查表单有没有填写完整
        submitForm(formName) {
            if (this.DifferenceValue < 0) {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: '结束日期不能小于开始日期!',
                    duration: 0
                })
            } else {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.dialogSelectOk = true
                    }
                });
            }
        },
    },
    computed: {
        DifferenceValue() {
            return this.form.end_date - this.form.start_date
        }
    }
};
</script>

<style scoped>
.ftpCollect .el-row {
    margin-top: 20px;
}

.ftpCollect .partOne {
    font-size: 13px;
    color: #777;
}

/* form表单 */
.ftpCollect .partTwo {
    padding: 2% 4% 2% 0;
    width: 100%;
    border: 1px solid #e6e6e6;
}

/* 按钮设置 */
.ftpCollect .partThreeDiv {
    float: right;
}

.ftpCollect .netxNUM {
    color: transparent;
}

.ftpCollect .partThreeDiv .el-button {
    margin-bottom: 20px;
}

.ftpCollect>>>.el-input-group__prepend button.el-button {
    background-color: #F56C6C;
    color: white;
}

.ftpCollect>>>.el-radio-group {
    display: inline-block;
    vertical-align: inherit;
    line-height: inherit;
}

/* 提示信息 */
.ftpCollect .item {
    float: right;
    margin-top: 24%;
}
</style>
