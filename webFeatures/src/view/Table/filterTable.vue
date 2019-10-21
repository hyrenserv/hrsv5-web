<template>
<div>
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" sortable width="180" column-key="date" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag" filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
        </el-table-column>
    </el-table>
    <p>在列中设置<code>sortable</code>属性即可实现以该列为基准的排序，接受一个<code>Boolean</code>，默认为<code>false</code>。可以通过 Table 的<code>default-sort</code>属性设置默认的排序列和排序顺序。可以使用<code>sort-method</code>或者<code>sort-by</code>使用自定义的排序规则。如果需要后端排序，需将<code>sortable</code>设置为<code>custom</code>，同时在 Table 上监听<code>sort-change</code>事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。在本例中，我们还使用了<code>formatter</code>属性，它用于格式化指定列的值，接受一个<code>Function</code>，会传入两个参数：<code>row</code>和<code>column</code>，可以根据自己的需求进行处理。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
    export default {
        methods: {
            handleClick(row) {
                console.log(row);
            }
        },
        data() {
            return {
                textarea2: `
                <template>
                    <div>
                        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
                        <el-button @click="clearFilter">清除所有过滤器</el-button>
                        <el-table ref="filterTable" :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="日期" sortable width="180" column-key="date" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" :filter-method="filterHandler">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="地址" :formatter="formatter">
                            </el-table-column>
                            <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag" filter-placement="bottom-end">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                  </template>
            `,
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
    };
  },
  methods: {
    resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
  }
};
</script>
