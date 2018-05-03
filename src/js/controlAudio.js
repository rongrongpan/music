(function($,root){
    
    function controlAudio(){
        this.audio = new Audio();
        this.status = 'pause';
    }

    controlAudio.prototype = {
        play:function(){
            this.status = 'play';
            this.audio.play();
        },
        stop:function(){
            this.status = 'pause';
            this.audio.pause();
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function(time){
            this.audio.currentTime = time;
            this.play();
        }
    }

    root.controlAudio = controlAudio;


})(window.Zepto,window.player||(window.player = {}))