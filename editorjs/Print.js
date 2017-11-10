/**
 * @author 无量

 */	
//new T
function Print(Config){
	var Property = {id:"",jdatasource:{},template:null};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.parent=document.getElementById(this.id);
	this.printelement=null;
	this.container=null;
	this.Init();
};
Print.prototype.ResetPosition=function(){
	with(this)
	{
		var top=container.top-template.container.top;
		var left=container.left-template.container.left;
		for(var i=0;i<this.template.elements.length;i++)
		{
				var element=this.template.elements[i];
				element.top=parseFloat(element.top)+top+'px';
				element.left=parseFloat(element.left)+left+'px';
		}
	}
};
Print.prototype.Init=function(n)
{
	var obj=this;
	with(this)
	{

		var content=document.createElement('div');
		content.setAttribute("style","top:50px");
		
		content.setAttribute("id","content");
			
		content.style.width = "869px";
		content.style.height = "481px";
		
		content.style.margin="0 auto";
		content.innerHTML="";
		content.style.backgroundImage=template.backgroundImage;
		content.style.backgroundRepeat="no-repeat";
		printelement=content;
		parent.appendChild(printelement);
		container=new LContainer(printelement);
		ResetPosition();
		for(var i=0;i<this.template.elements.length;i++)
		{
			var element=this.template.elements[i];
			var node=new ElementNode('',element);
			var Hdiv=node.CreatePrint(jdatasource);
			printelement.appendChild(Hdiv);
			
		}
		
	}
};