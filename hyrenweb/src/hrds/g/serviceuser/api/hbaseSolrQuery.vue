<template>
<div class="hbaseSolrQuery">
    <el-row class='topTitle'>
        <span class="el-icon-s-operation">Solr查询Hbase数据接口接口说明</span>
        <router-link to="/serviceUser">
            <el-button class="goIndex" type="primary" size="mini" icon="el-icon-s-home">
                返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="6">
            <span class="fontStyle">请求方式</span>
            <el-input value="POST" :disabled="true" />
        </el-col>
        <el-col :span="18">
            <span class="fontStyle">请求URL</span>
            <el-input v-model="ipAndPort" :disabled="true" />
        </el-col>
    </el-row>
    <el-divider />
    <span class="fontStyle">请求参数列表</span>
    <!--请求参数列表展示-->
    <el-table :data="tableData" border size="medium">
        <el-table-column prop="field" width="160px" label="字段" align="center" />
        <el-table-column prop="fieldType" width="100px" label="类型" align="center" />
        <el-table-column prop="isRequired" label="是否必填" align="center" />
        <el-table-column prop="remark" label="描述" align="center" />
    </el-table>
    <el-divider />
    <el-row>
        <span class="fontStyle">使用方式如下</span>
        <el-input v-model="requestAddressForToken" :disabled="true" />
        <el-divider>或</el-divider>
        <el-input v-model="requestAddress" style="font-size: 16px;margin-top: 10px" :disabled="true" />
    </el-row>
    <el-divider />
    <el-row :gutter="20">
        <el-col :span="12">
            <span class="fontStyle">outType=stream, dataType=JSON 正常显示如下</span>
            <pre style="font-size: 16px;">
                   {
                    "status":"NORMAL",
                    "message":{
                        "data":[
                            {
                                "age":30,
                                "phone":123456789,
                                "user_email":"1232313@aa.com",
                                "sex":"nan"
                            }
                        ]
                    }
                }
            </pre>
        </el-col>
        <el-col :span="12">
            <span class="fontStyle">outType=stream, dataType=CSV 正常显示如下</span>
            <pre style="font-size: 16px;">
                age,phone,user_email,sex
                30,123456789,1232313@aa.com,nan
                30,123456789,112323@aa.com,nan
                30,123456789,adsa3@aa.com,nan
                30,123456789,12fasf3@aa.com,nan
                30,123456789,1csa13@aa.com,nan
                30,123456789,asf13@aa.com,nan
                30,123456789,hssh313@aa.com,nan
                30,123456789,1232313@aa.com,nan
                30,123456789,1232313@aa.com,nan
                30,123456789,1232313@aa.com,nan
            </pre>
        </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
        <span class="fontStyle">输出的数据形式(file)正常显示如下</span>
        <pre style="font-size: 16px;">
               {
                    "message":{
                        "dataType":"json",
                        "uuid":"3e4a9b35-5b59-4349-a5b3-ea2cf21394a5",
                        "outType":"file"
                    },
                    "status":"NORMAL"
                }
            </pre>
    </el-row>
    <el-divider />
    <span class="fontStyle">查询语法说明</span><br>
    <el-divider />
    <el-row>
        <span style="margin-top:10px">1、标准查询操作符</span>
        <el-table :data="syntaxDescData" border size="medium">
            <el-table-column prop="param" label="参数" align="left" width="80px" />
            <el-table-column prop="desc" label="描述" align="left" show-overflow-tooltip="true" />
        </el-table>
    </el-row>
    <el-row>
        <span>2、子查询语句</span><br>
        wherecolumn=title=(+return +"pink panther") 查询title中包含return和"pink panther"；title=(jakarta OR apache) AND website 查询jakarta或apache出现，并且website必须出现。
    </el-row>
    <el-row>
        <span>3、查询语句中使用注释</span><br>
        查询语句支持C语言格式的注释。
        wherecolumn=title="jakarta apache" /* this is a comment in the middle of a normal query string */ OR jakarta
    </el-row>
    <el-row>
        <span>4、时间和日期的表示</span><br>
        wherecolumn=timestamp=[* TO NOW]<br>
        wherecolumn=createdate=[1976-03-06T23:59:59.999Z TO *]<br>
        wherecolumn=createdate=[1995-12-31T23:59:59.999Z TO 2007-03-06T00:00:00Z]<br>
        wherecolumn=pubdate=[NOW-1YEAR/DAY TO NOW/DAY+1DAY]<br>
        wherecolumn=createdate=[1976-03-06T23:59:59.999Z TO 1976-03-06T23:59:59.999Z+1YEAR]<br>
        wherecolumn=createdate=[1976-03-06T23:59:59.999Z/YEAR TO 1976-03-06T23:59:59.999Z]
    </el-row>
    <el-row>
        <span>5、其它</span><br>
        (1) *号可以用在范围查询的开始或结束<br>
        wherecolumn=field=[* TO 100] field值小于等于100<br>
        wherecolumn=field=[100 TO *] field值大于等于100<br>
        wherecolumn=field=[* TO *] 匹配包含field字段的所有数据<br>
        (2) 支持单独出现的否定查询<br>
        wherecolumn=-inStock=false field值inStack是false<br>
        wherecolumn=-field=[* TO *] 匹配field无值的所有数据<br>
        (3) 支持函数查询<br>
        wherecolumn=val=myfield<br>
        wherecolumn=val="recip(rord(myfield),1,2,3)"<br>
        具体函数请参考solr所支持的函数。
    </el-row>
    <el-divider />
    <el-row :gutter="20">
        <el-col :span="12">
            <span class="fontStyle">错误响应字段明细</span>
            <!--响应参数列表展示-->
            <el-table :data="errorData" border size="medium">
                <el-table-column prop="state" label="状态字段名" align="center" />
                <el-table-column prop="description" label="状态说明" align="center" />
            </el-table>
        </el-col>
        <el-col :span="12" :gutter="20">
            <span class="fontStyle">错误响应如下：</span>
            <pre style="font-size: 16px;margin-top: 10px">
                    {
                        "status":UNAUTHORIZED,
                        "message":"账号或密码错误..."
                    }
                </pre>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as interfaceFunctionAll from "./api";

export default {
    name: "generalQuery",
    data() {
        return {
            ipAndPort: '',
            requestAddressForToken: '',
            requestAddress: '',
            syntaxDescData: [{
                    param: '=',
                    desc: 'whereColumn=title="The Right Way",name="dog"。指定要查找的字段。'
                },
                {
                    param: '?',
                    desc: 'whereColumn=title=te?t。匹配单一字符，如：test/text'
                },
                {
                    param: '*',
                    desc: 'whereColumn=title=tes*。匹配0或多个字符'
                },
                {
                    param: '~',
                    desc: 'whereColumn=title=roam~。基于编辑距离的模糊查询，匹配roams/foam/foams/roam. roam~1(指定距离必须是1)匹配roams/foam，但不会匹配foams'
                },
                {
                    param: '~n',
                    desc: 'whereColumn=title=roam~n。邻近查询，查找相隔一定距离的单词，比如：”jakarta apache”~10（相隔10个单词）'
                },
                {
                    param: 'to',
                    desc: 'whereColumn=title={Aida TO Carmen}。范围查询，{}不包含边界，[]包含边界'
                },
                {
                    param: '^',
                    desc: 'whereColumn=title=jakarta^4 apache。查找结果中jakarta更相关'
                },
                {
                    param: 'AND(&&)',
                    desc: 'whereColumn=title="jakarta apache" AND "pache Lucene"。运算符两边的查询词同时出现'
                },
                {
                    param: 'OR',
                    desc: 'whereColumn=title="jakarta apache" OR "pache Lucene"。运算符两边的查询词至少一个出现'
                },
                {
                    param: 'NOT(!)',
                    desc: 'whereColumn=title="jakarta apache" NOT "Apache Lucene"。运算符后面的查询词不出现'
                },
                {
                    param: '+',
                    desc: 'whereColumn=title=+jakarta lucene。查询必须包含jakarta,而lucene可以出现可不出现'
                },
                {
                    param: '-',
                    desc: 'whereColumn=title="jakarta apache" -"Apache Lucene"。不能包含运算符后面的查询词'
                },
                {
                    param: '[]',
                    desc: 'whereColumn=age=[18 to 20]。包含范围边界'
                },
                {
                    param: '{}',
                    desc: 'whereColumn=age={18 to 20}。不包含范围边界'
                },
            ],
            tableData: [{
                    field: 'user_id',
                    fieldType: 'Long',
                    isRequired: '必填，与user_password同选',
                    remark: '用户ID',
                },
                {
                    field: 'user_password',
                    fieldType: 'String',
                    isRequired: '必填，与user_id同选',
                    remark: '密码',
                },
                {
                    field: 'token',
                    fieldType: 'String',
                    isRequired: '必填，和user_id,user_password选择一种模式',
                    remark: 'token值',
                },
                {
                    field: 'url',
                    fieldType: 'String',
                    isRequired: '必填',
                    remark: '请求路径（hbaseSolrQuery）',
                },
                {
                    field: 'tableName',
                    fieldType: 'String',
                    isRequired: '必填',
                    remark: '要查询表名',
                },
                {
                    field: 'selectColumn',
                    fieldType: 'String',
                    isRequired: '选填，需要查询的列名(column1,column2....等,号隔开)，如果没有，查询所有字段',
                    remark: '查询字段',
                },
                {
                    field: 'whereColumn',
                    fieldType: 'String',
                    isRequired: '必填,查询条件(column1=zhangsan,age>=23...等用,号隔开)，目前支持>=,<=,<,>,=,!=',
                    remark: '查询过滤条件',
                },
                {
                    field: 'start',
                    fieldType: 'Integer',
                    isRequired: '选填，不填默认从0行起始,填写方式如: start=0',
                    remark: '显示条数',
                },
                {
                    field: 'num',
                    fieldType: 'Integer',
                    isRequired: '选填，不填默认显示10条,填写方式如: num=10',
                    remark: '显示条数',
                },
                {
                    field: 'dataType',
                    fieldType: 'String',
                    isRequired: '必填 ( json / csv)只能选择一种',
                    remark: '输出的数据类型',
                },
                {
                    field: 'outType',
                    fieldType: 'String',
                    isRequired: '必填 ( stream / file)只能选择一种',
                    remark: '输出的数据形式，stream数据默认展示100条',
                },
                {
                    field: 'asynType',
                    fieldType: 'String',
                    isRequired: '选填，如果使用此参数需注意以下事项\n' +
                        'outType为file时使用下面参数：\n' +
                        '0 - 表示同步返回\n' +
                        '1 - 表示异步回调返回，此时需要backurl参数信息\n' +
                        '2 - 表示异步通过轮询返回，此时需要filename，filepath参数信息',
                    remark: '是否异步状态',
                },
                {
                    field: 'backurl',
                    fieldType: 'String',
                    isRequired: '与参数asynType一起使用(如果asynType为1,则必填回调URL)',
                    remark: '回调返回URL',
                },
                {
                    field: 'filename',
                    fieldType: 'String',
                    isRequired: '与参数asynType一起使用(如果asynType为2,则必填轮询返回文件名称)',
                    remark: '轮询返回文件名称',
                },
                {
                    field: 'filepath',
                    fieldType: 'String',
                    isRequired: '与参数asynType一起使用(如果asynType为2,则必填轮询返回文件名称)',
                    remark: '轮询返回文件路径',
                }
            ],
            errorData: [{
                    state: 'UNAUTHORIZED',
                    description: '账号或密码错误',
                },
                {
                    state: 'INTERFACE_STATE',
                    description: '接口处于禁用状态',
                },
                {
                    state: 'USE_VALIDDATE',
                    description: '接口使用效期已过',
                },
                {
                    state: 'TABLE_NOT_EXISTENT',
                    description: '表名称不存在或为空',
                },
                {
                    state: 'COLUMN_NOT_EXISTENT',
                    description: '列名称错误或者为空',
                },
                {
                    state: 'NO_PERMISSIONS',
                    description: '没有接口使用权限',
                },
                {
                    state: 'START_DATE_ERROR',
                    description: '接口开始使用日期未到',
                },
                {
                    state: 'NO_USR_PERMISSIONS',
                    description: '没有表使用权限',
                },
                {
                    state: 'EXCEPTION',
                    description: '异常错误',
                },
            ],
        }
    },
    watch: {
        $route(to, from) {
            this.$router.go(0)
        }
    },
    mounted() {
        this.getIpAndPort();
    },
    methods: {
        // 查询当前用户的IP与端口信息
        getIpAndPort() {
            interfaceFunctionAll.getIpAndPort()
                .then(res => {
                    this.ipAndPort = "http://" + res.data +
                        "/G/action/hrds/g/biz/serviceuser/impl/" + this.$route.query.url;
                    this.requestAddressForToken =
                        this.ipAndPort +
                        "?token=AJALalfja&url=" + this.$route.query.url + "&tableName=emp" +
                        "&whereColumn=user_name=zhangsan&start=0&num=10" +
                        "&dataType=json&outType=stream&asynType=0";
                    this.requestAddress = this.ipAndPort +
                        "?user_id=1005&user_password=111111&url=" + this.$route.query.url +
                        "&tableName=emp&whereColumn=user_name=zhangsan&start=0&num=10&dataType=json&outType=stream&asynType=0";
                })
        },
    }
}
</script>

<style scoped>
.fontStyle {
    color: #2196f3;
    font-size: 18px;

}

.el-table {
    margin-top: 10px;
}

.el-input {
    margin-top: 10px;
}
</style>
