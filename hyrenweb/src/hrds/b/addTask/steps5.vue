<template>
  <div>
    <Step :active="active"></Step>
    <el-table
      :header-cell-style="{background:'#e6e0e0'}"
      ref="filterTable"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
      height="360"
      size="medium"
      border
      :data="ex_destinationData.slice((ex_destinationcurrentPage - 1) * ex_destinationpagesize, ex_destinationcurrentPage *ex_destinationpagesize)"
    >
      <el-table-column label="序号" align="center" width="60">
        <template scope="scope">
          <span>{{scope.$index+(ex_destinationcurrentPage - 1) * ex_destinationpagesize + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="表名" width="150" align="center">
        <template slot-scope="scope">
          <el-input
            size="medium"
            v-model="scope.row.table_name"
            style="width:120px"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column  label="表中文名" width="150" align="center">
        <template slot-scope="scope">
          <el-input
            size="medium"
            v-model="scope.row.table_ch_name"
            style="width:120px"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column  label=" 选择目的地" width="150" align="center">
       <!--  <template slot="header">
          <el-checkbox>
            <span class="allclickColor">选择目的地</span>
          </el-checkbox>
        </template> -->
        <template slot-scope="scope">
          <el-checkbox @change="dialogChooseDestination=true" key='1' v-if="scope.row.data_extract_type=='1'" disabled v-model="scope.row.data_extract_type"></el-checkbox>
          <el-checkbox @change="ChooseDestination(scope.row)" key='2' v-else  v-model="scope.row.data_extract_type"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label=" 是否拉链存储" width="150" align="center">
        <template slot="header">
          <el-checkbox @change="Allis_zipperFun(ex_destinationData,Allis_zippercheck)"
              v-model="Allis_zippercheck"
              :checked="Allis_zippercheck">
            <span class="allclickColor">是否拉链存储</span>
          </el-checkbox>
        </template>
          <template slot-scope="scope">
            <el-checkbox
              :checked="scope.row.is_zipper=='1'"
              v-model="scope.row.is_zipper"
              @change="is_zipperFun(scope.row)"
            ></el-checkbox>
          </template>
      </el-table-column>
      <el-table-column  label=" 存储方式" align="center">
        <template slot="header">
          <el-checkbox  v-if="Allis_zippercheck==false" disabled>
            <span class="allclickColor">存储方式</span>
          </el-checkbox>
           <el-checkbox  v-else>
            <span class="allclickColor">存储方式</span>
          </el-checkbox>
        </template>
           <template slot-scope="scope">
        <el-select
          placeholder="存储方式"
          v-model="scope.row.storage_type"
          style="width:150px"
          size="medium"
          v-if="scope.row.is_zipper==false"
          disabled
        >
            <el-option
                v-for="(item,index) in StorageType"
                :key="index"
                :label="item.value"
                :value="item.code"
              ></el-option>
        </el-select>
          <el-select
          placeholder="存储方式"
          v-model="scope.row.storage_type"
          style="width:150px"
          size="medium"
          v-else
        >
        <!-- StorageType -->
            <el-option
                v-for="(item,index) in StorageType"
                :key="index"
                :label="item.value"
                :value="item.code"
              ></el-option>
        </el-select>
           </template>
      </el-table-column>
      <el-table-column  label=" 数据保留天数" width="150" align="center">
        <template slot="header">
          <el-checkbox>
             <span class="allclickColor">数据保留天数</span>
          </el-checkbox>
        </template>
        <template  slot-scope="scope">
          <el-input
            size="medium"
            v-model="scope.row.storage_time"
            style="width:120px"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="ex_destination_handleSizeChange"
      @current-change="ex_destination_handleCurrentChange"
      :current-page="ex_destinationcurrentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="ex_destinationpagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="ex_destinationData.length"
      class="locationcenter"
    ></el-pagination>
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">下一步</el-button>
    <!-- 选择目的地弹框 -->
    <el-dialog title=" 选择目的地" :visible.sync="dialogChooseDestination" width="70%" class="alltable">
      <el-table
        :data="destinationData.slice((destination_currentPage - 1) * destination_pagesize, destination_currentPage * destination_pagesize)"
        border
        size="medium"
        highlight-current-row
        ref="multipleTable"
      >
        <el-table-column type="selection" property="usedflag" width="55" align="center"></el-table-column>
        <el-table-column label="序号" align="center" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index+(destination_currentPage - 1) * destination_pagesize + 1}}</span>
        </template>
      </el-table-column>
        <el-table-column property="dsl_name" label="存储名称" align="center"></el-table-column>
        <el-table-column property="store_type" label="存储类型" align="center"></el-table-column>
        <el-table-column label="详情" width="160px" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="24" class="delbtn">
                <el-button
                  style="color:#ccc"
                  size="medium"
                  type="text"
                  circle
                  @click="dialogViewDetails=true"
                >查看详情</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="selectCol" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="dialogFieldProperty=true">配置字段属性</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="destination_handleSizeChange"
        @current-change="destination_handleCurrentChange"
        :current-page.sync="destination_currentPage"
        :page-size="destination_pagesize"
        layout="total, prev, pager, next"
        :total="destinationData.length"
        class="locationcenter"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChooseDestination = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogChooseDestination= false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog title=" 关系型数据库" :visible.sync="dialogViewDetails" width="60%" class="alltable">
      <table class="mailTable" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>数据库：</td>
          <td>数据驱动</td>
        </tr>
        <tr>
          <td>数据库名：</td>
          <td>Cl</td>
        </tr>
        <tr>
          <td>IP：</td>
          <td>127.0.0.1</td>
        </tr>
        <tr>
          <td>用户名：</td>
          <td>Axure</td>
        </tr>
        <tr>
          <td>JDBCURL：</td>
          <td>
            <p>https://n9gdoc.axshare.com/#g=1&p=%E5%AE%9A%E4%B9%89%E5%AD%98%E5%82%A8%E7%9B%AE%E7%9A%84%E5%9C%B</p>
          </td>
        </tr>
      </table>
    </el-dialog>
    <!-- 配置字段属性 -->
    <el-dialog :visible.sync="dialogFieldProperty" width="70%" class="alltable">
      <div slot="title" class="header-title">
        <span class="title">配置字段属性&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title">
          <p class="topcolumename">根据目的地选择字段存储</p>
        </span>
      </div>
      <el-button
        type="success"
        size="mini"
        width="20"
        @click="FieldProperty_addRow(FieldProperty)"
        class="addline"
      >新增行</el-button>
      <el-table
        :data="FieldProperty.slice((fieldProperty_currentPage - 1) * fieldProperty_pagesize, fieldProperty_currentPage * fieldProperty_pagesize)"
        border
        size="medium"
        highlight-current-row
      >
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="col_name" label="列名" align="center"></el-table-column>
        <el-table-column property="col_chname" label="列中文名" align="center">
          <template scope="scope">
            <el-input
              v-model="scope.row.col_chname"
              :title="scope.row.col_chname"
              placeholder="列中文名"
              size="medium"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="isKey" label="是否主键" width="180" align="center">
          <template slot="header">
            <el-checkbox>
              <span class="allclickColor">是否主键</span>
            </el-checkbox>
          </template>
          <template>
            <el-checkbox></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="isPartitionCol" label="是否分区列" width="180" align="center">
          <template slot="header">
            <el-checkbox>
              <span class="allclickColor">是否分区列</span>
            </el-checkbox>
          </template>
          <template>
            <el-checkbox></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="fieldProperty_handleSizeChange"
        @current-change="fieldProperty_handleCurrentChange"
        :current-page.sync="fieldProperty_currentPage"
        :page-size="fieldProperty_pagesize"
        layout="total, prev, pager, next"
        :total="FieldProperty.length"
        class="locationcenter"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFieldProperty = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" size="mini">确 定</el-button>
      </div>
    </el-dialog>
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
      dbid: null,
      aId: null,
      sourId: null,
      sName: null,
      active: 4,
      Allis_zippercheck:false,
      ex_destinationcurrentPage: 1,
      ex_destinationpagesize: 10,
      destination_currentPage: 1,
      destination_pagesize: 10,
      fieldProperty_currentPage: 1,
      fieldProperty_pagesize: 10,
      ex_destinationData: [
      ],
      dialogChooseDestination: false,
      dialogViewDetails: false,
      dialogFieldProperty: false,
      destinationData: [
        {
          Storagename: "1",
          Storage: "2"
        }
      ],
      FieldProperty: [
        {
          col_name: "",
          col_chname: "",
          isKey: "",
          isPartitionCol: ""
        }
      ],
      StorageType:[]
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
  },
  mounted(){
     let params= {};
      params["colSetId"] = this.dbid ;
      addTaskAllFun.stodegetInitInfo(params).then(res => {
       let arr = res.data;
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i].is_zipper) {
            arr[i].is_zipper = '0';
          }
          if (!arr[i].storage_type) {
            arr[i].storage_type = "";
          }
          if (!arr[i].storage_time) {
            arr[i].storage_time = "";
          }
        }
      this.ex_destinationData=arr
      });
      let params2= {};
      params2["category"] = 'StorageType' ;
      addTaskAllFun. getCategoryItems(params2).then(res => {
      this.StorageType=res.data
      });
     
  },
  methods: {
    next() {
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
        path: "/dbaddTasksteps06",
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
        path: "/dbaddTasksteps04",
        query: data
      });
    },
    ex_destination_handleSizeChange() {},
    ex_destination_handleCurrentChange() {},
    destination_handleSizeChange() {},
    destination_handleCurrentChange() {},
    fieldProperty_handleSizeChange() {},
    fieldProperty_handleCurrentChange() {},
    FieldProperty_addRow(tableData, event) {
      tableData.push({
        col_name: "",
        col_chname: "",
        isKey: "",
        isPartitionCol: ""
      });
    },
    is_zipperFun(row){
      console.log(row,1)
    },
    Allis_zipperFun(items,e){
        items.forEach((item, i) => {
        if (e) {
          item.is_zipper =true
        console.log(item.is_zipper)
        } else {
           item.is_zipper =false
        }
      });
    },
    ChooseDestination(row){
        let params= {};
      params["tableId"] = row.table_id;
      addTaskAllFun. getStoDestByTableId(params).then(res => {
     this.destinationData=res.data
      });
         this.dialogChooseDestination=true
    }
  }
};
</script>
<style scoped>
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
.mailTable {
  width: 66%;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  box-sizing: border-box;
}
.mailTable > tr > td:nth-child(1) {
  width: 25%;
  text-align: right;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  font-weight: bold;
  background-color: #eff3f6;
}
.mailTable > tr > td:nth-child(2) {
  width: 40%;
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.alltable >>> .el-dialog__body {
  padding: 10px 20px 20px;
}
.topcolumename {
  display: inline-block;
  background: #f3eded;
  color: #ec0b35;
  padding: 2px;
}
.addline {
  margin: 5px 0;
}
</style>