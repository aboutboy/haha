(function(){"use strict";var e;e=angular.module("pandorabox.pages"),e.register.controller("RGuideController",["$rootScope","$scope","$location","$http","$timeout","$interval","RadiusBarHolder","$UCI","Status",function(e,n,t,r,i,a,o,s,u){var c,l,d,f,g,p;c=!1,s.$sync(["lafite","network"]).then(function(e){var n,r;if("ok"===e.status)return angular.isDefined(e.lafite)&&angular.isDefined(e.lafite.rguide.enabled)&&"0"===e.lafite.rguide.enabled?void t.path("/"):void(c||angular.isDefined(e.network)&&(n=null!=(r=e.network.lan.ipaddr)?r:"",-1===t.host().indexOf(n)&&""!==n&&window.location.replace("http://"+n)))}),n.wireless={},e.$broadcast("guide.finish",!1),l=[{name:"getStart",start:!0,next:"checkMode",readyAction:function(){var r;s.$revert(!0),r=a(function(){var e,n,t;if(null==u.board)return!1;if(null==u.board.uuid)return!1;t=null!=(n=window.localStorage.getItem("user"))?n:"{ }";try{t=JSON.parse(t)}catch(i){return e=i,!1}return delete t[u.board.uuid],a.cancel(r),window.localStorage.setItem("user",JSON.stringify(t))},500,10),n.action_skip=function(){g(),setTimeout(function(){return e.$broadcast("guide.finish",!0),s.$sync("lafite").then(function(){return t.path("/")})},500)}}},{name:"checkMode",next:"chooseMode",readyAction:function(){return setTimeout(function(){return o("checking").start()},50),s.$command(["GET source /usr/bin/detect_wan"],"now").then(function(e){var t;return t=e.commands[0].content,t=t[t.length-1],n.proto=function(){switch(!1){case!/Not\sDHCP\/PPPoE\sServer/i.test(t):return"static";case!/\sDHCP\sServer/i.test(t):return"dhcp";case!/\sPPPOE\sServer/i.test(t):return"pppoe"}}(),p()})}},{name:"chooseMode",next:"setNet",readyAction:function(){return n.checkResult="pppoe"===n.proto?"pppoe":"dhcp",n.dhcp=function(){s.$sync("network").then(function(){return s.$set("network","wan",{proto:"dhcp"})}),d("setWireless")},n.pppoe=function(){n.checkResult="pppoe",d("setNet")}},submitAction:function(){return null!=n[n.checkResult]?(n[n.checkResult](),!1):(n.dhcp(),!0)}},{name:"setNet",next:"setWireless",readyAction:function(){s.$sync("network").then(function(e){var t,r;t=null!=(r=e.network.wan)?r:{},n.wan=t})},submitAction:function(){var e;switch(e=n.wan,n.checkResult){case"pppoe":return!(!angular.isString(e.username)||!angular.isString(e.password))&&(""!==e.username&&""!==e.password&&(s.$set("network","wan",{username:n.wan.username,password:n.wan.password,proto:"pppoe"}),!0));case"static":return!!(angular.isString(e.ipaddr)&&angular.isString(e.netmask)&&angular.isString(e.gateway))&&(""!==e.ipaddr&&""!==e.netmask&&""!==e.gateway&&(s.$set("network","wan",{ipaddr:n.ipaddr,netmask:n.netmask,gateway:n.gateway,proto:"static"}),!0))}return!1}},{name:"setWireless",next:"finish",readyAction:function(){s.$sync("wireless").then(function(e){var t,r,i;e=e.wireless;for(i in e)if(r=e[i],/^(?!cfg)/.test(i)&&!/a/.test(r.hwmode)){t=r[".name"];break}for(i in e)if(r=e[i],/^cfg/.test(i)&&r.device===t&&null==r.isolated&&"1"!==r.isolated){null==r.key&&(r.key=""),n.wireless=r;break}})},submitAction:function(){var e,t,r,i,a,o,u;if(t=n.wireless,!angular.isString(t.ssid)||!angular.isString(t.key))return!1;if(""===t.ssid||""===t.key)return!1;a=s.wireless;for(r in a)i=a[r],/^cfg/.test(r)&&(o=t.ssid,e=i.device,angular.isUndefined(s.wireless[e])||(-1!==s.wireless[e].hwmode.indexOf("a")&&o.length<=29&&(o+="_5G"),u={disabled:"0",ssid:o,key:t.key,encryption:"psk2+tkip+ccmp"},i.isolated&&(u.disabled="1",u.encryption="none"),s.$set("wireless",r,u)));return!0}},{name:"finish",end:!0,readyAction:function(){return n.working=!1,n.worked=!1,n.action_apply=function(){var t;n.working=!0,t=function(){return"/cgi-bin/luci/pbr/auth?_c="+(new Date).getTime()},r.post(t(),{action:"change",username:"root",password:"admin",change:n.wireless.key}),g(),setTimeout(function(){var t;return t=o("working"),t.done(function(){n.working=!1,n.worked=!0,e.$broadcast("guide.finish",!0),n.$digest()}),t.start()},50)},n.action_finish=function(){t.path("/")}}}],f=[],d=n.display=function(e){var t,r,i;if(0!==f.length&&f[f.length-1]===e)return!1;for(r=0,i=l.length;r<i;r++)if(t=l[r],t.name===e)return n.content=e,f.push(e),null!=t.readyAction&&t.readyAction(),!0;return!1},g=function(){u.main.pre=null,u.main.current=null,u.nav.plugins.guide=[],"ali"===s.lafite.main.config&&s.$command("touch /etc/.guide_mode_done","now"),s.$set("lafite","rguide",{enabled:"0"}),s.$save()},function(){var e,n,t;for(n=0,t=l.length;n<t;n++)if(e=l[n],e.start)return void d(e.name)}(),p=n.action_next=function(){var e,t,r;for(t=0,r=l.length;t<r;t++)if(e=l[t],e.name===n.content)return null!=e.submitAction?!!e.submitAction()&&(d(e.next),!0):(d(e.next),!0);return!1},n.action_prev=function(e){var t,r,i,a,o,s;if(null==e&&(e=1),(!angular.isNumber(e)||e<1)&&(e=1),f.length<=e)return!1;for(t=i=1,s=e;1<=s?i<=s:i>=s;t=1<=s?++i:--i)f.pop();for(n.content=f[f.length-1],a=0,o=l.length;a<o;a++)if(r=l[a],r.name===n.content)return null!=r.readyAction&&r.readyAction(),!0;return!1}}]),e.register.value("RadiusBarHolder",function(e){var n,t,r,i,a,o,s,u,c,l,d,f,g,p,h,w,m,k,v,y,b;return a=.35,t="#b3a4f7",n="#fccf2e",r="#fccf2e",s=document.getElementById(e),d=s.getContext("2d"),u=s.width/2,c=s.height/2,i=2*Math.PI/100,v=0,g=null,y=null,b=function(){if(!y)return w(),p(v),y=setInterval(function(){if(v+=a,p(v),v>=100)return o()},50)},o=function(){y&&(null!=g&&g(),clearInterval(y),y=null)},f=function(e){g=e},p=function(e){return h(e),l(),k(e)},l=function(){d.clearRect(u-25,c-12,50,24)},m=function(e,n,t){d.save(),d.strokeStyle=e,d.lineWidth=3,d.beginPath(),d.arc(u,c,60,n,t,!1),d.stroke(),d.closePath()},w=function(){m(t,0,2*Math.PI)},h=function(e){m(n,-Math.PI/2,-Math.PI/2+e*i),d.restore()},k=function(e){d.save(),d.fillStyle=r,d.font="25px 'Microsoft YaHei'",d.beginPath(),d.fillText(""+(e<9?" ":"")+e.toFixed(0)+"%",u-25,c+12),d.stroke(),d.closePath(),d.restore()},{id:e,start:b,cancel:o,done:f}})}).call(this);