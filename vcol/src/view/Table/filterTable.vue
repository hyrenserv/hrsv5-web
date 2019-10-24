<template>
  <div>
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
      height="350"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
        fixed="left"
      ></el-table-column>
      <el-table-column prop="name"  label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter" show-overflow-tooltip></el-table-column>
     <!--  <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column> -->
        <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
    <p>
      <strong>带斑马纹:</strong><code>stripe</code>属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。
    </p>
    <p><strong>边框:</strong>
      默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以在el-table加
      <code>border</code>属性，它接受一个Boolean，设置为true即可启用。
    </p>
    <p><strong>固定表头:</strong>
      只要在el-table元素中定义了
      <code>height</code>属性，即可实现固定表头的表格，而不需要额外的代码。
    </p>
    <p><strong>固定列:</strong>
      固定列需要在el-table-column加
      <code>fixed</code>属性，它接受 Boolean 值或者left,right，表示左边固定还是右边固定。
    </p>
    <p><strong>排序列:</strong>
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
    <p><strong>多选:</strong>
    手动添加一个
      <code>el-table-column</code>，设
      <code>type</code>属性为
      <code>selection</code>即可；默认情况下若内容过多会折行显示，若需要单行显示可以使用
      <code>show-overflow-tooltip</code>属性，它接受一个
      <code>Boolean</code>，为
      <code>true</code>时多余的内容会在 hover 时以 tooltip 的形式显示出来。
    </p>
    <p><strong>筛选:</strong>在列中设置 <code>filtersfilter-method </code>属性即可开启该列的筛选，filters 是一个数组，filter-method是一个方法，它用于决定某些数据是否显示，会传入三个参数：value, row 和 column。</p>
     <p><strong>分页:</strong>使用了<code>size-change</code>和<code>current-change</code>事件来处理页码大小和当前页变动时候触发的事件。<code>jumper</code> 属性来进行自行输入页码跳转</p>
    <el-collapse>
      <el-collapse-item title="显示代码" name="1">
        <el-input
          type="textarea"
          :autosize="{ minRows: 25, maxRows: 4}"
          readonly
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
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
       currentPage: 1,
       search : '',
      textarea2: `
                <template>
                    <div>
                          <el-button @click="resetDateFilter">清除日期过滤器</el-button>
                          <el-button @click="clearFilter">清除所有过滤器</el-button>
                          <el-table
                            ref="filterTable"
                            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                             stripe
                            :default-sort="{prop: 'date', order: 'descending'}"
                            style="width: 100%"
                          >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column
                              prop="date"
                              label="日期"
                              sortable
                              width="180"
                              column-key="date"
                              :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                              :filter-method="filterHandler"
                            ></el-table-column>
                            <el-table-column prop="name"  label="姓名" width="180"></el-table-column>
                            <el-table-column prop="address" label="地址" :formatter="formatter" show-overflow-tooltip></el-table-column>
                               <el-table-column
                                  align="right">
                                  <template slot="header" slot-scope="scope">
                                    <el-input
                                      v-model="search"
                                      size="mini"
                                      placeholder="输入关键字搜索"/>
                                  </template>
                                  <template slot-scope="scope">
                                    <el-button
                                      size="mini"
                                      @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                    <el-button
                                      size="mini"
                                      type="danger"
                                      @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                                  </template>
                                </el-table-column>
                                </el-table>
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="400">
                                </el-pagination>
                          </el-table>
                    </div>
                    <script>
                    export default {
                      data() {
                        return {
                            currentPage: 1,
                             search : '',
                          tableData: [
                            {
                              date: "2016-05-02",
                              name: "王小虎",
                              address: "上海市普陀区金沙江路 1518 弄",
                              tag: "家"
                            },
                            {
                              date: "2016-05-04",
                              name: "王小虎",
                              address: "上海市普陀区金沙江路 1517 弄",
                              tag: "公司"
                            },
                            {
                              date: "2016-05-01",
                              name: "王小虎",
                              address: "上海市普陀区金沙江路 1519 弄",
                              tag: "家"
                            },
                            {
                              date: "2016-05-03",
                              name: "王小虎",
                              address: "上海市普陀区金沙江路 1516 弄",
                              tag: "公司"
                            }
                          ]
                        };
                      },
                      methods: {
                        resetDateFilter() {
                          this.$refs.filterTable.clearFilter("date");
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
                          const property = column["property"];
                          return row[property] === value;
                        },
                        handleSizeChange(val) {
                            console.log(每页\${val} 条);
                        },
                        handleCurrentChange(val) {
                            console.log(当前页:\${val});
                        }
                      }
                    };
                    <|/script>

                  </template>
            `,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎222",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎333",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          name: "王小虎4444",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        {
          date: "2016-05-03",
          name: "王小虎555",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        }
      ]
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
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
      const property = column["property"];
      return row[property] === value;
    },
    handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
  }
};
</script>
