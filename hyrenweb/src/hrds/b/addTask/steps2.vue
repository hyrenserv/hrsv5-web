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
            <el-form
              :model="ruleForm_ParallelEx"
              status-icon
              ref="ruleForm_ParallelEx"
              label-width="30%"
            >
              <el-row type="flex" style="text-align:right;padding-right:10px;">
                <el-col :span="24">
                  <el-button type="text" @click="testParallelExtractionFun('test')">测试分页SQL</el-button>
                </el-col>
              </el-row>
              <el-form-item label="分页抽取SQL" prop="EXtable_sql" :rules="rule.default">
                <el-row type="flex" justify="center">
                  <el-col>
                    <el-input
                      v-model="ruleForm_ParallelEx.EXtable_sql"
                      type="textarea"
                      autosize
                      size="medium"
                      style="width:284px"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="数据总量" prop="db_allnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                  <el-col>
                    <el-input
                      v-model="ruleForm_ParallelEx.db_allnum"
                      size="medium"
                      style="width:284px"
                    >
                      <el-button slot="append" @click="getTableDataCountFun()">获取数据量</el-button>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="每日数据增量" prop="everDay_addnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                  <el-col>
                    <el-input
                      v-model="ruleForm_ParallelEx.everDay_addnum"
                      size="medium"
                      style="width:284px"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="分页并行数" prop="pageExnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                  <el-col>
                    <el-input
                      v-model="ruleForm_ParallelEx.pageExnum"
                      size="medium"
                      style="width:284px"
                      placeholder="请根据数据总量指定合适的线程数"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="testParallelExtractionCloseFun()" type="danger" size="mini">取 消</el-button>
              <el-button
                @click="testParallelExtractionSubmitFun('ruleForm_ParallelEx')"
                type="primary"
                size="mini"
              >确 定</el-button>
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
                  <!--   <el-checkbox
                    @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)"
                    v-model="Allis_SelectColumn"
                    :checked="Allis_SelectColumn"
                     v-if="edit='yes'" disabled
                  ></el-checkbox>-->
                  <el-checkbox
                    @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)"
                    v-model="Allis_SelectColumn"
                    :checked="Allis_SelectColumn"
                  ></el-checkbox>
                </template>
                <template slot-scope="scope">
                  <!--    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-if="edit='yes'" disabled></el-checkbox>
                  <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-else></el-checkbox>-->
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
          <!-- <el-button size="medium" type="danger">取 消</el-button> -->
          <el-button size="mini" type="danger" @click="sqlExtractDataSubmitFun('ruleForm')">保存</el-button>
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

      ruleForm_ParallelEx: {
        EXtable_sql: "",
        db_allnum: "",
        everDay_addnum: "",
        pageExnum: 5
      },
      dbid: null,
      aId: null,
      sourId: null,
      sName: null,
      allData: [],
      callTable: [],
      EXtable_name: "",
      testLinkReturn: "",
      coltable_name: "",
      tableInfoString: [],
      collTbConfParamString: [],
      tablename: "",
      SelectColumn: [], //选择列点击过保存的值
      sqlFiltArr: [], //sql过滤点击过保存的值
      ParallelExtractionArr: [], //并行抽取数据
      ParallelExtractionLink: false,
      is_parallel: false,
      tableInfoArray: [],
      tablein: [],
      activeFirst: false,
      activeSec: false,
      edit: false
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
    this.edit = this.$route.query.edit;
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
  computed: {
    address() {
      const { activeSec, activeFirst } = this;
      return {
        activeSec,
        activeFirst
      };
    }
  },
  watch: {
    address(val) {
      console.log(val.activeFirst, val.activeSec);
      if (val.activeFirst == true && val.activeSec == true) {
        this.nextlinkFun();
      }
    }
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
      this.saveTableConfFun();
      let params1 = {};
      params1["tableInfoArray"] = JSON.stringify(this.tableInfoArray);
      params1["colSetId"] = parseInt(this.dbid);
      addTaskAllFun.saveAllSQL(params1).then(res => {
        if (res.code == 200) {
          this.activeSec = true;
          this.dbid = res.data;
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: "error"
          });
        }
      });
    },
    nextlinkFun() {
      let data = {};
      if (this.$route.query.edit == "yes") {
        data = {
          aId: this.$route.query.aId,
          id: this.dbid,
          sourId: this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit: "yes"
        };
      } else {
        data = {
          id: this.dbid
        };
      }
      this.$router.push({
        path: "/dbaddTasksteps03",
        query: data
      });
    },
    saveTableConfFun() {
      let arrb = [],
        arrc = [],
        arrData = [],
        tableInfoString = [],
        params = {};
      params["colSetId"] = this.dbid;
      addTaskAllFun.getSQLInfoByColSetId(params).then(res => {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].selectionState == true) {
            arrData.push(this.tableData[i]);
          }
        }
        if (res.data.length > 0) {
          let arr = res.data;
          console.log(arr, 22, arrData);
          for (let i = 0; i < arrData.length; i++) {
            //与原接口数据对比
            for (let j = 0; j < arr.length; j++) {
              if (arrData[i].table_name == arr[j].table_name) {
                if (arr[j].page_sql) {
                  arrData[i].page_sql = arr[j].page_sql;
                }
                if (arr[j].sql) {
                  arrData[i].sql = arr[j].sql;
                }
                if (arr[j].pageparallels) {
                  arrData[i].pageparallels = arr[j].pageparallels;
                }
                if (arr[j].dataincrement) {
                  arrData[i].dataincrement = arr[j].dataincrement;
                }
                if (arr[j].table_count) {
                  arrData[i].table_count = arr[j].table_count;
                }
              }
            }
          }
        }
        arrb = arrData;
        if (this.ParallelExtractionArr.length > 0) {
          for (let j = 0; j < arrb.length; j++) {
            for (let jj = 0; jj < this.ParallelExtractionArr.length; jj++) {
              if (
                arrb[j].table_name == this.ParallelExtractionArr[jj].tablename
              ) {
                if (this.ParallelExtractionArr[jj].page_sql) {
                  arrb[j].page_sql = this.ParallelExtractionArr[jj].page_sql;
                }
                if (this.ParallelExtractionArr[jj].pageparallels) {
                  arrb[j].pageparallels = this.ParallelExtractionArr[
                    jj
                  ].pageparallels;
                }
                if (this.ParallelExtractionArr[jj].dataincrement) {
                  arrb[j].dataincrement = this.ParallelExtractionArr[
                    jj
                  ].dataincrement;
                }
                if (this.ParallelExtractionArr[jj].table_count) {
                  arrb[j].table_count = this.ParallelExtractionArr[
                    jj
                  ].table_count;
                }
              }
            }
          }
        }
        arrc = arrb;
        if (this.sqlFiltArr.length > 0) {
          for (let j = 0; j < arrc.length; j++) {
            for (let jj = 0; jj < this.sqlFiltArr.length; jj++) {
              if (arrc[j].table_name == this.sqlFiltArr[jj].tablename) {
                if (this.sqlFiltArr[jj].sql) {
                  arrc[j].sql = this.sqlFiltArr[jj].sql;
                }
              }
            }
          }
        }
        for (let k = 0; k < arrc.length; k++) {
          //存在问题
          /* if (arrc[k].page_sql && arrc[k].sql) {
            tableInfoString.push({
              database_id: this.dbid,
              table_id: arrc[k].table_id ? parseInt(arrc[k].table_id) : "",
              is_parallel: arrc[k].is_parallel ? "1" : "0",
              table_ch_name: arrc[k].table_ch_name,
              table_name: arrc[k].table_name,
              page_sql: arrc[k].page_sql ? arrc[k].page_sql : "",
              sql: arrc[k].sql ? arrc[k].sql : "",
              pageparallels:arrc[k].pageparallels?parseInt(arrc[k].pageparallels):'',
              dataincrement:arrc[k].dataincrement?parseInt(arrc[k].dataincrement):'',
              table_count:arrc[k].table_count?parseInt(arrc[k].table_count):'',
            });
          } else if (arrc[k].page_sql) {
            tableInfoString.push({
              database_id: this.dbid,
              table_id: arrc[k].table_id ? parseInt(arrc[k].table_id) : "",
              is_parallel: arrc[k].is_parallel ? "1" : "0",
              table_ch_name: arrc[k].table_ch_name,
              table_name: arrc[k].table_name,
              page_sql: arrc[k].page_sql ? arrc[k].page_sql : ""
            });
          } else if (arrc[k].sql) {
            tableInfoString.push({
              database_id: this.dbid,
              table_id: arrc[k].table_id ? parseInt(arrc[k].table_id) : "",
              is_parallel: arrc[k].is_parallel ? "1" : "0",
              table_ch_name: arrc[k].table_ch_name,
              table_name: arrc[k].table_name,
              sql: arrc[k].sql ? arrc[k].sql : ""
            });
          } else {
            tableInfoString.push({
              database_id: this.dbid,
              table_id: arrc[k].table_id ? parseInt(arrc[k].table_id) : "",
              is_parallel: arrc[k].is_parallel ? "1" : "0",
              table_ch_name: arrc[k].table_ch_name,
              table_name: arrc[k].table_name
            });
          } */

          tableInfoString.push({
            database_id: this.dbid,
            table_id: arrc[k].table_id ? parseInt(arrc[k].table_id) : "",
            is_parallel: arrc[k].is_parallel ? "1" : "0",
            table_ch_name: arrc[k].table_ch_name,
            table_name: arrc[k].table_name,
            page_sql: arrc[k].page_sql ? arrc[k].page_sql : "",
            sql: arrc[k].sql ? arrc[k].sql : "",
            pageparallels: arrc[k].pageparallels
              ? parseInt(arrc[k].pageparallels)
              : null,
            dataincrement: arrc[k].dataincrement
              ? parseInt(arrc[k].dataincrement)
              : null,
            table_count: arrc[k].table_count ? "" + arrc[k].table_count : ""
          });
        }
        this.tablein = tableInfoString;
        this.saveTableInfofun(arrc);
      });
    },
    saveTableInfofun(arrData) {
      let arrcol = [],
        cola = [],
        collTbConfParamString = [],
        params = {},
        params2 = {};
      params["colSetId"] = this.dbid;
      addTaskAllFun.getColumnInfoByColSetId(params).then(res => {
        console.log(res.data);
        let colData = res.data ? res.data : [];
        for (let i = 0; i < arrData.length; i++) {
          if (arrData[i].selectionState == true) {
            if (colData) {
              for (let key in colData) {
                if (arrData[i].table_name == key) {
                  arrData[i].data = colData[key];
                }
              }
              arrcol.push({
                tablename: arrData[i].table_name,
                data: arrData[i].data ? arrData[i].data : ""
              });
            }
          }
        }
        cola = arrcol;
        if (this.SelectColumn.length > 0) {
          for (let j = 0; j < cola.length; j++) {
            for (let n = 0; n < this.SelectColumn.length; n++) {
              if (cola[j].tablename == this.SelectColumn[n].tablename) {
                cola[j].data = this.SelectColumn[n].data;
              }
            }
          }
        }
        for (let m = 0; m < cola.length; m++) {
          let a = [],
            b = [];
          for (let mm = 0; mm < cola[m].data.length; mm++) {
            b.push({ sort: mm + 1, columnName: cola[m].data[mm].colume_name });
            a.push(cola[m].data[mm]);
          }
          for (let i = 0; i < a.length; i++) {
            console.log(a[i].is_get);
            for (let key in a[i]) {
              console.log(key);
              if (key == "is_get") {
                if (a[i][key] == true) {
                  a[i][key] = "1";
                } else if (a[i][key] == false) {
                  a[i][key] = "0";
                }
              }
              if (key == "tc_or") {
                a[i][key] = "" + a[i][key];
              }
              /* if (a[i][j].is_get == true) {
                a[i][j].is_get = "1";
              } else if (a[i][j].is_get == false) {
                a[i][j].is_get = "0";
              }
              if(a[i][j].tc_or){
a[i][j].tc_or=''+a[i][j].tc_or
              } */
            }
          }
          collTbConfParamString.push({
            collColumnString: a.length != 0 ? JSON.stringify(a) : "",
            columnSortString: b.length != 0 ? JSON.stringify(b) : ""
          });
        }
        params2["colSetId"] = parseInt(this.dbid);
        params2["tableInfoString"] = JSON.stringify(this.tablein);
        params2["collTbConfParamString"] = JSON.stringify(
          collTbConfParamString
        );
        console.log(params2, 222);
        addTaskAllFun.saveCollTbInfo(params2).then(res => {
          if (res.code == 200) {
            this.activeFirst = true;
            this.dbid = res.data;
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: "error"
            });
          }
        });
      });
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
          id: this.$route.query.id
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
      this.ruleForm_ParallelEx.EXtable_sql = "";
      this.ruleForm_ParallelEx.pageExnum = "";
      this.ruleForm_ParallelEx.db_allnum = "";
      this.ruleForm_ParallelEx.everDay_addnum = "";
      // 判断如果数组暂存的有数据就遍历显示，没有见调接口
      if (this.ParallelExtractionArr.length != 0) {
        let arrid = [];
        for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
          arrid.push(this.ParallelExtractionArr[i].tablename);
        }
        if (arrid.indexOf(this.EXtable_name) != -1) {
          arrid.length = 0;
          for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
            if (this.ParallelExtractionArr[i].tablename == this.EXtable_name) {
              this.ruleForm_ParallelEx.EXtable_sql = this.ParallelExtractionArr[
                i
              ].page_sql;
              this.ruleForm_ParallelEx.db_allnum = this.ParallelExtractionArr[
                i
              ].table_count;
              this.ruleForm_ParallelEx.pageExnum = this.ParallelExtractionArr[
                i
              ].pageparallels;
              this.ruleForm_ParallelEx.everDay_addnum = this.ParallelExtractionArr[
                i
              ].dataincrement;
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
    // 是否并行抽取sql弹框回显数据
    is_parallelShowFun(id) {
      let params = {};
      params["tableId"] = id;
      addTaskAllFun.getPageSQL(params).then(res => {
        this.ruleForm_ParallelEx.EXtable_sql = res.data[0].page_sql;
        this.ruleForm_ParallelEx.pageExnum = res.data[0].pageparallels;
        this.ruleForm_ParallelEx.db_allnum = res.data[0].table_count;
        this.ruleForm_ParallelEx.everDay_addnum = res.data[0].dataincrement;
      });
    },
    // 测试
    testParallelExtractionFun(n) {
      if (n == "test") {
        this.testDialogVisible = true;
      }
      this.ParallelExtractionLink = false;
      if (this.ruleForm_ParallelEx.EXtable_sql == undefined) {
        this.$message({
          showClose: true,
          message: "sql为空",
          type: "error"
        });
      } else {
        let params = {};
        params["colSetId"] = this.dbid;
        params["pageSql"] = this.ruleForm_ParallelEx.EXtable_sql;
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
    // 获取数据总量
    getTableDataCountFun() {
      let params = {};
      params["tableName"] = this.EXtable_name;
      params["colSetId"] = parseInt(this.dbid);
      console.log(params);
      addTaskAllFun.getTableDataCount(params).then(res => {
        this.ruleForm_ParallelEx.db_allnum = res.data;
      });
    },
    // 是否抽取sql弹框确定提交
    testParallelExtractionSubmitFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.testParallelExtractionFun("submit");
        }
      });
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
            page_sql: this.ruleForm_ParallelEx.EXtable_sql,
            table_count: this.ruleForm_ParallelEx.db_allnum,
            pageparallels: this.ruleForm_ParallelEx.pageExnum,
            dataincrement: this.ruleForm_ParallelEx.everDay_addnum
          });
        } else {
          this.ParallelExtractionArr.push({
            tablename: this.EXtable_name,
            page_sql: this.ruleForm_ParallelEx.EXtable_sql,
            table_count: this.ruleForm_ParallelEx.db_allnum,
            pageparallels: this.ruleForm_ParallelEx.pageExnum,
            dataincrement: this.ruleForm_ParallelEx.everDay_addnum
          });
        }
        for (let j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].table_name == this.EXtable_name) {
            this.tableData[j].is_parallel = true;
            for (let m = 0; m < this.allData.length; m++) {
              if (this.allData[m].table_name == this.EXtable_name) {
                this.allData[m].is_parallel = true;
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
              /* for(let m=0;m<this.SelectColumn[i].data.length;m++){
if(this.SelectColumn[i].data[m].is_get=='1'){
this.SelectColumn[i].data[m].is_get=true
}else{
  this.SelectColumn[i].data[m].is_get=false
}
              } */
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
        console.log(res.data);
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
        if (this.tableInfoArray.length > 0) {
          this.ruleForm.sqlExtractData = this.tableInfoArray;
        } else {
          let params = {};
          params["colSetId"] = this.dbid;
          addTaskAllFun.getAllSQLs(params).then(res => {
            this.ruleForm.sqlExtractData = res.data;
          });
        }
      }
    },
    // 使用SQL抽取数据确定
    sqlExtractDataSubmitFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableInfoArray = this.ruleForm.sqlExtractData;
        }
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