<template>
    <div>
        <el-row class='topTitle'>
            <span>文件资源管理器</span>
            <router-link to="/collectmonitor">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row>
            <el-col style="width: 70%;">
                <el-row class="bottomMargin">
                    <el-col :span="5" :offset="1">
                        <el-button type="success" @click="routeToMyApply(apply_type_map.get('view').code)">
                            <el-row><span><el-badge :value="myViewRequest"/>次</span></el-row>
                            <el-row><i class="el-icon-search">我的查看申请</i></el-row>
                        </el-button>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-button type="primary" @click="routeToMyApply(apply_type_map.get('download').code)">
                            <el-row><span><el-badge :value="myDownloadRequest"/>次</span></el-row>
                            <el-row><i class="el-icon-download">我的下载申请</i></el-row>
                        </el-button>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-button type="warning" @click="routeToMyApply(apply_type_map.get('release').code)">
                            <el-row><span><el-badge :value="myPostApplication"/>次</span></el-row>
                            <el-row><i class="el-icon-upload">我的发布申请</i></el-row>
                        </el-button>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <router-link to="myRequestRecord">
                            <el-button type="info" size="medium">
                                <el-row><span><el-badge :value="myApplicationRecord"/>次</span></el-row>
                                <el-row><i class="el-icon-reading">我的申请记录</i></el-row>
                            </el-button>
                        </router-link>
                    </el-col>
                </el-row>
                <el-divider/>
                <el-row class="borderStyle bottomMargin">
                    <el-form :inline="true" ref="form" :model="queryForm" label-width="100px" size="medium">
                        <el-form-item label="数据源列表">
                            <el-select v-model="queryForm.sourceId" clearable placeholder="选择数据源"
                                       @change="getTaskIdByDataSourceId(queryForm.sourceId)"
                                       value="sourceId">
                                <el-option v-for="item in dataSourceList" :label="item.datasource_name"
                                           :value="item.source_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="任务列表">
                            <el-select v-model="queryForm.fcsId" clearable placeholder="选择任务"
                                       value="fcs_name">
                                <el-option v-for="item in taskList" :label="item.fcs_name" :value="item.fcs_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="采集日期">
                            <el-col :span="11">
                                <el-date-picker v-model="queryForm.startDate" type="date" placeholder="开始日期"
                                                value-format="yyyyMMdd" style="width: 100%;">
                                </el-date-picker>
                            </el-col>
                            <el-col class="line" :span="1" style="margin-left: 2%">--</el-col>
                            <el-col :span="11">
                                <el-date-picker v-model="queryForm.endDate" type="date" placeholder="结束日期"
                                                value-format="yyyyMMdd" style="width: 100%;">
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
                    <el-menu default-active="1001" class="el-menu-demo" mode="horizontal">
                        <el-menu-item v-for="i in file_type_list" v-if="i.code !== '1003'" :index="i.code"
                                      @click="fileClassificationQuery(i.code)">
                            <template v-if="i.code === '1001'"><i class="el-icon-menu"/>{{i.value}}</template>
                            <template v-if="i.code === '1002'"><i class="el-icon-picture"/>{{i.value}}</template>
                            <template v-if="i.code === '1004'"><i class="el-icon-video-camera"/>{{i.value}}</template>
                            <template v-if="i.code === '1005'"><i class="el-icon-service"/>{{i.value}}</template>
                            <template v-if="i.code === '1006'"><i class="el-icon-plus"/>{{i.value}}</template>
                        </el-menu-item>
                        <template v-else>
                            <el-submenu index="1003">
                                <template slot="title"><i class="el-icon-document"/>{{i.value}}</template>
                                <el-menu-item v-for="j in file_type_list_sub" :index="j.code"
                                              @click="fileClassificationQuery(j.code)">{{j.value}}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                    <el-table :data="recentFiles.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border
                              size="mini">
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
                                <el-row v-if="isOthersApply(scope.row.is_others_apply)">
                                    <!-------------------------------- 查看 -------------------------------->
                                    <el-col :span="8">
                                        <template v-if="isViewApply(scope.row.apply_type)">
                                            <!-- 包含有查看 -->
                                            <a v-if="isView(scope.row)" class="linkStyle text-success"
                                               href="javascript:void(0)"
                                               @click="viewFile(scope.row.file_id,scope.row.file_type)">查看</a>
                                            <a v-else class="linkStyle text-warning" href="javascript:void(0)">查看审核中</a>
                                        </template>
                                        <template v-else>
                                            <a href="javascript:void(0)" class="linkStyle text-primary"
                                               @click="applyFor(scope.row.file_id,apply_type_map.get('view').code,apply_type_map.get('view').value)">
                                                申请查看</a>
                                        </template>
                                    </el-col>
                                    <!-------------------------------- 下载 -------------------------------->
                                    <el-col :span=" 8">
                                        <template v-if="isDownloadApply(scope.row.apply_type)">
                                            <a v-if="isDownload(scope.row)"
                                               class="linkStyle text-success" href="javascript:void(0)"
                                               @click="downloadFile(scope.row.file_id,scope.row.original_name)">下载</a>
                                            <a v-else class="linkStyle text-warning" href="javascript:void(0)">下载审核中</a>
                                        </template>
                                        <template v-else>
                                            <a href="javascript:void(0)" class="linkStyle text-primary"
                                               @click="applyFor(scope.row.file_id,apply_type_map.get('download').code,apply_type_map.get('download').value)">申请下载</a>
                                        </template>
                                    </el-col>
                                    <!-------------------------------- 发布 -------------------------------->
                                    <el-col :span="8">
                                        <template v-if="isReleaseApply(scope.row.apply_type)">
                                            <a v-if="isRelease(scope.row)"
                                               class="linkStyle text-success" href="javascript:void(0)">已发布</a>
                                            <a v-else class="linkStyle text-warning" href="javascript:void(0)">发布审核中</a>
                                        </template>
                                        <template v-else>
                                            <a class="linkStyle text-primary" href="javascript:void(0)"
                                               @click="applyFor(scope.row.file_id,apply_type_map.get('release').code,apply_type_map.get('release').value)">申请发布</a>
                                        </template>
                                    </el-col>
                                </el-row>
                                <el-row v-else>
                                    <el-col :span="8">
                                        <a class="linkStyle text-primary" href="javascript:void(0)"
                                           @click="applyFor(scope.row.file_id,apply_type_map.get('view').code,apply_type_map.get('view').value)">申请查看</a>
                                    </el-col>
                                    <el-col :span="8">
                                        <a class="linkStyle text-primary" href="javascript:void(0)"
                                           @click="applyFor(scope.row.file_id,apply_type_map.get('download').code,apply_type_map.get('download').value)">申请下载</a>
                                    </el-col>
                                    <el-col :span="8">
                                        <a class="linkStyle text-success" href="javascript:void(0)">已发布</a>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="recentFiles.length">
                    </el-pagination>
                </el-row>
            </el-col>
            <el-col style="width: 27%; margin-left: 1%;">
                <el-row class="borderStyle bottomMargin" style="height: 310px;">
                    <el-col><span style="color: #909399">文件分类统计</span></el-col>
                    <el-col class="generalChart" style="margin-top: 10px">
                        <ve-pie :data="fcsChartData" :settings="fcsChartSettings"/>
                    </el-col>
                </el-row>
                <el-row class="borderStyle bottomMargin" style="height: 380px;">
                    <el-col><span style="color: #909399">最近七天采集数</span></el-col>
                    <el-col class="generalChart">
                        <ve-histogram :data="sdcChartData" :settings="sdcChartSettings"/>
                    </el-col>
                </el-row>
                <el-row class="borderStyle bottomMargin">
                    <el-col><span style="color: #909399">最近三次采集数</span></el-col>
                    <el-col class="generalChart">
                        <el-row v-for="item in last3FileCollections.topInfo">
                            <el-col>{{item.collectDate}}{{item.collectTime}}</el-col>
                            <el-col>{{item.collectName}}</el-col>
                            <el-col>采集{{item.collectSum}}个文件</el-col>
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
                //页面配置
                apply_type_list: [],
                apply_type_map: {},
                auth_type_list: [],
                auth_type_map: {},
                file_type_list: [],
                file_type_list_sub: [],
                file_type_map: {},
                //页面数据
                fcsChartSettings: {},
                fcsChartData: {columns: [], rows: [],},
                sdcChartSettings: {},
                sdcChartData: {columns: [], rows: [],},
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
                queryForm: {sourceId: '', fcsId: '', startDate: '', endDate: '',},
                recentData: [],
                recentFiles: [],
                fileClassifySum: [],
                sevenDayCollectFileSum: [],
                last3FileCollections: [],
            }
        },
        created() {
            //获取代码类型:数据申请类型
            this.getApplyType();
            //获取代码类型:权限类型
            this.getAuthType();
            //获取代码类型:文件类型
            this.getFileType();

        },
        computed: {},
        mounted() {
            /* 初始化显示数据 */
            dataQuery.getConditionalQuery(this.queryForm).then((res) => {
                this.recentData = res.data;
                this.recentFiles = res.data.file_rs;
                this.myViewRequest = res.data.myViewRequest;
                this.myDownloadRequest = res.data.myDownloadRequest;
                this.myPostApplication = res.data.myPostApplication;
                this.myApplicationRecord = res.data.myApplicationRecord;
                this.myRenameRequest = res.data.myRenameRequest;
            });
            /* 初始化数据源数据 */
            dataQuery.getFileDataSource().then((res) => {
                this.dataSourceList = res.data
            });
            /* 初始化文件分类统计数据 */
            dataQuery.getFileClassifySum().then((res) => {
                // 初始化图表显示样式
                this.fcsChartSettings = {radius: 80, offsetY: '150', selectedMode: 'single'};
                // 初始化 v-charts 图表数据
                this.fcsChartData.columns = ['file_type', 'sum_num'];
                this.fcsChartData.rows = res.data;
            });
            /* 初始化最近七天采集统计数据 */
            dataQuery.getSevenDayCollectFileSum().then((res) => {
                // 初始化图表显示样式
                this.sdcChartSettings = {
                    legendName: {'collectSum': '采集计数'},
                    yAxisType: ['KMB'],
                    yAxisName: ['(单位/个)'],
                };
                // 初始化 v-charts 图表数据
                this.sdcChartData.columns = ['collectDate', 'collectSum'];
                this.sdcChartData.rows = res.data;
            });
            /* 初始化最近三次采集任务信息数据 */
            dataQuery.getLast3FileCollections().then((res) => {
                this.last3FileCollections = res.data
            });
        },
        methods: {
            //获取数据申请类型信息
            getApplyType() {
                this.$Code.getCategoryItems({
                    'category': 'ApplyType'
                }).then(res => {
                    const map = new Map();
                    res.data.forEach(row => {
                        //处理为List
                        this.apply_type_list.push(row);
                        //处理为map
                        if (row.code === '1') map.set('view', row);
                        else if (row.code === '2') map.set('download', row);
                        else if (row.code === '3') map.set('release', row);
                        else if (row.code === '4') map.set('rename', row);
                    });
                    this.apply_type_map = map;
                });
            },
            //获取数据权限信息
            getAuthType() {
                this.$Code.getCategoryItems({
                    'category': 'AuthType'
                }).then(res => {
                    const map = new Map();
                    res.data.forEach(row => {
                        //处理为list
                        this.auth_type_list.push(row);
                        //处理为map
                        if (row.code === '1') map.set('YunXu', row);
                        else if (row.code === '2') map.set('BuYunXu', row);
                        else if (row.code === '3') map.set('YiCi', row);
                        else if (row.code === '0') map.set('ShenQing', row);
                    });
                    this.auth_type_map = map;
                });
            },
            //获取文件类型信息
            getFileType() {
                this.$Code.getCategoryItems({
                    'category': 'FileType'
                }).then(res => {
                    //处理数据申请类型信息为map类型
                    res.data.forEach(row => {
                        this.file_type_map[row.code] = row.value;
                        if (row.code === '1013' || row.code === '1023' || row.code === '1033' || row.code === '1043' ||
                            row.code === '1053' || row.code === '1063') {
                            this.file_type_list_sub.push(row);
                        } else {
                            this.file_type_list.push(row);
                        }
                    });
                });
            },
            /* 设置每页显示条数 */
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            /* 查询页面 */
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            /* 文件分类查询 */
            fileClassificationQuery(code) {
                this.recentFiles = [];
                const that = this;
                if (code !== '1001') {
                    this.recentData.file_rs.filter(function (param) {
                        if (param.file_type === code) {
                            that.recentFiles.push(param);
                        }
                    })
                } else {
                    this.recentFiles = this.recentData.file_rs;
                }
            },
            /* 自定义查询条件查询 */
            conditionalQueryOnSubmit() {
                dataQuery.getConditionalQuery(this.queryForm).then((res) => {
                    this.recentFiles = res.data.file_rs;
                })
            },
            /* 根据数据源id获取任务id */
            getTaskIdByDataSourceId(dataSourceId) {
                if (dataSourceId === '') {
                    this.taskList = [];
                    this.queryForm.fcsId = '';
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
                        if (res.success) {
                            dataQuery.getConditionalQuery(this.queryForm).then((res) => {
                                this.recentFiles = res.data.file_rs
                            })
                        }
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
            //是否是其他部门发布的文件
            isOthersApply(is_others_apply) {
                return is_others_apply === '0'
            },
            //是否包含查看
            isViewApply(apply_type) {
                return apply_type.indexOf(this.apply_type_map.get('view').code) !== -1
            },
            //是查看或者查看审核中
            isView(row) {
                return this.auth_type_map.get('YunXu').code === row.auth_type.split(',')[row.apply_type.split(',').indexOf(this.apply_type_map.get('view').code)]
                    || this.auth_type_map.get('YiCi').code === row.auth_type.split(',')[row.apply_type.split(',').indexOf(this.apply_type_map.get('view').code)];
            },
            //是否包含下载
            isDownloadApply(apply_type) {
                return apply_type.indexOf(this.apply_type_map.get('download').code) !== -1
            },
            //是下载或者下载审核中
            isDownload(row) {
                return this.auth_type_map.get('YunXu').code === row.auth_type.split(',')[row.apply_type.split(',').indexOf(this.apply_type_map.get('download').code)]
                    || this.auth_type_map.get('YiCi').code === row.auth_type.split(',')[row.apply_type.split(',').indexOf(this.apply_type_map.get('download').code)];
            },
            //是否包含发布
            isReleaseApply(apply_type) {
                return apply_type.indexOf(this.apply_type_map.get('release').code) !== -1
            },
            //是发布或者发布审核中
            isRelease(row) {
                return this.auth_type_map.get('YunXu').code === row.auth_type.split(',')[row.apply_type.split(',').indexOf(this.apply_type_map.get('release').code)];
            }
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
