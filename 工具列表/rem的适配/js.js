/*
动态改动fon-size
px转换rem：当html的font-size:20px,20px则rem为0.6rem,即px/font-size=rem	
*/
(function (doc, win, undefined) {
var docEl = doc.documentElement,
resizeEvt = 'orientationchange' in win? 'orientationchange' : 'resize',
recalc = function () {
var clientWidth = docEl.clientWidth;
if (clientWidth === undefined) return;
if (clientWidth > 640) clientWidth = 640;
docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//		document.getElementById("box").style.fontSize = 20 * (clientWidth / 320) + 'px';
};
if (doc.addEventListener === undefined) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);
