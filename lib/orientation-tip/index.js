/**
 * 旋屏提示
 */
var $ = require('zepto');
var tpl = require('./template.html');

module.exports = function(){
    $('body').append(tpl);
};