export function initTitleStyle(text, titleFont, result) {
    //设置标题属性
    var titles = {
        text: text,
        x: titleFont.align,
        y: titleFont.verticalalign,
        backgroundColor: titleFont.backgroundcolor,
        borderColor: titleFont.bordercolor,
        borderWidth: titleFont.borderwidth,
        borderRadius: titleFont.borderradius,
        textStyle: {
            color: titleFont.color,
            fontFamily: titleFont.fontfamily,
            fontSize: titleFont.fontsize,
            fontStyle: titleFont.fontstyle,
            fontWeight: titleFont.fontweight,
            lineHeight: titleFont.lineheight,
        }
    };
    result.titles = titles;
    return result;
}

export function initLabelOption(echartsLabel, result) {
    //设置标题属性
    var labelOption = {
        label:{
            normal: {
                show: echartsLabel.show_label == '1' ? true : false,
                position: echartsLabel.position,
                formatter: echartsLabel.formatter
            }
        },
        labelLine:{
            normal: {
                show: echartsLabel.show_line == '1' ? true : false,
                length: 1,
            }
        }
    }
    result.labelOption = labelOption
}


export function initAxisStyle(axisStyle,xAxis,yAxis,xAxisLine,xAxisLabel,yAxisLine,yAxisLabel,result) {
    // 轴字体样式信息
    var nameTextStyle = {
        color: axisStyle.color,
        lineHeight: axisStyle.lineheight,
        fontFamily: axisStyle.fontfamily,
        fontSize: axisStyle.fontsize,
        align: axisStyle.align,
        backgroundColor: axisStyle.backgroundcolor,
        borderColor: axisStyle.bordercolor,
        fontStyle: axisStyle.fontstyle,
        fontWeight: axisStyle.fontweight,
        borderWidth: axisStyle.borderwidth,
        borderRadius: axisStyle.borderradius,
        verticalAlign: axisStyle.verticalalign,
    };
    result.nameTextStyle = nameTextStyle;
    // x轴配置信息
    var xAxis = {
        name: xAxis.name,
        position: xAxis.position,
        show: xAxis.show == '1' ? true : false,
        axisoOffset: xAxis.axisoffset,
        nameLocation: xAxis.namelocation,
        nameRotate: xAxis.namerotate,
        nameGap: xAxis.namegap,
    }
    result.xAxis = xAxis;
    // y轴配置信息
    var yAxis = {
        name: yAxis.name,
        position: yAxis.position,
        show: yAxis.show == '1' ? true : false,
        axisoOffset: yAxis.axisoffset,
        nameLocation: yAxis.namelocation,
        nameRotate: yAxis.namerotate,
        nameGap: yAxis.namegap
    }
    result.yAxis = yAxis;
    // x轴线信息
    var xaxisLine = {
        show: xAxisLine.show == '1' ? true : false,
        onZero: xAxisLine.onzero == '1' ? true : false,
        lineStyle: {}
    };
    result.xaxisLine = xaxisLine;
    // x轴标签信息
    var xaxisLabel = {
        show: xAxisLabel.show == '1' ? true : false,
        inside: xAxisLabel.inside == '1' ? true : false,
        rotate: xAxisLabel.rotate,
        margin: xAxisLabel.margin,
        formatter: xAxisLabel.formatter == "" ? null : xAxisLabel.formatter
    };
    result.xaxisLabel = xaxisLabel;
    // y轴线信息
    var yaxisLine = {
        show: yAxisLine.show == '1' ? true : false,
        onZero: yAxisLine.onzero == '1' ? true : false,
        lineStyle: {}
    };
    result.yaxisLine = yaxisLine;
    // y轴标签信息
    var yaxisLabel = {
        show: yAxisLabel.show == '1' ? true : false,
        inside: yAxisLabel.inside == '1' ? true : false,
        rotate: yAxisLabel.rotate,
        margin: yAxisLabel.margin,
        formatter: yAxisLabel.formatter == "" ? null : yAxisLabel.formatter
    };
    result.yaxisLabel = yaxisLabel;
}


export function initLengendStyle(legendStyle,result) {
    // 图例信息
    var legendStyle = {
        type: legendStyle.type,
        show: legendStyle.show == '1' ? true : false,
        tooltip: legendStyle.tooltip == '1' ? true : false,
        left: legendStyle.left_distance,
        top: legendStyle.top_distance,
        right: legendStyle.right_distance,
        bottom: legendStyle.bottom_distance,
        width: legendStyle.width,
        height: legendStyle.height,
        orient: legendStyle.orient,
        align: legendStyle.align,
        padding: legendStyle.padding == '' || legendStyle.padding == undefined ? nulll : parseInt(legendStyle.padding),
        itemGap: legendStyle.itemgap,
        itemWidth: legendStyle.itemwidth,
        itemHeight: legendStyle.itemheight,
        inactiveColor: legendStyle.inactivecolor,
        backgroundColor: legendStyle.backgroundcolor,
        borderColor: legendStyle.bordercolor,
        borderWidth: legendStyle.borderwidth,
        interval: legendStyle.interval,
        intervalnumber: legendStyle.intervalnumber,
        data: [],
        textStyle:{}
    };
    result.legendStyle =  legendStyle;
}

export function improveoption(option,tcolor,lcolor) {
    option.title.backgroundColor = "transparent";
    option.legend.backgroundColor = "transparent";
    option.legend.textStyle.color = "#b0c2f9";
    option.title.textStyle.color = "#3f44ff";
    if (option.xAxis != undefined) {
        if (option.xAxis instanceof Array) {
            for (var i = 0; i < option.xAxis.length; i++) {
                option.xAxis[i].nameTextStyle.color = tcolor;// 控制坐标轴x轴字体颜色
                option.xAxis[i].nameTextStyle.backgroundColor = "transparent";
                option.xAxis[i].axisLine.lineStyle.color = lcolor;// 控制坐标轴数字颜色
            }
        } else {
            option.xAxis.nameTextStyle.color = tcolor;
            option.xAxis.nameTextStyle.backgroundColor = "transparent";
            option.xAxis.axisLine.lineStyle.color = lcolor;
        }
    }
    if (option.yAxis != undefined) {
        if (option.yAxis instanceof Array) {
            for (var i = 0; i < option.yAxis.length; i++) {
                option.yAxis[i].nameTextStyle.color = tcolor;
                option.yAxis[i].nameTextStyle.backgroundColor = "transparent";
                option.yAxis[i].axisLine.lineStyle.color = lcolor;
            }
        } else {
            option.yAxis.nameTextStyle.color = tcolor;// 控制坐标轴y轴字体颜色
            option.yAxis.nameTextStyle.backgroundColor = "transparent";
            option.yAxis.axisLine.lineStyle.color = lcolor;// 控制坐标轴数字颜色
        }
    }
    return option;
}


