//标题设置
function transferTitle(title){
	var result = {
			align : title.align,
			verticalAlign : title.verticalalign,
			backgroundColor : title.backgroundcolor,
			borderColor : title.bordercolor,
			borderWidth : title.borderwidth,
			borderRadius : title.borderradius,
			color : title.color,
			fontFamily : title.fontfamily == "arial" ? "Arial" : title.fontfamily,
			fontSize : title.fontsize,
			fontStyle : title.fontstyle,
			fontWeight : title.fontweight,
			lineHeight : title.lineheight,
	};
	return result;
};

//轴线字体
function transferAxisStyle(axisStyle){
	var result = {
			align : axisStyle.align,
			verticalAlign : axisStyle.verticalalign,
			backgroundColor : axisStyle.backgroundcolor,
			borderColor : axisStyle.bordercolor,
			borderWidth : axisStyle.borderwidth,
			borderRadius : axisStyle.borderradius,
			color : axisStyle.color,
			fontFamily : axisStyle.fontfamily == "arial" ? "Arial" : axisStyle.fontfamily,
			fontSize : axisStyle.fontsize,
			fontStyle : axisStyle.fontstyle,
			fontWeight : axisStyle.fontweight,
			lineHeight : axisStyle.lineheight,
	};
	return result;
};

//轴线配置--x轴(xAxis)
function transferxAxis(xAxis){
	var result = {
			show : xAxis.show == "true" ? true : false,
			position : xAxis.position,
			offset : xAxis.axisoffset,
			name : xAxis.name,
			nameLocation : xAxis.namelocation,
			nameGap : xAxis.namegap,
			nameRotate : xAxis.namerotate,
	};
	return result;
};

//x轴(xAxisLine)
function transferxAxisLine(xAxisLine){
	var result = {
			show : xAxisLine.show == "true" ? true : false,
			onZero : xAxisLine.onzero == "true" ? true : false,
			symbol : xAxisLine.symbol,
			symbolOffset : xAxisLine.symboloffset,
	};
	return result;
};

//x轴(xAxisLabel)
function transferxAxisLabel(xAxisLabel){
	var result = {
			show : xAxisLabel.show == "true" ? true : false,
			inside : xAxisLabel.inside == "false" ? false : true,
			rotate : parseInt(xAxisLabel.rotate),
			margin : parseInt(xAxisLabel.margin),
			formatter : xAxisLabel.formatter == "" ? null : xAxisLabel.formatter,
	};
	return result;
};

//轴线配置--y轴
function transferyAxis(yAxis){
	var result = {
			show : yAxis.show == "true" ? true : false,
			position : yAxis.position,
			offset : yAxis.axisoffset,
			name : yAxis.name,
			nameLocation : yAxis.namelocation,
			nameGap : yAxis.namegap,
			nameRotate : yAxis.namerotate,
	};
	return result;
};

//y轴(yAxisLine)
function transferyAxisLine(yAxisLine){
	var result = {
			show : yAxisLine.show == "true" ? true : false,
			onZero : yAxisLine.onzero == "true" ? true : false,
			symbol : yAxisLine.symbol,
			symbolOffset : yAxisLine.symboloffset,
	};
	return result;
};

//y轴(yAxisLabel)
function transferyAxisLabel(yAxisLabel){
	var result = {
			show : yAxisLabel.show == "true" ? true : false,
			inside : yAxisLabel.inside == "false" ? false : true,
			rotate : parseInt(yAxisLabel.rotate),
			margin : parseInt(yAxisLabel.margin),
			formatter : yAxisLabel.formatter == "" ? null : yAxisLabel.formatter,
	};
	return result;
};

//(seriesStyle)
function transferSeriesStyle(seriesStyle){
	var result = {
			type: seriesStyle.type,
			center: seriesStyle.center,
			provincename: seriesStyle.provincename,
	};
	return result;
}

//(echartsLabel)
function transferEchartsLabel(echartsLabel) {
	var result = {
			show_label : echartsLabel.show_label == "true" ? true : false,
    		position: echartsLabel.position,
    		formatter : echartsLabel.formatter,
    		show_line : echartsLabel.show_line == "true" ? true : false,
    		smooth : echartsLabel.smooth == "false" ? false : true,
	};
	return result;
}

//option标题(title)
function transferOptionTitles(titleName, titleStyle) {
	var titles = {
			text: titleName,
	        x: titleStyle.align,
	        y: titleStyle.verticalAlign,
	        backgroundColor: titleStyle.backgroundColor,
	        borderColor: titleStyle.borderColor,
	        borderWidth: titleStyle.borderWidth,
	        borderRadius: titleStyle.borderRadius,
	        textStyle: {
	        	color: titleStyle.color,
	        	fontFamily: titleStyle.fontFamily,
	        	fontSize: titleStyle.fontSize,
	        	fontStyle: titleStyle.fontStyle,
	        	fontWeight: titleStyle.fontWeight,
	        	lineHeight: titleStyle.lineHeight,
	        }
	};
	return titles;
}

//图例设置(legendStyle)
function transferLegendStyle(legend) {
	var result = {
			type : legend.type,
        	show : legend.show == "true" ? true : false,
//        	z : legend.z,
        	left : legend.left_distance,
        	top : legend.top_distance,
        	right : legend.right_distance,
        	bottom : legend.bottom_distance,
        	width : legend.width,
        	height : legend.height,
        	orient : legend.orient,
        	align : legend.align,
        	padding : legend.padding,
        	itemGap : legend.itemgap,
        	itemWidth : legend.itemwidth,
        	itemHeight : legend.itemheight,
//        	formatter : legend.formatter,
//        	selectedMode : legend.selectedmode == "true" ? true : false,
        	inactiveColor : legend.inactivecolor,
//        	tooltip : legend.tooltip,
            backgroundColor : legend.backgroundcolor,
            borderColor : legend.bordercolor,
            borderWidth : legend.borderwidth,
//            borderRadius : legend.borderradius,
//            animation : legend.animation == "true" ? true : false,
            interval: legend.interval,
            intervalnumber: legend.intervalnumber,
	};
	return result;
}

//option数据(series样式)
function transferSeriesItemStyle(echartsLabel) {
	var itemStyles = {
			normal : {
				label:{
					show: echartsLabel.show_label,
					position: echartsLabel.position,
					formatter: echartsLabel.formatter
				}
			}
	};
	return itemStyles;
}