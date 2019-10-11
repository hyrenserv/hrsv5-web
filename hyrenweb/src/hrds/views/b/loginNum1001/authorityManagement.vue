<template>
  <div class="dataManage">
    <i class="block_icon fa text-warning fa-users blue"></i>
    <span>数据权限管理</span>
    <div class="lines"></div>
    <!-- 表格 -->
    <el-table
      :data="tableDataEnd"
      border
      :header-cell-style="{background:'#ede7f3',color:'black'}"
      size="mini"
      stripe
    >
      <el-table-column prop="date" label="序号" width="64" align="center"></el-table-column>
      <el-table-column prop="name" label="数据源名称" width="592" align="center"></el-table-column>
      <el-table-column prop="address" label="所属部门" width="380" align="center"></el-table-column>
      <!-- 点击操作弹出框 -->

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <b @click="dialogVisible = true;handleEdit(scope.$index, scope.row);departmentInfo()">编辑</b>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-dialog title="更改部门" :visible.sync="dialogVisible" width="53%" class="elDialog">
        数据源
        <el-input v-model="input" placeholder="请确认项目" style="width:200px" disabled class="elInput"></el-input>所属部门
        <el-select v-model="value1" placeholder="请选择部门（可多选）" multiple style="width:200px">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.dep_name"
            :value="item.dep_id"
          ></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini" type="danger">取 消</el-button>
          <el-button type="primary" size="mini">保 存</el-button>
        </span>
      </el-dialog>
    </el-row>
<!-- 分页内容 -->
    <el-row class="pagination">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout=" prev, pager, next"
        :total="totalItems"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import * as functionAll from "@/hrds/api/b/loginNum1001/loginNum1001";

export default {
  data() {
    return {
      dialogVisible: false,
      input: "",
      tableDataBegin: [
        {
          date: "2016",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016",
          name: "王小虎h",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ],
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      options: [],
      value1: []
    };
  },
 
  created() {
     // 获取数组长度赋值
    this.totalItems = this.tableDataBegin.length;
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index]);
      }
    } else {
      this.tableDataEnd = this.tableDataBegin;
    }
  },
  methods: {
    // 编辑获取当前数据
    handleEdit(index, row) {
      this.input = row.name;
    },
    // 点击添加按钮获取部门信息
    departmentInfo() {
      functionAll.getDepartmentInfo().then(res => {
        if (res.code == 200) {
          this.options = res.data.departmentInfo;
        }
      });
    },
    // 实现分页功能
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataBegin);
      } else {
        this.currentChangePage(this.filterTableDataEnd);
      }
    },
    //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    }
  }
};
</script>

<style scoped>
.dataManage {
  margin-top: 26px;
  margin-bottom: 10px;
  color: #61c3fa;
}
.dataManage span {
  color: #2196f3;
  font-size: 18px;
}
.dataManage b {
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  color: red;
}
.lines {
  margin-top: 10px;
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-bottom: 15px;
}
/* 小图标样式 */
.fa-users {
  margin-right: 5px;
  color: #2196f3;
}
/* 分页 */
.pagination {
  margin-top: 20px;
  width: 100%;
}
.el-pagination {
  float: right;
}
/* 弹出框input的样式 */
.elDialog .el-input {
  margin-left: 20px;
}
.elDialog .el-select {
  margin-left: 20px;
}
.elDialog .elInput {
  margin-right: 88px;
}
</style>