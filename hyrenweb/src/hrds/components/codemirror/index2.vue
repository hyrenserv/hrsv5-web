<template>
<div :id="'editor'+data" style="width:100%;height:200px"></div>
</template>

<script>
import * as commons from '@/utils/commons';
import sqlFormatter from 'sql-formatter'
export default {
    data() {
        return {
            arry: [],
            arryKeyWords: [],
        }
    },
    props: ['data'],
    mounted() {
        var editordata = 'editor' + String(this.data);
        this.getTablename();
        let that = this;
        var editor = ace.edit(editordata)
        editor.session.setMode('ace/mode/sql') // 设置语言
        editor.setTheme('ace/theme/chrome') // 设置主题
        editor.setFontSize(18); //字体大小
        editor.setReadOnly(false); //设置只读（true时只读，用于展示代码）
        //自动换行,设置为off关闭
        editor.setOption("wrap", "free");
        //启用提示菜单
        ace.require("ace/ext/language_tools");
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        editor.setHighlightActiveLine(true); //代码高亮
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWorker(false);
        editor.getSession().setUseWrapMode(true); //支持代码折叠
        editor.selection.getCursor(); //获取光标所在行或列
        editor.session.getLength(); //获取总行数
        editor.getSession().setUseSoftTabs(true);
        var langTools = ace.require("ace/ext/language_tools");
        langTools.addCompleter({
            getCompletions: function (editor, session, pos, prefix, callback) {
                if (prefix.length === 0) {
                    callback(null, []);
                    return;
                }
                var value = editor.getValue() + "";
                if (value.toLowerCase().indexOf("from") >= 0 || value.toLowerCase().indexOf("into") >= 0 || value.toLowerCase().indexOf("set") >= 0) {
                    callback(null, that.arry);
                }
            }
        });
        editor.on("change", that.debounce(function (e) {
            editor.execCommand("startAutocomplete");
            that.$emit('changeTextarea', editor.session.getValue())
            var execute_sql = editor.session.getValue() + "";
            if (execute_sql.toLowerCase().indexOf("from") >= 0 || execute_sql.toLowerCase().indexOf("into") >= 0 || execute_sql.toLowerCase().indexOf("set") >= 0) {
                that.getTablenameWords(execute_sql);
            }
        }))
        this.sqlFormatter() //格式化sql语句

    },
    methods: {
        sqlFormatter() { //格式化sql语句
            var editordata = 'editor' + String(this.data);
            var editors = ace.edit(editordata)
            var beautifys = ace.require("ace/ext/beautify");
            editors.session.setValue(sqlFormatter.format(editors.session.getValue()));
            beautifys.beautify(editors.session);
        },
        // 页面进入默认设置值
        setmVal(value) {
            var editordata = 'editor' + String(this.data);
            var editors = ace.edit(editordata)
            editors.session.setValue(sqlFormatter.format(value))
        },
        getTablename() { //获取sql查询的全部表名
            commons.getAllTableNameByPlatform().then(res => {
                let arr = [];
                res.data.forEach(item => {
                    let obj = {
                        meta: "表名",
                        caption: "",
                        value: "",
                        score: 10000
                    }
                    obj.caption = item;
                    obj.value = item;
                    arr.push(obj);
                })
                this.arry = arr;
            })
        },
        getTablenameWords(execute_sql) { //根据sql查询的表名获取对应的字段
            if (this.arry.length > 0) {
                this.arry.forEach(item => {
                    if (execute_sql.indexOf(item.value) != -1) {
                        commons.getTableInfoByTableName_cache({
                            'table_name': item.value
                        }).then(res => {
                            let arr = [];
                            res.data.forEach(item => {
                                let obj = {
                                    meta: "字段名",
                                    caption: "",
                                    value: "",
                                    score: 10000
                                }
                                obj.caption = item;
                                obj.value = item;
                                arr.push(obj);
                            })
                            var editordata = 'editor' + String(this.data);
                            var editors = ace.edit(editordata)
                            editors.completers.push({
                                getCompletions: function (editor, session, pos, prefix, callback) {
                                    callback(null, arr);
                                }
                            })
                        })
                        return
                    }
                })
            }
        },
        debounce(fn, interval = 500) { //事件防抖,减少服务器压力
            let timeout = null;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fn.apply(this, arguments);
                }, interval);
            };
        }
    }

}
</script>

<style>

</style>
