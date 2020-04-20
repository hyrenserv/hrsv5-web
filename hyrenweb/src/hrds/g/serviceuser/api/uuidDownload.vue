<template>
    <div class="uuidDownload">
        <el-row>
            <i class="el-icon-s-operation"><span>UUID下载接口说明</span></i>
            <router-link to="/serviceUser">
                <el-button class="elButton" type="primary" size="medium" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-divider/>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <span class="fontStyle">请求方式</span>
                </el-row>
                <el-row>
                    <el-input value="POST" :disabled="true" style="width: 260px;margin-top: 10px;">
                    </el-input>
                </el-row>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <span class="fontStyle">请求URL</span>
                </el-row>
                <el-row>
                    <el-input v-model="ipAndPort" :disabled="true"
                              style="width: 900px;margin-top: 10px;font-size: 16px">
                    </el-input>
                </el-row>
            </el-col>
        </el-row>
        <el-divider/>
        <span class="fontStyle">请求参数列表</span>
        <el-row>
            <!--请求参数列表展示-->
            <el-table :data="tableData" border>
                <el-table-column prop="field" label="字段" align="center"/>
                <el-table-column prop="fieldType" label="类型" align="center"/>
                <el-table-column prop="isRequired" label="是否必填" align="center"/>
                <el-table-column prop="remark" label="描述" align="center"/>
            </el-table>
        </el-row>
        <el-divider/>
        <el-row>
            <span class="fontStyle">使用方式如下</span>
            <el-input v-model="requestAddressForToken" style="font-size: 16px;margin-top: 10px"
                      :disabled="true"/>
            <el-divider>或</el-divider>
            <el-input v-model="requestAddress" style="font-size: 16px;margin-top: 10px" :disabled="true"/>
        </el-row>
        <el-divider/>
        <el-row :gutter="20">
            <el-col :span="12">
                <span class="fontStyle">错误响应字段明细</span>
                <!--响应参数列表展示-->
                <el-table :data="errorData" border>
                    <el-table-column prop="state" label="状态字段名" align="center"/>
                    <el-table-column prop="description" label="状态说明" align="center"/>
                </el-table>
            </el-col>
            <el-col :span="12">
                <span class="fontStyle">错误显示如下：</span>
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
        name: "uuidDownload",
        data() {
            return {
                ipAndPort: '',
                requestAddressForToken: '',
                requestAddress: '',
                tableData: [
                    {
                        field: 'user_id',
                        fieldType: 'Long',
                        isRequired: '必填，与user_password同选',
                        remark: '用户ID',
                    },
                    {
                        field: 'user_password',
                        fieldType: 'String',
                        isRequired: '必填，与user_id同选',
                        remark: '密码',
                    },
                    {
                        field: 'token',
                        fieldType: 'String',
                        isRequired: '必填，和user_id,user_password选择一种模式',
                        remark: 'token值',
                    },
                    {
                        field: 'url',
                        fieldType: 'String',
                        isRequired: '必填',
                        remark: '请求路径',
                    },
                    {
                        field: 'uuid',
                        fieldType: 'String',
                        isRequired: '必填',
                        remark: '数据的UUID',
                    },
                ],
                errorData: [
                    {
                        state: 'UNAUTHORIZED',
                        description: '账号或密码错误',
                    },
                    {
                        state: 'INTERFACE_STATE',
                        description: '接口处于禁用状态',
                    },
                    {
                        state: 'USE_VALIDDATE',
                        description: '接口使用效期已过',
                    },
                    {
                        state: 'NO_PERMISSIONS',
                        description: '没有接口使用权限',
                    },
                    {
                        state: 'START_DATE_ERROR',
                        description: '接口开始使用日期未到',
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
                        this.requestAddressForToken =
                            this.ipAndPort + "?token=AJALalfja&url=" + this.$route.query.url +
                            "&uuid=asda2cas-232casc";
                        this.requestAddress = this.ipAndPort +
                            "?user_id=1005&user_password=111111&&url=" + this.$route.query.url +
                            "&uuid=asda2cas-232casc";
                    })
            },
        }
    }
</script>

<style scoped>
    .el-icon-s-operation {
        margin-bottom: 10px;
        margin-right: 960px;
        font-size: 20px;
        text-align: center;
        color: #2196f3;
    }

    .el-table {
        width: 100%;
        margin-top: 10px;
    }

    .fontStyle {
        color: #2196f3;
        font-size: 18px;
    }
</style>