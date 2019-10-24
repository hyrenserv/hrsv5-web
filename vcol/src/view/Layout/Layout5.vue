<template>
<div>
<el-row type="flex" class="row-bg">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="center">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="end">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="space-between">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="space-around">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
    <p>将 <code>type</code> 属性赋值为 'flex'，可以启用 flex 布局，并可通过<code>justify</code> 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    methods: {
        handleClick(row) {
            console.log(row);
        }
    },
    data() {
        return {
            textarea2 : `
                <template>
                    <div>
                      <el-row type="flex" class="row-bg">
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                      </el-row>
                      <el-row type="flex" class="row-bg" justify="center">
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                      </el-row>
                      <el-row type="flex" class="row-bg" justify="end">
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                      </el-row>
                      <el-row type="flex" class="row-bg" justify="space-between">
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                      </el-row>
                      <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
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
            `,
           
        }
    }
}
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