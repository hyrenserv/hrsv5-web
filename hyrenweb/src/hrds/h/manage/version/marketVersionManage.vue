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
    <el-row>
        <el-col :span="5">
            <div class="mytree" hight='200'>
                <el-tree :data="versionManageTreeData" :indent='0' show-checkbox class="filter-tree" @node-click="VMHandleClick"  node-key="id" :default-expanded-keys="[1]" :default-checked-keys="[2]" :props="defaultProps">
                    <span class="span-ellipsis" slot-scope="{ node, data }">
                        <span :title="data.description" v-if="data.type=='wb'">
                            <i class=" el-icon-document" />{{node.label}}
                        </span>
                        <span :title="data.description" v-else-if="data.type=='wj'">
                            <i class="el-icon-folder-opened" />{{node.label}}
                        </span>
                        <span :title="data.description" v-else>
                            <i />{{data.label}}
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="19">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="数据结构对比" name="first">
                    <div class="text item">
                        <div class='bd contrast'>
                            <el-row type="flex" justify="start" :gutter="2">
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <el-table :data="tableData" style="width: 100%">
                                            <el-table-column label="当前">
                                                <el-table-column prop="ziduan" label="字段">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.type[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.type[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="2020-03-24">
                                                <template slot="header">
                                                    <span>2020-03-24</span>
                                                    <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                </template>
                                                <el-table-column prop="ziduan" label="字段">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.type[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.type[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="2020-03-30">
                                                <template slot="header">
                                                    <span>2020-03-30</span>
                                                    <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                </template>
                                                <el-table-column prop="ziduan" label="字段">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.type[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.type[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                            </el-table-column>
                                            <el-table-column label="2020-04-30">
                                                <template slot="header">
                                                    <span>2020-04-30</span>
                                                    <div style="position: absolute;top: 0px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                </template>
                                                <el-table-column prop="ziduan" label="字段">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.ziduan[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.ziduan[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="chinese" label="中文">
                                                    <template slot-scope="scope">
                                                        <p v-if="scope.row.chinese[0].color=='red'" class='markred'>{{scope.row.ziduan[0].title}}</p>
                                                        <p v-else>{{scope.row.chinese[0].title}}</p>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="type" label="类型">
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
                            <el-table :data="tableData2" style="width: 100%">
                                <el-table-column prop="ziduan" label="当前">
                                    <template slot-scope="scope">
                                        <div v-for="(item,index) in scope.row.title1" :key="index">
                                            <p v-if="item.inden=='true'">{{item.title}}</p>
                                            <p v-if="item.color=='red'&&item.inden=='true'" class='redmarkred'>{{item.title}}</p>
                                            <p v-else class='markinden'>{{item.title}}</p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="2020-03-24">
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
                                <el-table-column label="2020-03-30">
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
                                <el-table-column label="2020-04-30">
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

export default {
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
            });
        },
        //点击源数据管理树节点触发
        VMHandleClick(data) {
            console.log(data);
        }
    }

}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

#bbgl>>>.el-card__body {
    padding: 4px !important;
}

.topp {
    /* font-weight: bold; */
    font-size: 14px;
}

.box-card {
    width: 480px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    border-bottom: 1px dashed #ccc;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #706e6e;
}

.contrast .ctxt {
    /* margin: 2px auto 9px; */
    color: #000;
    width: 100%;
    line-height: 14px;
    box-sizing: border-box;
    border: solid #e5e5e5;
    border-width: 0px 1px 1px 0px;
}

#bbgl>>>.table {
    border-collapse: collapse;
    border-spacing: 0;
}

#bbgl>>>.contrast .ctxt caption {
    display: table-caption;
    background-color: #f9f9f9;
    color: #1890ff;
    height: 29px;
    line-height: 29px;
    padding-left: 15px;
    font-weight: 700;
}

#bbgl>>>.caption,
th {
    text-align: center;
}

#bbgl>>>.outbgh {
    background-color: #fff;
}

#bbgl>>>.tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

#bbgl>>>.contrast .ctxt .outbgh th {
    background-color: #f9f9f9;
}

#bbgl>>>.contrast .ctxt th {
    border-top: 1px solid #e5e5e5;
    border-right: 1px solid #c3c3c3;
    text-align: right;
    padding: 12px 24px 12px 7px;
    background-color: #f9f9f9;
    width: 98px;
}

#bbgl>>>.contrast .ctxt td {
    border: solid #e5e5e5;
    border-width: 1px 0 0 1px;
    padding: 4px 0px;
    width: 216px;
}

.bar th {
    width: 126px;
}

.bar td,
.bar th {
    font-weight: 700;
    color: #fff;
    background-color: #696969;
    border-right: 1px solid #fff;
    text-align: left;
    width: 247px;
    padding: 8px 2px;
    line-height: 14px;
}

.bar {
    margin: 0 auto;
    overflow: hidden;
    zoom: 1;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

#bbgl>>>td {
    margin: 0 auto;
    color: #333;
    line-height: 22px;
    font-size: 12px;
    font-family: "宋体", Verdana, Geneva, sans-serif;
    background-color: #fff;
    text-align: left;

}

#bbgl>>>.el-tree-node .is-leaf+.el-checkbox .el-checkbox__inner {
    display: inline-block;
}

#bbgl>>>.el-tree-node .el-checkbox__input>.el-checkbox__inner {

    display: none;
    margin: 0
}

#bbgl>>>.el-tree-node__content>label.el-checkbox {
    margin-right: 3px;
}

.pding {
    padding-left: 28px;
}

#bbgl>>>.el-tabs__header {
    margin: 0 !important;
}

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
</style>
