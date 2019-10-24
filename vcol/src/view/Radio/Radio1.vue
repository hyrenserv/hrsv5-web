<template>
  <div>
    <el-radio id="manuallyChange" v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <p>
      要使用 Radio 组件，只需要设置
      <code>v-model</code>绑定变量，选中意味着变量的值为相应 Radio
      <code>label</code>属性的值，
      <code>label</code>可以是
      <code>String</code>、
      <code>Number</code>或
      <code>Boolean</code>。
    </p>
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
      radio: '1',
      textarea2: `
                <template>
                   <div>
                        <el-radio v-model="radio" label="1">备选项</el-radio>
                        <el-radio v-model="radio" label="2">备选项</el-radio>
                   </div>
                </template>
                <script>
                    export default {
                      data () {
                        return {
                          radio: '1'
                        };
                      }
                    }
                  <\/script>
            `
    };
  }
};
</script>
<style scoped>
</style>
