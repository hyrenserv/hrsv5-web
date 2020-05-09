<template>
<div class="loheader">
    <el-row class="loheaderRow">
        <!-- <i class="block_icon fa text-warning fa-globe blue"></i> -->
        <span>数据来源表</span>
        <el-button type="primary" class="el1 els" @click="dialogFormVisibleAdd = true;departmentInfo()" size="small">
            <i class="el-icon-circle-plus-outline"></i>添加数据源
        </el-button>
        <el-button type="primary" class="els" @click="dialogFormVisibleImport = true;DataCathInfo()" size="small">
            <i class="fa fa-cloud-upload"></i>导入数据源
        </el-button>
    </el-row>

    <!-- 实现点击导入按钮进行页面数据导入-->
    <!-- 弹出表单 -->
    <el-dialog title="上传文件" :visible.sync="dialogFormVisibleImport" width="42%" :before-close="beforeClose">
        <el-form :model="formImport" ref="formImport">
            <el-form-item label="Agent IP地址" :label-width="formLabelWidth" prop="agent_ip" :rules="filter_rules([{required: true,dataType: 'ip_verification'}])">
                <el-input v-model="formImport.agent_ip" autocomplete="off" style="width:284px" placeholder=" Ip"></el-input>
                <el-tooltip class="item" effect="dark" content="要上传的数据源下Agent的IP地址" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="Agent 端口" :label-width="formLabelWidth" prop="agent_port" :rules="filter_rules([{required: true,dataType: 'port_verification'}])">
                <el-input v-model="formImport.agent_port" autocomplete="off" style="width:284px" placeholder="Port"></el-input>
                <el-tooltip class="item" effect="dark" content="要上传的数据源下Agent的端口" placement="right">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="数据采集用户" :label-width="formLabelWidth" prop="user_id" :rules="rule.selected">
                <el-select v-model="formImport.user_id" placeholder="请选择" style="width:284px">
                    <el-option v-for="item in options" :key="item.dep_id" :label="item.user_name" :value="item.user_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传要导入的数据源" :label-width="formLabelWidth">
                <el-upload class="upload-demo" ref="upload" accept=".hrds" :fileList="fileList" action="" :auto-upload="false" :on-change="handleChange">
                    <el-button size="small" type="primary">选择上传文件</el-button>
                </el-upload>
                <el-tooltip class="item" effect="dark" content="在本系统中要上传的数据源，后缀名为hrds的加密文件" placement="right">
                    <i class="fa fa-question-circle " aria-hidden="true"></i>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleImport" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="upload('formImport')" size="mini">上传</el-button>
        </div>
    </el-dialog>

    <!-- 实现点击添加按钮进行页面数添加-->
    <!-- 添加的弹出表单 -->
    <el-dialog title="添加数据源" :visible.sync="dialogFormVisibleAdd" width="40%" :before-close="beforeClose">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label=" 数据源编号" :label-width="formLabelWidth" prop="datasource_number" :rules="filter_rules([{required: true,dataType:'noLengthVaild'}])">
                <el-input v-model="formAdd.datasource_number" autocomplete="off" placeholder="数据源编号" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 数据源名称" :label-width="formLabelWidth" prop="datasource_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.datasource_name" autocomplete="off" placeholder="数据源名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="depIds" :rules="rule.selected ">
                <el-select v-model="formAdd.depIds" filterable placeholder="请选择（可多选）" multiple style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.dep_name" :value="item.dep_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" 数据源详细描述" :label-width="formLabelWidth" prop="source_remark">
                <el-input type="textarea" v-model="formAdd.source_remark" autocomplete="off" placeholder="数据源详细描述" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./datasource";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            options: [],
            fileList: [],
            dialogFormVisibleImport: false,
            dialogFormVisibleAdd: false,
            rule: validator.default,
            // 添加数据与导入源字段
            formAdd: {
                datasource_number: "",
                datasource_name: "",
                source_remark: "",
                depIds: [],
            },
            formImport: {
                agent_ip: "",
                agent_port: "",
                user_id: ""
            },
            importFileUrl: "",
            filesr: "",
            formLabelWidth: "150px"
        };
    },
    methods: {
        // 点击添加按钮获取部门信息
        departmentInfo() {
            functionAll.searchDataSourceOrDepartment({}).then(res => {
                this.options = res.data;
            });
        },
        // 添加数据来源表一条数据
        add(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 调用添加方法
                    this.formAdd["dep_id"] = this.formAdd.depIds;
                    functionAll.saveDataSource(this.formAdd).then(response => {
                        if (response && response.success) {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.$emit("addEvent");
                            // 隐藏对话框
                            this.dialogFormVisibleAdd = false;
                            // 表单清空
                            this.formAdd = {};
                        } else {

                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 点击导入按钮获取数据采集信息
        DataCathInfo() {
            functionAll.searchDataCollectUser().then(res => {
                if (res && res.success) {
                    this.options = res.data;
                }
            });
        },
        // 获取上传的文件详情
        handleChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]
            }
        },
        // 点击上传数据
        upload(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let param = new FormData() // 创建form对象
                    param.append('file', this.fileList[0].raw);
                    param.append('agent_ip', this.formImport.agent_ip);
                    param.append('agent_port', this.formImport.agent_port);
                    param.append('user_id', this.formImport.user_id);
                    functionAll.uploadFile(param).then(res => {
                        this.$emit("addEvent");
                        this.dialogFormVisibleImport = false;
                        this.formImport = {};
                    });
                }
            })
        },
        // 点击导入弹出框的取消按钮
        cancleImport() {
            this.formImport = {};
            this.dialogFormVisibleImport = false;
            this.$refs.formImport.resetFields();
        },
        // 点击添加弹出框的取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
            this.$refs.formAdd.resetFields();
        },
        // 关闭弹框之前
        beforeClose() {
            this.formAdd = {};
            this.dialogFormVisibleAdd = false;
            this.formImport = {};
            this.dialogFormVisibleImport = false;
            this.$refs.formAdd.resetFields();
        }
    }
};
</script>

<style scoped>
.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* 字体小图标样式设置 */
.fa-globe {
    color: #2196f3;
    margin-right: 5px;
}

.fa-cubes {
    margin-right: 5px;
}

.fa-cloud-upload {
    margin-right: 5px;
}

.fa-question-circle {
    margin-left: 40px;
    margin-right: 25px;
}

/* button样式设置 */
.els {
    float: right;
}

.el1 {
    margin-left: 10px;
}

.item {
    float: right;
}

.upload-demo {
    float: left;
}

.fa-question-circle {
    margin-top: 12px;
}

.loheaderRow {
    height: 34px;
    line-height: 34px;
    margin-bottom: 10px;
}

/* 上传选择文件 */
.loheader>>>.el-list-enter-active,
.loheader>>>.el-list-leave-active {
    transition: none;
}
</style>
