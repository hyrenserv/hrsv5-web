<template>
  <div>
    <el-button plain @click="open1">成功</el-button>
    <el-button plain @click="open2">警告</el-button>
    <el-button plain @click="open3">消息</el-button>
    <el-button plain @click="open4">错误</el-button>
    <!-- <el-button plain @click="open5">隐藏关闭按钮</el-button> -->
    <p>通过在methods事件中设置的<code>type</code>属性，设定通知的类型</p>
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
            <template>
                <div>
                    <el-button plain @click="open1">成功</el-button>
                    <el-button plain @click="open2">警告</el-button>
                    <el-button plain @click="open3">消息</el-button>
                    <el-button plain @click="open4">错误</el-button>
                </div>
            </template>

            <script>
            export default {
                methods: {
                open1() {
                    this.$notify({
                    title: '成功',
                    message: '这是一条成功的提示消息',
                    type: 'success',
                    duration: 0
                    });
                },

                open2() {
                    this.$notify({
                    title: '警告',
                    message: '这是一条警告的提示消息',
                    type: 'warning',
                    duration: 0
                    });
                },

                open3() {
                    this.$notify.info({
                    title: '消息',
                    message: '这是一条消息的提示消息',
                    duration: 0
                    });
                },

                open4() {
                    this.$notify.error({
                    title: '错误',
                    message: '这是一条错误的提示消息',
                    duration: 0
                    });
                }
                }
            }
            <\/script>
            
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
