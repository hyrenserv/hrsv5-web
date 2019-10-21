<template>
<div>
    <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="date" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column>
    </el-table>
    <p>
        在列中设置
        <code>sortable</code>属性即可实现以该列为基准的排序，接受一个
        <code>Boolean</code>，默认为
        <code>false</code>。可以通过 Table 的
        <code>default-sort</code>属性设置默认的排序列和排序顺序。可以使用
        <code>sort-method</code>或者
        <code>sort-by</code>使用自定义的排序规则。如果需要后端排序，需将
        <code>sortable</code>设置为
        <code>custom</code>，同时在 Table 上监听
        <code>sort-change</code>事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。在本例中，我们还使用了
        <code>formatter</code>属性，它用于格式化指定列的值，接受一个
        <code>Function</code>，会传入两个参数：
        <code>row</code>和
        <code>column</code>，可以根据自己的需求进行处理。
    </p>
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
                        <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                            <el-table-column prop="date" label="日期" sortable width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" sortable width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="地址" :formatter="formatter">
                            </el-table-column>
                        </el-table>
                    </div>
                  </template>
            `,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }

</script>
