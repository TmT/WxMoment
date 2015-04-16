"use strict";

(function (window) {

    var WXMoment = {
        version: '0.0.1'
    };


    window.WXMoment = WXMoment;

    /**
     * 初始化操作
     */
    WXMoment.init = function (options) {
        //默认配置
        this.options = {};

        //初始化配置
        this.options = _.extend(this.options, options);

        this.init(options);
    };


    /**
     * 资源加载器
     */
    WXMoment.loader = function () {

    };

    /**
     * 页面切换
     */
    WXMoment.pageSlide = function () {

    };

    /**
     * 微信分享
     */
    WXMoment.share = function () {

    };


    /**
     * 统计
     */
    WXMoment.analytics = function () {

    };


})(window);