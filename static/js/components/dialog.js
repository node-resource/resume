/*
* created by liguang
* @dec：用于绘制各种弹框提示
* @params:
* 	type:弹框类型
* 		tip:模态框 （默认）
 */

var Dialog = function(opt) {
	this.type = opt.type || "tip";
	this.content = opt.content || "";
	this.init();
};

Dialog.prototype = {
	constructor:Dialog,
	init:function() {
		var self = this;
		if(self.type === "tip"){
			self.paintTip();
		}
	},
	paintTip:function() {
		var self = this;
		var $wrap = $('<div class="tip-box">'+self.content+'</div>');
		if($(".tip-box").length === 0 && self.content){
			$('body').append($wrap);
			setTimeout(function(){
				$wrap.fadeOut('1000', function() {
					$wrap.remove();
				});
			},1000)
		}
	}
}

//module.exports = Dialog;