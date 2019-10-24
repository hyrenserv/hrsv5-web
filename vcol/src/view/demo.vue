<template>
<div>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="20%" class="demo-ruleForm">
        <el-form-item label="字符区间设置" prop="name" :rules="filter_rules([{required: true,min:3, max: 5}])">
            <el-col :span="6">
                <el-input v-model="ruleForm.name"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="最大字符数" prop="maxName" :rules="filter_rules([{required: true,maxLength: 5}])">
            <el-col :span="6">
                <el-input v-model="ruleForm.maxName"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="用户名称默认不为空" prop="user_name" :rules="rule.default">
            <el-col :span="6">
                <el-input v-model="ruleForm.user_name"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="自定义正则" prop="customRule" :rules="filter_rules([{required: true,ruleStr: /^[a-z]+$/,message: '只能填写小写字母'}])">
            <el-col :span="6">
                <el-input v-model="ruleForm.customRule"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="Email验证" prop="email" :rules="filter_rules([{required: true,dataType: 'email'}])">
            <el-col :span="6">
                <el-input v-model="ruleForm.email"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="活动区域" prop="region" :rules="rule.selected">
            <el-select v-model="ruleForm.region" placeholder="选择区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
            <el-col :span="6">
                <el-form-item prop="date1" :rules="rule.selected">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="6">
                <el-form-item prop="date2" :rules="rule.selected">
                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="nature" :rules="[{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }]">
            <el-checkbox-group v-model="ruleForm.nature">
                <el-checkbox label="美食/餐厅线上活动" name="nature"></el-checkbox>
                <el-checkbox label="地推活动" name="nature"></el-checkbox>
                <el-checkbox label="线下主题活动" name="nature"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="nature"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>-->
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import * as validator from "@/utils/validator";
export default {
    data() {
        return {
            ruleForm: {},
            rule: validator.default,
            nature : []
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
