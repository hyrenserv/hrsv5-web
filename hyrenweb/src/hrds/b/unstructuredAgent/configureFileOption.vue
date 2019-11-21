<template>
<div class="configureFileOption">
    <el-row class="partOne">
        选择文件 > 采集频率设置 > 配置连接属性
    </el-row>

    <el-row class="partTwo">

    </el-row>

    <el-row class="partThree">
        <el-col :span="12">
            <el-button size="medium" type="primary" @click="goBackQuit"> 返回</el-button>
        </el-col>

        <el-col :span="12">
            <div class="partThreeDiv">
                <el-button size="medium" type="primary" style="float:right" @click="unStructuredCollect">下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./unstructuredAgent";
export default {
    data() {
        return {
            form: {
                is_solr: "1"
            },
            runWay: [],
            YesNo: [],
            disabled: true,
            showOrHidden_realtime: false,
            showOrHidden_reduce: false,
            showOrHidden_unzip: false,
            size: "medium",
            formLabelWidth: "150px"
        }
    },
    created() {
        // 获取首页数据
        this.searchFileCollect();
        // 获取代码项对应值
        this.getCategoryItems("IsFlag");
        this.getCategoryItems("ExecuteWay");
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
        },
        // 获取首页数据
        searchFileCollect() {
            functionAll.searchFileCollect({
                fcs_id: this.$route.query.fcs_id,
                agent_id: this.$route.query.agent_id
            }).then((res) => {
                if (res && res.success) {
                    console.log(res.data)
                }
            });
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "ExecuteWay") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.runWay = res.data;
                    }
                })
            } else if (e == "IsFlag") {
                functionAll.getCategoryItems({
                    category: e
                }).then((res) => {
                    if (res && res.success) {
                        this.YesNo = res.data;
                    }
                })
            }
        },
        // 保存非结构化文件采集页面信息
        unStructuredCollect() {
            let date = this.form.end_date.toLocaleString().substring(0, 10).replace(/\//g, '');
            let date2 = this.form.start_date.toLocaleString().substring(0, 10).replace(/\//g, '');
            this.form["agent_id"] = this.$route.query.agent_id;
            this.form["start_date"] = date2;
            this.form["end_date"] = date;
            functionAll.addFileCollect(
                this.form
            ).then((res) => {
                if (res && res.success) {
                    //    this.$router.push
                }
            })
        },
        // 是否实时读取控制实时读取间隔时间
        handerChange_realtime(val) {
            if (val == 1) {
                this.showOrHidden_realtime = true;
            } else if (val == 0) {
                this.showOrHidden_realtime = false;
            }
        },
    }

}
</script>

<style scoped>
.configureFileOption {
    padding: 0 2% 0 2%;
}

.configureFileOption .el-row {
    margin-top: 20px;
}

.configureFileOption .partOne {
    font-size: 13px;
    color: #777;
}

/* 表格边框 */
.configureFileOption .partTwo {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
}

/* 按钮设置 */
.configureFileOption .partThreeDiv {
    float: right;
}

.configureFileOption .partThreeDiv .el-button {
    margin-bottom: 20px;
}
</style>
