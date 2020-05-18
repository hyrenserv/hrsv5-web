<template>
<div class="agentList">
    <!-- 数据来源标题 -->
    <el-row class="agentListrow">
        <!-- <i class="fa text-warning fa-desktop blue"></i> -->
        <span>数据源Agent列表</span>
        <router-link to="/datasourceManagement">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <div class="lines"></div>
    <!-- 列表内容 -->
    <div class="listContent">
        <div class="listPic" @click="tapDifferentType(1)">
            <img src="@/assets/images/datasource.png" alt="数据图片" />
        </div>
        <h3>数据库 Agent</h3>
        <p>数据库 Agent 是用于采集结构化数据（RDBMS Etc）的Agent，只需要一个Agent就可以采集同一数据源中的不同源数据</p>
    </div>

    <div class="listContent">
        <div class="listPic" @click="tapDifferentType(4)">
            <img src="@/assets/images/a1.png" alt="数据图片" />
        </div>
        <h3>数据库文件 Agent</h3>
        <p>数据文件 Agent 是用于对各种关系型存储的数据文件进行数据采集的组件，例如从RDBMS数据库中卸载的CSV或各种自定义格式的数据文件，以EXCEL存储的行列关系的数据文件</p>
    </div>

    <div class="listContent">
        <div class="listPic" @click="tapDifferentType(5)">
            <img src="@/assets/images/object.png" alt="数据图片" />
        </div>
        <h3>半结构化 Agent</h3>
        <p>半结构化 Agent 是用于采集各种半结构化数据的组件，例如XML、JSON等储存在文件系统之上的数据文件。</p>
    </div>

    <div class="listContent">
        <div class="listPic" @click="tapDifferentType(2)">
            <img src="@/assets/images/filesource.png" alt="数据图片" />
        </div>
        <h3>非结构化 Agent</h3>
        <p>非结构化 Agent 是用于采集各种半结构化或非结构化数据的组件，例如Word、PDF、图片文件等存储在文件系统之上的数据文件。</p>
    </div>

    <div class="listContent listContentlast">
        <div class="listPic" @click="tapDifferentType(3)">
            <img src="@/assets/images/ftp.png" alt="数据图片" />
        </div>
        <h3>FTP Agent</h3>
        <p>FTP Agent 是用于将系统之上的数据文件使用SFTP的方式将数据拉取到指定的系统盘之上的组件，多用于数据分发等。</p>
    </div>

    <!-- 数据类型标题 -->
    <h4>
        当前所属数据源为：
        <strong>{{this.datasource_name}}</strong>
    </h4>
    <!-- 数据表格标题 -->
    <div class="tableList">
        <el-row>
            <!-- <i class="fa text-warning fa-database blue"></i> -->
            <span v-if="sourceAgent">数据源Agent</span>
            <span v-if="dataFile">数据文件 Agent</span>
            <span v-if="semiStructure">半结构化 Agent</span>
            <span v-if="nonStructural">非结构化 Agent</span>
            <span v-if="ftpAgent">FTP Agent</span>
            <!-- 添加数据表单弹出框  -->
            <el-button type="success" class="addAgent" size="small" v-if="sourceAgent" @click="dialogFormVisible = true;DataCathInfo()">新增数据库Agent</el-button>
            <el-button type="success" class="addAgent" size="small" v-if="dataFile" @click="dialogFormVisible = true;DataCathInfo()">新增DBAgent</el-button>
            <el-button type="success" class="addAgent" size="small" v-if="semiStructure" @click="dialogFormVisible = true;DataCathInfo()">新增半结构化 Agent</el-button>
            <el-button type="success" class="addAgent" size="small" v-if="nonStructural" @click="dialogFormVisible = true;DataCathInfo()">新增非结构化 Agent</el-button>
            <el-button type="success" class="addAgent" size="small" v-if="ftpAgent" @click="dialogFormVisible = true;DataCathInfo()">新增FTP Agent采集数据</el-button>
        </el-row>
        <!-- 表格内容 -->
        <el-table stripe :data="tableData" border>
            <el-table-column prop="agent_name" label="Agent名称" align="center"></el-table-column>
            <el-table-column prop="agent_ip" label="Agent所在服务器IP" align="center"></el-table-column>
            <el-table-column prop="agent_port" label="Agent 连接端口" align="center"></el-table-column>
            <el-table-column prop="user_name" label="数据采集用户" align="center"></el-table-column>
            <el-table-column label="操作" width="190" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.row.agent_status =='已连接'" type="success" @click="dialogFormVisibleview = true;handleEdit(scope.$index, scope.row);DataCathInfo()">查看</el-button>
                    <el-button size="mini" v-else type="primary" @click="dialogFormVisibleview = true;handleEdit(scope.$index, scope.row);DataCathInfo()">编辑</el-button>
                    <el-button size="mini" type="danger" @click="delteThisData();handleEdit(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="lines"></div>
    </div>
    <!-- 点击新增数据库按钮弹出框 -->
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" width="40%" :before-close="beforeClose">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label=" Agent名称" :label-width="formLabelWidth" prop="agent_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.agent_name" autocomplete="off" placeholder="Agent名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" Agent所在服务器ip" :label-width="formLabelWidth" prop="agent_ip" :rules="filter_rules([{required: true,dataType: 'ip_verification'}])">
                <el-input v-model="formAdd.agent_ip" autocomplete="off" placeholder="例如 127.9.08.7" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" Agent 连接端口" :label-width="formLabelWidth" prop="agent_port" :rules="filter_rules([{required: true,dataType: 'port_verification'}])">
                <el-input v-model="formAdd.agent_port" autocomplete="off" placeholder="端口范围1204-65535" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 数据采集用户" :label-width="formLabelWidth" prop="user_id" :rules="rule.selected">
                <el-select v-model="formAdd.user_id" filterable placeholder="请选择" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.user_name" :value="item.user_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd('0')" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 点击编辑按钮编辑信息弹出框 -->
    <el-dialog title="编辑 Agent" :visible.sync="dialogFormVisibleview" width="40%" :before-close="beforeCloseview">
        <el-form :model="form" ref="form">
            <el-form-item label=" Agent名称" :label-width="formLabelWidth" prop="agent_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="form.agent_name" :disabled="disabled" autocomplete="off" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" Agent所在服务器ip" :label-width="formLabelWidth" prop="agent_ip" :rules="filter_rules([{required: true,dataType: 'ip_verification'}])">
                <el-input v-model="form.agent_ip" :disabled="disabled" autocomplete="off" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" Agent 连接端口" :label-width="formLabelWidth" prop="agent_port" :rules="filter_rules([{required: true,dataType: 'port_verification'}])">
                <el-input v-model="form.agent_port" :disabled="disabled" autocomplete="off" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 数据采集用户" :label-width="formLabelWidth" prop="user_id" :rules="rule.selected">
                <el-select v-model="form.user_id" :disabled="disabled" filterable placeholder="请选择" style="width:284px">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.user_name" :value="item.user_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd('1')" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="AgentEdit('form')" :disabled="disabled" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./datasource";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
let agentTupe;
export default {
    data() {
        return {
            dialogFormVisible: false,
            dialogFormVisibleview: false,
            options: [],
            tableData: [],
            getAgentData: {},
            source_id: "",
            agentId: "",
            agent_type: "",
            dataAll: {},
            datasource_name: "",
            dialogName: "",
            sourceAgent: true,
            dataFile: false,
            semiStructure: false,
            nonStructural: false,
            ftpAgent: false,
            disabled: false,
            formAdd: {
                agent_name: "",
                agent_ip: "",
                agent_port: "",

            },
            form: {
                agent_name: "",
                agent_ip: "",
                agent_port: "",
            },
            rule: validator.default,
            formLabelWidth: "150px",
            result: []
        };
    },
    created() {
        this.getCategoryItems();
        this.searchDatasourceAndAgentInfos();
    },
    methods: {
        // 获取页面初始值
        searchDatasourceAndAgentInfos() {
            // 发送请求获取数据
            functionAll.searchDatasourceAndAgentInfo({
                source_id: this.$route.query.source_id
            }).then(res => {
                // 传参
                this.datasource_name = res.data.datasource_name
                this.tableData = res.data.sjkAgent;
                this.showViewOrHandles(this.result, this.tableData);
                this.dialogName = "添加数据库 Agent";
                this.agent_type = 1;
                agentTupe = 1;
                this.dataAll = res.data;
            });
        },
        // 获取代码项信息
        getCategoryItems() {
            functionAll.getCategoryItems({
                category: 'AgentStatus'
            }).then(res => {
                this.result = res.data;
            })
        },
        // 获取agent数据内容方法
        getAgentAllData(e) {
            // 发送请求获取数据
            functionAll.searchDatasourceAndAgentInfo({
                source_id: this.$route.query.source_id,
                datasource_name: this.$route.query.datasource_name
            }).then(res => {
                // 传参
                this.dataAll = res.data;
                if (e == 1) {
                    this.tableData = this.dataAll.sjkAgent;
                } else if (e == 2) {
                    this.tableData = this.dataAll.fileSystemAgent;
                } else if (e == 3) {
                    this.tableData = this.dataAll.ftpAgent;
                } else if (e == 4) {
                    this.tableData = this.dataAll.dbFileAgent;
                } else if (e == 5) {
                    this.tableData = this.dataAll.dxAgent;
                }
                this.showViewOrHandles(this.result, this.tableData);
            });
        },
        // 点击查看获取数据采集信息
        DataCathInfo(index) {
            functionAll.searchDataCollectUser().then(res => {
                if (res.code == 200) {
                    this.options = res.data;
                }
            });
        },
        // 点击编辑获取当前数据赋给表单
        handleEdit(index, row) {
            this.form = Object.assign({}, row);
            this.agentId = row.agent_id;
            this.agent_type = agentTupe;
            this.source_id = row.source_id;
        },
        // 新增数据库Agent
        add(formName) {
            // 调用添加方法
            this.formAdd["source_id"] = this.$route.query.source_id;
            this.formAdd["agent_type"] = this.agent_type;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.saveAgent(this.formAdd).then(response => {
                        if (response && response.success) {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            // 隐藏对话框
                            this.dialogFormVisible = false;
                            this.getAgentAllData(this.agent_type);
                            this.$refs.formAdd.resetFields();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        // 点击取消按钮
        cancleAdd(val) {
            if (val == "0") {
                // 隐藏对话框
                this.dialogFormVisible = false;
                // 表单清空
                this.$refs.formAdd.resetFields();
            } else if (val == "1") {
                this.dialogFormVisibleview = false;
                this.$refs.form.resetFields();
            }
        },
        // 关闭弹出框之前触发事件
        beforeCloseview() {
            this.dialogFormVisibleview = false;
            this.$refs.form.resetFields();
        },
        beforeClose() {
            this.dialogFormVisible = false;
            this.$refs.formAdd.resetFields();
        },
        showViewOrHandles(result, tableData) {
            result.forEach(item => {
                let name;
                tableData.forEach(val => {
                    if (item.code == val.agent_status) {
                        name = item.value;
                        val.agent_status = item.value;
                        if (name == "已连接") {
                            this.disabled = true;
                        } else {
                            this.disabled = false;
                        }
                    }
                })
            })
        },
        // 点击不同的数据类型获取不同的数据
        tapDifferentType(e) {
            switch (e) {
                case 1:
                    this.agent_type = e;
                    agentTupe = e;
                    // 给tableData渲染对应的数组，先看上面能不能拿到；
                    this.dialogName = "添加数据库 Agent";
                    this.tableData = this.dataAll.sjkAgent;
                    this.showViewOrHandles(this.result, this.tableData);
                    this.sourceAgent = true;
                    this.nonStructural = false;
                    this.ftpAgent = false;
                    this.dataFile = false;
                    this.semiStructure = false;
                    break;
                case 2:
                    this.dialogName = "添加非结构化 Agent";
                    agentTupe = e;
                    this.agent_type = e;
                    this.tableData = this.dataAll.fileSystemAgent;
                    this.showViewOrHandles(this.result, this.tableData);
                    this.nonStructural = true;
                    this.ftpAgent = false;
                    this.dataFile = false;
                    this.semiStructure = false;
                    this.sourceAgent = false;
                    break;
                case 3:
                    this.dialogName = "添加ftp Agent";
                    agentTupe = e;
                    this.agent_type = e;
                    this.tableData = this.dataAll.ftpAgent;
                    this.showViewOrHandles(this.result, this.tableData);
                    this.ftpAgent = true;
                    this.dataFile = false;
                    this.semiStructure = false;
                    this.sourceAgent = false;
                    this.nonStructural = false;
                    break;
                case 4:
                    this.dialogName = "添加数据库文件 Agent";
                    agentTupe = e;
                    this.agent_type = e;
                    this.tableData = this.dataAll.dbFileAgent;
                    this.showViewOrHandles(this.result, this.tableData);
                    this.dataFile = true;
                    this.semiStructure = false;
                    this.sourceAgent = false;
                    this.nonStructural = false;
                    this.ftpAgent = false;
                    break;
                case 5:
                    this.dialogName = "添加半结构化 Agent";
                    agentTupe = e;
                    this.agent_type = e;
                    this.tableData = this.dataAll.dxAgent;
                    this.showViewOrHandles(this.result, this.tableData);
                    this.semiStructure = true;
                    this.sourceAgent = false;
                    this.nonStructural = false;
                    this.ftpAgent = false;
                    this.dataFile = false;
                    break;
            }

        },
        // 点击编辑的保存按钮更新数据
        AgentEdit(formName) {
            this.form["source_id"] = this.$route.query.source_id;
            this.form["agent_id"] = this.agentId;
            this.form["agent_type"] = agentTupe;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.updateAgent(this.form).then(response => {
                        if (response && response.success) {
                            this.$message({
                                type: "success",
                                message: "更新成功!"
                            });
                            // 重新渲染页面
                            this.getAgentAllData(agentTupe);
                            // 隐藏对话框
                            this.dialogFormVisibleview = false;

                        }
                    });
                } else {
                    return false;
                }
            });

        },
        // 点击删除数据
        delteThisData() {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteAgent({
                        agent_id: this.agentId,
                        agent_type: agentTupe,
                        source_id: this.$route.query.source_id
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // 隐藏对话框
                            this.dialogFormVisibleDelte = false;
                            // 表单清空
                            this.form = {};
                            // // 重新渲染页面
                            this.getAgentAllData(agentTupe);
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
};
</script>

<style scoped>
.agentList {
    margin-left: 8px;
    width: 100%;
}

/* 图标字体设置 */
.el-row {
    width: 100%;
    height: 64px;
    line-height: 64px;
}

.agentListrow {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* 字体小图标样式设置 */
.fa-desktop {
    color: #2196f3;
    margin-right: 5px;
}

.fa-database {
    color: #2196f3;
    margin-right: 5px;
}

.fa-home {
    margin-right: 5px;
}

/* button样式设置 */
.goIndex {
    float: right;
    margin-top: 3px;
    margin-right: 14px;
}

.addAgent {
    background: #5cb85c;
    float: right;
    margin-top: 18px;
    margin-right: 14px;
}

/* 下划线样式 */
.lines {
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
    margin-top: 8px;
}

/* 列表内容 */
.listContent {
    width: 16%;
    padding: 10px 10px 0 10px;
    border: 1px solid #cccccc;
    height: 310px;
    overflow: auto;
    margin-bottom: 20px;
    margin-right: 2%;
    float: left;
    border-radius: 4px;
}

.listContentlast {
    margin-right: 0%;
}

.listPic {
    width: 62%;
    border: 1px solid #cccccc;
    height: 38%;
    margin-left: 18%;
    padding: 1px 5px;
    margin-bottom: 22px;
}

.listPic:hover {
    cursor: pointer;
    background: #e6e6e6;
}

.listPic img {
    width: 100%;
    height: 100%;
}

.listContent h3 {
    text-align: center;
    font-size: 19px;
    font-weight: normal;
    line-height: 30px;
    margin-bottom: 10px;
}

.listContent p {
    font-size: 13px;
    line-height: 17px;
}

/* 数据类型标题 */
h4 {
    height: 39px;
    line-height: 39px;
    clear: left;
    font-size: 18px;
    font-weight: normal;
}

h4 strong {
    font-size: 18px;
    color: red;
}

/* 表格数据 */
.tableList {
    width: 98%;
    min-height: 132px;
    border: 1px solid #cccccc;
    padding: 0 1%;
}
</style>
