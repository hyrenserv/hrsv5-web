<template>
  <div>
    <el-row>
      <div>
        <el-input placeholder="任务编号" v-model="input">
          <el-button slot="append" @click="searchBtn">搜索</el-button>
        </el-input>
      </div>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align='center'>
      </el-table-column>
      <el-table-column prop="etl_sys_cd" label="工程编号" align='center'>
      </el-table-column>
      <el-table-column prop="sub_sys_cd" label="任务编号" align='center'>
      </el-table-column>
      <el-table-column prop="sub_sys_desc" label="任务名称" align='center'>
      </el-table-column>
      <el-table-column prop="comments" label="备注" align='center'>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" title="编辑" type="primary" @click="handleEdit(scope.$index, scope.row)">
          </el-button>
          <el-button size="mini" icon="el-icon-delete" title="删除" type="danger" @click="handleDelete(scope.$index, scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
      <el-col :span="8">
        <el-button size="mini" type="primary" @click="handleAdd">新增
        </el-button>
        <el-button size="mini" type="danger" @click="handleBatchDelete">批量删除
        </el-button>
      </el-col>
      <el-col :span="13" :offset="3">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize" :total="pageLength" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
      </el-col>
    </el-row>
    <dateBtns ref="child"/>
    <!-- 添加任务模态框 -->
    <el-dialog title="添加任务" :visible.sync="dialogFormVisibleAdd" width="40%">
      <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="170px">
        <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
          <el-input v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务编号" prop="sub_sys_cd" :rules="filter_rules([{required: true}])">
          <el-input v-model="formAdd.sub_sys_cd" autocomplete="off" placeholder="工程名称"></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="sub_sys_desc" :rules="filter_rules([{required: true}])">
          <el-input v-model="formAdd.sub_sys_desc" autocomplete="off" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comments">
            <div style="width:330px">
              <el-input type="textarea" v-model="formAdd.comments" autocomplete="off" placeholder="备注"></el-input>
            </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
          <el-button type="primary" @click="saveAdd" size="mini">保存</el-button>
      </div>
    </el-dialog>
    <!-- 修改任务模态框 -->
    <el-dialog title="修改任务" :visible.sync="dialogFormVisibleModify" width="40%">
      <el-form :model="formModify" ref="formModify" class="demo-ruleForm" label-width="170px">
        <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
          <el-input v-model="formModify.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务编号" prop="sub_sys_cd" :rules="filter_rules([{required: true}])">
          <el-input v-model="formModify.sub_sys_cd" autocomplete="off" placeholder="工程名称" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="sub_sys_desc" :rules="filter_rules([{required: true}])">
          <el-input v-model="formModify.sub_sys_desc" autocomplete="off" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comments">
            <div style="width:330px">
              <el-input type="textarea" v-model="formModify.comments" autocomplete="off" placeholder="备注"></el-input>
            </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancleModify" size="mini" type="danger">取消</el-button>
          <el-button type="primary" @click="saveModify" size="mini">保存</el-button>
      </div>
    </el-dialog>
    <!-- 删除任务模态框 -->
    <el-dialog title="确定删除该任务?" :visible.sync="dialogVisibleDelete" width="20%">
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleDelete" size="mini" type="danger">否</el-button>
        <el-button type="primary" @click="saveDelete" size="mini">是</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as subSystemAllFun from "./subSystem";
import dateBtns from '@/hrds/components/publicCom/dateBtns';
export default {
  components: {
    dateBtns
  },
  data() {
    return {
      input:'',
      sys_cd:'',
      tableData:[],
      multipleSelection:[],
      fileList:[],
      dialogFormVisibleAdd: false,
      dialogFormVisibleModify:false,
      dialogVisibleDelete:false,
      formAdd:{
        etl_sys_cd:'',
        sub_sys_cd:'',
        sub_sys_desc:'',
        comments:''
      },
      formModify:{
        etl_sys_cd:'',
        sub_sys_cd:'',
        sub_sys_desc:'',
        comments:''
      },
      deleteForm:{
        etl_sys_cd:'',
        sub_sys_cd:''
      },
      pagesize: 5,
      currpage: 1,
      pageLength: 100,
    };
  },
  /* computed:{
    sys_cd(){
      return this.$store.getters.sys_cd
    }
  }, */
  methods: {
    //刷新表格
    getTable(){
      let params = {};
      // let sys_cd = this.$route.query.etl_sys_cd;
      this.sys_cd = sessionStorage.getItem('sys_cd');
      params["etl_sys_cd"] = this.sys_cd;
      params["sub_sys_cd"] = '';
      params["currPage"] = this.currpage;
      params["pageSize"] = this.pagesize;
      subSystemAllFun.searchEtlSubSysByPage(params).then(res=>{
        this.tableData = res.data.etlSubSysList;
        this.pageLength = res.data.totalSize;
      });
    },
    //选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //搜索按钮
    searchBtn(){
      let params = {};
      this.sys_cd = sessionStorage.getItem('sys_cd');
      params["etl_sys_cd"] = this.sys_cd;
      params["sub_sys_cd"] = this.input;
      params["currPage"] = this.currpage;
      params["pageSize"] = this.pagesize;
      subSystemAllFun.searchEtlSubSysByPage(params).then(res=>{
        this.tableData = res.data.etlSubSysList;
        this.pageLength = res.data.totalSize;
      });
    },
    //新增按钮
    handleAdd(){
      this.dialogFormVisibleAdd = true;
      this.formAdd.etl_sys_cd = this.sys_cd;
    },
    //批量删除按钮
    handleBatchDelete(){
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请选择需要删除的数据',
          type: 'warning'
        });
      }else{
        let arr = [];
        this.multipleSelection.forEach((item)=>{
          arr.push(item.sub_sys_cd);
        });
        let params = {};
        params["etl_sys_cd"] = this.sys_cd;
        params["sub_sys_cd"] = arr;
        subSystemAllFun.batchDeleteEtlSubSys(params).then(res=>{
          this.getTable();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }).catch(err=>{
        this.$message.error('删除失败');
        });
      }
    },
    //编辑按钮
    handleEdit(index, row){
      this.dialogFormVisibleModify = true;
      this.formModify = row;
    },
    //删除按钮
    handleDelete(index, row){
      this.dialogVisibleDelete = true;
      this.deleteForm.etl_sys_cd = row.etl_sys_cd;
      this.deleteForm.sub_sys_cd = row.sub_sys_cd;
    },
    //文件列表移除文件时的钩子
    handleRemove() {
      this.$nextTick(function(){
        this.$refs.child.handleRemove();
      });
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview() {
      this.$nextTick(function(){
        this.$refs.child.handlePreview();
      });
    },
    //文件超出个数限制时的钩子
    handleExceed() {
      this.$nextTick(function(){
        this.$refs.child.handleExceed();
      });
    },
    //删除文件之前的钩子
    beforeRemove() {
      this.$nextTick(function(){
        this.$refs.child.beforeRemove();
      });
    },
    //导入数据按钮
    importData(){
      this.$nextTick(function(){
        this.$refs.child.importData();
      });
    },
    //下载按钮
    downloadModel(){
      this.$nextTick(function(){
        this.$refs.child.downloadModel();
      });
    },
    //模态框新增取消按钮
    cancleAdd(){
      this.dialogFormVisibleAdd = false;
    },
    //模态框新增保存按钮
    saveAdd(){
      let params = {};
      params["etl_sys_cd"] = this.sys_cd;
      params["sub_sys_cd"] = this.formAdd.sub_sys_cd;
      params["sub_sys_desc"] = this.formAdd.sub_sys_desc;
      params["comments"] = this.formAdd.comments;
      subSystemAllFun.saveEtlSubSys(params).then(res=>{
        this.getTable();
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }).catch(err=>{
        this.$message.error('保存失败');
      });
      this.dialogFormVisibleAdd = false;
      this.formAdd = {};
    },
    //模态框修改取消按钮
    cancleModify(){
      this.dialogFormVisibleModify = false;
    },
    //模态框修改保存按钮
    saveModify(){
      let params = {};
      params["etl_sys_cd"] = this.sys_cd;
      params["sub_sys_cd"] = this.formModify.sub_sys_cd;
      params["sub_sys_desc"] = this.formModify.sub_sys_desc;
      params["comments"] = this.formModify.comments;
      subSystemAllFun.updateEtlSubSys(params).then(res=>{
        this.getTable();
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }).catch(err=>{
        this.$message.error('保存失败');
      });
      this.dialogFormVisibleModify = false;
    },
    //模态框删除取消按钮
    cancleDelete(){
      this.dialogVisibleDelete = false;
    },
    //模态框删除保存按钮
    saveDelete(){
      let params = {};
      params["etl_sys_cd"] = this.deleteForm.etl_sys_cd;
      params["sub_sys_cd"] = this.deleteForm.sub_sys_cd;
      subSystemAllFun.deleteEtlSubSys(params).then(res=>{
        this.getTable();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch(err=>{
        this.$message.error('删除失败');
      });
      this.dialogVisibleDelete = false;
    },
    //分页方法
    handleCurrentChange(cpage){
      this.currpage = cpage;
      this.getTable();
    },
    handleSizeChange(psize){
      this.pagesize = psize;
      this.getTable();
    },
  },
  mounted() {
    this.getTable();
  },
};
</script>
<style scoped>
.el-input {
  width: 330px;
  margin-bottom: 15px;
}
.tabBtns{
  margin-top: 15px;
}
</style>