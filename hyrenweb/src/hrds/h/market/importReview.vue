<template>
    <div id='bbgl'>
        <el-row class='topTitle'>
            <span class='el-icon-location'>加工导入审核</span>
            <router-link  to="/dataMart">            
                <el-button class="goIndex" type="primary" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
            <el-button type="success" size="mini" @click="upload"
                       style="position: relative;float: right;right: 20px;">审核
            </el-button>
        </el-row>
        <el-row>基本信息</el-row>
        <el-divider/>
        <el-row>
            <el-col v-if="tableData.dm_info!==undefined && tableData.dm_info!==''">
                加工工程差异 ：<p>{{tableData.dm_info}}</p>
            </el-col>
            <el-col v-if="tableData.dm_datatable!==undefined && tableData.dm_datatable!==''">
                数据表差异：<p v-for="(item,index) in tableData.dm_datatable">{{item}}</p>
            </el-col>
            <el-col v-if="tableData.dm_category!==undefined && tableData.dm_category!==''">
                加工分类差异： <p v-for="(item,index) in tableData.dm_category">{{item}}</p>
            </el-col>
            <el-col v-if="tableData.datatable_field_info!==undefined && tableData.datatable_field_info!==''">
                加工数据表字段差异：<p v-for="(item,index) in tableData.datatable_field_info">{{item}}</p>
            </el-col>
            <el-col v-if="tableData.dm_operation_info!==undefined && tableData.dm_operation_info!==''">
                加工数据操作差异：<p v-for="(item,index) in tableData.dm_operation_info">{{item}}</p>
            </el-col>
            <el-col v-if="tableData.dm_relevant_info!==undefined && tableData.dm_relevant_info!==''">
                加工前后置作业差异：<p v-for="(item,index) in tableData.dm_relevant_info">{{item}}</p>
            </el-col>
        </el-row>
        <!-----------------------------表作业影响--------------------------->
        <el-divider/>
        <el-row>
            <el-col>表作业影响</el-col>
            <el-col>
                <el-carousel indicator-position="outside" height="500px">
                    <el-carousel-item v-for="item in etlJob" :key="item.tableName">
                        <h3>{{ item.tableNameem }}</h3>
                        <div :id="item.tableName" :style="{width: '100%', height: '500px'}"></div>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <!-----------------------------表影响--------------------------->
        <el-divider/>
        <el-row>
            <el-col>表影响</el-col>
            <el-col>
                <el-carousel indicator-position="outside" height="500px">
                    <el-carousel-item v-for="item in dclTable" :key="item.tableName">
                        <h3>{{ item.tableNameem }}</h3>
                        <div :id="item.tableName" :style="{width: '100%', height: '500px'}"></div>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as functionAll from "./marketAction";
    import * as message from "@/utils/js/message";
    import jsMind from 'jsmind';
    import Loading from '../../components/loading'

    require('@/assets/css/jsmind.css');
    export default {
        data() {
            return {
                tableData: {},
                dclTable: [],
                etlJob: [],
            }
        },
        mounted() {
            this.getImportReviewData(this.$route.query.file_path);
        },
        methods: {
            getImportReviewData(file_path) {
                functionAll.getImportReviewData({"file_path": file_path}).then(res => {
                    this.tableData = res.data;
                    for (let key in res.data.jobInfluence) {
                        let obj = {}
                        obj['etlData'] = res.data.jobInfluence[key]
                        obj['tableName'] = 'jobName ' + key;
                        this.etlJob.push(obj)
                    }
                    for (let key in res.data.tableInfluence) {
                        let obj = {}
                        obj['etlData'] = res.data.tableInfluence[key]
                        obj['tableName'] = 'tableName' + key;
                        this.dclTable.push(obj)
                    }
                    setTimeout(() => {
                        this.etlJob.map(item => {
                            this.load_jsmind(item.tableName, item.etlData)
                        })
                        this.dclTable.map(item => {
                            this.load_jsmind(item.tableName, item.etlData)
                        })
                    }, 1000)
                });
            },
            upload() {
                this.isLoading = true;
                message.confirmMsg('确定审核吗').then(res => {
                    functionAll.uploadFile({"file_path": this.$route.query.file_path}).then(res => {
                        this.isLoading = false;
                        if (res && res.success) {
                            message.customizTitle("审核成功", "success");
                        }
                    });
                }).catch(() => {
                })
            },
            load_jsmind(id, data) {
                let options = {
                    container: id,
                    editable: false,
                    theme: 'primary'
                }
                let mind = {
                    'meta': {},
                    'format': 'node_array',
                    'data': data
                }
                jsMind.show(options, mind)
            },
        }
    }
</script>

<style scoped>

</style>
