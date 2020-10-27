<template>
<div id="shoDashboard" :style="layout.length>0 ? grid_layout_backgroundcolor : 'background-color:rgb(255, 255, 255)'" style="height: 2000px">
    <div class="container">
        <div class="row clearfix" id="mydiv">
            <div class="col-md-12 column">
                <div class="panel-body">
                    <grid-layout :style="layout.length>0 ? grid_layout_backgroundcolor : 'background-color:rgb(255, 255, 255)'" :col-num="100" :row-height="11" :layout.sync="layout" :is-draggable="false" :is-resizable="resizable" :is-mirrored="false" :vertical-compact="false" :margin="[0, 0]" :use-css-transforms="true">
                        <grid-item style="background-color:transparent;border: 0px;" name="pic" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" :static="item.static">
                            <div :id="item.type" style="width: 300px;height:200px;"></div>
                        </grid-item>
                    </grid-layout>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import * as functionAll from "./serviceUser";
export default {
    data() {
        return {
            layout: [],
            echartdata: [],
            resizable: true,
            bubbleIds: [],
            bubble_echartdatas: [],
            echart_div_layouts: [],
            tmp_component_names: [],
            myCharts: [],
            barmdIds: [],
            barmd_echartdatas: [],
            cardstyle: "",
            cardname: "",
            bcolor: "",
            auto_dashboard_info: {
                dashboard_id: "",
                user_id: "",
                dashboard_name: "",
                dashboard_desc: "",
                create_date: "",
                create_time: "",
                last_update_date: "",
                last_update_time: "",
                update_user: "",
                background: "transparent",
            },
            zhuti: [{
                    "code": "00",
                    "CN_type": "原始",
                    "type": "source",
                    "bcolor": "#40E3F7",
                    "fcolor": "rgb(255,255,255)",
                    "ncolor": "rgb(67,142,185)",
                    "style": "background-color:transparent;",
                    "depth": "qian",
                    "picurl": "../../../images/L0402theme/source.jpg"
                },
                {
                    "code": "01",
                    "CN_type": "万圣节",
                    "type": "halloween",
                    "bcolor": "#FF715E",
                    "fcolor": "rgb(255,255,255)",
                    "ncolor": "rgb(255,113,94)",
                    "style": "background-color:#6E6E6E;background-size: 100% 100%;",
                    "depth": "sheng",
                    "picurl": "../../../images/L0402theme/halloween.jpg"
                },
                {
                    "code": "02",
                    "CN_type": "紫色",
                    "type": "purple",
                    "bcolor": "#9B8BBA",
                    "fcolor": "rgb(255,255,255)",
                    "ncolor": "rgb(155,139,186)",
                    "style": "background-color: rgb(91, 92, 110);",
                    "depth": "sheng",
                    "picurl": "../../../images/L0402theme/purple.jpg"
                },
                {
                    "code": "03",
                    "CN_type": "恩索思",
                    "type": "essos",
                    "bcolor": "#893448",
                    "fcolor": "rgb(255,255,255)",
                    "ncolor": "rgb(137,52,72)",
                    "style": "background-color: rgba(242, 234, 191, 0.15);",
                    "depth": "qian",
                    "picurl": "../../../images/L0402theme/essos.jpg"
                },
                {
                    "code": "04",
                    "CN_type": "粉笔",
                    "type": "chalk",
                    "bcolor": "#FC97AF",
                    "fcolor": "rgb(255,255,255)",
                    "ncolor": "rgb(252,151,175)",
                    "style": "background-color: rgb(41, 52, 65);",
                    "depth": "sheng",
                    "picurl": "../../../images/L0402theme/chalk.jpg"
                },
            ],
            auto_comp_sum_array: [],
            auto_frame_info_list: [],
            tmp_auto_comp_sum_array: [],
            grid_layout_backgroundcolor: "background-color:transparent;",
            chart_obj_array: [],
            Global_component_array: [],
            tmp_card_layout: "",
            tabledata: [],
            echart_theme: "",
            tabledatalength: "",
            auto_label_info_array: [],
            auto_line_info_array: [],
            textlabelarray: [],
            labelfontcolor: [{
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
        }
    },
    mounted() {
        this.dashboardRelease();
    },
    methods: {
        dashboardRelease() {
            functionAll.dashboardRelease({
            }).then(res => {
            });
        }
    }
}
</script>
