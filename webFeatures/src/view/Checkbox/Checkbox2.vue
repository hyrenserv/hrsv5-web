<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox id="manuallyChangeck"  label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
    <p>
      <code>checkbox-group</code>元素能把多个 checkbox 管理为一组，只需要在 Group 中使用
      <code>v-model</code>绑定
      <code>Array</code>类型的变量即可。
      <code>el-checkbox</code>的
      <code>label</code>属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。
      <code>label</code>与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。
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
      checkList: ["选中且禁用", "复选框 A"],
      textarea2: `
                <template>
                   <div>
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox label="复选框A"></el-checkbox>
                        <el-checkbox label="复选框B"></el-checkbox>
                        <el-checkbox label="复选框C"></el-checkbox>
                        <el-checkbox label="禁用" disabled></el-checkbox>
                        <el-checkbox label="选中且禁用" disabled></el-checkbox>
                      </el-checkbox-group>
                   </div>
                </template>
                <script>
                  export default {
                    data () {
                      return {
                        checkList: ['选中且禁用','复选框A']
                      };
                    }
                  };
                <\/script>
            `
    };
  }
};
</script>
