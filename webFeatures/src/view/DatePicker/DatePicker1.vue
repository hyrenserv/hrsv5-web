<template>
  <div>
      <el-date-picker
        v-model="value2"
        type="date"
        align="right"
        placeholder="选择日期" 
      ></el-date-picker>
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
                      v-model="value2"
                      type="date"
                      align="right"
                      placeholder="选择日期" 
                    ></el-date-picker>
                </template>

                <script>
                    export default {
                    data() {
                        return {
                            value2: '',
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
