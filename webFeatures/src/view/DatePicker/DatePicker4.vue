<template>
  <div>
    <div class="block">
      <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']"
      ></el-date-picker>
    </div>
    <p>
      使用
      <code>datetimerange</code>进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的
      <code>00:00:00</code>作为起始与结束的时刻；通过选项
      <code>default-time</code>可以控制选中起始与结束日期时所使用的具体时刻。
      <code>default-time</code>接受一个数组，数组每项值为字符串，形如
      <code>12:00:00</code>，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。
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
      value2: "",
      textarea2: `
                <template>
                   <div>
                     <div class="block">
                        <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span>
                        <el-date-picker
                          v-model="value"
                          type="datetimerange"
                          align="right"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                      </div>
                   </div>
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
