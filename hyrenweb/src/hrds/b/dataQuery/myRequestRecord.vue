<template>
    <div>
        <el-row>
            <span class="el-icon-s-management" style="color: #3a8ee6; margin-left: 10px">我的申请列表</span>
            <router-link to="dataQuery">
                <el-button type="primary" size="small" style="float: right; margin-right: 10px">返回</el-button>
            </router-link>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row class="borderStyle bottomMargin" style="width: 80%; margin-left: 10%">
            <el-form :inline="true" ref="form" :model="myApplyRecordForm" label-width="100px" size="medium">
                <el-form-item label="文件名称">
                    <el-input v-model="myApplyRecordForm.original_name" clearable/>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-date-picker v-model="myApplyRecordForm.apply_date" type="date" placeholder="申请日期"
                                    value-format="yyyyMMdd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="申请类型">
                    <el-select v-model="myApplyRecordForm.apply_type" clearable placeholder="选择申请类型">
                        <el-option v-for="item in ApplyType" :label="item.value" :value="item.code"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-select v-model="myApplyRecordForm.auth_type" clearable placeholder="选择审核状态">
                        <el-option v-for="item in AuthType" :label="item.value" :value="item.code"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-icon-search" @click="myApplyRecordOnSubmit()">查询
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row style="width: 80%; margin-left: 10%">
            <el-table
                    :data="myApplyRecordData.slice((myApplyRecordForm.currPage - 1) * myApplyRecordForm.pageSize,
                    myApplyRecordForm.currPage * myApplyRecordForm.pageSize)">
                <el-table-column type="index" prop="date" label="序号" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{scope.$index+(myApplyRecordForm.currPage - 1) * myApplyRecordForm.pageSize + 1}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="original_name" label="文件名" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <p>{{ scope.row.title }}</p>
                            <div slot="reference">{{ scope.row.original_name }}</div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="file_suffix" label="文件后缀名" align="center"/>
                <el-table-column label="文件类型" align="center">
                    <template slot-scope="scope">
                        <template v-for="item in FileType">
                            <template v-if="scope.row.file_type === item.code">{{item.value}}</template>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" align="center">
                    <template slot-scope="scope">{{scope.row.apply_date}} {{scope.row.apply_time}}</template>
                </el-table-column>
                <el-table-column label="审核人">
                    <template slot-scope="scope">{{scope.row.audit_name}}</template>
                </el-table-column>
                <el-table-column label="审核时间">
                    <template slot-scope="scope">{{scope.row.audit_date}} {{scope.row.audit_time}}</template>
                </el-table-column>
                <el-table-column label="申请类型">
                    <template slot-scope="scope">
                        <template v-for="item in ApplyType">
                            <template v-if="scope.row.apply_type === item.code">{{item.value}}</template>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <template v-for="item in AuthType">
                            <template v-if="scope.row.auth_type === item.code">{{item.value}}</template>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <!-------------------------------- AuthType 0:审核中 -------------------------------->
                        <template v-if="scope.row.auth_type === '0'">
                            <a class="linkStyle text-warning" href="javascript:void(0)" type="button">等待审核中</a>
                        </template>
                        <!-------------------------------- AuthType 2:不允许 -------------------------------->
                        <template v-else-if="scope.row.auth_type === '2'">
                            <a class="linkStyle text-primary" href="javascript:void(0)" type="button"
                               @click="applyForAgain(scope.row.file_id,scope.row.apply_type)">重新申请</a>
                        </template>
                        <!-------------------------------- AuthType 1:允许或者 3:允许一次 -------------------->
                        <template v-else>
                            <!-------------------------------- ApplyType 3:发布 ----------------------------->
                            <template v-if="scope.row.apply_type === '3'">
                                <a class="linkStyle text-success" href="javascript:void(0)" type="button">已发布</a>
                            </template>
                            <!-------------------------------- ApplyType 2:下载 ----------------------------->
                            <template v-else-if="scope.row.apply_type === '2'">
                                <a class="linkStyle text-success" href="javascript:void(0)" type="button"
                                   @click="downloadFile(scope.row.file_id,scope.row.original_name)">下载</a>
                            </template>
                            <!-------------------------------- ApplyType 1:查看或者4:重命名 ------------------>
                            <template v-else>
                                <a class="linkStyle text-success" href="javascript:void(0)" type="button"
                                   @click="viewFile(scope.row.file_id, scope.row.file_type)">查看</a>
                            </template>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="myApplyRecordForm.currPage" :page-sizes="[5, 10, 50, 100, 500]"
                           :page-size="myApplyRecordForm.pageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="myApplyRecordData.length">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
    import * as dataQuery from "./dataQuery";
    import * as fileOperations from '../../../utils/js/fileOperations'

    export default {
        data() {
            return {
                myApplyRecordForm: {
                    original_name: '', apply_date: '', apply_type: '', auth_type: '', currPage: 1, pageSize: 5,
                    totalSize: 0,
                },
                AuthType: [],
                ApplyType: [],
                FileType: [],
                myApplyRecordData: [],
            }
        },
        created() {
            /* 获取代码项配置 */
            dataQuery.getCategoryItems({'category': 'FileType'}).then((res) => {
                if (res.success) {
                    this.FileType = res.data;
                } else this.$message({type: 'error', message: res.message,})
            });
            dataQuery.getCategoryItems({'category': 'AuthType'}).then((res) => {
                if (res.success) {
                    this.AuthType = res.data;
                } else this.$message({type: 'error', message: res.message,})
            });
            dataQuery.getCategoryItems({'category': 'ApplyType'}).then((res) => {
                if (res.success) {
                    this.ApplyType = res.data;
                } else this.$message({type: 'error', message: res.message,})
            });
        },
        mounted() {
            /* 初始化显示数据 */
            dataQuery.myApplyRecord(this.myApplyRecordForm).then((res) => {
                if (res.success) {
                    this.myApplyRecordData = res.data.file_rs;
                } else this.$message({type: 'error', message: res.message,})
            });
        },
        methods: {
            /* 设置每页显示条数 */
            handleSizeChange(pageSize) {
                this.myApplyRecordForm.pageSize = pageSize;
                this.myApplyRecordOnSubmit();
            },
            /* 查询页面 */
            handleCurrentChange(currPage) {
                this.myApplyRecordForm.currPage = currPage;
                this.myApplyRecordOnSubmit();
            },
            /* 自定义条件查询 */
            myApplyRecordOnSubmit() {
                console.log(this.myApplyRecordForm.currPage);
                dataQuery.myApplyRecord(this.myApplyRecordForm).then((res) => {
                    if (res.success) {
                        this.myApplyRecordData = res.data.file_rs;
                    } else this.$message({type: 'error', message: res.message,})
                });
            },
            /* 权限申请 */
            applyForAgain(fileId, apply_type) {
                this.$confirm('确认申请吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    dataQuery.applicationProcessing({"fileId": fileId, "applyType": apply_type}).then((res) => {
                        if (res.success) {
                            dataQuery.myApplyRecord(this.myApplyRecordForm).then((res) => {
                                if (res.success) {
                                    this.myApplyRecordData = res.data.file_rs;
                                } else this.$message({type: 'error', message: res.message,})
                            })
                        } else this.$message({type: 'error', message: res.message,})
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消申请!'});
                });
            },
            /* 查看文件 */
            viewFile(fileId, fileType) {
                console.log(fileId, fileType);
                dataQuery.viewFile({"fileId": fileId, "fileType": fileType,}).then((res) => {
                    if (res.success) {
                        console.log(res.data)
                    } else this.$message({type: 'error', message: res.message,})
                })
            },
            /* 下载文件 */
            downloadFile(file_id, original_name) {
                dataQuery.downloadFile({'fileId': file_id, 'fileName': original_name}).then((res) => {
                    if (res.success) {
                        // 转换数据流为文件
                        fileOperations.fileDownload(file_id, original_name)
                    } else this.$message({type: 'error', message: res.message,})
                })
            },
        }
    }
</script>
<style>
    /* form边框 */
    .borderStyle {
        border: 1px solid #e6e6e6;
        padding: 2%;
        width: 100%;
    }

    /* 超链接样式 */
    .linkStyle {
        text-decoration: none;
    }

    /* 成功文本 */
    .text-success {
        color: #67C23A;
    }

    /* 警告文本 */
    .text-warning {
        color: #8a6d3b;
    }

    .text-primary {
        color: #409EFF;
    }

    /* 底部边距 */
    .bottomMargin {
        margin-bottom: 1%;
        margin-left: 10px;
    }

    /* 分页组件居中 */
    .el-pagination {
        text-align: center;
    }
</style>
