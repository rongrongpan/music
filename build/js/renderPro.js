!function(n,o){var r,a,i=null,c=0;function l(n){var e=Math.round(n),t=Math.floor(e/60),a=e-60*t;return t<10&&(t="0"+t),a<10&&(a="0"+a),t+":"+a}function s(n){if(1<=n){cancelAnimationFrame(i),n=c=0;var e=controlIndex.next();o.stop(),"play"==audio.status&&o.progress(),$scope.trigger("autoPlay",e)}var t=n*r;t=l(t),$scope.find(".curTime").html(t);var a=100*(n-1)+"%";$scope.find(".up-pro").css({transform:"translateX("+a+")"})}o.renderLastTime=function(n){c=0;var e=l(r=n);$scope.find(".allTime").html(e),s(0)},o.progress=function(n){c=null==n?c:n,void 0,a=(new Date).getTime(),function n(){var e=(new Date).getTime(),t=c+(e-a)/(1e3*r);i=requestAnimationFrame(n),s(t)}()},o.stop=function(){cancelAnimationFrame(i);var n=(new Date).getTime();c+=(n-a)/(1e3*r)},o.upData=s}(window.Zepto,window.player||(window.player={}));