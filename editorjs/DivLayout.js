/**
 * @author wuliang
 */
function Div(myName,config)
{
	var Property={myName:myName,enabled:true,handles:['tl','tm','tr','ml','mr','bl','bm','br'],isElement:null,isHandle:null,element:null,handle:null,minWidth:10,minHeight:10,minLeft:0,maxLeft:9999,minTop:0,maxTop:9999,zIndex:1,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mOffX:0,mOffY:0,elmX:0,elmY:0,elmW:0,elmH:0,allowBlur:true,ondragfocus:null,ondragstart:null,ondragmove:null,ondragend:null,ondragblur:null};
	 for(var p in Property)
	 this[p]=(typeof config[p]=='undefined')?Property[p]:config[p]
};
Div.prototype.apply=function(node)
{
 var obj=this;
 addEvent(node,'mousedown',function(e){obj.mouseDown(e)});
 addEvent(node,'mousemove',function(e){obj.mouseMove(e)});
addEvent(node,'mouseup',function(e){obj.mouseUp(e)})
addEvent(node,'keydown',function(e){obj.keyDown(e)});
};
Div.prototype.keyDown=function(e)
{
if(e.keyCode==115) 
{ 
alert(e.target);
eleproperty=new ELEMENTPROPERTY(e);
eleproperty.Layout();
}
};
Div.prototype.mouseDown=function(e)
{
with(this)
	{
	if(!document.getElementById||!enabled)
	return true;
//elm 是获取鼠标下的对象，target获取对象的窗体类型以及css类型获取鼠标下的对象
//newElement被操作的对象（移动或者拉伸）
//newHandle是操作对象通过移动自身上级跟着移动
	var elm=e.target||e.srcElement,newElement=null,newHandle=null,hRE=new RegExp(myName+'-([trmbl]{2})','');
	while(elm)
		{
		if(elm.className)
			{
				//判断如果鼠标下是句柄或则是指定的css类对象如果是则付给操作对象
			if(!newHandle&&(hRE.test(elm.className)||isHandle(elm)))
			newHandle=elm;
			//判断是不是制定的CSS类对象如果是则付给被操作对象
			if(isElement(elm))
				{
		 	 if(elm.className.indexOf("dragresize")>=0)
				newElement=element;
				else  /* 如果想实现句柄也能拖动就加上这句话*/
				newElement=elm;
			//如果已经存在被操作对象那么就不用找上级了
				break
				}
			}
			//找出elm的上级
		elm=elm.parentNode
	}
	
	/*//如果存在被操作对象并且当前对象不是被操作对象则执行
	if(element&&(element!=newElement)&&allowBlur)
	deselect(true);*/
	if(!newElement)
	deselect(true);
//如果存在新的element
	if(newElement)
		{
		if(newHandle)
		cancelEvent(e);
		
		select(newElement,newHandle);
		//操作对象赋予handle属性
		handle=newHandle;
		//如果存在操作句柄并且存在函数ondragstart则执行
		if(handle&&ondragstart)
		this.ondragstart(hRE.test(handle.className))
		}
	}

};
Div.prototype.mouseMove=function(e)
{
	
 with(this)
	{
	if(!document.getElementById||!enabled)
	return true;
	//获取X轴和Y轴
	mouseX=e.pageX||e.clientX+document.documentElement.scrollLeft;
	mouseY=e.pageY||e.clientY+document.documentElement.scrollTop;
	//获取移动的X轴和Y轴的位置
	var diffX=mouseX-lastMouseX+mOffX;
	var diffY=mouseY-lastMouseY+mOffY;
	mOffX=mOffY=0;
	//保存鼠标位置用于下次移动
	lastMouseX=mouseX;
	lastMouseY=mouseY;

	if(!handle)//如果没有操作对象则返回
	return true;
	var isResize=false;
 //如果是操作对象(句柄)操作
	if(this.resizeHandleDrag&&this.resizeHandleDrag(diffX,diffY))
		{
		isResize=true
		}
	else//如果是操作对象操作
		{
		
		var dX=diffX,dY=diffY;
		if(elmX+dX<minLeft)
		mOffX=(dX-(diffX=minLeft-elmX));
		else if(elmX+elmW+dX>maxLeft)
		mOffX=(dX-(diffX=maxLeft-elmX-elmW));
		if(elmY+dY<minTop)
		mOffY=(dY-(diffY=minTop-elmY));
		else if(elmY+elmH+dY>maxTop)
		mOffY=(dY-(diffY=maxTop-elmY-elmH));
		elmX+=diffX;
		elmY+=diffY
		}
	with(element.style)
		{//移动距离
		
		left=elmX+'px';
		width=elmW+'px';
		top=elmY+'px';
		height=elmH+'px'
		resizeHandleSet(element,true);
		}
	if(window.opera&&document.documentElement)
		{
		var oDF=document.getElementById('op-drag-fix');
		if(!oDF)
			{
			var oDF=document.createElement('input');
			oDF.id='op-drag-fix';
			oDF.style.display='none';
			document.body.appendChild(oDF)
			}
		oDF.focus()
		}
		if(ondragmove)
		this.ondragmove(isResize);
		cancelEvent(e)
	}
};
Div.prototype.mouseUp=function(e)
{
	with(this)
	{
	if(!document.getElementById||!enabled)
	return;
	var hRE=new RegExp(myName+'-([trmbl]{2})','');
	if(handle&&ondragend)
	this.ondragend(hRE.test(handle.className));
	deselect(false)
	}
};
Div.prototype.select=function(newElement)
{ 
with(this)
	{
	if(!document.getElementById||!enabled)
	return;
 
	if(newElement)
		{
		
		//把被操作对象赋予element,element是上一个被操作对象
 
		element=newElement;
		//让element置顶
		element.style.zIndex=++zIndex;
		//如果存在resizeHandleSet  则出现句柄
		if(this.resizeHandleSet)
		this.resizeHandleSet(element,true);
		//获取被操作对象的X轴Y轴宽度和高度
		elmX=parseInt(element.offsetLeft);
		elmY=parseInt(element.offsetTop);
		//elmX=parseInt(element.style.left);
		//elmY=parseInt(element.style.top);
		elmW=element.offsetWidth;
		elmH=element.offsetHeight;
		//如果存在ondragfocus这个函数则执行
		if(ondragfocus)
		this.ondragfocus()
		}
	}
};
Div.prototype.deselect=function(delHandles)
{
with(this)
	{
	if(!document.getElementById||!enabled)
	return;
	if(delHandles)
		{
		if(ondragblur)
		this.ondragblur();
		if(this.resizeHandleSet)
		this.resizeHandleSet(element,false);
		//element=null
		//如果设置这个就无法保存element
		}
	handle=null;
	mOffX=0;
	mOffY=0
	}
};
 
Div.prototype.resizeHandleSet=function(elm,show)
{
	//获取控件的布局位置和大小
var top=0;
var left=0;
var width=elm.offsetWidth;
var height=elm.offsetHeight;
var pelm=elm;
while(pelm.offsetParent){
top=pelm.offsetTop;
left=pelm.offsetLeft;
pelm=pelm.offsetParent;
}
with(this)
	{
			var bod= document.getElementsByTagName("BODY")[0];
	if(!bod._handle_tr)
		{
			
		for(var h=0;h<handles.length;h++)
			{
				var hDiv=document.createElement('div');
				switch(handles[h])
			{
				case "tl":
				 hDiv.style.top=top-8;
				 hDiv.style.left=left-5;
				 hDiv.style.cursor="nw-resize";
				break;
				case "tm":   
				 hDiv.style.top=top-8;
				  hDiv.style.left=left+width/2;
				   hDiv.style.cursor="n-resize";
				break;
				case "tr":
					 hDiv.style.top=top-8;
				 hDiv.style.left=left+width;
				 	  hDiv.style.cursor="ne-resize";
				break;
				case "ml":
					 hDiv.style.top=top+height/2-4;
				 hDiv.style.left=left-5;
				  hDiv.style.cursor="w-resize";
				break;
				case "mr":
				 hDiv.style.top=top+height/2-4;
				 hDiv.style.left=left+width;
				  hDiv.style.cursor="e-resize";
				break;
				case "bl":
					 hDiv.style.top=top+height;
				 hDiv.style.left=left-5;
				  hDiv.style.cursor="sw-resize";
				break;
				case "bm":
					 hDiv.style.top=top+height;
						  hDiv.style.left=left+width/2;
						   hDiv.style.cursor="s-resize";
				break;
				case "br":
				 hDiv.style.top=top+height;
				 hDiv.style.left=left+width;
				  hDiv.style.cursor="se-resize";
				break;
				default:
					 hDiv.style.top=top-8;
					 hDiv.style.left=left;
			}
			
			hDiv.className="dragresize"+' '+myName+'-'+handles[h];
			hDiv.id="window_jb";
			bod['_handle_'+handles[h]]=bod.appendChild(hDiv)//把小句柄加到父级里面并且父级可以引用。
			}
		}
if(!(elm.id=="window_jb"))
	for(var h=0;h<handles.length;h++)
		{
			switch(handles[h])
			{
				case "tl":
				 bod['_handle_'+handles[h]].style.top=top-8;
				 bod['_handle_'+handles[h]].style.left=left-5;
				 bod['_handle_'+handles[h]].style.cursor="nw-resize";
				break;
				case "tm":
				 bod['_handle_'+handles[h]].style.top=top-8;
				  bod['_handle_'+handles[h]].style.left=left+width/2;
				   bod['_handle_'+handles[h]].style.cursor="n-resize";
				break;
				case "tr":
					 bod['_handle_'+handles[h]].style.top=top-8;
				 bod['_handle_'+handles[h]].style.left=left+width;
				 	  bod['_handle_'+handles[h]].style.cursor="ne-resize";
				break;
				case "ml":
					 bod['_handle_'+handles[h]].style.top=top+height/2-4;
				 bod['_handle_'+handles[h]].style.left=left-5;
				  bod['_handle_'+handles[h]].style.cursor="w-resize";
				break;
				case "mr":
				 bod['_handle_'+handles[h]].style.top=top+height/2-4;
				 bod['_handle_'+handles[h]].style.left=left+width;
				  bod['_handle_'+handles[h]].style.cursor="e-resize";
				break;
				case "bl":
					 bod['_handle_'+handles[h]].style.top=top+height;
				 bod['_handle_'+handles[h]].style.left=left-5;
				  bod['_handle_'+handles[h]].style.cursor="sw-resize";
				break;
				case "bm":
					 bod['_handle_'+handles[h]].style.top=top+height;
						  bod['_handle_'+handles[h]].style.left=left+width/2;
						   bod['_handle_'+handles[h]].style.cursor="s-resize";
				break;
				case "br":
				 bod['_handle_'+handles[h]].style.top=top+height;
				 bod['_handle_'+handles[h]].style.left=left+width;
				  bod['_handle_'+handles[h]].style.cursor="se-resize";
				break;
				default:
					 bod['_handle_'+handles[h]].style.top=top-8;
				 bod['_handle_'+handles[h]].style.left=left;
			}	
		bod['_handle_'+handles[h]].style.visibility=show?'inherit':'hidden'
		}
	}
};
Div.prototype.resizeHandleDrag=function(diffX,diffY)
{
with(this)
	{
	var hClass=handle&&handle.className&&handle.className.match(new RegExp(myName+'-([tmblr]{2})'))?RegExp.$1:'';
	var dY=diffY,dX=diffX,processed=false;
	if(hClass.indexOf('t')>=0)
		{
		rs=1;
		if(elmH-dY<minHeight)
		mOffY=(dY-(diffY=elmH-minHeight));
		else if(elmY+dY<minTop)
		mOffY=(dY-(diffY=minTop-elmY));
		elmY+=diffY;
		elmH-=diffY;
		processed=true
		}
	if(hClass.indexOf('b')>=0)
		{
		rs=1;
		if(elmH+dY<minHeight)
		mOffY=(dY-(diffY=minHeight-elmH));
		else if(elmY+elmH+dY>maxTop)
		mOffY=(dY-(diffY=maxTop-elmY-elmH));
		elmH+=diffY;
		processed=true
		}
	if(hClass.indexOf('l')>=0)
		{
		rs=1;
		if(elmW-dX<minWidth)
		mOffX=(dX-(diffX=elmW-minWidth));
		else if(elmX+dX<minLeft)
		mOffX=(dX-(diffX=minLeft-elmX));
		elmX+=diffX;
		elmW-=diffX;
		processed=true
		}
	if(hClass.indexOf('r')>=0)
		{
		rs=1;
		if(elmW+dX<minWidth)
		mOffX=(dX-(diffX=minWidth-elmW));
		else if(elmX+elmW+dX>maxLeft)
		mOffX=(dX-(diffX=maxLeft-elmX-elmW));
		elmW+=diffX;processed=true
		}
	return processed
	}
};