/**
 * @author 无量
 */
function Template(title,Config)
{
	var Property = {title:title,backgroundImage:"",isedit:false,elements:[],printpc:10,container:null};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.ElementList=[];
	this.Init();
}
Template.prototype.Init=function()
{
	for(var i=0;i<this.elements.length;i++)
	{
		var element=this.elements[i];
	 	var node=new ElementNode('',element);
		var Hdiv=node.Create();
		this.Add(Hdiv);
	}
}
Template.prototype.Add=function(e)
{
	this.ElementList.push(e);
}
Template.prototype.RemoveElement=function(e)
{
	for(var i=0;i<this.ElementList.length;i++)
	{
		if(e==this.ElementList[i])
		{
			this.ElementList.splice(i,1);
			break;
		}
	}
}
Template.prototype.ToJson=function()
{
	with(this)
	{

		var json={};
		json.title=title;
		json.backgroundImage=backgroundImage;
		json.printpc=printpc;
		json.container=container;
		json.elements=[];
		for(var i=0;i<this.ElementList.length;i++)
		{

			var item={};
			var element=this.ElementList[i];
				item.top=element.style.top;
				item.left=element.style.left;
				item.width=element.style.width;
				item.height=element.style.height;
				item.color=element.style.color;
				item.backgroundColor=element.style.backgroundColor;
				item.fontsize=element.style.fontsize;
				if(element.nodeName!="TABLE")
				{
					item.text=element.innerHTML;
				}
				item.id=element.id;
				item.textDecoration=element.style.textDecoration;
				item.fontStyle=element.style.fontStyle;
				item.fontWeight=element.style.fontWeight;
				if(element.nodeName=="TABLE")
				{
					item.tr=[];
					for(var j=0;j<element.children[0].children.length;j++)
					{
						var otd={};
						var td=element.children[0].children[j];
						otd.width=td.style.width;
						otd.text=td.innerHTML;
						item.tr[item.tr.length]=otd;
					}
					
				}
			json.elements[json.elements.length]=item;
		}
		return json;
		
	}
}
function ElementNode(id,Config)
{	 
	var Property = {element:null,id:id,width:"90px",height:"16px",top:"",left:"",color:"#ffffff",backgroundColor:"red",enabled:true,classname:"",text:"",fontsize:"12px",textDecoration:"",fontStyle:"",fontWeight:"",tr:null};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
}
ElementNode.prototype.Create = function(){
		if(this.tr)
		{
			return this.CreateDivTable();
		}
		else
		{
			return this.CreateDiv();
		}
};
ElementNode.prototype.CreateDiv = function(){ 
		element = document.createElement('div');
		element.style.top = this.top;
		element.style.left = this.left;
		element.style.width = this.width;
		element.style.height = this.height;
		element.style.backgroundColor = this.backgroundColor;
		element.style.color=this.color;
		element.style.fontSize=this.fontsize;
		element.style.position='absolute';
		element.style.border="#cccccc 1px dashed"; 
		element.innerHTML = this.text;
		element.id=this.id;
		element.className = "weaizhi";
		
		element.style.textDecoration=this.textDecoration;
		element.style.fontStyle=this.fontStyle;
		element.style.fontWeight=this.fontWeight;
		return element;
		 
}
ElementNode.prototype.CreateDivTable = function(){
		var table = document.createElement("table");//创建table 
		table.setAttribute("cellspacing","1");
		table.setAttribute("cellpadding","5");
		table.style.top = this.top;
		table.style.left = this.left;
		table.setAttribute("bgcolor","#660000");
		table.style.position="absolute";
		var tro=document.createElement("tr");
		var trt=document.createElement("tr");
		for(var i=0;i<this.tr.length;i++)
		{
			var tdo=document.createElement("td");
			tdo.setAttribute("nowrap","");
			tdo.innerHTML=this.tr[i].text; 
			tdo.style.backgroundColor = "#bbbbbb"; 
			tdo.style.border="1px solid #660000";
			tdo.style.width=this.tr[i].width;
			tro.appendChild(tdo);
			var tdt=document.createElement("td");
			tdt.innerHTML="移动"; 
			tdt.style.backgroundColor = "#ffffff"; 
			tdt.style.border="1px solid #660000";
			trt.appendChild(tdt);
		}
		table.appendChild(tro);
		table.appendChild(trt);
		return table;
}
ElementNode.prototype.CreatePrint=function(o){
		if(this.tr)
		{
			return this.CreateDivTablePrint(o);
		}
		else
		{
			return this.CreateDivPrint(o);
		}
}
ElementNode.prototype.CreateDivPrint=function(o){
		var regx=/^#.*#$/;
		var flag=regx.test(this.text);
		if(flag)
		{
			var value=this.text.replace(/(#)/g,"").split('.');
			var tablename=value[0];
			var columnname=value[1];
			this.text=eval("o."+tablename+"[0]."+columnname);
		}
		element = document.createElement('div');
		element.style.top = this.top;
		element.style.left = this.left;
		element.style.width = this.width;
		element.style.height = this.height;
		//element.style.backgroundColor = this.backgroundColor;
		//element.style.color=this.color;
		element.style.fontSize=this.fontsize;
		element.style.position='absolute';
		//element.style.border="#cccccc 1px dashed"; 
		element.innerHTML = this.text;
		element.id=this.id;
		element.className = 'weaizhi';
		element.style.textAlign= 'left';
		element.style.verticalAlign = 'middle';
		element.style.textDecoration=this.textDecoration;
		element.style.fontStyle=this.fontStyle;
		element.style.fontWeight=this.fontWeight;
		return element;
		 
}
ElementNode.prototype.CreateDivTablePrint=function(o){
		var obj=this;
		var maxlen=(function() {
			var m=0;
			for(var i=0;i<obj.tr.length;i++)
			{
				var value=obj.tr[i].text.replace(/(#)/g,"").split('.');
				var tablename=value[0];
				var m1=eval("o."+tablename+".length");
				if(m1>m)m=m1;
			}
			return m;
		})();
		var table = document.createElement("table");//创建table 
		table.setAttribute("cellspacing","1");
		table.setAttribute("cellpadding","5");
		table.style.top = this.top;
		table.style.left = this.left;
		table.style.position="absolute";
		for(var i=0;i<maxlen;i++)
		{
			var tro=document.createElement("tr");
			for(var j=0;j<this.tr.length;j++)
			{
				var tdo=document.createElement("td");
				tdo.setAttribute("nowrap","");
				var value=this.tr[j].text.replace(/(#)/g,"").split('.');
				var tablename=value[0];
				var columnname=value[1];
				var l=eval("o."+tablename+".length");
				tdo.innerHTML=l>i?eval("o."+tablename+"[i]."+columnname):eval("o."+tablename+"[l-1]."+columnname);
				tdo.style.width=this.tr[j].width;
				tro.appendChild(tdo);
			}
			table.appendChild(tro);
		}
		return table;
}
ElementNode.prototype.SetFontStyle=function(o)
{
	with(this)
	{
		fontStyle=element.style.fontStyle=="italic"?"normal":"italic";
		element.style.fontStyle=fontStyle;
	}
};
ElementNode.prototype.SetTextDecoration=function(o)
{
	with(this)
	{
		textDecoration=element.style.textDecoration=="line-through"?"":"line-through";
		element.style.textDecoration=textDecoration;
	}
};
ElementNode.prototype.SetFontWeight=function(o)
{
	with(this)
	{
		fontWeight=element.style.fontWeight=="bold"?"lighter":"bold";
		element.style.fontWeight=fontWeight;
	}
};
ElementNode.prototype.SetFontSize=function(o)
{
	with(this)
	{
		fontsize=o;
		element.style.fontSize=o;
	}
};
ElementNode.prototype.rebuild = function(){
		element = document.getElementById(this.id);
		element.style.width = this.width;
		element.style.height = this.height;
		element.style.backgroundColor = this.backgroundColor;
		return element;
}