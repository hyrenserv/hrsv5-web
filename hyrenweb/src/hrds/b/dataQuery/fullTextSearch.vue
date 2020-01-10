<template>
    <div>
        <el-row>
            <span class="el-icon-search" style="color: #3a8ee6"> 全文检索 </span>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row>
            <!-- 搜索条区域-->
            <el-form :inline="true" ref="form" :model="searchForm">
                <el-form-item>
                    <el-select v-model="searchForm.searchType">
                        <el-option label="全文检索" value="fullTextSearch"/>
                        <el-option label="以图搜图" value="searchByMap"/>
                        <el-option label="文章相似" value="articleSimilarityQuery"/>
                        <el-option label="文件名搜索" value="fileNameSearch"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <template v-if="searchForm.searchType ==='fullTextSearch'">
                        <el-row>
                            <el-col :span="18">
                                <el-input type="text" placeholder="搜索" v-model="searchForm.queryKeyword"/>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" class="el-icon-search" style="margin-left: 10px"
                                           @click="searchOnSubmit()">查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-if="searchForm.searchType ==='searchByMap'">
                        <el-upload class="upload-demo" ref="upload" :fileList="fileList" :auto-upload="false"
                                   :limit="1" action="">
                            <el-button type="info" class="el-icon-plus" slot="trigger">选取文件</el-button>
                            <el-button type="success" class="el-icon-upload" style="margin-left: 10px;">
                                上传文件
                            </el-button>
                            <el-button type="primary" class="el-icon-search" @click="searchOnSubmit()">搜索
                            </el-button>
                        </el-upload>
                    </template>
                    <template v-if="searchForm.searchType ==='articleSimilarityQuery'">
                        <el-upload class="upload-demo" ref="upload" :fileList="fileList" :auto-upload="false"
                                   :limit="1" action="">
                            <el-button type="info" class="el-icon-plus" slot="trigger">选取文件</el-button>
                            <el-button type="success" class="el-icon-upload" style="margin-left: 10px;">
                                上传文件
                            </el-button>
                            <el-select style="margin-left: 10px" v-model="searchForm.search_way">
                                <el-option label="全文检索" value="fullText"/>
                                <el-option label="逐文档匹配" value="documentMatching"/>
                            </el-select>
                            <el-button style="margin-left: 10px" type="primary" class="el-icon-search"
                                       @click="searchOnSubmit()">搜索
                            </el-button>
                        </el-upload>
                    </template>
                    <template v-if="searchForm.searchType ==='fileNameSearch'">
                        <el-row>
                            <el-col :span="18">
                                <el-input type="text" placeholder="文件名" v-model="searchForm.fileName"/>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" style="margin-left: 10px" class="el-icon-search"
                                           @click="searchOnSubmit()">查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <!-- 内容展示区域-->
            <el-col :span="18">
                <template v-if="searchForm.searchType === 'searchByMap'">
                    searchByMap
                </template>
                <template v-if="searchForm.searchType !== 'searchByMap'">
                    !searchByMap
                    <template v-if="searchFileInfos.length === 0"><h4>抱歉，没有符合的结果！</h4></template>
                    <template v-for="data in searchFileInfos">
                        <p v-if="data.collect_type === searchFileInfos.collectType"/>
                        <p v-else><span>源表名：{{data.original_name}}</span></p>
                    </template>
                </template>
            </el-col>
            <el-col :span="6">
                <el-row align="center">
                    <span>我的收藏</span>
                    {{collectFiles}}
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
                fileList: [],
                searchForm: {
                    searchType: 'fullTextSearch', queryKeyword: '', start: '1', currPage: '1', pageSize: '10',
                    imageAddress: '', docAddress: '', fileName: '', similarityRate: '', search_way: 'fullText'
                },
                searchFileInfos: [],
                collectFiles: [{fileName: '1'}, {fileName: "2"}],
            };
        },
        methods: {
            searchOnSubmit() {
                console.log(this.searchForm.searchType);
                dataQuery.fullTextSearch(this.searchForm).then((res) => {
                    console.log(res);
                });
            },
        }
    }
</script>
