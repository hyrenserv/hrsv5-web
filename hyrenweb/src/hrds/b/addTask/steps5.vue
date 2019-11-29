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
      <el-table-column label="表名" width="150" align="center">
        <template slot-scope="scope">
          <el-input size="medium" v-model="scope.row.table_name" style="width:120px"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="表中文名" width="150" align="center">
        <template slot-scope="scope">
          <el-input size="medium" v-model="scope.row.table_ch_name" style="width:120px"></el-input>
        </template>
      </el-table-column>
      <el-table-column label=" 选择目的地" width="150" align="center">
        <!--  <template slot="header">
          <el-checkbox>
            <span class="allclickColor">选择目的地</span>
          </el-checkbox>
        </template>-->
        <template slot-scope="scope">
          <el-checkbox
            @change="dialogChooseDestination=true"
            key="1"
            v-if="scope.row.data_extract_type=='1'"
            disabled
            v-model="scope.row.data_extract_type"
          ></el-checkbox>
          <el-checkbox
            @change="ChooseDestination(scope.row)"
            key="2"
            v-else
            v-model="scope.row.data_extract_type"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label=" 是否拉链存储" width="150" align="center">
        <template slot="header">
          <el-checkbox
            @change="Allis_zipperFun(ex_destinationData,Allis_zippercheck)"
            v-model="Allis_zippercheck"
            :checked="Allis_zippercheck"
          >
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
      <el-table-column label=" 存储方式" align="center">
        <template slot="header">
          <el-checkbox v-if="Allis_zippercheck==false" disabled>
            <span class="allclickColor">存储方式</span>
          </el-checkbox>
          <el-popover v-else placement="right" width="120" height="50" v-model="visible">
            <el-select placeholder="存储方式" v-model="allstoragetype" style="width:140px" size="mini">
              <el-option
                v-for="(item,index) in StorageType"
                :key="index"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
            <div style="text-align: right; margin:30px 0 5px 0">
              <el-button size="mini" type="text" @click="allStorageModeCloseFun()">取消</el-button>
              <el-button type="primary" size="mini" @click="allStorageModeFun()">确定</el-button>
            </div>
            <el-checkbox
              slot="reference"
              @change="allcunchuFun(allcunchu)"
              :checked="allcunchu"
              v-model="allcunchu"
            >
              <span class="allclickColor">存储方式</span>
            </el-checkbox>
          </el-popover>
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
      <el-table-column label=" 数据保留天数" width="150" align="center">
        <template slot="header">
          <el-checkbox>
            <span class="allclickColor">数据保留天数</span>
          </el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-input size="medium" v-model="scope.row.storage_time" style="width:120px"></el-input>
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
                  size="medium"
                  type="text"
                  circle
                  @click="getStoDestDetailFun(scope.row)"
                >查看详情</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="selectCol" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="getColumnStoInfoFun(scope.row)">配置字段属性</el-button>
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
      <table v-if="viewDatilsData==''" class="mailTable" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="nocontent">暂无信息</td>
        </tr>
      </table>
      <table v-else class="mailTable" border="0" cellspacing="0" cellpadding="0">
        <tr v-for="(item,index) in viewDatilsData" :key="index">
          <td>{{item.storage_property_key}}：</td>
          <td>
            <p>{{item.storage_property_val}}</p>
          </td>
        </tr>
      </table>
    </el-dialog>
    <!-- 配置字段属性 -->
    <el-dialog :visible.sync="dialogFieldProperty" width="80%" class="alltable">
      <div slot="title" class="header-title">
        <span class="title">配置字段属性&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title">
          <p class="topcolumename">根据目的地选择字段存储</p>
        </span>
      </div>
      <!--   <el-button
        type="success"
        size="mini"
        width="20"
        @click="FieldProperty_addRow(FieldProperty)"
        class="addline"
      >新增行</el-button>-->
      <el-table
        :data="FieldProperty.slice((fieldProperty_currentPage - 1) * fieldProperty_pagesize, fieldProperty_currentPage * fieldProperty_pagesize)"
        border
        size="medium"
        highlight-current-row
      >
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column
          :label="item.value"
          :property="item.id"
          v-for="item in selectedColumnList"
          :key="item.id"
          align="center"
        >
          <template slot-scope="scope" slot="header">
            <span
              :key="scope.column.property"
              class="allclickColor"
              v-if="item.id=='colume_name'||item.id=='colume_ch_name'"
            >{{item.value}}</span>
            <el-checkbox
              :key="scope.column.property"
              v-else
              @change="allSelectFun(item.id,item.active)"
              v-model="item.active"
              :checked="item.active"
            >
              <span class="allclickColor">{{item.value}}</span>
            </el-checkbox>
          </template>
          <template slot-scope="scope">
            <span v-if="scope.column.property=='colume_name'">{{ scope.row[scope.column.property] }}</span>
            <el-input
              v-else-if="scope.column.property=='colume_ch_name'"
              v-model="scope.row[scope.column.property]"
              :title="scope.row[scope.column.property]"
              placeholder="列中文名"
              size="medium"
            ></el-input>
            <div v-else>
              <el-checkbox
                v-if="scope.row[scope.column.property]"
                checked
                v-model="scope.row[scope.column.property]"
              ></el-checkbox>
              <el-checkbox v-else v-model="scope.row[scope.column.property]"></el-checkbox>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-if="Hbase">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.$index===0"
              @click="moveUp(scope.$index,scope.row,FieldProperty)"
            >
              <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.$index===(FieldProperty.length-1)"
              @click="moveDown(scope.$index,scope.row,FieldProperty)"
            >
              <i class="el-icon-arrow-down"></i>
            </el-button>
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
        <el-button @click="ConfigureFieldPropertiesCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="ConfigureFieldPropertiesSubmitFun()">确 定</el-button>
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
      Allis_zippercheck: false,
      pzcheckAll: false,
      allcunchu: false,
      visible: false,
      ex_destinationcurrentPage: 1,
      ex_destinationpagesize: 10,
      destination_currentPage: 1,
      destination_pagesize: 10,
      fieldProperty_currentPage: 1,
      fieldProperty_pagesize: 10,
      ex_destinationData: [],
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
      StorageType: [],
      storeTypeData: [],
      viewDatilsData: [],
      tableId: "",
      dynamic: [],
      selectedColumnList: {},
      Hbase: false,
      type: "",
      dslid: "",
      allstoragetype: "",
      StoreData: []
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
  },
  mounted() {
    let params = {};
    params["colSetId"] = this.dbid;
    addTaskAllFun.stodegetInitInfo(params).then(res => {
      let arr = res.data;
      for (var i = 0; i < arr.length; i++) {
        if (!arr[i].is_zipper) {
          arr[i].is_zipper = "0";
        }
        if (!arr[i].storage_type) {
          arr[i].storage_type = "";
        }
        if (!arr[i].storage_time) {
          arr[i].storage_time = "";
        }
      }
      this.ex_destinationData = arr;
    });
    let params2 = {};
    params2["category"] = "StorageType";
    addTaskAllFun.getCategoryItems(params2).then(res => {
      this.StorageType = res.data;
    });
    this.storeTypeFun();
    this.specialfieldFun();
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
    // store_type
    storeTypeFun() {
      let params = {};
      params["category"] = "store_type";
      addTaskAllFun.getCategoryItems(params).then(res => {
        this.storeTypeData = res.data;
      });
    },
    ex_destination_handleSizeChange(size) {
      this.ex_destinationpagesize = size;
    },
    ex_destination_handleCurrentChange(current) {
      this.ex_destinationcurrentPage = current;
    },
    destination_handleSizeChange(size) {
      this.destination_pagesize = size;
    },
    destination_handleCurrentChange(current) {
      this.ex_destinationcurrentPage = current;
    },
    fieldProperty_handleSizeChange(size) {
      this.fieldProperty_pagesize = size;
    },
    fieldProperty_handleCurrentChange(current) {
      this.fieldProperty_currentPage = current;
    },
    /*   FieldProperty_addRow(tableData, event) {
      tableData.push({
        col_name: "",
        col_chname: "",
        isKey: "",
        isPartitionCol: ""
      });
    }, */
    is_zipperFun(row) {
      console.log(row, 1);
    },
    Allis_zipperFun(items, e) {
      items.forEach((item, i) => {
        if (e) {
          item.is_zipper = true;
          console.log(item.is_zipper);
        } else {
          item.is_zipper = false;
        }
      });
    },
    ChooseDestination(row) {
      let params = {};
      this.tableId = row.table_id;
      params["tableId"] = row.table_id;
      addTaskAllFun.getStoDestByTableId(params).then(res => {
        console.log(res);
        let arr = JSON.parse(JSON.stringify(res.data));
        let data = this.storeTypeData;
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (data[j].code == arr[i].store_type) {
              arr[i].store_type = data[j].value;
            }
          }
        }
        this.destinationData = arr;
      });
      this.dialogChooseDestination = true;
    },
    // 点击查看详情
    getStoDestDetailFun(row) {
      this.dialogViewDetails = true;
      let params = {};
      params["dslId"] = row.dsl_id;
      addTaskAllFun.getStoDestDetail(params).then(res => {
        this.viewDatilsData = res.data;
        console.log(res.data);
      });
    },
    // 点击配置属性按钮
    getColumnStoInfoFun(row) {
      this.type = row.store_type;
      this.dslid = row.dsl_id;
      if (row.store_type == "Hbase") {
        this.Hbase = true;
      } else {
        this.Hbase = false;
      }
      this.dialogFieldProperty = true;
      // 获取表头
      let params0 = {};
      params0["dslId"] = row.dsl_id;
      addTaskAllFun.getColumnHeader(params0).then(res => {
        console.log(res.data);
        let arr = [];
        for (var key in res.data) {
          if (key == "colume_name") {
            arr.push({ id: key, value: res.data[key] });
          } else if (key == "colume_ch_name") {
            arr.push({ id: key, value: res.data[key] });
          } else {
            arr.push({ id: key, value: "是否" + res.data[key], active: false });
          }
        }
        this.selectedColumnList = arr.reverse();
      });
      // 获取数据
      let params = {};
      params["dslId"] = row.dsl_id;
      params["tableId"] = this.tableId;
      addTaskAllFun.getColumnStoInfo(params).then(res => {
        let arr = JSON.parse(JSON.stringify(res.data));
        for (let i = 0; i < arr.length; i++) {
          for (let key in arr[i]) {
            if (
              key == "column_id" ||
              key == "colume_ch_name" ||
              key == "colume_name" ||
              key == "csi_number"
            ) {
              key = arr[i][key];
            } else {
              if (arr[i][key] == "0") {
                arr[i][key] = false;
              } else {
                arr[i][key] = true;
              }
            }
          }
        }
        this.FieldProperty = arr;
      });
    },
    allSelectFun(tit, e) {
      let data = this.FieldProperty;
      for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
          if (key == tit) {
            if (e) {
              data[i][key] = true;
            } else {
              data[i][key] = false;
            }
          }
        }
      }
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
    //  获取特殊字段值
    specialfieldFun() {
      let params = {};
      params["category"] = "StoreLayerAdded";
      addTaskAllFun.getCategoryItems(params).then(res => {
        this.StoreData = res.data;
      });
    },
    // 配置字段属性
    ConfigureFieldPropertiesSubmitFun() {
      let data = this.FieldProperty;
      let arr = data,
        count = 0,
        specialfield = [],
        arrlist = [];
      // 调特殊字段接口dslid
      let params0 = {};
      params0["dslId"] = this.dslid;
      addTaskAllFun.getDataStoreLayerAddedId(params0).then(res => {
        let data = res.data,
          arr2 = [];
        // 将获得的id以固定形式给arr2
        if (data) {
          for (let item in data) {
            arr2.push({ key: item, value: data[item] });
          }
          // 将特殊字段对应id组成新的数组给specialfield
          for (let i = 0; i < this.StoreData.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
              if (this.StoreData[i].code == arr2[j].key) {
                specialfield.push({
                  key: this.StoreData[i].value,
                  value: arr2[j].value
                });
              }
            }
          }
        }
        //
        for (let i = 0; i < arr.length; i++) {
          delete arr[i].colume_name;
          delete arr[i].colume_ch_name;
          arr[i].dslIds = [];
          // Hbase类型增加csi_number字段
          if (this.type == "Hbase") {
            delete arr[i].csi_number;
            if (arr[i].rowkey == true) {
              count = count + 1;
              arr[i].csi_number = count;
            }
          }
          // 遍历得到dslIds数组
          for (let key in arr[i]) {
            if (key != "csi_number" && key != "column_id" && key != "dslIds") {
              if (key) {
                if (arr[i][key] == true) {
                  delete arr[i][key];
                  arr[i].dslIds.push(key);
                } else {
                  delete arr[i][key];
                }
              }
            }
          }
        }
        arrlist = JSON.parse(JSON.stringify(arr));
        // dslIds空的删除，并替换对应特殊字段id
        for (let j = 0; j < arrlist.length; j++) {
          if (arrlist[j].dslIds.length == "0") {
            arrlist.splice(j, 1);
            j--;
          } else {
            for (let n = 0; n < arrlist[j].dslIds.length; n++) {
              for (let m = 0; m < specialfield.length; m++) {
                if (specialfield[m].key == arrlist[j].dslIds[n]) {
                  arrlist[j].dslIds[n] = specialfield[m].value;
                }
              }
            }
          }
        }
        //  console.log(arrlist);
        // 调提交接口saveColStoInfo
        let params = {};
        params["colStoInfoString"] = JSON.stringify(arrlist);
        params["tableId"] = this.tableId;
        addTaskAllFun.saveColStoInfo(params).then(res => {
          console.log(res.data);
        });
      });
    },
    ConfigureFieldPropertiesCloseFun() {
      this.dialogFieldProperty = false;
    },
    allcunchuFun(e) {
      if (e) {
        this.visible = true;
      }else{
        this.visible = false;

      }
    },
    // 改变所有存储方式确定按钮方法
    allStorageModeFun() {
      this.visible = false;
      console.log(this.allstoragetype, this.ex_destinationData);
      for (let i = 0; i < this.ex_destinationData.length; i++) {
        this.ex_destinationData[i].storage_type = this.allstoragetype;
      }
    },
    allStorageModeCloseFun(){
      this.visible = false;
      this.allcunchu=false
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
.nocontent {
  text-align: center;
  font-weight: normal;
  border-right: 0;
}
</style>