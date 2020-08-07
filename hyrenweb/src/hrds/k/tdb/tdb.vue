<template>
<div id='tdb'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>表数据对标</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row :gutter='20'>
        <el-col :span="6" class="colContent">
            <div style='height:0.1px'>&nbsp;</div>
            <Scrollbar>
                <div class="mytree" height='260'>
                    <el-tree class="filter-tree" :data="data2" :indent="0" id="tree">
                        <span class="span-ellipsis" slot-scope="{ node, data }" v-if="data.description.length >0">
                            <span :title="data.description" v-if="data.file_id !== ''">
                                <el-checkbox @change="choiceTable($event,data.data_layer,data.file_id,data.hyren_name,data.original_name)"></el-checkbox>
                                <template v-if="data.original_name !== ''">{{data.original_name}}</template>
                                <template v-else-if="data.original_name === '' && data.table_name!==''">{{data.table_name}}</template>
                                <template v-else>{{data.hyren_name}}</template>
                            </span>
                            <span :title="data.description" v-else>
                                <i class="el-icon-folder-opened" />{{node.label}}
                            </span>
                        </span>
                        <span class="span-ellipsis" slot-scope="{ node, data }" v-else>
                            <span :title="data.label" v-if="data.file_id.length > 0">
                                <el-checkbox @change="choiceTable($event,data.id,data.file_id,data.hyren_name,data.original_name)"></el-checkbox>{{node.label}}
                            </span>
                            <span :title="data.label" v-else>
                                <i class="el-icon-folder-opened" />
                                {{node.label}}
                            </span>
                        </span>
                    </el-tree>
                </div>
            </Scrollbar>
        </el-col>
        <el-col :span="18" class="colTableContent" style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
            <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage *pagesize)" border stripe size="medium" ref='table' style='min-height:200px'>
                <el-table-column width="100" align="center" prop="selectionState">
                    <template slot="header" slot-scope="scope">
                        <el-checkbox v-model="is_archivedAll" @change="handleCheckAllChange(tableData,is_archivedAll)"></el-checkbox>&nbsp;选择
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox @change="col_everySelectfun($event,tableData)" :checked="scope.row.selectTable" v-model="scope.row.selectTable"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="序号" align="center" width="60">
                    <template scope="scope">
                        <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="hyren_name" label="表英文名" align="center">
                </el-table-column>
                <el-table-column prop="original_name" label="表中文名" align="center">
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" style='text-align: center;margin-top: 10px;'></el-pagination>
            <el-row style=" margin-top: 30px;">
                <Gojs />
            </el-row>
        </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button @click="SelectTable" size="medium" type="primary">对标<i class="el-icon-right"></i></el-button>
    </div>

</div>
</template>

<script>
import Gojs from './gojs'
import * as tdbFun from "./tdb";
// import { delete } from 'vue/types/umd';
import Scrollbar from '../../components/scrollbar';
export default {
    components: {
        Gojs: Gojs,
        Scrollbar
    },
    data() {
        return {
            currentPage: 1,
            pagesize: 10,
            data2: [],
            tableData: [],
            is_archivedAll: false
        }
    },
    mounted() {
        this.getTreedata()

    },
    methods: {
        getTreedata() {
            tdbFun.getTDBTreeData().then(res => {
                this.data2 = res.data;
            });
        },
        SelectTable() {

            tdbFun.saveTDBTable({
                'tdb_table_bean_s': JSON.stringify(this.tableData)
            }).then(res => {
                if (res.code == '200') {
                    this.$router.push({
                        name: 'choiceTable',
                        query: {
                            id: res.data,
                        }
                    })
                }
            });
            // console.log(this.tableData)
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(current) {
            this.currentPage = current;
        },
        // 树选择表显示
        choiceTable(e, data_layer, file_id, hyren_name, original_name) {
            if (e) {
                this.tableData.push({
                    'selectTable': true,
                    'file_id': file_id,
                    'data_layer': data_layer,
                    'hyren_name': hyren_name,
                    'original_name': original_name
                })

            } else {
                if (this.tableData.length > 0) {
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].file_id == file_id) {
                            this.tableData.splice(i, 1)
                            break;
                        }
                    }
                }

            }

        },
        // 全选
        handleCheckAllChange(items, e) {
            items.forEach((item, i) => {
                if (e) {
                    item.selectTable = true;
                } else {
                    item.selectTable = false;
                }

            });
        },
        //单个点击
        col_everySelectfun(val, alldata) {
            let count = 0
            if (val == true) {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].selectTable == true) {
                        count++
                    }
                }
                if (count == alldata.length) {
                    this.is_archivedAll = true
                } else {
                    this.is_archivedAll = false
                }
            } else {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].selectTable == false) {
                        if (count < alldata.length) {
                            this.is_archivedAll = false
                        }
                    }
                }
            }
        },

    }
}
</script>

<style lang="less" scoped>
.rowDioloag {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
    margin-top: 10px;
}

.dialog-footer {
    float: right;
    margin-top: 10px;
}

.duibiaostyle {
    font-size: 16px;
    font-weight: bold;
    color: #4d5052;
    padding-left: 2px;
}

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
