<template>
  <div>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="已完成" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="进行中" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤 3"></el-step>
    </el-steps>

<el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
}
</script>

<style>

</style>