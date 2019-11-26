<template>
  <div id="steps4">
    <Step :active="active"></Step>
    <div class="cleanbtn">
      <el-button
        size="mini"
        type="success"
        @click="AllTable_SeparatorFun()"
        class="alltables"
      >所有表分隔符设置</el-button>
    </div>
      <el-form ref="form" >
    <el-table
      :header-cell-style="{background:'#e6e0e0'}"
      ref="filterTable"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
      height="360"
      size="medium"
      border
      :data="unloadingFileData.slice((unloadingcurrentPage - 1) * unloadingpagesize, unloadingcurrentPage *unloadingpagesize)"
    >
      <el-table-column label="序号" align="center" width="60">
        <template scope="scope">
          <span>{{scope.$index+(unloadingcurrentPage - 1) * unloadingpagesize + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="table_name" label="表名" width="110" align="center"></el-table-column>
      <el-table-column prop="table_ch_name" label="表中文名" width="110" align="center"></el-table-column>
      <el-table-column label=" 是否仅抽取" width="120" align="center">
        <template slot="header">
          <el-checkbox
            @change="exCheckAllChange(unloadingFileData,excheckAll)"
            v-model="excheckAll"
            :checked="excheckAll"
          >
            <span class="allclickColor">是否仅抽取</span>
          </el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox
            :checked="scope.row.data_extract_type=='true'"
            v-model="scope.row.data_extract_type"
            @change="singleChangeFun(scope.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label=" 抽取数据存储方式" width="180" align="center"  >
        <template slot-scope="scope">
          <el-select
            placeholder="抽取数据存储方式"
            v-model="scope.row.dbfile_format"
            style="width:150px"
            size="medium"
            @focus="IsExDataFun(scope.row.data_extract_type)"
            @change="IsExChangeDataFun(scope.row)"           
          >
            <el-option
              size="medium"
              v-for="(item,index) in ExtractDataType"
              :key="index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label=" 换行符" width="180" align="center">
        <template scope="scope">
          <el-select
            placeholder="换行符"
            v-model="scope.row.row_separator"
            style="width:150px"
            size="medium"
            :disabled="scope.row.dbfile_format=='ORC'||scope.row.dbfile_format=='PARQUET'||scope.row.dbfile_format=='SEQUENCEFILE'"
          >
            <el-option
              size="medium"
              v-for="(item,index) in newlineCharacter"
              :key="index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label width="180" align="center">
        <template slot="header">
          <el-tooltip class="item" effect="light" content placement="right">
            <div slot="content">
              多行信息
              <br />第二行信息
            </div>
            <i class="el-icon-question" aria-hidden="true">数据列分隔符</i>
          </el-tooltip>
        </template>
        <template scope="scope">
           <el-form-item  :prop="'unloadingFileData.' + scope.$index + '.database_separatorr'" :rules="rule.default">
          <el-input
            :disabled="scope.row.dbfile_format=='ORC'||scope.row.dbfile_format=='PARQUET'||scope.row.dbfile_format=='SEQUENCEFILE'"
            size="medium"
            v-model="scope.row.database_separatorr"
            style="width:150px"
            placeholder="数据列分隔符"
          ></el-input>
           </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="数据字符集" align="center">
        <template scope="scope">
          <el-select
            placeholder="数据字符集"
            v-model="scope.row.database_code"
            style="width:150px"
            size="medium"
          >
            <el-option
              v-for="(item,index) in DataBaseCode"
              :key="index"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
      </el-form>
    <el-pagination
      @size-change="unloading_handleSizeChange"
      @current-change="unloading_handleCurrentChange"
      :current-page="unloadingcurrentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="unloadingpagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="unloadingFileData.length"
      class="locationcenter"
    ></el-pagination>
    <!--所有表分隔符设置  -->
    <el-dialog
      title="所有表分隔符设置"
      :visible.sync="dialogAllTableSeparatorSettings"
      width="50%"
      class="alltable"
      @close="AllTable_SeparatorCloseFun()"
    >
      <el-form ref="form" :model="separatorData" label-width="240px" text-align="center">
        <el-form-item label="是否仅抽取:">
          <el-radio-group v-model="separatorData.isExtraction">
            <el-radio
              v-for="(item,index) in AlltableisExData"
              :key="index"
              :label="item.code"
              :value="item.value"
              @change="isexRadFun"
            >{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="抽取数据存储格式">
          <el-select
            placeholder="抽取数据存储方式"
            v-model="separatorData.Extractformat"
            style="width: 190px;"
            size="medium"
            @focus="AllTableIsExDataFun(separatorData.isExtraction)"
            @change="exchangeFun"
          >
            <el-option
              v-for="(item,index) in ExtractDataType"
              :key="index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="换行符" v-if="separatorData.Extractformat=='非定长'" :rules="rule.default">
          <el-select
            placeholder="换行符"
            v-model="separatorData.Newlinecharacte"
            style="width: 190px;"
            size="medium"
            :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'"
          >
            <el-option
              v-for="(item,index) in newlineCharacter"
              :key="index"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="换行符" v-else>
          <el-select
            placeholder="换行符"
            v-model="separatorData.Newlinecharacte"
            style="width: 190px;"
            size="medium"
            :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'"
          >
            <el-option
              v-for="(item,index) in newlineCharacter"
              :key="index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="数据列分隔符"
          v-if="separatorData.Extractformat=='非定长'"
          :rules="rule.default"
        >
          <el-input
            :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'"
            v-model="separatorData.Datacolumnseparator"
            placeholder="数据列分隔符"
            style="width:190px"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据列分隔符" v-else>
          <el-input
            :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'"
            v-model="separatorData.Datacolumnseparator"
            placeholder="数据列分隔符"
            style="width:190px"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据字符集">
          <template>
            <el-select
              placeholder="数据字符集"
              v-model="separatorData.Datacharacterset"
              style="width: 190px;"
              size="medium"
            >
              <el-option
                v-for="(item,index) in DataBaseCode"
                :key="index"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AllTable_SeparatorCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="AllTable_SeparatorSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
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
var IsExtypeData1 = [],
  IsExtypeData2 = [];
export default {
  components: {
    Step
  },
  data() {
    return {
      active: 3,
      rule: validator.default,
      excheckAll: false,
      dialogAllTableSeparatorSettings: false,
      unloadingcurrentPage: 1,
      unloadingpagesize: 10,
      unloadingFileData: [],
      separatorData: {
        isExtraction: "1",
        Extractformat: "",
        Newlinecharacte: "",
        Datacolumnseparator: "",
        Datacharacterset: ""
      },
      databaseId: "",
      dbid: null,
      aId: null,
      sourId: null,
      sName: null,
      DataBaseCode: [],
      newlineCharacter: [
        {
          value: "\\n  (windows换行符)",
          code: "1"
        },
        {
          value: "\\r  (Mac OS换行符)",
          code: "2"
        },
        {
          value: "\\r \\n  (Linux、Unix换行符)",
          code: "3"
        }
      ],
      isExData: [],
      AlltableisExData: [
        {
          value: "是",
          code: "1"
        },
        {
          value: "否",
          code: "2"
        }
      ],
      ExtractDataType: []
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
  },
  mounted() {
    this.IsExData1();
    this.IsExData2();
    this.getInitInfo();
    // 是否仅抽取
    let params = {};
    params["category"] = "DataExtractType";
    addTaskAllFun.getCategoryItems(params).then(res => {
      this.isExData = res.data;
      console.log(res);
    });
    // 字符集下拉
    let params2 = {};
    params2["category"] = "DataBaseCode";
    addTaskAllFun.getCategoryItems(params2).then(res => {
      this.DataBaseCode = res.data;
    });
  },
  methods: {
    next() {
      var a=this.unloadingFileData
      let dataAll = this.unloadingFileData;
      for (var i = 0; i < dataAll.length; i++) {
        delete dataAll[i].table_ch_name;
        delete dataAll[i].table_name;
        dataAll[i].row_separator = dataAll[i].row_separator
          .split("(")[0]
          .split(" ")
          .join("");
        if (dataAll[i].data_extract_type == true) {
          for (var key in IsExtypeData1) {
            if (IsExtypeData1[key].value == dataAll[i].dbfile_format) {
              dataAll[i].dbfile_format = IsExtypeData1[key].code;
            }
          }
          dataAll[i].data_extract_type = "1";
        } else {
          for (var key in IsExtypeData2) {
            if (IsExtypeData2[key].value == dataAll[i].dbfile_format) {
              dataAll[i].dbfile_format = IsExtypeData2[key].code;
            }
            dataAll[i].data_extract_type = "2";
          }
        }
      }
      let params = {};
      params["colSetId"] = this.databaseId;
      params["extractionDefString"] = JSON.stringify(dataAll);
      console.log(params);
      addTaskAllFun.saveFileConf(params).then(res => {
        console.log(res);
        message.saveSuccess(res);
        this.getInitInfo()
      });
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
        path: "/dbaddTasksteps05",
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
        path: "/dbaddTasksteps03",
        query: data
      });
    },
    unloading_handleSizeChange(size) {
      this.unloadingpagesize = size;
    },
    unloading_handleCurrentChange(current) {
      this.unloadingcurrentPage = current;
    },
    // 获取所有数据显示
    getInitInfo() {
      this.databaseId = this.dbid;
      let params = {};
      params["colSetId"] = this.databaseId;
      addTaskAllFun.getInitInfo(params).then(res => {
        let arr = res.data;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].data_extract_type) {
            if (arr[i].data_extract_type == "1") {
              arr[i].data_extract_type = "true";
              IsExtypeData1.forEach(item => {
                if (arr[i].dbfile_format == item.code) {
                  arr[i].dbfile_format = item.value;
                }
              });
            }
            if (arr[i].data_extract_type == "2") {
              arr[i].data_extract_type = "";
              IsExtypeData2.forEach(items => {
                if (items.code == arr[i].dbfile_format) {
                  arr[i].dbfile_format = items.value;
                }
              });
            }
          } else {
            arr[i].data_extract_type = "";
          }
          if (!arr[i].database_code) {
            arr[i].database_code = "";
          }
          if (!arr[i].database_separatorr) {
            arr[i].database_separatorr = "";
          }
          if (!arr[i].dbfile_format) {
            arr[i].dbfile_format = "";
          }
          if (!arr[i].row_separator) {
            arr[i].row_separator = "";
          }
        }
        this.unloadingFileData = arr;
        console.log(arr);
      });
    },
    IsExData1() {
      let params0 = {};
      var data_01 = [];
      params0["extractType"] = "1";
      addTaskAllFun.getFileFormatByExtractType(params0).then(res => {
        let arr = res.data;
        for (var key in arr) {
          data_01.push({ value: key, code: arr[key] });
        }
        IsExtypeData1 = data_01;
      });
    },
    IsExData2() {
      let params2 = {};
      params2["extractType"] = "2";
      addTaskAllFun.getFileFormatByExtractType(params2).then(res => {
        let arr = res.data;
        for (var key in arr) {
          IsExtypeData2.push({ value: key, code: arr[key] });
        }
      });
    },
    AllTable_SeparatorSubmitFun() {
      this.dialogAllTableSeparatorSettings = false;
      console.log(this.separatorData);
      let data = this.separatorData;
      let alldata = this.unloadingFileData;
      console.log(alldata);
      for (var i = 0; i < alldata.length; i++) {
        for (var key in alldata[i]) {
          if (key == "data_extract_type") {
            if (data.isExtraction == "1") {
              alldata[i][key] = true;
            } else {
              alldata[i][key] = false;
            }
          } else if (key == "dbfile_format") {
            alldata[i][key] = data.Extractformat;
          } else if (key == "row_separator") {
            alldata[i][key] = data.Newlinecharacte;
          } else if (key == "database_separatorr") {
            alldata[i][key] = data.Datacolumnseparator;
          } else if (key == "database_code") {
            alldata[i][key] = data.Datacharacterset;
          }
        }
      }
      this.separatorData = {
        isExtraction: "1",
        Extractformat: "",
        Newlinecharacte: "",
        Datacolumnseparator: "",
        Datacharacterset: ""
      };
    },
    AllTable_SeparatorCloseFun() {
      this.dialogAllTableSeparatorSettings = false;
      this.separatorData = {
        isExtraction: "1",
        Extractformat: "",
        Newlinecharacte: "",
        Datacolumnseparator: "",
        Datacharacterset: ""
      };
    },
    AllTable_SeparatorFun() {
      this.dialogAllTableSeparatorSettings = true;
      let num = 1;
      this.IsExDataFun(num);
    },
    exCheckAllChange(items, e) {
      items.forEach((item, i) => {
        if (e) {
          if (item.data_extract_type == true) {
          } else {
            item.data_extract_type = true;
            item.dbfile_format = "";
            item.row_separator = "";
            item.database_separatorr = "";
          }
        } else {
          item.data_extract_type = false;
          item.dbfile_format = "";
          item.row_separator = "";
          item.database_separatorr = "";
        }
      });
    },
    IsExDataFun(row) {
      this.ExtractDataType = [];
      let params = {};
      let type = "";
      if (row == true) {
        type = "1";
      } else {
        type = "2";
      }
      params["extractType"] = type;
      console.log(params);
      addTaskAllFun.getFileFormatByExtractType(params).then(res => {
        let arr = res.data;
        for (var key in arr) {
          this.ExtractDataType.push({ value: key, code: arr[key] });
        }
      });
    },
    AllTableIsExDataFun(num) {
      this.ExtractDataType = [];
      let params = {};
      params["extractType"] = num;
      addTaskAllFun.getFileFormatByExtractType(params).then(res => {
        let arr = res.data;
        for (var key in arr) {
          this.ExtractDataType.push({ value: key, code: arr[key] });
        }
      });
    },
    singleChangeFun(row) {
      row.dbfile_format = "";
      row.row_separator = "";
      row.database_separatorr = "";
    },
    IsExChangeDataFun(row) {
      row.row_separator = "";
      row.database_separatorr = "";
    },
    exchangeFun() {
      this.separatorData.newlineCharacter = "";
      this.separatorData.dataColumnSeparator = "";
    },
    isexRadFun() {
      this.separatorData.Extractformat = "";
      this.separatorData.Newlinecharacte = "";
      this.separatorData.Datacolumnseparator = "";
    }
  }
};
</script>
<style scoped>
.alltables {
  float: right;
  margin: 4px 2px;
}
.locationcenter {
  text-align: center;
  margin-top: 5px;
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
.allclickColor {
  color: #fff;
  font-weight: bold;
}
.locationcenter {
  text-align: center;
  margin-top: 5px;
}
#steps4 >>> .el-icon-question:before {
  content: "" !important;
}
#steps4 >>> .el-icon-question:after {
  content: "\E7A4" !important;
  margin-left: 10px;
}
</style>