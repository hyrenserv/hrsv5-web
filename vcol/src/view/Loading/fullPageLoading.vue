<template>
<div>
    <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
        指令方式/自动调用方式
    </el-button>
    <p>通过添加<code>fullscreen</code>属性和<code>lock</code>属性，实现全屏加载功能</p>
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
                <template>
                    <div>
                        <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
                            指令方式
                        </el-button>
                    </div>
                </template>

                <style>
                    body {
                        margin: 0;
                    }
                </style>

                <script>
                    export default{
                        data(){
                            return{
                                loading: true,
                                fullscreenLoading: false
                            }
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
                     }
                <\/script>

            `,
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
