<template>
<div>
    <div class="block">
        <el-date-picker v-model="value2" type="daterange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']"></el-date-picker>
    </div>
    <p><strong>显示年月日区间：</strong>在<code>el-date-picker</code>中设置type属性为<code>datarange</code></p>
    <p><strong>显示年月日时分秒区间：</strong>
     在<code>el-date-picker</code>中设置type属性为<code>datatimerange</code>（年月日时分秒起始终止）;使用
        <code>datetimerange</code>进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的
        <code>00:00:00</code>作为起始与结束的时刻；通过选项
        <code>default-time</code>可以控制选中起始与结束日期时所使用的具体时刻。
        <code>default-time</code>接受一个数组，数组每项值为字符串，形如<code>:default-time="['12:00:00', '08:00:00']"</code>
      ，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。
    </p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2"></el-input>
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
                        <el-date-picker
                          v-model="value"
                          type="daterange"
                          align="right"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          >
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
