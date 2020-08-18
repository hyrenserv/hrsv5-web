<template>
<el-steps :active='active' finish-status="success" align-center style="margin: 10px 60px 20px 60px;">
    <el-step title="步骤 1" description="配置数据库属性"></el-step>
    <el-step title="步骤 2"  description="定义表采集属性"></el-step>
    <el-step title="步骤 3"  description="定义存储目的地"></el-step>
    <el-step title="步骤 4"  description="定义启动方式"></el-step>
</el-steps>
</template>

<script>
export default {
    props: ['active'],

}
</script>
