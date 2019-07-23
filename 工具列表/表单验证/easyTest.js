/*
 * easyTest v1.0.8 简易的js表单验证控件 by小斌 
 * arr是类似这样的数组json或单个json 参数的话，
 * [{"event" : "name", "reg" : /^[0-9]*$/, "content" : "请输入正确的数字", "required" : true},{"event" : name, "reg" : /^[0-9]*$/, "content" : "请输入正确的数字", "required" : true}]
 * {"event" : "name", "reg" : /^[0-9]*$/, "content" : "请输入正确的数字", "required" : true}
 * options是一些参数的json集合  比如：{"type":0}   现在就这个参数了
 * end是回调函数
 * 本工具是不需要依赖jq的
 */
var easyTest = function(arr,options,end){
	var type = typeof options === 'function';
	if(type) {end = options;options = {};}
	//这里把对应的options值赋值到默认default里面
	var def = {"errorTip":'defAlert'};extend(def,options);
	//设置弹出错误的方法
	var alert = typeof def.errorTip === 'function' ? def.errorTip : alertFunArr[def.errorTip];
	
	var arr = arr instanceof Array ? arr : (function(){var t = [];t.push(arr);return t;})();
	
	for(var i = 0; i < arr.length; i++) {
		var regEvent = arr[i];
		var events = document.getElementsByName(arr[i].event);
		var val = 0;
		if(events.length === 0)continue;
		//验证event类型
		if(events[0].type == "checkbox" || events[0].type == "radio"){
			//特殊类型
			for(var n = 0; n < events.length; n++) {
				var event = events[n];
				if(event.checked) val++;
			}
			if(!val) return alert(regEvent.content,events);
		} else if(events[0].tagName === "select".toUpperCase()){
            //特殊类型select,通过值是否等于-1来判断select 新增了假如select的值为空也会被判定为-1
            for (var n = 0; n < events.length; n++) {
                var event = events[n];
                if (event.value !== "-1" && event.value !== '') val++;
            }
            if (events.length !== val) return alert(regEvent.content, events);
		} else {
			//普通表单类型
			for(var n = 0; n < events.length; n++) {
                var event = events[n];
                val = event.value;
				if(regEvent.required && !val){
					return alert(regEvent.content,events[n]);
				} else{
					//等于号等等，用于确认密码这些功能的
					if(regEvent.contrastEvent && regEvent.contrastMethod) {
						//TODO 用于对比的contrastEvent这个最好不要有多个，现在会对比一个的，即多对一的意思，多对多的比较可能不会做
						var contrastEvent = document.getElementsByName(regEvent.contrastEvent)[0];
						if(contrastEvent != undefined) {
							var contrastEvent_val = contrastEvent.value;
							switch(regEvent.contrastMethod)
							{
							case "=":
							  	if(val != contrastEvent_val) return alert(regEvent.content,events[n]);
								break;
							}
						}
					}
					if(regEvent.reg) {
						var reg = new RegExp(regEvent.reg);
						if(!reg.test(val)) {
							return alert(regEvent.content,events[n]);
						};
					}
				}
				
			}
		}
	}
	if(end) end();
	return true;
}


//填充方法
function extend(n1,n2){
	for(var n in n2){
		n1[n] = n2[n];
	}
	return n1;
}

/*
 * 写错误提示方法的时候需要return false;哦
 */
/*
 * 重写alert方法（去掉url） by小斌
 */
window.alertDef = function(name){
	var iframe = document.createElement("IFRAME");
	iframe.style.display="none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
	return false;
}

/*
 * 弹出提示框 小斌
 * 无乱写的方法，仅供参考
 */
function defAlert(msg){
	var toast = document.createElement("div");
	toast.id = "toast";
	toast.style = "display: none";
	var mask = document.createElement("div");
	mask.className = "mask";
	var toast_main = document.createElement("div");
	toast_main.className = "toast-main";
	var toast_main__content = document.createElement("p");
	toast_main__content.className = "toast-main__content";
	var node=document.createTextNode(msg);
	toast_main__content.appendChild(node);
	toast_main.appendChild(toast_main__content);
	mask.appendChild(toast_main);
	toast.appendChild(mask);
	document.body.appendChild(toast);
	
	toast.style = "display: block";
    setTimeout(function () {
		toast.style = "display: node";
		document.body.removeChild(toast);
    }, 1500);
}
// $(event).focus()
//请把需要的错误弹出方法加在这个arr里面咯。
var alertFunArr = {defAlert:defAlert,alertDef:alertDef};

//一些很常用的正则表达式
//匹配小数位不超过2位的数值(限制在了千万内)  /^\d{0,8}\.{0,1}(\d{1,2})?$/
//手机号码通用正则表达式 /^1\d{10}$/  这是壹明里常用的(非严格模式)
//简易邮箱验证 /(\S)+[@]{1}(\S)+[.]{1}(\w)+/  //这里是壹明用的 /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
//字母，数字，下划线 6-20/^(\w){3,20}$/