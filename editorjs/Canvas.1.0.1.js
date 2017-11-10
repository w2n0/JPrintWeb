/**
 * @author 无量
 * enable:启用编辑
 */
 window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 

function LContainer(c)
{
	this.left=c.getBoundingClientRect().left;
	this.top=c.getBoundingClientRect().top;
	this.right=c.getBoundingClientRect().right;
	this.bottom=c.getBoundingClientRect().bottom;
	this.width=c.getBoundingClientRect().width;
	this.height=c.getBoundingClientRect().height;
}
//枚举操作类型
if(typeof CanvasOperaType == "undefined"){
	var CanvasOperaType =
	{
		NothIng: 1,//无操作
		Move: 2,//移动操作
		Size : 3,//更新大小操作
		Transverse: 4//表格宽度更新操作
	}
}
//定义坐标变量
if(typeof CoordInate == "undefined"){
	var CoordInate =
	{
		X: 0,
		Y: 0,
		W: 0,
		H: 0
	}
}

function Canvas(id,config)
{
	var Property={canvasid:id,template:null,container:null,enabled:true,telement:null,thelement:null,mousedown:false,
	handles:['tl','tm','tr','ml','mr','bl','bm','br'],isElement:null,isHandle:null,element:null,handle:null,zIndex:1,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,allowBlur:true,ondragfocus:null,ondragstart:null,ondragmove:null,ondragend:null,ondragblur:null,Nodes:[]};
	for(var p in Property)
	{
		this[p]=(typeof config[p]=='undefined')?Property[p]:config[p];
	}
	this.operaType=CanvasOperaType.NothIng;
	this.control=document.getElementById(this.canvasid);
	this.container=new LContainer(this.control);
	this.apply(document);
};
Canvas.prototype.ResetPosition=function()
{ 
	with(this)
	{
		container=new LContainer(this.control);
		var top=container.top-template.container.top;
		var left=container.left-template.container.left;

		for(var i=0;i<control.children.length;i++)
		{
			var item=control.children[i];
				item.style.top=parseFloat(item.style.top)+top+'px';
				item.style.left=parseFloat(item.style.left)+left+'px';
 
		}
	 
	 template.container=container;
 			 
	}
};
Canvas.prototype.ResetLayout=function(){
	with(this)
	{
		if(template)
		{
			this.control.innerHTML="";
			this.control.style.backgroundImage=template.backgroundImage;
			this.control.style.backgroundRepeat="no-repeat";
			for(var i=0;i<template.ElementList.length;i++)
			{
				control.appendChild(template.ElementList[i]);
			}
			ResetPosition();
		}
	}
}
Canvas.prototype.add=function(n)
{
	with(this)
	{
		if(template)
		{
			template.ElementList.push(n);
			
		control.appendChild(n);
		}
		else
		{
			
			alert("请创建模板或者选择一个模板！");
		}
	}
}
Canvas.prototype.apply=function(node)
{
	var obj=this;
	addEvent(node,'mousedown',function(e){obj.mouseDown(e)});
	addEvent(node,'mousemove',function(e){obj.mouseMove(e)});
	addEvent(node,'mouseup',function(e){obj.mouseUp(e)})
	addEvent(node,'keydown',function(e){obj.keyDown(e)});
};
Canvas.prototype.keyDown=function(e)
{	with(this)
	{
		if(e.keyCode==115) 
		{ 
		}
		else if(e.keyCode==46)
		{
			if(telement)
			{

				control.removeChild(telement);

				template.RemoveElement(telement);
				resizeHandleHidden();	
			}	
		}
	}
};
Canvas.prototype.mouseDown=function(e)
{
	with(this)
	{
		if(!document.getElementById||!enabled)
		return true;
		//elm 是获取鼠标下的对象，target获取对象的窗体类型以及css类型获取鼠标下的对象
		//newElement被操作的对象（移动或者拉伸）
		//newHandle是操作对象通过移动自身上级跟着移动
		var elm=e.target||e.srcElement,newElement=null,newHandle=null,hRE=new RegExp(canvasid+'-([trmbl]{2})','');
		if((template.ElementList.indexOf(elm)>=0||elm.className.indexOf("dragresize")>=0||(elm.nodeName=="TD"&&template.ElementList.indexOf(elm.parentNode.parentNode)>=0)))
		{

				if(hRE.test(elm.className))
				{
					if(telement.className.indexOf("dragresize")!=0)
					{
						thelement=telement;
					}
					telement=elm;
					operaType=CanvasOperaType.Size;
				}
				else if(elm.nodeName=="TD"&&
					(function() {
							var trArr = elm.parentNode.parentNode.children; 
					
							for(var trNo= 0; trNo < trArr.length; trNo++)
							{  
								if(elm.parentNode == elm.parentNode.parentNode.children[trNo])
								{   
									return trNo;
								} 
							}
					})()==0)
				{
					telement=elm;
					operaType=CanvasOperaType.Transverse;
				}
				else
				{
					
					if(elm.nodeName=="TD")
					{
						telement=elm.parentNode.parentNode;
					}
					else
					{
						telement=elm;
						telement.style.zIndex=++zIndex;
					}
					operaType=CanvasOperaType.Move;
					resizeHandle(telement);
				
				}
				mousedown=true;	 

		}
		else
		{
			resizeHandleHidden();
		}
	}	

};
Canvas.prototype.mouseMove=function(e)
{
	
	with(this)
	{
		if(!document.getElementById||!enabled)
		return true;
		var evt =e||window.event;
		var elm=e.target||e.srcElement;
		//鼠标较对应控件的位置
		var offsetX = evt.offsetX || (evt.clientX - srcObj.getBoundingClientRect().left);//这个比较关键，解决了Firefox无offsetX属性的问题
		//获取X轴和Y轴
		mouseX=e.pageX||e.clientX+document.documentElement.scrollLeft;
		mouseY=e.pageY||e.clientY+document.documentElement.scrollTop;
		//获取移动的X轴和Y轴的位置
		var diffX=mouseX-lastMouseX;
		var diffY=mouseY-lastMouseY;
		//保存鼠标位置用于下次移动
		lastMouseX=mouseX;
		lastMouseY=mouseY;
		//特殊控件鼠标移动时改变鼠标样式
		if(elm.nodeName=="TD"&&template.ElementList.indexOf(elm.parentNode.parentNode)>=0)
		{
			var rowIndex=(function() {
							var trArr = elm.parentNode.parentNode.children; 
							for(var trNo= 0; trNo < trArr.length; trNo++)
							{  
								if(elm.parentNode == elm.parentNode.parentNode.children[trNo])
								{   
									return trNo;
								} 
							}
					})();
			 
			if(elm.offsetWidth-offsetX <=10&&rowIndex==0){//实际改变前一单元格列宽，但是表格左边框线不可拖动
				elm.style.cursor='col-resize';
			}
			else if(offsetX<=10&&elm.cellIndex > 0&&rowIndex==0)
			{
				telement=elm.parentNode.cells[elm.cellIndex - 1];
				elm.style.cursor='col-resize';
			}
			else{
				elm.style.cursor='default';
			}
		}
		if(mousedown)
		{
			if(operaType==CanvasOperaType.Size)
			{
				//alert(thelement);
				resizeHandleDrag(diffX,diffY);
				with(thelement.style)
				{
					if(container.left>CoordInate.X+1)
					{
						CoordInate.X=container.left;
					}
					if(container.top>CoordInate.Y)
					{
						CoordInate.Y=container.top;
					}		
					left=CoordInate.X+'px';
					top=CoordInate.Y+'px';
					width=CoordInate.W+'px';
					height=CoordInate.H+'px'	
				}
				resizeHandle(thelement);
			}
			else if(operaType==CanvasOperaType.Transverse)
			{
				with(telement.style)
				{
					CoordInate.X=parseFloat(telement.offsetWidth)+diffX-1;
					width=CoordInate.X+'px';
				}
				resizeHandle(elm.parentNode.parentNode);
			}
			else if(operaType==CanvasOperaType.Move)
			{
						//设置移动范围和大小
				with(telement.style)
				{
					CoordInate.X=parseInt(telement.offsetLeft)+diffX;
					CoordInate.Y=parseInt(telement.offsetTop)+diffY;
					if(container.left>CoordInate.X+1)
					{
						CoordInate.X=container.left;
					}
					if(container.top>CoordInate.Y)
					{
						CoordInate.Y=container.top;
					}		
					left=CoordInate.X+'px';
					top=CoordInate.Y+'px';
				}
				resizeHandle(telement);
			}
		}
	}
};
Canvas.prototype.mouseUp=function(e)
{
	with(this)
	{
		mousedown=false;
	}
};
Canvas.prototype.resizeHandle=function(elm)
{
	//获取控件的布局位置和大小
	var top=elm.offsetTop;
	var left=elm.offsetLeft;
	var width=elm.offsetWidth;
	var height=elm.offsetHeight;
	with(this)
	{
		var bod= document.getElementsByTagName("BODY")[0];
		if(!bod._handle_tr)
		{
			for(var h=0;h<handles.length;h++)
			{
				var hCanvas=document.createElement('Canvas');
				hCanvas.style.zIndex=zIndex+1;
				switch(handles[h])
				{
					case "tl":
						hCanvas.style.top=top-3;
						hCanvas.style.left=left-3;
						hCanvas.style.cursor="nw-resize";
					break;
					case "tm":   
						hCanvas.style.top=top-3;
						hCanvas.style.left=left+width/2-2;
						hCanvas.style.cursor="n-resize";
					break;
					case "tr":
						hCanvas.style.top=top-3;
						hCanvas.style.left=left+width-4;
						hCanvas.style.cursor="ne-resize";
					break;
					case "ml":
						hCanvas.style.top=top+height/2-3;
						hCanvas.style.left=left-3;
						hCanvas.style.cursor="w-resize";
					break;
					case "mr":
						hCanvas.style.top=top+height/2-3;
						hCanvas.style.left=left+width-4;
						hCanvas.style.cursor="e-resize";
					break;
					case "bl":
						hCanvas.style.top=top+height-3;
						hCanvas.style.left=left-3;
						hCanvas.style.cursor="sw-resize";
					break;
					case "bm":
						hCanvas.style.top=top+height-3;
						hCanvas.style.left=left+width/2-2;
						hCanvas.style.cursor="s-resize";
					break;
					case "br":
						hCanvas.style.top=top+height-3;
						hCanvas.style.left=left+width-4;
						hCanvas.style.cursor="se-resize";
					break;
					default:
						hCanvas.style.top=top-8;
						hCanvas.style.left=left;
				}
						hCanvas.style.width = "5px";
						hCanvas.style.height = "5px";
						hCanvas.style.fontSize="1px";
						hCanvas.style.backgroundColor = "red";
						//elm.style.border="1px solid #333"; 
						hCanvas.style.position='absolute';
						hCanvas.className="dragresize"+' '+canvasid+'-'+handles[h];
						hCanvas.id="window_jb";
						bod['_handle_'+handles[h]]=bod.appendChild(hCanvas)//把小句柄加到父级里面并且父级可以引用。
			}
		}
		else if(!(elm.id=="window_jb"))
		{
			for(var h=0;h<handles.length;h++)
			{
				switch(handles[h])
				{
						case "tl":
							 bod['_handle_'+handles[h]].style.top=top-3;
							 bod['_handle_'+handles[h]].style.left=left-3;
							 bod['_handle_'+handles[h]].style.cursor="nw-resize";
						break;
						case "tm":
							 bod['_handle_'+handles[h]].style.top=top-3;
							 bod['_handle_'+handles[h]].style.left=left+width/2-2;
							 bod['_handle_'+handles[h]].style.cursor="n-resize";
						break;
						case "tr":
							 bod['_handle_'+handles[h]].style.top=top-3;
							 bod['_handle_'+handles[h]].style.left=left+width-4;
							 bod['_handle_'+handles[h]].style.cursor="ne-resize";
						break;
						case "ml":
							 bod['_handle_'+handles[h]].style.top=top+height/2-3;
							 bod['_handle_'+handles[h]].style.left=left-3;
							 bod['_handle_'+handles[h]].style.cursor="w-resize";
						break;
						case "mr":
							 bod['_handle_'+handles[h]].style.top=top+height/2-3;
						     bod['_handle_'+handles[h]].style.left=left+width-4;
							 bod['_handle_'+handles[h]].style.cursor="e-resize";
						break;
						case "bl":
							 bod['_handle_'+handles[h]].style.top=top+height-3;
							 bod['_handle_'+handles[h]].style.left=left-3;
							 bod['_handle_'+handles[h]].style.cursor="sw-resize";
						break;
						case "bm":
							 bod['_handle_'+handles[h]].style.top=top+height-3;
							 bod['_handle_'+handles[h]].style.left=left+width/2-2;
							 bod['_handle_'+handles[h]].style.cursor="s-resize";
						break;
						case "br":
							 bod['_handle_'+handles[h]].style.top=top+height-3;
							 bod['_handle_'+handles[h]].style.left=left+width-4;
							 bod['_handle_'+handles[h]].style.cursor="se-resize";
						break;
						default:
							 bod['_handle_'+handles[h]].style.top=top-8;
							 bod['_handle_'+handles[h]].style.left=left;
				}	
				bod['_handle_'+handles[h]].style.zIndex=zIndex+1;
				bod['_handle_'+handles[h]].style.visibility='inherit';
			}
		}
	}
}
Canvas.prototype.resizeHandleHidden=function(){
	with(this)
	{
		var bod= document.getElementsByTagName("BODY")[0];
		if(bod._handle_tr)
		{
			for(var h=0;h<handles.length;h++)
			{
				bod['_handle_'+handles[h]].style.visibility='hidden';
			}
		}
	}
};
Canvas.prototype.resizeHandleDrag=function(diffX,diffY)
{
	with(this)
	{
		var hClass=telement&&telement.className&&telement.className.match(new RegExp(canvasid+'-([tmblr]{2})'))?RegExp.$1:'';
		var dY=diffY,dX=diffX;
		var elmW=thelement.offsetWidth;
		var	elmH=thelement.offsetHeight;
		var elmX=parseInt(thelement.offsetLeft);
		var elmY=parseInt(thelement.offsetTop);
		if(hClass.indexOf('t')>=0)
		{
			elmY+=diffY;
			elmH-=diffY;
		}
		if(hClass.indexOf('b')>=0)
		{
			elmH+=diffY;
		}
		if(hClass.indexOf('l')>=0)
		{
			elmX+=diffX;
			elmW-=diffX;
		}
		if(hClass.indexOf('r')>=0)
		{
			elmW+=diffX;
		}
		CoordInate.X=elmX;
		CoordInate.Y=elmY;
		CoordInate.W=elmW;
		CoordInate.H=elmH;
	}
};