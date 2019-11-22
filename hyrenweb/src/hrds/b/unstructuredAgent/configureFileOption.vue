<template>
<div class="configureFileOption">
    <el-row class="partOne">
        选择文件 > 采集频率设置 > 配置连接属性
    </el-row>

    <el-row class="partTwo">
        <el-button size="mini" type="success" @click="addTableData">增加行</el-button>
        <el-table :data="tableData" border stripe size="mini">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="file_source_path" label="文件源路径" width="116" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="dialogSelectfolder = true;seletFilePath();handleEdit(scope.$index, scope.row)" v-if="showButton">选择文件夹</el-button>
                    <el-input v-model="scope.row.file_source_path" v-if="showInput" disabled></el-input>
                </template>

            </el-table-column>

            <el-table-column prop="is_pdf" label="PDF文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_pdf"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_office" label="office文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_office"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_text" label="文本文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_text"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_video" label="视频文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_video"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_audio" label="音频文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_audio"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_image" label="图片文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_image"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="is_compress" label="压缩文件" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_compress"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column prop="customSuffix" label="自定义后缀名" width="110" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.customSuffix" size="mini"></el-input>
                    <el-tooltip class="item" effect="dark" content="多个后缀名，请用|分隔符隔开" placement="bottom">
                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column prop="is_other" label="其他" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_other"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
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
                <el-button type="primary" style="float:left" size="medium" @click="backSteps"><i class="el-icon-back"></i>上一步</el-button>
                <el-button type="success" style="float:right" size="medium" @click="dialogSelectOk=true"> 完成 <i class="el-icon-check"></i></el-button>
            </div>
        </el-col>
    </el-row>

    <!-- 选择目录弹出框 -->
    <el-dialog title="选择目录" :visible.sync="dialogSelectfolder" width="40%">
        <el-tree :data="data2" show-checkbox :props="defaultProps" @node-click="handleNodeClick" @check-change="handleCheckChange"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="dialogSelectfolder = false" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 添加非结构化采集成功后选择下一步的弹出框 -->
    <el-dialog title="提示信息" :visible.sync="dialogSelectOk" width="30%">
        <p>设置完成！请等待Agent运行...不运行请点击取消按钮</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSelectOk=false" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveOk" size="mini">确定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./unstructuredAgent";
let arrData = [];
let DataAll = {};
let i = "";
export default {
    data() {
        return {
            tableData: [],
            checked: true,
            runWay: [],
            YesNo: [],
            disabled: true,
            showButton: true,
            showInput: false,
            size: "medium",
            defaultProps: {
                children: "children",
                label: "path"
            },
            data2: [],
            dialogSelectfolder: false,
            dialogSelectOk: false,
            formLabelWidth: "150px"
        }
    },
    created() {

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
                    agent_id: this.$route.query.agent_id,
                    agent_name: this.$route.query.agent_name
                }
            })
        },
        // 添加行数据
        addTableData() {
            this.tableData.push({
                file_source_path: "",
                is_pdf: true,
                is_office: true,
                is_text: true,
                is_video: true,
                is_audio: true,
                is_image: true,
                is_other: true,
                is_compress: true,
                customSuffix: ""
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
        seletFilePath(data) {
            let arry = [];
            let path;
            if (typeof (data) != "undefined") {
                path = data.path;
            }
            functionAll
                .selectPath({
                    agent_id: this.$route.query.agent_id,
                    path: path
                })
                .then(res => {
                    if (typeof (data) == 'undefined') {
                        this.data2 = res.data;
                    } else if (typeof (data.path) != "undefined") {
                        data['children'] = res.data;
                        DataAll = data;
                        arrData.push(data)
                        this.data2 = arrData;
                    }

                });
        },
        // 获取目录下一级
        handleNodeClick(data) {
            this.seletFilePath(data);
        },
        //获取选中状态下的数据
        handleCheckChange(data) {
            this.tableData[i].file_source_path = data.path;
        },
        // 取消选择目录并且关闭弹出框
        cancelSelect() {
            this.dialogSelectfolder = false;
        },
        // 点击完成保存数据
        saveOk() {
            let ArrJson = JSON.stringify(this.tableData).replace(/true/g, '1').replace(/false/g, '0');
            functionAll.saveFileSource({
                file_sources_array: ArrJson,
                // fcs_id: this.this.$route.query.fcs_id
            }).then((res) => {
                if (res && res.data) {
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
.configureFileOption {
    padding: 0 2% 0 2%;
}

.configureFileOption .el-row {
    margin-top: 20px;
}

.configureFileOption .partOne {
    font-size: 13px;
    color: #777;
}

/* 表格边框 */
.configureFileOption .partTwo {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
}

.configureFileOption .partTwo .el-table {
    margin-top: 8px;
}

/* 按钮设置 */
.configureFileOption .partThreeDiv {
    float: right;
}

.configureFileOption .partThreeDiv .el-button {
    margin-bottom: 20px;
}

/* 小图标提醒tip */
.configureFileOption .fa {
    position: absolute;
    right: 14%;
    top: 38%;
}
</style>
