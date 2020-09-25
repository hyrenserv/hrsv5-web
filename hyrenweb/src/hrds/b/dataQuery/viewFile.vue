<template>
<div>
    <el-row class='topTitle'>
        <span>文件查看</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg" />返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row>
        <el-col :span="16" :offset="4">
            <el-row>
                <el-col :span="5" :offset="1">数据入库日期：{{viewData.storage_date}}</el-col>
                <el-col :span="5" :offset="1">数据入库时间：{{viewData.storage_time}}</el-col>
                <el-col :span="5" :offset="1">最后修改日期：{{viewData.original_update_date}}</el-col>
                <el-col :span="5" :offset="1">最后修改时间：{{viewData.original_update_time}}</el-col>
            </el-row>
            <el-row style="margin-top: 1%">
                <el-col :span="23" :offset="1">
                    <span v-html="viewData.file_content"></span>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as dataQuery from './dataQuery'
export default {
    name: "dataQuery",
    data() {
        return {
            viewData: {}
        }
    },
    created() {},
    computed: {},
    mounted() {
        //获取显示数据
        this.getViewFile()
    },
    methods: {
        /* 初始化显示数据 */
        getViewFile() {
            let fileId = this.$route.query.fileId;
            let fileType = this.$route.query.fileType;
            dataQuery.viewFile({
                "fileId": fileId,
                "fileType": fileType,
            }).then((res) => {
                if (res.success) {
                    // const url = window.URL.createObjectURL(res.data.file_content);
                    this.viewData = res.data
                }
            })
        },
    }
}
</script>
