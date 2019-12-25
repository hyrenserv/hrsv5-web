<template>
<div id="tasklog">
    <el-row>
        <span>日志查看</span>
        <router-link to="/">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <div class="lines"></div>
    <div class="logcontent">
        <div>请填写查看日志行数 : 默认显示最后100行,最多显示最后1000行.</div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row class="middline">
                <el-col :span="3">
                    <el-form-item label="主机:">
                        <p class="tasklog_p">{{formInline.Host}}</p>
                        <!-- <el-input  v-model="formInline.Host" placeholder="主机" style="width:100px" size="medium"></el-input> -->
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="日志位置:">
                        <p class="tasklog_p">{{formInline.Loglocation}}</p>
                        <!-- <el-input v-model="formInline.Loglocation" placeholder="日志位置" style="width:100px" size="medium"></el-input> -->
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <!-- <el-form-item label="日志类型"> -->
                    <el-select v-model="formInline.LogType" placeholder="日志类型" style="width:100px" size="mini">
                        <el-option label="错误日志" value="Wrong"></el-option>
                        <el-option label="完整日志" value="All"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </el-col>
                <el-col :span="3">
                    <!-- <el-form-item label> -->
                    <el-input v-model="formInline.lognum" placeholder="日志行数" size="mini">
                        <el-button type="primary" @click="onSubmit()" size="mini" slot="append">查看</el-button>
                    </el-input>
                    <!-- </el-form-item> -->
                </el-col>
                <!-- <el-col :span="1">
            <el-form-item>
              <el-button type="primary" @click="onSubmit()" size="mini">查看</el-button>
            </el-form-item>
          </el-col> -->
                <el-col :span="1">
                    <el-form-item>
                        <el-button type="primary" size="mini">下载</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="showlog"></div>
    </div>
</div>
</template>

<script>
import * as agentList from "./agentList";
export default {
    data() {
        return {
            formInline: {
                Host: "10.71.4.52",
                Loglocation: "/hyren/HRSDATA/hrsagent/shujukuAgent_30000/log/error.log",
                LogType: "",
                lognum: ""
            },
            agentid: ""
        };
    },
    mounted() {
        this.agentid = this.$route.query.agenId;
    },
    methods: {
        onSubmit() {
            let params = {};
            params["agentId"] = this.agentid;
            params["logType"] = this.formInline.LogType;
            params["readNum"] = this.formInline.lognum;
            agentList.viewTaskLog(params).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style scoped>
#tasklog {
    padding: 0 40px;
}

/* 图标字体设置 */
.el-row {
    width: 100%;
    height: 64px;
    line-height: 64px;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

.fa-home {
    margin-right: 5px;
}

/* button样式设置 */
.goIndex {
    float: right;
    background: #337ab7;
    margin-top: 18px;
    margin-right: 14px;
}

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
</style>
