//柱状折线混合图-简单
export function drawBlSimpleChart(result, data) {
    var series1Name = data.series1Name;
    var series1Data = data.series1Data;
    var series2Name = data.series2Name;
    var series2Data = data.series2Data;
    result.legendStyle.data.push(series1Name);
    result.legendStyle.data.push(series2Name);
    var yAxis = Object.assign({}, {
        type: 'value',
        nameTextStyle: result.nameTextStyle,
        axisLine: result.yaxisLine,
        axisLabel: result.yaxisLabel,
    }, result.yAxis);
    var option = {
        backgroundColor: result.background,
        title: result.titles,
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: Object.assign({}, result.legendStyle, {
            data: data.legend_data
        }),
        xAxis: [
            Object.assign({}, {
                type: 'category',
                data: data.xAxisData,
                nameTextStyle: result.nameTextStyle,
                axisLine: result.xaxisLine,
                axisLabel: result.xaxisLabel,
            }, result.xAxis,)
        ],
        yAxis: [yAxis, yAxis],
        series: [{
            name: series1Name,
            type: 'bar',
            yAxisIndex: 0,
            data: series1Data,
            itemStyle: {
                label: result.labelOption.label,

            },
        },
            {
                name: series2Name,
                type: 'line',
                yAxisIndex: 1,
                data: series2Data,
                itemStyle: {
                    label: result.labelOption.label,
                },
            }
        ]
    };
    return option;
}