var _ = require('underscore');

/**
 * 微信分享
 */
function Share(config) {
	this.init(config);
}

Share.prototype.init = function (config) {

	this.config = {};
	this.config.global = config.global || {};

	this.config.moment = _.extend({}, this.config.global, config.moment);
	this.config.friend = _.extend({}, this.config.global, config.friend);

	this.config.callback = {};

	this.config.callback.success = this.config.callback.cancel = function () {
		console.log("result");
	};

	this.config.callback = _.extend(this.config.callback, config.callback);

	var _this = this;

	var bindit = function () {
		WeixinJSBridge.on("menu:share:appmessage", function () {
			WeixinJSBridge.invoke("sendAppMessage", _this.config.friend, function (r) {
				if (r.err_msg !== "send_app_msg:cancel") {
					_this.config.callback.success();
				} else {
					_this.config.callback.cancel();
				}
			});
		});
		WeixinJSBridge.on("menu:share:timeline", function () {
			WeixinJSBridge.invoke("shareTimeline", _this.config.moment, function (r) {
				if (r.err_msg !== "share_timeline:cancel") {
					_this.config.callback.success();
				} else {
					_this.config.callback.cancel();
				}
			});
		});
	};

	document.addEventListener('WeixinJSBridgeReady', bindit, false);
};

Share.prototype.set = function (arr) {

	// 保存作用域
	var _this=this;
	
	if(arr[1]!=='link'){
		_this.config[arr[0]][arr[1]] = arr[2];
	}else{
		_this.config[arr[0]][arr[1]]=_this.config[arr[0]][arr[1]]+"?";
		$.each(arr[2],function(key,value){
			_this.config[arr[0]][arr[1]]=_this.config[arr[0]][arr[1]]+key+"="+value+"&";
		});
		_this.config[arr[0]][arr[1]] = _this.config[arr[0]][arr[1]].substring(0,(_this.config[arr[0]][arr[1]].length-1));
	}
};


module.exports = Share;