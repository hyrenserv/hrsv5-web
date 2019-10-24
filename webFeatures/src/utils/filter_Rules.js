import * as validate from '@/utils/validate'
export default {
  install(Vue) {

    /**
     * @method 
     * @param {Object} rule 当前对象
     * @param {String} value 检测的值
     * @param {Function} callback 回调函数
     */
    const userName = (rule, value, callback) => {
      if (value != 'hi') {
        callback(new Error(rule.ruleData.message ? rule.ruleData.message : "只能输入hi"))
      }
      else {
        callback()
      }
    }


    /**
     * @param {Object} rule 当前对象
     * @param {String} value 检测的值
     * @param {Function} callback 回调函数
     */
    const customize = (rule, value, callback) => {
      console.log(rule)
      if (!validate.customStr(rule.ruleData.ruleStr, value)) {
        callback(new Error(rule.ruleData.message ? rule.ruleData.message : '输入项不符合自定义规则'))
      }
      else {
        callback()
      }
    }

    /**
     * @param {Boolean} required 是否为必填项,选项只存在 true/false
     * @param {String} message 错误时,提示的信息
     * @param {String} trigger 触发检测方式 blur-焦点,change-更改
     * @param {Function} validator 验证方式,这里需要传递的是一个 Function
     * @param {String} ruleStr 自定义的正则校验方式
     * @param {Number} min 最少字符数 区间使用,和max一起
     * @param {Number} max 最大字符数 区间使用,和min一起
     * @param {Number} maxLength 单个不在区间最大字符数
     * @param {String} type 指定使用哪种校验方式
     * @description 初始自定义正则类型定义在 src/utils/validate中  持续添加中.......
     */
    Vue.prototype.filter_rules = function (item) {

      let rules = [];



      if (item.dataType) {
        switch (item.dataType) {
          case 'user_name':
            rules.push({ required: true, validator: userName, ruleData: item });
            break;
          default:
            rules.push({});
            break;
        }
      }
      else {
        if (item.required) {
          rules.push({ required: true, message: '该输入项为必填项', trigger: 'blur' });
        }

        if (item.maxLength) {
          rules.push({ min: 1, max: item.maxLength, message: '最多输入' + item.maxLength + '个字符!', trigger: 'blur' })
        }

        if (item.min && item.max) {
          rules.push({ min: item.min, max: item.max, message: '字符长度在' + item.min + '至' + item.max + '之间!', trigger: 'blur' })
        }

        /**检测是否有自定义规则.如果有,则使用自定义的规则来进行检查输入项 */
        if (item.ruleStr) {
          rules.push({ required: true, validator: customize, ruleData: item, trigger: 'blur' });
        }
      }
      return rules;
    };
  }
}
// exports.install = function (Vue, options) {



// }