<template>
    <div class="interfaceTest">
        <el-row class="topTitle">
            <span class="el-icon-s-help">接口测试</span>
            <router-link to="/serviceUser">
                <el-button class="goIndex" type="primary" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-form :inline="true" :model="tokenForm" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="tokenForm.user_id" clearable placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码" style="margin-left: 66px">
                <el-input v-model="tokenForm.user_password" clearable placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item>
                <el-button type="success" size="mini" style="margin-left: 50px" @click="getToken">
                    获取token
                </el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="50">
            <el-col :span="9">
                <el-form :label-position="labelPosition" label-width="100px" :model="testForm">
                    <el-form-item label="token">
                        <el-input v-model="testForm.token" clearable placeholder="请输入token"/>
                    </el-form-item>
                    <el-form-item label="url">
                        <el-input v-model="testForm.url" clearable placeholder="请输入请求路径"/>
                    </el-form-item>
                    <el-form-item label="tableName">
                        <el-input v-model="testForm.tableName" clearable placeholder="请输入系统登记表名称"/>
                    </el-form-item>
                    <el-form-item label="dataType">
                        <el-input v-model="testForm.dataType" clearable placeholder="请输入输出数据类型"/>
                    </el-form-item>
                    <el-form-item label="outType">
                        <el-input v-model="testForm.outType" clearable placeholder="请输入输出数据形式"/>
                    </el-form-item>
                    <el-form-item label="num">
                        <el-input v-model="testForm.num" clearable placeholder="请输入显示条数"/>
                    </el-form-item>
                    <el-form-item label="selectColumn">
                        <el-input v-model="testForm.selectColumn" clearable placeholder="请输入需要查询的列名"/>
                    </el-form-item>
                    <el-form-item label="whereColumn">
                        <el-input v-model="testForm.whereColumn" clearable placeholder="请输入查询条件"/>
                    </el-form-item>
                    <el-form-item label="ds_name">
                        <el-input v-model="testForm.ds_name" clearable placeholder="请输入数据源名称"/>
                    </el-form-item>
                    <el-form-item label="agent_name">
                        <el-input v-model="testForm.agent_name" clearable placeholder="请输入agent采集名称"/>
                    </el-form-item>
                    <el-form-item label="fcs_name">
                        <el-input v-model="testForm.fcs_name" clearable placeholder="请输入任务采集名称"/>
                    </el-form-item>
                    <el-form-item label="filename">
                        <el-input v-model="testForm.filename" clearable placeholder="请输入查询文件名"/>
                    </el-form-item>
                    <el-form-item label="filesize">
                        <el-input v-model="testForm.filesize" clearable placeholder="请输入文件大小"/>
                    </el-form-item>
                    <el-form-item label="filesuffix">
                        <el-input v-model="testForm.filesuffix" clearable placeholder="请输入文件后缀名"/>
                    </el-form-item>
                    <el-form-item label="filemd5">
                        <el-input v-model="testForm.filemd5" clearable placeholder="请输入文件md5值"/>
                    </el-form-item>
                    <el-form-item label="filepath">
                        <el-input v-model="testForm.filepath" clearable placeholder="请输入文件路径"/>
                    </el-form-item>
                    <el-form-item label="storagedate">
                        <el-input v-model="testForm.storagedate" clearable placeholder="请输入文件入库日期"/>
                    </el-form-item>
                    <el-form-item label="sql">
                        <el-input v-model="testForm.sql" clearable placeholder="请输入要执行的sql语句"/>
                    </el-form-item>
                    <el-form-item label="query">
                        <el-input v-model="testForm.query" clearable placeholder="请输入检索信息"/>
                    </el-form-item>
                    <el-form-item label="dep_id">
                        <el-input v-model="testForm.dep_id" clearable placeholder="请输入部门ID"/>
                    </el-form-item>
                    <el-form-item label="fcs_id">
                        <el-input v-model="testForm.fcs_id" clearable placeholder="请输入任务ID"/>
                    </el-form-item>
                    <el-form-item label="asynType">
                        <el-input v-model="testForm.asynType" clearable placeholder="请输入是否异步"/>
                    </el-form-item>
                    <el-form-item label="directory">
                        <el-input v-model="testForm.directory" clearable placeholder="请输入文件目录"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="mini" @click="getInterfaceData">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="15">
                <span class="fontStyle">接口响应数据：</span>
                <div style="margin: 20px 0;"></div>
                <el-input type="textarea" :rows="66" v-model="interfaceData"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./interfaceTest";

    export default {
        name: "interfaceTest.vue",
        data() {
            return {
                labelPosition: 'right',
                tokenForm: {},
                testForm: {
                    token: '',
                    num: null
                },
                interfaceData: ''
            }
        },
        methods: {
            // 获取token值
            getToken() {
                let params = {};
                params["user_id"] = this.tokenForm.user_id;
                params["user_password"] = this.tokenForm.user_password;
                interfaceFunctionAll.getToken(params).then(res => {
                    this.testForm.token = res.data.token;
                    this.interfaceData = this.getFormatData(JSON.stringify(res.data));
                })
            },
            // 获取接口响应信息
            getInterfaceData() {
                if (this.testForm.user_id === "" || this.testForm.user_id === undefined) {
                    this.testForm.user_id = null;
                }
                if (this.testForm.url === undefined) {
                    this.interfaceData = this.getFormatData(JSON.stringify('{' +
                        '                        "message": {' +
                        '                            "url未填或填写错误请检查"' +
                        '                        },' +
                        '                        "status": "NORMAL"' +
                        '                    }'));
                } else {
                    interfaceFunctionAll.getInterfaceData(this.testForm).then(res => {
                        this.interfaceData = this.getFormatData(JSON.stringify(res.data));
                    })
                }
            },
            formatJson(json) {
                let i = 0,
                    il = 0,
                    tab = "    ",
                    newJson = "",
                    indentLevel = 0,
                    inString = false,
                    currentChar = null;
                for (i = 0, il = json.length; i < il; i += 1) {
                    currentChar = json.charAt(i);
                    switch (currentChar) {
                        case '{':
                        case '[':
                            if (!inString) {
                                newJson += currentChar + "\n" + this.repeat(tab, indentLevel + 1);
                                indentLevel += 1
                            } else {
                                newJson += currentChar
                            }
                            break;
                        case '}':
                        case ']':
                            if (!inString) {
                                indentLevel -= 1;
                                newJson += "\n" + this.repeat(tab, indentLevel) + currentChar
                            } else {
                                newJson += currentChar
                            }
                            break;
                        case ',':
                            if (!inString) {
                                newJson += ",\n" + this.repeat(tab, indentLevel)
                            } else {
                                newJson += currentChar
                            }
                            break;
                        case ':':
                            if (!inString) {
                                newJson += ": "
                            } else {
                                newJson += currentChar
                            }
                            break;
                        case ' ':
                        case "\n":
                        case "\t":
                            if (inString) {
                                newJson += currentChar
                            }
                            break;
                        case '"':
                            if (i > 0 && json.charAt(i - 1) !== '\\') {
                                inString = !inString
                            }
                            newJson += currentChar;
                            break;
                        default:
                            newJson += currentChar;
                            break
                    }
                }
                return newJson
            },
            getFormatData(json) {
                json = json + "";
                if (json.indexOf('{') === -1 && json.indexOf('[') === -1) {
                    return json;
                } else {
                    return (this.formatJson(json));
                }
            },
            repeat(s, count) {
                return new Array(count + 1).join(s)
            },
        }
    }

</script>

<style scoped>
    .borderStyle {
        width: 100%;
        border: #e6e6e6 solid 1px;
    }

    .demo-form-inline {
        margin-left: 45px;
    }

    .fontStyle {
        color: #2196f3;
        font-size: 18px;
    }
</style>