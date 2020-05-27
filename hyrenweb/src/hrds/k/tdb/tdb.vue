<template>
<div>
    <el-row class='topTitle'>
        <span class='el-icon-location'>表数据对标</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>

    </el-row>
    <el-row :gutter="20">
        <el-col :span="6">
            <tbTree ref='treefun' v-on:eventName="myFunction" :blongs='blongs'></tbTree>
        </el-col>
        <el-col :span="18">
            <el-table :data="dataByTableName" stripe border size="medium">
                <el-table-column v-for="(index, item) in dataByTableName[0]" :key="dataByTableName.$index" :label="item" :prop="item" show-overflow-tooltip min-width="210">
                    <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                    <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
import tbTree from '../../components/tree/tree.vue';
export default {
    name: 'tree',
    components: {
        tbTree,
    },
    data() {
        return {
            blongs: 'websql', //哪个页面使用的组件传对应后台需要的参数
            dataByTableName: [],
        }
    },
    methods: {
        myFunction: function (data) {
            this.dataByTableName = data //得到对应数据，自行处理数据
        }
    }
}
</script>

<style scoped>

</style>
