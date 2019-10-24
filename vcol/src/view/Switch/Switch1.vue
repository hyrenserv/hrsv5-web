<template>
  <div>
    <el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
    <p>绑定<code>v-model</code>到一个<code>Boolean</code>类型的变量。可以使用<code>active-color</code>属性与<code>inactive-color</code>属性来设置开关的背景色。</p>
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
         value: true,
      textarea2: `
                <template>
                   <div>
                        <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                   </div>
                </template>
                                  
                  <script>
                    export default {
                      data() {
                        return {
                          value: true
                        }
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
