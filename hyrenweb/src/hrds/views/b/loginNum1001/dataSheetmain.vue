<template>
  <div class="dataSheetmain">
    <div class="dataSheetmainDiv" v-for="(itme,index) in data" :key="index">
      <div  @click="gotoScoureDetail(index)">
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
        @click="dialogFormVisibleAdd = true;clickEditButton()"
       >
      <i class="fa fa-pencil  fa-lg" ></i></el-button>
      </div>
    </div>
    
    <!-- 实现点击编辑按钮进行数据更改-->
    <!-- 编辑的弹出表单 -->
    <el-dialog title="编辑数据源" :visible.sync="dialogFormVisibleAdd" width="40%">
      <el-form :model="formUpdate" ref="formUpdate" :rules="rules">
        <el-form-item label=" 数据源编号" :label-width="formLabelWidth" prop="datasource_number">
          <el-input
            v-model="formUpdate.datasource_number"
            autocomplete="off"
            placeholder="数据源编号"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 数据源名称" :label-width="formLabelWidth" prop="datasource_name">
          <el-input
            v-model="formUpdate.datasource_name"
            autocomplete="off"
            placeholder="数据源名称"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 所属部门" :label-width="formLabelWidth" prop="depIds">
          <el-select v-model="formUpdate.depIds" filterable placeholder="请选择（可多选）" multiple style="width:284px">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.dep_name"
              :value="item.dep_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 数据源详细描述" :label-width="formLabelWidth" prop="source_remark">
          <el-input
            type="textarea"
            v-model="formUpdate.source_remark"
            autocomplete="off"
            placeholder="数据源详细描述"
            style="width:284px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false" size="mini" type="danger">取 消</el-button>
        <el-button type="primary" @click="update('formAdd')" size="mini">保存</el-button>
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
      options:[],
      click:'',
      sourceId:'',
      datasourceName:'',
      dialogFormVisibleAdd: false,
      formUpdate: {
        // datasource_number: "",
        // datasource_name: "",
        // source_remark: "",
        //  depIds: "",
      },
       rules: {
        datasource_number: [
          {
            required: true,
            message: "数据源编号是以字母开头的不超过四位数的字母数字组合",
            trigger: "blur"
          }
        ],
        datasource_name: [
          {
            required: true,
            message: "数据源名称是必填项",
            trigger: "blur"
          }
        ],
        depIds: [
          {
            required: true,
            message: "部门信息是必填项",
            trigger: "change"
          }
        ]
      },
      formLabelWidth: "150px"
    };
  },
  methods:{
    // 点击添加按钮获取部门信息
    departmentInfo(){
      functionAll.getDepartmentInfo().then((res)=>{
        if(res.code==200){
          this.options= res.data.departmentInfo;
        }
      })
    },
  update(){
    console.log(this.formUpdate)
    functionAll.upDateDataResource(this.formUpdate).then((res)=>{
     if(res.code==200){

     }
    })
  },
  // 点击编辑小图标获取数据源信息
  clickEditButton(){
     functionAll.getDepartmentInfo().then((res)=>{
        if(res.code==200){
          this.options= res.data.departmentInfo;
          // this.lists =res.data.dataResource;
        }
      })
  },
  // 点击数据来源表的内容跳转页面

clickEditButton:function(index){
                       this.click =index
            console.log(  this.click)
            
					    console.log(this.datas[ this.click].a)
					functionAll.getDataDepInfo(this.source_id).then((res)=>{
					alert("11")
					     this.options= res.data.departmentInfo;
					     // this.lists =res.data.dataResource;
					  
					 })
					  
                  },

gotoScoureDetail:function(index){
    console.log(this.data[index].datasource_name)
      const querystring = require('querystring');
      functionAll.getAgentData(querystring.stringify({ sourceId: this.data[index].source_id,datasourceName:this.data[index].datasource_name })).then((res)=>{
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
  // gotoScoureDetail(){
  // console.log(this.source_id);
  //  console.log(this.datasourceName)

  //  this.$router.push('addScoure')
  // console.log('1')
  //  //调用方法，传参scoureid
  // }
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