(function($,root){
    function ControlIndex(len){
        this.index = index;
        this.len = len;
    }
    ControlIndex.prototype = {
        prev:function(){
            return this.dealIndex(-1);
        },
        next:function(){
            return this,this.dealIndex(1);
        },
        dealIndex:function(data){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + data)%len;
            this.index = curIndex;
            return curIndex;
        }

    }

    root.ControlIndex = ControlIndex;


})(window.Zepto,window.player||(window.player = {}))