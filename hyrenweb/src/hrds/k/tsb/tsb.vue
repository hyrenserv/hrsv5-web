<template>
<div id='tsb'>
    <el-row>
        <h4 class='el-icon-s-home title'>表结构对标</h4>
    </el-row>
    <el-row :gutter='20'>
        <el-col :span="6">
             <div style='height:0.1px'>&nbsp;</div>
            <Scrollbar>
                <div class="mytree" hight='200'>
                    <el-tree class="filter-tree" :data="data2" :indent='0'>
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </Scrollbar>
        </el-col>
        <el-col :span="18">
            <el-table :data="ruleForm.tableData" border stripe size="medium" ref="ruleForm">
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="EName" label="字段名" align="center" width="150">
                </el-table-column>
                <el-table-column prop="cName" label="字段中文名" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.cName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="describe" label="描述" align="center">
                    <template slot-scope="scope">
                        <el-input type="textarea" v-model="scope.row.describe" autosize></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button @click="Select('ruleForm')" size="medium" type="primary">对标</el-button>
    </div>
</div>
</template>
<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import Scrollbar from '../../components/scrollbar';
import Loading from '../../components/loading'
export default {
    components: {
        Scrollbar,
        Loading
    },
    data() {
        return {
             rule: validator.default,
            data2: [{
                    label: '贴源层',
                    children: [{
                            label: 'Hive',
                            children: [{
                                label: 'S01_I_AGENT_INFO',
                            }, {
                                label: 'S01_A02_SYS_PARA',
                            }]
                        },
                        {
                            label: 'Habse',
                        }, {
                            label: 'Mpp',
                        }, {
                            label: 'Spark',
                        }
                    ]
                }, {
                    label: '加工层',
                    children: [{
                        label: '加工层-1',
                        children: [{
                            label: '加工层-1-1'
                        }]
                    }, {
                        label: '加工层-2',
                        children: [{
                            label: 'fytName'
                        }]
                    }]
                }, {
                    label: '集市层',
                    children: [{
                        label: '集市层-1',
                        children: [{
                            label: 'loheader'
                        }]
                    }, {
                        label: '集市层-2',
                        children: [{
                            label: 'clollectName'
                        }]
                    }]
                }, {
                    label: '管控层',
                },
                {
                    label: '自定义层',
                }
            ],
            ruleForm:{
                   tableData: [{
                EName: "agent_id",
                cName: "agent编号",
                describe: "无意义主键"
            }, {
                EName: "agent_name",
                cName: "agent名称",
                describe: "每个agent的名称信息"
            }, {
                EName: "agent_type",
                cName: "agent类型",
                describe: "agent类型、数据库等类"
            }, {
                EName: "agent_ip",
                cName: "agentIp地址",
                describe: "ip地址"
            }, {
                EName: "agent_status",
                cName: "agent状态",
                describe: "状态：连接、未连接等"
            }]
            },
         
        }
    },
    methods: {
        Select() {
            this.$router.push({
                name: 'tsb_result'
            })
        }
    }
}
</script>

<style lang="less">
#tsb {
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
            bottom: 0px;
            height: 100%;
            top: -26px;
            width: 1px;
        }

        .el-tree-node__content {
            padding: 0px !important;
        }

        .el-tree-node__content>.el-tree-node__expand-icon {
            padding: 0px;
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
}
</style>
