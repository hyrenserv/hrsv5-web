<template>
<div class="generalQuery">
    <el-row>
        <i class="el-icon-s-operation"><span>单表普通查询接口说明</span></i>
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
                <el-input value="" :disabled="true" style="width: 900px;margin-top: 10px;">
                </el-input>
            </el-row>
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
                        fieldType: 'token',
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
</style>