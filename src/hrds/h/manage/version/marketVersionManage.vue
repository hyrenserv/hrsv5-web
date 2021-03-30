<template>
<div id='bbgl'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>加工版本管理</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row :gutter='20'>
        <el-col :span="6">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
            <div style='height:0.1px'>&nbsp;</div>
            <div class='mytree' height='260'>
                <el-tree accordion class="filter-tree" :data="versionManageTreeData" :indent="0" :filter-node-method="filterNode" ref="tree">
                    <span class="span-ellipsis" slot-scope="{ node, data }">
                        <span :title="data.description" v-if="'undefined' !== typeof data.file_id && data.file_id !== '' && data.tree_page_source=='market_version_manage'">
                            <el-checkbox @change="choiceCheck($event,data)" v-model="data.ischoice" :key='data.id'></el-checkbox>{{node.label.substring(0,4)}}-{{node.label.substring(4,6)}}-{{node.label.substring(6,8)}}
                        </span>
                        <span :title="data.description" v-else-if="'undefined' !== typeof data.file_id && data.file_id !== '' && data.tree_page_source!='market_version_manage'">
                            <i class="el-icon-document" />
                            <template v-if="'undefined' !== typeof data.original_name && data.original_name !== ''">{{data.original_name}}</template>
                            <template v-else-if="data.original_name === '' && data.table_name!==''">{{data.table_name}}</template>
                            <template v-else>{{data.hyren_name}}</template>
                        </span>
                        <span :title="data.description" v-else>
                            <i class="el-icon-folder-opened" />
                            {{node.label}}
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="18">
            <el-tabs v-model="activeName" type="border-card" @tab-click='tabClick()'>
                <el-tab-pane label="数据结构对比" name="first">
                    <div class="text item">
                        <div class='bd contrast'>
                            <el-row type="flex" justify="start" :gutter="2">
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <el-table :data="tableStructureInfo" style='min-height:400px'>
                                            <el-table-column v-for="(item,index) in tableVersionData" :key="index" :label="processingDate(item)" align="center" show-overflow-tooltip>
                                                <el-table-column label="中文" :prop="'field_ch_name' +item" align="center" show-overflow-tooltip>
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row['is_same'+item]=='0'" class="changered">{{scope.row['field_cn_name'+item]}}</p>
                                                        <p v-else>{{scope.row['field_cn_name'+item]}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="英文" :prop="'field_en_name' +item" align="center" show-overflow-tooltip>
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row['is_same'+item]=='0'" class="changered">{{scope.row['field_en_name'+item]}}</p>
                                                        <p v-else>{{scope.row['field_en_name'+item]}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column label="类型" :prop="'field_type' +item" align="center" show-overflow-tooltip>
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row['is_same'+item]=='0'" class="changered">{{scope.row['field_type'+item]}} {{scope.row['field_length'+item]}}</p>
                                                        <p v-else>{{scope.row['field_type'+item]}} {{scope.row['field_length'+item]}}</p>
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
                            <el-table :data="tableMappingData" border style='min-height:400px'>
                                <el-table-column v-for="(item,index) in mappingVersionData" :key="index" :label="item.substring(0,4)+'-'+item.substring(4,6)+'-'+item.substring(6,8)" align="center">
                                    <template slot-scope="scope">
                                        <SqlEditor :ref="'sqleditor'+item" :readOnly='true' :lineNumbers='false' class='textasql' style="text-align: left;" :key="scope.row.id" />
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
import sqlFormatter from 'sql-formatter'
import SqlEditor from '../../../components/codemirror'
export default {
    components: {
        SqlEditor
    },
    data() {
        return {
            //搜索框
            filterText: '',
            //页面默认显示数据结构对比标签
            activeName: 'first',
            //表结构信息对比变量
            tableStructureInfo: [],
            tableVersionData: [],
            //表Mapping信息变量
            tableMappingData: [{}],
            mappingVersionData: [],
            //版本管理树数据
            versionManageTreeData: [],
            //版本日期数组变量
            version_date_s: [],
            //数据表id
            datatable_id: '',
            chioceId: '',
            version_date_id: [], //存树勾选的id
        }
    },
    created() {
        //页面初始化时获取源数据列表树
        this.getMarketVerManageTreeData();
    },
    watch: {
        //设置检索内容
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    methods: {
        // 节点搜索
        filterNode(value, data) {
            // 如果检索内容为空,直接返回
            if (!value) return true;
            // 如果传入的value和data中的name相同说明是匹配到了,匹配时转小写匹配
            // 检索内容为 original_name table_name hyren_name
            if ('undefined' !== typeof data.file_id && data.file_id !== '') {
                return (
                    ('undefined' !== typeof data.original_name && data.original_name !== '' && data.original_name.indexOf(value) !== -1) ||
                    ('undefined' !== typeof data.table_name && data.table_name !== '' && data.table_name.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
                    ('undefined' !== typeof data.hyren_name && data.hyren_name !== '' && data.hyren_name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
                )

            }
        },
        tabClick() {
            if (this.activeName == 'second') {
                let that = this
                this.$nextTick(() => {
                    for (let keys in that.$refs) {
                        if (that.$refs[keys].length > 0) {
                            that.$refs[keys][0].refresh()
                        }
                    }
                });
            }
        },
        //获取集市版本树菜单数据
        getMarketVerManageTreeData() {
            mvmFunc.getMarketVerManageTreeData().then(res => {
                this.versionManageTreeData = res.data;
            });
        },
        //树循环递归
        treeForeach(tree, func) {
            tree.forEach(data => {
                func(data)
                data.children && this.treeForeach(data.children, func) // 遍历子树
            })
        },
        //点击源数据管理树节点触发
        choiceCheck(e, data) {
            this.datatable_id = data.file_id
            data.ischoice = e
            if (e) {
                if (this.chioceId != '') {
                    if (this.chioceId == data.file_id) {
                        this.version_date_s.push(data.label);
                        this.version_date_id.push(data.id)
                    } else {
                        this.chioceId = data.file_id
                        this.$Msg.customizTitle("不属于同一个文件,之前将被清空");
                        this.$refs = {}
                        this.treeForeach(this.versionManageTreeData, node => {
                            for (let i = 0; i < this.version_date_id.length; i++) {
                                if (node.id == this.version_date_id[i]) {
                                    node.ischoice = false //将之前勾选的都为false
                                }
                            }
                        })
                        this.version_date_s = [] //之前存储的清空
                        this.version_date_s.push(data.label); //加入新的
                        this.version_date_id.push(data.id)
                    }

                } else {
                    this.version_date_s.push(data.label);
                    this.version_date_id.push(data.id)
                    this.chioceId = data.file_id
                }
                data.ischoice = true

            } else {
                if (this.version_date_s.length > 0) {
                    for (let i = 0; i < this.version_date_s.length; i++) {
                        if (this.version_date_s[i] == data.label) {
                            this.version_date_s.splice(i, 1)
                            break;
                        }
                    }
                    for (let i = 0; i < this.version_date_id.length; i++) {
                        if (this.version_date_id[i] == data.id) {
                            this.version_date_id.splice(i, 1)
                            break;
                        }
                    }
                } else {
                    this.tableStructureInfo = []
                    this.tableVersionData = []
                }
                data.ischoice = false;
            }
            if (this.version_date_s.length > 0) {
                this.getDataTableStructureInfos()
                this.getDataTableMappingInfos()
            }

        },
        //处理显示日期
        processingDate(item) {
            if (item === '00000000') {
                return item.substring(0, 4) + '-' + item.substring(4, 6) + '-' + item.substring(6, 8) + ' (该版本未成功运行)'
            } else {
                return item.substring(0, 4) + '-' + item.substring(4, 6) + '-' + item.substring(6, 8)
            }
        },
        // 获取数据表结构数据方法
        getDataTableStructureInfos() {
            let params = {}
            params["datatable_id"] = this.datatable_id;
            params["version_date_s"] = this.version_date_s;
            mvmFunc.getDataTableStructureInfos(params).then(res => {
                this.tableStructureInfo = []
                this.tableVersionData = []
                for (var key in res.data) {
                    this.tableVersionData.push(key)
                    for (let i = 0; i < res.data[key].length; i++) {
                        if (this.tableStructureInfo.length < res.data[key].length) {
                            this.tableStructureInfo.push({})
                        }
                        this.tableStructureInfo[i]['field_cn_name' + key] = res.data[key][i].datatable_field_info.field_cn_name
                        this.tableStructureInfo[i]['field_en_name' + key] = res.data[key][i].datatable_field_info.field_cn_name
                        this.tableStructureInfo[i]['field_type' + key] = res.data[key][i].datatable_field_info.field_type
                        let field_length = res.data[key][i].datatable_field_info.field_length;
                        if (field_length === '--' || field_length === '' || undefined === typeof field_length) {
                            field_length = ''
                        } else {
                            field_length = '(' + res.data[key][i].datatable_field_info.field_length + ')'
                        }
                        this.tableStructureInfo[i]['field_length' + key] = field_length
                        this.tableStructureInfo[i]['is_same' + key] = res.data[key][i].is_same
                    }
                }
            });
        },
        // 获取数据表Mapping数据方法
        getDataTableMappingInfos() {
            let params = {}
            this.mappingVersionData = [];
            params["datatable_id"] = this.datatable_id;
            params["version_date_s"] = this.version_date_s;
            mvmFunc.getDataTableMappingInfos(params).then(res => {
                let data = res.data
                for (let key in data) {
                    this.mappingVersionData.push(key)
                    this.$nextTick(() => {
                        let that = this
                        for (let keys in that.$refs) {
                            if (keys === "sqleditor" + key) {
                                that.$refs[keys][0].setmVal(data[key].execute_sql)
                            }
                        }
                    });
                }
            });
        },
    }
}
</script>

<style lang="less" scoped>
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

    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }
}
</style>
