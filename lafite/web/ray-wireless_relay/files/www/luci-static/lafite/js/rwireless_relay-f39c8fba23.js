(function(){"use strict";var e;e=angular.module("pandorabox.pages"),e.register.controller("RWirelessRelayController",["$scope","$timeout","$interval","$UCI","Status","$rootScope","FloatDiv","$filter",function(e,n,i,t,r,a,s,l){var c,u,d,o,f,y,m,p,h,P,g,v,k,w,x,b;d=[],k=[],e.relay={disabled:"0",mode:"sta",network:"wwan"},e.isExist=!1,e.list=[],e.status=null,e.showIndex=[],c=[],e.curPage=1,p=1,o=10,angular.isDefined(null!=r&&null!=(P=r.board)?P.id:void 0)&&(e.freqList=null!=(g=t.lafite.rwireless_basic.freqlist)?g:"{ }",e.freqList=JSON.parse(e.freqList),e.freqList=null!=(v=e.freqList[r.board.id])?v:{}),b=null,x=function(){return!angular.isUndefined(b)&&(i.cancel(b),b=null,!0)},a.$on("page.main.current",function(e,n){"rwireless_relay"!==n&&x()}),(w=function(){var n;n=function(){return e.isExist&&e.relay.disabled?t.$command("GET ubus call network.interface.wwan status","now").then(function(n){var i,t;return null==(null!=(i=n.commands)&&null!=(t=i[0])?t.content:void 0)?void(e.status={}):void(e.status=JSON.parse(n.commands[0].content.join("")))}):(x(),!1)},b&&!angular.isUndefined(b)||(b=i(n,5e3))})(),f=function(){var n,i,r,a,s,l,c,u,o;if(0===d.length){l=t.wireless;for(a in l)o=l[a],"wifi-device"===o[".type"]&&(null!=o.disabled&&"0"!==o.disabled||d.push(o[".name"]))}else{c=t.wireless;for(a in c)o=c[a],"wifi-device"===o[".type"]&&(s=o[".name"],null==o.disabled||"0"===o.disabled?-1===d.indexOf(s)&&d.push(s):"1"===o.disabled&&-1!==d.indexOf(s)&&d.splice(d.indexOf(s),1))}if(angular.isDefined(e.freqList&&0!==Object.keys(e.freqList).length)){u=e.freqList;for(i in u)r=u[i],-1===d.indexOf(i)&&delete e.freqList[i];return!0}return n=d.map(function(e){return"GET iwinfo "+e+" freqlist"}),t.$command(n,"now").then(function(e){var n,i,t,r,a,s,l;if(/ok/.test(e.status)&&!angular.isUndefined(e.commands)){for(s=e.commands,l=[],t=0,r=s.length;t<r;t++)i=s[t],a=i.command.match(/GET\s+iwinfo\s+(\w+)\s+(\w+list)$/),!angular.isUndefined(a)&&a&&(n=a[1],!angular.isUndefined(n)&&n&&l.push(h(n,i.content)));return l}}),!0},h=function(n,i){var t,r;return 1!==i.length&&(null==e.freqList&&(e.freqList={}),e.freqList[n]=function(){var e,n,a;for(a=[],e=0,n=i.length;e<n;e++)t=i[e],-1===t.indexOf("unknown")&&(r=t.match(/^[*\s]+(\w.+ (\d+).+$)/),r&&a.push({key:r[1],val:r[2]}));return a}(),!0)},m=function(){var n,i;x(),k=function(){var e,r;e=t.wireless,r=[];for(n in e)i=e[n],null!=i.mode&&"sta"===i.mode&&r.push(i);return r}(),e.isExist=0!==k.length,e.isExist&&(e.relay=angular.copy(k[0]),angular.isDefined(e.relay.disabled)&&"1"===e.relay.disabled?e.relay.disabled=!1:e.relay.disabled=!0),w()},e.scan=function(){var n,i;return x(),n=!1,i={},function(){var r,a,u,f,m;return!n&&(0!==d.length&&(a=s.once(),n=!0,r=function(){var e,n,i,t;for(i=d.concat(d.concat(d)),t=[],e=0,n=i.length;e<n;e++)f=i[e],t.push(f);return t}(),(u=function(e){var i;return 0===e&&(c=[]),i=r[e],t.$command("GET iwinfo "+i+" scan","now").then(function(e){var n;try{return m(e.commands[0].content,i)}catch(t){if(n=t)return a()}}).then(function(){if(e+1!==r.length)return u(e+1)}).then(function(){return n=!1,a()})})(0),m=function(n,t){var r,a,s,u,d,f,m,h,P,g,v,k,w,x,b,K,S;if(null==n&&(n=[]),null==t&&(t=""),0===n.length)return!1;for(f=function(){return-30<=b?"4":-60<=b&&b<-30?"3":-80<=b&&b<-60?"2":b<-80?"1":"0"},x=new Array(Math.ceil(n.length/6)),h=P=0,g=x.length;P<g;h=++P){r=x[h];try{v=n[6*h+0].match(/[A-F\d]{2}(:[A-F\d]{2}){5}$/)[0],K=n[6*h+1].match(/^\s+ESSID:\s+"?([^"].*?)"?$/)[1],k=n[6*h+2].match(/Mode:\s+(\w+)/)[1],s=+n[6*h+2].match(/\d+$/)[0],b=+n[6*h+3].match(/(-\d+) dBm/)[1],w=+n[6*h+3].match(/(\d+)\/\d+$/)[1],d=n[6*h+4].match(/^\s*Encryption:\s+(.*)$/)[1]}catch($){if(u=$)continue}null==i[K]&&(i[K]={ssid:K,devices:{}}),null==(a=i[K].devices)[v]&&(a[v]={mac:v,channel:s,signal:b,signalLv:f(+b),quality:w,encryption:y(d),device:t,hidden:!/"/.test(n[6*h+1])}),i[K].devices[v].signal=(i[K].devices[v].signal+b)/2,i[K].devices[v].quality=(i[K].devices[v].quality+w)/2,c=function(){var e;e=[];for(r in i)S=i[r],e.push(S);return e}()}for(p=Math.ceil(c.length/o),e.showIndex=[],m=1;m<=p;)e.showIndex.push(m++);return c=l("orderBy")(c,"ssid"),e.loadPage(1),!0},!0))}}(),e.addForm=function(i,t){var r;return e.isExist=!0,r=e.relay,(r.ssid!==t.ssid||r.device!==i.device||r.bssid!==i.bssid||r.channel!==i.channel||r.encryption!==i.encryption||r.key!==i.key)&&(e.relay.ssid=t.ssid,e.relay.device=i.device,e.relay.bssid=i.mac,e.relay.channel=i.channel.toString(),e.relay.encryption=i.encryption,e.relay.key=i.key||"",n(function(){return document.getElementsByName("form_wifirelay")[0].scrollIntoView()},300),!0)},u=e.connect=function(){var i,r,a,l,c,u,d,o;if(x(),"none"!==e.relay.encryption&&(null==e.relay.key||""===e.relay.key))return!1;if(o=angular.copy(e.relay),o.disabled=o.disabled?"0":"1",a=s.once(),0===k.length)o[".type"]="wifi-iface",t.$add("wireless","1",o);else{for(l=k[0],i=["bssid","device","disabled","channel","encryption","key","ssid"],r=!1,c=0,d=i.length;c<d;c++)if(u=i[c],o[u]!==l[u]){r=!0;break}if(!r)return a(),!1;t.$set("wireless",l[".name"],o)}return a(),e.status={},n(m,2e3),!0},null!=t.wireless&&f(),t.$sync("wireless").then(f).then(m),e.loadPage=function(n){var i,t,r;angular.isUndefined(n)||(angular.isString(n)||angular.isNumber(n))&&(r=parseInt(n,10),r<0&&(r=1),r>p&&(r=p),t=(r-1)*o,i=r*o,i>c.length&&(i=c.length),e.list=c.slice(t,i)||[],e.curPage=r)},e.preIndex=function(){var n;n=e.curPage-1,n<=0?e.curPage=n=1:e.curPage=n,e.loadPage(e.curPage)},e.nextIndex=function(){var n;n=e.curPage+1,n>p?e.curPage=n=p:e.curPage=n,e.loadPage(e.curPage)},e.encryptionOption=[{key:"none",val:"none"},{key:"WPA PSK (CCMP)",val:"psk+ccmp"},{key:"WPA PSK (TKIP)",val:"psk+tkip"},{key:"WPA PSK (TKIP, CCMP)",val:"psk+tkip+ccmp"},{key:"WPA2 PSK (CCMP)",val:"psk2+ccmp"},{key:"WPA2 PSK (TKIP)",val:"psk2+tkip"},{key:"WPA2 PSK (TKIP, CCMP)",val:"psk2+tkip+ccmp"},{key:"mixed WPA/WPA2 PSK (CCMP)",val:"psk-mixed+ccmp"},{key:"mixed WPA/WPA2 PSK (TKIP)",val:"psk-mixed+tkip"},{key:"mixed WPA/WPA2 PSK (TKIP, CCMP)",val:"psk-mixed+tkip+ccmp"}],y=function(e){var n;return n="",n+=function(){switch(!1){case"none"!==e:return"none";case!/^WPA2\s+PSK/i.test(e):return"psk2";case!/^WPA\s+PSK/i.test(e):return"psk";case!/^mixed\s+WPA\/WPA2\s+PSK/i.test(e):return"psk-mixed";default:return""}}(),n+=function(){switch(!1){case-1===e.indexOf("(CCMP)"):return"+ccmp";case-1===e.indexOf("(TKIP)"):return"+tkip";case-1===e.indexOf("(TKIP, CCMP)"):return"+tkip+ccmp";default:return""}}(),""===n?e:n}}])}).call(this);