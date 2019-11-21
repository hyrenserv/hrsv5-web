<template>
  <div class="singlesearch" id="singleTable">
    <Step :active="active"></Step>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="单表查询" name="first">
        <div id="singleTable">
          <div class="rightSearch">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </div>
          <div>
            <el-table
              ref="filterTable"
              size="medium"
              stripe
              :default-sort="{prop: 'date', order: 'descending'}"
              style="width: 100%"
              height="360"
              border
              :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" align="center" width="60">
                <template scope="scope">
                  <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="tableName" label="表名" width="180" align="center">
                <template>
                  <span>表名</span>
                </template>
              </el-table-column>
              <el-table-column prop="tableChName" label="表中文名" width="180" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.tableChName" placeholder="中文名"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="parallelExtraction" label=" 是否并行抽取" width="180" align="center">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked" @change="checkedFun"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="sqlFiltering" label="SQL过滤" width="180" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="Sqlfilt(scope.$index, scope.row)"
                    type="success"
                  >定义过滤</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="selectCol" label="选择列" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="selectCol(scope.$index, scope.row)" type="info">选择列</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="sig_handleSizeChange"
              @current-change="sig_handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            ></el-pagination>
          </div>
          <!-- 是否并行抽取弹层 -->
          <el-dialog title="定义分页抽取SQL" :visible.sync="dialogTableVisible" width="50%">
            <el-button type="text">测试</el-button>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false" type="danger" size="mini">取 消</el-button>
              <el-button @click="dialogTableVisible = false" type="primary" size="mini">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 定义过滤弹层 -->
          <el-dialog title="自定义SQL过滤设置" :visible.sync="dialogTableSqlFilt" width="50%">
            <el-form :model="sqlFiltSetData" ref="addClassTask">
              <el-row type="flex">
                <el-col :span="10">
                  <el-form-item label=" 表名:" prop="table_name" class="bordernone">
                    <el-input v-model="sqlFiltSetData.table_name" style="width:150px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label=" 变量名" prop="Variable_name">
                    <el-select
                      placeholder="变量名"
                      v-model="sqlFiltSetData.Variable_name"
                      style="width:150px"
                    >
                      <el-option label="ad" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="24">
                  <el-form-item prop="table_des">
                    <el-input v-model="sqlFiltSetData.table_des" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableSqlFilt = false" type="danger" size="mini">取 消</el-button>
              <el-button type="primary" @click="dialogTableSqlFilt = false" size="mini">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 选择列弹层 -->
          <el-dialog title="选择列" :visible.sync="dialogSelectColumn" width="50%">
            <el-table
              :data="SelectColumnData"
              border
              size="medium"
              highlight-current-row
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                property="SelectCol"
                type="selection"
                label="选择列"
                width="60px"
                align="center"
              ></el-table-column>
              <el-table-column property="SelectCol_name" label="列名" align="center" width="150px"></el-table-column>
              <el-table-column property="SelectCol_type" label="字段类型" width="100px" align="center"></el-table-column>
              <el-table-column property="SelectCol_chname" label="列中文名" align="center">
                <template>
                  <el-input v-model="input2" placeholder="中文名"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="160px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :disabled="scope.$index===0"
                    @click="moveUp(scope.$index,scope.row,SelectColumnData)"
                  >
                    <i class="el-icon-arrow-up"></i>
                  </el-button>
                  <el-button
                    size="mini"
                    :disabled="scope.$index===(SelectColumnData.length-1)"
                    @click="moveDown(scope.$index,scope.row,SelectColumnData)"
                  >
                    <i class="el-icon-arrow-down"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogSelectColumn = false" type="danger" size="mini">取 消</el-button>
              <el-button type="primary" @click="dialogSelectColumn = false" size="mini">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="使用SQL抽取数据" name="second">
        <el-button
          type="success"
          style="margin:0 0 5px 0"
          class="addline"
          @click="addRow(sqlExtractData)"
          size="mini"
        >新增行</el-button>
        <el-table
          :data="sqlExtractData.slice((sqlexcurrentPage - 1) * sqlexpagesize, sqlexcurrentPage * sqlexpagesize)"
          border
          size="medium"
          highlight-current-row
          @current-change="handleSelectionChange"
        >
          <el-table-column property label="序号" width="60px" align="center">
            <template scope="scope">
              <span>{{scope.$index+(sqlexcurrentPage - 1) * sqlexpagesize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column property="sqlExtractData_name" label="表名" width="150px" align="center">
            <template scope="scope">
              <el-input v-model="scope.row.sqlExtractData_name" placeholder="表名"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="sqlExtractData_chname"
            label="表中文名"
            width="150px"
            align="center"
          >
            <template scope="scope">
              <el-input v-model="scope.row.sqlExtractData_chname" placeholder="表中文名"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="sqlExtractData_sql" label="查询SQL语句" align="center">
            <template scope="scope">
              <el-input
                v-model="scope.row.sqlExtractData_sql"
                type="textarea"
                placeholder="查询SQL语句"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" align="center">
            <template scope="scope">
              <el-row>
                <el-col :span="24" class="delbtn">
                  <el-button
                    style="color:red"
                    type="text"
                    circle
                    @click="DelRowFun(scope.$index, sqlExtractData)"
                  >删除</el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sqlex_handleSizeChange"
          @current-change="sqlex_handleCurrentChange"
          :current-page.sync="sqlexcurrentPage"
          :page-size="sqlexpagesize"
          layout="total, prev, pager, next"
          :total="sqlExtractData.length"
          class="locationcenter"
        ></el-pagination>
        <div class="locationright">
          <el-button size="medium" type="danger">取 消</el-button>
          <el-button size="medium" type="primary">确定</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">下一步</el-button>
  </div>
</template>
<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import Step from "./step";
export default {
  components: {
    Step
  },
  data() {
    return {
      active: 1,
      activeName: "first",
      data: [],
      currentPage: 1,
      pagesize: 10,
      sqlexcurrentPage: 1,
      sqlexpagesize: 5,
      search: "",
      input: "",
      input2: "",
      dialogTableVisible: false,
      dialogTableSqlFilt: false,
      dialogSelectColumn: false,
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
        },
        {
          tableName: "name",
          tableChName: "京津冀",
          parallelExtraction: "true",
          sqlFiltering: "true",
          selectCol: "true"
        }
      ],
      sqlFiltSetData: {
        table_name: "",
        Variable_name: "",
        table_des: ""
      },
      SelectColumnData: [
        {
          SelectCol_name: "name1",
          SelectCol_type: "京津冀",
          SelectCol_chname: "true"
        },
        {
          SelectCol_name: "name2",
          SelectCol_type: "京津冀",
          SelectCol_chname: "true"
        },
        {
          SelectCol_name: "name3",
          SelectCol_type: "京津冀",
          SelectCol_chname: "true"
        },
        {
          SelectCol_name: "name4",
          SelectCol_type: "京津冀",
          SelectCol_chname: "true"
        },
        {
          SelectCol_name: "name5",
          SelectCol_type: "京津冀",
          SelectCol_chname: "true"
        },
        {
          SelectCol_name: "name6",
          SelectCol_type: "京津冀",
          SelectCol_chname: "true"
        }
      ],
      multipleSelection: [],
      sqlExtractData: [
        {
          sqlExtractData_name: "name1",
          sqlExtractData_chname: "京津冀",
          sqlExtractData_sql: "true"
        },
        {
          sqlExtractData_name: "name1",
          sqlExtractData_chname: "京津冀",
          sqlExtractData_sql: "true"
        },
        {
          sqlExtractData_name: "name1",
          sqlExtractData_chname: "京津冀",
          sqlExtractData_sql: "true"
        }
      ],
      dbid: null,
      aId: null,
      sourId: null,
      sName: null
    };
  },
  created() {
      this.dbid = this.$route.query.id;
      this.aId = this.$route.query.aId;
      this.sourId = this.$route.query.sourId;
      this.sName = this.$route.query.sName;
  },
  methods: {
    next() {
       let data={}
      if(this.$route.query.edit=='yes'){
         data={
          aId: this.$route.query.aId,
          id: this.$route.query.id,
          sourId:this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit:'yes'
        }
      }
      else{
         data={
          aId: this.$route.query.agent_id,
        }
      }
      this.$router.push({
        path: "/dbaddTasksteps03",
        query:data
      });
    },
    pre() {
          let data={}
      if(this.$route.query.edit=='yes'){
         data={
          aId: this.$route.query.aId,
          id: this.$route.query.id,
          sourId:this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit:'yes'
        }
      }
      else{
         data={
           aId: this.$route.query.agent_id,
        }
      }
      this.$router.push({
        path: "/dbaddTasksteps01",
        query:data
      });
    },
    Sqlfilt(value, row) {
      console.log(value, row);
      this.dialogTableSqlFilt = true;
    },
    checkedFun(e) {
      if (e) {
        this.dialogTableVisible = true;
      }
    },
    selectCol(value, row) {
      this.dialogSelectColumn = true;
      console.log(value, row);
    },
    ParallelExtraction(value, row) {
      console.log(value, row);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    sig_handleSizeChange(size) {
      this.pagesize = size;
    },
    sig_handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    sqlex_handleSizeChange(size) {
      this.sqlexpagesize = size;
    },
    sqlex_handleCurrentChange(currentPage) {
      this.sqlexcurrentPage = currentPage;
    },
    //选择复选框数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //上移
    moveUp(index, row, tableData) {
      if (index > 0) {
        let upDate = tableData[index - 1];
        tableData.splice(index - 1, 1);
        tableData.splice(index, 0, upDate);
      } else {
        alert("已经是第一条，不可上移");
      }
    },

    //下移
    moveDown(index, row, tableData) {
      if (index + 1 === tableData.length) {
        alert("已经是最后一条，不可下移");
      } else {
        let downDate = tableData[index + 1];
        tableData.splice(index + 1, 1);
        tableData.splice(index, 0, downDate);
      }
    },
    //删除
    DelRowFun(index, rows) {
      rows.splice(index, 1);
    },
    //新增行
    addRow(tableData, event) {
      tableData.push({
        sqlExtractData_name: "",
        sqlExtractData_chname: "",
        sqlExtractData_sql: ""
      });
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
#singleTable >>> .el-pagination {
  text-align: center;
  margin-top: 6px;
}
#singleTable >>> .el-table__header tr,
#singleTable >>> .el-table__header th {
  padding: 0;
  height: 40px;
}
#singleTable >>> .el-table__body tr,
#singleTable >>> .el-table__body td {
  padding: 0;
  height: 40px;
}
#singleTable >>> .el-input__inner {
  height: 30px;
}
#singleTable >>> .el-textarea__inner {
  height: 30px;
}
.locationcenter {
  text-align: center;
  margin-top: 5px;
}
.locationright {
  text-align: right;
}
.leftbtn {
  margin-top: 12px;
  margin-top: 12px;
  float: left;
  margin: 15px;
  margin-bottom: 10px;
}
.rightbtn {
  margin-top: 12px;
  margin-top: 12px;
  float: right;
  margin: 15px;
  margin-bottom: 10px;
}
</style>