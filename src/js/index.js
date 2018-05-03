var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var index = 0;
var controlIndex;
var controlAudio;
var songList;
var audio = new root.controlAudio();
function getData(url){
    $.ajax({
        type:'GET',
        url:url,
        success:function(data){
            console.log(data);
            songList = data;
            controlIndex = new root.ControlIndex(data.length);
            controlAudio = new root.controlAudio();
            // audio.getAudio(data[0].audio);
            bindEvent();
            TouchEvent();
            $scope.trigger('autoPlay',0);
    
        },
        error:function(){
            console.log('error');
            
        }
    })

    
}
getData('../mock/data.json');

function bindEvent(){
    $scope.on('click','.prev',function(){
        var index = controlIndex.prev();
        root.stop();
            if(audio.status == 'play'){
                root.progress();
            }
        $scope.trigger('autoPlay',index);
    })
        .on('click','.next',function(){
            var index = controlIndex.next();
            root.stop();
            if(audio.status == 'play'){
                root.progress();
            }
            $scope.trigger('autoPlay',index);
            
        })
        .on('click','.pause',function(){
            console.log(audio.status);
            if(audio.status == 'pause'){
                audio.play();
                root.progress();
            }else{
                audio.stop();
                root.stop();
            }
            $(this).toggleClass('play');
            
        })
    
    $scope.on("autoPlay",function(event,index){
        audio.getAudio(songList[index].audio);
        root.render(songList[index]);
        root.renderLastTime(songList[index].duration);
        if(audio.status == 'play'){
            audio.play();
        }
    })
    
}

function TouchEvent(){
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $scope.find('.slider')
    .on('touchstart',function(){
        root.stop();
        audio.stop();
        

    })
    .on('touchmove',function(e){
        var prec = (e.changedTouches[0].clientX - left)/width;
        if(prec <0 || prec >1){
            prec = 0;
        }
        // console.log(prec)
        root.upData(prec);
    })
    .on('touchend',function(e){
        var prec = (e.changedTouches[0].clientX - left)/width;
        if(prec <0 || prec >1){
            prec = 0;
        }
        var curTime = prec * songList[controlIndex.index].duration;
        audio.playTo(curTime);
        root.progress(prec);
        $('.pause').removeClass('play');
    })
}