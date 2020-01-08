/**
 * @param {Object} res 返回的数据流
 * @param {String} fileName 设置的文件名称
 */
export function fileDownload(res, fileName) {
    this.fileName = fileName;
    const blob = new Blob([res]);
    if (window.navigator.msSaveOrOpenBlob) {
        // 兼容IE10
        navigator.msSaveBlob(blob, this.fileName);
    } else {
        //  chrome/firefox
        let aTag = document.createElement("a");
        // document.body.appendChild(aTag);
        aTag.download = this.fileName;
        aTag.href = URL.createObjectURL(blob);
        if (aTag.all) {
            aTag.click();
        } else {
            //  兼容firefox
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            aTag.dispatchEvent(evt);
        }
        URL.revokeObjectURL(aTag.href);
    }
}

/**
 * 树搜索测试数据
 */
export function getTreeNodeSearchInfo() {
    let res;
    return res = {
        "code": 200,
        "data": {
            "search_nodes": [{
                "agent_layer": "贴源层",
                "isParent": true,
                "rootName": "贴源层",
                "name": "贴源层",
                "description": "贴源层",
                "pId": "~0",
                "id": "贴源层",
                children: [{
                    "isParent": true,
                    "batch_id": "DCL_BATCH",
                    "rootName": "贴源层",
                    "name": "批量数据",
                    "description": "批量数据管理",
                    "pId": "DCL",
                    "source": "DCL_BATCH",
                    "id": "DCL_BATCH",
                    children: [{
                        "isParent": true,
                        "rootName": "贴源层",
                        "name": "lqcs",
                        "description": "lqcs",
                        "pId": "DCL_BATCH",
                        "source_id": "1000032545",
                        "source": "DCL_BATCH",
                        "id": "1000032545",
                        children: [{
                            "agent_type": "1",
                            "isParent": true,
                            "agent_id": "1000036215",
                            "rootName": "贴源层",
                            "classify_id": "1000036629",
                            "name": "斯蒂芬【S001】",
                            "show": true,
                            "description": "ceshi",
                            "pId": "1000036214",
                            "id": "1000036629",
                            "source": "贴源层"
                        },]
                    }, {
                        "isParent": true,
                        "rootName": "贴源层",
                        "name": "ceshi",
                        "description": "ceshi",
                        "pId": "DCL_BATCH",
                        "source_id": "1000036214",
                        "source": "DCL_BATCH",
                        "id": "1000036214",
                        children: [{
                            "agent_type": "1",
                            "isParent": true,
                            "agent_id": "1000036631",
                            "rootName": "贴源层",
                            "classify_id": "1000036633",
                            "name": "aaa【aaa】",
                            "show": true,
                            "description": "ceshi",
                            "pId": "1000036214",
                            "id": "1000036633",
                            "source": "贴源层"
                        }],
                    },]
                },]
            }, {
                "agent_layer": "加工层",
                "isParent": true,
                "rootName": "加工层",
                "name": "加工层",
                "description": "加工层",
                "pId": "~1",
                "id": "加工层",
                children: [{
                    "isParent": true,
                    "batch_id": "DCL_BATCH",
                    "rootName": "贴源层",
                    "name": "批量数据",
                    "description": "批量数据管理",
                    "pId": "DCL",
                    "source": "DCL_BATCH",
                    "id": "DCL_BATCH",
                    children: [{
                        "isParent": true,
                        "rootName": "贴源层",
                        "name": "lqcs",
                        "description": "lqcs",
                        "pId": "DCL_BATCH",
                        "source_id": "1000032545",
                        "source": "DCL_BATCH",
                        "id": "1000032545",
                        children: [{
                            "agent_type": "1",
                            "isParent": true,
                            "agent_id": "1000036215",
                            "rootName": "贴源层",
                            "classify_id": "1000036629",
                            "name": "斯蒂芬【S001】",
                            "show": true,
                            "description": "ceshi",
                            "pId": "1000036214",
                            "id": "1000036629",
                            "source": "贴源层"
                        },]
                    }, {
                        "isParent": true,
                        "rootName": "贴源层",
                        "name": "ceshi",
                        "description": "ceshi",
                        "pId": "DCL_BATCH",
                        "source_id": "1000036214",
                        "source": "DCL_BATCH",
                        "id": "1000036214",
                        children: [{
                            "agent_type": "1",
                            "isParent": true,
                            "agent_id": "1000036631",
                            "rootName": "贴源层",
                            "classify_id": "1000036633",
                            "name": "aaa【aaa】",
                            "show": true,
                            "description": "ceshi",
                            "pId": "1000036214",
                            "id": "1000036633",
                            "source": "贴源层"
                        }],
                    },]
                },]
            },]
        },
        "message": "OK",
        "success": true
    }

}

/**
 * 树菜单数据
 */
export function getTreeDataInfo() {
    let res;
    return res = {
        "code": 200,
        "data": {
            "tree_sources": [{
                "agent_layer": "DCL",
                "isParent": true,
                "rootName": "DCL",
                "name": "贴源层",
                "description": "贴源层",
                "pId": "~0",
                "id": "DCL"
            }, {
                "agent_layer": "DPL",
                "isParent": true,
                "rootName": "DPL",
                "name": "加工层",
                "description": "加工层",
                "pId": "~1",
                "id": "DPL"
            }, {
                "agent_layer": "DML",
                "isParent": true,
                "rootName": "DML",
                "name": "集市层",
                "description": "集市层",
                "pId": "~2",
                "id": "DML"
            }, {
                "agent_layer": "SFL",
                "isParent": true,
                "rootName": "SFL",
                "name": "系统层",
                "description": "系统层",
                "pId": "~3",
                "id": "SFL"
            }, {
                "agent_layer": "DQC",
                "isParent": true,
                "rootName": "DQC",
                "name": "管控层",
                "description": "管控层",
                "pId": "~4",
                "id": "DQC"
            }, {
                "agent_layer": "UDL",
                "isParent": true,
                "rootName": "UDL",
                "name": "自定义层",
                "description": "自定义层",
                "pId": "~5",
                "id": "UDL"
            }]
        },
        "data1": {
            "tree_sources": [{
                "isParent": false,
                "batch_id": "DCL_BATCH",
                "rootName": "DCL",
                "name": "批量数据",
                "description": "批量数据管理",
                "pId": "DCL",
                "source": "DCL_BATCH",
                "id": "DCL_BATCH"
            }, {
                "isParent": false,
                "rootName": "DCL",
                "name": "实时数据",
                "description": "实时数据管理",
                "pId": "DCL",
                "source": "DCL_KFK",
                "id": "kafka",
                "kafka_id": "kafka"
            }]
        },
        "message": "OK",
        "success": true
    }
}


/**
 * 我的申请记录
 */
export function getMyApplyRecord() {
    let res;
    return res = {
        "data": {
            "file_rs": [{
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "Desert.jpg",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1002",
                "file_md5": "ba45c8f60456a672e003a875e469d0eb",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "2",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "826 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "877197",
                "is_big_file": "2",
                "original_update_time": "103548",
                "file_suffix": "jpg",
                "file_id": "27b6aeb4-6543-45bd-8ef2-4ba6f3cb67b0",
                "original_name": "Desert.jpg",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/Desert.jpg",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "3",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "Hydrangeas.jpg",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1002",
                "file_md5": "bdf3bf1da3405725be763540d6601144",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "1",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "581 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "1720937",
                "is_big_file": "2",
                "original_update_time": "103548",
                "file_suffix": "jpg",
                "file_id": "45116d1c-73ff-4007-955a-21786f5d5dd6",
                "original_name": "Hydrangeas.jpg",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/Hydrangeas.jpg",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "2",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "SAT考试又起风波 部分10月报考生或被转考至明年.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "e6a4dd66e816f35317efebfa48ec1e2d",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "0",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "14.9 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2330043",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "62c010dc-3685-4aa7-9230-f695d5d31492",
                "original_name": "SAT考试又起风波 部分10...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/SAT考试又起风波 部分10月报考生或被转考至明年.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "2",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "Chrysanthemum.jpg",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1002",
                "file_md5": "076e3caed758a1c18c91a0e9cae3368f",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "0",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "859 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "644",
                "is_big_file": "2",
                "original_update_time": "103548",
                "file_suffix": "jpg",
                "file_id": "644382d7-d286-4836-b2d0-edb8ea9aa0f1",
                "original_name": "Chrysanthemum....",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/Chrysanthemum.jpg",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "3",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "马云：若中美经贸关系恶化，为美创造百万就业承诺作废.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "bd0efdfe62497a66b5c99627aa265dce",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "1",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "14.2 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2344346",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "6a5cc792-804b-489b-9d4c-8a68740a08f8",
                "original_name": "马云：若中美经贸关系恶化，为...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/马云：若中美经贸关系恶化，为美创造百万就业承诺作废.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "1",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "马云：若中美经贸恶化 为美创造百万就业承诺作废.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "d0c78bbd204ad55ed7efa3735049c1d8",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "2",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "16.3 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2357479",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "78bb7620-affb-4794-a36c-3624209074bd",
                "original_name": "马云：若中美经贸恶化 为美创...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/马云：若中美经贸恶化 为美创造百万就业承诺作废.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "2",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "6场9球5助攻!天体之王再发威 巴西国家队真不要.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "685b60b0fc883ab1f79783ed1d14bc7c",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "0",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "15.5 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2314619",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "899d96f2-0d59-4eb2-a1fd-8ffa7b839193",
                "original_name": "6场9球5助攻!天体之王再发...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/6场9球5助攻!天体之王再发威 巴西国家队真不要.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "3",
                "is_others_apply": '0'
            }]
        },
        "mete": {"message": "成功", "status": "ok"}
    }
}

/*
测试分类统计数据
 */
export function getFilesClassifyInfoData() {
    let res;
    return res = {
        "data": [
            {'file_type': '图片', 'sum_num': 8},
            {'file_type': '视频', 'sum_num': 3},
            {'file_type': '音频', 'sum_num': 4},
            {'file_type': '其他', 'sum_num': 6},
            {'file_type': '文档', 'sum_num': 5}
        ],
        // "data": {
        //     "data": {"fileClassifyInfo": {"name": ["图片", "视频", "音频", "其它", "文档"], "value": [19, 0, 0, 0, 54]}},
        //     "mete": {"message": "成功", "status": "ok"}
        // },
        "mete": {"message": "成功", "status": "ok"}
    }
}

/*
测试最近七天采集数据
 */
export function getSevenDayCollectFileSum() {
    let res;
    return res = {
        "data": [
            {'collectDate': '2019-12-06', 'collectSum': 8},
            {'collectDate': '2019-12-12', 'collectSum': 7},
            {'collectDate': '2019-12-13', 'collectSum': 5},
            {'collectDate': '2019-12-14', 'collectSum': 8}
        ],
        "mete": {"message": "成功", "status": "ok"}
    }
}

/*
测试最近3次采集文件数
 */
export function getLast3FileCollections() {
    let res;
    return res = {
        "data": {
            "topInfo": [{
                "storage_date": "20191212",
                "maxdate": "20191212103724",
                "collectdate": "2019-12-12 10:37:24",
                "count": "7",
                "fcs_name": "cs02",
                "storage_time": "103724"
            }, {
                "storage_date": "20191206",
                "maxdate": "20191206101208",
                "collectdate": "2019-12-06 10:12:08",
                "count": "8",
                "fcs_name": "cs01wenjian",
                "storage_time": "101208"
            }]
        }, "mete": {"message": "成功", "status": "ok"}
    }
}

/*
测试文件列表数据
 */
export function getResTestData() {
    let res;
    return res = {
        "data": {
            "pdffile_zh": "PDF文件",
            "yinpin": "1005",
            "other": "1006",
            "auth": ["1", "3"],
            "pdffile": "1013",
            "release": 3,
            "officefile": "1023",
            "shipin": "1004",
            "sum": 16,
            "wendang": "1003",
            "biaoshujufile": "1063",
            "yasuofile": "1043",
            "shipin_zh": "视频",
            "other_zh": "其它",
            "down": 4,
            "yinpin_zh": "音频",
            "xiazai_zh": "下载",
            "tupian_zh": "图片",
            "rizhifile": "1053",
            "chakan_zh": "查看",
            "all": "1001",
            "fabu": "3",
            "fabu_zh": "发布",
            "yasuofile_zh": "压缩文件",
            "biaoshujufile_zh": "表数据文件",
            "all_zh": "全部文件",
            "xiazai": "2",
            "chakan": "1",
            "file_rs": [{
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "Desert.jpg",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1002",
                "file_md5": "ba45c8f60456a672e003a875e469d0eb",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "0,1,1",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "826 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "877197",
                "is_big_file": "2",
                "original_update_time": "103548",
                "file_suffix": "jpg",
                "file_id": "27b6aeb4-6543-45bd-8ef2-4ba6f3cb67b0",
                "original_name": "Desert.jpg",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/Desert.jpg",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "2,3,1",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "Hydrangeas.jpg",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1002",
                "file_md5": "bdf3bf1da3405725be763540d6601144",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "1",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "581 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "1720937",
                "is_big_file": "2",
                "original_update_time": "103548",
                "file_suffix": "jpg",
                "file_id": "45116d1c-73ff-4007-955a-21786f5d5dd6",
                "original_name": "Hydrangeas.jpg",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/Hydrangeas.jpg",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "2",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "SAT考试又起风波 部分10月报考生或被转考至明年.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "e6a4dd66e816f35317efebfa48ec1e2d",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "0",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "14.9 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2330043",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "62c010dc-3685-4aa7-9230-f695d5d31492",
                "original_name": "SAT考试又起风波 部分10...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/SAT考试又起风波 部分10月报考生或被转考至明年.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "2",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "Chrysanthemum.jpg",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1002",
                "file_md5": "076e3caed758a1c18c91a0e9cae3368f",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "0",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "859 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "644",
                "is_big_file": "2",
                "original_update_time": "103548",
                "file_suffix": "jpg",
                "file_id": "644382d7-d286-4836-b2d0-edb8ea9aa0f1",
                "original_name": "Chrysanthemum....",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/Chrysanthemum.jpg",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "3",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "马云：若中美经贸关系恶化，为美创造百万就业承诺作废.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "bd0efdfe62497a66b5c99627aa265dce",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "1",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "14.2 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2344346",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "6a5cc792-804b-489b-9d4c-8a68740a08f8",
                "original_name": "马云：若中美经贸关系恶化，为...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/马云：若中美经贸关系恶化，为美创造百万就业承诺作废.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "1",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "马云：若中美经贸恶化 为美创造百万就业承诺作废.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "d0c78bbd204ad55ed7efa3735049c1d8",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "16.3 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2357479",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "78bb7620-affb-4794-a36c-3624209074bd",
                "original_name": "马云：若中美经贸恶化 为美创...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/马云：若中美经贸恶化 为美创造百万就业承诺作废.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "",
                "is_others_apply": '0'
            }, {
                "storage_date": "2019-12-12",
                "agent_id": "1000000023",
                "title": "6场9球5助攻!天体之王再发威 巴西国家队真不要.docx",
                "table_name": "",
                "collect_type": "2",
                "file_type": "1023",
                "file_md5": "685b60b0fc883ab1f79783ed1d14bc7c",
                "meta_info": "",
                "hbase_name": "file_hbase",
                "collect_set_id": "1000127667",
                "auth_type": "",
                "is_cache": "",
                "is_in_hbase": " ",
                "original_update_date": "20191212",
                "seqencing": "0",
                "file_size": "15.5 KB",
                "file_avro_path": "/hyren/HRSDATA/hrds/DCL/2004759592/B000/1000127667/20191212/avro_53515162-c00c-4a49-9eed-87a27bd99c8c",
                "storage_time": "10:37:24",
                "file_avro_block": "2314619",
                "is_big_file": "2",
                "original_update_time": "103622",
                "file_suffix": "docx",
                "file_id": "899d96f2-0d59-4eb2-a1fd-8ffa7b839193",
                "original_name": "6场9球5助攻!天体之王再发...",
                "source_path": "/home/hyshf/huangxin/huangxin/shuju/data1/6场9球5助攻!天体之王再发威 巴西国家队真不要.docx",
                "source_id": "1000000021",
                "folder_id": "",
                "apply_type": "1,2,3",
                "is_others_apply": '0'
            }],
            "look": 2,
            "wenbenfile_zh": "文本文件",
            "wendang_zh": "文档",
            "tupian": "1002",
            "rename": 0,
            "rizhifile_zh": "日志文件",
            "officefile_zh": "office文件",
            "wenbenfile": "1033"
        }, "mete": {"message": "成功", "status": "ok"}
    }
}
