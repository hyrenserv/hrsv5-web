<template>
  <div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
     <p><strong>仅只有一个选框:</strong>只需要保留一个<code>el-checkbox</code>标签对，在<code>el-checkbox</code>元素中定义<code>v-model</code>绑定变量,例如v-model='checked'，在script的data中写checked:'true';单一的<code>checkbox</code>中，默认绑定变量的值会是<code>Boolean</code>，选中为true。</p>
     <p><strong>多个复选框组：</strong>需要在<code>el-checkbox-group</code>加v-model属性，对性的属性值为一个数组，数组里面对应的值为<code>el-checkbox</code>的lable值</p>
    <p><strong>带全选：</strong>添加<code>el-checkbox</code>，对其设置
      <code>indeterminate</code>属性，用以表示 checkbox 的不确定状态，一般用于实现全选的效果
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
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
      textarea2: `
                <template>
                   <div>
                     <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                   </div>
                  
                </template>
                <script>
                  const cityOptions = ['上海', '北京', '广州', '深圳'];
                  export default {
                    data() {
                      return {
                        checkAll: false,
                        checkedCities: ['上海', '北京'],
                        cities: cityOptions,
                        isIndeterminate: true
                      };
                    },
                    methods: {
                      handleCheckAllChange(val) {
                        this.checkedCities = val ? cityOptions : [];
                        this.isIndeterminate = false;
                      },
                      handleCheckedCitiesChange(value) {
                        let checkedCount = value.length;
                        this.checkAll = checkedCount === this.cities.length;
                        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                      }
                    }
                  };
                <\/script>
            `
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>
