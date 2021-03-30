<template>
<div class="configureFileOption">
    <el-row class="partOne">
        <el-col :span="24">
            <Step :active="active"></Step>
        </el-col>
    </el-row>

    <el-row class="partTwo">
        <el-button size="mini" type="success" @click="addTableData">增加行</el-button>
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="file_source_path" label="选择文件源路径" width="126" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="dialogSelectfolder = true;seletFilePath();handleEdit(scope.$index, scope.row)" v-if="showButton">选择文件夹</el-button>
                    <el-input v-model="scope.row.file_source_path" v-if="showInput"></el-input>
                </template>
            </el-table-column>

            <el-table-column prop="file_source_path" label="文件源路径" width="116" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.file_source_path" size="mini" placeholder="选择或填写"></el-input>
                </template>
            </el-table-column>

            <el-table-column prop="is_pdf" label="PDF文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_pdf" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_office" width="90" label="office文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_office" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_text" label="文本文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_text" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_video" label="视频文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_video" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_audio" label="音频文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_audio" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_image" label="图片文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_image" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_compress" label="压缩文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_compress" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="custom_suffix" label="自定义后缀名" width="110" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.custom_suffix" size="mini"></el-input>
                    <el-tooltip class="item" effect="dark" content="多个后缀名，请用|分隔符隔开" placement="bottom">
                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column prop="is_other" label="其他" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_other" true-label="1" false-label="0"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
                </template>
            </el-table-column>

            <el-table-column v-if="hiddenSuccess">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.fcs_id" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column v-if="hiddenSuccess">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.agent_id" size="mini"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </el-row>

    <el-row class="partThree">
        <el-col :span="12">
            <el-button size="medium" type="primary" @click="goBackQuit"> 返回</el-button>
        </el-col>

        <el-col :span="12">
            <div class="partThreeDiv">
                <el-button type="primary" style="float:left" size="medium" @click="backSteps">上一步</el-button>
                <el-button type="success" style="float:left" size="medium" @click="executeDialogOk">立即执行</el-button>
                <el-button type="primary" style="float:right" size="medium" @click="checkDataOk"> 完成</el-button>
            </div>
        </el-col>
    </el-row>

    <!-- 选择目录弹出框 -->
    <el-dialog title="选择目录" :visible.sync="dialogSelectfolder">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择目录</span>
        </div>
        <div class="mytree"  hight='200'>
            <el-tree ref='tree' :data="data2" :check-strictly="true" show-checkbox node-key="path" lazy :load="loadNode" :props="defaultProps" accordion :indent='0' @check-change="handleCheckChange">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span :title="data.path">{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="dialogSelectfolder = false;" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 添加非结构化采集任务完成后,选择完成的弹出框 -->
    <el-dialog title="提示信息" :visible.sync="dialogSelectOk" width="30%">
        <p>保存设置完成！请等待Agent运行...不运行请点击取消按钮</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSelectOk=false" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveOk" size="mini">确定</el-button>
        </div>
    </el-dialog>

    <!-- 添加非结构化采集任务完成后,立即执行的弹出框 -->
    <el-dialog title="提示信息" :visible.sync="executeDialog" width="30%">
        <p>立即执行设置完成！请等待Agent运行...不运行请点击取消按钮</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="executeDialog=false" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="executeImmediately" size="mini">立即执行</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./unstructuredAgent";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import Step from "./step";
let arrData = [];
let DataAll = {};
let i = "";
export default {
    components: {
        Step,
    },
    data() {
        return {
            active: 2,
            tableData: [],
            checked: true,
            runWay: [],
            YesNo: [],
            disabled: true,
            showButton: true,
            showInput: false,
            hiddenSuccess: false,
            size: "medium",
            defaultProps: {
                children: "children",
                label: "path"
            },
            data2: [],
            dialogSelectfolder: false,
            dialogSelectOk: false,
            executeDialog: false,
            formLabelWidth: "150px"
        }
    },
    created() {
        this.searchFileSource();
    },
    methods: {
        // 返回采集主页面
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        //返回上一步
        backSteps() {
            this.$router.push({
                name: "configureStartMode",
                query: {
                    id: this.$route.query.fcs_id,
                    agent_id: this.$route.query.agent_id,
                    rowName: this.$route.query.agent_name,
                }
            })
        },
        // 编辑时获取回显数据
        searchFileSource() {
            functionAll.searchFileSource({
                fcs_id: this.$route.query.fcs_id
            }).then((res) => {
                if (res && res.success) {
                    res.data.forEach((item) => {
                        delete item["agent_id"];
                        delete item["fcs_id"];
                        delete item["file_source_id"]
                    })
                    let ArrJson = JSON.stringify(res.data);
                    let jsonArr = JSON.parse(ArrJson)
                    this.tableData = jsonArr
                }
            })
        },
        // 添加行数据
        addTableData() {
            this.tableData.push({
                file_source_path: '',
                is_pdf: '1',
                is_office: '1',
                is_text: '1',
                is_video: '1',
                is_audio: '1',
                is_image: '1',
                is_other: '1',
                is_compress: '1',
                custom_suffix: "",
                fcs_id: this.$route.query.fcs_id,
                agent_id: this.$route.query.agent_id
            })
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            i = index;
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            this.tableData.splice(index, 1)
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
            this.tableData[i].file_source_path = data.path;
        },
        // 取消选择目录并且关闭弹出框
        cancelSelect() {
            // this.tableData[i].file_source_path = '';
            this.dialogSelectfolder = false;
        },
        // 点击立即执行,检查必填项
        executeDialogOk() {
            let is_true = true;
            this.tableData.forEach(data => {
                if (data.file_source_path === "" || 'undefined' === typeof data.file_source_path) {
                    this.$Msg.customizTitle('文件源路径为必填项', 'warning')
                    is_true = false;
                }
            })
            this.executeDialog = is_true;
        },
        // 点击完成,检查必填项
        checkDataOk(formName) {
            let is_true = true;
            this.tableData.forEach(data => {
                if (data.file_source_path === "" || 'undefined' === typeof data.file_source_path) {
                    this.$Msg.customizTitle('文件源路径为必填项', 'warning')
                    is_true = false;
                }
            })
            this.dialogSelectOk = is_true;
        },
        // 点击立即执行
        executeImmediately() {
            let agent_id = this.$route.query.agent_id;
            let fcs_id = this.$route.query.fcs_id;
            this.tableData.forEach((item) => {
                item["agent_id"] = agent_id;
                item["fcs_id"] = fcs_id;
            })
            let ArrJson = JSON.stringify(this.tableData);
            //先保存成后再执行任务
            functionAll.saveFileSource({ file_sources_array: ArrJson }).then((res) => {
                if (res && res.success) {
                    functionAll.executeJob({ 'fcs_id': fcs_id, 'execute_type': 'execute_immediately' }).then((res) => {
                        if (res.success) {
                            this.$Msg.customizTitle('立即运行成功!', 'success')
                            this.executeDialog = false;
                            this.$router.push({
                                name: "agentList"
                            })
                        } else {
                            this.executeDialog = false;
                        }
                    })
                }
            })
        },
        // 点击完成保存数据
        saveOk() {
            this.tableData.forEach((item) => {
                item["agent_id"] = this.$route.query.agent_id;
                item["fcs_id"] = this.$route.query.fcs_id;
            })
            let ArrJson = JSON.stringify(this.tableData);
            functionAll.saveFileSource({
                file_sources_array: ArrJson
            }).then((res) => {
                if (res && res.success) {
                    this.$Msg.customizTitle('添加成功!', 'success')
                    this.dialogSelectOk = false;
                    this.$router.push({
                        name: "agentList"
                    })
                }
            })
        },
    }

}
</script>

<style scoped>
.configureFileOption .el-row {
    margin-top: 20px;
}

.configureFileOption .partOne {
    font-size: 13px;
    color: #777;
}

/* 表格边框 */
.configureFileOption .partTwo {
    padding: 1%;
    width: 100%;
    border: 1px solid #e6e6e6;
}

.configureFileOption .partTwo .el-table {
    margin-top: 2px;
}

/* 按钮设置 */
.configureFileOption .partThreeDiv {
    float: right;
}

.configureFileOption .partThreeDiv .el-button {
    margin-bottom: 20px;
}

.configureFileOption .netxNUM {
    color: transparent;
}

/* 小图标提醒tip */
.configureFileOption .fa {
    position: absolute;
    right: 14%;
    top: 38%;
}

.configureFileOption .ruleFormItem {
    margin: 0;
}
</style>
