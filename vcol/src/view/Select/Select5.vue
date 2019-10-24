<template>
  <div>
    <el-select v-model="value" filterable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <p>
      为<code>el-select</code>添加<code>filterable</code>属性即可启用搜索功能。默认情况下，Select 会找出所有<code>label</code>属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个<code>filter-method</code>来实现。
      <code>filter-method</code>为一个<code>Function</code>，它会在输入值发生变化时调用，参数为当前输入值。
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      textarea2: `
                <template>
                   <div>
                      <el-select v-model="value" filterable placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                   </div>
                </template>
                
                <script>
                  export default {
                    data() {
                      return {
                        options: [{
                          value: '选项1',
                          label: '黄金糕'
                        }, {
                          value: '选项2',
                          label: '双皮奶'
                        }, {
                          value: '选项3',
                          label: '蚵仔煎'
                        }, {
                          value: '选项4',
                          label: '龙须面'
                        }, {
                          value: '选项5',
                          label: '北京烤鸭'
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
