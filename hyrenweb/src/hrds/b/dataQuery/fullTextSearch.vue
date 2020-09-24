<template>
<div>
    <el-row>
        <span class="el-icon-search" style="color: #3a8ee6"> 全文检索 </span>
    </el-row>
    <el-row>
        <hr>
    </el-row>
    <el-row>
        <el-col :span="8" :offset="8">
            <!-- 搜索条区域-->
            <el-form :inline="true" ref="form" :model="searchForm">
                <el-form-item>
                    <el-select v-model="searchForm.searchType">
                        <el-option label="全文检索" value="fullTextSearch" />
                        <!-- <el-option label="以图搜图" value="searchByMap" />
                        <el-option label="文章相似" value="articleSimilarityQuery" />
                        <el-option label="文件名搜索" value="fileNameSearch" /> -->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <template v-if="searchForm.searchType ==='fullTextSearch'">
                        <el-row>
                            <el-col :span="18">
                                <el-input type="text" placeholder="搜索" v-model="searchForm.queryKeyword" />
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" class="el-icon-search" style="margin-left: 10px" @click="searchOnSubmit()">查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-if="searchForm.searchType ==='searchByMap'">
                        <el-upload class="upload-demo" ref="upload" :fileList="fileList" :auto-upload="false" :limit="1" action="">
                            <el-button type="info" class="el-icon-plus" slot="trigger">选取文件</el-button>
                            <el-button type="success" class="el-icon-upload" style="margin-left: 10px;">
                                上传文件
                            </el-button>
                            <el-button type="primary" class="el-icon-search" @click="searchOnSubmit()">搜索
                            </el-button>
                        </el-upload>
                    </template>
                    <template v-if="searchForm.searchType ==='articleSimilarityQuery'">
                        <el-upload class="upload-demo" ref="upload" :fileList="fileList" :auto-upload="false" :limit="1" action="">
                            <el-button type="info" class="el-icon-plus" slot="trigger">选取文件</el-button>
                            <el-button type="success" class="el-icon-upload" style="margin-left: 10px;">
                                上传文件
                            </el-button>
                            <el-select style="margin-left: 10px" v-model="searchForm.search_way">
                                <el-option label="全文检索" value="fullText" />
                                <el-option label="逐文档匹配" value="documentMatching" />
                            </el-select>
                            <el-button style="margin-left: 10px" type="primary" class="el-icon-search" @click="searchOnSubmit()">搜索
                            </el-button>
                        </el-upload>
                    </template>
                    <template v-if="searchForm.searchType ==='fileNameSearch'">
                        <el-row>
                            <el-col :span="18">
                                <el-input type="text" placeholder="文件名" v-model="searchForm.fileName" />
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" style="margin-left: 10px" class="el-icon-search" @click="searchOnSubmit()">查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row>
        <!-- 内容展示区域-->
        <el-col :span="16" :offset="2">
            <template v-if="searchForm.searchType === 'searchByMap'">
                searchByMap
            </template>
            <template v-if="searchForm.searchType !== 'searchByMap'">
                <template v-if="searchFileInfo.result.length === 0">
                    <h4>抱歉，没有符合的结果！</h4>
                </template>
                <el-row v-for="data in searchFileInfo.result" :key="data.file_id" style="margin-top: 1%;">
                    <el-col>
                        <!-- 文件头 -->
                        <el-row style="margin-top: 1%;">
                            <template>
                                <h4>
                                    <p v-if="data.collect_type == searchFileInfo.collectType"><span>文件名: </span><span v-html="highLight(data.original_name)"></span></p>
                                    <p v-else><span>源表名：{{data.original_name}}</span></p>
                                </h4>
                                <hr>
                            </template>
                        </el-row>
                        <!-- 摘要 -->
                        <el-row style="margin-top: 1%;">
                            <template v-if="data.collect_type == searchFileInfo.collectType">
                                <p><span v-html="highLight(data.summary_content)"></span></p>
                            </template>
                            <!-- <template v-else>
                                <p id="{{data.file_id}}_span">
                                    <template v-for="csvList in data.csv">
                                        <template v-for="(key, value) in csvList">
                                            <template v-if="filterList.indexOf(key) == -1">
                                                <template v-if="dbValueList.indexOf(value) != -1">
                                                    <span :key="key"><span><strong>{{key}}</strong> : <span style="color:red"><strong>{{value}}</strong></span></span></span>
                                                </template>
                                                <template v-else>
                                                    {{key}} : {{value}}
                                                </template>
                                            </template>
                                        </template>
                                    </template>
                                </p>
                                <ul id="{{data.file_id}}_ul">
                                    <template v-for="csvList in data.csv">
                                        <template v-for="(key, value) in csvList">
                                            <template v-if="filterList.indexOf(key) == -1">
                                                <template v-if="dbValueList.indexOf(value) != -1">
                                                    <li :key="key"><span><strong>{{key}}</strong> : <span style="color:red"><strong>{{value}}</strong></span></span></li>
                                                </template>
                                                <template v-else>
                                                    <li :key="key"><span><strong>{{key}}</strong> : <span>{{value}}</span></span></li>
                                                </template>
                                            </template>
                                        </template>
                                    </template>
                                </ul>
                            </template> -->
                        </el-row>
                        <!-- 操作信息 -->
                        <el-row style="margin-top: 1%;">
                            <el-col :span="5">
                                <template>
                                    <p class="text_info"><span class="el-icon-date">入库时间: {{data.collectTime}}</span></p>
                                </template>
                            </el-col>
                            <el-col :span="10">
                                <template>
                                    <a class="text_url" href="javascript:void(0);" @click="downLoadFile(data.file_id,data.original_name);">
                                        <i class="el-icon-download"> {{data.downloadPath.substr(0,7)}}...{{data.downloadPath.substr(data.downloadPath.length-32)}}</i>
                                    </a>
                                </template>
                            </el-col>
                            <el-col :span="3">
                                <a class="text_analysis" href="javascript:void(0);" @click="analysis(data.file_id,data.original_name)"><i class="el-icon-s-opportunity">文本分析</i></a>
                            </el-col>
                            <el-col :span="4">
                                <template v-if="data.fav_flag ==='' || 'undefined' === typeof data.fav_flag">
                                    <a class="text_analysis" href="javascript:void(0);" @click="saveFavoriteFile(data.file_id,data.original_name)">
                                        <i class="el-icon-star-on">收藏</i>
                                    </a>
                                </template>
                                <template v-else>
                                    <a class="text_analysis" href="javascript:void(0);" @click="cancelFavoriteFile(data.fav_id,data.original_name)">
                                        <i class="el-icon-star-off">取消收藏</i>
                                    </a>
                                </template>
                            </el-col>
                            <el-col :span="2">
                                <a class="text_analysis" href="javascript:void(0)" @click="viewFile(data.file_id)">查看详情</a>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 1%;">
                            <hr style="border: 1px dashed #ddd" width="80%">
                        </el-row>
                    </el-col>
                </el-row>

            </template>
        </el-col>
        <el-col :span="5" :offset="1">
            <el-row>
                <template>我的收藏</template>
            </el-row>
            <el-row v-for="collectFile in collectFiles" :key="collectFile.file_id">
                <hr>
                <a class="text_analysis" href="javascript:void(0)" @click="viewFile(collectFile.file_id)">
                    {{collectFile.original_name.substr(0,30)}}...{{collectFile.original_name.substr(collectFile.original_name.lastIndexOf("."))}}
                </a>
            </el-row>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as dataQuery from './dataQuery'
import * as fileOperations from '../../../utils/js/fileOperations'

export default {
    name: "fullTextSearch",
    data() {
        return {
            //分页参数
            currentPage: 1,
            pageSize: 10,
            totalSize: 0,
            //页面信息
            fileList: [],
            searchForm: {
                searchType: 'fullTextSearch',
                queryKeyword: '',
                start: '0',
                currPage: '1',
                pageSize: '10',
                imageAddress: '',
                docAddress: '',
                fileName: '',
                similarityRate: '',
                search_way: 'fullText'
            },
            searchFileInfo: {
                analysis: '',
                collectType: '',
                result: [],
                totalSize: 0,
            },
            collectFiles: [],
        };
    },
    mounted() {
        //初始化当前用户收藏的文件信息
        this.getCollectFiles();
    },
    methods: {
        //获取收藏文件列表 
        getCollectFiles() {
            dataQuery.getCollectFiles().then((res) => {
                if (res && res.success) {
                    this.collectFiles = res.data;
                }
            });
        },
        //搜索按钮
        searchOnSubmit() {
            dataQuery.fullTextSearch(this.searchForm).then((res) => {
                if (res && res.success) {
                    this.searchFileInfo = res.data;
                }
            });
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
        //文本高亮函数(Word,pdf)
        highLight(str) {
            let analysis = this.searchFileInfo.analysis;
            if (str && str.length > 0) {
                if (!this.containSpecial(analysis)) {
                    var re = new RegExp(analysis, "g");
                    str = str.replace(re, "<font style='color:red'>" + analysis + "</font>");
                }
            }
            let num = 100;
            //如果当前字符串小于num，返回原值
            if (str.length <= num) {
                return str;
            }
            if (str.length > num) {
                return str.substr(0, num - 1) + "..."
            }
            return str;
        },
        //判断是否包含特殊字符
        containSpecial(s) {
            var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\,)(\.)(\/)(\<)(\>)(\?)(\)(\')(\")]+/);
            return (containSpecial.test(s));
        },
        //文本分析
        analysis(file_id, original_name) {
            console.log(file_id, original_name);
            this.$Msg.customizTitle('该版本文本分析功能未实现!', 'success')
        },
        //保存文件收藏
        saveFavoriteFile(file_id, original_name) {
            this.$confirm('确认收藏' + original_name + '文件吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                //保存文件收藏信息
                dataQuery.saveFavoriteFile({ 'fileId': file_id }).then((res) => {
                    if (res && res.success) {
                        //保存成功后重新获取收藏的文件列表
                        this.getCollectFiles();
                        //重新检索
                        this.searchOnSubmit();
                    }
                });
            }).catch(e => e);
        },
        //取消文件收藏
        cancelFavoriteFile(fav_id, original_name) {
            this.$confirm('取消收藏' + original_name + '文件吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                //取消文件收藏信息
                dataQuery.cancelFavoriteFile({ 'favId': fav_id }).then((res) => {
                    if (res && res.success) {
                        //取消收藏成功后重新获取收藏的文件列表
                        this.getCollectFiles();
                        //重新检索
                        this.searchOnSubmit();
                    }
                });
            }).catch(e => e);
        },
    }
}
</script>

<style scoped>
.text_info {
    color: #31708f;
}

.text_url {
    color: #3c763d;
    text-decoration: none;
}

.text_analysis {
    color: #31708f;
    text-decoration: none;
}
</style>
