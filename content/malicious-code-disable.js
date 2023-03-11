/*
* content script
* declared as: ["malicious-code-disable.js"]
* matches: ["<all_urls>"]
*/

// <injectCode>
window.console.clear = function() { };
window.screen = {
	// replace with whatever common values are used for your user agent
	width: 1920,
	height: 1080,
	orientation: window.screen.orientation
};
window.navigator.productSub = null;
window.navigator.vendorSub = "";
// window.navigator.platform = undefined
// window.navigator.hardwareConcurrency = 0
// window.navigator.deviceMemory = 0

// var screenLeft, screenTop, screenX, screenY = undefined;
// window.devicePixelRatio = undefined;

if (/(.*\.google.com\/search\?)/i.test(location.host) == true) {
	window.outerHeight = undefined;
	window.outerWidth = undefined;
}
if (/.*(google.com|youtube.com).*/i.test(document.domain) == true) {
	window.google_ad_status = 1;
}

// disables idle detection in Chrome
if ('IdleDetector' in window) {
	window.IdleDetector = function() { };
}
// Date.prototype.getTimezoneOffset = function() { return 0; };
window.navigator.connection = {};

// let g_eVel1bbd174404efbce95f1af489ef93f4aa0f4d55718f24c3504682216afa7b7fb1 = eval;
// window.eval = function(expr) {
// 	let context = this;
// 	console.log('EVAL!\nScriptName: %s\n%o\n', location.href, {expr});
// 	return g_eVel1bbd174404efbce95f1af489ef93f4aa0f4d55718f24c3504682216afa7b7fb1.call(context, expr);
// };
// </injectCode>
console.log(`URL: ${location.href}`);

// injection

const script1 = document.createElement('script');
const injectCode1 = `
window.console.clear = function() {};
window.screen = {
	width: undefined,
	height: undefined,
	orientation: window.screen.orientation
};
window.navigator.productSub = null;
window.navigator.vendorSub = "";
// var screenLeft, screenTop, screenX, screenY = undefined;
// window.devicePixelRatio = undefined;

if (/(.*\\.google.com\\/search\\?)/i.test(location.host) == true) {
	window.outerHeight = undefined;
	window.outerWidth = undefined;
}
if (/.*(google.com|youtube.com).*/i.test(document.domain) == true) {
	window.google_ad_status = 1;
}
if ('IdleDetector' in window) {
	window.IdleDetector = function() {}
}
// Date.prototype.getTimezoneOffset = function () { return 0 }
window.navigator.connection = {};
// let g_eVel1bbd174404efbce95f1af489ef93f4aa0f4d55718f24c3504682216afa7b7fb1 = eval;
// window.eval = function(expr) {
// let context = this;
// 	console.log('EVAL!\\nScriptName: %s\\n%o\\n', location.href, {expr});
// 	return g_eVel1bbd174404efbce95f1af489ef93f4aa0f4d55718f24c3504682216afa7b7fb1.call(context,expr);
// };
`;
script1.textContent = injectCode1;
(document.head || document.documentElement).appendChild(script1);