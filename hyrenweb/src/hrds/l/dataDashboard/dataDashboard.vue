<template>
    <div id='dataDashboard'>
        <div class="container">
            <div class="row" id="toubu">
                <div class="btn-group pull-right">
                    <el-button size="mini" type="primary" @click="fullScreen">全屏预览</el-button>
                    <el-button size="mini" type="primary" v-if="layout!=undefined&&layout!=''"
                               @click="dialogBackgroundVisible=true">背景色
                    </el-button>
                    <el-button size="mini" type="primary" v-if="layout!=undefined&&layout!=''"
                               @click="dialogTitleVisible=true">选择主题
                    </el-button>
                    <el-button size="mini" type="primary" v-if="layout!=undefined&&layout!=''" @click="gridLine">网格线
                    </el-button>
                    <el-button size="mini" type="primary" v-if="layout!=undefined&&layout!=''"
                               @click="dialogTextLabelVisible=true">添加文本标签
                    </el-button>
                    <el-button size="mini" type="primary" v-if="layout!=undefined&&layout!=''"
                               @click="dialogTextLineVisible=true">添加分割线
                    </el-button>
                    <el-button size="mini" type="primary" @click="getVisualComponentInfo">添加组件</el-button>
                    <el-button size="mini" type="primary" @click="addDashboardButton">保存仪表板</el-button>
                    <el-button size="mini" type="danger" @click="goIndex">返回上一级</el-button>
                </div>
            </div>
            <el-divider/>
            <!--仪表板展示-->
            <div v-show="picshow" id="mydiv">
                <grid-layout :style="layout.length>0 ? grid_layout_backgroundcolor : 'background-color:#FFFFFF'"
                             :class="[is_gridline?'grid':'titleClass']" id="grid_style"
                             style="height: 800px;" :col-num="110" :row-height="11" :layout.sync="layout"
                             :isDraggable="is_del" :autoSize="true"
                             :isResizable="is_del" :isMirrored="false" :vertical-compact="false" :margin="[0, 0]"
                             :use-css-transforms="true">
                    <header :class="header" v-if="show_header">
                        <h3 class="header-title">{{auto_dashboard_info.dashboard_name}}</h3>
                        <div class="header-date">日期：{{today}}<span id="nowDate"></span></div>
                    </header>
                    <div class="wrapper" v-if="wrapper_show">
                        <div class="container-fluid">
                            <div class="row fill-h">
                                <div class="col-lg-3 fill-h">
                                    <div class="xpanel-wrapper xpanel-wrapper-2">
                                        <div class="xpanel">
                                            <!-- 地图飞线 -->
                                            <div class="fill-h" id="flyMap"></div>
                                        </div>
                                    </div>
                                    <div class="xpanel-wrapper xpanel-wrapper-2">
                                        <div class="xpanel">
                                            <!-- 世界地图 -->
                                            <div class="fill-h" id="worldMap"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 fill-h">
                                    <div class="xpanel-wrapper xpanel-wrapper-1">
                                        <div class="xpanel">
                                            <!-- 地图散点 -->
                                            <div class="fill-h" id="scatterMap"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 fill-h">
                                    <div class="xpanel-wrapper xpanel-wrapper-3">
                                        <div class="xpanel">
                                            <!-- 省份地图 -->
                                            <div class="fill-h" id="provinceMap"></div>
                                        </div>
                                    </div>
                                    <div class="xpanel-wrapper xpanel-wrapper-3">
                                        <div class="xpanel">
                                            <!-- 城市地图 -->
                                            <div class="fill-h" id="cityMap"></div>
                                        </div>
                                    </div>
                                    <div class="xpanel-wrapper xpanel-wrapper-3">
                                        <div class="xpanel">
                                            <!-- 区县地图 -->
                                            <div class="fill-h" id="countyMap"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer :class="footer" v-if="show_footer"></footer>
                    <grid-item style="background-color:transparent;border: 0px;" name="pic" v-for="item in layout"
                               :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i"
                               :type="item.type"
                               @resized="resizedEvent">
                        <div :id="item.type" style="width: 500px;height:300px;"></div>
                    </grid-item>
                </grid-layout>
            </div>
        </div>
        <!-- 添加组件模态框 -->
        <el-dialog title="添加组件" :visible.sync="dialogAddComponentVisible" width="50%"
                   :before-close="beforeAddComponentClose">
            <el-table :data="auto_comp_sum_array.slice((currPage - 1) * pageSize,currPage * pageSize)" border
                      style="width: 100%" ref="multipleComponent" :row-key="(row)=>{ return row.column_id}"
                      size="medium" @select="componentSelectionChange" @select-all='allComponentSelect'>
                <el-table-column width="40" align="center" type="selection" :reserve-selection="true"/>
                <el-table-column label="序号" width="50px" align="left">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="component_name" label="组件名称" align="center"/>
                <el-table-column prop="component_desc" label="组件描述" align="center"/>
            </el-table>
            <!-- 分页内容 -->
            <el-row>
                <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage"
                               @size-change="handleSizeChange" :page-sizes="[5, 10, 25, 50, 100,500]"
                               :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalSize"
                               class='locationcenter'/>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">取 消</el-button>
                <el-button type="primary" @click="showComponentOnDashboard" size="mini">确 认
                </el-button>
            </div>
        </el-dialog>
        <!-- 添加仪表盘模态框 -->
        <el-dialog title="添加仪表盘" :visible.sync="dialogDashboardVisible" width="50%"
                   :before-close="beforeDashboardClose">
            <el-form ref="auto_dashboard_info" :model="auto_dashboard_info" label-width="160px">
                <el-form-item label="仪表盘名称">
                    <el-input v-model="auto_dashboard_info.dashboard_name"></el-input>
                </el-form-item>
                <el-form-item label="仪表盘描述">
                    <el-input v-model="auto_dashboard_info.dashboard_desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDashboardVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveDashboard" size="mini">保 存
                </el-button>
            </div>
        </el-dialog>
        <!-- 仪表盘主题设置模态框 -->
        <el-dialog title="仪表盘主题设置" :visible.sync="dialogTitleVisible" width="50%" :before-close="beforeTitleClose">
            <el-form ref="addTitelForm" :model="addTitelForm" label-width="130px">
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item" :key="index" v-for="(data,index) in titleData" data-dismiss="modal"
                            @click="chooseTitle(data)">
                            <span>{{data.CN_type}}</span>
                            <img class="pull-right" :src="data.picurl" style="width: 30px;height: 100%;">
                        </li>
                    </ul>
                </div>
            </el-form>
        </el-dialog>
        <!-- 添加分割线模态框 -->
        <el-dialog title="添加分割线" :visible.sync="dialogTextLineVisible" width="50%" :before-close="beforeTextLineClose">
            <el-form ref="auto_line_info" :model="auto_line_info" label-width="130px">
                <el-form-item label="分割线类型">
                    <el-select v-model="auto_line_info.line_type" placeholder="请选择分割线类型">
                        <el-option label="横向分割线" value="heng"></el-option>
                        <el-option label="纵向分割线" value="zong"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分割线颜色">
                    <el-select v-model="auto_line_info.line_color" placeholder="请选择分割线颜色">
                        <el-option :key="index" v-for="(data,index) in linefontcolor" :label="data.cn_name"
                                   :value="data.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTextLineVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirmtextline(48,5,0,0)" size="mini">确 认
                </el-button>
            </div>
        </el-dialog>
        <!-- 设置背景色模态框 -->
        <el-dialog title="仪表板背景色" :visible.sync="dialogBackgroundVisible" width="50%"
                   :before-close="beforeBackgroundClose">
            <el-form ref="auto_dashboard_info" :model="auto_dashboard_info" label-width="130px">
                <el-form-item label="仪表板背景色">
                    <el-row>
                        <el-col :span="2">
                            <el-color-picker v-model="auto_dashboard_info.background"></el-color-picker>
                        </el-col>
                        <el-col :span="12">
                            <el-input style="width:320px" v-model="auto_dashboard_info.background">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogBackgroundVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="confirmBackgroudColor">确定</el-button>
            </div>
        </el-dialog>
        <!-- 添加文本标签模态框 -->
        <el-dialog title="添加文本标签" :visible.sync="dialogTextLabelVisible" width="50%"
                   :before-close="beforeTextLabelClose">
            <el-form ref="auto_label_info" :model="auto_label_info" label-width="130px">
                <el-form-item label="文本标签">
                    <el-input v-model="auto_label_info.label_content"></el-input>
                </el-form-item>
                <el-form-item label="标签背景颜色">
                    <el-row>
                        <el-col :span="2">
                            <el-color-picker v-model="auto_label_info.label_color"></el-color-picker>
                        </el-col>
                        <el-col :span="10">
                            <el-input style="width:320px" v-model="auto_label_info.label_color"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="字体颜色">
                    <el-row>
                        <el-col :span="2">
                            <el-color-picker v-model="auto_label_info.textStyle.color"></el-color-picker>
                        </el-col>
                        <el-col :span="10">
                            <el-input style="width:320px" v-model="auto_label_info.textStyle.color"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="字体粗细">
                    <el-select v-model="auto_label_info.textStyle.fontWeight" placeholder="请选择字体粗细">
                        <el-option label="细的" value="lighter"></el-option>
                        <el-option label="标准的" value="normal"></el-option>
                        <el-option label="粗的" value="bold"></el-option>
                        <el-option label="加粗的" value="bolder"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体大小">
                    <el-input v-model="auto_label_info.textStyle.fontSize"></el-input>
                </el-form-item>
                <el-form-item label="字体系列">
                    <el-select v-model="auto_label_info.textStyle.fontFamily" placeholder="请选择字体系列">
                        <el-option label="华文黑体" value="STHeiti"></el-option>
                        <el-option label="华文楷体" value="STKaiti"></el-option>
                        <el-option label="华文宋体" value="STSong"></el-option>
                        <el-option label="华文仿宋" value="STFangsong"></el-option>
                        <el-option label="黑体" value="SimHei"></el-option>
                        <el-option label="宋体" value="SimSun"></el-option>
                        <el-option label="新宋体" value="NSimSun"></el-option>
                        <el-option label="仿宋" value="FangSong"></el-option>
                        <el-option label="楷体" value="KaiTi"></el-option>
                        <el-option label="仿宋_GB2312" value="FangSong_GB2312"></el-option>
                        <el-option label="楷体_GB2312" value="KaiTi_GB2312"></el-option>
                        <el-option label="微软正黑体" value="Microsoft JhengHei"></el-option>
                        <el-option label="微软雅黑体" value="Microsoft YaHei"></el-option>
                        <el-option label="隶书" value="LiSu"></el-option>
                        <el-option label="幼圆" value="YouYuan"></el-option>
                        <el-option label="华文细黑" value="STXihei"></el-option>
                        <el-option label="华文楷体" value="STKaiti"></el-option>
                        <el-option label="华文宋体" value="STSong"></el-option>
                        <el-option label="华文中宋" value="STZhongsong"></el-option>
                        <el-option label="华文仿宋" value="STFangsong"></el-option>
                        <el-option label="方正舒体" value="FZShuTi"></el-option>
                        <el-option label="方正姚体" value="FZYaoti"></el-option>
                        <el-option label="华文彩云" value="STCaiyun"></el-option>
                        <el-option label="华文琥珀" value="STHupo"></el-option>
                        <el-option label="华文隶书" value="STLiti"></el-option>
                        <el-option label="华文行楷" value="STXingkai"></el-option>
                        <el-option label="华文新魏" value="STXinwei"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体风格">
                    <el-select v-model="auto_label_info.textStyle.fontStyle" placeholder="请选择字体风格">
                        <el-option label="标准风格" value="normal"></el-option>
                        <el-option label="斜体风格" value="italic"></el-option>
                        <el-option label="倾斜风格" value="oblique"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体对齐方式">
                    <el-select v-model="auto_label_info.textStyle.align" placeholder="请选择活动区域">
                        <el-option label="左对齐" value="flex-start"></el-option>
                        <el-option label="居中对齐" value="center"></el-option>
                        <el-option label="右对齐" value="flex-end"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字体垂直对齐方式">
                    <el-select v-model="auto_label_info.textStyle.verticalAlign" placeholder="请选择活动区域">
                        <el-option label="上对齐" value="flex-start"></el-option>
                        <el-option label="中对齐" value="center"></el-option>
                        <el-option label="下对齐" value="flex-end"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTextLabelVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirmTextLable()" size="mini">确 认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueGridLayout from 'vue-grid-layout';
    import * as functionAll from "./dataDashboard";
    import * as generatepic from "../generatePic/generatePic";
    import * as drawLine from "../generatePic/line";
    import * as drawBarChart from "../generatePic/barChart";
    import * as drawStackingBarChart from "../generatePic/stackingBarChart";
    import * as drawPolarBarChart from "../generatePic/polarBarChart";
    import * as drawPieChart from "../generatePic/pieChart";
    import * as drawScatterChart from "../generatePic/scatterChart";
    import * as drawBlChart from "../generatePic/blChart";
    import * as drawBlSimpleChart from "../generatePic/blSimpleChart";
    import * as drawTreeMapChart from "../generatePic/treeMapChart";
    import * as drawMapChart from "../generatePic/mapChart";
import { Chart } from 'highcharts';
    export default {
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
        },
        data() {
            return {
                totalSize: 0,// 总记录数
                currPage: 1,// 当前页
                pageSize: 10,// 每页显示记录数
                addTitelForm: {},
                selectRow: [],
                dialogBackgroundVisible: false,
                dialogAddComponentVisible: false,
                dialogDashboardVisible: false,
                dialogTitleVisible: false,
                dialogTextLineVisible: false,
                dialogTextLabelVisible: false,
                layout: [],
                echartdata: [],
                bubbleIds: [],
                bubble_echartdatas: [],
                echart_layouts: [],
                // 组件名称
                tmp_component_names: [],
                myCharts: [],
                barmdIds: [],
                barmd_echartdatas: [],
                cardstyle: "",
                cardname: "",
                bcolor: "",
                tcolr:"",
                lcolr:"",
                // 组件汇总表集合信息
                auto_comp_sum_array: [],
                //组件汇总表
                auto_comp_sum: {
                    component_name: "",
                    component_desc: "",
                    data_source: "",
                    sources_obj: "",
                    exe_sql: "",
                    chart_type: "",
                    background: "transparent", //常规设置
                },
                //仪表盘信息集合
                auto_dashboard_info_list: [],
                // 仪表盘信息
                auto_dashboard_info: {
                    dashboard_name: "",
                    dashboard_desc: "",
                    bordertype: "",
                    bordercolor: "",
                    borderwidth: "",
                    background: "#eeeeee",
                    is_gridline: '0'
                },
                picshow: false,
                echartThemeJson: require("@/assets/json/EchartTheme.json"),
                delpng: require('@/assets/images/del.png'),
                selectRow: [],
                //主题设置参数
                titleData: [{
                        "code": "00",
                        "CN_type": "原始",
                        "type": "source",
                        "tcolor": "#FFFFFF",
                        "lcolor": "#FFFFFF",
                        "picurl": require("@/assets/images/theme/source.jpg")
                    },
                    {
                        "code": "01",
                        "CN_type": "综合模板1",
                        "tcolor": "#3f44ff",
                        "lcolor": "#b0c2f9",
                        "picurl": require("@/assets/images/tpl1/thumb.jpg")
                    },
                    {
                        "code": "02",
                        "CN_type": "综合模板2",
                        "tcolor": "#3f44ff",
                        "lcolor": "#b0c2f9",
                        "picurl": require("@/assets/images/tpl2/thumb.jpg")
                    },
                    {
                        "code": "03",
                        "CN_type": "综合模板3",
                        "tcolor": "#3f44ff",
                        "lcolor": "#b0c2f9",
                        "picurl": require("@/assets/images/tpl3/thumb.jpg")
                    },
                    {
                        "code": "04",
                        "CN_type": "综合模板4",
                        "tcolor": "#3f44ff",
                        "lcolor": "#b0c2f9",
                        "picurl": require("@/assets/images/tpl4/thumb.jpg")
                    },
                    {
                        "code": "05",
                        "CN_type": "旭日东升饼图",
                        "tcolor": "#3f44ff",
                        "lcolor": "#b0c2f9",
                        "picurl": require("@/assets/images/tpl5/thumb.jpg")
                    }
                ],
                grid_layout_backgroundcolor: "background-color:transparent;",// 背景色
                chart_obj_array: [],
                echart_theme: "",
                chooseTitle_show: false,
                global_component_array: [],
                global_component_id_array: [],
                tableData: [],
                tableDataLength: "",
                auto_label_info: { //标签配置
                    "label_title": "",
                    "label_content": "",
                    "label_size": "0",
                    "label_color": "#FFFFFF",
                    textStyle: { //字体配置
                        color: "#000000",
                        fontFamily: "SimSun",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        align: "center",
                        verticalAlign: "center",
                        fontSize: "15",
                        font_corr_tname: "",
                        font_corr_id: ""
                    }
                },
                auto_label_info_array: [],
                auto_line_info: {
                    "line_type": "heng",
                    "line_color": "05"
                },
                auto_line_info_array: [],
                textlabelarray: [],
                textlinearray: [],
                // 分割线颜色
                linefontcolor: [{
                    "code": "00",
                    "type": "red",
                    "style": "color:red",
                    "cn_name": "红"
                },
                    {
                        "code": "01",
                        "type": "yellow",
                        "style": "color:yellow",
                        "cn_name": "黄"
                    },
                    {
                        "code": "02",
                        "type": "blue",
                        "style": "color:blue",
                        "cn_name": "蓝"
                    },
                    {
                        "code": "03",
                        "type": "green",
                        "style": "color:green",
                        "cn_name": "绿"
                    },
                    {
                        "code": "04",
                        "type": "grey",
                        "style": "color:grey",
                        "cn_name": "灰"
                    },
                    {
                        "code": "05",
                        "type": "black",
                        "style": "color:black",
                        "cn_name": "黑"
                    },
                    {
                        "code": "06",
                        "type": "white",
                        "style": "color:white",
                        "cn_name": "白"
                    },
                ],
                label_layout: [],
                line_layout: [],
                chooseallcomponentmodel: false,
                //标题设置
                titleFont: {
                    align: "center", //标题水平位置
                    backgroundcolor: "#ffffff", //标题背景色
                    bordercolor: "#ffffff", //标题边框颜色
                    borderwidth: 0, //标题边框粗细
                    borderradius: 0, //坐标轴边框圆角
                    color: "#000000", //字体颜色
                    fontfamily: "Arial", //字体系列
                    verticalalign: "top", //标题垂直位置
                    fontsize: 24, //字体大小
                    fontstyle: "normal", //字体风格
                    fontweight: "normal", //字体粗细
                    lineheight: "40", //字体行高
                },
                //轴线设置--x轴
                xAxis: {
                    axis_type: "1", //轴类型
                    data: [], //x轴数据
                    show: '1', //是否显示
                    position: "bottom", //轴位置
                    axisoffset: 0, //轴偏移量
                    name: "x轴", //轴名称
                    namelocation: "end", //轴名称位置
                    min: "",
                    max: "",
                    silent: "1",
                    nameTextStyle: {}, //--轴名称样式
                    namegap: 15, //名称与轴线距离
                    namerotate: 0, //名称旋转角度
                    axisLine: {}, //--轴线
                    axisLabel: {} //--刻度标签
                },
                xAxisLine: {
                    show: '1', //轴线是否显示
                    onzero: '1', //是否在0刻度上
                    // symbol: "none", //箭头显示方式
                    // symboloffset: 0, //箭头偏移量
                },
                xAxisLabel: {
                    show: '1', //刻度标签是否显示
                    inside: '0', //刻度标签是否朝内
                    rotate: 0, //刻度标签旋转角度
                    margin: 10, //刻度标签与轴线间距
                    formatter: null, //刻度标签内容格式器
                },
                //轴线设置--y轴
                yAxis: {
                    axis_type: "2", //轴类型
                    show: '1', //是否显示
                    position: "left", //轴位置
                    axisoffset: 0, //轴偏移量
                    name: "y轴", //轴名称
                    namelocation: "end", //轴名称位置
                    silent: "1",
                    nameTextStyle: {}, //--轴名称样式
                    namegap: 15, //名称与轴线距离
                    namerotate: 0, //名称旋转角度
                    axisLine: {}, //--轴线
                    axisLabel: {} //--刻度标签
                },
                yAxisLine: {
                    show: '1', //轴线是否显示
                    onzero: '1', //是否在0刻度上
                    symbol: "none", //箭头显示方式
                    symbolOffset: 0, //箭头偏移量
                },
                yAxisLabel: {
                    show: '1', //刻度标签是否显示
                    inside: '0', //刻度标签是否朝内
                    rotate: 0, //刻度标签旋转角度
                    margin: 20, //刻度标签与轴线间距
                    formatter: null, //刻度标签内容格式器
                },
                //轴线字体
                axisStyle: {
                    align: "center", //坐标轴水平位置
                    verticalalign: "middle", //坐标轴垂直位置
                    backgroundcolor: "#ffffff", //坐标轴背景色
                    bordercolor: "#ffffff", //坐标轴边框颜色
                    borderwidth: 0, //坐标轴边框粗细
                    borderradius: 0, //坐标轴边框圆角
                    color: "#000000", //字体颜色
                    fontfamily: "Arial", //字体系列
                    fontsize: 12, //字体大小
                    fontstyle: "normal", //字体风格
                    fontweight: "normal", //字体粗细
                    lineheight: "", //字体行高
                },
                //表格样式
                tabStyle: {
                    th_background: "transparent",
                    is_gridline: "1",
                    is_zebraline: "1",
                    zl_background: "#eee",
                },
                //Echarts图例
                legendStyle: {
                    type: "plain", //图例类型
                    show: '1', //是否显示
                    tooltip: '1', //是否显示提示
                    left_distance: "10", //左边距
                    top_distance: "0", //上边距
                    right_distance: "0", //右边距
                    bottom_distance: "0", //下边距
                    width: "0", //宽度
                    height: "0", //高度
                    orient: "horizontal", //布局朝向
                    align: "auto", //图例与文本对齐,
                    padding: 5, //图例内边距
                    itemgap: 10, //图例间隔
                    itemwidth: 25, //图例宽度
                    itemheight: 14, //图例高度
                    inactivecolor: "#000000", //图例关闭时颜色
                    backgroundcolor: "#ffffff", //图例背景颜色
                    bordercolor: "#ffffff", //边框颜色
                    borderwidth: 0, //边框大小
                    interval: 100, //图例容量(地图)
                    intervalnumber: 4, //图例个数(地图)
                },
                //图表配置
                seriesStyle: {
                    type: "", //图表类型
                    center: ['50%', '50%'], //饼图的中心（圆心）坐标
                    provincename: "全国", //省份名称(地图)
                },
                //文本标签
                echartsLabel: {
                    show_label: '1', //是否显示文本标签
                    position: "top", //标签位置
                    formatter: "{b}", //格式化文本标签
                    show_line: '1', //是否显示文本标签引导线
                    smooth: '0', //是否平滑视觉引导线
                },
                is_gridline: false, // 是否使用网格线
                is_del: true,// 是否可以删除组件
                titleClass:'grid',//主题样式
                show_footer:false,// 显示底部样式
                show_header:false,// 显示头部样式
                wrapper_show:false,
                footer:'',
                header:'',
                today:''
            }
        },
        created() {
            // 编辑时调用
            if (this.$route.query.dashboard_id != undefined && this.$route.query.dashboard_id != '') {
                this.picshow = true;
                this.getDataDashboardInfoById(this.$route.query.dashboard_id);

            } else {
                this.auto_dashboard_info.dashboard_theme = "00";
            }
            this.$nextTick(() => {
                if (!this.is_gridline) {
                    $("#grid_style").removeClass("grid");
                }
            })
            this.getToday();
        },
        mounted() {
            // 监控窗口变化
            window.addEventListener('resize', () => {
                if (this.is_del ) {
                    if (!this.checkFull()) {
                        $('#toubu').show();
                        this.chooseTitle_show = true;
                        $("#dataDashboard").css("background-color", "background-color:#FFFFFF;");
                        this.is_del = true;
                        for (var i = 0; i < this.selectRow.length; i++) {
                            if (this.selectRow[i].chart_type != "card" && this.selectRow[i].chart_type != "table" &&
                                this.selectRow[i].chart_type != "barmd" && this.selectRow[i].chart_type != "bubble") {
                                $("#" + this.selectRow[i].component_id + " img").css("display", "none");
                            }
                        }
                    }
                } else {
                    if (!this.checkFull()) {
                        $('#dataDashboard').show();
                    }
                }
            });
        },
        watch: {
            layout(layout) {
                var chart_obj_array = this.chart_obj_array;
                var dashboard_theme = this.auto_dashboard_info.dashboard_theme;
                if (layout.length > 0) {
                    $("div[name='pic']").each(function () {
                        $(this).mouseup(function () {
                            var $this = $(this);
                            var thisid = $this.children('div').attr("id")
                            var w = $(this).width() + "px";
                            var h = $(this).height() + "px";
                            $(this).children().eq(0).css({
                                "width": w,
                                "height": h
                            })
                            for (var i = 0; i < chart_obj_array.length; i++) {
                                var layouttype = chart_obj_array[i].layouttype;
                                if (layouttype == "card") {
                                    if (chart_obj_array[i].id == thisid) {
                                        //卡片大小变化
                                        var id = chart_obj_array[i].id;
                                        var idwidth = $("#" + id).width();
                                        var idheight = $("#" + id).height();
                                        $this.find("div[class='cardclass']").css('font-size', "12px");
                                        var titleHeight = $("#" + id).find("div[name='cardcomponentname']").height();
                                        //循环修改大小直至大于最大高度
                                        for (var i = 12; i < idheight - titleHeight; i++) {
                                            if ($this.find("div[class='cardclass']").height() > idheight - titleHeight) {
                                                //当容器高度大于最大高度的时候，上一个尝试的值就是最佳大小
                                                $this.find("div[class='cardclass']").css('font-size', (i - 2) + "px");
                                                //结束循环
                                                break;
                                            } else {
                                                //如果小于最大高度，文字大小加1继续尝试
                                                $this.find("div[class='cardclass']").css('font-size', i + "px");
                                            }
                                        }
                                    }
                                } else if (layouttype == "table") {
                                    if (chart_obj_array[i].id == thisid) {
                                        //表格大小变化
                                        var id = chart_obj_array[i].id;
                                        var idwidth = $("#" + id).width();
                                        var idheight = $("#" + id).height();
                                        var domH = Math.sqrt(idwidth * idwidth + idheight * idheight);
                                        $this.find("div[name='tablediv']").css('height', idheight - 20 + "px");
                                        $this.find("table").css('height', idheight - 20 + "px");
                                    }
                                } else if (layouttype == "label") {
                                    if (chart_obj_array[i].id == thisid) {
                                        //文本标签大小变化
                                        var id = chart_obj_array[i].id;
                                        var idwidth = $("#" + id).width();
                                        var idheight = $("#" + id).height();
                                        $this.find("div[class='labelclass']").css('font-size', "12px");
                                        //循环修改大小直至大于最大高度
                                        for (var i = 12; i < idheight; i++) {
                                            if ($this.find("div[class='labelclass']").height() > idheight) {
                                                //当容器高度大于最大高度的时候，上一个尝试的值就是最佳大小
                                                $this.find("div[class='labelclass']").css('font-size', (i - 2) + "px");
                                                //结束循环
                                                break;
                                            } else {
                                                //如果小于最大高度，文字大小加1继续尝试
                                                $this.find("div[class='labelclass']").css('font-size', i + "px");
                                            }
                                        }
                                        var lablewidth = $this.find("div[class='labelclass']").width();
                                        var difference = (idwidth - lablewidth) / 2;
                                        $this.find("div[class='labelclass']").css('margin-left', difference + "px");
                                    }
                                } else if (layouttype == "borderline") {
                                
                                } else {
                                    if (id != undefined && id != '') {
                                        var Chart = echarts.init(document.getElementById(id));
                                        Chart.resize();
                                    }
                                }
                            }
                        });
                    });
                }
            }
        },
        methods: {
            //获取今日日期
            getToday() {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                this.today = year + "年" + month + "月" + day + "日";
            },
            resizedEvent(i, newH, newW, newHPx, newWPx) {
                var lineflag = false;
                var textflag = false;
                this.layout.forEach(function (item, index) {
                    var id = item.i;
                    if (id == i) {
                        if (item.label == '1') {// 分割线
                            lineflag = true;
                        } else if (item.label == '0') {// 文本标签
                            textflag = true;
                        } else {
                            i = item.type;
                            item.i = item.type;
                        }
                    }
                })
                if (lineflag) {// 分割线
                    $("#" + i).width(newW * 10 + "px");
                    $("#" + i).height(newH * 10 + "px");
                } else if (textflag) {// 文本标签
                    $("#" + i).width(newW * 10 + "px");
                    $("#" + i).height(newH * 10 + "px");
                } else {
                    $("#" + i).height(newH * 10);
                    $("#" + i).width(newW * 10);
                    var Chart = echarts.init(document.getElementById(i));
                    Chart.resize();
                }
            },
            // 返回上一级
            goIndex() {
                this.$router.push({
                    path: 'dataDashboardList'
                })
            },
            //根据仪表盘ID与仪表盘名称获取仪表盘信息(编辑回显)
            getDataDashboardInfoById(dashboard_id) {
                functionAll.getDataDashboardInfoById({
                    "dashboard_id": dashboard_id
                }).then(res => {
                    if (res && res.success) {
                        this.global_component_array = res.data;
                        // 分割线
                        if (undefined != res.data.autoLineInfo && '' != res.data.autoLineInfo) {
                            this.auto_line_info_array = res.data.autoLineInfo;
                        }
                        // 仪表板标题表与字体表信息
                        if (undefined != res.data.labelAndFont && '' != res.data.labelAndFont) {
                            this.auto_label_info_array = res.data.labelAndFont;
                        }
                        // 仪表盘信息
                        this.auto_dashboard_info = res.data.auto_dashboard_info;
                        var code = this.auto_dashboard_info.dashboard_theme;
                        // 组件信息
                        this.selectRow = res.data.autoCompSums;
                        //把文本标签,分割线的layout区分开
                        for (var i = 0; i < res.data.layout.length; i++) {
                            if ("0" == res.data.layout[i].label) {// 文本标签
                                this.label_layout.push(res.data.layout[i]);
                            } else if ("1" == res.data.layout[i].label) {// 分割线
                                this.line_layout.push(res.data.layout[i]);
                            } else {
                                this.layout.push(res.data.layout[i]);
                            }
                        }
                        // 组件ID
                        var component_id_array = [];
                        for (var i = 0; i < this.layout.length; i++) {
                            var id = this.layout[i].type;
                            component_id_array.push(id);
                        }
                        this.global_component_id_array = component_id_array;
                        // 获取当前主题
                        var echart_theme_obj = {};
                        for (var i = 0; i < this.titleData.length; i++) {
                            if (this.titleData[i].code == code) {
                                echart_theme_obj = this.titleData[i];
                            }
                        }
                        this.echart_theme = echart_theme_obj;
                        if (code != "00") {
                            //更换卡片，标签，分割线，表格的颜色为组件的主题颜色
                            setTimeout(() => {
                                this.chooseTitle(this.echart_theme);
                            }, 2000)
                        }
                        var index = 0;
                        for (var i = 0; i < this.titleData.length; i++) {
                            if (code == "0" + i) {
                                index = i;
                            }
                        }
                        this.bcolor = this.titleData[index].bcolor;
                        // 卡片表格回显
                        for (var i = 0; i < this.chart_obj_array.length; i++) {
                            if (this.chart_obj_array[i].layouttype == "card") {
                                $("#" + this.chart_obj_array[i].id).find("div[name='cardcomponentname']").css({
                                    "background-color": this.titleData[index].ncolor,
                                    "color": this.titleData[index].fcolor
                                });
                                $("#" + this.chart_obj_array[i].id).find("div[class='cardclass']").css({
                                    'background-color': this.titleData[index].ncolor,
                                    "color": this.titleData[index].fcolor
                                });
                                this.cardname = "background:" + this.titleData[index].ncolor + ";color:" + this.titleData[index].fcolor + ";font-family:" + this.titleFont.fontFamily;
                                this.cardname += ";font-style:" + this.titleFont.fontStyle + ";font-weight:" + this.titleFont.fontWeight;
                                this.cardname += ";font-size:" + this.titleFont.fontSize + "px;line-height:" + this.titleFont.lineHeight + "px;text-align:center;padding-left:15px";

                                this.cardstyle = "word-wrap:break-word;text-align:center;background:" + this.titleData[index].ncolor + ";color:" + this.titleData[index].fcolor;
                                this.cardstyle += ";font-family:" + this.titleFont.fontFamily + ";font-style:" + this.titleFont.fontStyle + ";font-weight:" + this.titleFont.fontWeight + "px";
                            } else if (this.chart_obj_array[i].layouttype == "table") {
                                this.tabStyle.th_background = this.titleData[index].ncolor;
                                this.tabStyle.zl_background = this.titleData[index].ncolor;
                            }
                        }
                        this.$nextTick(() => {
                            // 仪表盘展示
                            this.echartpic(res.data, component_id_array);                          
                            // 文本标签回显
                            this.textlabel_back();
                            // 分割线回显
                            this.textline_back();
                            for (var i = 0; i < this.layout.length; i++) {
                                let layoutElement = this.layout[i];
                                this.resizedEvent(layoutElement.type, layoutElement.h, layoutElement.w, layoutElement.y, layoutElement.x);
                            }
                            this.grid_layout_backgroundcolor = this.auto_dashboard_info.background;
                            $("div[name='pic']").each(function () {
                                $(this).trigger("mouseup");
                            });
                        })
                    }
                })
            },
            //分割线编辑回显
            textline_back() {
                this.$nextTick(function () {
                    for (var i = 0; i < this.line_layout.length; i++) {
                        var id = this.line_layout[i].type;
                        var w = this.line_layout[i].w;
                        var h = this.line_layout[i].h;
                        if (this.auto_line_info_array[i].line_type == 'heng') {
                            var html = "<div name='linecomponentname'></div>" +
                                "<div class='lineclass' style='width:100%;height:2px;overflow:hidden;margin-top:15px;'></div>"
                        } else {
                            var html = "<div name='linecomponentname'></div>" +
                                "<div class='lineclass' style='width:2px;height:1000px;overflow:hidden;margin-left:10px;'></div>"
                        }
                        $("#" + id).css("overflow", "hidden");
                        $("#" + id).css("position", "relative");
                        $("#" + id).css("height", h * 10 + "px");
                        $("#" + id).css("width", w * 10 + "px");
                        $("#" + id).html(html);
                        for (var j = 0; j < this.linefontcolor.length; j++) {
                            if (this.linefontcolor[j].code == this.auto_line_info_array[i].line_color) {
                                $("#" + id).find("div[class='lineclass']").css('background', this.linefontcolor[j].type);
                            }
                        }
                        //添加打叉按钮
                        if (this.is_del) {
                            var imagevueobj = new lineOrLabelDelProfile({
                                propsData: this.initPropsData(this.line_layout[i],this.auto_line_info,this.auto_line_info_array,
                                                                this.line_layout,this.textlinearray,"line")
                            }).$mount();
                            this.linedelimage(id, imagevueobj);
                        }
                        var obj = {};
                        obj.layouttype = "borderline";
                        obj.id = id;
                        this.chart_obj_array.push(obj);
                        this.textlinearray.push(obj);
                        $("#" + id).trigger("mouseup");
                    }
                });
            },
            //文本标签编辑回显
            textlabel_back() {
                this.$nextTick(function () {
                    for (var i = 0; i < this.label_layout.length; i++) {
                        var id = this.label_layout[i].type;
                        var h = this.label_layout[i].h;
                        var w = this.label_layout[i].w;
                        var auto_label_info = this.auto_label_info_array[i];
                        var textStyle = auto_label_info.textStyle;
                        $("#" + id).css("overflow", "hidden");
                        $("#" + id).css("position", "relative");
                        $("#" + id).css("margin-top", "2px");
                        $("#" + id).css("background", auto_label_info.label_color);
                        $("#" + id).css("display", "flex");
                        $("#" + id).css("align-items", textStyle.verticalalign);
                        $("#" + id).css("justify-content", textStyle.align);
                        $("#" + id).css("height", h * 10 + "px");
                        $("#" + id).css("width", w * 10 + "px");
                        var html = "<div name='labelcomponentname'></div>";
                        //字体处理
                        var style = "color:" + textStyle.color + "; font-family:" + textStyle.fontfamily;
                        style += "; font-style:" + textStyle.fontstyle + "; font-weight:" + textStyle.fontweight;
                        style += "; text-align:" + textStyle.align + "; vertical-align:" + textStyle.verticalalign;
                        style += "; font-size:" + textStyle.fontsize + "px";
                        html = html + "<p style='" + style + "'>" + auto_label_info.label_content + "</p>"
                        $("#" + id).html(html);
                        //添加打叉按钮
                        if (this.is_del) {
                            var imagevueobj = new lineOrLabelDelProfile({
                                propsData: this.initPropsData(this.label_layout[i],this.auto_label_info,this.auto_label_info_array,
                                                                this.label_layout,this.textlabelarray,'label')
                            }).$mount();
                            this.labeldelimage(id, imagevueobj);
                        }
                        var obj = {};
                        obj.layouttype = "label";
                        obj.id = id;
                        obj.content = auto_label_info.label_content;
                        this.chart_obj_array.push(obj);
                        this.textlabelarray.push(obj);
                        $("#" + id).trigger("mouseup");
                    }
                });
            },
            initPropsData(echart_layout,auto_info,auto_info_array,line_or_label_layout,textarray,type){
                return {   
                    echart_layout: echart_layout,
                    line_or_label_layout: line_or_label_layout,
                    layout: this.layout,
                    auto_info:auto_info,
                    auto_info_array: auto_info_array,
                    textarray: textarray,
                    chart_obj_array: this.chart_obj_array,
                    global_component_array: this.global_component_array,
                    delpng: this.delpng,
                    type:type,
                }              
            },
            // 全屏预览
            fullScreen() {
                var el = document.documentElement;
                var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
                if (typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                }
                $('#toubu').hide();
                $("#dataDashboard").css("background-color", this.grid_layout_backgroundcolor);
                this.is_del = false;
                $("#mydiv img").each(function () {
                    $(this).css("display", "none");
                });
                for (var i = 0; i < this.selectRow.length; i++) {
                    if (this.selectRow[i].chart_type != "card" && this.selectRow[i].chart_type != "table") {
                        var frame_img = document.getElementById(this.selectRow[i].component_id).children[0];
                        var img_style = "width:25px;height:25px;position:absolute;right:0px;z-index:999;";
                        if (this.selectRow[i].background == "transparent") {
                            img_style += this.grid_layout_backgroundcolor;
                        } else {
                            img_style += this.selectRow[i].background;
                        }
                        var imgHTML = "<img src=" + require('@/assets/images/hidedel.png') + " style=" + img_style + " class='pull-right'>";
                        $(frame_img).append(imgHTML);
                    }
                }
                return;
            },
            // 检查是否全屏
            checkFull() {
                return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
            },
            //添加仪表板背景色
            confirmBackgroudColor() {
                this.grid_layout_backgroundcolor = "background-color:" + this.auto_dashboard_info.background;
                this.dialogBackgroundVisible = false;
            },
            //选择主题
            chooseTitle(data) {
                this.auto_dashboard_info.dashboard_theme = data.code;
                this.tcolor = data.tcolor;
                this.lcolor = data.lcolor;
                $("#grid_style").removeClass(this.titleClass);
                this.footer="footer"+data.code;
                this.header="header"+data.code
                this.titleClass="tpl"+data.code;
                this.wrapper_show = false;
                if (data.code=='00') {
                    this.titleClass="grid";
                    this.show_footer = false;
                    this.show_header = false;
                }else if (data.code=='01') {
                    this.show_header = true;
                    this.show_footer = true;
                }else if (data.code=='02') {
                    this.show_header = true;
                    this.show_footer = true;
                }else if (data.code=='03') {
                    this.show_header = true;
                    this.show_footer = false;
                } else if (data.code=='04') {
                    this.show_header = true;
                    this.show_footer = false;
                    this.wrapper_show = true;
                } else if (data.code=='05') {
                    this.show_header = true;
                    this.show_footer = false;
                }
                $("#grid_style").addClass(this.titleClass);
                this.echartpic(this.global_component_array,this.global_component_id_array)
                this.dialogTitleVisible = false;
            },
            //文本标签主题设置
            textlabeltheme() {
                if (this.echart_theme != "") {
                    if (this.echart_theme.depth == "sheng") {
                        for (var i = 0; i < this.textlabelarray.length; i++) {
                            this.chart_obj_array.push(this.textlabelarray[i]);
                            var id = this.textlabelarray[i].id;
                            $("#" + id).find("div[class='labelclass']").css('background-color', this.echart_theme.style);
                        }
                    } else if (this.echart_theme.depth == "qian") {
                        for (var i = 0; i < this.textlabelarray.length; i++) {
                            this.chart_obj_array.push(this.textlabelarray[i]);
                            var id = this.textlabelarray[i].id;
                            $("#" + id).find("div[class='labelclass']").css('background-color', this.echart_theme.style);
                        }
                    }
                }
            },
            //分割线主题设置
            textlinetheme() {
                if (this.echart_theme != "") {
                    for (var i = 0; i < this.textlinearray.length; i++) {
                        this.chart_obj_array.push(this.textlinearray[i]);
                    }
                }
            },
            //添加网格线
            gridLine() {
                if (this.is_gridline) {
                    $("#grid_style").addClass("grid");
                } else {
                    $("#grid_style").removeClass("grid");
                }
            },
            //添加文本标签
            confirmTextLable() {
                if (this.layout.length <= 0) {
                    return false;
                }
                if (this.auto_label_info.label_content == "") {
                    this.$Msg.customizTitle('请输入文本标签的内容', 'warning')
                    return false;
                }
                //JSON拷贝
                this.auto_label_info_array.push(Object.assign({}, this.auto_label_info));
                var layout_obj = {
                    "w": 48,
                    "h": 27,
                    "moved": false,
                    "label": 0,
                    "static": false
                };
                var id = parseInt(Math.random() * 10000 + 10000);
                if (this.layout.length > 0) {
                    var obj = this.layout[this.layout.length - 1];
                    if (obj.x >= 20) {
                        layout_obj.x = 0;
                        layout_obj.y = parseInt(obj.y) + 4;
                        layout_obj.i = id;
                    } else {
                        if (parseInt(obj.x) + parseInt(obj.w) >= 19) {
                            layout_obj.x = parseInt(0);
                            layout_obj.y = parseInt(obj.y) + 4;
                            layout_obj.i = id;
                        } else {
                            layout_obj.x = parseInt(obj.x) + parseInt(obj.w) + 1;
                            layout_obj.y = parseInt(obj.y);
                            layout_obj.i = id;
                        }
                    }
                } else {
                    layout_obj.x = 0;
                    layout_obj.y = 0;
                    layout_obj.i = 1;
                }
                layout_obj.type = id;
                this.layout.push(layout_obj);
                this.$nextTick(function () {
                    //标签处理
                    var textStyle = this.auto_label_info.textStyle;
                    $("#" + id).css("overflow", "hidden");
                    $("#" + id).css("position", "relative");
                    $("#" + id).css("margin-top", "2px");
                    $("#" + id).css("background", this.auto_label_info.label_color);
                    $("#" + id).css("display", "flex");
                    $("#" + id).css("align-items", textStyle.verticalAlign);
                    $("#" + id).css("justify-content", textStyle.align);
                    //字体处理
                    var style = "color:" + textStyle.color + "; font-family:" + textStyle.fontFamily;
                    style += "; font-style:" + textStyle.fontStyle + "; font-weight:" + textStyle.fontWeight;
                    style += "; text-align:" + textStyle.align + "; vertical-align:" + textStyle.verticalAlign;
                    style += "; font-size:" + textStyle.fontSize + "px";
                    var html = "<div name='labelcomponentname'></div>";
                    html = html + "<p style='" + style + "'>" + this.auto_label_info.label_content + "</p>"
                    $("#" + id).html(html);
                    //添加打叉按钮
                    if (this.is_del) {
                        var imagevueobj = new lineOrLabelDelProfile({
                            propsData: this.initPropsData(layout_obj,this.auto_label_info_array,this.auto_label_info_array,
                                                                this.label_layout,this.textlabelarray)
                        }).$mount();
                        this.labeldelimage(id, imagevueobj);
                    }
                    var obj = {};
                    obj.layouttype = "label";
                    obj.id = id;
                    obj.content = this.auto_label_info.label_content;
                    this.chart_obj_array.push(obj);
                    this.textlabelarray.push(obj);
                    $("#" + id).trigger("mouseup");
                })
                this.dialogTextLabelVisible = false;
            },
            //添加分割线
            confirmtextline(w, h, x, y) {
                if (this.layout.length <= 0) {
                    return false;
                }
                this.auto_line_info_array.push(this.auto_line_info);
                var id = parseInt(Math.random() * 10000 + 10000);
                if (this.auto_line_info.line_type == 'heng') {
                    var layout_obj = {
                        "w": w,
                        "h": h,
                        "x": x,
                        "y": y,
                        "type": id,
                        "moved": false,
                        "label": 1,
                        "static": false
                    };
                } else {
                    var layout_obj = {
                        "w": h,
                        "h": w,
                        "x": x,
                        "y": y,
                        "type": id,
                        "moved": false,
                        "label": 1,
                        "static": false
                    };
                }
                if (x == 0 || y == 0) {
                    if (this.layout.length > 0) {
                        var obj = this.layout[this.layout.length - 1];
                        if (obj.x >= 20) {
                            layout_obj.x = 0;
                            layout_obj.y = parseInt(obj.y) + 4;
                            layout_obj.i = id;
                        } else {
                            if (parseInt(obj.x) + parseInt(obj.w) >= 19) {
                                layout_obj.x = parseInt(0);
                                layout_obj.y = parseInt(obj.y) + 4;
                                layout_obj.i = id;
                            } else {
                                layout_obj.x = parseInt(obj.x) + parseInt(obj.w) + 1;
                                layout_obj.y = parseInt(obj.y);
                                layout_obj.i = id;
                            }
                        }
                    } else {
                        layout_obj.x = 0;
                        layout_obj.y = 0;
                        layout_obj.i = 1;
                    }
                }
                this.layout.push(layout_obj);
                this.$nextTick(function () {
                    if (this.auto_line_info.line_type == 'heng') {
                        var html = "<div name='linecomponentname'></div>" +
                            "<div class='lineclass' style='width:100%;height:2px;overflow:hidden;margin-top:15px'></div>"
                    } else {
                        var html = "<div name='linecomponentname'></div>" +
                            "<div class='lineclass' style='width:2px;height:1000px;overflow:hidden;margin-left:10px'></div>"
                    }
                    $("#" + id).css("overflow", "hidden");
                    $("#" + id).css("position", "relative");
                    $("#" + id).html(html);
                    this.islineshow = true;
                    for (var i = 0; i < this.linefontcolor.length; i++) {
                        if (this.linefontcolor[i].code == this.auto_line_info.line_color) {
                            $("#" + id).find("div[class='lineclass']").css('background', this.linefontcolor[i].type);
                        }
                    }
                    //添加打叉按钮
                    if (this.is_del) {
                        var imagevueobj = new lineOrLabelDelProfile({
                             propsData: this.initPropsData(layout_obj,this.auto_line_info,this.auto_line_info_array,
                                                                this.line_layout,this.textlinearray,"line")
                        }).$mount();
                        this.linedelimage(id, imagevueobj);
                    }
                    var obj = {};
                    obj.layouttype = "borderline";
                    obj.id = id;
                    this.chart_obj_array.push(obj);
                    this.textlinearray.push(obj);
                    $("#" + id).trigger("mouseup");
                })
                this.dialogTextLineVisible = false;
            },
            //获取可视化组件信息
            getVisualComponentInfo() {
                this.dialogAddComponentVisible = true;
                functionAll.getVisualComponentInfo({}).then(res => {
                    if (res && res.success) {
                        this.auto_comp_sum_array = res.data;
                        this.totalSize = res.data.length;
                    }
                })
            },
            //添加组件到仪表盘
            showComponentOnDashboard() {
                this.dialogAddComponentVisible = false;
                this.picshow = true;
                if (this.selectRow.length <= 0) {
                    this.$Msg.customizTitle('请至少选择一个组件', 'warning')
                    return;
                }
                var component_id_array = [];
                for (var i = 0; i < this.selectRow.length; i++) {
                    component_id_array.push(this.selectRow[i].component_id);
                }
                this.global_component_id_array = component_id_array;
                let param = new FormData();
                param.append('autoCompSums', JSON.stringify(this.selectRow));
                functionAll.showComponentOnDashboard(param).then(res => {
                    this.$refs.multipleComponent.clearSelection();
                    if (res && res.success) {
                        this.global_component_array = res.data;
                        setTimeout(() => {
                            this.echartpic(res.data, component_id_array);
                            for (var i = 0; i < this.layout.length; i++) {
                                let layoutElement = this.layout[i];
                                this.resizedEvent(layoutElement.type, layoutElement.h, layoutElement.w, layoutElement.y, layoutElement.x);
                            }
                        }, 500);
                        setTimeout(() => {
                            this.grid_layout_backgroundcolor = "background-color:#FFFFFF;";
                            $("div[name='pic']").each(function () {
                                $(this).trigger("mouseup");
                            });
                        }, 500);
                    }
                })
            },
            //仪表板保存按钮
            addDashboardButton() {
                if (this.layout.length <= 0) {
                    this.$Msg.customizTitle('请至少选择一个组件', 'warning')
                } else {
                    this.dialogDashboardVisible = true;
                }
            },
            //保存仪表板
            saveDashboard() {
                var picnum = 0;
                $("div[name='pic']").each(function () {
                    picnum++;
                });
                if (this.auto_dashboard_info.dashboard_name == '' || typeof (this.auto_dashboard_info.dashboard_name) == 'undefined') {
                    this.$Msg.customizTitle('仪表盘名称不能为空', 'warning')
                    return;
                }
                if (picnum == 0) {
                    this.$Msg.customizTitle('请至少添加一个组件', 'warning')
                    return false;
                }
                if (this.auto_dashboard_info.dashboard_theme == undefined || this.auto_dashboard_info.dashboard_theme == '') {
                    this.auto_dashboard_info.dashboard_theme = '00';
                }
                if (this.auto_dashboard_info.is_gridline) {
                    this.auto_dashboard_info.is_gridline == '1';
                } else {
                    this.auto_dashboard_info.is_gridline == '0';
                }
                let param = new FormData();
                param.append("layout", JSON.stringify(this.layout));
                param.append("autoLabelInfo", JSON.stringify(this.auto_label_info_array));
                param.append("autoLineInfo", JSON.stringify(this.auto_line_info_array));
                param.append("autoDashboardInfo", JSON.stringify(this.auto_dashboard_info));
                if (this.auto_dashboard_info.dashboard_id == undefined || this.auto_dashboard_info.dashboard_id == '') {
                    functionAll.saveDataDashboardInfo(param).then(res => {// 新增
                        if (res && res.success) {
                            this.$Msg.customizTitle('保存成功', 'success')
                            this.$router.push({
                                name: 'dataDashboardList'
                            })
                        }
                    });
                } else {
                    functionAll.updateDataDashboardInfo(param).then(res => {// 编辑
                        if (res && res.success) {
                            this.$Msg.customizTitle('更新成功', 'success')
                            this.$router.push({
                                name: 'dataDashboardList'
                            })
                        }
                    });
                }
            },
            //仪表板展示
            echartpic(data, component_id_array) {
                 //把文本标签,分割线的layout区分开
                for (var i = 0; i < this.layout.length; i++) {
                    if ("0" == this.layout[i].label) {
                        // 文本标签
                        this.label_layout.push(this.layout[i]);
                    } else if ("1" == this.layout[i].label) {
                        // 分割线
                        this.line_layout.push(this.layout[i]);
                    }
                }
                var result_layout = [];
                if (this.layout.length == 0) {// 新增
                    this.layout = data.layout;
                } else if (this.layout.length > data.layout.length) { //组件减少
                    // 所有组件ID
                    var layoutId_array = [];
                    for (var index in data.layout) {
                        layoutId_array.push(data.layout[index].type);
                    }
                    result_layout = this.array_alike(this.layout, layoutId_array);
                    if (result_layout.length == 0) {
                        this.layout = data.layout;
                    } else {
                        this.layout = result_layout;
                        // [].push.apply(a, b):将b追加到a里面，如果a为数组，也可以写成a.push(b)
                        if (this.label_layout.length != 0) {
                            [].push.apply(this.layout, this.label_layout);
                        }
                        if (this.line_layout.length != 0) {
                            [].push.apply(this.layout, this.line_layout);
                        }
                    }
                } else { //替换
                    var layoutId_array = [];
                    for (var index in this.layout) {
                        layoutId_array.push(this.layout[index].type);
                    }
                    result_layout = this.array_diff(data.layout, layoutId_array);
                    if (result_layout.length > 0) {
                        for (var i = 0; i < result_layout.length; i++) {
                            this.layout.push(result_layout[i]);
                        }
                    }
                }
                this.global_component_array.layout = this.layout;
                var chart_obj_array = [];
                this.$nextTick(function () {
                    for (var i = 0; i < component_id_array.length; i++) {
                        var id = component_id_array[i];
                        var echartdata = JSON.parse(data[id]);
                        var type = echartdata.chart_type;
                        var echart_layout=  this.getEchartProperties(id);
                        var tmp_component_name = "";
                        var tmp_component_background = "";
                        for (var k = 0; k < this.selectRow.length; k++) {
                            if (component_id_array[i] == this.selectRow[k].component_id) {
                                tmp_component_name = this.selectRow[k].chart_theme;
                                tmp_component_background = this.selectRow[k].background;
                            }
                        }
                        var chart = echarts.init(document.getElementById(id));
                        var mydeltool = this.initMyDelTool(echart_layout, chart, id);
                        // 根据图例类型获取option
                        var option = this.getOption(type,echartdata);
                        if (type!='card' && type !='table') {
                            if (this.show_header || this.show_footer) {
                                option = generatepic.improveoption(option,this.tcolor,this.lcolor)
                            }
                            this.setChartOption(chart,option,this.global_component_id_array,mydeltool);
                        }
                        if (type == "card") {// 卡片
                            var cardname = "background:" + this.titleFont.backgroundColor + ";color:" + this.titleFont.color + ";font-family:" + this.titleFont.fontFamily;
                            cardname += ";font-style:" + this.titleFont.fontStyle + ";font-weight:" + this.titleFont.fontWeight;
                            cardname += ";font-size:" + this.titleFont.fontSize + "px;line-height:" + this.titleFont.lineHeight + "px;text-align:center;padding-left:15px";
                            var cardstyle = "word-wrap:break-word;text-align:center;background:" + this.titleFont.backgroundColor + ";color:" + this.titleFont.color;
                            cardstyle += ";font-family:" + this.titleFont.fontFamily + ";font-style:" + this.titleFont.fontStyle + ";font-weight:" + this.titleFont.fontWeight + "px";
                            var html;
                            //卡片样式变化
                            if (this.cardstyle == '') {
                                html = "<div name='cardcomponentname' style='" + cardname + "'>" + tmp_component_name + "</div>" +
                                    "<div class='cardclass' style='" + cardstyle + "'></div>"
                            } else {
                                html = "<div name='cardcomponentname' style='" + this.cardname + "'>" + tmp_component_name + "</div>" +
                                    "<div class='cardclass' style='" + this.cardstyle + "'></div>"
                            }
                            $("#" + id).html(html);
                            $("#" + id).css("overflow", "hidden");
                            $("#" + id).find("div[class='cardclass']").html(echartdata.cardData);
                            //添加打叉按钮
                            if (this.is_del) {
                                var imagevueobj = new commonDelProFile({
                                    propsData: {
                                        echart_layout:echart_layout,
                                        layout: this.layout,
                                        chart_obj_array:this.chart_obj_array,
                                        global_component_array:this.global_component_array,
                                        layout_id:id,
                                        selectRow:this.selectRow,
                                        delpng:this.delpng
                                    }
                                }).$mount();
                                this.carddelimage(id, imagevueobj);
                            }
                            var obj = {};
                            obj.layouttype = type;
                            obj.id = id;
                            obj.cardtext = echartdata.cardData;
                        }
                        if (type == "table") {// 二维表
                            this.tableData = echartdata.tableData;
                            this.tableDataLength = this.tableData.length;
                            var backgroundstyle = "";
                            var fontstyle = "";
                            //表格样式变化
                            var html = "<div><div name='tablecomponentname'>" + tmp_component_name +"</div></div>";
                            $("#" + id).html(html);
                            $("#" + id).css("overflow", "hidden");
                             //添加打叉按钮
                            if (this.is_del) {
                                var imagevueobj = new commonDelProFile({
                                    propsData: {
                                        echart_layout: echart_layout,
                                        layout_id: id,
                                        delpng: this.delpng,
                                        layout: this.layout,
                                        global_component_array: this.global_component_array,
                                        chart_obj_array: this.chart_obj_array,
                                        selectRow: this.selectRow
                                    }
                                }).$mount();
                                this.tabledelimage(id, imagevueobj);
                            }
                            //表格数据
                            var tablevueobj = new tableProfile({
                                propsData: {
                                    tableData: this.tableData,
                                    tableDataLength: this.tableDataLength,
                                    backgroundstyle: backgroundstyle,
                                    fontstyle: fontstyle,
                                }
                            }).$mount();
                            //样式挂载
                            this.tableimage(id, tablevueobj);
                            if (this.bcolor != "#40E3F7") {
                                this.tabStyle.th_background = this.bcolor;
                                this.tabStyle.zl_background = this.bcolor;
                            }
                            var th_background = this.tabStyle.th_background;
                            $("#" + id + " table[name='tablename'] thead tr th").css("background", th_background);
                            if (this.tabStyle.is_zebraline == "0") {
                                $("#" + id + " table[name='tablename']").addClass("table-striped");
                            } else {
                                $("#" + id + " table[name='tablename']").removeClass("table-striped");
                                this.tabStyle.zl_background = "";
                            }
                            var zl_background = this.tabStyle.zl_background;
                            $("#" + id + " .table-striped > tbody > tr:nth-of-type(odd)").css("background", zl_background);
                            if (this.tabStyle.is_gridline == "0") {
                                $("#" + id + " table[name='tablename']").addClass("table-bordered");
                            } else {
                                $("#" + id + " table[name='tablename']").removeClass("table-bordered");
                            }
                            var obj = {};
                            obj.layouttype = type;
                            obj.id = id;
                        }
                        chart_obj_array.push(Chart);
                    }
                })
                this.chart_obj_array = chart_obj_array;
                this.confirmBackgroudColor();
            },
            getEchartProperties(id){
                for (var j = 0; j < this.layout.length; j++) {
                    if (id == this.layout[j].type) {
                        var echart_layout = this.layout[j];
                        //标题设置
                        if (echart_layout.titleFontInfo != '' && echart_layout.titleFontInfo != undefined && JSON.stringify(echart_layout.titleFontInfo) != '{}') {
                            this.titleFont = echart_layout.titleFontInfo;
                        }
                        //轴线字体
                        if (echart_layout.axisFontInfo != '' && echart_layout.axisFontInfo != undefined && JSON.stringify(echart_layout.axisFontInfo) != '{}') {
                            this.axisStyle = echart_layout.axisFontInfo;
                        }
                        //轴线配置--x轴(xAxis)
                        if (echart_layout.xAxisInfo != '' && echart_layout.xAxisInfo != undefined && JSON.stringify(echart_layout.xAxisInfo) != '{}') {
                            this.xAxis = echart_layout.xAxisInfo[0];
                        }
                        //x轴(xAxisLine)
                        if (echart_layout.xAxisLine != '' && echart_layout.xAxisLine != undefined && JSON.stringify(echart_layout.xAxisLine) != '{}') {
                            this.xAxisLine = echart_layout.xAxisLine;
                        }
                        //x轴(xAxisLabel)
                        if (echart_layout.xAxisLabel != '' && echart_layout.xAxisLabel != undefined && JSON.stringify(echart_layout.xAxisLabel) != '{}') {
                            this.xAxisLabel = echart_layout.xAxisLabel;
                        }
                        //轴线配置--y轴
                        if (echart_layout.yAxisInfo != '' && echart_layout.yAxisInfo != undefined && JSON.stringify(echart_layout.yAxisInfo) != '{}') {
                            this.yAxis = echart_layout.yAxisInfo[0];
                        }
                        //y轴(yAxisLine)
                        if (echart_layout.yAxisLine != '' && echart_layout.yAxisLine != undefined && JSON.stringify(echart_layout.yAxisLine) != '{}') {
                            this.yAxisLine = echart_layout.yAxisLine;
                        }
                        //y轴(yAxisLabel)
                        if (echart_layout.yAxisLabel != '' && echart_layout.yAxisLabel != undefined && JSON.stringify(echart_layout.yAxisLabel) != '{}') {
                            this.yAxisLabel = echart_layout.yAxisLabel;
                        }
                        //二维表
                        if (echart_layout.twoDimensionalTable != '' && echart_layout.twoDimensionalTable != undefined && JSON.stringify(echart_layout.twoDimensionalTable) != '{}') {
                            var tableStyle = echart_layout.twoDimensionalTable
                            this.tabStyle.th_background = tableStyle.th_background;
                            this.tabStyle.is_gridline = tableStyle.is_gridline;
                            this.tabStyle.is_zebraline = tableStyle.is_zebraline;
                            this.tabStyle.zl_background = tableStyle.zl_background;
                        }
                        //图表配置
                        if (echart_layout.chartsconfig != '' && echart_layout.chartsconfig != undefined && JSON.stringify(echart_layout.chartsconfig) != '{}') {
                            this.seriesStyle = echart_layout.chartsconfig;
                        }
                        //文本标签
                        if (echart_layout.textLabel != '' && echart_layout.textLabel != undefined && JSON.stringify(echart_layout.textLabel) != '{}') {
                            this.echartsLabel = echart_layout.textLabel;
                        }
                        //图例设置
                        if (echart_layout.legendInfo != '' && echart_layout.legendInfo != undefined && JSON.stringify(echart_layout.legendInfo) != '{}') {
                            this.legendStyle = echart_layout.legendInfo;
                        }
                    }
                }
            },
            // 根据图例类型获取option
            getOption(type,echartdata){
                var result = this.initProperty();
                var option;
                if (type == "line") {// 折线图
                    option = drawLine.drawLine(result,echartdata);
                } else if (type == "bar") {// 柱状图
                    option = drawBarChart.drawBarChart(result,echartdata);
                } else if (type == "pie" || type == "huanpie" || type == "fasanpie") {// 饼图、环形饼图、发散饼图
                    option = drawPieChart.drawPieChart(result,echartdata);
                } else if (type == "stackingbar") { //堆叠柱状图
                    option = drawStackingBarChart.drawStackingBarChart(result,echartdata);
                } else if (type == "polarbar") {// 极坐标柱状图
                    option = drawPolarBarChart.drawPolarBarChart(result,echartdata);
                } else if (type == "bl") {// 柱状折线混合图
                    option = drawBlChart.drawBlChart(result,echartdata);
                } else if (type == "blsimple") {// 柱状折线混合图-简单
                    option = drawBlSimpleChart.drawBlSimpleChart(result,echartdata);
                } else if (type == "scatter") {// 散点图
                    option = drawScatterChart.drawScatterChart(result,echartdata);
                } else if (type == "treemap") {// 矩形树图
                    option = drawTreeMapChart.drawTreeMapChart(result,echartdata,this.echartsLabel, this.auto_comp_sum);
                } else if (type == "map") {// 地图
                    //定义全国省份的数组
                    var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin',
                        'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan',
                        'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang',
                        'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing',
                        'xianggang', 'aomen', 'taiwan'
                    ];
                    var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江',
                        '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南',
                        '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'
                    ];
                    for (var l = 0; l < provincesText.length; l++) {
                        if (this.seriesStyle.provincename == provincesText[l]) {
                            //显示对应省份的方法
                            this.showProvince(provinces[l], provincesText[l])
                            break;
                        }
                    }
                    option = drawMapChart.drawMapChart(result,echartdata,this.seriesStyle);
                }
                return option;
            },
            //找出新增前后不同的组件
            array_diff(layout, layoutId_array) {
                var result = [];
                for (var index in layout) {
                    var component_id = layout[index].type;
                    // 用于在数组中搜索指定的值,并返回其索引值。如果数组中不存在该值,则返回-1
                    if ($.inArray(component_id, layoutId_array) == -1) {
                        if (result.indexOf(layout[index]) == -1) {
                            result.push(layout[index]);
                        }
                    }
                }
                return result;
            },
            //找出新增前后相同的组件
            array_alike(layout, layoutId_array) {
                var result = [];
                for (var index in layout) {
                    var component_id = layout[index].type;
                    // 用于在数组中搜索指定的值,并返回其索引值。如果数组中不存在该值,则返回-1
                    if ($.inArray(component_id, layoutId_array) != -1) {
                        if (result.indexOf(layout[index]) == -1) {
                            result.push(layout[index]);
                        }
                    }
                }
                return result;
            },
            //初始化echart组件属性信息
            initProperty() {
                var result = {};
                // 初始化标题属性
                generatepic.initTitleStyle(this.auto_comp_sum.chart_theme, this.titleFont, result);
                //设置图上每个节点的显示情况
                generatepic.initLabelOption(this.echartsLabel, result);
                // 初始化轴配置信息
                generatepic.initAxisStyle(this.axisStyle, this.xAxis, this.yAxis, this.xAxisLine, this.xAxisLabel, this.yAxisLine, this.yAxisLabel, result);
                // 初始化图例信息
                generatepic.initLengendStyle(this.legendStyle, result);
                result.background = this.auto_comp_sum.background
                return result;
            },
            // 初始化删除组件
            initMyDelTool(echart_layout, TypeChart, id) {
                var is_del = this.is_del;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];
                var mydeltool = {
                    show: true,
                    title: "删除",
                    icon: "image://" + require("@/assets/images/del.png"),
                    color:"#3f44ff",
                    onclick() {
                        if (is_del) {
                            layout.splice(layout.indexOf(echart_layout), 1);
                            global_component_array.layout = layout;
                            delete global_component_array[echart_layout.type];
                            for (var i = 0; i < layout.length; i++) {
                                if (layout[i].label == undefined) {
                                    global_component_id_array.push(layout[i].type);
                                }
                            }
                            chart_obj_array.splice(chart_obj_array.indexOf(TypeChart), 1);
                            for (var i = 0; i < selectRow.length; i++) {
                                if (selectRow[i].component_id == id) {
                                    selectRow.splice(i, 1);
                                }
                            }
                        }
                    }
                }
                return mydeltool;
            },
            // 公共数据项
            setChartOption(chart,option,global_component_id_array,mydeltool){
                option.toolbox.feature.mydeltool = mydeltool;
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                chart.clear();
                chart.setOption(option, true);
                chart.resize();
            },
            //卡片组件，添加删除按钮
            carddelimage(id, imagevueobj) {
                $("#" + id).find("div[name='cardcomponentname']").append(imagevueobj.$el);
            },
            //图表组件，添加删除按钮
            tabledelimage(id, imagevueobj) {
                $("#" + id).find("div[name='tablecomponentname']").append(imagevueobj.$el);
            },
            //图表组件
            tableimage(id, tablevueobj) {
                $("#" + id).append(tablevueobj.$el);
            },
            //标签组件
            labeldelimage(id, imagevueobj) {
                $("#" + id).find("div[name='labelcomponentname']").append(imagevueobj.$el);
                //$("#"+id).append(imagevueobj.$el);
            },
            //分割线组件
            linedelimage(id, imagevueobj) {
                $("#" + id).find("div[name='linecomponentname']").append(imagevueobj.$el);
            },
            // 展示省
            showProvince(pName, Chinese_) {
                this.loadBdScript('$' + pName + 'JS', '../province/' + pName + '.js');
            },
            //加载对应的JS
            loadBdScript(scriptId, url) {
                var script = document.createElement("script")
                script.type = "text/javascript";
                if (script.readyState){
                    script.onreadystatechange = function(){
                        if (script.readyState == "loaded" || script.readyState == "complete"){
                            script.onreadystatechange = null;
                        }
                    };
                }
                script.src = url;
                script.id = scriptId;
                document.getElementsByTagName("head")[0].appendChild(script);
            },
            //表数据实现分页功能
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
            },
            // 改变每页显示条数
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            // 关闭组件弹窗
            beforeAddComponentClose() {
                this.dialogAddComponentVisible = false;
                this.$refs.multipleComponent.clearSelection();
            },
            // 关闭主题弹框
            beforeTitleClose() {
                this.dialogTitleVisible = false;
            },
            // 关闭仪表盘弹框
            beforeDashboardClose() {
                this.dialogDashboardVisible = false;
            },
            // 关闭分割线弹框
            beforeTextLineClose() {
                this.dialogTextLineVisible = false;
            },
            // 关闭背景色弹框
            beforeBackgroundClose() {
                this.dialogBackgroundVisible = false;
            },
            // 关闭文本标签弹框
            beforeTextLabelClose() {
                this.dialogTextLabelVisible = false;
            },
            // 取消组件选择
            cancel() {
                this.$refs.multipleComponent.clearSelection();
                this.dialogAddComponentVisible = false
            },
            // 表全选
            allComponentSelect(all) {
                this.selectRow = all
            },
            // 表复选框选中
            componentSelectionChange(selectTrue) {
                this.selectRow = selectTrue;
            },
        },
    }
    //table
    var tableProfile = Vue.extend({
        template: "<div class='tableclass' name='tablediv'>" +
            "<table class='table' name='tablename' :style='backgroundstyle'>" +
            "<thead >" +
            "<tr :style='backgroundstyle'>" +
            "<th :style='fontstyle' v-for='(value,key) in tableData[0]'>{{key}}</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr v-for='len in tableData.length' :style='fontstyle'>" +
            "<td v-for='(value,key) in tableData[len-1]'>{{value}} </td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "</div>",
        props: ['tableData', 'tableDataLength', 'backgroundstyle', 'fontstyle'],
        data: function () {
            return {}
        },
        methods: {}
    })
    //卡片仪表盘删除按钮
    var commonDelProFile = Vue.extend({
        template: "<img :src='delpng' style='width:15px;height:15px;cursor:pointer;position:absolute;right:1px;z-index:999;' class='pull-right' @click='delcard(layout,echart_layout,layout_id)'>",
        data: function () {
            return {}
        },
        props: ['echart_layout', 'layout','chart_obj_array','global_component_array','layout_id','selectRow','delpng'],
        methods: {
            delcard(layout, echart_layout, layout_id) {
                this.layout.splice(this.layout.indexOf(echart_layout), 1);
                this.global_component_array.layout = this.layout;
                for (var i = 0; i < this.chart_obj_array.length; i++) {
                    if (echart_layout.type == this.chart_obj_array[i].id) {
                        this.chart_obj_array.splice(this.chart_obj_array.indexOf(this.chart_obj_array[i]), 1);
                    }
                }
                for (var i = 0; i < this.selectRow.length; i++) {
                    if (this.selectRow[i].component_id == layout_id) {
                        this.selectRow.splice(i, 1);
                    }
                }
            },
        }
    })
    //分割线或文本标签删除按钮
    var lineOrLabelDelProfile = Vue.extend({
        template: "<img :src='delpng' style='width:15px;height:15px;cursor:pointer;position:absolute;right:1px;z-index:999;' class='pull-right' @click='delcard(layout, echart_layout, auto_info, auto_info_array,line_or_label_layout,textarray,type)'>",
        data: function () {
            return {}
        },
        props: ['echart_layout','line_or_label_layout','layout','auto_info', 'auto_info_array', 'textarray','chart_obj_array','global_component_array', 'delpng','type'],
        methods: {
            delcard(layout, echart_layout, auto_info, auto_info_array,line_or_label_layout,textarray,type) {
                auto_info_array.splice(auto_info_array.indexOf(auto_info), 1);
                this.layout.splice(this.layout.indexOf(echart_layout), 1);
                this.global_component_array.layout = this.layout;
                if (line_or_label_layout.length!=0) {
                    line_or_lable_layout.splice(line_or_lable_layout.indexOf(echart_layout), 1);
                }
                for (var i = 0; i < this.chart_obj_array.length; i++) {
                    if (echart_layout.type == this.chart_obj_array[i].id) {
                        this.chart_obj_array.splice(this.chart_obj_array.indexOf(this.chart_obj_array[i]), 1);
                        textarray.splice(textarray.indexOf(this.chart_obj_array[i]), 1);
                    }
                }
                if (type=='label') {
                    this.auto_label_info_array=auto_info_array;
                    this.label_layout=line_or_label_layout;
                    this.textlabelarray=textarray;
                }else{
                    this.auto_line_info_array=auto_info_array;
                    this.line_layout=line_or_label_layout;
                    this.textlinearray=textarray;
                }
            },
        }
    })
</script>
<style scoped>
    @import '/static/src/panal/css/bootstrap.min.css';
    @import './css/tpl1.css';
    @import './css/tpl2.css';
    @import './css/tpl3.css';
    @import './css/tpl4.css';
    @import './css/tpl5.css';
    .el-input {
        width: 360px;
    }

    .el-select {
        width: 360px;
    }

    .grid {
        background: -webkit-linear-gradient(top, transparent 10px, #ccc 10px),
        -webkit-linear-gradient(left, transparent 10px, #ccc 10px);
        background-size: 11px 11px;
    }
</style>