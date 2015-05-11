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

    var afterWeixinJSBridgeReady = function () {

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
    this.config[arr[0]][arr[1]] = arr[2];
};


module.exports = Share;