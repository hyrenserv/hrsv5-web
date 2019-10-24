<template>
    <div>
        <span>雨纷纷</span>
        <el-divider direction="vertical"></el-divider>
        <span>旧故里</span>
        <el-divider direction="vertical"></el-divider>
        <span>草木深</span>
        <p style="margin-top:20px">设置<code>direction</code>属性，来改变分割线方向</p>
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
    data() {
        return {
            textarea2: `
                     <template>
                        <div>
                            <span>雨纷纷</span>
                            <el-divider direction="vertical"></el-divider>
                            <span>旧故里</span>
                            <el-divider direction="vertical"></el-divider>
                            <span>草木深</span>
                    </template>
                `  
        };
    }
};
</script>