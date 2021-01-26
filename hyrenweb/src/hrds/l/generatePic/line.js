//折线图
export function  drawLine(result,data) {
    //https://echarts.apache.org/examples/zh/editor.html?c=area-stack
    data.seriesArray.forEach(val => {
        val.label = result.labelOption.label;
    })
    let option = {
        backgroundColor: result.background,
        title: result.titles,
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        legend: Object.assign({}, result.legendStyle, {
            data: data.legend_data
        }),
        grid: {
            left: '5%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            Object.assign({}, {
                type: 'category',
                boundaryGap: false,
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
    return option;
}