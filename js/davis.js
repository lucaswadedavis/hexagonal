davis=
{
random:function (x)
	{
		return (Math.floor(Math.random()*x));
	},

bell: function (x)
	{
		var i=Math.round((davis.random(x)+davis.random(x)+davis.random(x))/3);
		return i;
	},

randomColor:function (x)
	{

	if (x){	x=x.toLowerCase();}
	else{x=="none"}

	var red=davis.random(255);
	var green=davis.random(255);
	var blue=davis.random(255);
	var color="rgb("+red+","+green+","+blue+")";

	if (x=="mammal" || x=="mammalian"){
		red=160+davis.random(85);
		green=red-40;
		blue=green/2;
		color="rgb("+red+","+green+","+blue+")";
		}
	return color;
	},
	
pick: function (x)
	{
	return x[davis.random(x.length)];
	}
};


geo={};

geo.getPoint=function(x,y,r,theta){
	theta+=90;
	theta=theta*(Math.PI/180);
	var x2=x+(r*Math.sin(theta));
	var y2=y+(r*Math.cos(theta));
	var circle={x1:x,y1:y,r:r,x2:x2,y2:y2};
	return circle;
	};

geo.arcPath=function(x,y,r,theta1,theta2,w){
	var f1=0;
	var f2=0;
	var f3=0;
	var f4=1;
	if ((theta2-theta1)>180){
		f1=1;
		f3=1;
		}
	
	var arcPath="";
	arcPath+="M "+geo.getPoint(x,y,r,theta1).x2+" "+geo.getPoint(x,y,r,theta1).y2;
	arcPath+=" A "+r+" "+r+" "+(theta2-theta1)+" "+f1+" "+f2+" "+geo.getPoint(x,y,r,theta2).x2+" "+geo.getPoint(x,y,r,theta2).y2;
	arcPath+=" L "+geo.getPoint(x,y,(r-w),theta2).x2+" "+geo.getPoint(x,y,(r-w),theta2).y2;
	arcPath+=" A "+(r-w)+" "+(r-w)+" "+(theta2-theta1)+" "+f3+" "+f4+" "+geo.getPoint(x,y,(r-w),theta1).x2+" "+geo.getPoint(x,y,(r-w),theta1).y2;
	arcPath+=" Z";
	return arcPath;
	};


