<template>
    <div id='tsb'>
        <el-row class='topTitle'>
            <span class='el-icon-location'>表结构对标</span>
            <router-link to="/collectmonitor">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row :gutter='20'>
            <el-col :span="6">
                <div style='height:0.1px'>&nbsp;</div>
                <Scrollbar>
                    <div class="mytree" height='260'>
                        <el-tree class="filter-tree" :data="data2" :indent='0' @node-click="handleNodeClick">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="data.description">{{node.label}}</span>
                        </span>
                        </el-tree>
                    </div>
                </Scrollbar>
            </el-col>
            <el-col :span="18" style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
                <el-form ref="ruleForm" :model="ruleForm">
                    <el-table :data="ruleForm.tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                              border stripe size="medium">
                        <el-table-column label="序号" align="center" width="60">
                            <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pagesize + 1}}</template>
                        </el-table-column>
                        <el-table-column prop="column_name" label="字段名" align="center" width="150">
                        </el-table-column>
                        <el-table-column prop="column_ch_name" label="字段中文名" align="center">
                            <template slot-scope="scope">
                                <!-- <el-form-item prop="cName"> -->
                                <el-input v-model="scope.row.column_ch_name" size="medium"/>
                                <!-- </el-form-item> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="tc_remark" label="描述" align="center">
                            <template slot-scope="scope">
                                <!-- <el-form-item prop="describe"> -->
                                <el-input type="textarea" v-model="scope.row.tc_remark" autosize/>
                                <!-- </el-form-item> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
                <el-pagination @size-change="tsb_handleSizeChange" @current-change="tsb_handleCurrentChange"
                               :current-page="currentPage" @prev-click='preclickFun' @next-click='nextclickFun'
                               :page-sizes="[10, 50, 100, 200]" :page-size="pagesize"
                               layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.tableData.length"
                               class='locationcenter'/>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dbsubmitFun('ruleForm')" size="medium" type="primary" icon='el-icon-right'>对标</el-button>
        </div>
        <!-- 加载过度 -->
        <transition name="fade">
            <loading v-if="isLoading"/>
        </transition>
    </div>
</template>

<script>
    import * as validator from "@/utils/js/validator";
    import Scrollbar from '../../components/scrollbar';
    import Loading from '../../components/loading';
    import * as tsbFun from './tsb'

    export default {
        components: {
            Scrollbar,
            Loading,
            // location
        },
        data() {
            return {
                currentPage: 1,
                pagesize: 10,
                totalSize: 0,
                isLoading: false,
                rule: validator.default,
                data2: [],
                ruleForm: {
                    tableData: []
                },

            }
        },
        created() {
            this.treeData()
        },
        methods: {
            dbsubmitFun() {
                this.isLoading = true;
                tsbFun.predictBenchmarking({
                    'dbmColInfos': JSON.stringify(this.ruleForm.tableData),
                }).then(res => {
                    if (res.success) {
                        this.isLoading = false;
                        this.$router.push({
                            name: 'tsb_result'
                        })
                    } else {
                        this.isLoading = false;
                    }
                });
            },
            treeData() {
                tsbFun.getTSBTreeData().then(res => {
                    this.data2 = res.data;
                });
            },
            tsb_handleSizeChange(size) {
                this.pagesize = size;
            },
            tsb_handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            preclickFun(currentPage) {
                this.currentPage = currentPage;
            },
            nextclickFun(currentPage) {
                this.currentPage = currentPage;
            },
            handleNodeClick(data) {
                if (data.file_id !== '') {
                    let params = {};
                    params["data_layer"] = data.data_layer;
                    params["data_own_type"] = data.data_own_type;
                    params["file_id"] = data.id;
                    tsbFun.getColumnByFileId(params).then(res => {
                        this.ruleForm.tableData = res.data ? res.data : [];
                    });
                }
            },
        }
    }
</script>

<style lang="less">
    #tsb {
        .mytree /deep/ {
            .el-tree > .el-tree-node:after {
                border-top: none;
            }

            .el-tree-node {
                position: relative;
                padding-left: 16px;
            }

            //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
            /*  .el-tree-node__expand-icon.is-leaf {
                    display: none;
                } */

            .el-tree-node__children {
                padding-left: 16px;
            }

            .el-tree-node :last-child:before {
                height: 38px;
            }

            .el-tree > .el-tree-node:before {
                border-left: none;
            }

            .el-tree > .el-tree-node:after {
                border-top: none;
            }

            .el-tree-node:before {
                content: "";
                left: -4px;
                position: absolute;
                right: auto;
                border-width: 1px;
            }

            .el-tree-node:after {
                content: "";
                left: -4px;
                position: absolute;
                right: auto;
                border-width: 1px;
            }

            .el-tree-node:before {
                border-left: 1px dashed #4386c6;
                bottom: 0;
                height: 100%;
                top: -26px;
                width: 1px;
            }

            .el-tree-node__content {
                padding: 0 !important;
            }

            .el-tree-node__content > .el-tree-node__expand-icon {
                padding: 0;
            }

            .el-tree-node:after {
                border-top: 1px dashed #4386c6;
                height: 20px;
                top: 12px;
                width: 24px;
            }
        }

        .title {
            color: #2196f3;
            line-height: 30px;
            padding-bottom: 10px;
            font-size: 18px;
        }

        .dialog-footer {
            float: right;
            margin-top: 10px;
        }

        .span-ellipsis {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            font-size: 14px;
        }

        .scrollbar-wrap {
            width: 24% !important;
            position: absolute;
        }

        .scrollbar__track {
            width: 4px;
        }

        .locationcenter {
            text-align: center;
            margin-top: 5px;
        }
    }
</style>
