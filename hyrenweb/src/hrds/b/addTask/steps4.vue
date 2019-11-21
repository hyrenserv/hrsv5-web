<template>
  <div>
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
      <el-table-column prop="tableName" label="表名" width="110" align="center">
        <template>
          <span>表名</span>
        </template>
      </el-table-column>
      <el-table-column prop="tableChName" label="表中文名" width="110" align="center">
        <template>
          <span>表中文名</span>
        </template>
      </el-table-column>
        <el-table-column prop="onlyExtraction" label=" 是否仅抽取" width="120" align="center">
        <template slot="header">
          <el-checkbox>
            <span class="allclickColor">是否仅抽取</span>
          </el-checkbox>
        </template>
        <template >
          <el-checkbox ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="extractionDataType" label=" 抽取数据存储方式" width="180" align="center">
        <el-select
          placeholder="抽取数据存储方式"
          v-model="unloadingFileData.extractionDataType"
          style="width:150px"
          size="medium"
        >
          <el-option label="ad" value="1"></el-option>
        </el-select>
      </el-table-column>
      <el-table-column prop="newlineCharacter" label=" 换行符" width="180" align="center">
        <el-select
          placeholder="换行符"
          v-model="unloadingFileData.newlineCharacter"
          style="width:150px"
          size="medium"
        >
          <el-option label="ad" value="1"></el-option>
        </el-select>
      </el-table-column>
      <el-table-column prop="dataColumnSeparator" label=" 数据列分隔符" width="180" align="center">
        <el-input size="medium" v-model="unloadingFileData.dataColumnSeparator" style="width:150px"></el-input>
      </el-table-column>
      <el-table-column prop="dataCharacterSet" label="数据字符集" align="center">
        <el-select
          placeholder="数据字符集"
          v-model="unloadingFileData.dataCharacterSet"
          style="width:150px"
          size="medium"
        >
          <el-option label="ad" value="1"></el-option>
        </el-select>
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
    <!--  -->
    <el-dialog
      title="所有表分隔符设置"
      :visible.sync="dialogAllTableSeparatorSettings"
      width="50%"
      class="alltable"
      @close="AllTable_SeparatorCloseFun()"
    >
      <el-form ref="form" :model="separatorData" label-width="240px" text-align="center">
        <el-form-item label="抽取数据存储格式">
          <el-select
          placeholder="抽取数据存储方式"
          v-model="separatorData.Extractformat"
          style="width: 190px;"
          size="medium"
        >
        <!-- HivEStorageType -->
          <el-option label="ad" value="1"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="换行符">
          <el-select
          placeholder="换行符"
          v-model="separatorData.Newlinecharacte"
          style="width: 190px;"
          size="medium"
        >
          <el-option label="ad" value="1"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="数据列分隔符">
          <el-input v-model="separatorData.Datacolumnseparator" style="width:190px" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="数据字符集">
           <el-select
          placeholder="数据字符集"
          v-model="separatorData.Datacharacterset"
           style="width: 190px;"
          size="medium"
        >
        <!-- DataBaseCode -->
          <el-option label="ad" value="1"></el-option>
        </el-select>
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
      dialogAllTableSeparatorSettings: false,
      unloadingcurrentPage: 1,
      unloadingpagesize: 10,
      unloadingFileData: [
        {
          tableName: "",
          tableChName: "",
          extractionDataType: "",
          newlineCharacter: "",
          dataColumnSeparator: "",
          dataCharacterSet: ""
        },
        {
          tableName: "",
          tableChName: "",
          extractionDataType: "",
          newlineCharacter: "",
          dataColumnSeparator: "",
          dataCharacterSet: ""
        }
      ],
      separatorData:{
         onlyExtraction:'',
          Extractformat:'',
          Newlinecharacte:'',
          Datacolumnseparator:'',
          Datacharacterset:''
      },
      databaseId: "",
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
  mounted() {
    this.getInitInfo();
    // getCategoryItems
     let params = {};
    params["category"] = "HiveStorageType";
    addTaskAllFun.getCategoryItems(params).then(res => {
      console.log(res,1)
    });
     let params2 = {};
    params2["category"] = "DataBaseCode";
    addTaskAllFun.getCategoryItems(params2).then(res => {
      console.log(res,2)
    });
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
        path: "/dbaddTasksteps05",
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
        path: "/dbaddTasksteps03",
        query:data
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
    AllTable_SeparatorSubmitFun(){
      this.dialogAllTableSeparatorSettings=false
    },
    AllTable_SeparatorCloseFun(){
        this.dialogAllTableSeparatorSettings=false
    },
    AllTable_SeparatorFun(){
      this.dialogAllTableSeparatorSettings=true
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
</style>