global.jQuery = global.$ = require('jquery');
var svg4everybody = require('svg4everybody');
var waypoints = require('./modules/_waypoints');
var smoothScroll = require('./modules/_smooth-scroll');

$(document).ready(function () {
    svg4everybody();
    waypoints();
    smoothScroll();
});