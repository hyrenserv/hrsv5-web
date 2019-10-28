<template>
<div>
    <el-form :model="ruleForm" status-icon ref="ruleForm" :label-width="formLabelWidth" class="demo-ruleForm">
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
        <el-form-item label="默认不为空" prop="user_name" :rules="rule.default">
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
        <el-form-item label="活动性质" prop="nature" :rules="rule.checked">
            <el-checkbox-group v-model="ruleForm.nature">
                <el-checkbox label="美食/餐厅线上活动" name="nature"></el-checkbox>
                <el-checkbox label="地推活动" name="nature"></el-checkbox>
                <el-checkbox label="线下主题活动" name="nature"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="nature"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource" :rules="rule.checked">
            <el-radio-group v-model="ruleForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc" :rules="rule.default">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <p>
        <strong>
            引入文件:
            <code>import * as validator from "@/utils/validator"</code>
        </strong>
    </p>
    <p>
        <strong>
            <dl>
                <dt>使用方式</dt>
                <dd>
                    默认不为空使用方式:
                    <code>validator.default.default</code>
                </dd>
                <dd>
                    请至少选择一项使用方式 :
                    <code>validator.default.selected</code>
                </dd>
                <dd>
                    请至少选择一项使用方式 :
                    <code>validator.default.checked</code>
                </dd>
                <dd>
                    验证规则使用方式 :
                    <code>filter_rules([{required: true,dataType: 'email'}])</code>
                    <dl>
                        <dd>required : 是否开启验证(true/false)</dd>
                        <dd>min : 最小字符数限制(与 max同用,限制区间字符数)</dd>
                        <dd>max : 最大字符数限制(与 min同用,限制区间字符数)</dd>
                        <dd>maxLength : 最大字符数限制</dd>
                        <dd style="max-width:500px;">
                            dataType : 验证的方式类型(请查阅
                            <code>/utils/regular.js</code>)
                            <el-button type="primary" size="mini" @click="dialogFormVisible = true">验证类型列表</el-button>
                            <el-dialog title="验证类型列表" :visible.sync="dialogFormVisible" width="75%">
                                <el-table height="450" style="width: 100%" :data="tableData.filter(data => !search || data.regex_type.toLowerCase().includes(search.toLowerCase()))">
                                        <el-table-column show-overflow-tooltip label="验证类型" prop="regex_type">
                                        </el-table-column>
                                        <el-table-column show-overflow-tooltip label="验证类型名称" prop="regex_data.title">
                                        </el-table-column>
                                        <el-table-column show-overflow-tooltip label="验证正则规则" prop="regex_data.regex.source">
                                        </el-table-column>
                                        <el-table-column show-overflow-tooltip label="验证错误信息提示" prop="regex_data.error">
                                        </el-table-column>
                                        <el-table-column align="left">
                                            <template slot="header" slot-scope="scope">
                                                <el-input width="80%" v-model="search" size="mini" placeholder="输入关键字搜索" />
                                            </template>
                                        </el-table-column>
                                </el-table>

                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                                </div>
                            </el-dialog>
                            <!-- <el-table-column label="Date" prop="date">
                                        </el-table-column>
                                        <el-table-column label="Name" prop="name">
                                        </el-table-column>
                                        <el-table-column align="right">
                                            <template slot="header" slot-scope="scope">
                                                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                                            </template>
                                            <template slot-scope="scope">
                                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                                            </template>
                                        </el-table-column> -->

                        </dd>
                        <dd>
                            如果需要添加新的规则验证只需要在
                            <code>/utils/regular.js</code>中添加一条数据即可
                        </dd>
                    </dl>
                </dd>
            </dl>
        </strong>
    </p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
import * as validator from "@/utils/validator";
import regular from "@/utils/regular";
export default {
    data() {
        return {
            ruleForm: {
                nature: []
            },
            search: '',
            formLabelWidth: '18%',
            rule: validator.default,
            dialogFormVisible: false,
            tableData: [],
            textarea2: `
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
                    <el-form-item label="默认不为空" prop="user_name" :rules="rule.default">
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
                    <el-form-item label="活动性质" prop="nature" :rules="rule.checked">
                        <el-checkbox-group v-model="ruleForm.nature">
                            <el-checkbox label="美食/餐厅线上活动" name="nature"></el-checkbox>
                            <el-checkbox label="地推活动" name="nature"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="nature"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="nature"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源" prop="resource" :rules="rule.checked">
                        <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="desc" :rules="rule.default">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>

                import * as validator from "@/utils/validator"
                rule: validator.default,
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
            `
        };
    },
    created() {
        for (let key in regular) {
            let arr = {}
            arr['regex_type'] = key;
            arr['regex_data'] = regular[key];
            this.tableData.push(arr);
        }
        console.log(this.tableData)
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
