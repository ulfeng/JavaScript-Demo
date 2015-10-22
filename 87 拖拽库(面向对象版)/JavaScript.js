function Drag() {
    // 初始化
    this.initialize.apply(this,arguments)
}

Drag.prototype = {
    // 初始化
    initialize:function(drag,options){
        this.drag = this.$(drag);
        this._x = this._y = 0;
        this._moveDrag = this.bind(this, this.moveDrag);
        this._stopDrag = this.bind(this, this.stopDrag);

        this.setOptions(options);

        this.handle = this.$(this.options.handle);

    }

}