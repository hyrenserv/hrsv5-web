<template>
  <div>
    <el-row>
        <el-button class="elButton">默认按钮</el-button>
    </el-row>
    <p><strong>设置颜色：</strong>在el-button中设置<code>type</code>属性值，例如type="success"，type属性值有primary / success / warning / danger / info / text</p>
    <p><strong>设置大小：</strong>在el-button中设置<code>size</code>属性值，例如size="mini"，type属性值有medium / small / mini	</p>
    <p><strong>设置为朴素按钮：</strong>在el-button中设置<code>plain</code>，此时按钮只带边框没有颜色</p>
    <p><strong>设置边框圆角：</strong>在el-button中设置<code>round</code></p>
    <p><strong>设置按钮圆形：</strong>在el-button中设置<code>circle</code></p>
    <p><strong>设置按钮禁用：</strong>在el-button中设置<code>disabled</code></p>
    <p><strong>设置没有边框和背景色：</strong>在el-button中设置<code> type="text"</code></p>
    <el-collapse>
      <el-collapse-item title="显示代码" name="1">
        <el-input
          type="textarea"
          :autosize="{ minRows: 25, maxRows: 4}"
          readonly
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      textarea2: `
                <template>
                   <div>
                    <el-row>
                        <el-button>默认按钮</el-button>
                        <el-button type="primary">主要按钮</el-button>
                        <el-button type="success">成功按钮</el-button>
                        <el-button type="info">信息按钮</el-button>
                        <el-button type="warning">警告按钮</el-button>
                        <el-button type="danger">危险按钮</el-button>
                    </el-row>
                   </div>
                </template>
            `
    };
  }
};
</script>
<style scoped>

</style>
