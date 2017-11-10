/**
 * @author 无量
 */
function ELEMENTPROPERTY(Element,ELEPRO)
{
	var Property = {element:Element,width:0,height:0,top:0,left:0,color:"#ffffff",background:"",enabled:true,text:""};
	for(p in Property)
	this[p]=ELEPRO==null||(typeof ELEPRO[p]=='undefined')?Property[p]:ELEPRO[p]
}