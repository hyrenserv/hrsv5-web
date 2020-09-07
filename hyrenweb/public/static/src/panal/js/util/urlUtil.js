//如果url中没有中文名
function getUrlParam_en(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!=null && r!="")   
    	return unescape(r[2]);   
    return null;  
}

//如果url中有中文名
function getUrlParam_cn(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!=null && r!="")   
        return decodeURI(r[2]);						//处理中文问题,如果被编码的有百分号，则会报错
    return null;  
      
}
