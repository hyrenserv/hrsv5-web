;(function () {
	
	String.prototype.trim=function(){					//给String基本类型克隆属性
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
　　 }
　　 String.prototype.ltrim=function(){
　　    return this.replace(/(^\s*)/g,"");
　　 }
　　 String.prototype.rtrim=function(){
　　    return this.replace(/(\s*$)/g,"");
　　 }
 
	var MyPlugin = {}
	MyPlugin.install = function (Vue, options) {
	  // 1. 添加全局方法或属性
	  /*Vue.setUrlAllPara = function (urlKey,urlPara) {
		  urlAllPara += urlKey+"="+urlPara+"&";
	  }*/
	  // 2. 添加全局资源
	  /**
	   * 时间过滤器
	   * 参数：被过滤值、指定符号
	   * 如果没指定符号，则默认'-'
	   */
	  Vue.filter('dateFilter', function (input, uppercase) {
		uppercase = null == uppercase || 'undefined' == typeof(uppercase)? '-':uppercase ;
		
		if(input.length == 8){
	  		input = input.substring(0,4) + uppercase + input.substring(4,6) + uppercase + input.substring(6,8)
		}
		else if(input.length == 6){
	  		input = input.substring(0,2) + uppercase + input.substring(2,4) + uppercase + input.substring(4,6)
		}
			
		return input;
	  })
	  /**
	   * 空数据过滤器
	   * 参数：被过滤值、指定符号
	   * 如果没指定符号，则默认'--'
	   */
	  Vue.filter('emptyDataFilter', function (input,uppercase) {
		uppercase = null == uppercase || 'undefined' == typeof(uppercase)? '--':uppercase ;
		
		if(null == input || '' == String(input).trim()){
			return uppercase;
		}
		else return input;
		
	  })
	  /**
	   * 左空格过滤器
	   * 参数：被过滤值
	   * 去除左空格
	   */
	  Vue.filter('lTrimFilter', function (input) {
		  
		  if(null == input){
			  return '';
		  }
		  else return String(input).ltrim();
		  
	  })
	  /**
	   * 右空格过滤器
	   * 参数：被过滤值
	   * 去除右空格
	   */
	  Vue.filter('rTrimFilter', function (input) {
		  
		  if(null == input){
			  return '';
		  }
		  else return String(input).rtrim();
		  
	  })
	  /**
	   * 左右空格过滤器
	   * 参数：被过滤值
	   * 去除左右空格
	   */
	  Vue.filter('trimFilter', function (input) {
		  
		  if(null == input){
			  return '';
		  }
		  else return String(input).trim();
		  
	  })
	  /**
	   * json过滤器
	   * 传入json字符串、json对应的key值
	   * 如果key值为空，则返回json对象
	   * 如果key值不为空，则返回json对象中对应的key的value
	   */
	  Vue.filter('jsonFilter', function (input,key) {
		key = null == key || 'undefined' == typeof(key)? '':key ;
		
		if(null == input || 'undefined' == typeof(input)){
			return '';
		}
		var json = eval("("+input+")");
		if(null == key || 'undefined' == typeof(key)){
			return json;
		}
		
		return json[key]
	  })
	  /**
	   * byte单位过滤器
	   * 参数：被过滤值
	   * 转换B为各种格式（KB,MB,GB）
	   */
	  Vue.filter("filterByte",function(bytes){						//自定义过滤器,处理byte
		  if( 'undefined' == typeof(bytes) ) return;
			
		  if (bytes == 0.00) return '0 B';
		  
		  var k = 1024, // or 1024
		  sizes = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ], 
		  i = Math.floor(Math.log(bytes) / Math.log(k));
		  
		  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	  })
	  /**
	   * jsonArray根据指定key转换为以逗号分隔的String
	   */
	  Vue.filter("jsonArray2Str",function(array, key){						
		  if( 'undefined' == typeof(array) || 'undefined' == typeof(key) ) return;
		  var result = "";
		  for(temp in array){
			  result += array[temp][key] + ",";
		  }
		  return result.substr(0, result.length - 1);
	  })
	  // 3. 注入组件
	  Vue.mixin({
	    created: function () {
	    }
	  })
	  // 4. 添加实例方法
	  /*Vue.prototype.updateStep = function (url,el) {
		  urlAllPara = urlAllPara.substr(0,urlAllPara.length-1);
		  window.location.href=url+urlAllPara;
		  //$(el.parentNode).addClass("active");
	  }*/
	}
	
	if (typeof exports == "object") {
	    module.exports = MyPlugin
	} else if (typeof define == "function") {
	    define([], function(){ return MyPlugin })
	} else if (window.Vue) {
	    window.DataFilter = MyPlugin
	    Vue.use(MyPlugin)
	}
	
}())
