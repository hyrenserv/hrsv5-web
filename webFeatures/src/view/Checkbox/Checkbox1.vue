<template>
  <div>
   <!-- `checked` 为 true 或 false -->
    <el-checkbox v-model="checked">备选项</el-checkbox>
    <p>在<code>el-checkbox</code>元素中定义<code>v-model</code>绑定变量，单一的<code>checkbox</code>中，默认绑定变量的值会是<code>Boolean</code>，选中为true。</p>
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
        checked: true,
      textarea2: `
                <template>
                   <div>
                     <el-checkbox v-model="checked">备选项</el-checkbox>
                   </div>
                </template>
                <script>
                  export default {
                    data() {
                      return {
                        checked: true
                      };
                    }
                  };
                <\/script>
            `
    };
  }
};
</script>
