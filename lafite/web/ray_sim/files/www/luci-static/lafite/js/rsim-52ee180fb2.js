(function(){"use strict";var n,e={}.hasOwnProperty;n=angular.module("pandorabox.pages"),n.register.controller("RSimController",["$scope","$rootScope","$UCI","Status","FloatDiv",function(n,r,t,i,a){var o,c,l;o=function(){var r,t,i,a;if(r=n.sim,r!=={}){a=n.selectOption;for(i in a)if(e.call(a,i)&&(t=a[i],"CUSTOM"!==i&&t.apn===r.apn&&t.dialnumber===r.dialnumber))return void l(i)}l("CUSTOM")},l=function(e){return n.carrier.selected=e,n.setSim()},n.setSim=function(){var e;return e=n.carrier.selected,n.carrier.checked="CUSTOM"!==e,"CUSTOM"!==e&&(n.sim=n.selectOption[e]),!0},n.sim=null!=(c=i.sim)?c:{},n.selectOption={CUSTOM:{},MOBILE:{apn:"cmnet",dialnumber:"*99***1#"},UNICOM:{apn:"3gnet",dialnumber:"*99#"},TELECOM:{apn:"ctnet",dialnumber:"#777"}},n.carrier={},o(),t.$sync("network").then(function(){var e,r,i,a;if(e=null!=(r=null!=(i=t.$Native)&&null!=(a=i.network)?a["3gnet"]:void 0)?r:{},"3g"===e.proto)return n.sim=e,o()}),n.submit=function(){var e,r;return r=a.once(),e=n.sim,e={proto:"3g",service:"umts",apn:e.apn,dialnumber:e.dialnumber},t.$set("network","3gnet",e),r(),!0},r.$on("page.main.current",function(e,r){"rsim"===r&&(i.sim=n.sim)})}])}).call(this);