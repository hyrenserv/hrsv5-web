<template>
<div>
    <el-row class='topTitle'>
        <span class='el-icon-location'>数据地图查询</span>
        <div style="float:right">
            <el-button type="primary" size="small" @click="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
            <el-button type="primary" size="mini" @click="graphSetting">
                <i class="el-icon-setting"></i>选择图计算方式
            </el-button>
        </div>
    </el-row>
    <!-- <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="cypher" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchFromNeo4j(cypher)"></el-button>
        </el-input>
    </div> -->
    <el-dialog title="选择图计算方式" :visible.sync="dialogShowGraph" :before-close="dialogShowGraphClose" width="1000px">
        <el-form ref="form" :label-position="labelPosition" label-width="180px">
            <el-form-item label="1.LPA社区发现算法">
                <el-row :gutter="5">
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="8">
                                边的属性
                            </el-col>
                            <el-col :span="16">
                                <el-select v-model="form.relationship_lpa" placeholder="请选择边的属性" size="small">
                                    <el-option v-for="item in options" :key="item.value" :value="item.value" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="10">
                                算法迭代次数
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.iterations_lpa" placeholder="算法迭代次数" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <!-- <el-col :span="7">
                        <el-row>
                            <el-col :span="10">
                                查询前多少条
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.limitNum_lpa" placeholder="查询前多少条" size="small" />
                            </el-col>
                        </el-row>
                    </el-col> -->
                    <el-col :span="2">
                        <el-checkbox v-model="checked_lpa" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="2.LOUVAIN社区发现算法">
                <el-row :gutter="5">
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="8">
                                边的属性
                            </el-col>
                            <el-col :span="16">
                                <el-select v-model="form.relationship_louvain" placeholder="请选择边的属性" size="small">
                                    <el-option v-for="item in options" :key="item.value" :value="item.value" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="10">
                                算法迭代次数
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.iterations_louvain" placeholder="算法迭代次数" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <!-- <el-col :span="7">
                        <el-row>
                            <el-col :span="10">
                                查询前多少条
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.limitNum_louvain" placeholder="查询前多少条" size="small" />
                            </el-col>
                        </el-row>
                    </el-col> -->
                    <el-col :span="2">
                        <el-checkbox v-model="checked_louvain" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="3.全部最短路径">
                <el-row :gutter="5">
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                第一个字段的节点名称
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.columnNodeName1_allshort" placeholder="第一个字段的节点名称" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                第二个字段的节点名称
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.columnNodeName2_allshort" placeholder="第二个字段的节点名称" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                最多找多少层
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.level_allshort" placeholder="最多找多少层" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                查询前多少条
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.limitNum_allshort" placeholder="查询前多少条" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="2">
                        <el-checkbox v-model="checked_allshort" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="4.最长路径">
                <el-row :gutter="5">
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                第一个字段的节点名称
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.columnNodeName1_longest" placeholder="第一个字段的节点名称" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                第二个字段的节点名称
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.columnNodeName2_longest" placeholder="第二个字段的节点名称" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                最多找多少层
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.level_longest" placeholder="最多找多少层" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="11">
                                查询前多少条
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="form.limitNum_longest" placeholder="查询前多少条" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="2">
                        <el-checkbox v-model="checked_longest" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="5.远近邻关系">
                <el-row :gutter="5">
                    <el-col :span="8">
                        <el-row>
                            <el-col :span="10">
                                字段的节点名称
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.columnNodeName" placeholder="字段的节点名称" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="10">
                                最多找多少层
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.level_neighbors" placeholder="最多找多少层" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="10">
                                查询前多少条
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.limitNum_neighbors" placeholder="查询前多少条" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="1">
                        <el-checkbox v-model="checked_neighbors" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="6.三角关系">
                <el-row :gutter="5">
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="8">
                                边的属性
                            </el-col>
                            <el-col :span="16">
                                <el-select v-model="form.relationship_triangle" placeholder="请选择边的属性" size="small">
                                    <el-option v-for="item in options" :key="item.value" :value="item.value" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="7">
                        <el-row>
                            <el-col :span="10">
                                查询前多少条
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="form.limitNum_triangle" placeholder="查询前多少条" size="small" />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="2">
                        <el-checkbox v-model="checked_triangle" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-divider />
            <el-form-item style="margin-left:600px">
                <el-button type="primary" @click="searchDataMap" size="small">确 认</el-button>
                <el-button @click="dialogShowGraph = false" size="small">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:10px;">
        <el-tab-pane label="LPA" name="first">
        </el-tab-pane>
        <el-tab-pane label="LOUVAIN" name="second">
        </el-tab-pane>
    </el-tabs>
    <div id="lpaChart" v-if="isShow" style="height:800px;width:100%"></div>
    <div id="louvainChart" v-else style="height:800px;width:100%"></div>
    <el-divider />
    <el-row>
        <el-col :span="11">
            <span class="el-icon-view">最长路径</span>
            <div id="chart_longest" style="height:500px;width:100%"></div>
        </el-col>
        <el-col :span="11">
            <span class="el-icon-view">全部最短路径</span>
            <div id="chart_allShort" style="height:500px;width:100%"></div>
        </el-col>
    </el-row>
    <el-divider />
    <span class="el-icon-view">远近邻关系</span>
    <div id="chart_nighbors" style="height:600px;width:90%"></div>
    <el-divider />
    <span class="el-icon-view">三角关系</span>
    <div id="chart_triangle" style="height:600px;width:100%"></div>
</div>
</template>

<script>
import NeoVis from 'neovis.js';
import * as tdbFun from "./tdb_result";
export default {
    components: {
        NeoVis,
    },
    data() {
        return {
            // cypher: "MATCH p=()-[r:FK]->() RETURN p LIMIT 5",
            activeName: '',
            isShow: false,
            dialogShowGraph: false,
            labelPosition: 'right',
            form: {
                relationship_lpa: '',
                iterations_lpa: 5,
                relationship_louvain: '',
                iterations_louvain: 5,
                columnNodeName1_longest: 'S10_I_CHOU_ACCT_CAT_HOU_KIND',
                columnNodeName2_longest: 'S10_I_CHOU_ACCT_CAT_OWN_NAME',
                limitNum_longest: 100,
                level_longest: 5,
                columnNodeName1_allshort: 'S10_I_CHOU_ACCT_CAT_HOU_KIND',
                columnNodeName2_allshort: 'S10_I_CHOU_ACCT_CAT_OWN_NAME',
                limitNum_allshort: 100,
                level_allshort: 5,
                relationship_triangle: '',
                limitNum_triangle: 100,
                columnNodeName: 'S10_I_CHOU_ACCT_CAT_HOU_KIND',
                limitNum_neighbors: 10,
                level_neighbors: 5,
            },
            checked_lpa: false,
            checked_louvain: false,
            checked_longest: false,
            checked_neighbors: false,
            checked_triangle: false,
            checked_allshort: false,
            options: [{
                value: 'FK'
            }, {
                value: 'FD'
            }, {
                value: 'EQUALS'
            }, {
                value: 'SAME'
            }, {
                value: 'BFD'
            }],
            columnData:[]
        }
    },
    mounted() {
        this.searchAllColumnOfNodes();
    },
    methods: {
        goIndex() {
            this.$router.push({
                name: '/tdb_result',
            });
        },
        // 查询所有字段节点
        searchAllColumnOfNodes(){
             tdbFun.searchAllColumnOfNodes().then(res => {
                if (res && res.success) {
                   this.columnData
                }
            })   
        },
        graphSetting() {
            this.dialogShowGraph = true;
        },
        dialogShowGraphClose() {
            this.dialogShowGraph = false;
        },
        handleClick(tab) {
            if (tab.label == 'LPA') {
                if (this.checked_lpa) {
                    this.isShow = true;
                    this.searchLabelPropagation();
                }
            } else if (tab.label == 'LOUVAIN') {
                if (this.checked_louvain) {
                    this.isShow = false;
                    this.searchLouVain();
                }
            }

        },
        // 查询数据地图
        searchDataMap() {
            this.dialogShowGraph = false;
            // lpa
            if (this.checked_lpa) {
                this.isShow = true;
                this.searchLabelPropagation();
            }
            // louvain
            if (this.checked_louvain) {
                this.isShow = false;
                this.searchLouVain();
            }
            // 全部最短
            if (this.checked_allshort) {
                this.searchAllShortPath();
            }
            // 最长
            if (this.checked_longest) {
                this.searchLongestPath();
            }
            // 三角关系
            if (this.checked_triangle) {
                this.searchTriangleRelation();
            }
            // 远近邻关系
            if (this.checked_neighbors) {
                this.searchNeighbors();
            }
        },
        // LPA社区发现算法
        searchLabelPropagation() {
            var params = {};
            params["relationship"] = this.form.relationship_lpa;
            params["iterations"] = this.form.iterations_lpa;
            params["limitNum"] = this.form.limitNum_lpa;
            tdbFun.searchLabelPropagation(params).then(res => {
                if (res && res.success) {
                    var lpaChart = this.$echarts.init(document.getElementById('lpaChart'));
                    lpaChart.showLoading();
                    lpaChart.hideLoading();
                    var option = this.getOption(res.data);
                    lpaChart.setOption(option);
                }
            })
        },
        // LOUVAIN社区发现算法
        searchLouVain() {
            var params = {};
            params["relationship"] = this.form.relationship_louvain;
            params["iterations"] = this.form.iterations_louvain;
            params["limitNum"] = this.form.limitNum_louvain;
            tdbFun.searchLouVain(params).then(res => {
                if (res && res.success) {
                    var louvainChart = this.$echarts.init(document.getElementById('louvainChart'));
                    louvainChart.showLoading();
                    louvainChart.hideLoading();
                    var option = this.getOption(res.data);
                    louvainChart.setOption(option);
                }
            })
        },
        // 求全部最短路径
        searchAllShortPath() {
            var params = {};
            params["columnNodeName1"] = this.form.columnNodeName1_allshort;
            params["columnNodeName2"] = this.form.columnNodeName2_allshort;
            params["level"] = this.form.level_allshort;
            params["limitNum"] = this.form.limitNum_allshort;
            tdbFun.searchAllShortPath(params).then(res => {
                if (res && res.success) {
                    var allShortChart = this.$echarts.init(document.getElementById('chart_allShort'));
                    allShortChart.showLoading();
                    allShortChart.hideLoading();
                    var graph = res.data;
                    graph.nodes.forEach(function (node) {
                        node.symbolSize = 10;
                    })
                    graph.categories = [];
                    for (var i = 0; i < 3; i++) {
                        if (i == 0) {
                            graph.categories[i] = {
                                name: '起始点'
                            };
                        } else if (i == 1) {
                            graph.categories[i] = {
                                name: '终止点'
                            };
                        } else if (i == 2) {
                            graph.categories[i] = {
                                name: '中间点'
                            };
                        }
                    }
                    var option = {
                        title: {
                            text: '全部最短路径',
                            subtext: 'Default layout',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {},
                        legend: [{
                            data: graph.categories.map(function (a) {
                                return a.name;
                            })
                        }],
                        animationDuration: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [{
                            //name: '点',
                            type: 'graph',
                            layout: 'force',
                            force: { //力引导图基本配置
                                //initLayout: ,   //力引导的初始化布局，默认使用xy轴的标点
                                repulsion: 2000, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                                gravity: 0.03, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                                edgeLength: [5, 10], //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                                layoutAnimation: true //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。                        
                            },
                            draggable: true,
                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories,
                            roam: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}'
                                }
                            },
                            edgeSymbol: ["", "arrow"],
                        }]
                    };
                    allShortChart.setOption(option);
                }
            })
        },
        // 求最长路径
        searchLongestPath() {
            var params = {};
            params["columnNodeName1"] = this.form.columnNodeName1_longest;
            params["columnNodeName2"] = this.form.columnNodeName2_longest;
            params["level"] = this.form.level_longest;
            params["limitNum"] = this.form.limitNum_longest;
            tdbFun.searchLongestPath(params).then(res => {
                if (res && res.success) {
                    var longestChart = echarts.init(document.getElementById("chart_longest"))
                    longestChart.showLoading();
                    longestChart.hideLoading();
                    var graph = res.data;
                    graph.nodes.forEach(function (node) {
                        node.symbolSize = 10;
                    })
                    graph.categories = [];
                    for (var i = 0; i < 3; i++) {
                        if (i == 0) {
                            graph.categories[i] = {
                                name: '起始点'
                            };
                        } else if (i == 1) {
                            graph.categories[i] = {
                                name: '终止点'
                            };
                        } else if (i == 2) {
                            graph.categories[i] = {
                                name: '中间点'
                            };
                        }
                    }
                    var option = {
                        title: {
                            text: '最长路径',
                            subtext: 'Default layout',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {},
                        legend: [{
                            data: graph.categories.map(function (a) {
                                return a.name;
                            })
                        }],
                        animationDuration: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [{
                            //name: '点',
                            type: 'graph',
                            layout: 'force',
                            force: { //力引导图基本配置
                                //initLayout: ,   //力引导的初始化布局，默认使用xy轴的标点
                                repulsion: 500, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                                gravity: 0.03, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                                edgeLength: [5, 10], //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                                layoutAnimation: true //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。                        
                            },
                            draggable: true,
                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories,
                            roam: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}'
                                }
                            },
                            edgeSymbol: ["", "arrow"],
                        }]
                    };
                    longestChart.setOption(option);
                }
            })
        },
        // 求远近邻关系
        searchNeighbors() {
            var params = {};
            params["columnNodeName"] = this.form.columnNodeName;
            params["level"] = this.form.level_neighbors;
            params["limitNum"] = this.form.limitNum_neighbors;
            tdbFun.searchNeighbors(params).then(res => {
                if (res && res.success) {
                    //远近关系       基本树形图
                    var nighborsChart = this.$echarts.init(document.getElementById('chart_nighbors'));
                    nighborsChart.showLoading();
                    nighborsChart.hideLoading();
                    res.data.children.forEach(function (datum, index) {
                        index % 2 === 0 && (datum.collapsed = true);
                    });
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'
                        },
                        series: [{
                            type: 'tree',
                            data: [res.data],
                            top: '1%',
                            left: '20%',
                            bottom: '1%',
                            right: '20%',
                            symbolSize: 10,
                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 9
                                }
                            },
                            emphasis: {
                                focus: 'descendant'
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }]
                    }
                    nighborsChart.setOption(option);
                }
            })
        },
        // 三角关系展示
        searchTriangleRelation() {
            var params = {};
            params["relationship"] = this.form.relationship_triangle;
            params["limitNum"] = this.form.limitNum_triangle;
            tdbFun.searchTriangleRelation(params).then(res => {
                if (res && res.success) {
                    var graph = res.data;
                    console.log(JSON.stringify(graph));
                    var triangleChart = this.$echarts.init(document.getElementById('chart_triangle'));
                    triangleChart.showLoading();
                    triangleChart.hideLoading();
                    for (let i = 0; i < graph.nodes.length; i++) {
                        graph.nodes[i].symbolSize = 10;
                    }
                    var option = {
                        color: '#57C7E3',
                        //标题
                        title: {
                            text: '三角关系展示',
                            subtext: 'Default layout',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {
                            formatter: function (params) {
                                if (params.value != undefined) {
                                    return params.name + ':' + '<br>' +
                                        params.value[0] + '<br>' +
                                        params.value[1] + '<br>' +
                                        params.value[2] + '<br>' +
                                        params.value[3] + '<br>' +
                                        params.value[4] + '<br>'
                                } else {
                                    return params.name;
                                }
                            }
                        },
                        animationDuration: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [{
                            name: 'Les Miserables',
                            type: 'graph',
                            layout: 'force',
                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories,
                            roam: true,
                            label: {
                                position: 'right',
                                formatter: '{b}'
                            },
                            force: { //力引导图基本配置
                                //initLayout: ,   //力引导的初始化布局，默认使用xy轴的标点
                                repulsion: 100, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                                edgeLength: [5, 10], //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                                layoutAnimation: true //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。                        
                            },
                            emphasis: {
                                focus: 'adjacency',
                                lineStyle: {
                                    width: 10
                                }
                            }
                        }]
                    }
                    triangleChart.setOption(option);
                }
            })
        },
        getOption(graph) {
            var colors = [];
            for (var i = 0; i < graph.categories.length; i++) {
                graph.categories[i] = {
                    name: '社区' + i
                }
                var colorStr = Math.floor(Math.random() * 0xffffff).toString(16);
                //如果颜色值是五位，则补零
                if (colorStr.length < 6) {
                    colorStr += '0';
                }
                if (colorStr == '005094') {
                    i--;
                    continue;
                }
                colors.push('#' + colorStr);
            }
            for (let i = 0; i < graph.nodes.length; i++) {
                graph.nodes[i].symbolSize = 10;
            }
            return {
                //标题
                title: {
                    text: '社区划分',
                    subtext: 'Default layout',
                    top: 'bottom',
                    left: 'right'
                },
                tooltip: {
                    formatter: function (params) {
                        if (params.value != undefined) {
                            // 显示节点信息
                            return params.name + ':' + '<br>' +
                                params.value[0] + '<br>' +
                                params.value[1] + '<br>' +
                                params.value[2] + '<br>' +
                                params.value[3] + '<br>' +
                                params.value[4] + '<br>' +
                                params.value[5] + '<br>'
                        } else {
                            // 显示节点连线信息
                            return params.name + '<br>' + "realtionType:" + params.data.relationType;
                        }
                    }
                },
                color: colors,
                //类目
                legend: [{
                    // selectedMode: 'single',
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 130,
                    data: graph.categories.map(function (a) {
                        return a.name;
                    })
                }],
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                    name: 'Les Miserables',
                    type: 'graph',
                    layout: 'none',
                    data: graph.nodes,
                    links: graph.links,
                    categories: graph.categories,
                    edgeSymbol: ['circle', 'arrow'], //边两端的标记类型,是否显示关系走向
                    edgeSymbolSize: [2, 4], //边两端的标记大小,剪头大小
                    roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
                    focusNodeAdjacency: true, //将指定的节点以及其所有邻接节点高亮。
                    label: {
                        // show:true,
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 10
                        }
                    }
                }]
            }
        },
        //随机生成颜色
        handleColors(i) {
            let color = '';
            let r = Math.floor(Math.random() * (256 + i));
            let g = Math.floor(Math.random() * (256 + i));
            let b = Math.floor(Math.random() * (256 + i));
            color = `rgb(${r},${g},${b})`;
            return color; //所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
        },
    }
}
</script>

<style lang="less" scoped>
.el-icon-view {
    color: #2196f3;
}
</style>
