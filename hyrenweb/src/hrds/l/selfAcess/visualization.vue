<template>
<div class="visualizationDiv">
    <el-row class="elRowtitle">
        <p class="tempalteInfo">选择数据源</p>
        <div class="templateButton">
            <el-button type="danger" size="small">
                返回上级
            </el-button>
            <el-button type="primary" size="small">
                保存组件
            </el-button>
        </div>
    </el-row>
    <div class="lines"></div>
    <el-row>
        <el-select v-model="value" placeholder="请选择表单" size="small" style="width:160px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-input style="width:220px;margin-left:4px;" size="small" v-model="input" disabled placeholder="选择表单内容"></el-input>
    </el-row>
    <el-row>
        <el-col :span="8" class="elcol8">
            <p>设置显示字段</p>
            <div class="showArryDiv">
                <ul>
                    <li v-for="item in optionsWords" :key="item.name" style="padding-left:10px;height:30px;line-height:30px;"> {{item.name}} <span style="cursor:pointer;"><i class="el-icon-close"></i></span><span v-if="optionsWords.length >1"><i class="el-icon-top"></i></span><span v-if="optionsWords.length >1"><i class="el-icon-bottom"></i></span></li>
                </ul>
            </div>
        </el-col>
        <el-col :span="8" class="elcol8">
            <p>设置过滤条件</p>
            <div class="showArryDiv">

            </div>
        </el-col>
        <el-col :span="8" class="elcol8">
            <p>设置分组条件</p>
            <div class="showArryDiv">

            </div>
        </el-col>
    </el-row>
    <el-row>

    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            input: 'dd',
            options: [],
            auto_comp_data_sum_array: [],
            optionsWords: [{
                name: 'sss'
            }]
        }
    }
}
</script>

<style scoped>
/* 行标题 */
.visualizationDiv .elRowtitle {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.visualizationDiv .tempalteInfo {
    float: left;
    font-size: 18px;
    color: #2196f3;
}

.visualizationDiv .templateButton {
    float: right;
}

.visualizationDiv .lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

.showArryDiv {
    width: 300px;
    height: 100px;
    border: 1px solid #ddd;
    overflow: auto;
}
</style>
