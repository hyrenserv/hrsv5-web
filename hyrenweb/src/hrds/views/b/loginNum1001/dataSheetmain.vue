<template>
  <div class="dataSheetmain">
    <div class="dataSheetmainDiv" v-for="(itme,index) in data" :key="index">
      <div  @click="gotoScoureDetail(index)" @mouseenter="enter(index)" >
      <i class="block_icon fa fa-sitemap fa-3x tree" ></i>
      <p>{{itme.datasource_name}}</p>
      <p class="postionP">Agent个数为 {{itme.sumagent}}</p>
      <span>{{itme.sumagent}}</span>
      </div>
      <div class="boxshletr">
          <i class="fa fa-download  fa-lg"></i>
     <el-button
        type="text"
        class="editBtn"
        @click="dialogFormVisibleAdd = true;clickEditButton(index)"
       >
      <i class="fa fa-pencil  fa-lg" ></i></el-button>
      <i class="fa fa-times  fa-lg"  v-if="showHidden"></i>

      </div>
    </div>
    
    <!-- 实现点击编辑按钮进行数据更改-->
    <!-- 编辑的弹出表单 -->
    <el-dialog title="编辑数据源" :visible.sync="dialogFormVisibleAdd" width="40%">
      <el-form :model="formUpdate" ref="formUpdate" :rules="rules">
        <el-form-item label=" 数据源名称" :label-width="formLabelWidth" prop="datasourceName">
          <el-input
            v-model="formUpdate.datasourceName "
            autocomplete="off"
            placeholder="数据源名称"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 数据源编号" :label-width="formLabelWidth" prop="datasourceNumber">
          <el-input
            v-model="formUpdate.datasourceNumber"
            autocomplete="off"
            placeholder="数据源编号"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="depIds">
          <el-select v-model="depIds" filterable placeholder="请选择（可多选）" multiple style="width:284px">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.dep_name"
              :value="item.dep_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 数据源详细描述" :label-width="formLabelWidth" prop="sourceRemark">
          <el-input
            type="textarea"
            v-model="formUpdate.sourceRemark"
            autocomplete="off"
            placeholder="数据源详细描述"
            style="width:284px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false" size="mini" type="danger">取 消</el-button>
        <el-button type="primary" @click="update('formUpdate')" size="mini">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as functionAll  from "@/hrds/api/b/loginNum1001/loginNum1001";
export default {
  props:["data"],
  data() {
    return {
      showHidden:'false',
      options:[],
      click:'',
      sourceId:'',
      datasourceName:'',
      dialogFormVisibleAdd: false,
       depIds: [],
      formUpdate: {
        // datasourceNumber: "",
        // datasourceName: "",
        // sourceRemark: "",  
      },
       rules: {
        datasourceNumber: [
          {
            required: true,
            message: "数据源编号是以字母开头的不超过四位数的字母数字组合",
            trigger: "blur"
          }
        ],
        datasourceName: [
          {
            required: true,
            message: "数据源名称是必填项",
            trigger: "blur"
          }
        ],
      },
      formLabelWidth: "150px"
    };
  },
  methods:{
  
 
// 点击编辑小图标获取部门信息
clickEditButton:function(index){
  this.sourceId = this.data[index].source_id
  console.log(this.sourceId)
  const querystring = require('querystring');
					functionAll.getDataDepInfo(querystring.stringify({ sourceId: this.data[index].source_id })).then((res)=>{
             if(res.code==200){
          this.options= res.data.departmentInfo;
          // this.formUpdate.datasourceName =  res.data.dataSource[0].datasource_name;
          // this.formUpdate. datasourceNumber =  res.data.dataSource[0]. datasource_number;
          // this.formUpdate. sourceRemark =  res.data.dataSource[0]. source_remark;
        }
					 })
					  
                  },

  // 点击保存按钮更新当前的所有信息
  update(){
     this.formUpdate['depIds'] =this.depIds.join(',');
     this.formUpdate['sourceId'] =this.sourceId;
    functionAll.updateDataResource(this.formUpdate).then((res)=>{
     if(res.code==200){
        this.$message({
             type: "success",
             message: "编辑成功!"
         });
          this.$emit("addEvent");
           this.dialogFormVisibleAdd = false;
           this.formUpdate={};
           this.depIds=[];
     }else{
       this.$message.error("编辑失败！");
          }
     

    })
  },
 
 // 点击数据来源表的内容跳转页面
gotoScoureDetail:function(index){
      const querystring = require('querystring');
      functionAll.getAgentData(querystring.stringify({ sourceId: this.data[index].source_id,datasourceName: this.data[index].datasource_name })).then((res)=>{
	   if(res.code==200){
		   console.log(res.data)
		  // 传参
		   this.$router.push({
			   name:'addScoure',
			   params:this.res.data
		   }) //进行页面的跳转
	   }
   }) 
},
// 鼠标划入时
enter(index){
  console.log(index)
  // let sumagentNum = 
  this.showHidden =true
}
  }
};
</script>

<style scoped>
/* 组件样式设置 */
.dataSheetmain {
  padding-left: 44px;
  border: 1px solid #dddddd;
  min-height: 124px;
  padding-top: 30px;
  overflow: hidden;
}
.dataSheetmainDiv:hover .boxshletr {
  display: block;
}
.dataSheetmainDiv:hover {
  background: #286090;
  cursor: pointer;
}
.dataSheetmainDiv {
  margin-bottom:50px;   
  padding-top: 10px;
  width: 100px;
  height: 80px;
  background: #337ab7;
  border-radius: 10px;
  margin-right: 82px;
  text-align: center;
  float: left;
  position: relative;
}
.dataSheetmainDiv p {
  color: #fff;
  font-size: 18px;
}
/* 标签定位 */
.dataSheetmainDiv span {
  display: block;
  width: 18px;
  height: 18px;
  background: #f89406;
  border-radius: 50%;
  color: white;
  position: absolute;
  right: -2px;
  top: -3px;
  font-size: 12px;
}
/* 字体描述定位 */
.dataSheetmainDiv .postionP {
  position: absolute;
  bottom: -20px;
  left: 4px;
  font-size: 13px;
  color: black;
}
/* 遮料层样式 */
.boxshletr {
  width: 106px;
  height: 28px;
  background: black;
  opacity: 0.6;
  position: absolute;
  bottom: -20px;
  left: -3px;
  display: none;
}
.fa {
  color: white;
}
.fa-download {
  margin-right: 6px;
  margin-top:6px;
}
.fa-pencil{
    margin-top:6px;
    margin-right: 6px;
}
/* 小图标样式 */
.tree {
  color: aliceblue;
}
/* 按钮设置 */
.editBtn{
    padding: 0;
}
</style>