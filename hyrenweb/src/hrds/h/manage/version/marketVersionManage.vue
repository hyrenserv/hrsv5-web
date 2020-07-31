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
                                        <el-table :data="tableData" style="width: 100%">
                                            <el-table-column label="当前" align="center">
                                                <el-table-column prop="ziduan" label="字段">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.type[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.type[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="2020-03-24" align="center">
                                                <template slot="header">
                                                    <span>2020-03-24</span>
                                                    <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                </template>
                                                <el-table-column prop="ziduan" label="字段" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.type[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.type[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="2020-03-30" align="center">
                                                <template slot="header">
                                                    <span>2020-03-30</span>
                                                    <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                </template>
                                                <el-table-column prop="ziduan" label="字段" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.type[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.type[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="2020-04-30" align="center">
                                                <template slot="header">
                                                    <span>2020-04-30</span>
                                                    <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                </template>
                                                <el-table-column prop="ziduan" label="字段" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型" align="center">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.type[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.type[0].title}}</p>
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
                            <el-table :data="tableData2" style="width: 100%" border >
                                <el-table-column prop="ziduan" label="当前" align="center">
                                    <template slot-scope="scope">
                                        <div v-for="(item,index) in scope.row.title1" :key="index">
                                            <p v-if="item.inden=='true'">{{item.title}}</p>
                                            <p v-if="item.color=='red'&&item.inden=='true'" class='redmarkred'>{{item.title}}</p>
                                            <p v-else class='markinden'>{{item.title}}</p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="2020-03-24" align="center">
                                    <template slot="header">
                                        <span>2020-03-24</span>
                                        <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                    </template>
                                    <template slot-scope="scope">
                                        <div v-for="(item,index) in scope.row.title2" :key="index">
                                            <p v-if="item.color=='red'" class='markred'>{{item.title}}</p>
                                            <p v-else>{{item.title}}</p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="2020-03-30" align="center">
                                    <template slot="header">
                                        <span>2020-03-30</span>
                                        <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                    </template>
                                    <template slot-scope="scope">
                                        <div v-for="(item,index) in scope.row.title3" :key="index">
                                            <p v-if="item.color=='red'" class='markred'>{{item.title}}</p>
                                            <p v-else>{{item.title}}</p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="2020-04-30" align="center">
                                    <template slot="header">
                                        <span>2020-04-30</span>
                                        <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                    </template>
                                    <template slot-scope="scope">
                                        <div v-for="(item,index) in scope.row.title4" :key="index">
                                            <p v-if="item.color=='red'" class='markred'>{{item.title}}</p>
                                            <p v-else>{{item.title}}</p>
                                        </div>
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
export default {
     components: {
        Scrollbar
    },
    data() {
        return {
            activeName: 'first',
            tableData: [{
                ziduan: [{
                    title: 'eeee',
                    color: 'red',
                }],
                chinese: [{
                    title: 'ppp',
                    color: 'black'
                }],
                type: [{
                    title: 'yyy',
                    color: 'red'
                }],
            }, {
                ziduan: [{
                    title: 'eeee',
                    color: 'red'
                }],
                chinese: [{
                    title: 'ppp',
                    color: 'black'
                }],
                type: [{
                    title: 'yyy',
                    color: 'red'
                }],
            }, {
                ziduan: [{
                    title: 'eeee',
                    color: 'black'
                }],
                chinese: [{
                    title: 'ppp',
                    color: 'black'
                }],
                type: [{
                    title: 'yyy',
                    color: 'red'
                }],
            }, {
                ziduan: [{
                    title: 'eeee',
                    color: 'black'
                }],
                chinese: [{
                    title: 'ppp',
                    color: 'black'
                }],
                type: [{
                    title: 'yyy',
                    color: 'red'
                }],
            }, ],
            tableData2: [{
                title1: [{
                    title: 'select',
                    color: 'red',
                    inden: 'true',
                }, {
                    title: 'eeett',
                    color: 'red'
                }, {
                    title: 'eeee14',
                    color: 'black'
                }],
                title2: [{
                    title: 'select',
                    color: 'red',
                    inden: 'true',
                }, {
                    title: 'eeett',
                    color: 'red'
                }, {
                    title: 'eeee14',
                    color: 'black'
                }],
                title3: [{
                    title: 'select',
                    color: 'red',
                    inden: 'true',
                }, {
                    title: 'eeett',
                    color: 'red'
                }, {
                    title: 'eeee14',
                    color: 'black'
                }],
                title4: [{
                    title: 'select',
                    color: 'red',
                    inden: 'true',
                }, {
                    title: 'eeett',
                    color: 'red'
                }, {
                    title: 'eeee14',
                    color: 'black'
                }],
            }],
            versionManageTreeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created() {
        //页面初始化时获取源数据列表树
        this.getMarketVerManageTreeData();
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
        VMHandleClick(data) {
            console.log(data);
        },
        choiceCheck(e,data){
            console.log(e,data)
        },
    }

}
</script>

<style scoped lang="less">
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
.markred {
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
