<template>
<el-steps :active="active" finish-status="success" align-center style="margin: 10px 0 20px 0;">
    <el-step title="步骤 1" description="采集任务设置"></el-step>
    <el-step title="步骤 2" description="采集文件设置"></el-step>
</el-steps>
</template>

<script>
export default {
    props: ['active'],

}
</script>
