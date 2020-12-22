// 矩形树图
export  function  drawTreeMapChart(result,data,echartsLabel,auto_comp_sum) {
    var option = {
        backgroundColor: auto_comp_sum.background,
        title: result.titles,
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}",
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
        calculable: false,
        series: [{
            name: auto_comp_sum.chart_type,
            type: 'treemap',
            leafDepth: undefined,
            breadcrumb: {
                show: false,
            },
            itemStyle: {
                normal: {
                    label: {
                        show: echartsLabel.show_label,
                        position: echartsLabel.position,
                        formatter: echartsLabel.formatter,
                    },
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: data.seriesData
        }]
    };
    return option;
}