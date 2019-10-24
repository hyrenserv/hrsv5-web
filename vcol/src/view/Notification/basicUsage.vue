<template>
<div>
    <!-- <el-button plain @click="open1">可自动关闭</el-button> -->
    <el-button plain @click="open2">不会自动关闭</el-button>
    <p>
        Notification 组件提供通知功能，Element 注册了
        <code>$notify</code>方法，接收一个
        <code>options</code>字面量参数，在最简单的情况下，你可以设置
        <code>title</code>字段和
        <code>message</code>字段，用于设置通知的标题和正文。默认情况下，经过一段时间后 Notification 组件会自动关闭，但是通过设置
        <code>duration</code>，可以控制关闭的时间间隔，特别的是，如果设置为
        <code>0</code>，则不会自动关闭。注意：
        <code>duration</code>接收一个
        <code>Number</code>，单位为毫秒，默认为
        <code>4500</code>。
    </p>
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
            <el-button plain @click="open1">可自动关闭</el-button>
            <el-button plain @click="open2">不会自动关闭</el-button>
            open1() {
                const h = this.$createElement;
                this.$notify({
                    title: "标题名称",
                    message: h(
                        "i", {
                            style: "color: teal"
                        },
                        "这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案"
                    )
                });
            },

            open2() {
                this.$notify({
                    title: "提示",
                    message: "这是一条不会自动关闭的消息",
                    duration: 0
                });
            }

            `
        }
    },
    methods: {
        open1() {
            const h = this.$createElement;
            this.$notify({
                title: "标题名称",
                message: h(
                    "i", {
                        style: "color: teal"
                    },
                    "这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案"
                )
            });
        },

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
