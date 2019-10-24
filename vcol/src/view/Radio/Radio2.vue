<template>
  <div>
    <el-radio-group v-model="radio4"  size="mini">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
    <p>
      只需要把
      <code>el-radio</code>元素换成
      <code>el-radio-button</code>元素即可，此外，还提供了
      <code>size</code>属性。
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
      radio1: "上海",
      radio2: "上海",
      radio3: "上海",
      radio4: "上海",
      textarea2: `
                <template>
                   <div>
                    <el-radio-group v-model="radio4"  size="mini">
                        <el-radio-button label="上海"></el-radio-button>
                        <el-radio-button label="北京"></el-radio-button>
                        <el-radio-button label="广州"></el-radio-button>
                        <el-radio-button label="深圳"></el-radio-button>
                    </el-radio-group>
                   </div>
                </template>
                <script>
                  export default {
                    data () {
                      return {
                        radio1: '上海',
                        radio2: '上海',
                        radio3: '上海',
                        radio4: '上海'
                      };
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
