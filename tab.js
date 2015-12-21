;(function(document){
	'use strict';
	function TabSwitch(options){
		var self = this;
		this.li = [];
		this.content = [];
		this.timer = null;
		this.tab = null;
		this.allEle = null;
		this.options = options || {};

		//default options
		this.defaultOptions = {
			tabBox: "tab",
			indexTab: 0,
			autoTab: true,
			speed: 1000,
			mousewheel: true
		};
		//配置项拷贝
		this.options = this.initOptions(this.options, this.defaultOptions);

		//初始化
		this.init();
	};

	//初始化
	TabSwitch.prototype.init = function(){
		var j = 0;
		var self = this;
		this.tab = document.getElementById(this.options.tabBox);
		this.allEle = this.tab.getElementsByTagName("*");
		for (var i = 0; i < this.allEle.length; i++) {
			if(this.allEle[i].className.indexOf("content")>-1)
				this.content[j++] = this.allEle[i];
			if (this.allEle[i].className.indexOf("nav")>-1)
				this.li = this.allEle[i].getElementsByTagName("li");
		};

		//初始化点击切换
		for (var i = 0; i < this.li.length; i++) {
			this.li[i].index = i;
			this.li[i].onclick = function(){
				self.tabShow(this);
			}
		};
		
		//初始化自动切换tab
		this.initAuto();

		//初始化首个Tab
		this.indexTab();

		//初始化滚轮
		this.mousewheel();
	};

	TabSwitch.prototype.initAuto = function(){
		if (this.options.autoTab) {
			this.timer = setInterval(this.autoSwitch.bind(this), this.options.speed);
			this.tabAutoControl();
		}
	};

	TabSwitch.prototype.initOptions = function(src, des){
		for(var i in src){
			if (src.hasOwnProperty(i)) {
				des[i] = src[i];
			};
		}
		return des;
	}

	//鼠标点击切换
	TabSwitch.prototype.tabShow = function(that){
		for (var j = 0; j < this.li.length; j++) {
			this.li[j].className = "";
			this.content[j].style.display = "none";
		};
		that.className = "active";
		this.content[that.index].style.display = "block";
	};

	//自动切换
	TabSwitch.prototype.autoSwitch = function(){
		var k = 0;
		for (var i = 0; i < this.li.length; i++) {
			if (this.li[i].className.indexOf("active")>=0) {
				this.li[i].className = "";
				this.content[i].style.display = "none";
				k = i+1;
				k = k > this.li.length-1 ? 0 : k;
			}
		};
		this.li[k].className = "active";
		this.content[k].style.display = "block";
	};

	//自动切换控制
	TabSwitch.prototype.tabAutoControl = function(){
		var self = this;
		//鼠标放在tab上，停止切换
		this.tab.onmouseover = function(){
			clearInterval(self.timer);
		};
		//鼠标移出tab，继续切换
		this.tab.onmouseout = function(){
			clearInterval(self.timer);
			self.timer = setInterval(self.autoSwitch.bind(self), self.options.speed);
		};
	};

	//鼠标滚轮切换
	TabSwitch.prototype.mousewheel = function(){
		var self = this;
		if (this.options.mousewheel === true) {
			this.tab.onmousewheel = function(){
				self.autoSwitch();
			};
		};
	};

	//自定义首页tab
	TabSwitch.prototype.indexTab = function(){
		if (this.options.indexTab > 0) {
			for (var i = 0; i < this.li.length; i++) {
				this.li[i].className = "";
				this.content[i].style.display = "none";
			};
			this.li[this.options.indexTab].className = "active";
			this.content[this.options.indexTab].style.display = "block";
		};
	};

	window["TabSwitch"] = TabSwitch;

})(document)