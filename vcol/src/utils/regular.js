const regular = {
    number: { regex: /^[0-9]*$/, error: '只能填写数字' },
    chinese: { regex: /^[\u4e00-\u9fa5]{0,}$/, error: '只能填写中文' },
    email: { regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, error: '邮箱信息填写错误' },
    enAndNum: { regex: /^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$/, error: '只能输入英文和数字' },
    enAlphabet: { regex: /^[A-Za-z]+$/, error: '只能填写英文字母' },
    composition: { regex: /^\w{3,20}$/, error: '只能填写数字、26个英文字母或者下划线组成的字符串' },
    mobilePhone: { regex: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, error: '无效的手机号码' },
    accountNumber: { regex: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, error: '帐号不合法(以字母开头，允许5-16字符，允许字母数字下划线)' },
    password: { regex: /^[a-zA-Z]\w{5,17}$/, error: '密码不合法(以字母开头，长度在6~18字符之间，只能包含字母、数字和下划线)' },
}


export default regular