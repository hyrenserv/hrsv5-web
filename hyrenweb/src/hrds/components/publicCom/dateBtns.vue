<template>
  <div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
          <el-button size="mini" type="primary"><i class="el-icon-upload el-icon--left"></i>点击上传</el-button>
        </el-upload>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-button size="mini" type="success" @click="importData">导入数据
        </el-button>
        <el-button size="mini" type="primary" @click="downloadModel">下载模板
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    name: 'dateBtns',
    data() {
        return {
            fileList:[],
        };
    },
    methods: {
        //点击文件列表中已上传的文件时的钩子
        handlePreview(file) {
            console.log(file);
        },
        //文件列表移除文件时的钩子
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        //删除文件之前的钩子
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //导入数据按钮
        importData(){
            
        },
        //下载按钮
        downloadModel(){
            
        },
    },
};
</script>
<style scoped>
</style>