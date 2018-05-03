(function($,root){
    var $scope = $(document.body);
    function renderImg(src){
        var oImg = new Image();
        oImg.src = src;
        oImg.onload = function(){
            $scope.find('.img-wrapper').html(oImg);
            root.blurImg(oImg,$scope);
        }
    }
    function renderInfo(data){
        var html = '<div class="song">'+ data.song +'</div>\
        <div class="album">'+ data.album +'</div>\
        <div class="singer">'+ data.singer +'</div>';
        $scope.find('.music-info').html(html);
    }
    function renderLike(data){
        if(data){
            $scope.find('.like').removeClass('no-like');
        }else{
            $scope.find('.like').addClass('no-like');
        }
    }
    root.render = function (data){
        renderImg(data.image);
        renderInfo(data);
        renderLike(data.isLike);
        
    }

})(window.Zepto,window.player||(window.player = {}))