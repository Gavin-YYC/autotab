//初始化配置
var tabBox = "tab";		//指定tab容器
var currentTab = 3;		//自定义首个tab，从0开始
var autoTab = true;		//是否自动切换
var speed = 1000;		//自动切换速度
var mousewheel = true;	//是否支持滚轮

//dom操作
var tab = document.getElementById(tabBox);
var allEle = tab.getElementsByTagName("*");
var li = [], content = [], j=0, timer = null;

//获取li以及content
for (var i = 0; i < allEle.length; i++) {
	if(allEle[i].className.indexOf("content")>-1)
		content[j++] = allEle[i];
	if (allEle[i].className.indexOf("nav")>-1)
		li = allEle[i].getElementsByTagName("li")
};

//增加点击事件
for (var i = 0; i < li.length; i++) {
	li[i].index = i;
	li[i].onclick = tabShow;
};

//切换tab
function tabShow(){
	for (var j = 0; j < li.length; j++) {
		li[j].className = "";
		content[j].style.display = "none";
	};
	this.className = "active";
	content[this.index].style.display = "block";
}

//自动切换
function autoSwitch(){
	var k = 0;
	for (var i = 0; i < li.length; i++) {
		if (li[i].className.indexOf("active")>=0) {
			li[i].className = "";
			content[i].style.display = "none";
			k = i+1;
			k = k > li.length-1 ? 0 : k;
		}
	};
	li[k].className = "active";
	content[k].style.display = "block";
}

//自定义首个tab
if (typeof currentTab === "number" && currentTab > 0) {
	for (var i = 0; i < li.length; i++) {
		li[i].className = "";
		content[i].style.display = "none";
	};
	li[currentTab].className = "active";
	content[currentTab].style.display = "block";
};

//自动切换
if (autoTab === true) {
	timer = setInterval(autoSwitch,speed);

	//鼠标放在tab上，停止切换
	tab.onmouseover = function(){
		clearInterval(timer);
	}
	//鼠标移出tab，继续切换
	tab.onmouseout = function(){
		clearInterval(timer);
		timer = setInterval(autoSwitch, speed);
	}
};

//鼠标切换
if (mousewheel === true) {
	tab.onmousewheel = function(){
		autoSwitch();
	}
};