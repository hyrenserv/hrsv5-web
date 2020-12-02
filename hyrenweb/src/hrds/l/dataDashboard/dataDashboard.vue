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
                    <el-button size="mini" type="primary" v-if="layout!=undefined&&layout!=''"
                               @click="dialogBorderVisible=true">添加边框
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
                             class="grid" id="grid_style"
                             style="height: 2000px;" :col-num="110" :row-height="11" :layout.sync="layout"
                             :is-draggable="is_showdel" :autoSize="true"
                             :is-resizable="is_showdel" :is-mirrored="false" :vertical-compact="false" :margin="[0, 0]"
                             :use-css-transforms="true">
                    <grid-item style="background-color:transparent;border: 0px;" name="pic" v-for="item in layout"
                               :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i"
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
                <el-button type="primary" @click="confirmtextline" size="mini">确 认
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
        <!-- 添加边框组件模态框 -->
        <el-dialog title="添加边框" :visible.sync="dialogBorderVisible" width="50%" :before-close="beforeBorderClose">
            <el-form ref="auto_frame_info" :model="auto_frame_info" label-width="130px">
                <el-form-item label="启用阴影效果">
                    <el-select v-model="auto_frame_info.is_shadow" placeholder="请选择启用阴影效果">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="边框风格">
                    <el-select v-model="auto_frame_info.border_style" placeholder="请选择边框风格">
                        <el-option label="实线边框" value="solid"></el-option>
                        <el-option label="点状边框" value="dotted"></el-option>
                        <el-option label="虚线边框" value="dashed"></el-option>
                        <el-option label="双线边框" value="double"></el-option>
                        <el-option label="3D凹槽边框" value="groove"></el-option>
                        <el-option label="3D垄状边框" value="ridge"></el-option>
                        <el-option label="3Dinset边框" value="inset"></el-option>
                        <el-option label="3Doutset边框" value="outset"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="边框颜色">
                    <el-row>
                        <el-col :span="2">
                            <el-color-picker v-model="auto_frame_info.border_color"></el-color-picker>
                        </el-col>
                        <el-col :span="12">
                            <el-input style="width:320px" v-model="auto_frame_info.border_color">
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="边框宽度">
                    <el-input v-model="auto_frame_info.border_width"></el-input>
                </el-form-item>
                <el-form-item label="边框圆角大小">
                    <el-input v-model="auto_frame_info.border_radius"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogBorderVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirmFrame" size="mini">确 认
                </el-button>
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

<script src="/static/src/panal/js/relation/bubbleUtil.js"></script>
<script>
    import Vue from 'vue';
    import VueGridLayout from 'vue-grid-layout';
    import * as functionAll from "./dataDashboard";

    export default {
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
        },
        data() {
            return {
                totalSize: 0,
                currPage: 1,
                pageSize: 10,
                addTitelForm: {},
                selectRow: [],
                dialogBackgroundVisible: false,
                dialogAddComponentVisible: false,
                dialogDashboardVisible: false,
                dialogTitleVisible: false,
                dialogTextLineVisible: false,
                dialogBorderVisible: false,
                dialogBorderVisible: false,
                dialogTextLabelVisible: false,
                layout: [],
                echartdata: [],
                bubbleIds: [],
                bubble_echartdatas: [],
                echart_div_layouts: [],
                // 组件名称
                tmp_component_names: [],
                myCharts: [],
                barmdIds: [],
                barmd_echartdatas: [],
                cardstyle: "",
                cardname: "",
                bcolor: "",
                option: {},
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
                //仪表板边框组件信息表
                auto_frame_info: {
                    serial_number: null, //序号
                    x_axis_coord: null, //X轴坐标
                    y_axis_coord: null,//y轴坐标
                    border_style: "solid", //边框风格
                    border_color: "#eb21eb", //边框颜色
                    border_width: 2, //边框宽度
                    border_radius: 45, //边框圆角大小
                    is_shadow: "1", //是否启用阴影效果，默认否
                    dashboard_id: null, //仪表板id
                    length: null, //组件长度
                    width: null, //组件宽度
                },
                // 边框信息集合
                auto_frame_info_list: [],
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
                titleFlag: false,
                echartThemeJson: require("@/assets/json/EchartTheme.json"),
                delpng: require('@/assets/images/del.png'),
                selectRow: [],
                //主题设置参数
                titleData: [{
                    "code": "00",
                    "CN_type": "原始",
                    "type": "source",
                    "bcolor": "#40E3F7",
                    "fcolor": "#FFFFFF",
                    "ncolor": "#438EB9",
                    "style": "background-color:transparent;",
                    "depth": "qian",
                    "picurl": require("@/assets/images/theme/source.jpg")
                },
                    {
                        "code": "01",
                        "CN_type": "万圣节",
                        "type": "halloween",
                        "bcolor": "#FF715E",
                        "fcolor": "#FFFFFF",
                        "ncolor": "#FF715E",
                        "style": "background-color:#6E6E6E;background-size: 100% 100%;",
                        "depth": "sheng",
                        "picurl": require("@/assets/images/theme/halloween.jpg")
                    },
                    {
                        "code": "02",
                        "CN_type": "紫色",
                        "type": "purple",
                        "bcolor": "#9B8BBA",
                        "fcolor": "#FFFFFF",
                        "ncolor": "#9B8BBA",
                        "style": "background-color: #5B5C6E;",
                        "depth": "sheng",
                        "picurl": require("@/assets/images/theme/purple.jpg")
                    },
                    {
                        "code": "03",
                        "CN_type": "恩索思",
                        "type": "essos",
                        "bcolor": "#893448",
                        "fcolor": "#FFFFFF",
                        "ncolor": "#893448",
                        "style": "background-color: #F2EABF;",
                        "depth": "qian",
                        "picurl": require("@/assets/images/theme/essos.jpg")
                    },
                    {
                        "code": "04",
                        "CN_type": "粉笔",
                        "type": "chalk",
                        "bcolor": "#FC97AF",
                        "fcolor": "#FFFFFF",
                        "ncolor": "#FC97AF",
                        "style": "background-color: #293441;",
                        "depth": "sheng",
                        "picurl": require("@/assets/images/theme/chalk.jpg")
                    },
                ],
                // 边框样式
                borderstyle: [{
                    "code": "00",
                    "type": "none",
                    "style": "border-style: none",
                    "tmp_type": "无边框"
                },
                    {
                        "code": "01",
                        "type": "dotted",
                        "style": "border-style: dotted",
                        "tmp_type": "点状"
                    },
                    {
                        "code": "02",
                        "type": "dashed",
                        "style": "border-style: dashed",
                        "tmp_type": "虚线"
                    },
                    {
                        "code": "03",
                        "type": "solid",
                        "style": "border-style: solid",
                        "tmp_type": "实线"
                    },
                    {
                        "code": "04",
                        "type": "double",
                        "style": "border-style: double",
                        "tmp_type": "双线"
                    },
                    {
                        "code": "05",
                        "type": "groove",
                        "style": "border-style: groove",
                        "tmp_type": "凹槽"
                    },
                    {
                        "code": "06",
                        "type": "ridge",
                        "style": "border-style: dashed",
                        "tmp_type": "垄状"
                    },
                    {
                        "code": "07",
                        "type": "inset",
                        "style": "border-style: inset",
                        "tmp_type": "inset线"
                    },
                    {
                        "code": "08",
                        "type": "outset",
                        "style": "border-style: outset",
                        "tmp_type": "outset线"
                    },
                ],
                bordercolor: [
                    {"code": "01", "type": "black", "style": "border-color:#000000"},
                    {"code": "02", "type": "white", "style": "border-color:#FFFFFF"},
                    {"code": "03", "type": "purple", "style": "border-color:#B23AEE"},
                    {"code": "04", "type": "grey", "style": "border-color:#8B8386"},
                    {"code": "05", "type": "red", "style": "border-color:#EE0000"},
                    {"code": "06", "type": "blue", "style": "border-color:#4682B4"},
                ],
                borderwidth: [
                    {"code": "00", "type": "border-width:1px", "style": "border:1px solid black;"},
                    {"code": "01", "type": "border-width:1.5px", "style": "border:1.5px solid black;"},
                    {"code": "02", "type": "border-width:2px", "style": "border:2px solid black;"},
                    {"code": "03", "type": "border-width:2.5px", "style": "border:2.5px solid black;"},
                    {"code": "04", "type": "border-width:3px", "style": "border:3px solid black;"},
                    {"code": "05", "type": "border-width:3.5px", "style": "border:3.5px solid black;"},
                ],
                grid_layout_backgroundcolor: "background-color:transparent;",// 背景色
                chart_obj_array: [],
                echart_theme: "",
                chooseTitle_show: false,
                global_component_array: [],
                global_component_id_array: [],
                bordercolor_show: false,
                tableData: [],
                tableDataLength: "",
                auto_label_info: { //标签配置
                    "label_title": "",
                    "label_content": "",
                    "label_size": "0",
                    "label_color": "transparent",
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
                dashboard_status: "",
                textlabelarray: [],
                textlinearray: [],
                textframearray: [],
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
                frame_layout: [],
                chooseallcomponentmodel: false,
                //标题设置
                titleFont: {
                    align: "left", //标题水平位置
                    verticalAlign: "top", //标题垂直位置
                    backgroundColor: "transparent", //标题背景色
                    borderColor: "transparent", //标题边框颜色
                    borderWidth: 0, //标题边框粗细
                    borderRadius: 0, //坐标轴边框圆角
                    color: "#000000", //字体颜色
                    fontFamily: "Arial", //字体系列
                    fontSize: 24, //字体大小
                    fontStyle: "normal", //字体风格
                    fontWeight: "normal", //字体粗细
                    lineHeight: "", //字体行高
                },
                //轴线设置--x轴
                xAxis: {
                    type: "", //轴类型
                    data: [], //x轴数据
                    show: true, //是否显示
                    position: "bottom", //轴位置
                    offset: 0, //轴偏移量
                    name: "", //轴名称
                    nameLocation: "end", //轴名称位置
                    nameTextStyle: {}, //--轴名称样式
                    nameGap: 15, //名称与轴线距离
                    nameRotate: 0, //名称旋转角度
                    axisLine: {}, //--轴线
                    axisLabel: {} //--刻度标签
                },
                xAxisLine: {
                    show: true, //轴线是否显示
                    onZero: true, //是否在0刻度上
                    symbol: "none", //箭头显示方式
                    symbolOffset: 0, //箭头偏移量
                },
                xAxisLabel: {
                    show: true, //刻度标签是否显示
                    inside: false, //刻度标签是否朝内
                    rotate: 0, //刻度标签旋转角度
                    margin: 10, //刻度标签与轴线间距
                    formatter: null, //刻度标签内容格式器
                },
                //轴线设置--y轴
                yAxis: {
                    type: "", //轴类型
                    show: true, //是否显示
                    position: "left", //轴位置
                    offset: 0, //轴偏移量
                    name: "", //轴名称
                    nameLocation: "end", //轴名称位置
                    nameTextStyle: {}, //--轴名称样式
                    nameGap: 15, //名称与轴线距离
                    nameRotate: 0, //名称旋转角度
                    axisLine: {}, //--轴线
                    axisLabel: {} //--刻度标签
                },
                yAxisLine: {
                    show: true, //轴线是否显示
                    onZero: true, //是否在0刻度上
                    symbol: "none", //箭头显示方式
                    symbolOffset: 0, //箭头偏移量
                },
                yAxisLabel: {
                    show: true, //刻度标签是否显示
                    inside: false, //刻度标签是否朝内
                    rotate: 0, //刻度标签旋转角度
                    margin: 20, //刻度标签与轴线间距
                    formatter: null, //刻度标签内容格式器
                },
                //轴线字体
                axisStyle: {
                    align: "left", //坐标轴水平位置
                    verticalAlign: "top", //坐标轴垂直位置
                    backgroundColor: "transparent", //坐标轴背景色
                    borderColor: "transparent", //坐标轴边框颜色
                    borderWidth: 0, //坐标轴边框粗细
                    borderRadius: 0, //坐标轴边框圆角
                    color: "#000000", //字体颜色
                    fontFamily: "Arial", //字体系列
                    fontSize: 12, //字体大小
                    fontStyle: "normal", //字体风格
                    fontWeight: "normal", //字体粗细
                    lineHeight: "", //字体行高
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
                    show: true, //是否显示
                    left_distance: "10", //左边距
                    top_distance: "0", //上边距
                    right_distance: "0", //右边距
                    bottom_distance: "0", //下边距
                    width: "auto", //宽度
                    height: "auto", //高度
                    orient: "horizontal", //布局朝向
                    align: "auto", //图例与文本对齐
                    padding: 5, //图例内边距
                    itemGap: 10, //图例间隔
                    itemWidth: 25, //图例宽度
                    itemHeight: 14, //图例高度
                    inactiveColor: "#cccccc", //图例关闭时颜色
                    backgroundColor: "transparent", //图例背景颜色
                    borderColor: "#cccccc", //边框颜色
                    borderWidth: 0, //边框大小
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
                    show_label: true, //是否显示文本标签
                    position: "outside", //标签位置
                    formatter: "{c}", //格式化文本标签
                    show_line: true, //是否显示文本标签引导线
                    smooth: false, //是否平滑视觉引导线
                },
                is_gridline: false,
                is_showdel: true,
            }
        },
        mounted() {
            if (this.is_gridline == false) {
                $("#grid_style").removeClass("grid");
                this.is_gridline = true;
            }
            // 编辑时调用
            if (this.$route.query.dashboard_id != undefined && this.$route.query.dashboard_id != '') {
                this.picshow = true;
                this.getDataDashboardInfoById(this.$route.query.dashboard_id);
            } else {
                this.auto_dashboard_info.dashboard_theme = "00";
            }
            // 监控窗口变化
            window.addEventListener('resize', () => {
                if (this.is_showdel == false) {
                    if (!this.checkFull()) {
                        $(".navbar").show();
                        $('#toubu').show();
                        $('#fullScreen').show();
                        this.chooseTitle_show = true;
                        this.bordercolor_show = true;
                        $("#dataDashboard").css("background-color", "background-color:#FFFFFF;");
                        this.is_showdel = true;
                        $("#mydiv img").each(function () {
                            $(this).css("display", "inline");
                        });
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

                                } else if (layouttype == "frame") {

                                } else {
                                    if (id != undefined && id != '') {
                                        var Chart = echarts.init(document.getElementById(id), dashboard_theme);
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
            resizedEvent(i, newH, newW, newHPx, newWPx) {
                console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
                // this.resizeTheChart();
                // debugger;
                $("#"+i).height(newH*10);
                $("#"+i).width(newW*10);
                var Chart = echarts.init(document.getElementById(i), this.echart_theme.type);
                Chart.resize();
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
                        // 边框
                        if (undefined != res.data.frameInfo && '' != res.data.frameInfo) {
                            this.auto_frame_info_list = res.data.frameInfo;
                        }
                        // 仪表盘信息
                        this.auto_dashboard_info = res.data.auto_dashboard_info;
                        var code = this.auto_dashboard_info.dashboard_theme;
                        // 组件信息
                        this.selectRow = res.data.autoCompSums;
                        //把边框,文本标签,分割线的layout区分开
                        for (var i = 0; i < res.data.layout.length; i++) {
                            if ("0" == res.data.layout[i].label) {
                                this.label_layout.push(res.data.layout[i]);
                            } else if ("1" == res.data.layout[i].label) {
                                this.line_layout.push(res.data.layout[i]);
                            } else if ("2" == res.data.layout[i].label) {
                                this.frame_layout.push(res.data.layout[i]);
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
                            echarts.registerTheme(echart_theme_obj.type, this.echartThemeJson[echart_theme_obj.type]);
                            //更换卡片，标签，分割线，表格、边框的颜色为组件的主题颜色
                            setTimeout(() => {
                                this.changeTitle(this.echart_theme);
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
                        setTimeout(() => {
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
                        }, 2000)
                        this.titleFlag = false;
                        // 仪表盘展示
                        setTimeout(() => {
                            this.echartpic(res.data, component_id_array);
                        }, 500)
                        // 边框回显
                        setTimeout(() => {
                            this.frame_back();
                        }, 1000)
                        // 文本标签回显
                        setTimeout(() => {
                            this.textlabel_back();
                        }, 1000)
                        // 分割线回显
                        setTimeout(() => {
                            this.textline_back();
                        }, 1000)
                        setTimeout(() => {
                            this.grid_layout_backgroundcolor = this.auto_dashboard_info.background;
                            $("div[name='pic']").each(function () {
                                $(this).trigger("mouseup");
                            });
                        }, 500)
                    }
                })
            },
            //分割线编辑回显
            textline_back() {
                this.$nextTick(function () {
                    for (var i = 0; i < this.line_layout.length; i++) {
                        var id = this.line_layout[i].type;
                        if (this.auto_line_info_array[i].line_type == 'heng') {
                            var html = "<div name='linecomponentname'></div>" +
                                "<div class='lineclass' style='width:100%;height:2px;overflow:hidden;margin-top:15px;'></div>"
                        } else {
                            var html = "<div name='linecomponentname'></div>" +
                                "<div class='lineclass' style='width:2px;height:1000px;overflow:hidden;margin-left:10px;'></div>"
                        }
                        $("#" + id).css("overflow", "hidden");
                        $("#" + id).css("position", "relative");
                        $("#" + id).html(html);
                        for (var j = 0; j < this.linefontcolor.length; j++) {
                            if (this.linefontcolor[j].code == this.auto_line_info_array[i].line_color) {
                                $("#" + id).find("div[class='lineclass']").css('background', this.linefontcolor[j].type);
                            }
                        }
                        //添加打叉按钮
                        if (this.is_showdel) {
                            var imagevueobj = new linedelProfile({
                                propsData: {
                                    echart_div_layout: this.line_layout[i],
                                    auto_line_info: this.auto_line_info,
                                    layout: this.layout,
                                    auto_line_info_array: this.auto_line_info_array,
                                    chart_obj_array: this.chart_obj_array,
                                    delpng: this.delpng,
                                    textlinearray: this.textlinearray,
                                    global_component_array: this.global_component_array,
                                    line_layout: this.line_layout
                                }
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
            //边框回显
            frame_back() {
                this.$nextTick(function () {
                    for (var i = 0; i < this.frame_layout.length; i++) {
                        var id = this.frame_layout[i].type;
                        var auto_frame_info = this.auto_frame_info_list[i];
                        $("#" + id).css("overflow", "hidden");
                        $("#" + id).css("position", "relative");
                        $("#" + id).css("border", auto_frame_info.border_width + "px " + auto_frame_info.border_style +
                            " " + auto_frame_info.border_color);
                        $("#" + id).css("border-radius", auto_frame_info.border_radius + "px");
                        if (this.auto_frame_info_list[i].is_shadow == '0') {
                            $("#" + id).css("box-shadow", "1px 1px 10px 5px #888888");
                        }
                        //添加打叉按钮
                        if (this.is_showdel) {
                            var imagevueobj = new framedelProfile({
                                propsData: {
                                    echart_div_layout: this.frame_layout[i],
                                    auto_frame_info: auto_frame_info,
                                    delpng: this.delpng,
                                    auto_frame_info_list: this.auto_frame_info_list,
                                    layout: this.layout,
                                    global_component_array: this.global_component_array,
                                    frame_layout: this.frame_layout,
                                    textframearray: this.textframearray,
                                    chart_obj_array: this.chart_obj_array
                                }
                            }).$mount();
                            this.framedelimage(id, imagevueobj);
                        }
                        var obj = {};
                        obj.layouttype = "frame";
                        obj.id = id;
                        this.chart_obj_array.push(obj);
                        this.textframearray.push(obj);
                        $("#" + id).trigger("mouseup");
                    }
                });
            },
            //文本标签编辑回显
            textlabel_back() {
                this.$nextTick(function () {
                    for (var i = 0; i < this.label_layout.length; i++) {
                        var id = this.label_layout[i].type;
                        var auto_label_info = this.auto_label_info_array[i];
                        var textStyle = auto_label_info.textStyle;
                        $("#" + id).css("overflow", "hidden");
                        $("#" + id).css("position", "relative");
                        $("#" + id).css("margin-top", "2px");
                        $("#" + id).css("background", auto_label_info.label_color);
                        $("#" + id).css("display", "flex");
                        $("#" + id).css("align-items", textStyle.verticalalign);
                        $("#" + id).css("justify-content", textStyle.align);
                        var html = "<div name='labelcomponentname'></div>";
                        //字体处理
                        var style = "color:" + textStyle.color + "; font-family:" + textStyle.fontfamily;
                        style += "; font-style:" + textStyle.fontstyle + "; font-weight:" + textStyle.fontweight;
                        style += "; text-align:" + textStyle.align + "; vertical-align:" + textStyle.verticalalign;
                        style += "; font-size:" + textStyle.fontsize + "px";
                        html = html + "<p style='" + style + "'>" + auto_label_info.label_content + "</p>"
                        $("#" + id).html(html);
                        //添加打叉按钮
                        if (this.is_showdel) {
                            var imagevueobj = new labeldelProfile({
                                propsData: {
                                    echart_div_layout: this.label_layout[i],
                                    auto_label_info: auto_label_info,
                                    delpng: this.delpng,
                                    auto_label_info_array: this.auto_label_info_array,
                                    layout: this.layout,
                                    global_component_array: this.global_component_array,
                                    label_layout: this.label_layout,
                                    textlabelarray: this.textlabelarray,
                                    chart_obj_array: this.chart_obj_array
                                }
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
            // 全屏预览
            fullScreen() {
                var el = document.documentElement;
                var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
                if (typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                }
                ;
                $(".navbar").hide();
                $('#toubu').hide();
                $("#dataDashboard").css("background-color", this.grid_layout_backgroundcolor);
                this.is_showdel = false;
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
                for (var i = 0; i < this.chart_obj_array.length; i++) {
                    if (this.chart_obj_array[i].layouttype == "card") {// 卡片

                    } else if (this.chart_obj_array[i].layouttype == "table") {// 表格

                    } else if (this.chart_obj_array[i].layouttype == "label") {// 文本标签

                    } else if (this.chart_obj_array[i].layouttype == "borderline") {// 分割线

                    } else if (this.chart_obj_array[i].layouttype == "frame") { // 边框

                    } else {
                        this.chart_obj_array[i].dispose();
                    }
                }
                if (data.code != "00") {
                    echarts.registerTheme(data.type, this.echartThemeJson[data.type]);
                }
                this.echart_theme = data;
                var cardname = this.cardname;
                var cardstyle = this.cardstyle;
                var tabStyle = this.tabStyle;
                //更换卡片，标签，分割线，表格、边框的颜色为组件的主题颜色
                this.changeTitle(data);
                this.titleFlag = false;
                // 仪表盘展示
                this.echartpic(this.global_component_array, this.global_component_id_array);
                // 文本标签主题设置
                setTimeout(() => {
                    if (this.textlabelarray.length > 0) {
                        this.textlabeltheme();
                    }
                }, 500);
                // 分割线设置
                setTimeout(() => {
                    if (this.textlinearray.length > 0) {
                        this.textlinetheme();
                    }
                }, 500);
                // 边框设置
                setTimeout(() => {
                    if (this.textframearray.length > 0) {
                        this.textframetheme();
                    }
                }, 500);
                setTimeout(() => {
                    this.grid_layout_backgroundcolor = data.style;
                    let start = this.grid_layout_backgroundcolor.indexOf(":") + 1;
                    let end = this.grid_layout_backgroundcolor.indexOf(";");
                    this.auto_dashboard_info.background = this.grid_layout_backgroundcolor.substring(start, end).trim();
                    $("div[name='pic']").each(function () {
                        $(this).trigger("mouseup");
                    });
                }, 500);
                this.dialogTitleVisible = false;
            },
            //更换卡片，标签，分割线，表格、边框的颜色为组件的主题颜色
            changeTitle(data) {
                this.$nextTick(function () {
                    for (var i = 0; i < this.chart_obj_array.length; i++) {
                        if (this.chart_obj_array[i].layouttype == "card") {// 卡片
                            $("#" + this.chart_obj_array[i].id).find("div[name='cardcomponentname']").css({
                                "background-color": data.ncolor,
                                "color": data.fcolor
                            });
                            $("#" + this.chart_obj_array[i].id).find("div[class='cardclass']").css({
                                'background-color': data.ncolor,
                                "color": data.fcolor
                            });
                            cardname = "background:" + data.ncolor + ";color:" + data.fcolor + ";font-family:" + this.titleFont.fontFamily;
                            cardname += ";font-style:" + this.titleFont.fontStyle + ";font-weight:" + this.titleFont.fontWeight;
                            cardname += ";font-size:" + this.titleFont.fontSize + "px;line-height:" + this.titleFont.lineHeight + "px;text-align:center;padding-left:15px";
                            cardstyle = "word-wrap:break-word;text-align:center;background:" + data.ncolor + ";color:" + data.fcolor;
                            cardstyle += ";font-family:" + this.titleFont.fontFamily + ";font-style:" + this.titleFont.fontStyle + ";font-weight:" + this.titleFont.fontWeight + "px";
                        } else if (this.chart_obj_array[i].layouttype == "table") {// 表格
                            tabStyle.th_background = data.bcolor
                            tabStyle.zl_background = data.bcolor;
                        } else if (this.chart_obj_array[i].layouttype == "label") {// 文本标签
                            $("#" + this.chart_obj_array[i].id).find("p").css({
                                "background-color": data.ncolor,
                                "color": data.fcolor
                            });
                            $("#" + this.chart_obj_array[i].id).find("p").css({
                                'background-color': data.ncolor,
                                "color": data.fcolor
                            });
                        } else if (this.chart_obj_array[i].layouttype == 'borderline') {// 分割线
                            $("#" + this.chart_obj_array[i].id).find("div[class='lineclass']").css({
                                'background-color': data.ncolor
                            });
                        } else if (this.chart_obj_array[i].layouttype == "frame") {// 边框
                            $("#" + this.chart_obj_array[i].id).css({
                                'border': data.ncolor + ' 2px solid'
                            });
                        }
                    }
                });
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
            //边框主题设置
            textframetheme() {
                if (this.echart_theme != "") {
                    for (var i = 0; i < this.textframearray.length; i++) {
                        this.chart_obj_array.push(this.textframearray[i]);
                    }
                }
            },
            //添加网格线
            gridLine() {
                if (this.is_gridline == false) {
                    $("#grid_style").removeClass("grid");
                    this.is_gridline = true;
                } else {
                    $("#grid_style").addClass("grid");
                    this.is_gridline = false;
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
                    "w": 30,
                    "h": 7,
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
                    if (this.is_showdel) {
                        var imagevueobj = new labeldelProfile({
                            propsData: {
                                echart_div_layout: layout_obj,
                                auto_label_info: this.auto_label_info,
                                delpng: this.delpng,
                                auto_label_info_array: this.auto_label_info_array,
                                layout: this.layout,
                                global_component_array: this.global_component_array,
                                label_layout: this.label_layout,
                                textlabelarray: this.textlabelarray,
                                chart_obj_array: this.chart_obj_array
                            }
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
            confirmtextline() {
                if (this.layout.length <= 0) {
                    return false;
                }
                this.auto_line_info_array.push(this.auto_line_info);
                var id = parseInt(Math.random() * 10000 + 10000);
                if (this.auto_line_info.line_type == 'heng') {
                    var layout_obj = {
                        "w": 40,
                        "h": 3,
                        "type": id,
                        "moved": false,
                        "label": 1,
                        "static": false
                    };
                } else {
                    var layout_obj = {
                        "w": 3,
                        "h": 30,
                        "type": id,
                        "moved": false,
                        "label": 1,
                        "static": false
                    };
                }

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
                    if (this.is_showdel) {
                        var imagevueobj = new linedelProfile({
                            propsData: {
                                echart_div_layout: layout_obj,
                                auto_line_info: this.auto_line_info,
                                layout: this.layout,
                                auto_line_info_array: this.auto_line_info_array,
                                chart_obj_array: this.chart_obj_array,
                                delpng: this.delpng,
                                textlinearray: this.textlinearray,
                                global_component_array: this.global_component_array,
                                line_layout: this.line_layout
                            }
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
            //添加边框
            confirmFrame() {
                if (this.layout.length <= 0) {
                    return false;
                }
                this.auto_frame_info_list.push(Object.assign({}, this.auto_frame_info));
                var id = parseInt(Math.random() * 10000 + 10000);
                var layout_obj = {
                    "w": 40,
                    "h": 32,
                    "moved": false,
                    "label": 2,
                    "static": false
                };
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
                    $("#" + id).css("overflow", "hidden");
                    $("#" + id).css("position", "relative");
                    $("#" + id).css("border", this.auto_frame_info.border_width + "px " + this.auto_frame_info.border_style +
                        " " + this.auto_frame_info.border_color);
                    $("#" + id).css("border-radius", this.auto_frame_info.border_radius + "px");
                    if (this.auto_frame_info.is_shadow == '0') {
                        $("#" + id).css("box-shadow", "1px 1px 10px 5px #888888");
                    }
                    //添加打叉按钮
                    if (this.is_showdel) {
                        var imagevueobj = new framedelProfile({
                            propsData: {
                                echart_div_layout: layout_obj,
                                auto_frame_info: this.auto_frame_info,
                                delpng: this.delpng,
                                auto_frame_info_list: this.auto_frame_info_list,
                                layout: this.layout,
                                global_component_array: this.global_component_array,
                                frame_layout: this.frame_layout,
                                textframearray: this.textframearray,
                                chart_obj_array: this.chart_obj_array
                            }
                        }).$mount();
                        this.framedelimage(id, imagevueobj);
                    }
                    var obj = {};
                    obj.layouttype = "frame";
                    obj.id = id;
                    this.chart_obj_array.push(obj);
                    this.textframearray.push(obj);
                    $("#" + id).trigger("mouseup");
                })
                this.dialogBorderVisible = false;
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
                        this.titleFlag = true;
                        this.global_component_array = res.data;
                        setTimeout(() => {
                            this.echartpic(res.data, component_id_array);
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
                let bordertype = this.auto_frame_info.border_style;
                this.borderstyle.forEach(function (item, index) {
                    if (item.type == bordertype) {
                        bordertype = item.code;
                    }
                })
                this.auto_dashboard_info.bordertype = bordertype;
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
                param.append("autoFrameInfo", JSON.stringify(this.auto_frame_info_list));
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
                debugger;
                //把边框,文本标签,分割线的layout区分开
                for (var i = 0; i < this.layout.length; i++) {
                    if ("0" == this.layout[i].label) {
                        // 文本标签
                        this.label_layout.push(this.layout[i]);
                    } else if ("1" == this.layout[i].label) {
                        // 分割线
                        this.line_layout.push(this.layout[i]);
                    } else if ("2" == this.layout[i].label) {
                        // 边框
                        this.frame_layout.push(this.layout[i]);
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
                        if (this.frame_layout.length != 0) {
                            [].push.apply(this.layout, this.frame_layout);
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
                            // if (this.titleFlag == true) {
                            //     result_layout[i].x = 0;
                            //     result_layout[i].y = 0;
                            // }
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
                        // $("#" + id).css({
                        //     "width": 370,
                        //     "height": 300
                        // })
                        for (var j = 0; j < this.layout.length; j++) {
                            if (id == this.layout[j].type) {
                                var echart_div_layout = this.layout[j];
                                //标题设置
                                if (echart_div_layout.titleFontInfo != '' && echart_div_layout.titleFontInfo != undefined && JSON.stringify(echart_div_layout.titleFontInfo) != '{}') {
                                    var title = echart_div_layout.titleFontInfo;
                                    this.titleFont = transferTitle(title);
                                }
                                //轴线字体
                                if (echart_div_layout.axisFontInfo != '' && echart_div_layout.axisFontInfo != undefined && JSON.stringify(echart_div_layout.axisFontInfo) != '{}') {
                                    var axisStyle = echart_div_layout.axisFontInfo;
                                    this.axisStyle = transferAxisStyle(axisStyle);
                                }

                                //轴线配置--x轴(xAxis)
                                if (echart_div_layout.xAxisInfo != '' && echart_div_layout.xAxisInfo != undefined && JSON.stringify(echart_div_layout.xAxisInfo) != '{}') {
                                    var xAxis = echart_div_layout.xAxisInfo[0];
                                    if (xAxis.show == '1') {
                                        xAxis.show = "true";
                                    }
                                    if (xAxis.silent == '1') {
                                        xAxis.silent = "true";
                                    } else {
                                        xAxis.silent = "false";
                                    }
                                    this.xAxis = transferxAxis(xAxis);
                                }

                                //x轴(xAxisLine)
                                if (echart_div_layout.xAxisLine != '' && echart_div_layout.xAxisLine != undefined && JSON.stringify(echart_div_layout.xAxisLine) != '{}') {
                                    var xAxisLine = echart_div_layout.xAxisLine;
                                    if (xAxisLine.show == '1') {
                                        xAxisLine.show = "true";
                                    }
                                    this.xAxisLine = transferxAxisLine(xAxisLine);
                                }

                                //x轴(xAxisLabel)
                                if (echart_div_layout.xAxisLabel != '' && echart_div_layout.xAxisLabel != undefined && JSON.stringify(echart_div_layout.xAxisLabel) != '{}') {
                                    var xAxisLabel = echart_div_layout.xAxisLabel;
                                    if (xAxisLabel.show == '1') {
                                        xAxisLabel.show = "true";
                                    }
                                    this.xAxisLabel = transferxAxisLabel(xAxisLabel);
                                }

                                //轴线配置--y轴
                                if (echart_div_layout.yAxisInfo != '' && echart_div_layout.yAxisInfo != undefined && JSON.stringify(echart_div_layout.yAxisInfo) != '{}') {
                                    var yAxis = echart_div_layout.yAxisInfo[0];
                                    if (yAxis.show == '1') {
                                        yAxis.show = "true";
                                    }
                                    if (yAxis.silent == '1') {
                                        yAxis.silent = "true";
                                    } else {
                                        yAxis.silent = "false";
                                    }
                                    this.yAxis = transferyAxis(yAxis);
                                }

                                //y轴(yAxisLine)
                                if (echart_div_layout.yAxisLine != '' && echart_div_layout.yAxisLine != undefined && JSON.stringify(echart_div_layout.yAxisLine) != '{}') {
                                    var yAxisLine = echart_div_layout.yAxisLine;
                                    if (yAxisLine.show == '1') {
                                        yAxisLine.show = "true";
                                    }
                                    this.yAxisLine = transferyAxisLine(yAxisLine);
                                }

                                //y轴(yAxisLabel)
                                if (echart_div_layout.yAxisLabel != '' && echart_div_layout.yAxisLabel != undefined && JSON.stringify(echart_div_layout.yAxisLabel) != '{}') {
                                    var yAxisLabel = echart_div_layout.yAxisLabel;
                                    if (yAxisLabel.show == '1') {
                                        yAxisLabel.show = "true";
                                    }
                                    this.yAxisLabel = transferyAxisLabel(yAxisLabel);
                                }

                                //二维表
                                if (echart_div_layout.twoDimensionalTable != '' && echart_div_layout.twoDimensionalTable != undefined && JSON.stringify(echart_div_layout.twoDimensionalTable) != '{}') {
                                    var tableStyle = echart_div_layout.twoDimensionalTable
                                    this.tabStyle.th_background = tableStyle.th_background;
                                    this.tabStyle.is_gridline = tableStyle.is_gridline;
                                    this.tabStyle.is_zebraline = tableStyle.is_zebraline;
                                    this.tabStyle.zl_background = tableStyle.zl_background;
                                }

                                //图表配置
                                if (echart_div_layout.chartsconfig != '' && echart_div_layout.chartsconfig != undefined && JSON.stringify(echart_div_layout.chartsconfig) != '{}') {
                                    var seriesStyle = echart_div_layout.chartsconfig;
                                    seriesStyle.center = JSON.stringify(seriesStyle.center);
                                    seriesStyle.center = JSON.parse(seriesStyle.center);
                                    this.seriesStyle = transferSeriesStyle(seriesStyle);
                                }

                                //文本标签
                                if (echart_div_layout.textLabel != '' && echart_div_layout.textLabel != undefined && JSON.stringify(echart_div_layout.textLabel) != '{}') {
                                    var echartsLabel = echart_div_layout.textLabel;
                                    this.echartsLabel = transferEchartsLabel(echartsLabel);
                                }

                                //图例设置
                                if (echart_div_layout.legendInfo != '' && echart_div_layout.legendInfo != undefined && JSON.stringify(echart_div_layout.legendInfo) != '{}') {
                                    var legendStyle = echart_div_layout.legendInfo;
                                    if (legendStyle.show == '1') {
                                        legendStyle.show = "true";
                                    }
                                    this.legendStyle = transferLegendStyle(legendStyle);
                                }
                            }
                        }
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
                        var tmp_component_name = "";
                        var tmp_component_background = "";
                        for (var k = 0; k < this.selectRow.length; k++) {
                            if (component_id_array[i] == this.selectRow[k].component_id) {
                                tmp_component_name = this.selectRow[k].chart_theme;
                                tmp_component_background = this.selectRow[k].background;
                            }
                        }
                        if (type == "line") {// 折线图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.echartline(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            chart_obj_array.push(Chart);
                        } else if (type == "bar") {// 柱状图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.echartbar(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            chart_obj_array.push(Chart);
                        } else if (type == "pie" || type == "huanpie" || type == "fasanpie") {// 饼图、环形饼图、发散饼图
                            var Chart = echarts.init(document.getElementById(id), 'dark');
                            this.echartpie(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            chart_obj_array.push(Chart);
                        } else if (type == "scatter") {// 散点图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.echartscatter(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            chart_obj_array.push(Chart);
                        } else if (type == "boxplot") {// 盒须图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.echartboxplot(echartdata, Chart, id, echart_div_layout, tmp_component_name);
                            chart_obj_array.push(Chart);
                        } else if (type == "bl") {// 柱状折线混合图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.echartbl(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            chart_obj_array.push(Chart);
                        } else if (type == "treemap") {// 矩形树图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.echartTreemap(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            chart_obj_array.push(Chart);
                        } else if (type == "stackingbar") { //堆叠柱状图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.changeToStackingBarChart(echartdata, Chart, echart_div_layout, tmp_component_name, tmp_component_background, id);
                            chart_obj_array.push(Chart);
                        } else if (type == "polarbar") {// 极坐标柱状图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.changeToPolarBarChart(echartdata.radiusData, echartdata.seriesData, Chart, echart_div_layout, tmp_component_name, tmp_component_background, id);
                            chart_obj_array.push(Chart);
                        } else if (type == "bubble") {// 气泡图
                            this.bubbleIds.push(id);
                            var myChart = echarts.init(document.getElementById(id), this.echart_theme.type);

                            this.bubble_echartdatas.push(echartdata);
                            this.echart_div_layouts.push(echart_div_layout);
                            this.tmp_component_names.push(tmp_component_name);
                            this.myCharts.push(myChart);

                            this.echartBubble(echartdata, myChart, id, echart_div_layout, tmp_component_name, this.bcolor);
                            chart_obj_array.push(myChart);
                            $("#" + id).css("overflow", "hidden");
                            $('#' + id).next('span').addClass('bubble'); //给所有的气泡图的拉伸按钮添加class
                            //添加打叉按钮
                            if (this.is_showdel) {
                                var imagevueobj = new commonProFile({
                                    propsData: {
                                        echart_div_layout: echart_div_layout,
                                        layout_id: id,
                                        delpng: this.delpng,
                                        layout: this.layout,
                                        global_component_array: this.global_component_array,
                                        chart_obj_array: this.chart_obj_array,
                                        selectRow: this.selectRow
                                    }
                                }).$mount();
                                this.MDdelimage(id, imagevueobj);
                            }
                            //延迟模拟点击达到放大缩小的效果
                            setTimeout(() => {
                                $('.bubble').click();
                            }, 100);
                        } else if (type == "blsimple") {// 柱状折线混合图-简单
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            this.changeToBLSimpleChart(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            chart_obj_array.push(Chart);
                        } else if (type == "map") {// 地图
                            var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                            setTimeout(() => {
                                this.changeToMapChart(echartdata, Chart, id, echart_div_layout, tmp_component_name, tmp_component_background);
                            }, 500);
                            chart_obj_array.push(Chart);
                        } else if (type == "card") {// 卡片
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
                            if (this.is_showdel) {
                                var imagevueobj = new commonProFile({
                                    propsData: {
                                        echart_div_layout: echart_div_layout,
                                        layout_id: id,
                                        delpng: this.delpng,
                                        layout: this.layout,
                                        global_component_array: this.global_component_array,
                                        chart_obj_array: this.chart_obj_array,
                                        selectRow: this.selectRow
                                    }
                                }).$mount();
                                this.carddelimage(id, imagevueobj);
                            }
                            var obj = {};
                            obj.layouttype = type;
                            obj.id = id;
                            obj.cardtext = echartdata.cardData;
                            chart_obj_array.push(obj);
                        } else if (type == "table") {// 二维表
                            this.tableData = echartdata.tableData;
                            this.tableDataLength = this.tableData.length;
                            var backgroundstyle = "";
                            var fontstyle = "";
                            //表格样式变化
                            var html = "<div>" +
                                "<div name='tablecomponentname'>" + tmp_component_name +
                                "</div>" +
                                "</div>";
                            $("#" + id).html(html);
                            $("#" + id).css("overflow", "hidden");
                            //删除按钮
                            if (this.is_showdel) {
                                var imagevueobj = new commonProFile({
                                    propsData: {
                                        echart_div_layout: echart_div_layout,
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
                            chart_obj_array.push(obj);
                        }
                    }
                })
                this.chart_obj_array = chart_obj_array;
                for(var i=0;i<this.layout.length;i++){
                    let layoutElement = this.layout[i];
                    this.resizedEvent(layoutElement.i,layoutElement.h,layoutElement.w,layoutElement.y,layoutElement.x);
                }
                setTimeout(() => {
                    this.confirmBackgroudColor();
                }, 100);
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
            //地图展示
            changeToMapChart(mapData, chart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var mydata = mapData.seriesData;
                var titles = transferOptionTitles(tmp_component_name, this.titleFont);
                this.legendStyle.padding = parseInt(this.legendStyle.padding);
                this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
                this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);
                var pName = "";
                if (this.seriesStyle.provincename == "全国") {
                    pName = "china";
                } else {
                    pName = this.seriesStyle.provincename;
                }
                this.legendStyle.intervalnumber = parseInt(this.legendStyle.intervalnumber);
                this.legendStyle.interval = parseInt(this.legendStyle.interval);
                var splitList = [];
                for (var i = 0; i < this.legendStyle.intervalnumber; i++) {
                    if (i == 0) {
                        splitList.push({
                            start: 0,
                            end: this.legendStyle.interval
                        });
                    } else {
                        splitList.push({
                            start: this.legendStyle.interval * i,
                            end: this.legendStyle.interval * (i + 1)
                        });
                    }
                }

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        formatter: '{b}:{c}',
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        global_component_id_array = [];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(chart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        chart.clear;
                                    }
                                }
                            },
                        },
                    },
                    //小导航图标
                    visualMap: {
                        show: this.legendStyle.show,
                        left: this.legendStyle.left,
                        top: this.legendStyle.top,
                        right: this.legendStyle.right,
                        bottom: this.legendStyle.bottom,
                        orient: this.legendStyle.orient,
                        align: this.legendStyle.align,
                        padding: this.legendStyle.padding,
                        itemGap: this.legendStyle.itemGap,
                        itemWidth: this.legendStyle.itemWidth,
                        itemHeight: this.legendStyle.itemHeight,
                        borderColor: this.legendStyle.borderColor,
                        borderWidth: this.legendStyle.borderWidth,
                        splitList: splitList,
                    },
                    series: [{
                        type: 'map',
                        mapType: pName,
                        selectedMode: 'multiple',
                        label: {
                            normal: {
                                show: this.echartsLabel.show_label,
                                position: this.echartsLabel.position,
                                formatter: this.echartsLabel.formatter,
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        roam: true,
                        data: mydata, //数据
                    },]
                };
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                chart.clear();
                chart.setOption(option);
                chart.resize();
            },
            //柱状折线混合图-简单展示
            changeToBLSimpleChart(blsimpleData, chart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var xAxisData = blsimpleData.xAxisData;
                var series1Name = blsimpleData.series1Name;
                var series1Data = blsimpleData.series1Data;
                var series2Name = blsimpleData.series2Name;
                var series2Data = blsimpleData.series2Data;
                this.axisStyle.borderWidth = parseInt(this.axisStyle.borderWidth);
                this.xAxis.offset = parseInt(this.xAxis.offset);
                this.xAxisLabel = Object.assign({}, this.xAxisLabel, this.axisStyle);
                this.xAxis.type = "category";
                this.xAxis.data = xAxisData;
                this.xAxis.nameTextStyle = this.axisStyle;
                this.xAxis.axisLine = this.xAxisLine;
                this.xAxis.axisLabel = this.xAxisLabel;
                var xAxisPointer = {
                    axisPointer: {
                        type: 'shadow'
                    }
                }
                this.xAxis = Object.assign({}, this.xAxis, xAxisPointer);
                this.yAxisLabel = Object.assign({}, this.yAxisLabel, this.axisStyle);
                this.yAxis.type = "value";
                this.yAxis.nameTextStyle = this.axisStyle;
                this.yAxis.axisLine = this.yAxisLine;
                this.yAxis.axisLabel = this.yAxisLabel;
                this.yAxis.position = "";
                var titles = transferOptionTitles(tmp_component_name, this.titleFont);
                this.legendStyle.data = [];
                this.legendStyle.data.push(series1Name);
                this.legendStyle.data.push(series2Name);
                this.legendStyle.padding = parseInt(this.legendStyle.padding);
                this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
                this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        global_component_id_array = [];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(chart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        chart.clear;
                                    }
                                }
                            },
                        },
                    },
                    legend: this.legendStyle,
                    xAxis: this.xAxis,
                    yAxis: [this.yAxis, this.yAxis],
                    series: [{
                        name: series1Name,
                        type: 'bar',
                        yAxisIndex: 0,
                        data: series1Data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: this.echartsLabel.show_label,
                                    position: this.echartsLabel.position,
                                    formatter: this.echartsLabel.formatter,
                                },
                            }
                        },
                    },
                        {
                            name: series2Name,
                            type: 'line',
                            yAxisIndex: 1,
                            data: series2Data,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: this.echartsLabel.show_label,
                                        position: this.echartsLabel.position,
                                        formatter: this.echartsLabel.formatter,
                                    },
                                }
                            },
                        }
                    ]
                };
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                chart.clear();
                chart.setOption(option);
                chart.resize();
            },
            //气泡图展示
            echartBubble(echartdata, bubbleChart, id, echart_div_layout, tmp_component_name, bcolor) {
                var data = echartdata.seriesData;
                var echartBackground = bcolor;
                var textName = transferOptionTitles(tmp_component_name, this.titleFont);
                renderBubbleChart(data, document.getElementById(id), textName, echartBackground);
            },
            //矩形树图展示
            echartTreemap(echartdata, treemapChart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var seriesArray = echartdata.seriesData;
                var titles = transferOptionTitles(tmp_component_name, this.titleFont);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}"
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        global_component_id_array = [];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(treemapChart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        treemapChart.clear;
                                    }
                                }
                            },
                        },
                    },
                    calculable: false,
                    series: [{
                        name: tmp_component_name,
                        type: 'treemap',
                        leafDepth: undefined,
                        breadcrumb: {
                            show: false,
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    show: echartsLabel.show_label,
                                    position: echartsLabel.position,
                                    formatter: echartsLabel.formatter,
                                },
                                borderWidth: 1
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: seriesArray
                    }]
                };
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                treemapChart.clear();
                treemapChart.setOption(option);
                treemapChart.resize();
            },
            //柱状折线混合图展示
            echartbl(echartdata, blChart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var legend_data = echartdata.legend_data;
                var seriesArray = echartdata.seriesArray;
                var xArray = echartdata.xArray;
                this.axisStyle.borderWidth = parseInt(this.axisStyle.borderWidth);
                this.xAxis.offset = parseInt(this.xAxis.offset);

                this.xAxisLabel = Object.assign({}, this.xAxisLabel, this.axisStyle);
                this.xAxis.type = "category";
                this.xAxis.data = xArray;
                this.xAxis.nameTextStyle = this.axisStyle;
                this.xAxis.axisLine = this.xAxisLine;
                this.xAxis.axisLabel = this.xAxisLabel;

                this.yAxisLabel = Object.assign({}, this.yAxisLabel, this.axisStyle);
                this.yAxis.type = "value";
                this.yAxis.nameTextStyle = this.axisStyle;
                this.yAxis.axisLine = this.yAxisLine;
                this.yAxis.axisLabel = this.yAxisLabel;
                this.yAxis.position = "";
                var titles = transferOptionTitles(tmp_component_name, this.titleFont);

                this.legendStyle.data = legend_data;
                this.legendStyle.padding = parseInt(this.legendStyle.padding);
                this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
                this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        global_component_id_array = [];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(blChart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        blChart.clear;
                                    }
                                }
                            },
                        },
                    },
                    calculable: true,
                    legend: this.legendStyle,
                    xAxis: this.xAxis,
                    yAxis: [this.yAxis, this.yAxis],
                    series: seriesArray
                };
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                blChart.clear();
                blChart.setOption(option);
                blChart.resize();
            },
            //盒须图展示
            echartboxplot(echartdata, boxplotChart, id, echart_div_layout, tmp_component_name) {
                var array = [];
                for (var i = 0; i < echartdata.legend_data.length; i++) {
                    var legend_data = echartdata.legend_data[i];
                    array.push(legend_data);
                }
                var array1 = [];
                for (var i = 0; i < echartdata.seriesArray.length; i++) {
                    var seriesArray = echartdata.seriesArray[i].data;
                    array1.push(seriesArray);
                }
                var data = echarts.dataTool.prepareBoxplotData(array1);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    title: [{
                        text: tmp_component_name,
                        left: 'center'
                    },
                    ],
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '10%',
                        top: '10%',
                        right: '10%',
                        bottom: '15%'
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        this.layout.splice(this.layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = this.layout;
                                        delete global_component_array[echart_div_layout.type];
                                        this.global_component_id_array = [];
                                        for (var i = 0; i < this.layout.length; i++) {
                                            if (this.layout[i].label == undefined) {
                                                this.global_component_id_array.push(this.layout[i].type);
                                            }
                                        }
                                        this.chart_obj_array.splice(this.chart_obj_array.indexOf(boxplotChart), 1);
                                        for (var i = 0; i < this.selectRow.length; i++) {
                                            if (this.selectRow[i].component_id == id) {
                                                this.selectRow.splice(i, 1);
                                            }
                                        }
                                        boxplotChart.clear;
                                    }
                                }
                            },
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: data.axisData,
                        boundaryGap: true,
                        nameGap: 30,
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            formatter(index) {
                                return array[index]
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitArea: {
                            show: true
                        }
                    },
                    series: [{
                        name: 'boxplot',
                        type: 'boxplot',
                        data: data.boxData,
                        tooltip: {
                            formatter(param) {
                                return [
                                    '字段名称:' + array[param.dataIndex],
                                    'upper: ' + param.data[5],
                                    'Q3: ' + param.data[4],
                                    'median: ' + param.data[3],
                                    'Q1: ' + param.data[2],
                                    'lower: ' + param.data[1]
                                ].join('<br/>');
                            }
                        }
                    },
                        {
                            name: 'outlier',
                            type: 'scatter',
                            data: data.outliers
                        }
                    ]
                };
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                boxplotChart.clear();
                boxplotChart.setOption(option);
                boxplotChart.resize();
            },
            //折线图展示
            echartline(echartdata, lineChart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var legend_data = echartdata.legend_data;
                var seriesArray = echartdata.seriesArray;
                var xArray = echartdata.xArray;

                this.axisStyle.borderWidth = parseInt(this.axisStyle.borderWidth);
                this.xAxisLabel = Object.assign({}, this.xAxisLabel, this.axisStyle);
                this.xAxis.type = "category";
                this.xAxis.data = xArray;
                this.xAxis.nameTextStyle = this.axisStyle;
                this.xAxis.axisLine = this.xAxisLine;
                this.xAxis.axisLabel = this.xAxisLabel;

                this.yAxisLabel = Object.assign({}, this.yAxisLabel, this.axisStyle);
                this.yAxis.type = "value";
                this.yAxis.nameTextStyle = this.axisStyle;
                this.yAxis.axisLine = this.yAxisLine;
                this.yAxis.axisLabel = this.yAxisLabel;

                var titles = transferOptionTitles(tmp_component_name, this.titleFont);
                this.legendStyle.data = legend_data;
                this.legendStyle.padding = parseInt(this.legendStyle.padding);
                this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
                this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: this.legendStyle,
                    grid: {
                        left: '6%',
                        right: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            datazoom: {show: true},
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(lineChart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        lineChart.clear;
                                    }
                                }
                            },
                        },
                    },
                    xAxis: this.xAxis,
                    yAxis: this.yAxis,
                    series: seriesArray
                };
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                lineChart.clear();
                lineChart.setOption(option, true);
                lineChart.resize();
            },
            //极坐标柱状图展示
            changeToPolarBarChart(radiusData, seriesData, chart, echart_div_layout, tmp_component_name, tmp_component_background, id) {
                var titles = transferOptionTitles(tmp_component_name, this.titleFont);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    angleAxis: {},
                    radiusAxis: {
                        type: 'category',
                        data: radiusData,
                        z: 10
                    },
                    tooltip: {
                        show: true,
                        formatter: '{b}：{c}',
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        global_component_id_array = [];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(chart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        chart.clear;
                                    }
                                }
                            },
                        },
                    },
                    polar: {},
                    series: [{
                        type: 'bar',
                        data: seriesData,
                        coordinateSystem: 'polar'
                    }],
                    legend: {
                        show: false
                    }
                };
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                chart.clear();
                chart.setOption(option);
                chart.resize();
            },
            //柱状图展示
            echartbar(echartdata, barChart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var legend_data = echartdata.legend_data;
                var seriesArray = echartdata.seriesArray;
                var xArray = echartdata.xArray;
                this.axisStyle.borderWidth = parseInt(this.axisStyle.borderWidth);
                this.xAxisLabel = Object.assign({}, this.xAxisLabel, this.axisStyle);
                this.xAxis.type = "category";
                this.xAxis.data = xArray;
                this.xAxis.nameTextStyle = this.axisStyle;
                this.xAxis.axisLine = this.xAxisLine;
                this.xAxis.axisLabel = this.xAxisLabel;
                this.yAxisLabel = Object.assign({}, this.yAxisLabel, this.axisStyle);
                this.yAxis.type = "value";
                this.yAxis.nameTextStyle = this.axisStyle;
                this.yAxis.axisLine = this.yAxisLine;
                this.yAxis.axisLabel = this.yAxisLabel;

                var titles = transferOptionTitles(tmp_component_name, this.titleFont);
                this.legendStyle.data = legend_data;
                this.legendStyle.padding = parseInt(this.legendStyle.padding);
                this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
                this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: this.legendStyle,
                    grid: {
                        left: '4%',
                        right: '10%',
                        bottom: '4%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            magicType: {
                                show: true,
                                type: ['stack', 'tiled']
                            },
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        global_component_id_array = [];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(barChart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        barChart.clear;
                                    }
                                },
                            },
                        },
                    },
                    xAxis: this.xAxis,
                    yAxis: this.yAxis,
                    series: seriesArray
                };
                if (global_component_id_array.length != 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                this.option = option;
                barChart.clear();
                barChart.setOption(option);
                barChart.resize();
            },
            //堆叠柱状图展示
            changeToStackingBarChart(data, stackingBarChart, echart_div_layout, tmp_component_name, tmp_component_background, id) {
                var result = this.initproperty();
                data.seriesArray.forEach(val => {
                    val.label = result.labelOption;
                })

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                let option = {
                    backgroundColor: this.auto_comp_sum.background,
                    title: result.titles,
                    legend: Object.assign({}, result.legendStyle, {
                        data: data.legend_data
                    }),
                    grid: {
                        left: '5%',
                        right: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            magicType: {
                                show: true,
                                type: ['stack', 'tiled']
                            },
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        global_component_id_array = [];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(stackingBarChart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        stackingBarChart.clear;
                                    }
                                },
                            },
                        },
                    },
                    xAxis: [
                        Object.assign({}, {
                            type: 'category',
                            data: data.xArray,
                            nameTextStyle: result.nameTextStyle,
                            axisLine: result.xaxisLine,
                            axisLabel: result.xaxisLabel,
                        }, result.xAxis)
                    ],
                    yAxis: Object.assign({}, {
                        type: 'value',
                        nameTextStyle: result.nameTextStyle,
                        axisLine: result.yaxisLine,
                        axisLabel: result.yaxisLabel,
                    }, result.yAxis),
                    series: data.seriesArray
                };
                if (global_component_id_array.length != 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.chart_obj_array = chart_obj_array;
                this.selectRow = selectRow;
                this.option = option;
                stackingBarChart.clear();
                stackingBarChart.setOption(option);
                stackingBarChart.resize();
            },
            initproperty() {
                var result = {};
                // 初始化标题属性
                this.initTitleStyle(result);
                //设置图上每个节点的显示情况
                var labelOption = {
                    normal: {
                        show: this.echartsLabel.show_label == '1' ? true : false,
                        position: this.echartsLabel.position,
                        formatter: this.echartsLabel.formatter
                    }
                }
                result.labelOption = labelOption;
                // 初始化轴配置信息
                this.initAxisStyle(result);
                // 初始化图例信息
                this.initLengendStyle(result);

                return result;
            },
            // 初始化图例信息
            initLengendStyle(result) {
                // 图例信息
                var legendStyle = {
                    type: this.legendStyle.type,
                    show: this.legendStyle.show == '1' ? true : false,
                    tooltip: this.legendStyle.tooltip == '1' ? true : false,
                    left: this.legendStyle.left,
                    top: this.legendStyle.top,
                    right: this.legendStyle.right,
                    bottom: this.legendStyle.bottom,
                    width: this.legendStyle.width,
                    height: this.legendStyle.height,
                    orient: this.legendStyle.orient,
                    align: this.legendStyle.align,
                    padding: this.legendStyle.padding == '' || this.legendStyle.padding == undefined ? nulll : parseInt(this.legendStyle.padding),
                    itemGap: this.legendStyle.itemGap,
                    itemWidth: this.legendStyle.itemWidth,
                    itemHeight: this.legendStyle.itemHeight,
                    inactiveColor: this.legendStyle.inactiveColor,
                    backgroundColor: this.legendStyle.backgroundColor,
                    borderColor: this.legendStyle.borderColor,
                    borderWidth: this.legendStyle.borderWidth,
                    interval: this.legendStyle.interval,
                    intervalNumber: this.legendStyle.intervalnumber,
                    data: []
                };
                result.legendStyle = legendStyle;
            },
            //饼图展示
            echartpie(echartdata, pieChart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var legend_data = echartdata.legendData;
                var seriesArray = echartdata.seriesArray;
                var pietype = echartdata.pietype;
                if (pietype == 'huanpie') {
                    var count = '总数：' + echartdata.count;
                } else {
                    var count = "";
                }
                var titles = transferOptionTitles(tmp_component_name, this.titleFont);
                this.legendStyle.data = legend_data;
                this.legendStyle.padding = parseInt(this.legendStyle.padding);
                this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
                this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: this.legendStyle,
                    graphic: {
                        type: 'text',
                        left: 'center',
                        top: 'center',
                        style: {
                            text: count,
                            textAlign: 'center',
                            fill: '#000',
                            width: 30,
                            height: 30
                        }
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(pieChart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        pieChart.clear;
                                    }
                                }
                            },
                        },
                    },
                    series: seriesArray
                };
                this.chart_obj_array = chart_obj_array;
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.selectRow = selectRow;
                this.option = option;
                pieChart.clear();
                pieChart.setOption(option);
                pieChart.resize();
            },
            //散点图展示
            echartscatter(echartdata, scatterChart, id, echart_div_layout, tmp_component_name, tmp_component_background) {
                var scatterData = echartdata.scatterData;
                var data = scatterData;

                this.axisStyle.borderWidth = parseInt(this.axisStyle.borderWidth);
                this.xAxisLabel = Object.assign({}, this.xAxisLabel, this.axisStyle);
                this.xAxis.nameTextStyle = this.axisStyle;
                this.xAxis.type = "value";
                this.xAxis.axisLine = this.xAxisLine;
                this.xAxis.axisLabel = this.xAxisLabel;

                this.yAxisLabel = Object.assign({}, this.yAxisLabel, this.axisStyle);
                this.yAxis.nameTextStyle = this.axisStyle;
                this.yAxis.axisLine = this.yAxisLine;
                this.yAxis.axisLabel = this.yAxisLabel;
                var titles = transferOptionTitles(tmp_component_name, this.titleFont);

                var is_showdel = this.is_showdel;
                var layout = this.layout;
                var chart_obj_array = this.chart_obj_array;
                var global_component_array = this.global_component_array;
                var selectRow = this.selectRow;
                var global_component_id_array = [];

                var option = {
                    backgroundColor: tmp_component_background,
                    title: titles,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    toolbox: {
                        feature: {
                            mydeltool: {
                                show: true,
                                title: "删除",
                                icon: "image://" + require("@/assets/images/del.png"),
                                onclick() {
                                    if (is_showdel == true) {
                                        layout.splice(layout.indexOf(echart_div_layout), 1);
                                        global_component_array.layout = layout;
                                        delete global_component_array[echart_div_layout.type];
                                        for (var i = 0; i < layout.length; i++) {
                                            if (layout[i].label == undefined) {
                                                global_component_id_array.push(layout[i].type);
                                            }
                                        }
                                        chart_obj_array.splice(chart_obj_array.indexOf(scatterChart), 1);
                                        for (var i = 0; i < selectRow.length; i++) {
                                            if (selectRow[i].component_id == id) {
                                                selectRow.splice(i, 1);
                                            }
                                        }
                                        scatterChart.clear;
                                    }
                                }
                            },
                        },
                    },
                    xAxis: this.xAxis,
                    yAxis: this.yAxis,
                    series: [{
                        type: 'scatter',
                        label: {
                            emphasis: {
                                show: this.echartsLabel.show_label,
                                position: this.echartsLabel.position,
                                textStyle: {
                                    color: 'blue',
                                    fontSize: 16
                                }
                            }
                        },
                        data: data
                    },
                    ]
                };
                this.chart_obj_array = chart_obj_array;
                if (global_component_id_array.length > 0) {
                    this.global_component_id_array = global_component_id_array;
                }
                this.selectRow = selectRow;
                this.option = option;
                scatterChart.clear();
                scatterChart.setOption(option);
                scatterChart.resize();
            },
            // 初始化轴配置信息
            initAxisStyle(result) {
                // 轴字体样式信息
                var nameTextStyle = {
                    color: this.axisStyle.color,
                    lineHeight: this.axisStyle.lineHeight,
                    fontFamily: this.axisStyle.fontFamily,
                    fontSize: this.axisStyle.fontSize,
                    align: this.axisStyle.align,
                    backgroundColor: this.axisStyle.backgroundColor,
                    borderColor: this.axisStyle.borderColor,
                    fontStyle: this.axisStyle.fontStyle,
                    fontWeight: this.axisStyle.fontWeight,
                    borderWidth: this.axisStyle.borderWidth,
                    borderRadius: this.axisStyle.borderRadius,
                    verticalAlign: this.axisStyle.verticalAlign,
                };
                result.nameTextStyle = nameTextStyle;
                // x轴配置信息
                var xAxis = {
                    name: this.xAxis.name,
                    position: this.xAxis.position,
                    show: this.xAxis.show == '1' ? true : false,
                    offset: this.xAxis.offset,
                    nameLocation: this.xAxis.nameLocation,
                    nameRotate: this.xAxis.nameRotate,
                    nameGap: this.xAxis.nameGap,
                }
                if (this.echart_type == 'blsimple') {
                    xAxis.xAxisPointer = {
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                    xAxis.data = this.xAxis.data
                }
                result.xAxis = xAxis;
                // y轴配置信息
                var yAxis = {
                    name: this.yAxis.name,
                    position: this.yAxis.position,
                    show: this.yAxis.show == '1' ? true : false,
                    offset: this.yAxis.offset,
                    nameLocation: this.yAxis.nameLocation,
                    nameRotate: this.yAxis.nameRotate,
                    nameGap: this.yAxis.nameGap
                }
                result.yAxis = yAxis;
                // x轴线信息
                var xaxisLine = {
                    show: this.xAxisLine.show == '1' ? true : false,
                    onZero: this.xAxisLine.onZero == '1' ? true : false,
                };
                result.xaxisLine = xaxisLine;
                // x轴标签信息
                var xaxisLabel = {
                    show: this.xAxisLabel.show == '1' ? true : false,
                    inside: this.xAxisLabel.inside == '1' ? true : false,
                    rotate: this.xAxisLabel.rotate,
                    margin: this.xAxisLabel.margin,
                    formatter: this.xAxisLabel.formatter == "" ? null : this.xAxisLabel.formatter
                };
                result.xaxisLabel = xaxisLabel;
                // y轴线信息
                var yaxisLine = {
                    show: this.yAxisLine.show == '1' ? true : false,
                    onZero: this.yAxisLine.onZero == '1' ? true : false,
                };
                result.yaxisLine = yaxisLine;
                // y轴标签信息
                var yaxisLabel = {
                    show: this.yAxisLabel.show == '1' ? true : false,
                    inside: this.yAxisLabel.inside == '1' ? true : false,
                    rotate: this.yAxisLabel.rotate,
                    margin: this.yAxisLabel.margin,
                    formatter: this.yAxisLabel.formatter == "" ? null : this.yAxisLabel.formatter
                };
                result.yaxisLabel = yaxisLabel;
            },
            //初始化标题样式
            initTitleStyle(result) {
                //设置标题属性
                var titles = {
                    text: this.auto_comp_sum.chart_theme,
                    x: this.titleFont.align,
                    y: this.titleFont.verticalalign,
                    backgroundColor: this.titleFont.backgroundColor,
                    borderColor: this.titleFont.borderColor,
                    borderWidth: this.titleFont.borderWidth,
                    borderRadius: this.titleFont.borderRadius,
                    textStyle: {
                        color: this.titleFont.color,
                        fontFamily: this.titleFont.fontFamily,
                        fontSize: this.titleFont.fontSize,
                        fontStyle: this.titleFont.fontStyle,
                        fontWeight: this.titleFont.fontWeight,
                        lineHeight: this.titleFont.lineHeight,
                    }
                };
                result.titles
                result.titles = titles;
            },
            //卡片组件     添加删除按钮
            carddelimage(id, imagevueobj) {
                $("#" + id).find("div[name='cardcomponentname']").append(imagevueobj.$el);
            },
            //图表组件     添加删除按钮
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
            //MD组件
            MDdelimage(id, imagevueobj) {
                $("#" + id).prepend(imagevueobj.$el);
            },
            //边框组件
            framedelimage(id, imagevueobj) {
                $("#" + id).prepend(imagevueobj.$el);
            },
            // 展示省
            showProvince(pName, Chinese_) {
                loadBdScript('$' + pName + 'JS', '../../../js/province/' + pName + '.js');
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
            // 关闭边框弹框
            beforeBorderClose() {
                this.dialogBorderVisible = false;
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
    var commonProFile = Vue.extend({
        template: "<img :src='delpng' style='width:15px;height:15px;cursor:pointer;position:absolute;right:1px;z-index:999;' class='pull-right' @click='delcard(this.layout,echart_div_layout,layout_id)'>",
        data: function () {
            return {}
        },
        props: ['echart_div_layout', 'layout_id', 'delpng', 'layout', 'global_component_array', 'chart_obj_array', 'selectRow'],
        methods: {
            delcard(layout, echart_div_layout, layout_id) {
                this.layout.splice(this.layout.indexOf(echart_div_layout), 1);
                this.global_component_array.layout = this.layout;
                for (var i = 0; i < this.chart_obj_array.length; i++) {
                    if (echart_div_layout.type == this.chart_obj_array[i].id) {
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
    //分割线删除按钮
    var linedelProfile = Vue.extend({
        template: "<img :src='delpng' style='width:15px;height:15px;cursor:pointer;position:absolute;right:1px;z-index:999;' class='pull-right' @click='delcard(this.layout,echart_div_layout,auto_line_info)'>",
        data: function () {
            return {}
        },
        props: ['echart_div_layout', 'auto_line_info', 'layout', 'auto_line_info_array', 'chart_obj_array', 'delpng', 'textlinearray', 'global_component_array', 'line_layout'],
        methods: {
            delcard(layout, echart_div_layout, auto_line_info, auto_line_info_array) {
                this.auto_line_info_array.splice(this.auto_line_info_array.indexOf(auto_line_info), 1);
                this.layout.splice(this.layout.indexOf(echart_div_layout), 1);
                this.global_component_array.layout = this.layout;
                this.line_layout.splice(this.line_layout.indexOf(echart_div_layout), 1);
                for (var i = 0; i < this.chart_obj_array.length; i++) {
                    if (echart_div_layout.type == this.chart_obj_array[i].id) {
                        this.chart_obj_array.splice(this.chart_obj_array.indexOf(this.chart_obj_array[i]), 1);
                        this.textlinearray.splice(this.textlinearray.indexOf(this.chart_obj_array[i]), 1);
                    }
                }
            },
        }
    })
    //边框删除按钮
    var framedelProfile = Vue.extend({
        template: "<img :src='delpng' style='width:15px;height:15px;cursor:pointer;position:absolute;right:5%;z-index:999;' class='pull-right' @click='delcard(this.layout,echart_div_layout,auto_frame_info)'>",
        data: function () {
            return {}
        },
        props: ['echart_div_layout', 'auto_frame_info', 'delpng', 'auto_frame_info_list', 'layout', 'global_component_array', 'frame_layout', 'textframearray', 'chart_obj_array'],
        methods: {
            delcard(layout, echart_div_layout, auto_frame_info) {
                this.auto_frame_info_list.splice(this.auto_frame_info_list.indexOf(auto_frame_info), 1);
                this.layout.splice(this.layout.indexOf(echart_div_layout), 1);
                this.global_component_array.layout = this.layout;
                this.frame_layout.splice(this.frame_layout.indexOf(echart_div_layout), 1);
                for (var i = 0; i < this.chart_obj_array.length; i++) {
                    if (echart_div_layout.type == this.chart_obj_array[i].id) {
                        this.chart_obj_array.splice(this.chart_obj_array.indexOf(this.chart_obj_array[i]), 1);
                        this.textframearray.splice(this.textframearray.indexOf(this.chart_obj_array[i]), 1);
                    }
                }

            },
        }
    })
    //文本标签删除按钮
    var labeldelProfile = Vue.extend({
        template: "<img :src='delpng' style='width:15px;height:15px;cursor:pointer;position:absolute;right:1px;z-index:999;top:1px;' class='pull-right' @click='delcard(this.layout,echart_div_layout,auto_label_info)'>",
        data: function () {
            return {}
        },
        props: ['echart_div_layout', 'auto_label_info', 'delpng', 'auto_label_info_array', 'layout', 'global_component_array', 'label_layout', 'textlabelarray', 'chart_obj_array'],
        methods: {
            delcard(layout, echart_div_layout, auto_label_info) {
                this.auto_label_info_array.splice(this.auto_label_info_array.indexOf(auto_label_info), 1);
                this.layout.splice(this.layout.indexOf(echart_div_layout), 1);
                this.global_component_array.layout = this.layout;
                this.label_layout.splice(this.label_layout.indexOf(echart_div_layout), 1);
                for (var i = 0; i < this.chart_obj_array.length; i++) {
                    if (echart_div_layout.type == this.chart_obj_array[i].id) {
                        this.chart_obj_array.splice(this.chart_obj_array.indexOf(this.chart_obj_array[i]), 1);
                        this.textlabelarray.splice(this.textlabelarray.indexOf(this.chart_obj_array[i]), 1);
                    }
                }

            },
        }
    })
    //气泡图拖动时改变大小
    $(document).on("click", ".bubble", function () {
        for (var i = 0; i < this.bubbleIds.length; i++) {
            this.echartBubble(this.bubble_echartdatas[i], this.myCharts[i], this.bubbleIds[i], this.echart_div_layouts[i], this.tmp_component_names[i], this.bcolor);
            $("#" + this.bubbleId).css("overflow", "hidden");
        }
    })
</script>
<style scoped>
    @import '/static/src/panal/css/bootstrap.min.css';

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
