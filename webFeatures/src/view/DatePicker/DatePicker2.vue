<template>
  <div>
    <el-time-picker
    v-model="value1"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
    placeholder="任意时间点">
  </el-time-picker>
    <p>
     使用el-time-picker标签，通过<code>selectableRange</code>限制可选时间范围
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
      value1:new Date(2016, 9, 10, 18, 40),
      textarea2: `
                <template>
                    <el-time-picker
                      v-model="value"
                      :picker-options="{
                        selectableRange: '18:30:00 - 20:30:00'
                      }"
                      placeholder="任意时间点">
                    </el-time-picker>
                </template>

                <script>
                    export default {
                    data() {
                        return {
                            value: new Date(2016, 9, 10, 18, 40),
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
