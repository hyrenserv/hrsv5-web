<template>
<div class="sqlInterfaceSearch">
    <el-row>
        <i class="el-icon-s-operation"><span>接口权限获取</span></i>
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
        name: "sqlInterfaceSearch",
        data() {
            return {
                data: {}
            }
        },
        watch: {
            $route(to, from) {
                this.$router.go(0)
            }
        },
        mounted() {
            console.log(this.$route.query.interface_use_id,this.$route.query.url)
            this.getInterfaceUseParam(this.$route.query.interface_use_id);
        },
        methods: {
            // 查询数据使用信息
            getInterfaceUseParam(interface_use_id) {
                interfaceFunctionAll.getInterfaceUseParam({"interface_use_id": interface_use_id})
                    .then(res => {
                        this.data = res.data;
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