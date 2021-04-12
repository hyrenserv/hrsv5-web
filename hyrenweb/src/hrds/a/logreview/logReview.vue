<template>
<div class="logReview">
    <i class="el-icon-document"><span>用户列表</span></i>
    <el-divider />
    <el-form :inline="true" :model="formInline" label-width="120px" class="demo-form-inline">
        <el-form-item label="用户ID">
            <el-input v-model="formInline.user_id" clearable size="small" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="请求日期">
            <el-date-picker type="date" placeholder="请求日期" value-format="yyyyMMdd" clearable v-model="formInline.request_date" size="small" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="searchSystemLogByIdOrDate(1,10)">搜索</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="downloadSystemLog">日志下载</el-button>
        </el-form-item>
    </el-form>
    <!--用户信息列表展示-->
    <el-table :data="logInfoList" border style="width: 100%">
        <el-table-column label="序号" align="center" width="50px">
            <template slot-scope="scope">
                <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="browser_type" label="浏览器类型" align="left" width="100px" />
        <el-table-column prop="browser_version" label="浏览器版本" align="left" width="120px" show-overflow-tooltip />
        <el-table-column prop="system_type" label="系统类型" align="left" width="110px" />
        <el-table-column prop="remoteaddr" label="登陆 IP" align="left" width="130px" />
        <el-table-column prop="protocol" label="传输协议版本" align="left" width="110px" show-overflow-tooltip />
        <el-table-column prop="request_date" label="请求日期" align="center" width="100px" />
        <el-table-column prop="request_time" label="请求时间" align="left" width="80px" />
        <el-table-column prop="user_id" label="用户ID" align="left" width="70px" />
        <el-table-column prop="user_name" label="用户名称" align="left" width="110px" show-overflow-tooltip />
        <el-table-column prop="operation_type" label="操作内容" align="left" show-overflow-tooltip />
    </el-table>
    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalSize" class='locationcenter' />
    </el-row>
</div>
</template>

<script>
import * as logReviewFunctionAll from "./logReview"
import * as message from "@/utils/js/message";
import * as fixedAll from "@/utils/js/fileOperations";

export default {
    name: "logReview",
    data() {
        return {
            currPage: 1,
            pageSize: 10,
            totalSize: 0,
            logInfoList: [],
            formInline: {
                request_date: '',
                user_id: null
            },
            isSearch: true
        }
    },
    mounted() {
        this.searchSystemLogByPage(1, 10);
    },
    methods: {
        // 分页查看系统日志信息
        searchSystemLogByPage(currPage, pageSize) {
            let params = {};
            params["currPage"] = currPage;
            params["pageSize"] = pageSize;
            logReviewFunctionAll.searchSystemLogByPage(params).then(res => {
                if (res && res.success) {
                    for (let index = 0; index < res.data.length; index++) {
                        if (res.data[index].request_date) {
                            res.data[index].request_date = fixedAll.dateFormat(res.data[index].request_date);
                        }
                        if (res.data[index].request_time) {
                            res.data[index].request_time = fixedAll.hourFormat(res.data[index].request_time);
                        }
                    }
                    this.logInfoList = res.data;
                    if (res.data.length !== 0) {
                        this.totalSize = res.data[0].totalSize;
                    } else {
                        this.totalSize = 0;
                    }
                }
            })
        },
        // 根据用户ID或请求日期分页查询系统日志信息
        searchSystemLogByIdOrDate(currPage, pageSize) {
            if (this.isSearch) {
                this.currPage = 1;
            } else {
                this.currPage = currPage;
            }
            this.formInline["currPage"] = this.currPage;
            this.formInline["pageSize"] = pageSize;
            logReviewFunctionAll.searchSystemLogByIdOrDate(this.formInline).then(res => {
                if (res && res.success) {
                    for (let index = 0; index < res.data.length; index++) {
                        if (res.data[index].request_date) {
                            res.data[index].request_date = fixedAll.dateFormat(res.data[index].request_date);
                        }
                        if (res.data[index].request_time) {
                            res.data[index].request_time = fixedAll.hourFormat(res.data[index].request_time);
                        }
                    }
                    this.logInfoList = res.data;
                    if (res.data.length !== 0) {
                        this.totalSize = res.data[0].totalSize;
                    } else {
                        this.totalSize = 0;
                    }
                    this.isSearch = true;
                }
            })
        },
        // 下载系统日志
        downloadSystemLog() {
            message.confirmMsg('如果未填写过滤用户和请求日期,则下载全部日志信息').then(res => {
                logReviewFunctionAll.downloadSystemLog(this.formInline).then(res => {
                    let header = res.headers['content-disposition'];
                    this.filename = this.$Base64.decode(header.substring(header.indexOf("filename=") + 9));
                    const blob = new Blob([res.data], {
                        type: "application/msword"
                    });
                    if (window.navigator.msSaveOrOpenBlob) {
                        // 兼容IE10
                        navigator.msSaveBlob(blob, this.filename);
                    } else {
                        //  chrome/firefox
                        let aTag = document.createElement("a");
                        // document.body.appendChild(aTag);
                        // aTag.download = "SystemOperation";
                        aTag.download = this.filename;
                        aTag.href = URL.createObjectURL(blob);
                        if (aTag.all) {
                            aTag.click();
                        } else {
                            //  兼容firefox
                            var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            aTag.dispatchEvent(evt);
                        }
                        URL.revokeObjectURL(aTag.href);
                    }
                })
            }).catch(() => {})
        },
        //用户列表数据实现分页功能
        handleCurrentChangeList(currPage) {
            //把val赋给当前页面
            this.currPage = currPage;
            if (this.formInline.user_id == null && this.formInline.request_date == '') {
                this.searchSystemLogByPage(currPage, this.pageSize);
            } else {
                this.isSearch = false;
                this.searchSystemLogByIdOrDate(this.currPage, this.pageSize);
            }
        },
        // 改变每页显示条数
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            if (this.formInline.user_id == null && this.formInline.request_date == '') {
                this.searchSystemLogByPage(this.currPage, this.pageSize);
            } else {
                if (this.currPage * pageSize > this.totalSize) {
                    this.currPage = 1;
                }
                this.searchSystemLogByIdOrDate(this.currPage, this.pageSize);
            }
        },
    }
}
</script>

<style scoped>
.el-icon-document {
    font-size: 18px;
    text-align: center;
    color: #2196f3;
}

.locationcenter {
    text-align: center;
    margin-top: 5px;
}
</style>
