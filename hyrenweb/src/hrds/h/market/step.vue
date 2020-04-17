<template>
<el-steps :active='active' finish-status="success" align-center style="margin: 10px 60px 20px 60px;">
    <el-step title="步骤 1" description="集市工程基础配置"></el-step>
    <el-step title="步骤 2" description="配置表SQL，字段属性"></el-step>
    <el-step title="步骤 3" description="集市表配置完成"></el-step>
</el-steps>
</template>

<script>
export default {
    props: ['active'],

}
</script>
