<template>
    <div class="getToken">
        <el-row>
            <i class="el-icon-s-operation"><span>权限获取接口说明</span></i>
            <router-link to="/serviceUser">
                <el-button class="elButton" type="primary" size="medium" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-divider/>
        <el-row>
            <el-col :span="6">
                <el-row>
                    <span>请求方式</span>
                </el-row>
                <el-row>
                    <el-input value="POST" :disabled="true" style="width: 260px;margin-top: 10px;">
                    </el-input>
                </el-row>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <span>请求URL</span>
                </el-row>
                <el-row>
                    <el-input v-model="ipAndPort" :disabled="true"
                              style="width: 900px;margin-top: 10px;font-size: 16px">
                    </el-input>
                </el-row>
            </el-col>
        </el-row>
        <el-divider/>
        <span style="color: #2196f3;font-size: 18px">请求参数列表</span>
        <el-row>
            <!--请求参数列表展示-->
            <el-table :data="tableData" border >
                <el-table-column prop="field" label="字段" align="center"/>
                <el-table-column prop="fieldType" label="类型" align="center"/>
                <el-table-column prop="isRequired" label="是否必填" align="center"/>
                <el-table-column prop="remark" label="描述" align="center"/>
            </el-table>
        </el-row>
        <el-divider/>
        <el-row>
            <span style="color: #2196f3;font-size: 18px">使用方式如下</span>
            <el-input v-model="requestAddress" style="font-size: 16px;margin-top: 10px" :disabled="true">
            </el-input>
        </el-row>
        <el-divider/>
        <el-row>
            <el-col :span="12">
                <span style="color: #2196f3;font-size: 18px">正常响应字段明细</span>
                <!--响应参数列表展示-->
                <el-table :data="responseData" border>
                    <el-table-column prop="field" label="字段" align="center"/>
                    <el-table-column prop="fieldType" label="类型" align="center"/>
                    <el-table-column prop="remark" label="描述" align="center"/>
                </el-table>
            </el-col>
            <el-col :span="12">
                <span style="color: #2196f3;font-size: 18px">正常显示如下：</span>
                <pre style="font-size: 16px;">
                    {
                        "message": {
                            "token_id": "5ec2097ffed0fb06e0a3d7158fed09ac",
                            "expires_in": 7200
                        },
                        "status": "NORMAL"
                    }
                </pre>
            </el-col>
        </el-row>
        <el-divider/>
        <el-row>
            <el-col :span="12">
                <span style="color: #2196f3;font-size: 18px">错误响应字段明细</span>
                <!--响应参数列表展示-->
                <el-table :data="errorData" border >
                    <el-table-column prop="state" label="状态字段名" align="center"/>
                    <el-table-column prop="description" label="状态说明" align="center"/>
                </el-table>
            </el-col>
            <el-col :span="12">
                <span style="color: #2196f3;font-size: 18px">错误显示如下：</span>
                <pre style="font-size: 16px;">
                    {
                        "status":404,
                        "message":"获取token值失败..."
                    }
                </pre>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as interfaceFunctionAll from "./api";

    export default {
        name: "getToken",
        data() {
            return {
                ipAndPort: '',
                requestAddress: '',
                tableData: [
                    {
                        field: 'user_id',
                        fieldType: 'Long',
                        isRequired: '必填',
                        remark: '用户ID',
                    },
                    {
                        field: 'user_password',
                        fieldType: 'String',
                        isRequired: '必填',
                        remark: '密码',
                    },
                ],
                responseData: [
                    {
                        field: 'status',
                        fieldType: 'String',
                        remark: '返回状态',
                    },
                    {
                        field: 'user_password',
                        fieldType: 'String',
                        remark: 'token的返回值',
                    },
                    {
                        field: 'expires_in',
                        fieldType: 'String',
                        remark: 'token的有效时间',
                    }
                ],
                errorData: [
                    {
                        state: 'UNAUTHORIZED',
                        description: '账号或密码错误',
                    },
                    {
                        state: 'EXCEPTION',
                        description: '异常错误',
                    },
                ],
            }
        },
        watch: {
            $route(to, from) {
                this.$router.go(0)
            }
        },
        mounted() {
            this.getIpAndPort();
        },
        methods: {
            // 查询当前用户的IP与端口信息
            getIpAndPort() {
                interfaceFunctionAll.getIpAndPort()
                    .then(res => {
                        this.ipAndPort = "http://" + res.data.ipAndPort +
                            "/G/action/hrds/g/biz/serviceuser/impl/" + this.$route.query.url;
                        this.requestAddress = this.ipAndPort + "?user_id=1015&uer_password=111111"
                    })
            },
        }
    }
</script>

<style scoped>
    .el-icon-s-operation {
        margin-bottom: 10px;
        margin-right: 1000px;
        font-size: 20px;
        text-align: center;
        color: #2196f3;
    }
    .el-table{
        width: 100%;
        margin-top: 10px;
    }
</style>