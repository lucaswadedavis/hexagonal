$(document).ready(function() {
controller.initBounds();
controller.initPaper();
controller.initBox();
view.init();
});

view={

	listeners:function(){
	$("body").click(function(event){
		var x=event.pageX;
		var y=event.pageY;
		model.x=x;
		model.y=y;
		var circle=model.paper.circle(x,y,0).attr({'stroke':"white",'stroke-width':3});
		circle.animate({"r":100,"opacity":0},500,function(){
			eve("orbital");
			this.remove();
			});
		});

	},

	orbital:function(x,y,r,n,color){
	if (!x){x=model.bounds.right/2;}
	if (!y){y=model.bounds.bottom/2;}
	if (!r){r=model.bounds.bottom/3;}
	if (!n){n=1;}
	if (!color){color="#FFF";}
	var set=[];
	
	for (var i=0;i<n;i++){
		var theta1=_.random(180);
		var theta2=theta1+(18*_.random(1,20));
		var w=(0.1*r)*_.random(1,3);
	
		var arcPath=geo.arcPath(x,y,r,theta1,theta2,w);
		var circle=model.paper.path(arcPath)
			.attr({"fill":color,"fill-opacity":0.5})
		set.push(circle);
		}
	return set;
	},

	ngon:function(x,y,r,n){
	if (!n){n=3};
	var path="";
	path+="M "+geo.getPoint(x,y,r,0).x2+" "+geo.getPoint(x,y,r,0).y2;
	for (var i=0;i<n;i++){
		var interval=360/n;
		var theta=interval*i;
		path+=" L"+geo.getPoint(x,y,r,theta).x2+" "+geo.getPoint(x,y,r,theta).y2;
		}	
	path+="Z";
	var ngon=model.paper.path(path).attr({"stroke":"#fff"});
	return ngon;
	},

	init:function(){
		var titleText=model.paper.text(0,0,"people of the bit").attr({"opacity":0,"font-size":30,"font-weight":"bold","fill":"#fff","stroke":"#000"});
		var titleBBox=titleText.getBBox();
		titleText.attr({"x":(model.bounds.right-titleBBox.width),"y":(model.bounds.bottom-5-titleBBox.height)});
		titleBBox=titleText.getBBox();
		var titleBar=model.paper.rect(model.bounds.right,(titleBBox.y-10),0,(20+titleBBox.height)).attr({"stroke-width":0,"fill":"#000"});
		titleBar.animate({"width":(40+titleBBox.width+titleBBox.x),"x":(titleBBox.x-20)},500,"<>",function(){
			titleText.animate({"opacity":1},500).toFront();
			});


		var r=Math.max(model.bounds.right,model.bounds.bottom)/(4+model.projects.length);
		var x=model.bounds.right/2;
		var y=model.bounds.bottom/2;
		var Set=model.paper.set();

		var checkInside=function(x,y,Set){
			var isInside=false;
			if ((x+r)>model.bounds.right || (x-r)<model.bounds.left || (y-r)<model.bounds.top || (y+r)>model.bounds.bottom){
			isInside=true;
			return isInside;
			}
			Set.forEach(function(i){
				var target=i.getBBox();
				if (x>target.x && x<(target.x+target.width) && y>target.y && y<(target.y+target.height)){
					isInside=true;
					return isInside;
					}
				});
		return isInside;
		};
		
		var orbital=view.orbital(200,model.bounds.bottom/2,200,5);
		var image=model.paper.circle(200,model.bounds.bottom/2,180).attr({"fill":"#fff","opacity":0}).toBack();
		var text=model.paper.text(((200+model.bounds.right)/2)+50,(model.bounds.bottom/2),"").attr({"opacity":0,"font-size":(Math.floor(model.bounds.right/20)),"stroke":"#000","fill":"#fff"});
		for (var i=0;i<orbital.length;i++){orbital[i].attr({"opacity":0});}
	
		for (var i=0;i<model.projects.length;i++){

			var hex=view.ngon(x,y,r,6).attr({"fill":"#333","stroke-width":2,"fill-opacity":1});
			var initialPath=_.flatten(hex.attr("path")).join(" ");
			hex.data("initialPath",initialPath);
			hex.data("expanded",false);
			hex.data("image",model.projects[i].image);
			hex.data("name",model.projects[i].name);
			hex.data("link",model.projects[i].link);
			hex.click(function(){
					var path=model.box.path;
					if (this.data("expanded")==false){
						this.toFront();	
						text.attr({"text":this.data("name"),"href":this.data("link")}).toFront();
						this.animate({"path":path},500,"<>",function(){
							this.animate({"fill-opacity":0.8},1000,"<>");
							text.animate({"opacity":1},300);
							});
						image.attr({"fill":this.data("image")}).toFront();
						image.animate({"opacity":1},500);
						for (var i=0;i<orbital.length;i++){
							orbital[i].animate({"opacity":0.5},500,"<>",function(){
								this.animate({"transform":"r "+_.random(30,360)+" 200 "+(model.bounds.bottom/2)},500);
								}).toFront();
							}
						this.data("expanded",true);
						}
					else if (this.data("expanded")==true){
						this.data("expanded",false);
						image.animate({"opacity":0},500).toBack();
						text.animate({"opacity":0},200,function(){this.attr({"text":""})});
						for (var i=0;i<orbital.length;i++){orbital[i].animate({"opacity":0},500,"<>",function(){
							this.toBack();
							});}
						this.animate({"path":this.data("initialPath"),"fill-opacity":1},500,"<>");
						}
					})
			Set.push(hex);

			var c=0
			var theta=60*_.random(6);
		 	do{
				if (c>30){
					x=model.bounds.right/2;
					y=model.bounds.bottom/2;
					}
				theta+=60;
				x=geo.getPoint(x,y,3*r,theta).x2;
				y=geo.getPoint(x,y,r,theta).y2;
				c++;
				}while(c<100 && checkInside(x,y,Set)==true) 
			}

	}

};

