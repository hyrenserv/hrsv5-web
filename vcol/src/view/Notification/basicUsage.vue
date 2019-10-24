<template>
<div>
    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->
    <el-button plain @click="open2">不会自动关闭</el-button>
    <p>通过绑定<code>click</code>事件调用方法，实现通知功能</p>
    <p>通过在methods事件中添加<code>message</code>属性，实现通知详情内容</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly v-model="textarea2"></el-input>
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
                           <el-button plain @click="open2">不会自动关闭</el-button>
                        </div>       
                    </template>
                    <script>
                        export default {
                            methods: {
                                open2() {
                                    this.$notify({
                                        title: "提示",
                                        message: "这是一条不会自动关闭的消息",
                                        duration: 0
                                    });
                                }
                            }
                        }
                    <\/script>`
        }
    },
    methods: {
        open2() {
            this.$notify({
                title: "提示",
                message: "这是一条不会自动关闭的消息",
                duration: 0
            });
        }
    }
};
</script>
