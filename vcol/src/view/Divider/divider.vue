<template>
    <div>
        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
        <el-divider></el-divider>
        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span><br><br>
        <span>雨纷纷</span>
        <el-divider direction="vertical"></el-divider>
        <span>旧故里</span>
        <el-divider direction="vertical"></el-divider>
        <span>草木深</span>
        <p style="margin-top:20px">默认<code>divider</code>标签，来显示分割线</p>
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
                            <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
                            <el-divider></el-divider>
                            <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
                            <span>雨纷纷</span>
                            <el-divider direction="vertical"></el-divider>
                            <span>旧故里</span>
                            <el-divider direction="vertical"></el-divider>
                            <span>草木深</span>
                        </div>       
                    </template>
                `  
        };
    }
};
</script>
