<template>
  <div>
    <el-button plain @click="open1">成功</el-button>
    <el-button plain @click="open2">警告</el-button>
    <el-button plain @click="open3">消息</el-button>
    <el-button plain @click="open4">错误</el-button>
    <!-- <el-button plain @click="open5">隐藏关闭按钮</el-button> -->
    <p>
      Element 为 Notification 组件准备了四种通知类型：
      <code>success</code>,
      <code>warning</code>,
      <code>info</code>,
      <code>error</code>。通过
      <code>type</code>字段来设置，除此以外的值将被忽略。同时，我们也为 Notification 的各种 type 注册了方法，可以在不传入
      <code>type</code>字段的情况下像
      <code>open3</code>和
      <code>open4</code>那样直接调用。
    </p>
    <el-collapse>
      <el-collapse-item title="显示代码" name="1">
        <el-input
          type="textarea"
          :autosize="{ minRows: 25, maxRows: 4}"
          readonly
          v-model="textarea2"
        ></el-input>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea2: `
            <el-button plain @click="open1">成功</el-button>
            <el-button plain @click="open2">警告</el-button>
            <el-button plain @click="open3">消息</el-button>
            <el-button plain @click="open4">错误</el-button>
            open1() {
                this.$notify({
                    title: "成功",
                    message: "这是一条成功的提示消息",
                    type: "success",
                    duration: 0
                });
            },

            open2() {
                this.$notify({
                    title: "警告",
                    message: "这是一条警告的提示消息",
                    type: "warning",
                    duration: 0
                });
            },

            open3() {
                this.$notify.info({
                    title: "消息",
                    message: "这是一条消息的提示消息",
                    duration: 0
                });
            },

            open4() {
                this.$notify.error({
                    title: "错误",
                    message: "这是一条错误的提示消息",
                    duration: 0
                });
            },
            
            `
    };
  },
  methods: {
    open1() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success",
        duration: 0
      });
    },

    open2() {
      this.$notify({
        title: "警告",
        message: "这是一条警告的提示消息",
        type: "warning",
        duration: 0
      });
    },

    open3() {
      this.$notify.info({
        title: "消息",
        message: "这是一条消息的提示消息",
        duration: 0
      });
    },

    open4() {
      this.$notify.error({
        title: "错误",
        message: "这是一条错误的提示消息",
        duration: 0
      });
    },
   /*  open5() {
      this.$notify.success({
        title: "Info",
        message: "这是一条没有关闭按钮的消息",
        // showClose: false,
        duration: 0
      });
    } */
  }
};
</script>
