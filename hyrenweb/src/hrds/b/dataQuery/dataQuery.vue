<template>
<div>
    <el-row class='topTitle'>
        <span>文件资源管理器</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row>
        <hr>
    </el-row>
    <el-row>
        <el-col style="width: 70%;">
            <el-row class="bottomMargin">
                <el-col :span="5" :offset="1">
                    <el-button type="primary" @click="routeToMyApply(recentData.xiazai,recentData.xiazai_zh)">
                        <el-row><span>
                                <el-badge :value="myDownloadRequest" />次</span></el-row>
                        <el-row><i class="el-icon-download" style="color: white;">我的下载申请</i></el-row>
                    </el-button>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-button type="warning" @click="routeToMyApply(recentData.fabu,recentData.fabu_zh)">
                        <el-row><span>
                                <el-badge :value="myPostApplication" />次</span></el-row>
                        <el-row><i class="el-icon-upload" style="color: white;">我的发布申请</i></el-row>
                    </el-button>
                </el-col>
                <el-col :span="5" :offset="1">
                    <router-link to="myRequestRecord">
                        <el-button type="success" size="medium">
                            <el-row><span>
                                    <el-badge :value="myApplicationRecord" />次</span>
                            </el-row>
                            <el-row><i class="el-icon-reading" style="color: white;">我的申请记录</i></el-row>
                        </el-button>
                    </router-link>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-button type="info" @click="routeToMyApply(recentData.chakan,recentData.chakan_zh)">
                        <el-row><span>
                                <el-badge :value="myViewRequest" />次</span></el-row>
                        <el-row><i class="el-icon-search" style="color: white;">我的查看申请</i></el-row>
                    </el-button>
                </el-col>
            </el-row>
            <el-row style="margin-right: -2%">
                <hr>
            </el-row>
            <el-row class="borderStyle bottomMargin">
                <el-form :inline="true" ref="form" :model="conditionalQueryForm" label-width="100px" size="medium">
                    <el-form-item label="数据源列表">
                        <el-select v-model="conditionalQueryForm.sourceId" clearable placeholder="选择数据源" @change="getTaskIdByDataSourceId(conditionalQueryForm.sourceId)" value="sourceId">
                            <el-option v-for="item in dataSourceList" :label="item.datasource_name" :value="item.source_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务列表">
                        <el-select v-model="conditionalQueryForm.fcsId" clearable placeholder="选择任务" value="fcs_name">
                            <el-option v-for="item in taskList" :label="item.fcs_name" :value="item.fcs_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采集日期">
                        <el-col :span="11">
                            <el-date-picker v-model="conditionalQueryForm.startDate" type="date" placeholder="开始日期" value-format="yyyyMMdd" style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1" style="margin-left: 2%">--</el-col>
                        <el-col :span="11">
                            <el-date-picker v-model="conditionalQueryForm.endDate" type="date" placeholder="结束日期" value-format="yyyyMMdd" style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="el-icon-search" @click="conditionalQueryOnSubmit()">查询
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="borderStyle bottomMargin">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1" @click="fileClassificationQuery(recentData.all)">
                        <i class="el-icon-menu" />{{recentData.all_zh}}
                    </el-menu-item>
                    <el-menu-item index="2" @click="fileClassificationQuery(recentData.tupian)">
                        <i class="el-icon-picture" />{{recentData.tupian_zh}}
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-document" />{{recentData.wendang_zh}}</template>
                        <el-menu-item index="3-1" @click="fileClassificationQuery(recentData.pdffile)">
                            {{recentData.pdffile_zh}}
                        </el-menu-item>
                        <el-menu-item index="3-2" @click="fileClassificationQuery(recentData.officefile)">
                            {{recentData.officefile_zh}}
                        </el-menu-item>
                        <el-menu-item index="3-3" @click="fileClassificationQuery(recentData.wenbenfile)">
                            {{recentData.wenbenfile_zh}}
                        </el-menu-item>
                        <el-menu-item index="3-4" @click="fileClassificationQuery(recentData.yasuofile)">
                            {{recentData.yasuofile_zh}}
                        </el-menu-item>
                        <el-menu-item index="3-5" @click="fileClassificationQuery(recentData.rizhifile)">
                            {{recentData.rizhifile_zh}}
                        </el-menu-item>
                        <el-menu-item index="3-6" @click="fileClassificationQuery(recentData.biaoshujufile)">
                            {{recentData.biaoshujufile_zh}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="4" @click="fileClassificationQuery(recentData.shipin)">
                        <i class="el-icon-video-camera" />{{recentData.shipin_zh}}
                    </el-menu-item>
                    <el-menu-item index="5" @click="fileClassificationQuery(recentData.yinpin)">
                        <i class="el-icon-service" />{{recentData.yinpin_zh}}
                    </el-menu-item>
                    <el-menu-item index="6" @click="fileClassificationQuery(recentData.other)">
                        <i class="el-icon-plus" />{{recentData.other_zh}}
                    </el-menu-item>
                </el-menu>
                <el-table :data="recentFiles.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border size="mini">
                    <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
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
                    <el-table-column prop="file_size" label="文件大小" align="center">
                    </el-table-column>
                    <el-table-column prop="file_suffix" label="文件后缀名" align="center">
                    </el-table-column>
                    <el-table-column prop="storage_date" label="入库时间" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="210px">
                        <template slot-scope="scope">
                            <el-row v-if="scope.row.is_others_apply === '0'">
                                <!-------------------------------- 查看 -------------------------------->
                                <el-col :span="8">
                                    <template v-if="scope.row.apply_type.indexOf(recentData.chakan) !== -1">
                                        <!-- 包含有查看 -->
                                        <a v-if="recentData.auth.includes(scope.row.auth_type.split(',')[scope.row.apply_type.split(',').indexOf(recentData.chakan)])" class="linkStyle text-success" href="javascript:void(0)" @click="viewFile(scope.row.file_id,scope.row.file_type)">查看</a>
                                        <a v-else class="linkStyle text-warning" href="javascript:void(0)">查看审核中</a>
                                    </template>
                                    <template v-else>
                                        <a href="javascript:void(0)" class="linkStyle text-primary" @click="applyFor(scope.row.file_id,recentData.chakan,recentData.chakan_zh)">申请查看</a>
                                    </template>
                                </el-col>
                                <!-------------------------------- 下载 -------------------------------->
                                <el-col :span=" 8">
                                    <template v-if="scope.row.apply_type.indexOf(recentData.xiazai) !== -1">
                                        <a v-if="recentData.auth.includes(scope.row.auth_type.split(',')[scope.row.apply_type.split(',').indexOf(recentData.xiazai)])" class="linkStyle text-success" href="javascript:void(0)" @click="downloadFile(scope.row.file_id,scope.row.original_name)">下载</a>
                                        <a v-else class="linkStyle text-warning" href="javascript:void(0)">下载审核中</a>
                                    </template>
                                    <template v-else>
                                        <a href="javascript:void(0)" class="linkStyle text-primary" @click="applyFor(scope.row.file_id,recentData.xiazai,recentData.xiazai_zh)">申请下载</a>
                                    </template>
                                </el-col>
                                <!-------------------------------- 发布 -------------------------------->
                                <el-col :span="8">
                                    <template v-if="scope.row.apply_type.indexOf(recentData.fabu) !== -1">
                                        <a v-if="recentData.auth.includes(scope.row.auth_type.split(',')[scope.row.apply_type.split(',').indexOf(recentData.fabu)])" class="linkStyle text-success" href="javascript:void(0)">已发布</a>
                                        <a v-else class="linkStyle text-warning" href="javascript:void(0)">发布审核中</a>
                                    </template>
                                    <template v-else>
                                        <a class="linkStyle text-primary" href="javascript:void(0)" @click="applyFor(scope.row.file_id,recentData.fabu,recentData.fabu_zh)">申请发布</a>
                                    </template>
                                </el-col>
                            </el-row>
                            <el-row v-else>
                                <el-col :span="8">
                                    <a class="linkStyle text-primary" href="javascript:void(0)" @click="applyFor(scope.row.file_id,recentData.chakan,recentData.chakan_zh)">申请查看</a>
                                </el-col>
                                <el-col :span="8">
                                    <a class="linkStyle text-primary" href="javascript:void(0)" @click="applyFor(scope.row.file_id,recentData.xiazai,recentData.xiazai_zh)">申请下载</a>
                                </el-col>
                                <el-col :span="8">
                                    <a class="linkStyle text-success" href="javascript:void(0)">已发布</a>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recentFiles.length">
                </el-pagination>
            </el-row>
        </el-col>
        <el-col style="width: 27%; margin-left: 1%;">
            <el-row class="borderStyle bottomMargin" style="height: 310px;">
                <el-col><span style="color: #909399">文件分类统计</span></el-col>
                <el-col class="generalChart" style="margin-top: 10px">
                    <ve-pie :data="fcsChartData" :settings="fcsChartSettings" />
                </el-col>
            </el-row>
            <el-row class="borderStyle bottomMargin" style="height: 380px;">
                <el-col><span style="color: #909399">最近七天采集数</span></el-col>
                <el-col class="generalChart">
                    <ve-histogram :data="sdcChartData" :settings="sdcChartSettings" />
                </el-col>
            </el-row>
            <el-row class="borderStyle bottomMargin">
                <el-col><span style="color: #909399">最近三次采集数</span></el-col>
                <el-col class="generalChart">
                    <el-row v-for="item in last3FileCollections.topInfo">
                        <el-col>{{item.collectdate}}</el-col>
                        <el-col>{{item.fcs_name}}</el-col>
                        <el-col>采集{{item.count}}个文件</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as dataQuery from './dataQuery'
import * as fileOperations from '../../../utils/js/fileOperations'

export default {
    name: "dataQuery",
    data() {
        return {
            fcsChartSettings: {},
            fcsChartData: {
                columns: [],
                rows: [],
            },
            sdcChartSettings: {},
            sdcChartData: {
                columns: [],
                rows: [],
            },
            currentPage: 1,
            pageSize: 5,
            totalSize: 0,
            activeIndex: '1',
            myDownloadRequest: 0,
            myPostApplication: 0,
            myApplicationRecord: 0,
            myViewRequest: 0,
            myRenameRequest: 0,
            dataSourceList: [],
            taskList: [],
            conditionalQueryForm: {
                sourceId: '',
                fcsId: '',
                startDate: '',
                endDate: '',
            },
            recentData: [],
            recentFiles: [],
            fileClassifySum: [],
            sevenDayCollectFileSum: [],
            last3FileCollections: [],
        }
    },
    mounted() {
        /* 初始化显示数据 */
        dataQuery.getConditionalQuery(this.conditionalQueryForm).then((res) => {
            res = fileOperations.getResTestData();
            this.recentData = res.data;
            this.recentFiles = res.data.file_rs;
            this.myDownloadRequest = res.data.down;
            this.myPostApplication = res.data.release;
            this.myApplicationRecord = res.data.sum;
            this.myViewRequest = res.data.look;
            this.myRenameRequest = res.data.rename;
        });
        /* 初始化数据源数据 */
        dataQuery.getFileDataSource().then((res) => {
            this.dataSourceList = res.data
        });
        /* 初始化文件分类统计数据 */
        dataQuery.getFileClassifySum().then((res) => {
            res = fileOperations.getFilesClassifyInfoData();
            this.fileClassifySum = res.data;
            // 初始化图表显示样式
            this.fcsChartSettings = {
                radius: 80,
                offsetY: '150',
                selectedMode: 'single',
            };
            // 初始化 v-charts 图表数据
            this.fcsChartData.columns = ['file_type', 'sum_num'];
            this.fcsChartData.rows = this.fileClassifySum;
        });
        /* 初始化最近七天采集统计数据 */
        dataQuery.getSevenDayCollectFileSum().then((res) => {
            res = fileOperations.getSevenDayCollectFileSum();
            this.sevenDayCollectFileSum = res.data;
            // 初始化图表显示样式
            this.sdcChartSettings = {
                legendName: {
                    'collectSum': '采集计数'
                },
                yAxisType: ['KMB'],
                yAxisName: ['(单位/个)'],
            };
            // 初始化 v-charts 图表数据
            this.sdcChartData.columns = ['collectDate', 'collectSum'];
            this.sdcChartData.rows = this.sevenDayCollectFileSum;
        });
        /* 初始化最近三次采集任务信息数据 */
        dataQuery.getLast3FileCollections().then((res) => {
            res = fileOperations.getLast3FileCollections();
            this.last3FileCollections = res.data
        });
    },
    methods: {
        /* 设置每页显示条数 */
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
        },
        /* 查询页面 */
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        /* 文件分类查询 */
        fileClassificationQuery(fileType) {
            this.recentFiles = [];
            const that = this;
            if (fileType !== this.recentData.all) {
                this.recentData.file_rs.filter(function (param) {
                    if (param.file_type === fileType) {
                        that.recentFiles.push(param);
                    }
                })
            } else this.recentFiles = this.recentData.file_rs;
        },
        /* 自定义查询条件查询 */
        conditionalQueryOnSubmit() {
            dataQuery.getConditionalQuery(this.conditionalQueryForm).then((res) => {
                this.recentFiles = res.data.fileRs;
            })
        },
        /* 根据数据源id获取任务id */
        getTaskIdByDataSourceId(dataSourceId) {
            if (dataSourceId === '') {
                this.taskList = [];
                this.conditionalQueryForm.fcsId = '';
            } else {
                dataQuery.getFileCollectionTask({
                    'sourceId': dataSourceId
                }).then((res) => {
                    this.taskList = res.data
                })
            }
        },
        /* 权限申请 */
        applyFor(fileId, apply_type, apply_type_zh) {
            this.$confirm('确认申请' + apply_type_zh + '吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                dataQuery.applicationProcessing({
                    "fileId": fileId,
                    "applyType": apply_type
                }).then((res) => {
                    dataQuery.getConditionalQuery(this.conditionalQueryForm).then((res) => {
                        this.recentFiles = res.data.fileRs
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消' + apply_type_zh + '申请!'
                });
            });
        },
        /* 查看文件 */
        viewFile(fileId, fileType) {
            dataQuery.viewFile({
                "fileId": fileId,
                "fileType": fileType,
            }).then((res) => {
                console.log(res.data)
            })
        },
        /* 下载文件 */
        downloadFile(file_id, original_name) {
            dataQuery.downloadFile({
                'fileId': file_id,
                'fileName': original_name
            }).then((res) => {
                // 转换数据流为文件
                fileOperations.fileDownload(file_id, original_name)
            })
        },
        /* 用户数据申请信息页面跳转 */
        routeToMyApply(apply_type) {
            this.$router.push({
                name: 'myApply',
                params: {
                    'apply_type': apply_type
                }
            })
        },
    }
}
</script>

<style scoped>
/* form边框 */
.borderStyle {
    border: 1px solid #e6e6e6;
    padding: 2%;
    width: 100%;
}

/* 底部边距 */
.bottomMargin {
    margin-bottom: 1%;
    margin-left: 10px;
}

/* 图表样式 */
.generalChart {
    width: 95%;
    height: 30%;
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

/* 分页组件居中 */
.el-pagination {
    text-align: center;
}
</style>
