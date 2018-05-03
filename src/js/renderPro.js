(function($,root){
    var allTime;
    var timer = null;
    var lastTime;
    var oldPrec = 0;
    function dealTime(time){
        var atime = Math.round(time); 
        var minutes = Math.floor(atime/60);
        var seconds = atime - minutes*60;
        if(minutes < 10){
            minutes = '0'+ minutes;
        }
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }
    function renderLastTime(time){
        oldPrec = 0;
        allTime = time;
        var lastTime = dealTime(time);
        $scope.find('.allTime').html(lastTime);
        upData(0);
    }

    function upData(prec){
        if(prec>=1){
            cancelAnimationFrame(timer);
            oldPrec = 0;
            prec = 0;
            var index = controlIndex.next();
            root.stop();
            if(audio.status == 'play'){
                root.progress();
            }
            $scope.trigger('autoPlay',index);
        }
        var curTime = prec * allTime;
        curTime = dealTime(curTime);
        $scope.find('.curTime').html(curTime); 
        
        var prectage = (prec - 1) * 100 + '%';
        
        // console.log(prectage)
        $scope.find('.up-pro').css({
            'transform':'translateX('+ prectage +')'
        })
    };

    function progress(data){
        oldPrec =  data == undefined? oldPrec : data;
        console.log(oldPrec);
        lastTime = new Date().getTime();
        function afram(){  
            var newTime = new Date().getTime();
            var prec = oldPrec + (newTime - lastTime)/(allTime*1000);
            timer = requestAnimationFrame(afram); 
            upData(prec);
               
        }
        afram();
    }
    function stop(){
        cancelAnimationFrame(timer);
        var newTime = new Date().getTime();
        oldPrec += (newTime - lastTime)/(allTime*1000);
    }

    root.renderLastTime = renderLastTime;
    root.progress = progress;
    root.stop = stop;
    root.upData = upData;

})(window.Zepto,window.player||(window.player = {}))