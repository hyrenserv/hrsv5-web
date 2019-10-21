<template>
  <div>
    <el-select v-model="value" clearable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <p>
      为
      <code>el-select</code>设置
      <code>clearable</code>属性，则可将选择器清空。需要注意的是，
      <code>clearable</code>属性仅适用于单选。
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
                     <el-select v-model="value" clearable placeholder="请选择">
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
