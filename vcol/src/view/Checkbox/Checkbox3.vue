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
    <p>
      <code>indeterminate</code>属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
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
