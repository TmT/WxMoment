var _ = require('underscore');

/**
 * 腾讯视频
 */

var video, player, playerConfig;

function Video(config, callback) {

    //加载腾讯视频的资源
    playerConfig = _.extend({
        vid: null,
        width: '100%',
        height: '100%',
        modId: "WxMomentVideo",
        isHtml5ControlAlwaysShow: false,
        isHtml5UseUI: true,
        html5LiveUIFeature: false,
        isHtml5UseFakeFullScreen: true,
        isiPhoneShowPlaysinline: true,
        vodFlashExtVars: {
            share: 0,
            follow: 0,
            showlogo: 0,
            clientbar: 0
        },
        plugins: {
            AppBanner: 0,
            AppRecommend: 0
        },
        autoplay: false,
        onplay: function () {
        },
        onplaying: function () {
        },
        onpause: function () {

        },
        onallended: function () {

        },
        onfullscreen: function (a) {

        }
    }, config);

    if (!playerConfig.vid) {
        console.log('请视频 vid');
        return;
    }

    loadPlayerRes();
    return player;
}

Video.prototype.getPlayer = function(){
    return player.getPlayer();
};

function loadPlayerRes() {
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    var script = document.createElement("script");
    script.async = "true";
    script.src = "http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2_zepto.js";

    var done = false;

    // 加载完毕后执行
    script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            done = true;
            try {
                initPlayer();
            } catch (err) {
            }
            script.onload = script.onreadystatechange = null;
        }
    };

    head.insertBefore(script, head.firstChild);
}

function initPlayer() {

    video = new tvp.VideoInfo();
    player = new tvp.Player();

    video.setVid(playerConfig.vid);

    playerConfig.video = video;
    player.create(playerConfig);

}

module.exports = Video;