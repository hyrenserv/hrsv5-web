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
      <el-table-column prop="tableName" label="表名" width="110" align="center"></el-table-column>
      <el-table-column prop="tableChName" label="表中文名" width="110" align="center"></el-table-column>
      <el-table-column prop="onlyExtraction" label=" 是否仅抽取" width="120" align="center">
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
          <el-checkbox :checked="scope.row.onlyExtraction!=0" v-model="scope.row.onlyExtraction"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="extractionDataType" label=" 抽取数据存储方式" width="180" align="center">
        <template slot-scope="scope">
          <el-select
            placeholder="抽取数据存储方式"
            v-model="scope.row.extractionDataType"
            style="width:150px"
            size="medium"
            @focus="IsExDataFun(scope.row)"
            @change="IsExChangeDataFun(scope.row)"
          >
            <el-option
              size="medium"
              v-for="(item,index) in ExtractDataType"
              :key="index"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="newlineCharacter" label=" 换行符" width="180" align="center">
        <template scope="scope">
          <el-select
            placeholder="换行符"
            v-model="scope.row.newlineCharacter"
            style="width:150px"
            size="medium"
            :disabled="scope.row.extractionDataType==2"
          >
            <el-option
              size="medium"
              v-for="(item,index) in newlineCharacter"
              :key="index"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="dataColumnSeparator" label width="180" align="center">
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
          <el-input
            :disabled="scope.row.extractionDataType==2"
            size="medium"
            v-model="scope.row.dataColumnSeparator"
            style="width:150px"
            placeholder="数据列分隔符"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="dataCharacterSet" label="数据字符集" align="center">
        <template scope="scope">
          <el-select
            placeholder="数据字符集"
            v-model="scope.row.dataCharacterSet"
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
              v-for="(item,index) in isExData"
              :key="index"
              :label="item.value"
              :value="item.code"
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
            @change="exchangeFun"
          >
            <el-option
              v-for="(item,index) in ExtractDataType"
              :key="index"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="换行符">
          <el-select
            placeholder="换行符"
            v-model="separatorData.Newlinecharacte"
            style="width: 190px;"
            size="medium"
            :disabled="separatorData.Extractformat==2"
          >
            <el-option
              v-for="(item,index) in newlineCharacter"
              :key="index"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据列分隔符">
          <el-input
            :disabled="separatorData.Extractformat==1||separatorData.Extractformat==2"
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
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import Step from "./step";
export default {
  components: {
    Step
  },
  data() {
    return {
      active: 3,
      excheckAll: false,
      dialogAllTableSeparatorSettings: false,
      unloadingcurrentPage: 1,
      unloadingpagesize: 10,
      unloadingFileData: [
        {
          tableName: "",
          tableChName: "",
          onlyExtraction: "",
          extractionDataType: "",
          newlineCharacter: "",
          dataColumnSeparator: "",
          dataCharacterSet: ""
        },
        {
          tableName: "",
          tableChName: "",
          onlyExtraction: "",
          extractionDataType: "",
          newlineCharacter: "",
          dataColumnSeparator: "",
          dataCharacterSet: ""
        }
      ],
      separatorData: {
        isExtraction: "",
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
          value: "\\ n  (windows换行符)",
          code: "1"
        },
        {
          value: "\\ r  (Mac OS换行符)",
          code: "2"
        },
        {
          value: "\\ r \\ n  (Linux、Unix换行符)",
          code: "3"
        }
      ],
      isExData: [
        {
          value: "是",
          code: "1"
        },
        {
          value: "否",
          code: "2"
        }
      ],
      ExtractDataType: [
        {
          value: "csv",
          code: "1"
        },
        {
          value: "非定长",
          code: "2"
        }
      ]
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
  },
  mounted() {
    this.getInitInfo();
    // getCategoryItems
    /* let params = {};
    params["category"] = "HiveStorageType";
    addTaskAllFun.getCategoryItems(params).then(res => {
      console.log(res, 1);
    }); */
    // 字符集下拉
    let params2 = {};
    params2["category"] = "DataBaseCode";
    addTaskAllFun.getCategoryItems(params2).then(res => {
      this.DataBaseCode = res.data;
    });
  },
  methods: {
    next() {
      console.log(this.unloadingFileData);
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
        path: "/dbaddTasksteps05",
        query: data
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
          aId: this.$route.query.agent_id
        };
      }
      this.$router.push({
        path: "/dbaddTasksteps03",
        query: data
      });
    },
    unloading_handleSizeChange() {},
    unloading_handleCurrentChange() {},
    // 获取所有数据显示
    getInitInfo() {
      this.databaseId = this.dbid;
      let params = {};
      params["colSetId"] = this.databaseId;
      params["currPage"] = this.unloadingcurrentPage;
      params["pageSize"] = this.unloadingpagesize;
      addTaskAllFun.getInitInfo(params).then(res => {
        // unloadingFileData
        console.log(res.data);
      });
    },
    AllTable_SeparatorSubmitFun() {
      this.dialogAllTableSeparatorSettings = false;
      console.log(this.separatorData);
      let data = this.separatorData;
      let alldata = this.unloadingFileData;
      for (var i = 0; i < alldata.length; i++) {
        for (var key in alldata[i]) {
          if (key == "onlyExtraction") {
            if (data.isExtraction == "是") {
              alldata[i][key] = true;
            } else {
              alldata[i][key] = false;
            }
          } else if (key == "extractionDataType") {
            alldata[i][key] = data.Extractformat;
          } else if (key == "newlineCharacter") {
            alldata[i][key] = data.Newlinecharacte;
          } else if (key == "dataColumnSeparator") {
            alldata[i][key] = data.Datacolumnseparator;
          } else if (key == "dataCharacterSet") {
            alldata[i][key] = data.Datacharacterset;
          }
        }
      }
    },
    AllTable_SeparatorCloseFun() {
      this.dialogAllTableSeparatorSettings = false;
    },
    AllTable_SeparatorFun() {
      this.dialogAllTableSeparatorSettings = true;
    },
    exCheckAllChange(items, e) {
      items.forEach((item, i) => {
        if (e) {
          item.onlyExtraction = true;
        } else {
          item.onlyExtraction = false;
        }
      });
    },
    IsExDataFun(e) {
      console.log(e);
    },
    IsExChangeDataFun(row) {
      row.newlineCharacter = "";
      row.dataColumnSeparator = "";
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