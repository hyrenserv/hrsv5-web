<template>
<el-steps :active='active' finish-status="success" align-center style="margin: 10px 60px 20px 60px;">
    <el-step title="步骤 1" description="卸数配置定义"></el-step>
    <el-step title="步骤 2" description="数据表定义"></el-step>
    <el-step title="步骤 3" description="数据转存"></el-step>
    <el-step title="步骤 4" description="定义清洗规则"></el-step>
    <el-step title="步骤 5" description="定义存储目的地"></el-step>
    <el-step title="步骤 6" description="定义启动方式"></el-step>
</el-steps>
</template>

<script>
export default {
    props: ['active'],

}
</script>
