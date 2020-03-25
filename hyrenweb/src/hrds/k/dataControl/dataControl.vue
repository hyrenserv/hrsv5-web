<template>

    <div id='dataControl'>
        <el-row class='topTitle'>
            <span>数据管控</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
    </div>
</template>

<script>
    import * as dataControlFun from './dataControl'

    export default {
        components: {},

        data() {
            return {}
        },
        created() {
        },
        methods: {},
    }
</script>

<style>
</style>
