<template>
<div class="dataStoreAction">
    <el-row class="dataSave">
        <span>数据存储层配置定义</span>
    </el-row>
    <el-row class="partOne">
        <el-form ref="form" :model="form" label-width="150px">
            <el-col :span="12">
                <el-col :span="20">
                    <el-form-item label="存储层配置名称" prop="dsl_name" :rules="filter_rules([{required: true}])">
                        <el-input v-model="form.dsl_name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>

            <el-col :span="12">
                <el-form-item label="存储层配置存储类型" prop="store_type" :rules="rule.selected">
                    <el-select v-model="form.store_type" placeholder="请选择存储类型" @change="changedata">
                        <el-option v-for="item in storeType" :key="item.value" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-col :span="20">
                    <el-form-item label="存储层配置表备注">
                        <el-input v-model="form.dsl_remark" placeholder="存储层配置表备注"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>

            <el-col :span="12">
                <el-form-item label="类型长度对比信息" prop="dlcs_id" :rules="rule.selected">
                    <el-select v-model="form.dlcs_id" placeholder="类型长度对比信息">
                        <el-option v-for="item in typeLengthinfo" :key="item.dlcs_id" :label="item.dlcs_name" :value="item.dlcs_id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="是否支持外部表" prop="is_hadoopclient" :rules="rule.selected" label-width="150px">
                    <el-radio-group v-model="form.is_hadoopclient">
                        <el-radio v-for="item in YesNo" :key="item.value" :label="item.code" @change="changeHadoopclient">{{item.value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="数据类型对比信息" prop="dtcs_id" :rules="rule.selected">
                    <el-select v-model="form.dtcs_id" placeholder="数据类型对比信息">
                        <el-option v-for="item in dataTypeinfo" :key="item.dtcs_id" :label="item.dtcs_name" :value="item.dtcs_id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-col :span="20">
                    <el-form-item label="附加信息表备注">
                        <el-input v-model="form.dslad_remark" placeholder="附加信息表备注"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>

            <el-col :span="12">
                <el-col>
                    <el-form-item label="附加信息">
                        <el-checkbox-group v-model="form.dsla_storelayer">
                            <el-checkbox v-for="item in checkboxType" :key="item.value" :label="item.value" :value="item.code"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-col>
            <span class="saveDataSpan">数据存储层配置属性</span>
            <el-tooltip placement="right" effect="light" v-if="showAddBtn">
                <div slot="content">
                    <el-link type="primary">{{store_type_ch}}--存储层可配置参数说明:</el-link><br />
                    <span v-for="item in storageLayerParamInfo" :key="item.key">
                        <el-link type="danger">{{item.key}}</el-link> : {{item.value}}<br />
                    </span>
                </div>
                <span><i class="el-icon-info" /></span>
            </el-tooltip>
            <el-button size="mini" class="partTwoBtn" v-if="showAddBtn" type="success" @click="addTableData('0')">添加行</el-button>
            <el-button size="mini" class="partTwoBtn" v-if="showAddFileBtn" type="success" @click="addTableData('1')">添加文件行</el-button>
            <el-table :data="form.tableData" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center" :key="1"></el-table-column>

                <el-table-column prop="storage_property_key" label="key" align="center" :key="2">
                    <template slot-scope="scope">
                        <el-form-item :prop="`tableData.${scope.$index}.storage_property_key`" :rules="filter_rules([{required: true}])">
                            <!--固定的key-->
                            <el-input size="meduim" disabled v-if="scope.$index < numberCount " v-model="scope.row.storage_property_key"></el-input>
                            <!--增加的key-->
                            <el-input size="meduim" v-else v-model="scope.row.storage_property_key"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column label="value" prop="storage_property_val" align="center" :key="3">
                    <template slot-scope="scope">
                        <!--关系型数据库类型参数值value-->
                        <el-form-item v-if="scope.row.storage_property_key == 'database_type'" :prop="`tableData.${scope.$index}.storage_property_val`" :rules="rule.selected">
                            <el-select v-model="scope.row.storage_property_val" @change="getAttrKeyByDatabaseType" style="width:98%">
                                <el-option v-for="item in databaseType" :key="item.code" :label="item.value" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--非关系型数据库参数值value-->
                        <el-form-item v-else-if="scope.row.is_file=='0'" :prop="`tableData.${scope.$index}.storage_property_val`" :rules="filter_rules([{required: true}])">
                            <el-input size="meduim" v-model="scope.row.storage_property_val" style="width:98%"></el-input>
                        </el-form-item>
                        <el-upload v-else-if="scope.row.is_file=='1'" class="upload-demo" ref="upload" :file-list="fileList" action="" :auto-upload="false" :on-change="handleChange" :on-remove="removeFile" style="width:98%">
                            <el-button size="small" type="info" @click="selectFile(scope.$index, scope.row)">选择文件</el-button>
                        </el-upload>
                    </template>
                </el-table-column>

                <el-table-column prop="dsla_remark" label="描述" align="center">
                    <template slot-scope="scope">
                        <el-form-item>
                            <el-input type="textarea" v-model="scope.row.dsla_remark" autosize></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" v-if="scope.$index < numberCount" disabled>删除</el-button>
                        <el-button type="danger" size="small" v-else @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </el-row>
    <el-row class="partFour">
        <div class="elButton">
            <el-button type="primary" size="medium" @click="cancelSave">取消</el-button>
            <el-button type="primary" size="medium" @click="saveData('form')">保存</el-button>
        </div>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./dataStoreAction";
import * as validator from "@/utils/js/validator";
import * as message from "@/utils/js/message";
import regular from "@/utils/js/regular";

export default {
    data() {
        return {
            form: {
                dsl_name: '',
                store_type: '',
                dsla_storelayer: [],
                tableData: [],
                is_hadoopclient: '0'
            },
            showAddBtn: false,
            showAddFileBtn: false,
            formDialog: {},
            showValue: true,
            selectVlueOrUpload: false,
            selectedUploadValue: false,
            selectedValue: false,
            numberCount: '',
            change_storelayer: [],
            storeType: [],
            checkboxType: [],
            dataTypeinfo: [],
            typeLengthinfo: [],
            fileList: [],
            YesNo: [],
            databaseType: [],
            rule: validator.default,
            markArrindex: [],
            store_type_ch: '',
            database_type: '',
            numberCount: 0,
            uploadindex: '',
            dataKey: '',
            fileArry: [],
            storageLayerParamInfo: [],
            databaseData: [{
                    key: 'database_type',
                    value: '数据库类型'
                },
                {
                    key: 'database_driver',
                    value: '数据库驱动'
                },
                {
                    key: 'jdbc_url',
                    value: '数据库连接url地址'
                },
                {
                    key: 'database_name',
                    value: '数据库名称'
                },
                {
                    key: 'database_pwd',
                    value: '数据库密码'
                },
                {
                    key: 'user_name',
                    value: '用户名'
                },
                {
                    key: 'sftp_host',
                    value: '数据库服务器所在主机sftp的ip,支持外部表时使用'
                },
                {
                    key: 'sftp_port',
                    value: '数据库服务器所在主机sftp的端口,支持外部表时使用'
                },
                {
                    key: 'sftp_user',
                    value: '数据库服务器所在主机sftp指定的用户名,支持外部表时使用'
                },
                {
                    key: 'sftp_pwd',
                    value: '数据库服务器所在主机sftp用户对应的密码,支持外部表时使用'
                },
                {
                    key: 'external_root_path',
                    value: '指定sftp文件到数据库服务器所在主机的根目录,支持外部表时使用'
                },
                {
                    key: 'external_director',
                    value: "oracle服务器外部表loader文件目录对应的对象名称," +
                        "oracle的dba需要执行 create directory 'external_directory' as 'external_root_path',支持外部表时使用"
                },
                {
                    key: 'database_code',
                    value: '数据库的编码，本系统支持的参数为： UTF-8、GBK、UTF-16、GB2312、ISO-8859-1,支持外部表时使用'
                },
                {
                    key: 'minPoolSize',
                    value: '数据库连接池的参数，最小连接数，非必须'
                },
                {
                    key: 'maxPoolSize',
                    value: '数据库连接池的参数,最大连接数，非必须'
                },
                {
                    key: 'fetch_size',
                    value: '连接是设置拉取批次的大小，非必须'
                },
            ],
            solrData: [{
                    key: 'solr_zk_url',
                    value: '连接solr的zk连接'
                },
                {
                    key: 'collection',
                    value: 'solr指定的collection'
                },
            ],
            hbaseData: [{
                    key: 'database_driver',
                    value: '数据库驱动'
                },
                {
                    key: 'jdbc_url',
                    value: '数据库连接url地址'
                },
                {
                    key: 'database_name',
                    value: '数据库名称'
                },
                {
                    key: 'database_pwd',
                    value: '数据库密码'
                },
                {
                    key: 'user_name',
                    value: '用户名'
                },
                {
                    key: 'increment_engine',
                    value: 'hbase算增量的执行引擎，本系统支持的参数为：hive、phoenix'
                },
                {
                    key: 'platform',
                    value: 'hadoop平台的版本，本系统支持填写参数为： normal、fic50、fic60、fic80、cdh5_13'
                },
                {
                    key: 'hadoop_user_name',
                    value: '操作hdfs的用户名'
                },
                {
                    key: 'prncipal_name',
                    value: '集群认证名称'
                },
                {
                    key: 'zkhost',
                    value: 'solr的zookeeper配置'
                },
                {
                    key: 'keytab_user',
                    value: '集群有Kerberos认证，认证用户名称,可以不填'
                },
                {
                    key: 'keytab_file',
                    value: 'kerberos认证文件名称,上传文件参数项'
                },
                {
                    key: 'hbase-site.xml',
                    value: 'hadoop集群hbase配置文件'
                },
                {
                    key: 'hdfs-site.xml',
                    value: 'hadoop集群hdfs配置文件'
                },
            ],
            hiveData: [{
                    key: 'database_driver',
                    value: '数据库驱动'
                },
                {
                    key: 'jdbc_url',
                    value: '数据库连接url地址'
                },
                {
                    key: 'database_name',
                    value: '数据库名称'
                },
                {
                    key: 'database_pwd',
                    value: '数据库密码'
                },
                {
                    key: 'user_name',
                    value: '用户名'
                },
                {
                    key: 'database_code',
                    value: '数据库的编码，本系统支持的参数为： UTF-8、GBK、UTF-16、GB2312、ISO-8859-1,支持外部表时使用'
                },
                {
                    key: 'external_root_path',
                    value: '指定sftp文件到数据库服务器所在主机的根目录,支持外部表时使用'
                },
                {
                    key: 'platform',
                    value: 'hadoop平台的版本，本系统支持填写参数为： normal、fic50、fic60、fic80、cdh5_13，支持外部表时使用'
                },
                {
                    key: 'hadoop_user_name',
                    value: '操作hdfs的用户名，支持外部表时使用'
                },
                {
                    key: 'prncipal_name',
                    value: '集群认证名称，支持外部表时使用'
                },
                {
                    key: 'keytab_user',
                    value: '集群有Kerberos认证，认证用户名称,可以不填，支持外部表时使用'
                },
                {
                    key: 'keytab_file',
                    value: 'kerberos认证文件名称,上传文件参数项，支持外部表时使用'
                },
                {
                    key: 'hdfs-site.xml',
                    value: 'hadoop集群hdfs配置文件，支持外部表时使用'
                },
                {
                    key: 'core-site.xml',
                    value: 'hadoop集群核心配置文件，支持外部表时使用'
                },
            ],
            elasticSearchDaa: [],
            mongodbData: [],
            carBonData: [{
                    key: 'database_driver',
                    value: '数据库驱动'
                },
                {
                    key: 'jdbc_url',
                    value: '数据库连接url地址'
                },
                {
                    key: 'database_name',
                    value: '数据库名称'
                },
                {
                    key: 'database_pwd',
                    value: '数据库密码'
                },
                {
                    key: 'user_name',
                    value: '用户名'
                },
            ],
        }
    },
    created() {
        this.getCategoryItems("Store_type");
        this.getCategoryItems("StoreLayerAdded");
        this.getCategoryItems("IsFlag");
        this.searchDataLayerDataTypeLengthInfo();
        this.searchDataLayerDataTypeInfo();
    },
    methods: {
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "Store_type") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.storeType = res.data;
                    });
            } else if (e == "StoreLayerAdded") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.checkboxType = res.data;
                    });
            } else if (e == "IsFlag") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.YesNo = res.data;
                    });
            } else if (e == "DatabaseType") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.databaseType = res.data;
                    });
            }
        },
        // 根据存储类型动态显示key
        changedata(store_type) {
            this.$refs.form.clearValidate();
            this.storeType.forEach(element => {
                if (element.code == store_type) {
                    this.store_type_ch = element.value;
                }
            });
            // 根据是否外部表查询存储层属性数据
            this.changeHadoopclient()

        },
        // 改变hadoop客户端（是否外部表）
        changeHadoopclient(is_hadoopclient) {
            if (this.form.store_type != undefined && this.form.store_type != '') {
                this.fileArry = [];
                if (is_hadoopclient == '1') {
                    // 支持外部表
                    if (this.form.store_type != '1') {
                        // 只有非关系型数据库时调用此方法
                        this.getExternalTableAttrKey(is_hadoopclient, this.form.store_type);
                    } else {
                        // 关系型数据库数据库类型切换
                        this.getAttrKeyByDatabaseType(this.database_type)
                    }
                } else {
                    // 不支持外部表
                    this.getDataLayerAttrKey(this.form.store_type, this.database_type);
                }
            }
        },
        // 获取支持外部表的属性key值
        getExternalTableAttrKey(is_hadoopclient, store_type, database_type) {
            this.database_type = database_type;
            functionAll.getExternalTableAttrKey({
                store_type: store_type,
                is_hadoopclient: is_hadoopclient
            }).then(res => {
                if (res && res.success) {
                    this.dataProcessing(res.data, this.form.store_type, database_type);
                }
            })
        },
        // 根据存储层类型获取数据存储层配置属性key
        getDataLayerAttrKey(store_type, database_type) {
            this.database_type = database_type;
            functionAll.getDataLayerAttrKey({
                store_type: store_type
            }).then(res => {
                if (res && res.success) {
                    this.dataProcessing(res.data, store_type, database_type);
                }
            })
        },
        // 根据数据库类型获取数据存储层配置属性key
        getAttrKeyByDatabaseType(database_type) {
            this.database_type = database_type;
            if (this.form.is_hadoopclient == '1' && database_type != undefined && database_type != '') {
                // 只有当支持外部表时才调用此方法
                functionAll.getAttrKeyByDatabaseType({
                    store_type: this.form.store_type,
                    is_hadoopclient: this.form.is_hadoopclient,
                    database_type: database_type
                }).then(res => {
                    if (res && res.success) {
                        this.dataProcessing(res.data, this.form.store_type, database_type);
                    }
                })
            }
        },
        // 处理存储层属性数据
        dataProcessing(data, store_type, database_type) {
            let arry = [];
            for (let i = 0; i < data.jdbcKey.length; i++) {
                let obj = {
                    'storage_property_key': data.jdbcKey[i],
                    'is_file': '0'
                };
                if (data.jdbcKey[i] == "database_type") {
                    this.getCategoryItems("DatabaseType");
                    if (database_type != undefined && database_type != '') {
                        obj['storage_property_val'] = database_type;
                    }
                    arry.unshift(obj)
                } else {
                    arry.push(obj)
                }
            }
            for (let j = 0; j < data.fileKey.length; j++) {
                arry.push({
                    'storage_property_key': data.fileKey[j],
                    'is_file': '1'
                })
            }
            // 赋值给表格
            this.form.tableData = arry;
            this.numberCount = this.form.tableData.length;
            this.showAddBtn = true;
            if (store_type === "1") { // 关系型数据库
                this.showAddFileBtn = false;
                this.storageLayerParamInfo = this.databaseData;
            } else if (store_type === "2") { // hive
                this.showAddFileBtn = true;
                this.storageLayerParamInfo = this.hiveData;
            } else if (store_type === "3") { // hbase
                this.showAddFileBtn = true;
                this.storageLayerParamInfo = this.hbaseData;
            } else if (store_type === "4") { // solr
                this.showAddFileBtn = false;
                this.storageLayerParamInfo = this.solrData;
            } else if (store_type === "5") { // elasticSearch
                this.showAddFileBtn = false;
                this.storageLayerParamInfo = this.elasticSearchData;
            } else if (store_type === "6") { // mongodb
                this.showAddFileBtn = false;
                this.storageLayerParamInfo = this.mongodbData;
            } else if (store_type === "7") { // carbondata
                this.showAddFileBtn = false;
                this.storageLayerParamInfo = this.carBonData;
            }
        },
        // 添加行数据
        addTableData(is_file) {
            this.form.tableData.push({
                storage_property_key: "",
                storage_property_val: "",
                dsla_remark: "",
                is_file: is_file
            });
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            this.form.tableData.splice(index, 1);
            if (row.is_file == '1') {
                let index = this.fileArry.findIndex(item => item.name == this.dataKey);
                this.fileArry.splice(index, 1);
            }
        },
        // 点击保存添加
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.form.store_type == 3 || this.form.store_type == 2) {
                        if (this.form.tableData.length > 0) {
                            // 处理参数
                            this.change_storelayer = [];
                            this.form.dsla_storelayer.forEach((item) => {
                                if (item == "主键") {
                                    this.change_storelayer.push("01");
                                } else if (item == "rowkey") {
                                    this.change_storelayer.push("02");
                                } else if (item == "索引列") {
                                    this.change_storelayer.push("03");
                                } else if (item == "预聚合列") {
                                    this.change_storelayer.push("04");
                                } else if (item == "排序列") {
                                    this.change_storelayer.push("05");
                                } else if (item == "分区列") {
                                    this.change_storelayer.push("06");
                                } else if (item == "Solr列") {
                                    this.change_storelayer.push("07");
                                }
                            })

                            let param = new FormData() // 创建form对象
                            param.append('dsl_name', this.form.dsl_name);
                            param.append('store_type', this.form.store_type);
                            param.append('is_hadoopclient', this.form.is_hadoopclient);
                            if (this.form.dsl_remark != undefined) {
                                param.append('dsl_remark', this.form.dsl_remark);
                            } else {
                                param.append('dsl_remark', '');
                            }
                            if (this.form.dslad_remark != undefined) {
                                param.append('dslad_remark', this.form.dslad_remark);
                            } else {
                                param.append('dslad_remark', '');
                            }
                            this.form.tableData.forEach(item => {
                                item['is_file'] = 0;
                            })
                            // 处理参数dataStoreLayerAttr
                            // 如果是hbase
                            if (this.form.store_type == 3) {
                                let arrtable = [];
                                this.form.tableData.forEach(item => {
                                    if (item.storage_property_val) {
                                        arrtable.push(item);
                                        item['is_file'] = 0;
                                    }
                                })
                                arrtable.forEach((item) => {
                                    if (item.radio) {
                                        delete item.radio
                                    }
                                })
                                arrtable = [...arrtable, ...this.markArrindex]
                                param.append('dataStoreLayerAttr', JSON.stringify(arrtable));
                            } else if (this.form.store_type == 2) {
                                let arrtable = [];
                                for (let i = 0; i < this.form.tableData.length; i++) {
                                    if (this.form.tableData[i].storage_property_val) {
                                        arrtable.push(this.form.tableData[i]);
                                        this.form.tableData[i].is_file = "0";
                                    }
                                }
                                arrtable = [...arrtable, ...this.markArrindex]
                                param.append('dataStoreLayerAttr', JSON.stringify(arrtable));
                            }

                            //    处理参数dsla_storelayer
                            for (let index = 0; index < this.change_storelayer.length; index++) {
                                param.append('dsla_storelayer', this.change_storelayer[index])
                            }
                            param.append('dtcs_id', this.form.dtcs_id);
                            param.append('dlcs_id', this.form.dlcs_id);
                            if (this.fileArry.length > 0) {
                                for (let index = 0; index < this.fileArry.length; index++) {
                                    param.append('files', this.fileArry[index]);
                                };
                            }
                            functionAll.addDataStore(
                                param
                            ).then((res) => {
                                if (res && res.success) {
                                    message.saveSuccess(res);
                                    this.$router.push({
                                        name: "dataStoreActionIndex"
                                    })
                                }
                            })
                        }

                    } else {
                        if (this.form.tableData.length > 0) {
                            // 处理参数
                            this.change_storelayer = [];
                            this.form.dsla_storelayer.forEach((item) => {
                                if (item == "主键") {
                                    this.change_storelayer.push("01");
                                } else if (item == "rowkey") {
                                    this.change_storelayer.push("02");
                                } else if (item == "索引列") {
                                    this.change_storelayer.push("03");
                                } else if (item == "预聚合列") {
                                    this.change_storelayer.push("04");
                                } else if (item == "排序列") {
                                    this.change_storelayer.push("05");
                                } else if (item == "分区列") {
                                    this.change_storelayer.push("06");
                                } else if (item == "Solr列") {
                                    this.change_storelayer.push("07");
                                }
                            });
                            let param = new FormData() // 创建form对象
                            param.append('dsl_name', this.form.dsl_name);
                            param.append('store_type', this.form.store_type);
                            param.append('is_hadoopclient', this.form.is_hadoopclient);
                            if (this.form.dsl_remark != undefined) {
                                param.append('dsl_remark', this.form.dsl_remark);
                            } else {
                                param.append('dsl_remark', '');
                            }
                            if (this.form.dslad_remark != undefined) {
                                param.append('dslad_remark', this.form.dslad_remark);
                            } else {
                                param.append('dslad_remark', '');
                            }
                            this.form.tableData.forEach((item) => {
                                item['is_file'] = 0;
                            });
                            param.append('dataStoreLayerAttr', JSON.stringify(this.form.tableData));
                            //    处理参数dsla_storelayer
                            for (let index = 0; index < this.change_storelayer.length; index++) {
                                param.append('dsla_storelayer', this.change_storelayer[index])
                            }
                            param.append('dtcs_id', this.form.dtcs_id);
                            param.append('dlcs_id', this.form.dlcs_id);
                            param.append('files', '');
                            functionAll.addDataStore(
                                param
                            ).then((res) => {
                                if (res && res.success) {
                                    message.saveSuccess(res);
                                    this.$router.push({
                                        name: "dataStoreActionIndex"
                                    })
                                }
                            })
                        }
                    }
                }
            });
        },
        // 点击取消返回展示页面        
        cancelSave() {
            this.$router.push({
                name: "dataStoreActionIndex"
            })
        },
        // 获取数据类型长度信息
        searchDataLayerDataTypeLengthInfo() {
            functionAll.searchDataLayerDataTypeLengthInfo().then((res) => {
                let arr = res.data;
                res.data.forEach((item, index) => {
                    delete item.dlc_id;
                    delete item.dlc_type;
                    delete item.dlc_length;
                    delete item.dlcs_remark;
                    delete item.dlc_remark;
                })
                for (var i = 0; i < arr.length; i++) {
                    for (var j = i + 1; j < arr.length;) {
                        if (arr[i].dlcs_id == arr[j].dlcs_id && arr[i].dlcs_name == arr[j].dlcs_name) {
                            arr.splice(j, 1);
                        } else j++;
                    }
                }
                this.typeLengthinfo = arr;
            })
        },
        // 获取数据类型信息
        searchDataLayerDataTypeInfo() {
            functionAll.searchDataLayerDataTypeInfo().then((res) => {
                let arr = res.data;
                arr.forEach((item, index) => {
                    delete item.dtc_id;
                    delete item.target_type;
                    delete item.source_type;
                    delete item.dtcs_remark;
                    delete item.dtc_remark;
                })
                for (var i = 0; i < arr.length; i++) {
                    for (var j = i + 1; j < arr.length;) {
                        if (arr[i].dtcs_id == arr[j].dtcs_id && arr[i].dtcs_name == arr[j].dtcs_name) {
                            arr.splice(j, 1);
                        } else j++;
                    }
                }
                this.dataTypeinfo = arr;
            })
        },
        // 保存上传文件
        handleChange(file, fileList) {
            if (fileList.length > 1) {
                message.customizTitle("最多上传一条,请删除多余项", "warning");
            } else {
                if (this.dataKey == file.name) {
                    this.fileArry.push(file.raw);
                    let obj = {
                        storage_property_key: this.dataKey,
                        storage_property_val: file.name,
                        is_file: '1'
                    }
                    this.markArrindex.push(obj);
                } else {
                    let index = fileList.findIndex(item => item.name == file.name);
                    fileList.splice(index, 1);
                    message.customizTitle("文件选择失败,请选择与key命名相同的文件", "warning");
                }
            }
        },
        selectFile(index, row) {
            this.uploadindex = index;
            this.dataKey = row.storage_property_key;
        },
        // 删除上传文件
        removeFile(file, fileList) {
            if (this.fileArry.length != 0) {
                if (JSON.stringify(this.fileArry).indexOf(JSON.stringify(file)) != -1) {
                    this.fileArry.splice(file, 1);
                }
                fileList.forEach((item) => {
                    if (item.name != this.dataKey) {
                        message.customizTitle("请保留与key命名相同的文件", "warning");
                    }
                })
            }
        },
    }
}
</script>

<style scoped>
/* form边框 */
.dataStoreAction .partOne {
    border: 1px solid #e6e6e6;
    padding: 2%;
    width: 100%;
}

.dataStoreAction .dataSave {
    margin: 20px 0;
    color: #2196f3;
    font-size: 18px;
}

/* 按钮样式 */
.dataStoreAction .elButton {
    float: right;
    margin-top: 20px;
    margin-bottom: 20px;
}

.dataStoreAction .partTwoBtn {
    float: right;
    margin-top: 20px;
    margin-left: 15px;
}

/* span字体样式 */
.dataStoreAction .saveDataSpan {
    display: inline-block;
    margin-top: 20px;
    color: #2196f3;
    font-size: 18px;
}

/* table的input样式 */
.dataStoreAction .el-table>>>.el-form-item {
    margin-bottom: 17px !important;
}

.dataStoreAction .el-table>>>.el-form-item__content {
    margin-left: 0 !important;
}
</style>
