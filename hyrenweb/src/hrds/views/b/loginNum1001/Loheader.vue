<template>
  <div class="loheader">
    <el-row>
      <i class="block_icon fa text-warning fa-globe blue"></i>
      <span>数据来源表</span>
      <el-button type="primary" class="el1 els" @click="dialogFormVisibleAdd = true;
departmentInfo()" size="small">
        <i class="block_icon fa fa-cubes"></i>添加数据源
      </el-button>
      <el-button type="primary" class="els" @click="dialogFormVisibleImport = true;DataCathInfo()" size="small">
        <i class="fa fa-cloud-upload"></i>导入数据源
      </el-button>
    </el-row>
    <!-- 实现点击导入按钮进行页面数据导入-->
    <!-- 弹出表单 -->
    <el-dialog title="上传文件" :visible.sync="dialogFormVisibleImport" width="42%">
      <el-form :model="formImport">
        <el-form-item label="Agent IP地址 :" :label-width="formLabelWidth">
          <el-input v-model="formImport.agentIp" autocomplete="off" style="width:284px" placeholder=" Ip"></el-input>
          <el-tooltip class="item" effect="dark" content="要上传的数据源下Agent的IP地址" placement="right">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Agent 端口 :" :label-width="formLabelWidth">
          <el-input v-model="formImport.agentPort" autocomplete="off" style="width:284px" placeholder="Port"></el-input>
          <el-tooltip class="item" effect="dark" content="要上传的数据源下Agent的端口" placement="right">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="数据采集用户：" :label-width="formLabelWidth">
          <el-select v-model="formImport.userCollectId" placeholder="请选择" style="width:284px">
            <el-option
             v-for="item in options"
              :key="item.dep_id"
              :label="item.user_name"
              :value="item.user_id"
            >

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传要导入的数据源 :" :label-width="formLabelWidth">
          <el-tooltip
            class="item"
            effect="dark"
            content="在本系统中要下载的数据源，后缀名为hrds的加密文件"
            placement="right"
          >
            <i class="fa fa-question-circle question3" aria-hidden="true"></i>
          </el-tooltip>
          <el-input placeholder="点击上传按钮选择文件" disabled="disabled"   style="width:284px">
            <template slot="append">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
              >
                <el-button size="small" type="primary" fill="blue">点击上传</el-button>
              </el-upload>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleImport = false" size="mini" type="danger">取 消</el-button>
        <el-button type="primary" @click="upload('formImport')" size="mini">上传</el-button>
      </div>
    </el-dialog>
    <!-- 实现点击添加按钮进行页面数添加-->
    <!-- 添加的弹出表单 -->
    <el-dialog title="添加数据源" :visible.sync="dialogFormVisibleAdd" width="40%">
      <el-form :model="formAdd" ref="formAdd" :rules="rules">
        <el-form-item label=" 数据源编号" :label-width="formLabelWidth" prop="datasource_number">
          <el-input
            v-model="formAdd.datasource_number"
            autocomplete="off"
            placeholder="数据源编号"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 数据源名称" :label-width="formLabelWidth" prop="datasource_name">
          <el-input
            v-model="formAdd.datasource_name"
            autocomplete="off"
            placeholder="数据源名称"
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
        <el-form-item label=" 数据源详细描述" :label-width="formLabelWidth" prop="source_remark">
          <el-input
            type="textarea"
            v-model="formAdd.source_remark"
            autocomplete="off"
            placeholder="数据源详细描述"
            style="width:284px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
        <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as functionAll  from "@/hrds/api/b/loginNum1001/loginNum1001";


export default {
  data() {
    return {
      options: [
        
      ],
      depIds:[],
      dialogFormVisibleImport: false,
      dialogFormVisibleAdd: false,
      // 添加数据与导入源字段
      formAdd: {
        datasource_number: "",
        datasource_name: "",
        source_remark: "",
      },
      formImport:{
      
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
      
      },
      formLabelWidth: "150px"
    };
  },
  methods: {
    // 点击添加按钮获取部门信息
    departmentInfo(){
      functionAll.getDepartmentInfo().then((res)=>{
        if(res.code==200){
          this.options= res.data.departmentInfo;
        }
      })
    },
    // 添加一条数据
    add(formName) {
      this.$refs[formName].validate(valid => {
         if (valid) {
                    // 调用添加方法
                    this.formAdd['depIds'] =this.depIds.join(',');
                    functionAll.addDataResource(this.formAdd).then((response) => {
                        if (response && response.success) {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            }); 
                           this.$emit("addEvent")
                            // 隐藏对话框
                            this.dialogFormVisibleAdd = false;
                            // 表单清空
                            this.formAdd = {};
                        } else {
                            this.$message.error("添加失败！");
                        }
                    });
                } else {
          return false;
        }
      });
    },
    // 点击导入获取数据采集信息
    DataCathInfo(){
     functionAll.getDataUserInfo().then((res)=>{
       if(res.code==200){
         this.options= res.data
       }
     })
    },
    // 点击上传数据
    upload(){
      functionAll.tapUploadData().then((res)=>{
        console.log("1")
      })
    },
    // 点击取消按钮
    cancleAdd(){
        // 表单清空
        this.formAdd = {};
         // 隐藏对话框
        this.dialogFormVisibleAdd = false;
    }
  }
};
</script>

<style scoped>
.el-row {
  height: 64px;
  line-height: 64px;
  width: 100%;
}
.el-row span {
  color: #2196f3;
  font-size: 18px;
}
/* 字体小图标样式设置 */
.fa-globe {
  color: #2196f3;
  margin-right: 5px;
}
.fa-cubes {
  margin-right: 5px;
}
.fa-cloud-upload {
  margin-right: 5px;
}
.fa-question-circle {
  margin-left: 40px;
}
.question3 {
  margin-left: 0;
  margin-right: 30px;
}
/* button样式设置 */
.els {
  float: right;
  margin-top: 18px;
  background: #337ab7;
}
.el1 {
  margin-left: 10px;
  background: #337ab7;
}
</style>