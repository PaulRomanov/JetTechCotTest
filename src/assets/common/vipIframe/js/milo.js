/**
 * @author cathzhang 
 * @version 0.1.0.0 
 * @date 2011-05-12 
 * @demo http://gameact.qq.com/milo/core/base.html
 * @class milo.base  
 * <p>
 * 方法集主要包括：namespace、extend相关方法、is判断对象系列<br/>
 * 本类中所有方法被绑定到window对象中，可直接对方法名进行调用。<br/>
 * </p>
 * <p>
 * Example code:
 * <pre><code>
var a;
console.log(isUndefined(a));    //true
var b= new Array(1,2);
console.log(isUndefined(b));    //false
console.log(isUndefined(b[4])); //true
 *</code></pre>
 * </p>
 * <p>
 * 创建子类：
 * <pre><code>
var cal1 = cloneClass(Calendar);
var cal2 = cloneClass(Calendar);
 * </code></pre>

 * </p> 
 --------
* @author marsboyding
* 1 新增isSafeUrl方法
* 2 新增异步登录态相关操作方法
 */
/**
 * 处理命名空间
 * @param {string} 空间名称，可多个 
 * @return {object} 对象
 */	

//标志是否强制使用bundle版本
//灰度期间，不使用bundle版本
window.useBundleVersion=false;

if(location.href.indexOf('useBundleVersion=1')>-1){
	window.useBundleVersion=true;//优先取url参数
}else if(location.href.indexOf('useBundleVersion=0')>-1){//优先取url参数
	window.useBundleVersion = false;
}else if('undefined' !== typeof window.useBundleVersion){//再取全局变量
	window.useBundleVersion=!!window.useBundleVersion;
}else{
	window.useBundleVersion=true;//默认开启
}

/*bundle-file-useBundleVersion*/

var _defineMethodName=(window.useBundleVersion?'defineconflict':'define');
  
namespace = function(){
    var argus = arguments;
    for(var i = 0; i < argus.length; i++){
        var objs = argus[i].split(".");
		var obj = window;
        for(var j = 0; j < objs.length; j++){
            obj[objs[j]] = obj[objs[j]] || {};
            obj = obj[objs[j]];
        }
    }
    return obj;
};

namespace("milo.base");

(function(){
	/**
	 * 为对象进行扩展属性和方法
	 * @param {object} object 对象
	 * @return {bool} 是/否
	 */	 
	milo.base.extend = function(destination, source) {
		if (destination == null) {
			destination = source
		}
		else {
			for (var property in source){		
				if ( getParamType(source[property]).toLowerCase() === "object" && 
					getParamType(destination[property]).toLowerCase() === "object" )
						extend(destination[property], source[property])
				else
					destination[property] = source[property];
			}
		}
		return destination;
	}
	
	milo.base.extendLess = function(destination, source) {
		var newopt = source;
		for (var i in destination) {
			if (isObject(source) && typeof(source[i]) != 'undefined') {
				destination[i] = newopt[i]
			}
		}
		return destination
	}
	
	/**
	 * 类式继承类
	 * @param {object} subClass 子类
	 * @param {object} superClass 基础类
	 * @return {undefined} 
	 */	
	milo.base.extendClass = function(subClass,superClass){
		var F = function(){};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		subClass.superclass = superClass.prototype;
		if (superClass.prototype.constructor == Object.prototype.constructor){
			superClass.prototype.constructor = superClass
		}
	}
	
	/**
	 * 原型继承类
	 * @param {object} object 基类
	 * @return {object} 生成的子类
	 */	 
	milo.base.cloneClass = function(object){		
		if(!isObject(object)) return object;
		if(object == null) return object;
		var F = new Object();
		for(var i in object)
			F[i] = cloneClass(object[i]);
		return F; 		
	}
	/**
	 * 绑定上下文
	 * @param {function,context} object
	 * @return {object}
	 */	 
	milo.base.bind = function(fn,context){		
		 return function(){
			 return fn.apply(context,arguments);
		 };		
	}

	milo.base.extend( milo.base, {
		/**
		 * 判断对象是否定义
		 * 其实只对对象中的元素判断有效，如是纯变量，此方法会无法调用，需要外面加try
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isUndefined : function(o){ 
    		 	return o === undefined && typeof o == "undefined";
    	},
		/**
		 * 判断对象是否数组
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isArray : function(obj) {
			return getParamType(obj).toLowerCase() === "array";
		},		
		/**
		 * 判断对象是否函数
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isFunction : function(obj){
			return getParamType(obj).toLowerCase() === "function";
		},		
		/**
		 * 判断对象是否对象
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isObject : function(obj) {
			return getParamType(obj).toLowerCase() === "object";
		},
		/**
		 * 判断对象是否数值
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isNumber : function(obj) {
			return getParamType(obj).toLowerCase() === "number";
		},
		/**
		 * 判断对象是否字符串
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isString : function(obj) {
			return getParamType(obj).toLowerCase() === "string";
		},
		/**
		 * 判断是否布尔值
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isBoolean : function(obj) {
			return getParamType(obj).toLowerCase() === "boolean";
		},
		/**
		 * 判断对象是否日期
		 * @param {object} object 对象
		 * @return {bool} 是/否
		 */
		isDate : function(obj){
			return getParamType(obj).toLowerCase() === "date";
		},
		
		/**
		 * 判断对象是否DOM元素
		 * @param {object} obj DOM对象
		 * @return {bool} 是/否
		 */
		isDom : function(obj){
    		try{
    			return obj && typeof obj === "object" && !isUndefined(obj.nodeType) && obj.nodeType==1 && !isUndefined(obj.nodeName) && typeof obj.nodeName == "string";
    		}
    		catch(e){
    			//console.log(e)
    			return false;
    		}
    	},
    	
		/**
		 * 获取DOM对象的值
		 * @param {object} obj DOM对象
		 * @return {string} 取value或innerHTML
		 */
    	getDomVal : function(obj){
    		return obj.value || obj.innerHTML;
    	},
		/**
		 * 索引序列
		 * @param {serial,function} 数组或对象集合
		 * @return {undefined}
		 */
    	forEach : function(haystack, callback) {
			var i = 0,
				length = haystack.length,
				name;

			if (length !== undefined) {
				for (; i < length;) {
					if (callback.call(haystack[i], i, haystack[i++]) === false) {
						break;
					}
				}
			} else {
				for (name in haystack) {
					callback.call(haystack[name], name, haystack[name]);
				}
			}
		},
    	/**
		 * 获取dom对象
		 * @param {string|dom} dom的id或对象k
		 * @return {dom} 
		 */
		g : function(obj){
			return (typeof obj=='object')?obj:document.getElementById(obj);
		}
	});
	
	/**
	 * 获取对象类型
	 * @private
	 * @param {object} object 对象
	 * @return {string} 类型
	 * 可判断类型：Boolean Number String Function Array Date RegExp Object
	 */	
	function getParamType(obj){
		return obj == null ? String(obj) : 
			Object.prototype.toString.call(obj).replace(/\[object\s+(\w+)\]/i,"$1") || "object";
	}	
})();

milo.base.extend(window, milo.base); 



/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-08-01
 * @class milo.dom  
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * modified:2011-12-27 增加tt,chrome等浏览器的判断
 * modified:2011-12-27 增加getX,getY方法
 * <p>
 * Example:
 * <pre><code>
console.log(milo.browser.version) //1.9.2.23
console.log(milo.browser.msie)    //false
 *</code></pre>
 * </p>
 */
 
namespace("milo.dom");

(function(){
var dom = milo.dom;

var userAgent = navigator.userAgent.toLowerCase();

extend( dom, {
	/**
	 * 判断浏览器类型
	 */
	browser : {
		/**
		 * 获取版本号
		 */
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
		/**
		 * 是否webkit浏览器
		 */
		webkit: /webkit/.test( userAgent ),
		/**
		 * 是否opera浏览器
		 */
		opera: /opera/.test( userAgent ),
		/**
		 * 是否IE浏览器
		 */
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
		/**
		 * 是否mozilla浏览器
		 */
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ),
		/**
		 * 是否TT浏览器
		 */
		tt: /tencenttraveler/.test( userAgent ),
		/**
		 * 是否chrome浏览器
		 */
		chrome: /chrome/.test( userAgent ),
		/**
		 * 是否firefox浏览器
		 */
		firefox: /firefox/.test( userAgent ),
		/**
		 * 是否safari浏览器
		 */
		safari: /safari/.test( userAgent ),
		/**
		 * 是否gecko浏览器
		 */
		gecko: /gecko/.test( userAgent ),
		/**
		 * 是否IE6
		 */
		ie6: this.msie && this.version.substr(0,1) == '6'
	
	},
	
	/**
	 * 获取dom对象
	 * @param {string|dom} dom的id或对象
	 * @return {dom} 
	 */
	g : function(obj){
		return (typeof obj=='object')?obj:document.getElementById(obj);
	},
	
	/**
	 * 判断DOM对象是否存在样式类名称
	 * @param {dom} element dom对象
	 * @param {string} className 样式名称
	 * @return {bool} 
	 */	 
	hasClassName : function(element, className) {
        var elementClassName = element.className;
        return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
    },
	
	/**
	 * 为DOM对象增加样式类名称
	 * @param {dom} element dom对象
	 * @param {string} className 样式名称
	 * @return {dom} 
	 */
    addClassName : function(element, className) {
        if (!milo.hasClassName(element, className))
            element.className += (element.className ? ' ' : '') + className;
        return element;
    },
	
	/**
	 * 为DOM对象删除样式类名称
	 * @param {dom} element dom对象
	 * @param {string} className 样式名称
	 * @return {dom} 
	 */
    removeClassName : function(element, className) {
        element.className = milo.trim(element.className.replace(
			new RegExp("(^|\\s+)" + className + "(\\s+|$)") , ' '));
        return element;	
    },
	
	/**
	 * 为dom对象设置样式
	 * @param {dom} ele dom对象
	 * @param {object} styles 样式对象 like:{width:100,height:100}
	 * @return undefined
	 */
	setStyle: function(ele, styles){
		for (var i in styles) {
			ele.style[i] = styles[i];
		}
	},
	
	/**
	 * 为dom对象获取选定属性的样式
	 * @param {dom} ele dom对象
	 * @param {string} prop 属性名称
	 * @return 属性样式
	 */
	getStyle: function(el, prop){
		var viewCSS = isFunction(document.defaultView) //(typeof document.defaultView == 'function') 
			? document.defaultView() 
			: document.defaultView;
		if (viewCSS && viewCSS.getComputedStyle) {
			var s = viewCSS.getComputedStyle(el, null);
			return s && s.getPropertyValue(prop);
		}
		return (el.currentStyle && (el.currentStyle[prop] || null) || null);
	},
	
	/**
	 * 获取页面最大高度
	 * @return 属性样式
	 */
	getMaxH: function(){
		return (this.getPageHeight() > this.getWinHeight() ? this.getPageHeight() : this.getWinHeight())
	},
	
	/**
	 * 获取页面最大宽度
	 * @return 属性样式
	 */
	getMaxW: function(){
		return (this.getPageWidth() > this.getWinWidth() ? this.getPageWidth() : this.getWinWidth())
	},
	
	/**
	 * 网页内容高度
	 * @return {int} 网页内容高度
	 */
	getPageHeight: function(){
		var h = (window.innerHeight && window.scrollMaxY) ? (window.innerHeight + window.scrollMaxY) : (document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight);
		return h > document.documentElement.scrollHeight ? h : document.documentElement.scrollHeight
	},
	
	/**
	 * 网页内容宽度
	 * @return {int} 网页内容宽度
	 */
	getPageWidth: function(){
		return (window.innerWidth && window.scrollMaxX) ? (window.innerWidth + window.scrollMaxX) : (document.body.scrollWidth > document.body.offsetWidth ? document.body.scrollWidth : document.body.offsetWidth);
	},
	
	/**
	 * 浏览器可视区域高度
	 * @return {int} 网可视区域高度
	 */
	getWinHeight: function(){
		return (window.innerHeight) ? window.innerHeight : 
		(document.documentElement && document.documentElement.clientHeight) 
		? document.documentElement.clientHeight 
		: document.body.offsetHeight
	},
	
	/**
	 * 浏览器可视区域宽度
	 * @return {int} 网可视区域宽度
	 */
	getWinWidth: function(){
		return (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth
	},
	
	/**
	 * 设置dom透明度
	 * @param {dom} ele dom对象
	 * @param {int} level 透明度值（0-100的整数）
	 * @return {undefined} 
	 */	
	setOpacity: function(ele, level){
		//level = Math.min(1,Math.max(level,0));
		if(this.browser.msie && (!document.documentMode || document.documentMode < 9)){
			ele.style.filter = 'Alpha(opacity=' + level + ')'
		}else{
			ele.style.opacity = level / 100
		 }
    },
	/**
	 * 获取页面中对象的绝对X位置
	 * @param {dom} e dom对象
	 * @return {int} 
	 */	
	getX: function(e) {
		var t = e.offsetLeft;
		while (e = e.offsetParent) t += e.offsetLeft;
		return t
	},
	/**
	 * 获取页面中对象的绝对Y位置
	 * @param {dom} e dom对象
	 * @return {int} 
	 */	
	getY: function(e) {
		var t = e.offsetTop;
		while (e = e.offsetParent) t += e.offsetTop;
		return t
	},
	
	/**
	 * 获取url中的参数值
	 * @param {string} pa 参数名称
	 * @return {string} 参数值
	 */	
	request: function(pa){ 
		var url = window.location.href.replace(/#+.*$/, ''),
			params = url.substring(url.indexOf("?")+1,url.length).split("&"),
			param = {} ;
		for (var i=0; i<params.length; i++){  
			var pos = params[i].indexOf('='),//查找name=value  
				key = params[i].substring(0,pos),
				val = params[i].substring(pos+1);//提取value 
			param[key] = val;
		} 
		return (typeof(param[pa])=="undefined") ? "" : param[pa];
	} 
})
})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-07-21
 * @demo http://gameact.qq.com/milo/core/bases.html
 * @class milo.array 
 * 方法集主体来自于原有oss_base.js中为array对象添加的部分原型方法，<br/>
 * 修改情况如下：<br/>
 * 增加方法getLength,getArrayKey,hasValue,filter,unique<br/>
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
var a=['1','2','3','4'] ;
var b=['1','2','5','23432',2] ;
alert(milo.filter(a,b))  //["3","4"] 
var c = milo.unique(a,b)
alert(c);				 //输出["3","4",'5','23432'] 
 *</code></pre>
 * </p>
 
 */
 
namespace("milo.array");

(function(){
var array = milo.array;
extend( array, {
	/**
	 * 判断数组内容个数
	 * @param {array} array 对象
	 * @return {int} 长度
	 */
	getLength : function(arr){
		var l = 0;
		for(var key in arr){
			l ++;
		}	
		return l;
	},
	/**
	 * 复制数组
	 * @param {array} array 对象
	 * @return {array} 新数组对象
	 */
	clone : function(arr){
		var a = [];
		for(var i=0; i<arr.length; ++i) {
			a.push(arr[i]);
		}
		return a;
	},
	/**
	 * 判断数组中是否存在这个值
	 * @param {array} arr 数组对象
	 * @param {object} value 对象
	 * @return {bool} 是/否
	 */
	hasValue : function(arr, value){
		var find = false;
		if (isArray(arr) || isObject(arr))
			for(var key in arr){
				if (arr[key] == value) find = true;
			}
		return find;
	},
	/**
	 * 根据值获得数组中的key
	 * @param {array} arr 数组对象
	 * @param {object} value 对象
	 * @return {string} key
	 */
	getArrayKey : function(arr, value){
		var findKey = -1;
		if (isArray(arr) || isObject(arr))
			for(var key in arr){
				if (arr[key] == value) findKey = key;
			}
		return findKey;
	},
	/**
	 * 返回a1数组有a2没有的值
	 * @param {array} a1 数组对象
	 * @param {array} a2 数组对象
	 * @return {array} key
	 */
	filter : function (a1, a2) {
		var res = [];
		for(var i=0;i<a1.length;i++) {
			if(!milo.hasValue(a2, a1[i]))
				res.push(a1[i]);
		}
		return res;
	},
	/**
	 * 两个数组的值的交集
	 * @param {array} arr 数组
	 * @param {array} arr 数组
	 * @return {array} key
	 */
	unique : function (a1, a2) {
		return milo.filter(a1,a2).concat(milo.filter(a2,a1))
	} 
});
})();/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-07-21
 * @class milo.string 字符串类
 * 方法集主体来自于原有oss_base.js中为string对象添加的原型方法<br/>
 * 修改情况如下：<br/>
 * 删除方法replaceAll：使用正则/g可以搜出全部<br/>
 * 修改方法replacePairs：调用的replaceAll方法改为用replace方法，正则方法<br/>
 * 删除方法encode：编码直接可用escape<br/>
 * 删除方法unencode：解码直接可用unescape<br/>
 * 删除方法toInputValue: 与toHTML相差不大<br/>
 * 删除方法toTextArea: 与toHTML相差不大<br/>
 * 删除方法isEmpty: 意义不大，是否需要trim后判断length，这个需要实际需要来检验<br/>
 * 更名方法isAllNum为isNumberString<br/>
 * 移除方法isInt至milo.number类<br/>
 * 移除方法isFloat至milo.number类<br/>
 * 移除方法isQQ至milo.number类<br/>
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
milo.trim(" test ")
 *</code></pre>
 * </p> 
 */
 

/**
 * @author cathzhang
 * @version 0.1.0.0 
 * @date 2011-07-21
 * @class milo.date
 * 方法集主体来自于原有oss_base.js中为date对象添加的部分原型方法<br/>
 * 修改情况如下：<br/>
 * 重命名toShortDateString为toDateString<br/>
 * 重命名toShortString为toDateTimeString<br/> 
 * 本类中所有方法被绑定到milo对象中，通过对milo.方法名进行调用。<br/> 
 * <p>
 * Example:
 * <pre><code>
console.log(milo.toDateString('/')) // 2011/10/21
 *</code></pre>
 * </p>
 */
 
 

 

milo.base.extend(milo, milo.dom); 
milo.base.extend(milo, milo.array); 
milo.base.extend(milo, milo.string); 
milo.base.extend(milo, milo.date); 
milo.base.extend(milo, milo.number); 
milo.base.extend(milo, milo.event); 
milo.base.extend(milo, milo.object); /**
 * @author willpanyang
 * @version 0.1.0.0 
 * @date 2012-05-21
 * @class milo.ams
 * ams通用处理方法
 */
 
milo.base.extend(window, milo.ams); 


