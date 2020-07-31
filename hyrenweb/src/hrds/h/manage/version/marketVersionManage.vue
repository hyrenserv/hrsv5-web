<template>
<div id='bbgl'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>集市版本管理</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row :gutter='20'>
        <el-col :span="6">
            <div class="mytree" hight='260'>
                <div style='height:0.1px'>&nbsp;</div>
                <Scrollbar>
                    <el-tree class="filter-tree" :data="versionManageTreeData" :indent="0" id="tree">
                        <span class="span-ellipsis" slot-scope="{ node, data }" v-if="data.description.length >0">
                            <span :title="data.description" v-if="data.file_id.length > 0&&data.label==data.id">
                                <el-checkbox @change="choiceCheck($event,data)"></el-checkbox>{{node.label.substring(0,4)}}-{{node.label.substring(4,6)}}-{{node.label.substring(6,8)}}
                            </span>
                            <span :title="data.description" v-else-if='data.file_id.length > 0&&data.label!=data.id'>
                                <i class="el-icon-document" />
                                {{node.label}}
                            </span>
                            <span :title="data.description" v-else>
                                <i class="el-icon-folder-opened" />
                                {{node.label}}
                            </span>
                        </span>
                        <span class="span-ellipsis" slot-scope="{ node, data }" v-else>
                            <span :title="data.label" v-if="data.file_id.length > 0">
                                <i class="el-icon-document" />{{node.label}}
                            </span>
                            <span :title="data.label" v-else>
                                <i class="el-icon-folder-opened" />
                                {{node.label}}
                            </span>
                        </span>
                    </el-tree>
                </Scrollbar>

            </div>
        </el-col>
        <el-col :span="18">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="数据结构对比" name="first">
                    <div class="text item">
                        <div class='bd contrast'>
                            <el-row type="flex" justify="start" :gutter="2">
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <el-table :data="tableData" style='min-height:400px'>
                                            <el-table-column v-for="(item,index) in table" :key="index" :label="item.substring(0,4)+'-'+item.substring(4,6)+'-'+item.substring(6,8)" align="center">
                                                <!--  <template slot="header">
                                                    <span>{{item.substring(0,4)+'-'+item.substring(4,6)+'-'+item.substring(6,8)}}</span>
                                                    <div style="position: absolute;top: 0px;" @click="deltime(item)"><i class='el-icon-close' style="color:#fff"></i></div>
                                                </template> -->
                                                <el-table-column label="中文" :prop="'field_ch_name' +item" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row['is_same'+item]=='0'" class="changered">{{scope.row['field_cn_name'+item]}}</p>
                                                        <p v-else>{{scope.row['field_cn_name'+item]}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="英文" :prop="'field_en_name' +item" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row['is_same'+item]=='0'" class="changered">{{scope.row['field_en_name'+item]}}</p>
                                                        <p v-else>{{scope.row['field_en_name'+item]}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="类型" :prop="'field_type' +item" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row['is_same'+item]=='0'" class="changered">{{scope.row['field_type'+item]}}</p>
                                                        <p v-else>{{scope.row['field_type'+item]}}</p>
                                                    </template>
                                                </el-table-column>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="数据mapping对比" name="second">
                    <div class="text item">
                        <div class='bd contrast'>
                            <el-table :data="tableData2" border style='min-height:400px'>
                                <el-table-column v-for="(item,index) in table2" :key="index" :label="item.substring(0,4)+'-'+item.substring(4,6)+'-'+item.substring(6,8)" align="center">
                                    <template slot-scope="scope">
                                        <p v-html="scope.row['text'+item]"></p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

        </el-col>
    </el-row>
</div>
</template>

<script>
import * as mvmFunc from "./marketVersionManage";
import Scrollbar from '../../../components/scrollbar';
import sqlFormatter from 'sql-formatter'
export default {
    components: {
        Scrollbar,
    },
    data() {
        return {
            activeName: 'first',
            table: [],
            tableData: [],
            table2: [],
            tableData2: [{}],
            tableDatalist2: {
                '20200202': {
                    text: 'SELECT i_item_sk as i_item_sk, i_item_id as i_item_id,i_rec_start_date as i_rec_start_date',
                    compar: ['SELECT']
                },
                '20200203': {
                    text: 'SELECT i_item_sk as i_item_skf, i_item_id as i_item_id,i_rec_start_date as i_rec_start_date',
                    compar: ['i_item_sk']
                }

            },
            versionManageTreeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            version_date_s: [],
            datatable_id: ''
        }
    },
    created() {
        //页面初始化时获取源数据列表树
        this.getMarketVerManageTreeData();
        this.mappingFun()
    },
    methods: {
        //获取集市版本树菜单数据
        getMarketVerManageTreeData() {
            mvmFunc.getMarketVerManageTreeData().then(res => {
                this.versionManageTreeData = res.data;
                console.log(res.data)
            });
        },
        //点击源数据管理树节点触发
        choiceCheck(e, data) {
            this.datatable_id = data.file_id
            if (e) {
                this.version_date_s.push(data.id);
            } else {
                if (this.version_date_s.length > 0) {
                    for (let i = 0; i < this.version_date_s.length; i++) {
                        if (this.version_date_s[i] == data.id) {
                            this.version_date_s.splice(i, 1)
                            break;
                        }
                    }
                } else {
                    this.tableData = []
                    this.table = []
                }
            }
            if (this.version_date_s.length > 0) {
                this.getDataTableStructureInfos()
            }

        },
        // 获取数据方法
        getDataTableStructureInfos() {
            let params = {}
            params["datatable_id"] = this.datatable_id;
            params["version_date_s"] = this.version_date_s;
            mvmFunc.getDataTableStructureInfos(params).then(res => {
                this.tableData = []
                this.table = []
                for (var key in res.data) {
                    this.table.push(key)
                    for (let i = 0; i < res.data[key].length; i++) {
                        if (this.tableData.length < res.data[key].length) {
                            this.tableData.push({})
                        }
                        this.tableData[i]['field_cn_name' + key] = res.data[key][i].datatable_field_info.field_cn_name
                        this.tableData[i]['field_en_name' + key] = res.data[key][i].datatable_field_info.field_cn_name
                        this.tableData[i]['field_type' + key] = res.data[key][i].datatable_field_info.field_type
                        this.tableData[i]['is_same' + key] = res.data[key][i].is_same
                    }
                }
            });
        },
        //表上删除
        deltime(time) {
            for (let i = 0; i < this.version_date_s.length; i++) {
                if (this.version_date_s[i] == time) {
                    this.version_date_s.splice(i, 1)
                    break;
                }
            }
            if (this.version_date_s.length > 0) {
                this.getDataTableStructureInfos()
            } else {
                this.tableData = []
                this.table = []
            }
        },
        // mappingFun
        mappingFun() {
            let data = this.tableDatalist2
            for (var key in data) {
                this.table2.push(key)
                for (let i = 0; i < data[key].compar.length; i++) {
                                //   this.tableData2[0]['text' + key]=sqlFormatter.format(data[key].text)
                    this.tableData2[0]['text' + key] = JSON.stringify(data[key].text).replace(data[key].compar[i], "<span style='color:red;'>" + data[key].compar[i] + "</span>");
                    
                }

            }
        }
        // 
    }

}
</script>

<style lang="less" scoped>
#bbgl /deep/ td {
    margin: 0 auto;
    color: #333;
    line-height: 22px;
    font-size: 12px;
    font-family: "宋体", Verdana, Geneva, sans-serif;
    background-color: #fff;
    text-align: center;

}

/* #bbgl>>>.el-tree-node .is-leaf+.span-ellipsis .el-checkbox .el-checkbox__inner {
    display: inline-block;
}

#bbgl>>>.el-tree-node .el-checkbox__input>.el-checkbox__inner {

    display: none;
    margin: 0
} */
/*  */
.changered {
    color: #b70707
}

.markinden {
    text-indent: 2rem;
}

.redmarkinden {
    color: #b70707;
    text-indent: 2rem;
}

#bbgl {
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
