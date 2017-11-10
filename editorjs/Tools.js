/**
 * @author 无量
 */
function Tool(title,Config){
	var Property = {title:null};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
}
function PopupTable(id,Config)
{
	var Property = {id:id,text:"ss",PopupTitle:"",PopupSpan:"",jdatasource:null,jtable:null};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.divPopup=null;
	this.eventConfirm=null;
	this.tselect=null;
	this.eventClick=null;
	this.Init();
}
PopupTable.prototype.CreatePopuup=function(){
	var obj=this;
	var table =document.createElement('table');
	table.setAttribute("width","100%");
	table.setAttribute("cellspacing","1");
	table.setAttribute("cellpadding","5");
	table.setAttribute("style","white-space:nowrap;border:1px solid #cccccc");
	var tr=document.createElement("tr");
	var ltd=document.createElement("td");
	ltd.setAttribute("nowrap","");
	ltd.setAttribute("style","white-space:nowrap;");
	var ctd=document.createElement("td");
	ctd.setAttribute("nowrap","");
	ctd.setAttribute("style","white-space:nowrap;");
	var rtd=document.createElement("td");
	rtd.setAttribute("nowrap","");
	rtd.setAttribute("style","white-space:nowrap;");
	rtd.setAttribute("align","center");
	rtd.setAttribute("valign","middle");
	var div4=document.createElement('div');
	div4.setAttribute("class","modal-body");
	var sselect=document.createElement('select');
	sselect.setAttribute("name","pets");
	sselect.setAttribute("style","width:100%;");
	sselect.setAttribute("size","10");
	sselect.setAttribute("multiple","multiple");
	addEvent(sselect,'dblclick',function(e){obj.SourcedblClick(this.value)});
	for (var key in this.jdatasource.json)
	{
		for(var v in this.jdatasource.json[key])
		{
			var t=this.jdatasource.json[key][v];
			var soption=document.createElement('option');
			soption.innerHTML="#"+key+'.'+t+"#";
			sselect.appendChild(soption);
		}
	}
	var tselect=document.createElement('select');
	tselect.setAttribute("name","pets");
	tselect.setAttribute("style","width:100%;height:213px;");
	tselect.setAttribute("size","10");
	tselect.setAttribute("multiple","multiple");
	this.tselect=tselect;
	var dbutton=document.createElement("button");
	dbutton.setAttribute("class","btn btn-secondary btn-lg");
	dbutton.setAttribute("style","padding: 0px;font-size:12px;");
	dbutton.setAttribute("type","button");
	dbutton.innerHTML="删除";
	addEvent(dbutton,'click',function(e){
		var index = tselect.selectedIndex;
		if ( (index < 0))
		return;
		tselect.options.remove(index);
		
	});
	var ubutton=document.createElement("button");
	ubutton.setAttribute("class","btn btn-secondary btn-lg");
	ubutton.setAttribute("style","padding: 0px;font-size:12px;");
	ubutton.setAttribute("type","button");
	ubutton.innerHTML="上移";
	addEvent(ubutton,'click',function(e){obj.SelectUp(e)});
	var rbutton=document.createElement("button");
	rbutton.setAttribute("class","btn btn-secondary btn-lg");
	rbutton.setAttribute("style","padding: 0px;font-size:12px;");
	rbutton.setAttribute("type","button");
	rbutton.setAttribute("data-dismiss","modal");
	rbutton.setAttribute("aria-hidden","true");
	rbutton.innerHTML="确认";
	addEvent(rbutton,'click',function(e){
			obj.OnClick()
	});
	ltd.appendChild(sselect);
	ctd.appendChild(tselect);
	rtd.appendChild(dbutton);
	rtd.appendChild(document.createElement("br"));
	rtd.appendChild(document.createElement("br"));
	rtd.appendChild(ubutton);
	rtd.appendChild(document.createElement("br"));
	rtd.appendChild(document.createElement("br"));
	rtd.appendChild(rbutton);
	tr.appendChild(ltd);
	tr.appendChild(ctd);
	tr.appendChild(rtd);
	table.appendChild(tr);
	div4.appendChild(table);
	var title=document.createElement('h7');
	title.innerHTML=this.PopupTitle;
	var button=document.createElement('button');
	button.setAttribute("type","button");
	button.setAttribute("class","close");
	button.setAttribute("data-dismiss","modal");
	button.setAttribute("aria-hidden","true");
	button.innerHTML = "&times;";
	var div3=document.createElement('div');
	div3.setAttribute("class","modal-header");
	div3.appendChild(button);
	div3.appendChild(title);
	var div2=document.createElement('div');
	div2.setAttribute("class","modal-content");
	div2.appendChild(div3);
	div2.appendChild(div4);
	var div1=document.createElement('div');
	div1.setAttribute("class","modal-dialog");
	div1.setAttribute("style","width:500px;");
	div1.setAttribute("role","document");
	div1.appendChild(div2);
	var divPopup=document.createElement('div');
	divPopup.setAttribute("id","myModal"+this.id);
	divPopup.setAttribute("class","modal fade");
	divPopup.setAttribute("tabindex","-1");
	divPopup.setAttribute("role","dialog");
	divPopup.setAttribute("aria-labelledby","myModalLabel2");
	divPopup.appendChild(div1);
	document.body.appendChild(divPopup);
	this.divPopup=divPopup;

}
PopupTable.prototype.SourcedblClick=function(e)
{
	with(this){
		var toption=document.createElement('option');
		toption.innerHTML=e;
		tselect.appendChild(toption);
	}
 
}
PopupTable.prototype.SelectUp=function()
{
	with(this)
	{
		var direct=-1;
		var len = tselect.length;
		var index = tselect.selectedIndex;
		if ( (index <= 0))
		return;
		var swapIndex = index + direct;
		var tempOptions = new Array();
		for (var i = 0; i < len; i++){
			tempOptions[tempOptions.length] = tselect.options[i == index?swapIndex:(i == swapIndex?index:i)];
		}
		tselect.options.length = 0;
		for (var i = 0; i < len; i++)
			tselect.options.add(tempOptions[i]);
	}
}
PopupTable.prototype.Init=function(){
	this.CreatePopuup();
	var li =document.createElement('li');
	var a = document.createElement('a');
			var obj=this;
	with(this)
	{
		a.setAttribute("role","button");
		a.setAttribute("class","dropdown-toggle");
		a.setAttribute("data-toggle","modal");
		a.setAttribute("data-target","#myModal"+id);
		a.setAttribute("aria-haspopup","true");
		a.setAttribute("aria-expanded","false");
		a.innerHTML = text;
	 }
	 li.appendChild(a);
	 this.element=li;
		
}
PopupTable.prototype.OnClick=function(e)
{
	var len = this.tselect.length;
	if(len>0)
	{
		this.eventClick(this.tselect);
	}
}
function Text(id,Config)
{
	var Property = {id:id,text:""};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.element=null;
	this.eventClick=null;
	this.input=null;
	this.Init();
	
}
Text.prototype.Init=function()
{
	var li =document.createElement('li');
	var input=document.createElement('input');
	input.setAttribute("type","text");
	input.setAttribute("value",this.text);
	input.style.marginTop="13px";
	input.style.width="30px";
	var label=document.createElement('span');
	label.innerHTML="连打偏差:";
	label.style.color="RGB(119,119,119)"; 
	var label1=document.createElement('span');
	label1.innerHTML="mm";
	label1.style.color="RGB(119,119,119)"; 
	li.appendChild(label);
	li.appendChild(input);
	li.appendChild(label1);
	this.element=li;
	this.input=input;
	var obj=this;
	addEvent(input,'blur',function(e){obj.onBlur(input.value)});
}
Text.prototype.SetValue=function(o)
{
	this.input.value=o;
	
 
}
Text.prototype.onBlur=function(e)
{
	this.eventClick(e);
}
function Button(id,Config)
{
	var Property = {id:id,text:"",bold:false,italic:false,del:false,isfile:false};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.element=null;
	this.file=null;
	this.value=null;
	this.eventClick=null;
	this.Init();
	
}
Button.prototype.Init=function()
{
	var li =document.createElement('li');
	var a=document.createElement('a');
	a.setAttribute("href","#");
	a.setAttribute("class","dropdown-toggle");
	a.setAttribute("data-toggle","dropdown");
	a.setAttribute("aria-haspopup","true");
	a.setAttribute("aria-expanded","false");
	li.appendChild(a);
	var tag;
	if(this.bold)
	{
		tag=document.createElement('B');
		tag.innerHTML=this.text;
		a.appendChild(tag);
	}
	else if(this.italic)
	{
		tag=document.createElement('I');
		tag.innerHTML=this.text;
		a.appendChild(tag);
	}
	else if(this.del)
	{
		tag=document.createElement('S');
		tag.innerHTML=this.text;
		a.appendChild(tag);
	}
	else
	{
		a.innerHTML=this.text;
	}
	if(this.isfile)
	{
		var file=document.createElement('input');
		file.setAttribute("id","file"+this.id);
		file.setAttribute("type","file");
		file.setAttribute("accept",".png,.jpg,.gif");
		file.setAttribute("style","display:none");
		file.setAttribute("name","file"+this.id);
		this.file=file;
		li.appendChild(file);
	}
	li.appendChild(a);
	this.element=li;
	var obj=this;
	addEvent(li,'click',function(e){obj.OnClick(e)});
}
Button.prototype.OnClick=function(e)
{
	var obj=this;
	if(this.isfile)
	{
		this.file.click();//加一个触发事件 
		this.file.onchange=function(){
			if(this.files &&this.files[0]){
				var addr=window.URL.createObjectURL(this.files[0]);
				obj.eventClick(this.files[0].name);
			}
		}
	}
	else
	{
		obj.eventClick(e);
	}
	
}
function DorpDown(id,Config)
{
	var Property = {id:id,data:[]};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.element=null;
	this.container=null;
	this.span=null;
	this.eventClick=null;
	this.Init();
}

DorpDown.prototype.Init=function()
{
	var li =document.createElement('li');
	var b=document.createElement('b');
	b.setAttribute("class","caret");
	var span=document.createElement('span');
	span.innerHTML="";
	var a=document.createElement('a');
	a.setAttribute("id",this.id);
	a.setAttribute("href","#");
	a.setAttribute("role","button");
	a.setAttribute("class","dropdown-toggle");
	a.setAttribute("data-toggle","dropdown");
	a.setAttribute("data-placement","left");
	a.setAttribute("title","");
	a.setAttribute("data-original-title","1");
	a.appendChild(span);
	a.appendChild(b);
	var ul=document.createElement('ul');
	ul.setAttribute("class","dropdown-menu");
	ul.setAttribute("aria-labelledby",this.id);
	li.appendChild(a);
	li.appendChild(ul);
	this.element=li;
	this.container=ul;
	this.span=span;
}
DorpDown.prototype.Add=function(o)
{
	var b=true;
	for(var i=0;i< this.data.length;i++)
	{
	   if(this.data[i]==o)
		{
			b=false;
			break;
		}
	};
	if(b)
	{
		this.data.push(o);
		var li =document.createElement('li');
		var a=document.createElement('a');
		a.setAttribute("href","#");
		a.innerHTML=o;
		li.appendChild(a);
		this.container.appendChild(li);
		this.span.innerHTML=o;
		var obj=this;
		addEvent(li,'click',function(e){obj.OnClick(o)});
	}
}
DorpDown.prototype.OnClick=function(o)
{
	this.span.innerHTML=o;
	this.eventClick(o);
}
function PopupButton(id,Config)
{
	var Property = {id:id,text:"ss",PopupTitle:"",PopupSpan:""};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.divPopup=null;
	this.eventConfirm=null;
	this.eventClick=null;
	this.Init();
}
PopupButton.prototype.CreatePopuup=function(){
	var obj=this;
	var confirm=document.createElement('button');
	confirm.setAttribute("class","btn btn-secondary btn-lg");
	confirm.setAttribute("style","padding: 0px;font-size:12px;");
	confirm.setAttribute("type","button");
	confirm.setAttribute("data-dismiss","modal");
	confirm.setAttribute("aria-hidden","true");
	confirm.innerHTML="确认";
	var input=document.createElement('input');
	input.setAttribute("type","text");
	input.setAttribute("id","ff-bug-input"+this.id);
	var span=document.createElement('span');
	span.innerHTML=this.PopupSpan+":&nbsp;";
	var ol=document.createElement('ol');
	var li=document.createElement('li');
	li.appendChild(span);
	li.appendChild(input);
	li.appendChild(confirm);
	ol.appendChild(li);
	var div4=document.createElement('div');
	div4.setAttribute("class","modal-body");
	div4.appendChild(ol);
	var title=document.createElement('h7');
	title.innerHTML=this.PopupTitle;
	var button=document.createElement('button');
	button.setAttribute("type","button");
	button.setAttribute("class","close");
	button.setAttribute("data-dismiss","modal");
	button.setAttribute("aria-hidden","true");
	button.innerHTML = "&times;";
	var div3=document.createElement('div');
	div3.setAttribute("class","modal-header");
	div3.appendChild(button);
	div3.appendChild(title);
	var div2=document.createElement('div');
	div2.setAttribute("class","modal-content");
	div2.appendChild(div3);
	div2.appendChild(div4);
	var div1=document.createElement('div');
	div1.setAttribute("class","modal-dialog");
	div1.setAttribute("style","width:300px;");
	div1.setAttribute("role","document");
	div1.appendChild(div2);
	var divPopup=document.createElement('div');
	divPopup.setAttribute("id","myModal"+this.id);
	divPopup.setAttribute("class","modal fade");
	divPopup.setAttribute("tabindex","-1");
	divPopup.setAttribute("role","dialog");
	divPopup.setAttribute("aria-labelledby","myModalLabel2");
	divPopup.appendChild(div1);
	document.body.appendChild(divPopup);
	this.divPopup=divPopup;
	addEvent(confirm,'click',function(e){obj.ConfirmClick(e)});
}
PopupButton.prototype.Init=function(){
	this.CreatePopuup();
	var li =document.createElement('li');
	var a = document.createElement('a');
			var obj=this;
	with(this)
	{
		a.setAttribute("role","button");
		a.setAttribute("class","dropdown-toggle");
		a.setAttribute("data-toggle","modal");
		a.setAttribute("data-target","#myModal"+id);
		a.setAttribute("aria-haspopup","true");
		a.setAttribute("aria-expanded","false");
		a.innerHTML = text;
	 }
	 li.appendChild(a);
	 this.element=li;
	 addEvent(a,'click',function(e){obj.OnClick(e)});
		
}
PopupButton.prototype.OnClick=function(e)
{
	this.eventClick(e);
}
PopupButton.prototype.ConfirmClick=function(e)
{
	var text=$("input[id='ff-bug-input"+this.id+"']").val();  
	this.eventConfirm(text);
	 
	
}
function Tools(title,Config)
{	 
	var Property = {title:title};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.container=null;
	this.element=null;
	this.eventNewTemplate=null;
	this.eventNewText=null;
	this.eventFontSize=null;
	this.eventFontBlod=null;
	this.eventFontItalic=null;
	this.eventFontDel=null;
	this.eventBackGruodImg=null;
	this.eventSelectTemplate=null;
	this.eventSaveTemplate=null;
	this.DropDownTemplate=null;
	this.eventSetTextPc=null;
	this.eventNewTable=null;
	this.TextPc=null;
	this.Init();
	this.Layoutcontrols();
	
}
Tools.prototype.Init=function(){
	var ul=document.createElement('ul');
	ul.setAttribute("class","nav navbar-nav");
	var div=document.createElement('div');
	div.setAttribute("class","collapse navbar-collapse bs-example-js-navbar-collapse");
	div.appendChild(ul);
	var a=document.createElement('a');
	a.setAttribute("class","navbar-brand");
	a.setAttribute("href","#");
	a.innerHTML="template editor";
	var div1=document.createElement('div');
	div1.setAttribute("class","container-header");
	div1.appendChild(a);
	var div2=document.createElement('div');
	div2.setAttribute("class","container-fluid");
	div2.appendChild(div1);
	div2.appendChild(div);
	var nav=document.createElement('nav');
	nav.setAttribute("id","navbar-example");
	nav.setAttribute("class","navbar navbar-default navbar-static");
	nav.setAttribute("role","navigation");
	nav.appendChild(div2);
	this.container=ul;
	this.element=nav;
}
Tools.prototype.Layoutcontrols=function()
{
	var obj=this;
	var tool1=new PopupButton('tool1',{text:"新建",PopupTitle:"新建模板",PopupSpan:"名称"});
	var tool2=new PopupButton('tool2',{text:"文本框",PopupTitle:"创建",PopupSpan:"名称"});
	var tool3=new DorpDown('tool3');
	tool3.Add("12px");
	tool3.Add("13px");
	tool3.Add("14px");
	tool3.Add("15px");
	tool3.Add("16px");
	tool3.Add("17px");
	tool3.span.innerHTML="12px";
	var tool4=new Button('tool4',{text:"粗",bold:true});
	var tool5=new Button('tool5',{text:"斜",italic:true});
	var tool6=new Button('tool6',{text:"删",del:true});
	var tool7=new Button('tool7',{text:"背景图片",isfile:true});
	this.DropDownTemplate=new DorpDown('tool8');
	var tool9=new Button('tool9',{text:"保存模板"});
	this.TextPc=new Text('tool10',{text:"10"});
	var tool11=new PopupTable('tool11',{text:"表格",PopupTitle:"创建表格",PopupSpan:"名称",jdatasource:datajson});
	tool1.eventConfirm=function(e)
	{
		obj.DropDownTemplate.Add(e);
		obj.eventNewTemplate(e);
	};
	tool2.eventConfirm=function(e)
	{
		obj.eventNewText(e);
	};
	tool11.eventClick=function(e)
	{
		obj.eventNewTable(e);
	};
	tool3.eventClick=function(e)
	{
		obj.eventFontSize(e);
	};
	tool4.eventClick=function(e)
	{
		obj.eventFontBlod(e);
	}
	tool5.eventClick=function(e)
	{
		obj.eventFontItalic(e);
	}
	tool6.eventClick=function(e)
	{
		obj.eventFontDel(e);
	};
	tool7.eventClick=function(e)
	{
		obj.eventBackGruodImg(e);
	};
	this.DropDownTemplate.eventClick=function(e)
	{
		obj.eventSelectTemplate(e);
	};
	tool9.eventClick=function(e)
	{
		obj.eventSaveTemplate(e);
	};
	this.TextPc.eventClick=function(e)
	{
		obj.eventSetTextPc(e);
	}
	this.Add(tool1);
	this.Add(tool2);
	this.Add(tool11);
	this.Add(tool3);
	this.Add(tool4);
	this.Add(tool5);
	this.Add(tool6);
	this.Add(tool7);
	this.Add(this.DropDownTemplate);
	this.Add(this.TextPc);
	this.Add(tool9);

}
Tools.prototype.Add = function(e){
	 this.container.appendChild(e.element);
}
Tools.prototype.rebuild = function(){
}