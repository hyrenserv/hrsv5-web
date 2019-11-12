<template>
<div class="semiStructuredAgent">
    <el-row class="partOne">
        <el-col :span="24">
            <el-steps :active="active" finish-status="success" align-center style="margin: 10px 60px 20px 60px;">
                <el-step title="步骤 1" description="采集设置"></el-step>
                <el-step title="步骤 2" description="采集文件设置"></el-step>
                <el-step title="步骤 3" description="采集结构化设置"></el-step>
                <el-step title="步骤 4" description="存储设置"></el-step>
            </el-steps>
        </el-col>
    </el-row>
    <router-view></router-view>
    <el-row class="partFour">
        <el-col :span="12">
            <el-button type="primary"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" v-if="showHidden" style="float:left" @click="backSteps"><i class="el-icon-back"></i>上一步</el-button>
                <el-button type="primary" style="float:right" @click="nextSteps"> 下一步<i class="el-icon-right"></i></el-button>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./semiStructuredAgent";
export default {
    data() {
        return {
            active: 0,
            number: 0,
            showHidden: false,
        }
    },
    created() {
        console.log(this.$route.query.agent_id)
        functionAll.searchObjectCollect({
            agent_id:this.$route.query.agent_id,
            odc_id:""
        }).then((res) => {
            if (res && res.success) {
                console.log("1");
            }
        })

    },
    methods: {
        // 上一步
        backSteps() {
            if (this.number == 3) {
                this.$router.push({
                    name: "collectFileOption"
                });
                this.number -= 1;
            } else if (this.number == 2) {
                this.$router.push({
                    name: "collectOption"
                });
                this.number -= 1;
                this.active = 1;
            } else if (this.number == 1) {
                this.showHidden = false;
                this.active = 0;
            }
        },
        // 下一步
        nextSteps() {
            if (this.number == 0) {
                this.$router.push({
                    name: "collectOption"
                });
                this.number += 1;
            } else if (this.number == 1) {
                this.$router.push({
                    name: "collectFileOption"
                });
                this.number += 1;
                this.active = 1;
                this.showHidden = true;
            } else if (this.number == 2) {
                this.$router.push({
                    name: "collectionStructureSet"
                });
                this.number += 1;
                this.active = 2;
                this.showHidden = true;
            } else if (this.number == 3) {
                this.$router.push({
                    name: "collectFileOption"
                });
                this.active = 3;
                this.showHidden = true;
            }

        }
    },
}
</script>

<style scoped>
.semiStructuredAgent {
    padding: 0 2% 0 2%;
}

.semiStructuredAgent .el-row {
    margin-top: 20px;
}

.semiStructuredAgent .partFourDiv {
    float: right;
}
</style>
