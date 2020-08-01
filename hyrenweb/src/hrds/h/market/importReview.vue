<template>
    <div id='bbgl'>
        <el-row class='topTitle'>
            <span class='el-icon-location'>集市导入审核</span>
            <router-link  to="/dataMart">            
                <el-button type="primary"  size="small"  class="goIndex">
                      <i class="fa fa-home fa-lg"></i>返回首页             
                </el-button>
                     
            </router-link>
            <el-button type="success" size="mini" @click="uploadBtn"
                       style="position: relative;float: right;right: 20px;">审核
            </el-button>
        </el-row>
        <el-dialog title="审核" :visible.sync="dialogImportData" >
            <span>确认审核?</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogImportData=false" size="mini" type="danger">取消</el-button>
                <el-button type="primary" @click="upload" size="mini">确定</el-button>
            </div>
        </el-dialog>
        <el-row>
            <el-col style="text-align: left;">基本信息</el-col>
            <p v-if="tableData.dm_info!=''">集市工程差异 ：{{tableData.dm_info}}</p>
            <el-col v-if="tableData.dm_datatable!=''">数据表差异：<p
                    v-for="(item,index) in tableData.dm_datatable">{{item}}</p></el-col>
            <el-col v-if="tableData.dm_category!=''">集市分类差异： <p
                    v-for="(item,index) in tableData.dm_category">{{item}}</p></el-col>
            <el-col v-if="tableData.datatable_field_info!=''"> 集市数据表字段差异：<p
                    v-for="(item,index) in tableData.datatable_field_info">{{item}}</p></el-col>
            <el-col v-if="tableData.dm_operation_info!=''">集市数据操作差异：<p
                    v-for="(item,index) in tableData.dm_operation_info">{{item}}</p></el-col>
            <el-col v-if="tableData.dm_relevant_info!=''">集市前后置作业差异：<p
                    v-for="(item,index) in tableData.dm_relevant_info">{{item}}</p></el-col>
        </el-row>
        <el-row>
            <el-divider></el-divider>
            <el-row>
                <h3>上下游作业影响</h3>
            </el-row>
            <!-- <h3 class="medium">{{ item }}</h3> -->
            <el-carousel indicator-position="outside" height="500px">
                <el-carousel-item v-for="item in etlJob" :key="item.tableName">
                    <h3>{{ item.tableNameem }}</h3>
                    <div :id="item.tableName" :style="{width: '100%', height: '500px'}"></div>
                </el-carousel-item>
            </el-carousel>
        </el-row>
        <el-row>
            <el-divider></el-divider>
            <el-row>
                <h3>表影响</h3>
            </el-row>
            <el-carousel indicator-position="outside" height="500px">
                <el-carousel-item v-for="item in dclTable" :key="item.tableName">
                    <h3>{{ item.tableNameem }}</h3>
                    <div :id="item.tableName" :style="{width: '100%', height: '500px'}"></div>
                </el-carousel-item>
            </el-carousel>
        </el-row>
        <!-----------------------------表作业影响结束--------------------------->
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
                dialogImportData:false
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
            uploadBtn(){
                this.dialogImportData=true;
            },
            upload() {
                this.isLoading = true;
                functionAll.uploadFile({"file_path": this.$route.query.file_path}).then(res => {
                    this.isLoading = false;
                    if (res && res.success) {
                        this.$message({
                            type: "success",
                            message: "上传成功!"
                        });
                        this.dialogImportData=false;
                    }
                });
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
