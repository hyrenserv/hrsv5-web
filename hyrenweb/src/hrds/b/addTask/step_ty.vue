<template>
<el-steps :active='active' finish-status="success" align-center style="margin: 10px 60px 20px 60px;">
    <el-step title="步骤 1" description="配置数据库属性"></el-step>
    <el-step title="步骤 2" description="选择表"></el-step>
</el-steps>
</template>

<script>
export default {
    props: ['active'],

}
</script>
