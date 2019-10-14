<template>
  <div class="dataManage">
    <i class="block_icon fa text-warning fa-users blue"></i>
    <span>数据权限管理</span>
    <div class="lines"></div>
    <!-- 表格 -->
    <el-table
      :data="data"
      border
      :header-cell-style="{background:'#ede7f3',color:'black'}"
      size="mini"
      stripe
    >
      <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>
      <el-table-column prop="datasource_name" label="数据源名称" width="592" align="center"></el-table-column>
      <el-table-column prop="dep_name" label="所属部门" width="380" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <b
            @click="dialogFormVisibleAdd = true;handleEdit(scope.$index, scope.row);departmentInfo()"
          >编辑</b>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <!-- 点击操作弹出框 -->
      <el-dialog title="更改部门" :visible.sync="dialogFormVisibleAdd" width="40%">
        <el-form :model="formAdd" ref="formAdd">
          <el-form-item label=" 数据源名称" :label-width="formLabelWidth" prop="datasource_name">
            <el-input
              v-model="formAdd.datasource_name"
              autocomplete="off"
              placeholder="数据源名称"
              style="width:284px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="depIds">
            <el-select
              v-model="depIds"
              filterable
              placeholder="请选择（可多选）"
              multiple
              style="width:284px"
            >
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.dep_name"
                :value="item.dep_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="danger" @click="cancleAdd">取 消</el-button>
          <el-button type="primary" @click="saveChangeAgent" size="mini">保存</el-button>
        </div>
      </el-dialog>
    </el-row>
    <!-- 分页内容 -->
    <!-- <el-row class="pagination">
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
    </el-row>-->
  </div>
</template>

<script>
import * as functionAll from "@/hrds/api/b/loginNum1001/loginNum1001";

export default {
  props: ["data"],
  data() {
    return {
      dialogVisible: false,
      dialogFormVisibleAdd: false,
      formAdd: {},
      formLabelWidth: "150px",
      input: "",
      tableDataBegin: [],
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      options: [],
      value1: [],
      sourceId: "",
      depIds: []
    };
  },

  created() {
    // 获取数组长度赋值
    this.totalItems = this.data.length;
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.data[index]);
      }
    } else {
      this.tableDataEnd = this.data;
    }
  },

  methods: {
    // 编辑获取当前数据
    handleEdit(index, row) {
      this.formAdd.datasource_name = row.datasource_name;
      this.sourceId = row.source_id;
    },
    // 数据权限管理，更新数据源关系部门信息
    saveChangeAgent() {
      this.formAdd["depIds"] = this.depIds.join(",");
      this.formAdd["sourceId"] = this.sourceId;
      functionAll.upDatechargeDate(this.formAdd).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "更改成功!"
          });
          this.$emit("addEvent");
          // 隐藏对话框
          this.dialogFormVisibleAdd = false;
          // 表单清空
          this.formAdd = {};
        } else {
          this.$message.error("更改失败！");
        }
      });
    },
    // 点击添加按钮获取部门信息
    departmentInfo() {
      const querystring = require("querystring");
      functionAll
        .getDataDepInfo(querystring.stringify({ sourceId: this.sourceId }))
        .then(res => {
          if (res.code == 200) {
            this.options = res.data.departmentInfo;
          }
        });
    },
    // 点击取消按钮
    cancleAdd() {
      // 表单清空
      this.formAdd = {};
      // 隐藏对话框
      this.dialogFormVisibleAdd = false;
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