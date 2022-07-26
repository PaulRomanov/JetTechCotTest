var stompClient = null;

//是否重连&基本重连次数&当前重连次数&最大重连次数&最小重连时间
var doReconnect = true,
	baseCount = 10,
	reconnectCount = 0,
	maxCount = 50,
	reconnectTime = 10000;
// 处理一下userToken
// 未登录的时候，自己生成一个token字符串
// 登录的时候，获取userToken
function connect(userToken,companyId){
	setTimeout(function(){
		connect1(userToken,companyId);
		// console.log(10);
	},1000)
}
function connect1(userToken,companyId) {
	// 本地调试时连接地址：http://objj.ly9900.com/message/access
	var socket = new SockJS('/message/access');
	stompClient = Stomp.over(socket);
	stompClient.debug = null; //如果需要开启stomp的调试日志,需要调试注释这行

	var header = {
		//userToken，会员或游客的格式userToken:时间戳,刚进入网站的游客的格式  随机字符串:时间戳
		userToken: userToken + ':' + Date.parse(new Date()),
		companyId: companyId, //厅主ID
		clientType: 1 //客户端类型 1:PC端 2:App-iPhone  3:App-Android 4:H5-PC端 5:H5-iPhone 6:H5-Android
	};
	stompClient.connect(header, function () {
		reconnectCount = 0;
		doReconnect = true;
		//订阅在线人数
		stompClient.subscribe('/user/queue/clients', function (response) {
			var body = JSON.parse(response.body);
			var data = body.data;
			data.virtualSize; //虚拟人数
			data.realSize; //实际人数
      $('#popLoading').hide();
			$(".showCount").html(data.virtualSize);
			$('#popNum').show();
			// console.log(header,body)
		});

		//发送消息，我上线了
		stompClient.send('/app/online', {}, null);

	}, function (error) {
	  // 影藏在线人数，显示loading
    $('#popNum').hide();
    $('#popLoading').show();
		//console.log("error:===" + JSON.stringify(error));
		if (error.command == "ERROR") {
			// console.log(error.headers.message);
			//超过最大连接数，不重连
			if (error.headers.message.indexOf('IP_MAX') != -1) doReconnect = false;
		} else {
			if (error.indexOf('Lost connection') != -1) {
				if (reconnectCount < maxCount) {
					if (reconnectCount == 0) console.log('连接已断开，重新连接');
					reconnect(reconnectCount,userToken);
				}
			}
		}
	});
}

//主动断开连接
function disconnect() {
	if (stompClient != null) {
		stompClient.disconnect();
	}
	// console.log('连接已断开');
}

//重连
function reconnect(count,userToken) {
	if (doReconnect) {
		var timeOut = count > baseCount ?
			reconnectTime * (count - baseCount) : reconnectTime;
		// console.log('当前第' + (reconnectCount + 1) + '次重连，等待' + (timeOut / 1000) + '秒')
		reconnectCount++;
		setTimeout(function(){
			connect1(userToken);
		},timeOut)
	}
}
// 生成随机字符串，在没有userToken的时候使用
function randomString(len) {
	len = len || 32;
	var $chars = 'abcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}
