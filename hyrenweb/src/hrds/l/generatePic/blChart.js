// 柱状折线混合图
export function drawBlChart(result, data) {
    let option = {
        backgroundColor: result.background,
        title: result.titles,
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {
                    show: true,
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        legend: Object.assign({}, result.legendStyle, {
            data: data.legend_data
        }),
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
    return option;
}