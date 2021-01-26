//标准散点图
export function drawScatterChart(result, data) {
    var option = {
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
        xAxis: [
            Object.assign({}, {
                nameTextStyle: result.nameTextStyle,
                axisLine: result.xaxisLine,
                axisLabel: result.xaxisLabel,
            }, result.xAxis)
        ],
        yAxis: Object.assign({}, {
            nameTextStyle: result.nameTextStyle,
            axisLine: result.yaxisLine,
            axisLabel: result.yaxisLabel,
        }, result.yAxis),
        series: [{
            data: data.scatterData,
            label: result.labelOption.label,
            type: 'scatter'
        }]
    };
    return option;
}