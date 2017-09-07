(function(){"use strict";var n;n=angular.module("pandorabox.pages"),n.register.controller("RWanController",["$scope","$rootScope","Status","$UCI","$interval","$timeout","Fn","FloatDiv",function(n,e,t,r,a,o,i,s){var l,u,c,d,f,w,p,m,g,h,v,A,E,$,I,k,y,T,_;o(function(){return r.$setAutoSave(!0)},700),null==t.ray&&(t.ray={}),T=null,n.wan=null!=(p=t.ray.wan)?p:{},n.internetInfo=null!=(m=t.ray.internetInfo)?m:{},n.protos=["pppoe","static","dhcp"],n.remoteMAC="",n.curMAC="",l="GET cat /etc/board.json",A=[],r.$command(l,"now").then(function(n){var e,t,r,a;if(n.commands[0].command===l)return n=JSON.parse(null!=(t=n.commands)?t[0].content.join(""):void 0),e=null!=(r=n["switch"])&&null!=(a=r.switch0)?a.ports:void 0,e.map(function(n){angular.isUndefined(n.role)||/[lan|wan]/.test(n.role)&&A.push(n)})}),u=function(e){var t,r,a,o,i,s,l,u,c,d,f,w;if(w=JSON.parse(e.join("")),!angular.isUndefined(w)&&angular.isObject(w)){if(n.internetInfo.proto=null!=(s=w.proto)?s:null,n.internetInfo.dns=null!=(l=w["dns-server"])?l:null,a=null!=(u=null!=(c=w["ipv4-address"])&&null!=(d=c[0])?d.address:void 0)?u:"",0!==a.length&&(n.internetInfo.ipaddr=a),angular.isArray(w.errors)&&w.errors.length>0?(t=w.errors.shift(),n.internetInfo.error=t.code):n.internetInfo.error=null,angular.isArray(w.route)){for(f=w.route,r=0,o=f.length;r<o;r++)if(i=f[r],0===parseInt(i.mask,10)){n.internetInfo.gateway=i.nexthop;break}}else n.internetInfo.gateway=null;"pppoe"===n.wan.proto&&n.internetInfo.error&&y()}},c=function(e){var t,r,a;for(t=0,r=A.length;t<r;t++)a=A[t],delete a.mac;null!=e&&e.map(function(e){var t,r,o,i,s,l,u,c,d;for(c=e.split(/\s+/),t=0,i=c.length;t<i;t++)d=c[t],d=d.replace(/(^\s+)|(\s+$)/g,"");for(r=0,s=A.length;r<s;r++)if(a=A[r],a.num.toString()===c[0]){a.mac=c[1];break}for(o=0,l=A.length;o<l;o++)if(u=A[o],/wan/.test(u.role)){angular.isDefined(u.mac)?n.internetInfo.up=!0:n.internetInfo.up=!1;break}})},E=function(){var n,e,t;t="GET ubus call network.interface.wan status",n="GET switch dump-portmac",e="GET switch clear",r.$command([t,n],"now").then(function(e){var r,a,o,i;if("ok"===e.status&&angular.isArray(e.commands))for(i=e.commands,a=0,o=i.length;a<o;a++)r=i[a],r.command!==t?r.command!==n||c(r.content):u(r.content)}).then(function(){return r.$command(e,"now")})},$=function(){var e,t,a,o,i,s;return s="GET ubus call network.interface.wan status",t="GET @REMOTE_ADDR",a="GET cat /proc/net/arp",o="GET switch dump-portmac",i="GET switch clear",e=!1,function(){if(!e)return e=!0,r.$command([s,t,a,o],"now").then(function(r){var i,l,d,f,w,p,m,g,h,v,A,E,$;if(e=!1,"ok"===r.status&&angular.isArray(r.commands))for(f=new RegExp(/(\d+.){3}\d+/gi),h=r.commands,d=0,m=h.length;d<m;d++)if(l=h[d],l.command!==s)if(l.command!==t){if(l.command!==a)l.command!==o||c(l.content);else for(v=l.content,p=0,g=v.length;p<g;p++)if(w=v[p],f.test(w)){A=w.match(/(\S+)\s+/g);for(i in A)if($=A[i],$=$.replace(/[\s ]+/g,""),/([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}/gi.test($)){n.remoteMAC=$;break}break}}else E=l.content[0],f=new RegExp(E,"ig");else u(l.content)}).then(function(){return r.$command(i,"now")})}}(),h=function(){return null==T&&(T=a(E,I),!0)},v=function(){return null!=T&&(a.cancel(T),T=null,!0)},w=36,I=5e3,k=0,f=function(){k=0},y=function(){var e;if("pppoe"===n.wan.proto){if(e=n.internetInfo.error,!e||angular.isUndefined(e))return void f();if(k>=w)return v(),"CONNECT_FAILED"===e&&"AUTH_TOPEER_FAILED"===e||(n.internetInfo.error="CONNECT_FAILED"),void f();if("AUTH_TOPEER_FAILED"===e)return v(),void f();n.internetInfo.error="USER_REQUEST",++k}},r.$getAutoSave()&&h(),n.stopTask=function(){n.internetInfo.proto!==n.wan.proto&&v()},g={dhcp:[],pppoe:["username","password"],"static":["ipaddr","netmask","gateway","dns","peerdns"]},_={dhcp:["proto"],pppoe:["proto","username","password"],"static":["proto","ipaddr","netmask","gateway","dns","peerdns"]},n.submit=function(e){var t,a,o,i,l,u,c,d,f,w,p,m,A,E,$,I,k;if(null==r[e])return!1;if(v(),l=s.once(),r.$revert("network","wan"),"static"===n.wan.proto){for(o="",E=n.wan.dns_text,u=0,p=E.length;u<p;u++)c=E[u],"0.0.0.0"!==c&&(o.length>0&&(o+=" "),o+=c);switch(n.wan.peerdns="0",0===o.length?(n.wan.dns=n.wan.gateway,n.wan.dns_text[0]=n.wan.gateway):n.wan.dns=o,"0.0.0.0"){case n.wan.ipaddr:return l(),!1;case n.wan.netmask:return l(),!1;case n.wan.gateway:return l(),!1}}else n.wan.peerdns="1";for(t={},$=_[n.wan.proto],d=0,m=$.length;d<m;d++)I=$[d],/_text/.test(I)||(k=n.wan[I],r[e].wan[I]!==k&&(t[I]=k));i=r.$getAutoSave(),r.$setAutoSave(!1),r.$set(e,"wan",t);for(w in g)if(k=g[w],n.wan.proto!==w)for(f=0,A=k.length;f<A;f++)c=k[f],a={},a[c]="del",angular.isDefined(r[e].wan[c])&&r.$del(e,"wan",a);return i&&(r.$save(e),r.$setAutoSave(i),h()),l(),!0},n.macClone=function(){var e;return!!/^((([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2})|(([0-9a-fA-F]{2}-){5}[0-9a-fA-F]{2}))$/i.test(n.remoteMAC)&&(e=n.remoteMAC.replace(/-/g,":"),e=e.toLowerCase(),e!==r.network.wan_dev.macaddr&&(!(r.$getAutoSave()&&!confirm(i.getTranslate("Network will be restart!!! Continue?")))&&(r.$set("network","wan_dev",{macaddr:e}),!0)))},n.macRestore=function(){return!!/([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}/gi.test(n.wan.macaddr)&&(n.remoteMAC=n.wan.macaddr,n.macClone(),!0)},d=function(){var e,t;if(n.wan=angular.copy(r.network.wan),n.wan_dev=angular.copy(r.network.wan_dev),angular.isUndefined(n.wan.dns)||"1"===n.wan.peerdns)n.wan.dns_text=["0.0.0.0","0.0.0.0"];else{for(t=[],e=n.wan.dns,angular.isDefined(e)&&e.length>0&&(t=e.split(" "));t.length<2;)t.push("0.0.0.0");n.wan.dns_text=t}return n.remoteMAC=n.wan_dev.macaddr,n.curMAC=r.network.wan_dev.macaddr,"pppoe"===n.wan.proto&&f(),$(),!0},null!=r.network&&d(),r.$sync(["network"]).then(d),e.$on("page.main.current",function(e,r){"rwan"===r&&(v(),t.ray.wan=n.wan,t.ray.internetInfo=n.internetInfo)})}])}).call(this);