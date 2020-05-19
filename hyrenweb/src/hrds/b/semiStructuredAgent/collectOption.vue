<template>
<div class="collectOption">
    <el-row class="partOne">
        <el-col :span="24">
            <Step :active="active"></Step>
        </el-col>
    </el-row>

    <el-row class="partTwo">
        <el-form ref="form" :model="form" status-icon>
            <el-col :span="12">
                <el-form-item label="半结构化设置编号" :label-width="formLabelWidth" prop="obj_number" :rules="filter_rules([{required: true}])">
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
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyyMMdd" placeholder="选择开始日期" v-model="form.s_date" style="width:100%;"></el-date-picker>
                    <el-input v-model="DifferenceValue" v-if="hidden = false"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="1">
                <el-tooltip class="item" effect="dark" content="任务采集开始日期" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-col>

            <el-col :span="11">
                <el-form-item label="结束日期" :label-width="formLabelWidth" prop="e_date" :rules="rule.selected">
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyyMMdd" placeholder="选择结束日期" v-model="form.e_date" style="width:100%;"></el-date-picker>
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
                <el-form-item label="是否存在数据字典" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.is_dictionary" @change="changRadioValue">
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

            <el-col :span="12">
                <el-form-item label="文件后缀名" :label-width="formLabelWidth">
                    <el-input v-model="form.file_suffix"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12" v-if="showData_date">
                <el-form-item label="数据日期" :label-width="formLabelWidth" prop="data_date" :rules="rule.selected">
                    <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyyMMdd" placeholder="选择结束日期" v-model="form.data_date" style="width:100%;"></el-date-picker>
                </el-form-item>
            </el-col>

            <el-col :span="18">
                <el-form-item label="选择采集路径" :label-width="formLabelWidth" prop="file_path" :rules="rule.selected">
                    <el-input v-model="form.file_path" :disabled="false">
                        <template slot="prepend">
                            <el-button @click="dialogSelectfolder = true;seletFilePath()">选择文件夹</el-button>
                        </template>
                        <template slot="append">
                            <el-button type="primary" @click="dialogWatchSheet = true;viewTable()">查看表</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>

    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit" size="medium"> 返回</el-button>
        </el-col>

        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:right" size="medium" @click="nextSteps('form')"> 下一步</el-button>
            </div>
        </el-col>
    </el-row>

    <!-- 选择文件夹弹出框 -->
    <el-dialog title="选择文件夹" :visible.sync="dialogSelectfolder">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择文件夹</span>
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

    <!-- 查看表弹出框 -->
    <el-dialog title="查看表" :visible.sync="dialogWatchSheet">
        <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border stripe size="mini" style="width: 100%">
            <el-table-column type="index" label="序号" width="64" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="table_name" show-overflow-tooltip label="表名" align="center"></el-table-column>
            <el-table-column prop="table_cn_name" show-overflow-tooltip label="表中文名" align="center"></el-table-column>
        </el-table>
        <div class="pageDiv">
            <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="tableData.length"></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDiolag" size="mini" type="danger">关 闭</el-button>
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
import * as fixedAll from "@/utils/js/fileOperations";
import regular from "@/utils/js/regular";
import Step from "./step";
export default {
    components: {
        Step,
    },
    data() {
        return {
            form: {
                database_code: "",
                run_way: "",
                obj_number: "",
                obj_collect_name: "",
                object_collect_type: "1",
                is_sendok: "",
                s_date: '',
                e_date: '',
                system_name: '',
                host_name: '',
                local_time: '',
                file_path: '',
                data_date: '',
                file_suffix: '',
                is_dictionary: '1'
            },
            showData_date: false,
            dialogSelectfolder: false,
            dialogWatchSheet: false,
            active: 0,
            collect_type: [],
            dataBaseCode: [],
            runWay: [],
            YesNo: [],
            data2: [],
            tableData: [],
            defaultProps: {
                children: "children",
                label: "path"
            },
            disabled: true,
            rule: validator.default,
            formLabelWidth: "150px",
            currentPage: 1,
            pagesize: 10,
            localTime: '',
            serverTime: '',
        }
    },
    mounted() {
        this.getCategoryItems("DataBaseCode");
        this.getCategoryItems("ObjectCollectType");
        this.getCategoryItems("ExecuteWay");
        this.getCategoryItems("IsFlag");
        this.searchObjectCollect();
    },
    methods: {
        //判断是新增采集还是编辑更新采集
        searchObjectCollect() {
            if (this.$route.query.id) {
                // 更新初始页面
                functionAll.searchObjectCollect({
                    agent_id: this.$route.query.agent_id,
                    odc_id: this.$route.query.id
                }).then(res => {
                    this.form.system_name = res.data.osName;
                    this.form.host_name = res.data.userName;
                    // 处理传来的年月日服务器日期和时分秒
                    this.form.server_date = fixedAll.dateFormat(res.data.agentdate) + " " + fixedAll.hourFormat(res.data.agenttime);
                    this.serverTime = this.form.server_date;
                    // 处理传来的年月日本地日期和时分秒
                    this.form.local_time = fixedAll.dateFormat(res.data.localDate) + " " + fixedAll.hourFormat(res.data.localtime);
                    this.localTime = this.form.local_time;
                    this.form.obj_number = res.data.object_collect_info.obj_number;
                    this.form.obj_collect_name = res.data.object_collect_info.obj_collect_name;
                    this.form.s_date = res.data.object_collect_info.s_date;
                    this.form.e_date = res.data.object_collect_info.e_date;
                    this.form.database_code = res.data.object_collect_info.database_code;
                    this.form.run_way = res.data.object_collect_info.run_way;
                    if (res.data.object_collect_info.is_dictionary == "0") {
                        this.showData_date = true;
                        this.form.data_date = res.data.object_collect_info.data_date;
                    } else {
                        this.showData_date = false;
                    }
                    this.form.is_dictionary = res.data.object_collect_info.is_dictionary;
                    this.form.file_suffix = res.data.object_collect_info.file_suffix;
                    this.form.file_path = res.data.object_collect_info.file_path;
                })
            } else {
                // 新增初始页面
                functionAll.searchObjectCollect({
                    agent_id: this.$route.query.agent_id
                }).then(res => {
                    this.form.system_name = res.data.osName;
                    this.form.host_name = res.data.userName;
                    // 处理传来的年月日服务器日期和时分秒
                    this.form.server_date = fixedAll.dateFormat(res.data.agentdate) + " " + fixedAll.hourFormat(res.data.agenttime);
                    this.serverTime = this.form.server_date;
                    // 处理传来的年月日本地日期和时分秒
                    this.form.local_time = fixedAll.dateFormat(res.data.localDate) + " " + fixedAll.hourFormat(res.data.localtime);
                    this.localTime = this.form.local_time;
                })
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
        //  获取目录下一级选择文件夹
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
            this.form.file_path = data.path;
        },
        // 取消取消选择目录并且关闭弹出框
        cancelSelect() {
            this.form.file_path = "";
            this.dialogSelectfolder = false;
        },
        // 关闭查看表
        closeDiolag() {
            this.dialogWatchSheet = false;
        },
        // 查看表信息
        viewTable() {
            functionAll.viewTable({
                file_path: this.form.file_path,
                agent_id: this.$route.query.agent_id,
                is_dictionary: this.form.is_dictionary,
                data_date: this.form.data_date,
                file_suffix: this.form.file_suffix
            }).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data;
                }

            })
        },
        // 是否显示日期数据
        changRadioValue(val) {
            if (val == 0) {
                this.showData_date = true;
            } else {
                this.showData_date = false;
            }
        },
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 下一步
        nextSteps(formName) {
            if (this.DifferenceValue < 0) {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: '结束日期不能小于开始日期!',
                    duration: 0
                })
            } else {
                if (this.$route.query.id) {
                    this.$refs[formName].validate(valid => {
                        if (valid) {
                            this.form['odc_id'] = this.$route.query.id;
                            this.form.server_date = this.form.server_date.substring(0, 10).replace(/\-/g, '')
                            this.form.local_time = this.form.local_time.substring(0, 10).replace(/\-/g, '')
                            this.form.agent_id = this.$route.query.agent_id;
                            functionAll.updateObjectCollect(this.form).then((res) => {
                                if (res && res.success) {
                                    this.$router.push({
                                        name: "collectFileOption",
                                        query: {
                                            agent_id: this.$route.query.agent_id,
                                            odc_id: res.data
                                        }
                                    })
                                } else {
                                    this.form.local_time = this.localTime;
                                    this.form.server_date = this.serverTime;
                                }
                            })
                        }
                    });
                } else {
                    this.$refs[formName].validate(valid => {
                        if (valid) {
                            this.form.server_date = this.form.server_date.substring(0, 10).replace(/\-/g, '')
                            this.form.local_time = this.form.local_time.substring(0, 10).replace(/\-/g, '')
                            this.form.agent_id = this.$route.query.agent_id;
                            functionAll.addObjectCollect(this.form).then((res) => {
                                if (res && res.success) {
                                    this.$router.push({
                                        name: "collectFileOption",
                                        query: {
                                            agent_id: this.$route.query.agent_id,
                                            odc_id: res.data
                                        }
                                    })
                                } else {
                                    this.form.local_time = this.localTime;
                                    this.form.server_date = this.serverTime;
                                }
                            })
                        }
                    });
                }

            }

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

        },
        // 前端分页
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
    },
    computed: {
        DifferenceValue() {
            return this.form.e_date - this.form.s_date
        }
    }
}
</script>

<style scoped>
.collectOption .el-row {
    margin-top: 20px;
}

/* form表单 */
.collectOption .partTwo {
    padding: 2% 4% 2% 0;
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
    /* color: #191c83; */
}

.collectOption .netxNUM {
    color: transparent;
}

/* 按钮设置 */
.collectOption .partFourDiv {
    float: right;
}

.collectOption .partFourDiv .el-button {
    margin-bottom: 20px;
}

.collectOption>>>.el-input-group__prepend button.el-button {
    background-color: #F56C6C;
    color: white;
}

.collectOption>>>.el-radio-group {
    display: inline-block;
    vertical-align: inherit;
    line-height: inherit;
}

.collectOption .pageDiv {
    margin-top: 10px;
    height: 30px;
}

.collectOption .page {
    float: right;
}
</style>
