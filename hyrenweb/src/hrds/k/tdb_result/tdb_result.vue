<template>
<div id="marketIndex">

    <div class="titleSpan">
        <span class="top3title">数据对标结果</span>
    </div>
    <div>
        <div class="dataSheetmain">
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
        </div>
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
        gotofunc_dep_result(){
            this.$router.push({
                name: 'func_dep_result',
            });
        },
        gotofk_analysis_result(){
            this.$router.push({
                name: 'fk_analysis_result',
            });
        },
        gotofield_same_result(){
            this.$router.push({
                name: 'field_same_result',
            });
        },
        gotofeature_analysis_result(){
            this.$router.push({
                name: 'feature_analysis_result',
            });
        }
    }
};
</script>

<style scoped>
.dataSheetmain {
    padding-left: 30px;
    border: 1px solid #dddddd;
    min-height: 124px;
    padding-top: 30px;
    overflow: hidden;
    margin-bottom: 10px;
}

/* 遮料层样式 */
.boxshletr {
    width: 106px;
    height: 28px;
    background: black;
    opacity: 0.6;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: none;
    border-radius: 4px;
}

.topTitleLocal {
    margin-bottom: 6px !important;
}

.dataSheetmainDiv:hover {
    background: #286090;
    cursor: pointer;
}

.dataSheetmainDiv:hover .boxshletr {
    display: block;
}

.fa {
    color: white;
}

.dataSheetmainDiv {
    margin: 0 auto;
    margin-bottom: 30px;
    padding-top: 10px;
    width: 146px;
    height: 80px;
    background: #337AB7;
    border-radius: 4px;
    margin-right: 30px;
    text-align: center;
    float: left;
    position: relative;
}

.el-tabs {
    margin-top: 0px
}

.dataSheetmainDiv p {
    margin-top: 4px;
    color: #fff;
    margin-left: 5px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 标签定位 */
.dataSheetmainDiv span {
    display: block;
    width: 18px;
    height: 18px;
    background: #f89406;
    border-radius: 50%;
    color: white;
    position: absolute;
    right: -2px;
    top: -3px;
    font-size: 12px;
}

/* 字体描述定位 */
.dataSheetmainDiv .postionP {
    position: absolute;
    bottom: -20px;
    left: 4px;
    font-size: 13px;
    color: black;
}

/* 小图标样式 */
.tree {
    color: aliceblue;
}

/* 底部边距 */
.bottomMargin {
    margin-bottom: 1%;
}

.top3title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #2196f3;
    font-size: 16px;
}

.titleSpan {
    border-bottom: 1px solid #e6e3e3;
    width: 100%;
}

.elButton {
    float: right;
    margin-top: 4px;

}

.addNew {
    float: right;
    margin-bottom: 2px;
}

/* 按钮设置 */
.editBtn {
    padding: 0;
}

.buttonStyle {
    display: block;
    float: left;
    margin-right: 10px;
    margin-left: 0px;
}

/* top3设置 */
.tableDiv {
    padding: 10px;
    margin-bottom: 10px;
}

.elcolFor {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    background: #7BA9D0;
    padding: 10px 0;
    border-radius: 4px;
    color: #fff;
    margin: 0 10px;
}

.bottomMargins {
    border: 1px solid #e6e6e6;
    padding: 10px;
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 10px !important;
}

/* top5标题 */
.titlep {
    text-align: center;
    font-size: 17px;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #2196f3
}
</style>
