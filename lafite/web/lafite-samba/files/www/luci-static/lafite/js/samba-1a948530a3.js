(function(){"use strict";var a;a=angular.module("pandorabox.pages"),a.register.controller("SambaController",["$scope","$rootScope","Status","$UCI","FloatDiv",function(a,n,s,e,b){var r;null==s.samba&&(s.samba={}),a.samba=null!=(r=s.samba)?r:{},e.$sync(["samba"]).then(function(){var n,s,b;a.samba=angular.copy(e.samba),s=a.samba;for(n in s)b=s[n],"samba"===b[".type"]&&("0"===b.enabled?a.samba[n].enabled=!1:a.samba[n].enabled=!0)}),a.refreshDev=function(){e.$sync(["samba"]).then(function(n){var s,e,b;a.samba=angular.copy(n.samba),e=a.samba;for(s in e)b=e[s],"samba"===b[".type"]&&("0"===a.samba[s].enabled?a.samba[s].enabled=!1:a.samba[s].enabled=!0)})},a.submit=function(){var n,s,r,m,l,o,t,u,i;if(null==a.samba)return!1;n={},s=b.setFloatDiv(500),o=a.samba;for(l in o){i=o[l];for(r in i)m=i[r],"enabled"===r&&(m=m?"1":"0"),e.samba[l][r]!==m&&(null==n[l]&&(n[l]={}),n[l][r]=m)}for(t in n)u=n[t],e.$set("samba",t,u);return b.clearByID(s),!0},n.$on("page.main.current",function(n,e){"samba"===e&&(s.samba=a.samba)})}])}).call(this);