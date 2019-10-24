<template>
    <div class="box">
        <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
            <el-button>下边</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
            <el-button>右边</el-button>
        </el-tooltip>
        <p style="margin-top:20px">通过设置<code>placement</code>属性，提供<code>bottom</code>--<code>right</code>,来显示提示信息出现的位置</p>
        <el-collapse>
            <el-collapse-item title="显示代码" name="1">
                <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2">
                </el-input>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                textarea2: `
                     <template>
                        <div>
                            <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                                <el-button>下边</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                                <el-button>右边</el-button>
                            </el-tooltip>
                        </div>       
                    </template>
                    <style>
                        .item {
                                margin: 4px;
                              }
                    </style>
                `
            }
        }
    }
</script>


<style>
.item {
    margin: 4px;
}
</style>
