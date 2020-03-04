<template>
<div class="currentBatch">
    <el-row>
        <el-col :span="8">
            <VeLine :data="chartdata" :extend="chartExtend"></VeLine>
        </el-col>
        <el-col :span="16">dwe</el-col>
    </el-row>
</div>
</template>

<script>
import VeLine from 'v-charts/lib/histogram.common'
export default {
    components: {
        VeLine
    },
    data() {
        return {
            chartdata: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [{
                        '日期': '挂起',
                        '访问用户': 1393,
                        '下单用户': 1093,
                        '下单率': 0.32
                    },
                    {
                        '日期': '等待',
                        '访问用户': 3530,
                        '下单用户': 3230,
                        '下单率': 0.26
                    },
                    {
                        '日期': '运行',
                        '访问用户': 2923,
                        '下单用户': 2623,
                        '下单率': 0.76
                    },
                    {
                        '日期': '暂停',
                        '访问用户': 1723,
                        '下单用户': 1423,
                        '下单率': 0.49
                    },
                    {
                        '日期': '错误',
                        '访问用户': 3792,
                        '下单用户': 3492,
                        '下单率': 0.323
                    },
                    {
                        '日期': '完成',
                        '访问用户': 4593,
                        '下单用户': 4293,
                        '下单率': 0.78
                    }
                ]
            },
            valueTime: '',
            chartExtend: {
                series: {
                    //柱子宽度
                    barWidth: 10
                }
            }
        };
    }
};
</script>

<style scoped>
</style>
