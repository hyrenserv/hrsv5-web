<template>
<div id='dataDashboard'>
    <div class="container" v-if="interfaceData==''">
        <!--仪表板展示-->
        <div id="mydiv" >
            <grid-layout :style="layout.length>0 ? grid_layout_backgroundcolor : 'background-color:#FFFFFF'" class="grid" id="grid_style"
                    style="height: 2000px;" :col-num="100" :row-height="11" :layout.sync="layout" :is-draggable="false" :autoSize="true"
                    :is-resizable="resizable" :is-mirrored="false" :vertical-compact="false" :margin="[0, 0]" :use-css-transforms="true">
                <grid-item style="background-color:transparent;border: 0px;" name="pic" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" >
                    <div :id="item.type" style="width: 370px;height:300px;"></div>
                </grid-item>
            </grid-layout>
        </div>
    </div>
    <span v-else>{{interfaceData}}</span>
</div>
</template>

<script>
import Vue from 'vue';
import VueGridLayout from 'vue-grid-layout';
import * as functionAll from "./serviceUser";
export default {
    data() {
        return {
            interfaceData:'',
            resizable:true,
            selectRow: [],
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
                y_axis_coord: null ,//y轴坐标
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
                is_gridline:'0'
            },
            echartThemeJson: require("@/assets/json/EchartTheme.json"),
            delpng:require('@/assets/images/del.png'),
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
            bordercolor:[
                {"code":"01","type":"black","style":"border-color:#000000"},
                {"code":"02","type":"white","style":"border-color:#FFFFFF"},
                {"code":"03","type":"purple","style":"border-color:#B23AEE"},
                {"code":"04","type":"grey","style":"border-color:#8B8386"},
                {"code":"05","type":"red","style":"border-color:#EE0000"},
                {"code":"06","type":"blue","style":"border-color:#4682B4"},
            ],
            borderwidth:[
                {"code":"00","type":"border-width:1px","style":"border:1px solid black;"},
                {"code":"01","type":"border-width:1.5px","style":"border:1.5px solid black;"},
                {"code":"02","type":"border-width:2px","style":"border:2px solid black;"},
                {"code":"03","type":"border-width:2.5px","style":"border:2.5px solid black;"},
                {"code":"04","type":"border-width:3px","style":"border:3px solid black;"},
                {"code":"05","type":"border-width:3.5px","style":"border:3.5px solid black;"},
            ],
            grid_layout_backgroundcolor: "background-color:transparent;",// 背景色
            chart_obj_array: [],
            echart_theme: "",
            chooseTitle_show: false,
            global_component_array: [],
            global_component_id_array:[],
            tmp_card_layout: "",
            bordercolor_show: false,
            tabledata: [],
            tabledatalength: "",
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
            title: {
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
                left: "center", //左边距
                top: "auto", //上边距
                right: "auto", //右边距
                bottom: "auto", //下边距
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
        }
    },
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem
    },
    mounted() {
        if (this.is_gridline == false) {
            $("#grid_style").removeClass("grid");
            this.is_gridline = true;
        }
        // 展示发布仪表盘数据
        this.showReleaseDashboard(this.$route.query);
        // 监控窗口变化
        window.addEventListener('resize', () => {
            $(".navbar").show();
            $("#dataDashboard").css("background-color","background-color:#FFFFFF;margin-top:-3.5%");
        });
        $(function(){
            setTimeout(() => {
                this.resizable = false;
            }, 2000);
        })
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
                                if (id!=undefined&&id!='') {
                                    var Chart = echarts.init(document.getElementById(id), dashboard_theme);
                                    Chart.resize();
                                }
                                // chart_obj_array[i].resize();
                            }
                        }
                    });
                });
            }
        }
    },
    methods: {
        //根据仪表盘ID与仪表盘名称获取仪表盘信息(编辑回显)
        showReleaseDashboard(param) {
            functionAll.showReleaseDashboard(param).then(res => {
                if (res && res.success) {
                    if (res.data.status!='NORMAL') {
                        this.interfaceData = this.getFormatData(JSON.stringify(res.data));;
                        return;
                    }
                    this.global_component_array = res.data.message;
                    // 分割线
                    if (undefined != res.data.message.autoLineInfo && '' !=  res.data.message.autoLineInfo) {
                        this.auto_line_info_array = res.data.message.autoLineInfo;
                    }
                     // 仪表板标题表与字体表信息
                    if (undefined !=  res.data.message.labelAndFont && '' != res.data.message.labelAndFont) {
                        this.auto_label_info_array = res.data.message.labelAndFont;
                    }
                    // 边框
                    if (undefined != res.data.message.frameInfo && '' !=  res.data.message.frameInfo) {
                        this.auto_frame_info_list = res.data.message.frameInfo;
                    }
                    // 仪表盘信息
                    this.auto_dashboard_info=res.data.message.auto_dashboard_info;
                    var code =this.auto_dashboard_info.dashboard_theme;
                    // 组件信息
                    this.selectRow=res.data.message.autoCompSums;
                    //把边框,文本标签,分割线的layout区分开
                    for(var i=0;i<res.data.message.layout.length;i++){
                        if("0"==res.data.message.layout[i].label){
                            this.label_layout.push(res.data.message.layout[i]);
                        }else if("1"==res.data.message.layout[i].label){
                            this.line_layout.push(res.data.message.layout[i]);
                        }else if("2" == res.data.message.layout[i].label){
                            this.frame_layout.push(res.data.message.layout[i]);
                        }else{
                            this.layout.push(res.data.message.layout[i]);
                        }
                    }
                    // 组件ID
                    var component_id_array=[];
                    for (var i = 0; i < this.layout.length; i++) {
                        var id = this.layout[i].type;
                        component_id_array.push(id);
                    }
                    this.global_component_id_array=component_id_array;
                    // 获取当前主题
                    var echart_theme_obj={};
                    for(var i=0;i<this.titleData.length;i++){
                        if(this.titleData[i].code == code){
                            echart_theme_obj = this.titleData[i];
                        }
                    }
                    this.echart_theme=echart_theme_obj;
                    if (code != "00") {
                        echarts.registerTheme(echart_theme_obj.type, this.echartThemeJson[echart_theme_obj.type]);
                        //更换卡片，标签，分割线，表格、边框的颜色为组件的主题颜色
                        setTimeout(()=>{
                            this.changeTitle(this.echart_theme);
                        },2000)
                    }
                    var index = 0;
                    for (var i = 0; i < this.titleData.length; i++) {
                        if (code == "0" + i) {
                            index = i;
                        }
                    }
                    this.bcolor = this.titleData[index].bcolor;
                    // 卡片表格回显
                    setTimeout(()=>{
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
                                this.cardname = "background:" + this.titleData[index].ncolor + ";color:" + this.titleData[index].fcolor + ";font-family:" + this.title.fontFamily;
                                this.cardname += ";font-style:" + this.title.fontStyle + ";font-weight:" + this.title.fontWeight;
                                this.cardname += ";font-size:" + this.title.fontSize + "px;line-height:" + this.title.lineHeight + "px;text-align:center;padding-left:15px";
    
                                this.cardstyle = "word-wrap:break-word;text-align:center;background:" + this.titleData[index].ncolor + ";color:" + this.titleData[index].fcolor;
                                this.cardstyle += ";font-family:" + this.title.fontFamily + ";font-style:" + this.title.fontStyle + ";font-weight:" + this.title.fontWeight + "px";
                            } else if (this.chart_obj_array[i].layouttype == "table") {
                                this.tabStyle.th_background = this.titleData[index].ncolor;
                                this.tabStyle.zl_background = this.titleData[index].ncolor;
                            }
                        }
                    },2000)
                    // 仪表盘展示
                    setTimeout(()=>{
                        this.echartpic(res.data.message,component_id_array);
                    },500)
                    // 边框回显
                    setTimeout(()=>{
                        this.frame_back();
                    },1000)
                    // 文本标签回显
                    setTimeout(()=>{
                        this.textlabel_back();
                    },1000)
                    // 分割线回显
                    setTimeout(()=>{
                        this.textline_back();
                    },1000)
                    setTimeout(()=>{
                        this.grid_layout_backgroundcolor = this.auto_dashboard_info.background;
                        $("div[name='pic']").each(function () {
                            $(this).trigger("mouseup");
                        });
                    },500)
                 }
             })
        },
        //分割线编辑回显
        textline_back() {
            this.$nextTick(function(){   
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
            this.$nextTick(function(){
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
            this.$nextTick(function(){
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
        //添加仪表板背景色
        confirmBackgroudColor() {
            this.grid_layout_backgroundcolor = "background-color:" + this.auto_dashboard_info.background;
        },
        //更换卡片，标签，分割线，表格、边框的颜色为组件的主题颜色
        changeTitle(data){
            this.$nextTick(function(){
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
                        cardname = "background:" + data.ncolor + ";color:" + data.fcolor + ";font-family:" + this.title.fontFamily;
                        cardname += ";font-style:" + this.title.fontStyle + ";font-weight:" + this.title.fontWeight;
                        cardname += ";font-size:" + this.title.fontSize + "px;line-height:" + this.title.lineHeight + "px;text-align:center;padding-left:15px";
                        cardstyle = "word-wrap:break-word;text-align:center;background:" + data.ncolor + ";color:" + data.fcolor;
                        cardstyle += ";font-family:" + this.title.fontFamily + ";font-style:" + this.title.fontStyle + ";font-weight:" + this.title.fontWeight + "px";
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
        //仪表板展示
        echartpic(data, component_id_array) {
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
            if (this.layout.length==0) {// 新增
                 this.layout=data.layout;
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
                        [].push.apply(this.layout,this.label_layout);
                    }
                    if (this.line_layout.length != 0) {
                        [].push.apply(this.layout,this.line_layout);
                    }
                    if (this.frame_layout.length != 0) {
                        [].push.apply(this.layout,this.frame_layout);
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
            var chart_obj_array=[];
            this.$nextTick(function () {
                for (var i = 0; i < component_id_array.length; i++) {
                    var id = component_id_array[i];
                    var echartdata = JSON.parse(data[id]);
                    var type = echartdata.chart_type;
                    $("#" + id).css({
                        "width": 370,
                        "height": 300
                    })
                    for (var j = 0; j < this.layout.length; j++) {
                        if (id == this.layout[j].type) {
                            var echart_div_layout = this.layout[j];
                            //标题设置
                            var title = echart_div_layout.titleFontInfo;
                            this.title = transferTitle(title);
                            //轴线字体
                            var axisStyle = echart_div_layout.axisFontInfo;
                            this.axisStyle = transferAxisStyle(axisStyle);
                            //轴线配置--x轴(xAxis)
                            var xAxis = echart_div_layout.xAxisInfo[0];
                            if (xAxis.show=='1') {
                                xAxis.show="true";
                            }
                            if (xAxis.silent=='1') {
                                xAxis.silent="true";
                            }else{
                                xAxis.silent="false";
                            }
                            this.xAxis = transferxAxis(xAxis);
                            //x轴(xAxisLine)
                            var xAxisLine = echart_div_layout.xAxisLine;
                            if (xAxisLine.show=='1') {
                                xAxisLine.show="true";
                            }
                            this.xAxisLine = transferxAxisLine(xAxisLine);
                            //x轴(xAxisLabel)
                            var xAxisLabel = echart_div_layout.xAxisLabel;
                            if (xAxisLabel.show=='1') {
                                xAxisLabel.show="true";
                            }
                            this.xAxisLabel = transferxAxisLabel(xAxisLabel);
                            //轴线配置--y轴
                            var yAxis = echart_div_layout.yAxisInfo[0];
                            if (yAxis.show=='1') {
                                yAxis.show="true";
                            }
                             if (yAxis.silent=='1') {
                                yAxis.silent="true";
                            }else{
                                yAxis.silent="false";
                            }
                            this.yAxis = transferyAxis(yAxis);
                            //y轴(yAxisLine)
                            var yAxisLine = echart_div_layout.yAxisLine;
                            if (yAxisLine.show=='1') {
                                yAxisLine.show="true";
                            }
                            this.yAxisLine = transferyAxisLine(yAxisLine);
                            //y轴(yAxisLabel)
                            var yAxisLabel = echart_div_layout.yAxisLabel;
                            if (yAxisLabel.show=='1') {
                                yAxisLabel.show="true";
                            }
                            this.yAxisLabel = transferyAxisLabel(yAxisLabel);
                            //二维表
                            var tableStyle = echart_div_layout.twoDimensionalTable
                            this.tabStyle.th_background = tableStyle.th_background;
                            this.tabStyle.is_gridline = tableStyle.is_gridline;
                            this.tabStyle.is_zebraline = tableStyle.is_zebraline;
                            this.tabStyle.zl_background = tableStyle.zl_background;
                            //图表配置
                            // var seriesStyle = echart_div_layout.chartsconfig;
                            // seriesStyle.center = JSON.stringify(seriesStyle.center);
                            // seriesStyle.center = JSON.parse(seriesStyle.center);
                            // this.seriesStyle = transferSeriesStyle(seriesStyle);
                            //文本标签
                            // var echartsLabel = echart_div_layout.textLabel;
                            // this.echartsLabel = transferEchartsLabel(echartsLabel);
                            //图例设置
                            var legendStyle = echart_div_layout.legendInfo;
                            if (legendStyle.show=='1') {
                                legendStyle.show="true";
                            }
                            this.legendStyle = transferLegendStyle(legendStyle);
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
                    } else if (type == "card") {// 卡片
                        this.tmp_card_layout = echart_div_layout;
                        var cardname = "background:" + this.title.backgroundColor + ";color:" + this.title.color + ";font-family:" + this.title.fontFamily;
                        cardname += ";font-style:" + this.title.fontStyle + ";font-weight:" + this.title.fontWeight;
                        cardname += ";font-size:" + this.title.fontSize + "px;line-height:" + this.title.lineHeight + "px;text-align:center;padding-left:15px";
                        var cardstyle = "word-wrap:break-word;text-align:center;background:" + this.title.backgroundColor + ";color:" + this.title.color;
                        cardstyle += ";font-family:" + this.title.fontFamily + ";font-style:" + this.title.fontStyle + ";font-weight:" + this.title.fontWeight + "px";
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
                        $("#" + id).find("div[class='cardclass']").html(echartdata.CardData);
                        var obj = {};
                        obj.layouttype = type;
                        obj.id = id;
                        obj.cardtext = echartdata.CardData;
                        chart_obj_array.push(obj);
                    } else if (type == "table") {// 二维表
                        this.tmp_card_layout = echart_div_layout;
                        this.tabledata = echartdata.TableData;
                        this.tabledatalength = this.tabledata.length;
                        var backgroundstyle = "";
                        var fontstyle = "";
                        //表格样式变化
                        var html = "<div>" +
                            "<div name='tablecomponentname'>" + tmp_component_name +
                            "</div>" +
                            "</div>";
                        $("#" + id).html(html);
                        $("#" + id).css("overflow", "hidden");
                        //表格数据
                        var tablevueobj = new tableProfile({
                            propsData: {
                                tabledata: this.tabledata,
                                tabledatalength: this.tabledatalength,
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
                    } else if (type == "barmd") { //多维柱状图
                        $("#" + id).css('width', "600px");
                        $("#" + id).css('height', "400px");
                        this.barmdIds.push(id);
                        this.barmd_echartdatas.push(echartdata);
                        var Chart = this.changeToBarmdChart(document.getElementById(id), echartdata, this.bcolor);
                        chart_obj_array.push(Chart.chart);
                        $('#' + id).next('span').addClass('barmd');
                        //延迟模拟点击达到放大缩小的效果
                        setTimeout(() => {
                            $('.barmd').click();
                        }, 100);

                    } else if (type == "polarbar") {// 极坐标柱状图
                        var Chart = echarts.init(document.getElementById(id), this.echart_theme.type);
                        this.changeToPolarBarChart(echartdata.radiusData, echartdata.seriesData, Chart, echart_div_layout, tmp_component_name, tmp_component_background,id);
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
                    }
                }
            })
            this.chart_obj_array=chart_obj_array;
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
                if ($.inArray(component_id, layoutId_array) ==-1) {
                    if (result.indexOf(layout[index])==-1) {
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
                if ($.inArray(component_id, layoutId_array) !=-1) {
                    if (result.indexOf(layout[index])==-1) {
                        result.push(layout[index]);
                    }
                }
            }
            return result;
        },
        //地图展示
        changeToMapChart(mapData, chart, id, layout, tmp_component_name, tmp_component_background) {
            var mydata = mapData.seriesData;
            var titles = transferOptionTitles(tmp_component_name, this.title);
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

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
            var global_component_id_array = [];

            var option = {
                backgroundColor: tmp_component_background,
                title: titles,
                tooltip: {
                    formatter: '{b}:{c}',
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
                }, ]
            };
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            chart.clear();
            chart.setOption(option);
            chart.resize();
        },
        //柱状折线混合图-简单展示
        changeToBLSimpleChart(blsimpleData, chart, id, layout, tmp_component_name, tmp_component_background) {
            var xAxisdata = blsimpleData.xAxisdata;
            var series1Name = blsimpleData.series1Name;
            var series1Data = blsimpleData.series1Data;
            var series2Name = blsimpleData.series2Name;
            var series2Data = blsimpleData.series2Data;
            this.axisStyle.borderWidth = parseInt(this.axisStyle.borderWidth);
            this.xAxis.offset = parseInt(this.xAxis.offset);
            this.xAxisLabel = Object.assign({}, this.xAxisLabel, this.axisStyle);
            this.xAxis.type = "category";
            this.xAxis.data = xAxisdata;
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
            var titles = transferOptionTitles(tmp_component_name, this.title);
            this.legendStyle.data = [];
            this.legendStyle.data.push(series1Name);
            this.legendStyle.data.push(series2Name);
            this.legendStyle.padding = parseInt(this.legendStyle.padding);
            this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
            this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
            var global_component_id_array = [];

            var option = {
                backgroundColor: tmp_component_background,
                title: titles,
                tooltip: {
                    trigger: 'axis'
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
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            chart.clear();
            chart.setOption(option);
            chart.resize();
        },
        //多维柱状图展示
        changeToBarmdChart(elobj, data, bcolor) {
            var dimension = [];
            var xColLen = data.xColLen;
            if (xColLen === 2) {
                dimension.push({
                    "key": "XAxis2",
                    "tagkey": "XAxis2",
                    "alias": "类型",
                    "continuity": "00",
                    "colType": "string"
                });
            } else if (xColLen >= 3) {
                dimension.push({
                    "key": "XAxis1",
                    "tagkey": "XAxis1",
                    "alias": "大类",
                    "continuity": "00",
                    "colType": "string"
                });
                dimension.push({
                    "key": "XAxis2",
                    "tagkey": "XAxis2",
                    "alias": "子类",
                    "continuity": "00",
                    "colType": "string"
                });
            }
            dimension.push({
                "key": "XAxis3",
                "tagkey": "XAxis3",
                "alias": "名称",
                "continuity": "00",
                "colType": "string"
            });

            var measure = [{
                "key": "sum",
                "tagkey": "sum",
                "alias": "总数",
                "prop": "sum",
                "continuity": "11",
                "colType": "double",
                "state": "bar"
            }];
            if (bcolor == "") {
                bcolor = "#4cc5f4";
            }
            var chart = new MulDimensionChart(elobj, data.barmdData, dimension, measure, bcolor);

            return chart;
        },
        //气泡图展示
        echartBubble(echartdata, bubbleChart, id, layout, tmp_component_name, bcolor) {
            var data = echartdata.seriesData;
            var echartBackground = bcolor;
            var textName = transferOptionTitles(tmp_component_name, this.title);
            renderBubbleChart(data, document.getElementById(id), textName, echartBackground);
        },
        //矩形树图展示
        echartTreemap(echartdata, treemapChart, id, layout, tmp_component_name, tmp_component_background) {
            var seriesArray = echartdata.seriesData;
            var titles = transferOptionTitles(tmp_component_name, this.title);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
            var global_component_id_array = [];

            option = {
                backgroundColor: tmp_component_background,
                title: titles,
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c}"
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
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            treemapChart.clear();
            treemapChart.setOption(option);
            treemapChart.resize();
        },
        //柱状折线混合图展示
        echartbl(echartdata, blChart, id, layout, tmp_component_name, tmp_component_background) {
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
            var titles = transferOptionTitles(tmp_component_name, this.title);

            this.legendStyle.data = legend_data;
            this.legendStyle.padding = parseInt(this.legendStyle.padding);
            this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
            this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
            var global_component_id_array = [];

            option = {
                backgroundColor: tmp_component_background,
                title: titles,
                tooltip: {
                    trigger: 'axis'
                },
                calculable: true,
                legend: this.legendStyle,
                xAxis: this.xAxis,
                yAxis: [this.yAxis, this.yAxis],
                series: seriesArray
            };
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            blChart.clear();
            blChart.setOption(option);
            blChart.resize();
        },
        //盒须图展示
        echartboxplot(echartdata, boxplotChart, id, layout, tmp_component_name) {
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

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
            var global_component_id_array = [];

            option = {
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
             if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            boxplotChart.clear();
            boxplotChart.setOption(option);
            boxplotChart.resize();
        },
        //折线图展示
        echartline(echartdata, lineChart, id, layout, tmp_component_name, tmp_component_background) {
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

            var titles = transferOptionTitles(tmp_component_name, this.title);
            this.legendStyle.data = legend_data;
            this.legendStyle.padding = parseInt(this.legendStyle.padding);
            this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
            this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
            var global_component_id_array = [];

            var option = {
                backgroundColor: tmp_component_background,
                title: titles,
                tooltip: {
                    trigger: 'axis'
                },
                legend: Object.assign({}, this.legendStyle, {data:legend_data}),
                grid: {
                    left: '6%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: seriesArray
            };
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            lineChart.clear();
            lineChart.setOption(option,true);
            lineChart.resize();
        },
        //极坐标柱状图展示
        changeToPolarBarChart(radiusData, seriesData, chart, layout, tmp_component_name, tmp_component_background,id) {
            var titles = transferOptionTitles(tmp_component_name, this.title);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
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
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            chart.clear();
            chart.setOption(option);
            chart.resize();
        },
        //柱状图展示
        echartbar(echartdata, barChart, id, layout, tmp_component_name, tmp_component_background) {
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

            var titles = transferOptionTitles(tmp_component_name, this.title);
            this.legendStyle.data = legend_data;
            this.legendStyle.padding = parseInt(this.legendStyle.padding);
            this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
            this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
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
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: seriesArray
            };
            if(global_component_id_array.length != 0 ) {
                this.global_component_id_array=global_component_id_array;
            }
            this.chart_obj_array=chart_obj_array;
            this.selectRow=selectRow;
            this.option = option;
            barChart.clear();
            barChart.setOption(option);
            barChart.resize();
        },
        //饼图展示
        echartpie(echartdata, pieChart, id, layout, tmp_component_name, tmp_component_background) {
            var legend_data = echartdata.legendData;
            var seriesArray = echartdata.seriesArray;
            var pietype = echartdata.pietype;
            if (pietype == 'huanpie') {
                var count = '总数：' + echartdata.count;
            } else {
                var count = "";
            }
            var titles = transferOptionTitles(tmp_component_name, this.title);
            this.legendStyle.data = legend_data;
            this.legendStyle.padding = parseInt(this.legendStyle.padding);
            this.legendStyle.itemGap = parseInt(this.legendStyle.itemGap);
            this.legendStyle.itemWidth = parseInt(this.legendStyle.itemWidth);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
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
                    series: seriesArray
                };
            this.chart_obj_array=chart_obj_array;
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.selectRow=selectRow;
            this.option=option;
            pieChart.clear();
            pieChart.setOption(option);
            pieChart.resize();
        },
        //散点图展示
        echartscatter(echartdata, scatterChart, id, layout, tmp_component_name, tmp_component_background) {
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
            var titles = transferOptionTitles(tmp_component_name, this.title);

            var layout =this.layout;
            var chart_obj_array =this.chart_obj_array;
            var global_component_array=this.global_component_array;
            var selectRow=this.selectRow;
            var global_component_id_array=[];

            var option = {
                backgroundColor: tmp_component_background,
                title: titles,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
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
            this.chart_obj_array=chart_obj_array;
            if (global_component_id_array.length>0) {
                this.global_component_id_array=global_component_id_array;
            }
            this.selectRow=selectRow;
            this.option=option;
            scatterChart.clear();
            scatterChart.setOption(option);
            scatterChart.resize();
        },
        //图表组件
        tableimage(id, tablevueobj) {
            $("#" + id).append(tablevueobj.$el);
        },
        // 展示省
        showProvince(pName, Chinese_) {
            loadBdScript('$'+pName+'JS','../../../js/province/'+pName+'.js');
        },

        formatJson(json) {
            let i = 0,
                il = 0,
                tab = "    ",
                newJson = "",
                indentLevel = 0,
                inString = false,
                currentChar = null;
            for (i = 0, il = json.length; i < il; i += 1) {
                currentChar = json.charAt(i);
                switch (currentChar) {
                    case '{':
                    case '[':
                        if (!inString) {
                            newJson += currentChar + "\n" + this.repeat(tab, indentLevel + 1);
                            indentLevel += 1
                        } else {
                            newJson += currentChar
                        }
                        break;
                    case '}':
                    case ']':
                        if (!inString) {
                            indentLevel -= 1;
                            newJson += "\n" + this.repeat(tab, indentLevel) + currentChar
                        } else {
                            newJson += currentChar
                        }
                        break;
                    case ',':
                        if (!inString) {
                            newJson += ",\n" + this.repeat(tab, indentLevel)
                        } else {
                            newJson += currentChar
                        }
                        break;
                    case ':':
                        if (!inString) {
                            newJson += ": "
                        } else {
                            newJson += currentChar
                        }
                        break;
                    case ' ':
                    case "\n":
                    case "\t":
                        if (inString) {
                            newJson += currentChar
                        }
                        break;
                    case '"':
                        if (i > 0 && json.charAt(i - 1) !== '\\') {
                            inString = !inString
                        }
                        newJson += currentChar;
                        break;
                    default:
                        newJson += currentChar;
                        break
                }
            }
            return newJson
        },
        getFormatData(json) {
            json = json + "";
            if (json.indexOf('{') === -1 && json.indexOf('[') === -1) {
                return json;
            } else {
                return (this.formatJson(json));
            }
        },
        repeat(s, count) {
            return new Array(count + 1).join(s)
        },

    },
}

//table
var tableProfile = Vue.extend({
    template: "<div class='tableclass' name='tablediv'>" +
        "<table class='table' name='tablename' :style='backgroundstyle'>" +
        "<thead >" +
        "<tr :style='backgroundstyle'>" +
        "<th :style='fontstyle' v-for='(value,key) in tabledata[0]'>{{key}}</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "<tr v-for='len in tabledata.length' :style='fontstyle'>" +
        "<td v-for='(value,key) in tabledata[len-1]'>{{value}} </td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</div>",
    props: ['tabledata', 'tabledatalength', 'backgroundstyle', 'fontstyle'],
    data: function () {
         return {}
    },
    methods:{}
})
//气泡图拖动时改变大小
$(document).on("click", ".bubble", function () {
    for (var i = 0; i < this.bubbleIds.length; i++) {
        this.echartBubble(this.bubble_echartdatas[i], this.myCharts[i], this.bubbleIds[i], this.echart_div_layouts[i], this.tmp_component_names[i], this.bcolor);
        $("#" + this.bubbleId).css("overflow", "hidden");
    }
})
//多维柱状图拖动改变大小
$(document).on("click", ".barmd", function () {
    for (var i = 0; i < this.barmdIds.length; i++) {
        this.changeToBarmdChart(document.getElementById(this.barmdIds[i]), this.barmd_echartdatas[i], this.bcolor);
    }
})
</script>
<style scoped>
@import '/static/src/panal/css/bootstrap.min.css';

.el-input{
    width: 360px;
}
.el-select{
    width: 360px;
}

.grid {
    background:
        -webkit-linear-gradient(top, transparent 10px, #ccc 10px),
        -webkit-linear-gradient(left, transparent 10px, #ccc 10px);
    background-size: 11px 11px;
}
</style>
