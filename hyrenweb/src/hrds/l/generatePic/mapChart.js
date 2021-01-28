// 地理坐标/地图
export function drawMapChart(result,data,seriesStyle) {
    result.labelOption.label.emphasis={show:true}
    var pName = "";
    if (seriesStyle.provincename == "全国") {
        pName = "china";
    } else {
        pName = seriesStyle.provincename;
    }
    var splitList = [];
    for (var i = 0; i < result.legendStyle.intervalnumber; i++) {
        if (i == 0) {
            splitList.push({
                start: 0,
                end: result.legendStyle.interval
            });
        } else {
            splitList.push({
                start: result.legendStyle.interval * i,
                end: result.legendStyle.interval * (i + 1)
            });
        }
    }
    let option = {
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
            show: result.legendStyle.show == '1' ? true : false,
            left: result.legendStyle.left,
            top: result.legendStyle.top,
            right: result.legendStyle.right,
            bottom: result.legendStyle.bottom,
            orient: result.legendStyle.orient,
            align: result.legendStyle.align,
            padding: result.legendStyle.padding,
            itemGap: result.legendStyle.itemGap,
            itemWidth: result.legendStyle.itemWidth,
            itemHeight: result.legendStyle.itemHeight,
            borderColor: result.legendStyle.borderColor,
            borderWidth: result.legendStyle.borderWidth,
            splitList: splitList,
        },
        series: [{
            type: 'map',
            mapType: pName,
            selectedMode: 'multiple',
            label: result.labelOption.label,
            roam: true,
            data: data.seriesData, //数据
        },]
    };
    return option;
}