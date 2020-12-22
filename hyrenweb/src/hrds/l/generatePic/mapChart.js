// 地理坐标/地图
export function drawMapChart(result, data,seriesStyle) {
    var result = {};
    var legendStyle = result.legendStyle;
    var pName = "";
    if (seriesStyle.provincename == "全国") {
        pName = "china";
    } else {
        pName = seriesStyle.provincename;
    }
    var splitList = [];
    for (var i = 0; i < legendStyle.intervalnumber; i++) {
        if (i == 0) {
            splitList.push({
                start: 0,
                end: legendStyle.interval
            });
        } else {
            splitList.push({
                start: legendStyle.interval * i,
                end: legendStyle.interval * (i + 1)
            });
        }
    }

    var option = {
        backgroundColor: result.background,
        title: result.titles,
        tooltip: {
            formatter: '{b}:{c}',
        },
        toolbox: {
            show: true,
            feature: {
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        //小导航图标
        visualMap: {
            show: legendStyle.show == '1' ? true : false,
            left: legendStyle.left,
            top: legendStyle.top,
            right: legendStyle.right,
            bottom: legendStyle.bottom,
            orient: legendStyle.orient,
            align: legendStyle.align,
            padding: legendStyle.padding,
            itemGap: legendStyle.itemgap,
            itemWidth: legendStyle.itemwidth,
            itemHeight: legendStyle.itemheight,
            borderColor: legendStyle.bordercolor,
            borderWidth: legendStyle.borderwidth,
            splitList: splitList,
        },
        series: [{
            type: 'map',
            mapType: pName,
            selectedMode: 'multiple',
            label: result.labelOption,
            roam: true,
            data: data.seriesData, //数据
        },]
    };
    drawPic(option);
}