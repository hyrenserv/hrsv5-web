<template>
  <div>
    <el-checkbox-group v-model="checkboxGroup4" size="mini" >
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
    </el-checkbox-group>
    <p>
      只需要把<code>el-checkbox</code>元素替换为<code>el-checkbox-button</code>元素即可。此外，还提供了<code>size</code>属性。
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
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkboxGroup1: ['上海'],
        checkboxGroup2: ['上海'],
        checkboxGroup3: ['上海'],
        checkboxGroup4: ['北京'],
        cities: cityOptions,
      textarea2: `
                <template>
                   <div>
                      <el-checkbox-group v-model="checkboxGroup4" size="mini">
                        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                      </el-checkbox-group>
                   </div>
                </template>
                <script>
                  const cityOptions = ['上海', '北京', '广州', '深圳'];
                  export default {
                    data () {
                      return {
                        checkboxGroup1: ['上海'],
                        checkboxGroup2: ['上海'],
                        checkboxGroup3: ['上海'],
                        checkboxGroup4: ['上海'],
                        cities: cityOptions
                      };
                    }
                  }
                <\/script>
            `
    };
  },

};
</script>
