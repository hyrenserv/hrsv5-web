<template>
<div id="tdb">
    <el-row class="topTitle">
        <span class="el-icon-location">表数据对标</span>
        <router-link to="/tdb">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="6">
            <div style="height:0.1px">&nbsp;</div>
            <div class="mytree" height="260">
                <el-tree class="filter-tree" :data="treeData" :indent="0" @node-click="handleNodeClick">
                    <span class="span-ellipsis" slot-scope="{ node, data }">
                        <span :title="data.description">{{node.label}}</span>
                    </span>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="18" style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
            <el-form ref="tableForm" :model="tableForm">
                <el-table :data="tableForm.tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border stripe size="medium" :row-key="(row)=>{ return row.basic_id}" @selection-change="handleSelectionChange" @select-all='allselect'>
                    <el-table-column width="40" align="center" type="selection" :reserve-selection="true"></el-table-column>
                    <el-table-column label="序号" align="center" width="160">
                        <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pagesize + 1}}</template>
                    </el-table-column>
                    <el-table-column prop="table_name" label="表名" align="center" />
                    <el-table-column prop="original_name" label="表中文名" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.original_name" size="medium" />
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="tdb_handleSizeChange" @current-change="tdb_handleCurrentChange" :current-page="currentPage" @prev-click='preclickFun' @next-click='nextclickFun' :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableForm.tableData.length" class='locationcenter' />
            </el-form>
        </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dbsubmitFun('tableForm')" size="medium" type="primary" icon="el-icon-right">对标</el-button>
    </div>
</div>
</template>

<script>
import Loading from "../../components/loading";
import * as tdbFun from "./tdb";
export default {
    components: {
        Loading
    },
    data() {
        return {
            currentPage: 1,
            pagesize: 10,
            totalSize: 0,
            treeData: [],
            tableForm: {
                tableData: []
            },
        };
    },
    created() {
        this.getTreeData()
    },
    methods: {
        //对标按钮
        dbsubmitFun() {
            tsbFun.predictBenchmarking({
                'tableNames': JSON.stringify(this.tableForm.tableData),
            }).then(res => {
                if (res.success) {
                    this.$router.push({
                        name: 'tdb_result'
                    })
                }
            });
        },
        //获取表数据对标的树列表
        getTreeData() {
            tdbFun.getTDBTreeData().then(res => {
                console.log(res.data)
                this.treeData = res.data;
            });
        },
        //分页大小
        tdb_handleSizeChange(size) {
            this.pagesize = size;
        },
        //当前页
        tdb_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        //上一页
        preclickFun(currentPage) {
            this.currentPage = currentPage;
        },
        //下一页
        nextclickFun(currentPage) {
            this.currentPage = currentPage;
        },
        //点击树节点出发
        handleNodeClick(data) {
            if (data.file_id === '' && data.classify_id !== '') {
                //获取分类下所有表信息
                if ('undefined' !== typeof data.children) {
                    this.tableForm.tableData = data.children;
                }
            } else if (data.file_id !== '') {
                this.tableForm.tableData = [];
                this.tableForm.tableData.push(data);
            }
            console.log(this.tableForm.tableData);
        },
        // 复选框选中
        handleSelectionChange(selectTrue) {
            this.selectrow = selectTrue
        },
        // 全选
        allselect(all) {
            this.selectrow = all
        },
    }
};
</script>

<style lang="less">
#tdb {
    .mytree /deep/ {
        .el-tree>.el-tree-node:after {
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

        .el-tree>.el-tree-node:before {
            border-left: none;
        }

        .el-tree>.el-tree-node:after {
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

        .el-tree-node__content>.el-tree-node__expand-icon {
            padding: 0;
        }

        .el-tree-node:after {
            border-top: 1px dashed #4386c6;
            height: 20px;
            top: 12px;
            width: 24px;
        }
    }

    .dialog-footer {
        float: right;
        margin-top: 10px;
    }
}
</style>
