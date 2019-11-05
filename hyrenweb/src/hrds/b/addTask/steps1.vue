<template>
  <div class="singlesearch">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="单表查询" name="first">
        <div id="singleTable">
          <div class="rightSearch">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </div>
          <div>
            <el-table
              ref="filterTable"
              stripe
              :default-sort="{prop: 'date', order: 'descending'}"
              style="width: 100%"
              height="350"
              border
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column prop="tableName" label="表名" width="180">
                <template>
                  <span>表名</span>
                </template>
              </el-table-column>
              <el-table-column prop="tableChName" label="表中文名" width="180">
                <template>
                  <el-input v-model="input" placeholder="中文名"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="parallelExtraction" label=" 是否并行抽取" width="180">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked" @change="checkedFun"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="sqlFiltering" label="SQL过滤" width="180">
                <template slot-scope="scope">
                  <el-button size="mini" @click="Sqlfilt(scope.$index, scope.row)">定义过滤</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="selectCol" label="选择列">
                <template slot-scope="scope">
                  <el-button size="mini" @click="selectCol(scope.$index, scope.row)">选择列</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 200, 300, 400]"
              :page-size="3"
              layout="total, sizes, prev, pager, next, jumper"
              :total="5"
            ></el-pagination>
          </div>
          <!-- 是否并行抽取弹层 -->
          <el-dialog title="定义分页抽取SQL" :visible.sync="dialogTableVisible" width="50%">
            <el-button type="text">测试</el-button>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 定义过滤弹层 -->
          <el-dialog title="自定义SQL过滤设置" :visible.sync="dialogTableSqlFilt" width="50%">
            <el-button type="text">测试</el-button>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableSqlFilt = false">取 消</el-button>
              <el-button type="primary" @click="dialogTableSqlFilt = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="使用SQL抽取数据" name="second">
          <div>使用SQL抽取数据</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
       data:[],
      currentPage: 1,
      pagesize:2,
      search: "",
      input:"",
      dialogTableVisible: false,
      dialogTableSqlFilt:false,
      tableData: [
        {
          tableName: "name",
          tableChName: "京津冀",
          parallelExtraction: "true",
          sqlFiltering: "true",
          selectCol: "true"
        },
        {
          tableName: "name",
          tableChName: "京津冀",
          parallelExtraction: "true",
          sqlFiltering: "true",
          selectCol: "true"
        },
         {
          tableName: "name",
          tableChName: "京津冀",
          parallelExtraction: "true",
          sqlFiltering: "true",
          selectCol: "true"
        },
         {
          tableName: "name",
          tableChName: "京津冀",
          parallelExtraction: "true",
          sqlFiltering: "true",
          selectCol: "true"
        },
         {
          tableName: "name",
          tableChName: "京津冀",
          parallelExtraction: "true",
          sqlFiltering: "true",
          selectCol: "true"
        }
      ]
    };
  },
   methods: {
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    Sqlfilt(value, row) {
      console.log(value, row);
      this.dialogTableSqlFilt=true
    },
    checkedFun(e){
      if(e){
        this.dialogTableVisible=true
      }
    },
    selectCol(value, row) {
      console.log(value, row);
    },
    ParallelExtraction(value, row){
      console.log(value, row);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>
<style scoped>
.singlesearch >>> .el-tabs__content {
  overflow: visible !important;
}
#singleTable {
  position: relative;
}
.rightSearch {
  width: 20%;
  position: absolute;
  top: -49px;
  right: 0;
}
.el-pagination{
      text-align: center;
    margin-top: 6px;
}
</style>