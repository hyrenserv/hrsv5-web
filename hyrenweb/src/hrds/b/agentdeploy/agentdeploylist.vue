<template>
<div class="agentdeploy">
     <el-row class='topTitle'>
        <span class='el-icon-location'>部署Agent</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-table :data="sourceData.filter(data => !search || data.datasource_name.toLowerCase().includes(search.toLowerCase()))"  max-height="50%" style="width: 100%">
        <el-table-column sortable prop="datasource_name" label="数据源"></el-table-column>
        <el-table-column label="数据库 Agent">
            <template slot-scope="scope">
                <el-button v-if="scope.row.dbflag!=0" size="mini" type="primary" @click="deployAgentList(agentTypeData.ShuJuKu, scope.row)">部署</el-button>
            </template>
        </el-table-column>
        <el-table-column label="数据文件 Agent">
            <template slot-scope="scope">
                <el-button v-if="scope.row.dfflag!=0" size="mini" type="primary" @click="deployAgentList(agentTypeData.DBWenJian, scope.row)">部署</el-button>
            </template>
        </el-table-column>
        <el-table-column label="非结构化 Agent">
            <template slot-scope="scope">
                <el-button v-if="scope.row.nonstructflag!=0" size="mini" type="primary" @click="deployAgentList(agentTypeData.WenJianXiTong, scope.row)">部署</el-button>
            </template>
        </el-table-column>
        <el-table-column label="半结构化 Agent">
            <template slot-scope="scope">
                <el-button v-if="scope.row.halfstructflag!=0" size="mini" type="primary" @click="deployAgentList(agentTypeData.DuiXiang, scope.row)">部署</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Ftp Agent">
            <template slot-scope="scope">
                <el-button v-if="scope.row.ftpflag!=0" size="mini" type="primary" @click="deployAgentList(agentTypeData.FTP, scope.row)">部署</el-button>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot-scope="scope" slot="header">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
        </el-table-column>
    </el-table>
    <!--Agent信息列表模态框-->
    <el-dialog :title="datasource_name" :visible.sync="outerVisible" width="75%">
        <el-table :data="agentDataList.filter(data => !agentSearch || data.agent_name.toLowerCase().includes(agentSearch.toLowerCase()))" :default-sort="{prop: 'agent_name', order: 'descending'}">
            <el-table-column sortable property="agent_name" label="Agent名称"></el-table-column>
            <el-table-column sortable property="agent_ip" label="Agent IP"></el-table-column>
            <el-table-column sortable property="agent_port" label="Agent 端口"></el-table-column>
            <el-table-column label="连接状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.agent_status === '1' ? 'success' : 'danger'" disable-transitions>{{scope.row.connection_status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column property="agent_zh_name" label="采集类型"></el-table-column>
            <el-table-column label="操作">
                <template fixed slot-scope="scope">
                    <el-button type="success" size="mini" @click="dialogFormVisible = true;handleEdit(scope.row)"><i class="el-icon-download">配置及部署</i></el-button>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope" slot="header">
                    <el-input v-model="agentSearch" size="mini" placeholder="输入关键字搜索" />
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="outerVisible = false">取 消</el-button>
        </div>
    </el-dialog>

    <!--部署Agent模态框 agentDeploy-->
    <el-dialog :title="deployAgentName" :visible.sync="dialogFormVisible" width="75%">
        <el-form :model="agentDeploy" status-icon ref="agentDeploy" label-width="120px">
            <input type="hidden" v-model="agentDeploy.down_id" value="">
            <!-- <input type="hidden" name="oldAgentDir" value="{{agentDeploy.save_dir}}">
            <input type="hidden" name="oldLogPath" value="{{agentDeploy.log_dir}}"> -->
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Agent名称">
                        <el-input v-model="agentDeploy.agent_name" placeholder="Agent名称" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Agent IP">
                        <el-input v-model="agentDeploy.agent_ip" placeholder="Agent IP" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Agent端口">
                        <el-input v-model="agentDeploy.agent_port" placeholder="Agent端口" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="用户名" prop="user_name" :rules="rule.default">
                        <el-input v-model="agentDeploy.user_name" placeholder="用户名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="密码" prop="passwd" :rules="rule.default">
                        <el-input v-model="agentDeploy.passwd" show-password placeholder="密码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否启动">
                        <el-switch :active-value="isflag.Shi" :inactive-value="isflag.Fou" v-model="deploy" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="context" prop="agent_context" :rules="filter_rules([{required:true,dataType:'webContext'}])">
                        <el-input v-model="agentDeploy.agent_context" placeholder="agent的context"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="访问路径" prop="agent_pattern" :rules="filter_rules([{required:true,dataType:'agent_pattern'}])">
                        <el-input v-model="agentDeploy.agent_pattern" placeholder="agent的访问路径"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="存放目录">
                        <el-switch :active-value="isflag.Shi" :inactive-value="isflag.Fou" v-model="customPath" active-color="#13ce66" inactive-color="#ff4949" active-text="自定义" inactive-text="系统默认">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <template v-if="customPath==isflag.Shi">
                    <el-col :span="8">
                        <el-form-item label="安装目录" prop="save_dir" :rules="rule.default">
                            <el-input v-model="agentDeploy.save_dir" hide-required-asterisk="true" placeholder="Agent安装目录"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="日志文件" prop="log_dir" :rules="rule.default">
                            <el-input v-model="agentDeploy.log_dir" hide-required-asterisk="true" placeholder="日志文件"></el-input>
                        </el-form-item>
                    </el-col>
                </template>
                <el-col :span="16">
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="agentDeploy.remark" placeholder="描述"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" size="mini" :loading="loading" @click="saveAgentDeploy('agentDeploy')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as agentDeployFun from './agentdeploy'
import * as validator from '@/utils/js/validator'
export default {
    data() {
        return {
            sourceData: [],
            agentDataList: [], //Agent信息列表
            agentTypeData: {}, //Agent类型代码项
            isflag: {}, // 是否的代码项
            agentDeploy: {

            }, //部署Agent信息
            oldAgentDir: '',
            oldLogPath: '',
            rule: validator.default,
            search: "",
            agentSearch: "",
            datasource_name: '',
            customPath: '0',
            deploy: '',
            deployAgentName: '',
            outerVisible: false,
            dialogFormVisible: false,
            requestData: {
                agent_type: '',
                source_id: ''
            },
            loading : false
        }
    },
    mounted() {
        agentDeployFun.getCollectData().then((res) => {
            this.sourceData = res.data;
        })

        /** 获取Agent类型的代码项 */
        this.$Code.getCodeItems({
            'category': 'AgentType'
        }).then(res => {
            this.agentTypeData = res.data;
        })
        /** 获取是否类型的代码项 */
        this.$Code.getCodeItems({
            'category': 'IsFlag'
        }).then(res => {
            this.isflag = res.data;
        })

    },
    methods: {

        /**
         * 当前数据源需要部署的Agent列表信息
         * @param agent_type Agent类型
         * @row 当前行的数据
         */
        deployAgentList(agent_type, row) {
            this.agentSearch = '';
            this.datasource_name = '数据源名称 : ' + row.datasource_name;
            row['agent_type'] = agent_type;
            agentDeployFun.deployAgentList(row).then(res => {
                this.agentDataList = res.data;
                this.outerVisible = true;
            })

        },
        handleEdit(row) {
            this.deployAgentName = 'Agent部署 : ' + row.agent_name;
            this.customPath = this.isflag.Fou;
            agentDeployFun.getAgentDownInfo(row).then(res => {
                this.agentDeploy = res.data;
                if (typeof this.agentDeploy.down_id == 'undefined') {
                    this.agentDeploy.agent_type = row.agent_type;
                    this.agentDeploy.agent_id = row.agent_id;
                    this.agentDeploy.user_id = row.user_id;
                    this.agentDeploy.agent_name = row.agent_name;
                    this.agentDeploy.agent_ip = row.agent_ip;
                    this.agentDeploy.agent_port = row.agent_port;
                    this.deploy = this.isflag.Fou;
                    this.oldAgentDir = row.save_dir;
                    this.oldLogPath = row.log_dir;
                } else {
                    /* 这里将路径和系统参数中的路径做个对比,如果相同则将存放目录切换到系统默认 */
                    if (this.agentDeploy.save_dir !== this.agentDeploy.agentDeployPath) {
                        this.customPath = this.isflag.Shi;
                    } else {
                        this.customPath = this.isflag.Fou;
                    }
                    this.deploy = this.agentDeploy.deploy;
                    this.oldAgentDir = this.agentDeploy.save_dir;
                    this.oldLogPath = this.agentDeploy.log_dir;
                }
                this.$refs['agentDeploy'].resetFields();
            })
        },
        saveAgentDeploy(formName) {
            this.loading = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.agentDeploy['customPath'] = this.customPath;
                    this.agentDeploy['deploy'] = this.deploy;
                    this.agentDeploy['oldAgentDir'] = this.oldAgentDir;
                    this.agentDeploy['oldLogPath'] = this.oldLogPath;
                    agentDeployFun.saveAgentDownInfo(this.agentDeploy).then(res => {
                        if (typeof res != 'undefined' && res.success) {
                            this.$Msg.customizTitle("部署完成");
                            this.dialogFormVisible = false;
                            this.loading = false;
                        }
                        else {
                            this.loading = false;
                        }
                        
                    })
                } else {
                    this.loading = false;
                    return;
                }
            })
        }
    }
}
</script>

<style scoped>
/* 搜索框样式 */
.agentdeploy>>>.el-table th {
    padding: 0;
}
</style>
