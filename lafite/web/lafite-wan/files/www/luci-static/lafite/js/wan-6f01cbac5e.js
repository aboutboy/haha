(function(){"use strict";var n;n=angular.module("pandorabox.pages"),n.register.controller("WanController",["$scope","$UCI",function(n,a){var e,t;null==n.wan&&(n.wan={}),n.protos=["pppoe","static","dhcp"],a.$sync(["network","wan"]).then(function(){var e,t;if(n.wan=angular.copy(a.network.wan),angular.isUndefined(n.wan.dns)||"1"===n.wan.peerdns)n.wan.dns_text=["0.0.0.0","0.0.0.0"];else{for(t=[],e=n.wan.dns,angular.isDefined(e)&&e.length>0&&(t=e.split(" "));t.length<2;)t.push("0.0.0.0");n.wan.dns_text=t}}),e={dhcp:[],pppoe:["username","password"],"static":["ipaddr","netmask","gateway","dns","peerdns"]},t={dhcp:["proto"],pppoe:["proto","username","password"],"static":["proto","ipaddr","netmask","gateway","dns","peerdns"]},n.submit=function(r){var s,o,w,p,d,i,l,u,g,f,c,h,m,y,k;if(a.$revert("network","wan"),"static"===n.wan.proto){for(w="",h=n.wan.dns_text,p=0,g=h.length;p<g;p++)d=h[p],"0.0.0.0"!==d&&(w.length>0&&(w+=" "),w+=d);if(n.wan.peerdns="0",0===w.length?(n.wan.dns=n.wan.gateway,n.wan.dns_text[0]=n.wan.gateway):n.wan.dns=w,"0.0.0.0"===n.wan.ipaddr)return!1;if("0.0.0.0"===n.wan.netmask)return!1;if("0.0.0.0"===n.wan.gateway)return!1}else n.wan.peerdns="1";for(s={},m=t[n.wan.proto],i=0,f=m.length;i<f;i++)y=m[i],/_text/.test(y)||(k=n.wan[y],a[r].wan[y]!==k&&(s[y]=k));a.$set(r,"wan",s);for(u in e)if(k=e[u],n.wan.proto!==u)for(l=0,c=k.length;l<c;l++)d=k[l],o={},o[d]="del",angular.isDefined(a[r].wan[d])&&a.$del(r,"wan",o);return!0}}])}).call(this);