//addEvent 添加事件
//cancelEvent 取消事件
	if(typeof addEvent!='function')
{
var addEvent=
	function(o,t,f,l)
		{
		var d='addEventListener',n='on'+t,rO=o,rT=t,rF=f,rL=l;
		if(o[d]&&!l)	
		return o[d](t,f,false);
		if(!o._evts)
		o._evts={};
		if(!o._evts[t])
			{
			o._evts[t]=o[n]?{b:o[n]}:{};
			o[n]=new Function('e','var r=true,o=this,a=o._evts["'+t+'"],i;for(i in 					a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');
			if(t!='unload')
				addEvent(window,'unload',function(){removeEvent(rO,rT,rF,rL)})
			}
		if(!f._i)
			f._i=addEvent._i++;
		o._evts[t][f._i]=f
		};
		addEvent._i=1;
		var removeEvent=function(o,t,f,l)
			{
			var d='removeEventListener';
			if(o[d]&&!l)
			return o[d](t,f,false);
			if(o._evts&&o._evts[t]&&f._i)
			delete o._evts[t][f._i]
			}
		}
function cancelEvent(e,c)
{
	e.returnValue=false;
	if(e.preventDefault)
	e.preventDefault();
	if(c)
		{
		e.cancelBubble=true;
		if(e.stopPropagation)
		e.stopPropagation()
		}
};