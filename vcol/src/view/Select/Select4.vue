<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>
    <p>
      将自定义的 HTML 模板插入
      <code>el-option</code>的 slot 中即可。
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
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      cities: [
        {
          value: "Beijing",
          label: "北京"
        },
        {
          value: "Shanghai",
          label: "上海"
        },
        {
          value: "Nanjing",
          label: "南京"
        },
        {
          value: "Chengdu",
          label: "成都"
        },
        {
          value: "Shenzhen",
          label: "深圳"
        },
        {
          value: "Guangzhou",
          label: "广州"
        }
      ],
      value: "",
      textarea2: `
                <template>
                   <div>
                      <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                          </el-option>
                        </el-select>
                   </div>
                </template>
                <script>
                  export default {
                    data() {
                      return {
                        cities: [{
                          value: 'Beijing',
                          label: '北京'
                        }, {
                          value: 'Shanghai',
                          label: '上海'
                        }, {
                          value: 'Nanjing',
                          label: '南京'
                        }, {
                          value: 'Chengdu',
                          label: '成都'
                        }, {
                          value: 'Shenzhen',
                          label: '深圳'
                        }, {
                          value: 'Guangzhou',
                          label: '广州'
                        }],
                        value: ''
                      }
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
