var _ = require('underscore');

/**
 * 微信分享
 */
function Share(config) {
	this.init(config);
}

Share.prototype.init = function (config) {

	var mataGlobal = {
		'img_url': document.getElementsByName("wxm:img_url")[0].getAttribute("content"),
		'link': document.getElementsByName("wxm:link")[0].getAttribute("content")
	};

	var metaTimeline = {
		'title': document.getElementsByName("wxm:timeline_title")[0].getAttribute("content"),
		'desc': document.getElementsByName("wxm:timeline_title")[0].getAttribute("content")
	};

	var metaAppmessage = {
		'title': document.getElementsByName("wxm:appmessage_title")[0].getAttribute("content"),
		'desc': document.getElementsByName("wxm:appmessage_desc")[0].getAttribute("content")
	};

	function defaultFunc() {
		alert("result");
	}

	var defaultCallBack = {
		'timeline': {
			'success': defaultFunc,
			'cancel': defaultFunc
		},
		'appmessage': {
			'success': defaultFunc,
			'cancel': defaultFunc
		}
	};

	this.config = {};
	this.config.global = config.global || mataGlobal || {};
	this.config.timeline = _.extend({}, this.config.global, config.timeline || metaTimeline || {});
	this.config.appmessage = _.extend({}, this.config.global, config.appmessage || metaAppmessage || {});
	this.config.callback = _.extend({}, defaultCallBack, config.callback || {});

	var _this = this;

	var afterWeixinJSBridgeReady = function () {

		WeixinJSBridge.on("menu:share:appmessage", function () {
			WeixinJSBridge.invoke("sendAppMessage", _this.config.appmessage, function (r) {
				if (r.err_msg !== "send_app_msg:cancel") {
					_this.config.callback.appmessage.success();
				} else {
					_this.config.callback.appmessage.cancel();
				}
			});
		});

		WeixinJSBridge.on("menu:share:timeline", function () {
			WeixinJSBridge.invoke("shareTimeline", _this.config.timeline, function (r) {
				if (r.err_msg !== "share_timeline:cancel") {
					_this.config.callback.timeline.success();
				} else {
					_this.config.callback.timeline.cancel();
				}
			});
		});

	};

	if (typeof window.WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', afterWeixinJSBridgeReady, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', afterWeixinJSBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', afterWeixinJSBridgeReady);
		}
	} else {
		afterWeixinJSBridgeReady();
	}

};

Share.prototype.set = function (arr) {
	if (arr[0] !== 'callback') {
		this.config[arr[0]][arr[1]] = arr[2];
	} else {
		this.config[arr[0]][arr[1]][arr[2]] = arr[3];
	}
};


module.exports = Share;