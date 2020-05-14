<template>
<div id="tasklog">
    <el-row class='topTitle'>
        <span class='el-icon-location'>日志查看</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <div class="logcontent">
        <div class="redcolor">请填写查看日志行数 : 默认显示最后100行,最多显示最后1000行.</div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row class="middline">
                <el-col :span="3">
                    <el-form-item label="主机 :">
                        <p class="tasklog_p">{{formInline.agent_ip}}</p>
                        <!-- <el-input  v-model="formInline.Host" placeholder="主机" style="width:100px" size="medium"></el-input> -->
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="日志位置 :">
                        <p class="tasklog_p">{{formInline.log_dir}}</p>
                        <!-- <el-input v-model="formInline.Loglocation" placeholder="日志位置" style="width:100px" size="medium"></el-input> -->
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="5">
                    <el-form-item label="日志类型 :">
                    <el-select v-model="formInline.LogType" placeholder="日志类型" style="width:100px" size="mini">
                        <el-option label="错误日志" value="Wrong"></el-option>
                        <el-option label="完整日志" value="All"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col> -->
                <el-col :span="2">
                    <el-form-item>
                        <el-input v-model="lognum" placeholder="日志行数" size="mini">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()" size="mini">查看</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-form-item label>
                        <el-button type="success" size="mini" icon="el-icon-download" @click="downloadTaskLog()"></el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="showlog"></div>
    </div>
    <div>
        <pre>
        {{logMsg}}
        </pre>
    </div>
</div>
</template>

<script>
import * as agentList from "./agentList";
export default {
    data() {
        return {
            formInline: {
                // Host: "10.71.4.52",
                // Loglocation: "/hyren/HRSDATA/hrsagent/shujukuAgent_30000/log/error.log",
                // LogType: "",
                // lognum: ""
            },
            lognum: 100,
            agentid: this.$route.query.agent_id,
            logMsg: ''
        };
    },
    mounted() {
        agentList.agentDeployData({
            'agent_id': this.agentid
        }).then(res => {
            console.log(res, "agentDeployData");
            if (typeof res != 'undefined') {
                //获取第一条的信息就可以了...部署的路径可能会出现重复的
                this.formInline = res.data[0];
            }
        })
    },
    methods: {
        // 日志查看
        onSubmit() {
            let params = {};
            params["agentId"] = this.agentid;
            // params["logType"] = this.formInline.LogType;
            params["readNum"] = this.lognum;
            agentList.viewTaskLog(params).then(res => {
                console.log(res);
                this.logMsg = res.data;
            });
        },
        // 任务日志下载
        downloadTaskLog() {
            let params = {};
            params["agentId"] = this.agentid;
            params["logType"] = this.formInline.LogType;
            params["readNum"] = this.formInline.lognum;
            agentList.downloadTaskLog(params).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style scoped>
/* 下划线样式 */
.lines {
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

.middline>>>.el-form-item .el-form-item__content {
    display: inline-block !important;
    vertical-align: middle !important;
}

.tasklog_p {
    font-size: 12px
}

.redcolor {
    color: #ec0b35;
    font-size: 12px;
}

.el-select-dropdown {
    top: 204px !important;
}
</style>
