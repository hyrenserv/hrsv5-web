<template>
  <div class="singlesearch" id="singleTable">
    <Step :active="active"></Step>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="单表查询" name="first">
        <div id="singleTable">
          <div class="rightSearch">
            <el-input
              v-model="search"
              placeholder="查询表名"
              style="width: 50%;
    margin-right: 10px;"
            />
            <el-button
              size="mini"
              type="success"
              icon="el-icon-search"
              @click="schfilter(search)"
            >查询</el-button>
            <el-button size="mini" type="success" @click="getAllTableInfoFun()">查看全表</el-button>
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
              <el-table-column width="55" align="center" prop="selectionState">
                <template slot="header" slot-scope="scope">
                  <el-checkbox
                    @change="Allis_selectionStateFun(tableData,Allis_selectionState)"
                    v-model="Allis_selectionState"
                    :checked="Allis_selectionState"
                  ></el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-checkbox
                    :checked="scope.row.selectionState"
                    v-model="scope.row.selectionState"
                    @change="evercheck(scope.row.selectionState,scope.row.table_name)"
                  ></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="序号" align="center" width="60">
                <template scope="scope">
                  <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="table_name" label="表名" width="180" align="center">
                <!-- <template>
                  <span>table_name</span>
                </template>-->
              </el-table-column>
              <el-table-column prop="table_ch_name" label="表中文名" width="180" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.table_ch_name"
                    placeholder="中文名"
                    @change="changetablechnameFun(scope.row.table_ch_name,scope.row.table_name)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="is_parallel" label=" 是否并行抽取" width="180" align="center">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.is_parallel"
                    :checked="scope.row.is_parallel"
                    @change="checkedis_parallelFun(scope.row)"
                  ></el-checkbox>
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
          <el-dialog
            title
            :visible.sync="dialogTableVisible"
            width="50%"
            class="alltable"
            @close="testParallelExtractionCloseFun()"
          >
            <div slot="title" class="header-title">
              <span class="title">定义分页抽取SQL&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="title">
                表名:
                <p class="topcolumename">{{EXtable_name}}</p>
              </span>
            </div>
            <el-row type="flex" style="text-align:right;padding-right:10px;">
              <el-col :span="24">
                <el-button type="text" @click="testParallelExtractionFun('test')">测试</el-button>
              </el-col>
            </el-row>
            <el-form ref="addClassTask">
              <el-row type="flex" justify="center">
                <el-col :span="24">
                  <el-form-item prop="table_des">
                    <el-input v-model="EXtable_sql" type="textarea" class="textheight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="testParallelExtractionCloseFun()" type="danger" size="mini">取 消</el-button>
              <el-button @click="testParallelExtractionSubmitFun()" type="primary" size="mini">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 测试弹框 -->
          <el-dialog title="测试sql" :visible.sync="testDialogVisible" width="30%">
            <div class="testLinnk">
              <span>{{testLinkReturn}}</span>
            </div>
          </el-dialog>
          <!-- 定义过滤弹层 -->
          <el-dialog
            title="自定义SQL过滤设置"
            :visible.sync="dialogTableSqlFilt"
            width="50%"
            @close="SqlfiltCloseFun()"
          >
            <el-form ref="addClassTask">
              <el-row type="flex">
                <el-col :span="10">
                  <el-form-item label=" 表名: " prop="table_name" class="bordernone">
                    <span>{{sqlFiltSetData_tablename}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label=" 变量名" prop="Variable_name">
                    <el-select placeholder="变量名" v-model="sqlFiltSetData_var" style="width:150px">
                      <el-option label="ad" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="24">
                  <el-form-item prop="table_des">
                    <el-input v-model="sqlFiltSetData_SQL" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button
                @click="dialogTableSqlFilt = false;SqlfiltCloseFun()"
                type="danger"
                size="mini"
              >取 消</el-button>
              <el-button
                type="primary"
                @click="dialogTableSqlFilt = false;SqlfiltSubmitFun()"
                size="mini"
              >确 定</el-button>
            </div>
          </el-dialog>
          <!-- 选择列弹层 -->
          <el-dialog
            title="选择列"
            :visible.sync="dialogSelectColumn"
            width="70%"
            @close="SelectColumnCloseFun()"
          >
            <div slot="title" class="header-title">
              <span class="title">选择列&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span class="title">
                表名:
                <p class="topcolumename">{{coltable_name}}</p>
              </span>
            </div>
            <el-table :data="SelectColumnData" border size="medium" highlight-current-row>
              <el-table-column label="选择列" align="center" width="150px">
                <template slot="header" slot-scope="scope">
                  <el-checkbox
                    @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)"
                    v-model="Allis_SelectColumn"
                    :checked="Allis_SelectColumn"
                  ></el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column property="colume_name" label="列名" align="center" width="150px"></el-table-column>
              <el-table-column property="column_type" label="字段类型" width="150px" align="center"></el-table-column>
              <el-table-column property="colume_ch_name" label="列中文名" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.colume_ch_name" placeholder="中文名"></el-input>
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
              <el-button
                @click="dialogSelectColumn = false;SelectColumnCloseFun()"
                type="danger"
                size="mini"
              >取 消</el-button>
              <el-button
                type="primary"
                @click="dialogSelectColumn = false;SelectColumnSubmitFun()"
                size="mini"
              >确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="使用SQL抽取数据" name="second">
        <el-button
          type="success"
          style="margin:0 0 5px 0"
          class="addline"
          @click="addRow(ruleForm.sqlExtractData)"
          size="mini"
        >新增行</el-button>
        <el-form ref="ruleForm" :model="ruleForm" class="steps2">
          <el-table
            :data="ruleForm.sqlExtractData.slice((sqlexcurrentPage - 1) * sqlexpagesize, sqlexcurrentPage * sqlexpagesize)"
            border
            size="medium"
            highlight-current-row
          >
            <el-table-column property label="序号" width="60px" align="center">
              <template scope="scope">
                <span>{{scope.$index+(sqlexcurrentPage - 1) * sqlexpagesize + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column property="table_name" label="表名" width="150px" align="center">
              <template scope="scope">
                <el-form-item
                  :prop="'sqlExtractData.'+scope.$index+'.table_name'"
                  :rules="rule.default"
                >
                  <el-input v-model="scope.row.table_name" placeholder="表名"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column property="table_ch_name" label="表中文名" width="150px" align="center">
              <template scope="scope">
                <el-form-item
                  :prop="'sqlExtractData.'+scope.$index+'.table_ch_name'"
                  :rules="rule.default"
                >
                  <el-input v-model="scope.row.table_ch_name" placeholder="表中文名"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column property="sql" label="查询SQL语句" align="center">
              <template scope="scope">
                <el-form-item :prop="'sqlExtractData.'+scope.$index+'.sql'" :rules="rule.default">
                  <el-input v-model="scope.row.sql" type="textarea" placeholder="查询SQL语句"></el-input>
                </el-form-item>
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
                      @click="DelRowFun(scope.$index, ruleForm.sqlExtractData)"
                    >删除</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-pagination
          @size-change="sqlex_handleSizeChange"
          @current-change="sqlex_handleCurrentChange"
          :current-page.sync="sqlexcurrentPage"
          :page-size="sqlexpagesize"
          layout="total, prev, pager, next"
          :total="ruleForm.sqlExtractData.length"
          class="locationcenter"
        ></el-pagination>
        <div class="locationright">
          <el-button size="medium" type="danger">取 消</el-button>
          <el-button size="medium" type="primary" @click="sqlExtractDataSubmitFun('ruleForm')">确定</el-button>
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
      rule: validator.default,
      Allis_selectionState: false,
      Allis_SelectColumn: false,
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
      testDialogVisible: false,
      dialogTableSqlFilt: false,
      dialogSelectColumn: false,
      tableData: [],
      sqlFiltSetData_tablename: "",
      sqlFiltSetData_var: "",
      sqlFiltSetData_SQL: "",
      SelectColumnData: [],
      multipleSelection: [],
      ruleForm: {
        sqlExtractData: []
      },
      dbid: null,
      aId: null,
      sourId: null,
      sName: null,
      allData: [],
      callTable: [],
      EXtable_name: "",
      EXtable_sql: "",
      testLinkReturn: "",
      coltable_name: "",
      tableInfoString: [],
      collTbConfParamString: [],
      tablename: "",
      SelectColumn: [], //选择列点击过保存的值
      sqlFiltArr: [], //sql过滤点击过保存的值
      ParallelExtractionArr: [], //并行抽取数据
      ParallelExtractionLink: false,
      is_parallel: false
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
  },
  mounted() {
    // 获取进入页面的总数据
    if (this.$route.query.edit == "yes") {
      this.steps_getInitInfo();
    }
    let params = {};
    params["colSetId"] = this.dbid;
    addTaskAllFun.getAllTableInfo(params).then(res => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].table_id) {
          data[i].selectionState = true;
        } else {
          data[i].selectionState = false;
        }
        if (data[i].is_parallel != "0") {
          data[i].is_parallel = true;
        } else {
          data[i].is_parallel = false;
        }
      }
      this.allData = data;
    });
  },
  methods: {
    //编辑状态获得初始化信息
    steps_getInitInfo() {
      let params = {};
      params["colSetId"] = this.dbid;
      addTaskAllFun.steps_getInitInfo(params).then(res => {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].table_id) {
            data[i].selectionState = true;
          }
          if (data[i].is_parallel != "0") {
            data[i].is_parallel = true;
          } else {
            data[i].is_parallel = false;
          }
        }
        this.tableData = data;
        this.callTable = data;
      });
      this.Allis_selectionState = true;
    },
    // 表第一列的全选
    Allis_selectionStateFun(items, e) {
      let that = this;
      items.forEach((item, j) => {
        if (e) {
          item.selectionState = true;
          for (let i = 0; i < that.allData.length; i++) {
            if (that.allData[i].table_name == item.table_name) {
              that.allData[i].selectionState = true;
            }
          }
        } else {
          item.selectionState = false;
          for (let i = 0; i < that.allData.length; i++) {
            if (that.allData[i].table_name == item.table_name) {
              that.allData[i].selectionState = false;
            }
          }
        }
      });
    },
    // 获取所有表信息
    getAllTableInfoFun() {
      this.Allis_selectionState = false;
      this.tableData.length = 0;
      this.tableData = this.allData;
      /* let params = {};
      params["colSetId"] = this.dbid;
      addTaskAllFun.getAllTableInfo(params).then(res => {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].table_id) {
            data[i].selectionState = true;
          } else {
            data[i].selectionState = false;
          }
          if (data[i].is_parallel != "0") {
            data[i].is_parallel = true;
          } else {
            data[i].is_parallel = false;
          }
        }
        this.tableData = data;
        this.allData = data;
      }); */
    },
    // 全表点击单个复选框
    evercheck(val, name) {
      if (val == true) {
        for (let i = 0; i < this.allData.length; i++) {
          if (this.allData[i].table_name == name) {
            this.allData[i].selectionState = true;
          }
        }
      } else {
        for (let i = 0; i < this.allData.length; i++) {
          if (this.allData[i].table_name == name) {
            this.allData[i].selectionState = false;
          }
        }
        console.log(this.allData);
      }
    },
    // 搜索
    schfilter(val) {
      if (this.allData.length != 0) {
        this.tableData = this.allData.filter(
          data =>
            !val || data.table_name.toLowerCase().includes(val.toLowerCase())
        );
      } else {
        this.tableData = this.callTable.filter(
          data =>
            !val || data.table_name.toLowerCase().includes(val.toLowerCase())
        );
      }
    },
    next() {
      console.log(this.SelectColumn);
      console.log(this.sqlFiltArr);
      console.log(this.ParallelExtractionArr);
      console.log(this.tableData);
      let arrb = [],
        arrc = [];
      let params = {};
      params["colSetId"] = this.dbid;
      addTaskAllFun.getSQLInfoByColSetId(params).then(res => {
        let arr = res.data;
        for (let i = 0; i < this.tableData.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (this.tableData[i].table_id == arr[j].table_id) {
              this.tableData[i].page_sql = arr[j].page_sql;
              this.tableData[i].sql = arr[j].sql;
            }
          }
        }
        arrb = this.tableData;
        for (let j = 0; j < arrb.length; j++) {
          for (let jj = 0; jj < this.ParallelExtractionArr.length; jj++) {
            if (
              arrb[j].table_name == this.ParallelExtractionArr[jj].tablename
            ) {
              arrb[j].page_sql = this.ParallelExtractionArr[jj].page_sql;
            }
          }
        }
        arrc = arrb;
        for (let j = 0; j < arrc.length; j++) {
          /*   if(arrc[j].is_parallel==true){
arrc[j].is_parallel='1'
        }else{
          arrc[j].is_parallel='0'
        } */
          for (let jj = 0; jj < this.sqlFiltArr.length; jj++) {
            if (arrc[j].table_name == this.sqlFiltArr[jj].tablename) {
              arrc[j].sql = this.sqlFiltArr[jj].sql;
            }
          }
        }
        console.log(arrc);
      });

      /*   let params1 = {};
      params1["colSetId"] = this.dbid;
      addTaskAllFun.getColumnInfoByColSetId(params1).then(res => {
       console.log(res.data)
      }); */
      // saveAllSQL
      //  saveCollTbInfo
      /*  let data = {};
      if (this.$route.query.edit == "yes") {
        data = {
          aId: this.$route.query.aId,
          id: this.$route.query.id,
          sourId: this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit: "yes"
        };
      } else {
        data = {
          aId: this.$route.query.agent_id
        };
      }
      this.$router.push({
        path: "/dbaddTasksteps03",
        query: data
      }); */
    },
    pre() {
      let data = {};
      if (this.$route.query.edit == "yes") {
        data = {
          aId: this.$route.query.aId,
          id: this.$route.query.id,
          sourId: this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit: "yes"
        };
      } else {
        data = {
          aId: this.$route.query.agent_id
        };
      }
      this.$router.push({
        path: "/dbaddTasksteps01",
        query: data
      });
    },
    // 定义过滤
    Sqlfilt(value, row) {
      this.dialogTableSqlFilt = true;
      this.tablename = row.table_name;
      this.sqlFiltSetData_tablename = "";
      this.sqlFiltSetData_SQL = "";
      if (this.sqlFiltArr.length != 0) {
        let arrid = [];
        for (let i = 0; i < this.sqlFiltArr.length; i++) {
          arrid.push(this.sqlFiltArr[i].tablename);
        }
        if (arrid.indexOf(this.tablename) != -1) {
          arrid.length = 0;
          for (let i = 0; i < this.sqlFiltArr.length; i++) {
            if (this.sqlFiltArr[i].tablename == this.tablename) {
              this.sqlFiltSetData_SQL = this.sqlFiltArr[i].sql;
              this.sqlFiltSetData_tablename = this.sqlFiltArr[i].tablename;
            }
          }
        } else {
          arrid.length = 0;
          this.SqlfiltShowFun(row.table_name);
        }
        //
      } else {
        this.SqlfiltShowFun(row.table_name);
      }
    },
    // 定义过滤接口回显数据
    SqlfiltShowFun(name) {
      let params = {};
      params["colSetId"] = this.dbid;
      params["tableName"] = name;
      addTaskAllFun.getSingleTableSQL(params).then(res => {
        this.sqlFiltSetData_tablename = this.tablename;
        if (res.data.length != 0) {
          this.sqlFiltSetData_SQL = res.data[0].sql;
        }
      });
    },
    // 定义过滤提交按钮
    SqlfiltSubmitFun() {
      if (this.sqlFiltArr.length != 0) {
        for (let i = 0; i < this.sqlFiltArr.length; i++) {
          if (this.sqlFiltArr[i].tablename == this.tablename) {
            this.sqlFiltArr.splice(i, 1);
            i--;
          }
        }
        this.sqlFiltArr.push({
          tablename: this.tablename,
          sql: this.sqlFiltSetData_SQL
        });
      } else {
        this.sqlFiltArr.push({
          tablename: this.tablename,
          sql: this.sqlFiltSetData_SQL
        });
      }
      this.tablename = "";
    },
    SqlfiltCloseFun() {
      this.tablename = "";
    },
    // 是否抽取sql弹框
    checkedis_parallelFun(row) {
      this.dialogTableVisible = true;
      this.EXtable_name = row.table_name;
      this.is_parallel = row.is_parallel;
      // getPageSQL
      if (this.ParallelExtractionArr.length != 0) {
        let arrid = [];
        for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
          arrid.push(this.ParallelExtractionArr[i].tablename);
        }
        if (arrid.indexOf(this.EXtable_name) != -1) {
          arrid.length = 0;
          for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
            if (this.ParallelExtractionArr[i].tablename == this.EXtable_name) {
              this.EXtable_sql = this.ParallelExtractionArr[i].page_sql;
            }
          }
        } else {
          arrid.length = 0;
          if (row.table_id) {
            this.is_parallelShowFun(row.table_id);
          }
        }
        //
      } else {
        if (row.table_id) {
          this.is_parallelShowFun(row.table_id);
        }
      }
    },
    is_parallelShowFun(id) {
      let params = {};
      params["tableId"] = id;
      addTaskAllFun.getPageSQL(params).then(res => {
        this.EXtable_sql = res.data[0].page_sql;
      });
    },
    // 测试
    testParallelExtractionFun(n) {
      if (n == "test") {
        this.testDialogVisible = true;
      }
      this.ParallelExtractionLink = false;
      if (this.EXtable_sql == undefined) {
        this.$message({
          showClose: true,
          message: "sql为空",
          type: "error"
        });
      } else {
        let params = {};
        params["colSetId"] = this.dbid;
        params["pageSql"] = this.EXtable_sql;
        addTaskAllFun.testParallelExtraction(params).then(res => {
          if (res.success == true) {
            res.message = "测试成功";
            this.ParallelExtractionLink = "true";
            this.testLinkReturn = res.message;
            if (n == "submit") {
              this.subExFun();
            }
          } else {
            this.testLinkReturn = res.message;
            if (n == "submit") {
              this.subExFun();
            }
          }
        });
      }
    },
    // 是否抽取sql弹框确定提交
    testParallelExtractionSubmitFun() {
      this.testParallelExtractionFun("submit");
    },
    subExFun() {
      if (this.ParallelExtractionLink == "true") {
        if (this.ParallelExtractionArr.length != 0) {
          for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
            if (this.ParallelExtractionArr[i].tablename == this.tablename) {
              this.ParallelExtractionArr.splice(i, 1);
              i--;
            }
          }
          this.ParallelExtractionArr.push({
            tablename: this.EXtable_name,
            page_sql: this.EXtable_sql
          });
        } else {
          this.ParallelExtractionArr.push({
            tablename: this.EXtable_name,
            page_sql: this.EXtable_sql
          });
        }
        for (let j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].table_name == this.EXtable_name) {
            this.tableData[j].is_parallel = true;
            for (let m = 0; m < this.allData.length; m++) {
              if (this.allData[m].table_name == this.EXtable_name) {
                this.allData[m].is_parallel = true;
                console.log(111);
              }
            }
            this.EXtable_name = "";
          }
        }
        this.dialogTableVisible = false;
      } else {
        this.$message({
          showClose: true,
          message: "sql有误",
          type: "error"
        });
      }
    },
    // 是否抽取sql弹框关闭
    testParallelExtractionCloseFun() {
      for (let j = 0; j < this.tableData.length; j++) {
        if (this.tableData[j].table_name == this.EXtable_name) {
          if (this.is_parallel == false) {
            this.tableData[j].is_parallel = true;
            for (let i = 0; i < this.allData.length; i++) {
              if (this.allData[i].table_name == this.EXtable_name) {
                this.allData[i].is_parallel = true;
              }
            }
            this.dialogTableVisible = false;
          } else {
            this.tableData[j].is_parallel = false;
            for (let i = 0; i < this.allData.length; i++) {
              if (this.allData[i].table_name == this.EXtable_name) {
                this.allData[i].is_parallel = false;
              }
            }
            this.dialogTableVisible = false;
          }

          this.EXtable_name = "";
        }
      }
    },
    // 选择列
    selectCol(value, row) {
      this.dialogSelectColumn = true;
      this.tablename = row.table_name;
      if (this.SelectColumn.length != 0) {
        let arrid = [];
        for (let i = 0; i < this.SelectColumn.length; i++) {
          arrid.push(this.SelectColumn[i].tablename);
        }
        if (arrid.indexOf(this.tablename) != -1) {
          arrid.length = 0;
          for (let i = 0; i < this.SelectColumn.length; i++) {
            if (this.SelectColumn[i].tablename == this.tablename) {
              this.SelectColumnData = this.SelectColumn[i].data;
            }
          }
        } else {
          arrid.length = 0;
          this.SelectColumnShowFun(row.table_name, row.table_id);
        }
      } else {
        this.SelectColumnShowFun(row.table_name, row.table_id);
      }
    },
    // 选择列弹框回显数据调接口
    SelectColumnShowFun(name, id) {
      let params = {};
      params["colSetId"] = this.dbid;
      params["tableName"] = name;
      params["tableId"] = id;
      addTaskAllFun.getColumnsigleInfo(params).then(res => {
        this.coltable_name = "";
        this.coltable_name = res.data.tableName;
        let data = res.data.columnInfo,
          count = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].is_get) {
            if (data[i].is_get == "1") {
              count++;
              data[i].is_get = true;
            } else {
              data[i].is_get = false;
            }
          } else {
            data[i].is_get = false;
          }
        }
        if ((count = data.length && data.length > 0)) {
          this.Allis_SelectColumn = true;
          count = 0;
        }
        this.SelectColumnData = JSON.parse(JSON.stringify(data));
      });
    },
    // 选择列弹框确认
    SelectColumnSubmitFun() {
      let arrdata = this.SelectColumnData;
      if (this.SelectColumn.length != 0) {
        for (let i = 0; i < this.SelectColumn.length; i++) {
          if (this.SelectColumn[i].tablename == this.tablename) {
            this.SelectColumn.splice(i, 1);
            i--;
          }
        }
        this.SelectColumn.push({ tablename: this.tablename, data: arrdata });
      } else {
        this.SelectColumn.push({
          tablename: this.tablename,
          data: this.SelectColumnData
        });
      }
      this.tablename = "";
    },
    // 选择列弹框关闭
    SelectColumnCloseFun() {
      this.tablename = "";
    },
    // 选择列的弹框复选框
    Allis_SelectColumnFun(items, e) {
      items.forEach((item, i) => {
        if (e) {
          item.is_get = true;
        } else {
          item.is_get = false;
        }
      });
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
        table_name: "",
        table_ch_name: "",
        sql: ""
      });
    },
    // 修改表名
    changetablechnameFun(chname, name) {
      for (let m = 0; m < this.allData.length; m++) {
        if (this.allData[m].table_name == name) {
          this.allData[m].table_ch_name = chname;
        }
      }
    },
    // 使用SQL抽取数据
    handleClick(tab) {
      if (tab.name == "second") {
        let params = {};
        params["colSetId"] = this.dbid;
        addTaskAllFun.getAllSQLs(params).then(res => {
          this.ruleForm.sqlExtractData = res.data;
        });
      }
    }
    // 使用SQL抽取数据确定
    /*   sqlExtractDataSubmitFun(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
           let params = {};
        params["tableInfoArray"] =JSON.stringify(this.ruleForm.sqlExtractData) ;
        params["databaseId"] = this.dbid;
        addTaskAllFun.saveAllSQL(params).then(res => {
          console.log(res)
        });
        }})
    } */
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
  width: 32%;
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
.topcolumename {
  display: inline-block;
  background: #f3eded;
  color: #ec0b35;
  padding: 2px;
}
.alltable >>> .el-dialog__body {
  padding: 0 20px;
}
.textheight > textarea {
  min-height: 66px !important;
}
.testLinnk {
  text-align: center;
}
.testLinnk > span {
  font-size: 18px;
  color: #409eff;
}
.steps2 >>> .el-form-item {
  margin-bottom: 0 !important;
}
.steps2 >>> .el-form-item__content::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
  display: inline-block;
  position: absolute;
  left: -8px;
}
</style>