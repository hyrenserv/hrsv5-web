<template>
  <div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </div>
    <p>
      通过设置
      <code>type</code>属性为
      <code>datetime</code>，即可在同一个选择器里同时进行日期和时间的选择。快捷选项的使用方法与 Date Picker 相同。
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
      value1: "",
      textarea2: `
                <template>
                   <div>
                     <div class="block">
                        <span class="demonstration">默认</span>
                        <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                   </div>
                </template>

                <script>
                    export default {
                    data() {
                        return {
                            value1: '',
                        };
                    }
                    };
                <\/script>
            `
    };
  }
};
</script>
<style scoped>
</style>
