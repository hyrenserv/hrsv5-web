<template>
  <div>
      <el-date-picker
        v-model="value2"
        type="date"
        align="right"
        placeholder="选择日期" 
      ></el-date-picker>
      <p>修改el-date-picker的<code>type</code>属性可以直接修改要显示的内容，type可选择year,month,date,datetime;
      通过设置<code> type</code>属性为 datetime，即可在同一个选择器里同时进行日期和时间的选择</p>
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
      value2: "",
      textarea2: `
                <template>
                   <el-date-picker
                      v-model="value"
                      type="date"
                      align="right"
                      placeholder="选择日期" 
                    ></el-date-picker>
                </template>

                <script>
                    export default {
                    data() {
                        return {
                            value: '',
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
