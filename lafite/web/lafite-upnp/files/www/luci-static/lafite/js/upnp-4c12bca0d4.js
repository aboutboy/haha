(function(){"use strict";var n;n=angular.module("pandorabox.pages"),n.register.controller("UpnpController",["$scope","$rootScope","Status","$UCI",function(n,o,r,t){var u,e,c;u="upnpd",n[u]=null!=(e=r[u])?e:{},(c=function(){return t.$sync([u]).then(function(){n[u]=angular.copy(t[u])})})(),n.refreshList=function(){c()},o.$on("page.main.current",function(o,t){"upnp"===t&&(r[u]=n[u])})}])}).call(this);