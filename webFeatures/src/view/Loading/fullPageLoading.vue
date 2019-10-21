<template>
<div>
    <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
        指令方式/自动调用方式
    </el-button>
    <p>当使用指令方式时，全屏遮罩需要添加<code>fullscreen</code>修饰符（遮罩会插入至 body 上），此时若需要锁定屏幕的滚动，可以使用<code>lock</code>修饰符；当使用服务方式时，遮罩默认即为全屏，无需额外设置。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 4}" readonly placeholder="请输入内容" v-model="demo">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<style>
body {
    margin: 0;
}
</style>

<script>
export default {
    data() {
        return {
            demo: `
                <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
                    指令方式
                </el-button>
            `,
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            loading: true,
            fullscreenLoading: false
        };
    },
    methods: {
        openFullScreen() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
                loading.close();
            }, 2000);
        }
    },
    created() {
        this.openFullScreen();
    }
};
</script>
