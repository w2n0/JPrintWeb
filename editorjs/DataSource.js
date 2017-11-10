/**
 * @author 无量
 */
function DataSource(Config){
	var Property = {title:"",json:null};
	for(p in Property)
	this[p]=Config==null||(typeof Config[p]=='undefined')?Property[p]:Config[p]
	this.element=null;
	this.eventClick=null;
	this.Init();
};

DataSource.prototype.Init=function(n)
{
	with(this)
	{
		var div=document.createElement('div');
		div.setAttribute("class","panel-group");
		var i=0;
		for (var key in json)
		{
			i++;
			var div1=document.createElement('div');
			div1.setAttribute("class","panel panel-default");
			var div2=document.createElement('div');
			div2.setAttribute("class","panel-heading");
			var h4=document.createElement('h4');
			h4.setAttribute("class","panel-title");
			var a=document.createElement('a');
			a.setAttribute("role","button");
			a.setAttribute("data-toggle","collapse");
			a.setAttribute("data-parent","#accordion");
			a.setAttribute("href","#collapseOne"+i);
			a.innerHTML=key;
			h4.appendChild(a);
			div2.appendChild(h4);
			div1.appendChild(div2);
			var div3=document.createElement('div');
			div3.setAttribute("id","collapseOne"+i);
			if(i==1)
			div3.setAttribute("class","panel-collapse collapse in");
			else
			div3.setAttribute("class","panel-collapse collapse");
			var div4=document.createElement('div');
			div4.setAttribute("class","panel-body");     
			var ul=document.createElement('ul');   
			div4.appendChild(ul);
			div3.appendChild(div4);
			div1.appendChild(div3);
			for(var v in json[key])
			{
				var t=json[key][v];
				var li=document.createElement('li');
				var a1=document.createElement('a');
				a1.setAttribute("href","#");
				a1.innerHTML=t;
				li.appendChild(a1);
				ul.appendChild(li);
			}
			div.appendChild(div1);
		}
		this.element=div;		
		addEvent(div,'click',function(e){OnClick(e)});
	}
					
};
DataSource.prototype.OnClick=function(e)
{
	var key=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].innerHTML;
	if(e.target.getAttribute("href")=="#")
	this.eventClick("#"+key+'.'+e.target.innerHTML+"#");
}