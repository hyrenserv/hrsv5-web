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
                <el-input v-model="myApplyRecordForm.original_name" clearable />
            </el-form-item>
            <el-form-item label="申请日期">
                <el-date-picker v-model="myApplyRecordForm.apply_date" type="date" placeholder="申请日期" value-format="yyyyMMdd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="申请类型">
                <el-select v-model="myApplyRecordForm.apply_type" clearable placeholder="选择申请类型">
                    <el-option v-for="item in ApplyType" :key="item.code" :label="item.value" :value="item.code" />
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="myApplyRecordForm.auth_type" clearable placeholder="选择审核状态">
                    <el-option v-for="item in AuthType" :key="item.code" :label="item.value" :value="item.code" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search" @click="myApplyRecordOnSubmit()">查询
                </el-button>
            </el-form-item>
        </el-form>
    </el-row>
    <el-row style="width: 80%; margin-left: 10%">
        <el-table :data="myApplyRecordData">
            <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                <template slot-scope="scope">{{scope.$index+(currPage - 1) * pageSize + 1}}</template>
            </el-table-column>
            <el-table-column prop="original_name" label="文件名" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                        <p>{{ scope.row.title }}</p>
                        <div slot="reference">{{ scope.row.original_name }}</div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="file_suffix" label="文件后缀名" align="center" />
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
                        <a class="linkStyle text-primary" href="javascript:void(0)" type="button" @click="applyForAgain(scope.row.file_id,scope.row.apply_type)">重新申请</a>
                    </template>
                    <!-------------------------------- AuthType 1:允许或者 3:允许一次 -------------------->
                    <template v-else>
                        <!-------------------------------- ApplyType 3:发布 ----------------------------->
                        <template v-if="scope.row.apply_type === '3'">
                            <a class="linkStyle text-success" href="javascript:void(0)" type="button">已发布</a>
                        </template>
                        <!-------------------------------- ApplyType 2:下载 ----------------------------->
                        <template v-else-if="scope.row.apply_type === '2'">
                            <a class="linkStyle text-success" href="javascript:void(0)" type="button" @click="downloadFile(scope.row.file_id,scope.row.original_name)">下载</a>
                        </template>
                        <!-------------------------------- ApplyType 1:查看或者4:重命名 ------------------>
                        <template v-else>
                            <a class="linkStyle text-success" href="javascript:void(0)" type="button" @click="viewFile(scope.row.file_id, scope.row.file_type)">查看</a>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" @prev-click='preclickFun' @next-click='nextclickFun' :current-page="currPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
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
            currPage: 1,
            pageSize: 5,
            totalSize: 0,
            myApplyRecordForm: {
                original_name: '',
                apply_date: '',
                apply_type: '',
                auth_type: ''
            },
            AuthType: [],
            ApplyType: [],
            FileType: [],
            myApplyRecordData: [],
        }
    },
    created() {
        /* 获取代码项配置 */
        dataQuery.getCategoryItems({ 'category': 'FileType' }).then((res) => {
            if (res.success) {
                this.FileType = res.data;
            } else this.$Msg.customizTitle(res.message, 'error')
        });
        dataQuery.getCategoryItems({ 'category': 'AuthType' }).then((res) => {
            if (res.success) {
                this.AuthType = res.data;
            } else this.$Msg.customizTitle(res.message, 'error')
        });
        dataQuery.getCategoryItems({ 'category': 'ApplyType' }).then((res) => {
            if (res.success) {
                this.ApplyType = res.data;
            } else this.$Msg.customizTitle(res.message, 'error')
        });
    },
    mounted() {
        /* 初始化显示数据 */
        this.getMyApplyRecord(this.currPage, this.pageSize);
    },
    methods: {
        //获取申请记录数据
        getMyApplyRecord(currPage, pageSize) {
            this.myApplyRecordForm['currPage'] = currPage;
            this.myApplyRecordForm['pageSize'] = pageSize;
            dataQuery.myApplyRecord(this.myApplyRecordForm).then((res) => {
                if (res.success) {
                    this.myApplyRecordData = res.data.myApplyRecordRs;
                    this.totalSize = res.data.totalSize;
                } else {
                    this.$Msg.customizTitle(res.message, 'error')
                }
            });
        },
        /* 设置每页显示条数 */
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getMyApplyRecord(this.currPage, this.pageSize);
        },
        /* 查询页面 */
        handleCurrentChange(currPage) {
            this.currPage = currPage;
            this.getMyApplyRecord(this.currPage, this.pageSize);
        },
        /* 上一页 */
        preclickFun(currPage) {
            this.currPage = currPage;
        },
        /* 下一页 */
        nextclickFun(currPage) {
            this.currPage = currPage;
        },
        /* 自定义条件查询 */
        myApplyRecordOnSubmit() {
            this.currPage = 1;
            this.pageSize = 5;
            this.myApplyRecordForm['currPage'] = this.currPage;
            this.myApplyRecordForm['pageSize'] = this.pageSize;
            dataQuery.myApplyRecord(this.myApplyRecordForm).then((res) => {
                if (res.success) {
                    this.myApplyRecordData = res.data.myApplyRecordRs;
                    this.totalSize = res.data.totalSize;
                } else this.$Msg.customizTitle(res.message, 'error')
            });
        },
        /* 权限申请 */
        applyForAgain(fileId, apply_type) {
            this.$confirm('确认申请吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                dataQuery.applicationProcessing({ "fileId": fileId, "applyType": apply_type }).then((res) => {
                    if (res.success) {
                        dataQuery.myApplyRecord(this.myApplyRecordForm).then((res) => {
                            if (res.success) {
                                this.myApplyRecordData = res.data.myApplyRecordRs;
                            } else this.$Msg.customizTitle(res.message, 'error')
                        })
                    } else this.$Msg.customizTitle(res.message, 'error')
                })
            })
        },
        /* 查看文件 */
        viewFile(fileId, fileType) {
            this.$router.push({
                name: 'viewFile',
                query: {
                    'fileId': fileId,
                    "fileType": fileType,
                }
            })
        },
        /* 下载文件 */
        downloadFile(file_id, original_name) {
            dataQuery.downloadFile({
                'fileId': file_id,
                'fileName': original_name
            }).then((res) => {
                // 转换数据流为文件
                fileOperations.fileDownload(res.data, original_name)
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
