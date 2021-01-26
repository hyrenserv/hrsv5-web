//饼图
export function drawPieChart(result, data) {
    //https://echarts.apache.org/examples/zh/editor.html?c=pie-rich-text
    data.seriesArray.forEach(val => {
        val.label = result.labelOption.label;
        val.labelLine=result.labelOption.labelLine;
            
    })
    var option = {
        backgroundColor: result.background,
        title: result.titles,
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true}
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            confine:true
        },
        legend: Object.assign({}, result.legendStyle, {
            data: data.legendData
        }),
        graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
                text: data.count,
                textAlign: 'center',
                fill: '#000',
                width: 30,
                height: 30
            }
        },
        calculable: true,
        series: data.seriesArray
    }
    return option;
}