<template>
<div>
    <el-badge :value="200" :max="99" class="item">
        <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="100" :max="10" class="item">
        <el-button size="small">回复</el-button>
    </el-badge>
    <p>由<code>max</code>属性定义，它接受一个<code>Number</code>，需要注意的是，只有当<code>value</code>为<code>Number</code>时，它才会生效。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 4}" readonly v-model="demo"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        return {
            demo: `
            <el-badge :value="200" :max="99" class="item">
                <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="100" :max="10" class="item">
                <el-button size="small">回复</el-button>
            </el-badge>
            `
        };
    }
};
</script>

<style scoped>
.item {
    margin-top: 10px;
    margin-right: 40px;
}
</style>
