//极坐标柱状图
export function drawPolarBarChart(result,data) {
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
        radiusAxis: [
            Object.assign({}, {
                type: 'category',
                data: data.xArray,
                nameTextStyle: result.nameTextStyle,
                axisLine: result.xaxisLine,
                axisLabel: result.xaxisLabel,
            }, result.xAxis)
        ],
        polar: {},
        angleAxis: Object.assign({}, {
            nameTextStyle: result.nameTextStyle,
            axisLine: result.yaxisLine,
            axisLabel: result.yaxisLabel,
        }, result.yAxis),
        series: data.seriesArray
    }
    return option;
}