function coverShow_para(text,val){
	$("#tipModal").modal('show');
	var array = [];
	if (typeof val != 'undefined') {
		val = val+",";
		array = val.split(',');
	}
	$('#tipModal .modal-body h4').text($.i18n.prop(text,array));//$.i18n.prop(text) 为页面弹框消息类，text为properties中的key
	setTimeout(function(){$("#tipModal").modal('hide');}, 1500);
}
function coverShow(text){
	$("#tipModal").modal('show');
	$('#tipModal .modal-body h4').text($.i18n.prop(text));//$.i18n.prop(text) 为页面弹框消息类，text为properties中的key
	setTimeout(function(){$("#tipModal").modal('hide');}, 1500);
}
function coverShowOther(text){
	$("#tipModal").modal('show');
	$('#tipModal .modal-body h4').text($.i18n.prop(text));//$.i18n.prop(text) 为页面弹框消息类，text为properties中的key
}
function coverShowcommon(text){
	$("#tipModal2").modal('show');
	$('#tipModal2 .modal-body h4').text($.i18n.prop(text));//$.i18n.prop(text) 为页面弹框消息类，text为properties中的key
}
// ajax回调函数弹框方法
function coverShowData(text){
	$("#tipModal").modal('show');
	$('.modal-body h4').text(text);
	setTimeout(function(){$("#tipModal").modal('hide');}, 1500);
}
// 使用jquery i18n读取配置文件公共方法，所有引用该页面调该方法读取配置文件
function loadProperties(path, language) {
    //	alert(navigator.language);
	var html = $('html')[0];
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	if(language == 'en_US'){
		newScript.src = path + "/js/jquery.validationEngine-en.js";
	}else {		//默认中文
		newScript.src = path + "/js/jquery.validationEngine-zh_CN.js";
	}
//	console.log(newScript.src);
//	console.log(newScript);
	html.appendChild(newScript);
	
    $.i18n.properties({
        name: 'messages',
        path: path + '/jsp/i18n/',
        mode: 'map',
        language: language,
        callback: function() {
            // 将页面的 id设置成data-locale, data-locale的值设置成配置文件中的key值 
            $("[data-locale]").each(function() {
                var val = $(this).data("value");
                var array = [];
                if (typeof val != 'undefined') {
                    array = val.split(',');
                }
                $(this).text($.i18n.prop($(this).data("locale"), array));
            });
            // 将input id设置成data-placeholder, data-placeholder的值设置成配置文件中的key值
            $("[data-placeholder]").each(function() {
                //$.i18n.prop($(this).data("placeholder")))中的placeholder值 需与data-placeholder的"-" 后名称一致
                $(this).attr("placeholder", $.i18n.prop($(this).data("placeholder")));
            });
            $("[data-title]").each(function() {
            	$(this).attr("title", $.i18n.prop($(this).data("title")));
            });
        }
    });
}	
//页面国际化
//$(document).ready(function() {
//	loadProperties();
//});
var img = $("#progressImgage"); 
var mask = $("#maskOfProgressImage");
//SDO加载时的方法
function imgShow(){
    img.show().css({ 
      "position": "fixed", 
      "top": "40%", 
      "left": "45%", 
      "margin-top": function () { return -1 * img.height() / 2; }, 
      "margin-left": "0px" 
    }); 
    mask.show().css("opacity", "0.1"); 
	}
	function imgHide(){
	img.hide(); 
	mask.hide();
	}
	
	////////////////////////////////搜索///////////////////////////
	var searchHtml = '<form class="form-inline" id="form5" autocomplete="off">';
	searchHtml +=	'<div class="form-group pull-left" style="margin-top:10px;padding-left:10px">';
	searchHtml +=		'<div class="input-group">';
	searchHtml +=			'<input type="text" class="form-control input-sm" data-id="tree" id="search_value" onkeyup="searchNodeLazy(search_value.value,this)" placeholder="搜索名称" data-placeholder="sousuomingcheng">';
	searchHtml +=			'<a href="#" class="input-group-addon btn btn-sm btn-primary" data-id="tree" onclick="searchTableVal(search_value.value,this);" data-locale="search">搜索</a>'
	searchHtml +=		'</div>';
	searchHtml +=	'</div>';
	searchHtml +='</form><div class="clearfix"></div>';
	var searchHtml2 = '<form class="form-inline" id="form6" autocomplete="off">';
	searchHtml2 +=	'<div class="form-group pull-left" style="margin-top:10px;padding-left:10px">';
	searchHtml2 +=		'<div class="input-group">';
	searchHtml2 +=			'<input type="text" class="form-control input-sm" data-id="tree1" id="search_value2" onkeyup="searchNodeLazy(search_value2.value,this)" data-placeholder="sousuomingcheng" placeholder="搜索名称">';
	searchHtml2 +=			'<a href="#" class="input-group-addon btn btn-sm btn-primary" data-id="tree1" onclick="searchTableVal(search_value2.value,this);" data-locale="search">搜索</a>';
	searchHtml2 +=		'</div>';
	searchHtml2 +=	'</div>';
	searchHtml2 +='</form><div class="clearfix"></div>';
	
$(function(){
	$(searchHtml).insertBefore('#tree');
	$(searchHtml2).insertBefore('#tree1');
	//loadProperties();
})
	
function searchTableVal(val, e) {	
	var id = $(e).data('id');
	$.ajax({
		type : 'POST',
		url : '<c:out value="${ctx}"/>/hmfms/service/commons/searchNodeSDO.do',
		data : {
			tableName : val,
			arr : JSON.stringify(arr),
			isShTable : true,
			isFileCo : false,
			isUse : true
		},
		async : true,//异步请求
		dataType : 'json',
		success : function(data) {
			zTreeObj = $.fn.zTree.init($("#" + id), setting, data);
	        searchNode(val);
		}
	});
};

	// 模糊搜索name满足条件的节点
function searchNode(value) {
	if (value == "") return;
	// 获取搜索的节点   中文表名信息
	var nodes = zTreeObj.getNodesByParamFuzzy("name", value);
	//英文表名
	var tablename = zTreeObj.getNodesByParamFuzzy("tablename", value);
	// 关闭所有节点的高亮
	var allNodes = zTreeObj.transformToArray(zTreeObj.getNodes());
	for (var i = 0; i < allNodes.length; i ++) {
		allNodes[i].highlight = false;
		zTreeObj.updateNode(allNodes[i]);
	}
	// 全部关闭
	zTreeObj.expandAll(false);
	// 高亮并展开搜索到的节点
	for (var i = 0; i < nodes.length; i ++) {
		nodes[i].highlight = true;
		zTreeObj.updateNode(nodes[i]); // 更新节点，让高亮生效
		// 先展开第一层节点
		zTreeObj.expandNode(zTreeObj.getNodes()[0],true);
		// 再展开搜索到的节点
		zTreeObj.expandNode(nodes[i].getParentNode(),true);
	}
	for (var i = 0; i < tablename.length; i ++) {
		tablename[i].highlight = true;
		zTreeObj.updateNode(tablename[i]); // 更新节点，让高亮生效
		// 先展开第一层节点
		zTreeObj.expandNode(zTreeObj.getNodes()[0],true);
		// 再展开搜索到的节点
		zTreeObj.expandNode(tablename[i].getParentNode(),true);
	}
}

// 设置高亮字体
function setHighlight(treeId, treeNode) {
    return (treeNode.highlight) ? {color:"green", "font-weight":"bold", "background-color": "#ddd"} : {color:"#000", "font-weight":"normal"};
}

// 延时搜索，用于输入框的按键事件，如果不延时，树就会不断的跳动
var timeoutId = null;
function searchNodeLazy(value,e) {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(function(){
		searchTableVal(value,e);	
	}, 500);
}