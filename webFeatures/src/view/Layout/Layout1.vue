<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <p>通过 row 和 col 组件，并通过 col 组件的<code>span</code>属性我们就可以自由地组合布局。</p>
    <el-collapse>
      <el-collapse-item title="显示代码" name="1">
        <el-input
          type="textarea"
          :autosize="{ minRows: 25, maxRows: 4}"
          readonly
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea2: `
                <template>
                   <div>
                     <el-row>
                        <el-col :span="24">
                          <div class="grid-content bg-purple-dark"></div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple-light"></div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple-light"></div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="6">
                          <div class="grid-content bg-purple-light"></div>
                        </el-col>
                        <el-col :span="6">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="6">
                          <div class="grid-content bg-purple-light"></div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="4">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple-light"></div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple-light"></div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple"></div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple-light"></div>
                        </el-col>
                      </el-row>
                   </div>
                </template>
                 <style>
                          .el-row {
                            margin-bottom: 20px;
                            &:last-child {
                              margin-bottom: 0;
                            }
                          }
                          .el-col {
                            border-radius: 4px;
                          }
                          .bg-purple-dark {
                            background: #99a9bf;
                          }
                          .bg-purple {
                            background: #d3dce6;
                          }
                          .bg-purple-light {
                            background: #e5e9f2;
                          }
                          .grid-content {
                            border-radius: 4px;
                            min-height: 36px;
                          }
                          .row-bg {
                            padding: 10px 0;
                            background-color: #f9fafc;
                          }
                        </style>
            `
    };
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
