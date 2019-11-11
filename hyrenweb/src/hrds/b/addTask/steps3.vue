<template>
  <div>
    <div class="cleanbtn">
      <el-button size="mini" type="success" @click="allTableSeparatorSettings=true">所有表分隔符设置</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#e6e0e0'}"
      ref="filterTable"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
      height="360"
      border
      :data="unloadingFileData.slice((unloadingcurrentPage - 1) * unloadingpagesize, unloadingcurrentPage *unloadingpagesize)"
    >
      <el-table-column label="序号" align="center" width="60">
        <template scope="scope">
          <span>{{scope.$index+(unloadingcurrentPage - 1) * unloadingpagesize + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tableName" label="表名" width="180" align="center">
        <template>
          <span>表名</span>
        </template>
      </el-table-column>
      <el-table-column prop="tableChName" label="表中文名" width="180" align="center">
        <template>
          <span>表中文名</span>
        </template>
      </el-table-column>
      <el-table-column prop="extractionDataType" label=" 抽取数据存储方式" width="180" align="center">
        <el-select
          placeholder="抽取数据存储方式"
          v-model="unloadingFileData.extractionDataType"
          style="width:150px"
        >
          <el-option label="ad" value="1"></el-option>
        </el-select>
      </el-table-column>
      <el-table-column prop="newlineCharacter" label=" 换行符" width="180" align="center">
        <el-select
          placeholder="换行符"
          v-model="unloadingFileData.newlineCharacter"
          style="width:150px"
        >
          <el-option label="ad" value="1"></el-option>
        </el-select>
      </el-table-column>
      <el-table-column prop="dataColumnSeparator" label=" 数据列分隔符" width="180" align="center">
        <el-input v-model="unloadingFileData.dataColumnSeparator" style="width:150px"></el-input>
      </el-table-column>
      <el-table-column prop="dataCharacterSet" label="数据字符集" align="center">
        <el-select
          placeholder="数据字符集"
          v-model="unloadingFileData.dataCharacterSet"
          style="width:150px"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTableSeparatorSettings: false,
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
      ]
    };
  },
  methods: {
    unloading_handleSizeChange() {},
    unloading_handleCurrentChange() {}
  }
};
</script>
<style scoped>
</style>