<template>
<div id="tdbresult">
    <el-row class='topTitle'>
        <span>数据对标结果</span>
    </el-row>
    <div>
        <el-row class="elButttonSheetrow">
            <div class="elButttonSheet">
                <router-link to="/feature_analysis_result">
                    <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-guanli">字段特征分析</el-button>
                </router-link>
            </div>
            <div class="elButttonSheet">
                <router-link to="/datamap">
                    <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-fenxi">数据地图</el-button>
                </router-link>
            </div>
            <div class="elButttonSheet">
                <router-link to="/pk_analysis_result">
                    <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-peizhi">主键分析</el-button>
                </router-link>
            </div>
            <div class="elButttonSheet">
                <router-link to="/join_pk_analysis_result">
                    <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont">联合主键及表函数</el-button>
                </router-link>
            </div>
            <div class="elButttonSheet">
                <router-link to="/fk_analysis_result">
                    <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-peizhi1">外键分析</el-button>
                </router-link>
            </div>
            <div class="elButttonSheet">
                <router-link to="/field_same_result">
                    <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-fenxijieguo">相等类别分析</el-button>
                </router-link>
            </div>
        </el-row>
        <!-- <div class="dataSheetmain">
            <el-col :span="3">
                <div class="dataSheetmainDiv">
                    <div @click="gotofeature_analysis_result()" style="margin-top:6px;">
                        <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                        <p>查询字段特征分析</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="dataSheetmainDiv">
                    <div @click="gotodatamap()" style="margin-top:6px;">
                        <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                        <p>查询数据地图</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="dataSheetmainDiv">
                    <div @click="gotopk_analysis_result()" style="margin-top:6px;">
                        <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                        <p>查看主键分析结果</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="dataSheetmainDiv">
                    <div @click="gotojoin_pk_analysis_result()" style="margin-top:6px;">
                        <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                        <p>查看联合主键分析结果</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="dataSheetmainDiv">
                    <div @click="gotofunc_dep_result()" style="margin-top:6px;">
                        <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                        <p>查看表函数依赖</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="dataSheetmainDiv">
                    <div @click="gotofk_analysis_result()" style="margin-top:6px;">
                        <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                        <p>查看外键分析结果</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="dataSheetmainDiv">
                    <div @click="gotofield_same_result()" style="margin-top:6px;">
                        <i class="block_icon fa fa-list-alt fa-2x tree"></i>
                        <p>查看相等类别分析</p>
                    </div>
                </div>
            </el-col>
        </div> -->
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {
        gotodatamap() {
            this.$router.push({
                name: 'datamap',
            });
        },
        gotopk_analysis_result() {
            this.$router.push({
                name: 'pk_analysis_result',
            });
        },
        gotojoin_pk_analysis_result() {
            this.$router.push({
                name: 'join_pk_analysis_result',
            });
        },
        gotofunc_dep_result() {
            this.$router.push({
                name: 'func_dep_result',
            });
        },
        gotofk_analysis_result() {
            this.$router.push({
                name: 'fk_analysis_result',
            });
        },
        gotofield_same_result() {
            this.$router.push({
                name: 'field_same_result',
            });
        },
        gotofeature_analysis_result() {
            this.$router.push({
                name: 'feature_analysis_result',
            });
        }
    }
};
</script>

<style scoped>
#tdbresult .elButttonSheetrow {
    display: flex;
    border: 1px solid #e6e6e6;
    height: 140px;
    justify-content: center;
    /*垂直居中*/
    align-items: center;
    /*水平居中*/
}

#tdbresult .bottomMargin {
    border: 1px solid #e6e6e6;
    padding: 10px;
    margin: 0 !important;
}

#tdbresult .bottomMargin .elcolFor {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    background: #3d8dd2;
    ;
    padding: 10px 0;
    border-radius: 4px;
    color: #fff;
    margin: 0 10px;
}

#tdbresult .bottomMargin .elcolForbutton {
    /* height: px; */
    width: 120px;
    border-radius: 10px;
    cursor: default;
}

#tdbresult .bottomMargin .elcolCount {
    margin-top: 4px;
    font-weight: 800;
    font-size: 16px;
}

#tdbresult .elButttonSheet {
    flex: 1;
    text-align: center;
}

#tdbresult .elButttonSheet .elButttonSheetbutton {
    width: 160px;
    height: 80px;
    border-radius: 10px;
}

#tdbresult .elButttonSheet .elButttonSheetbutton1 {
    background-color: #5bc0de;
    color: white;
    border-color: #5bc0de;
    font-size: 16px;
}

#tdbresult .elrowTop5 {
    min-height: 270px;
    margin-bottom: 20px;
    border: 1px solid #e6e6e6;
    padding: 10px 3px 0 3px;
}

#tdbresult p {
    height: 38px;
    background-color: #f5f5f5;
    border-color: #ddd;
    line-height: 38px;
    font-size: 16px;
    padding-left: 5px;
}
</style>
