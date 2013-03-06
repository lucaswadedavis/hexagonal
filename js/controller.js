var controller={

initBox:function(){
	var padding=20;
	var left=200;
	var path="";
	path+=" M "+(model.bounds.right-(2*padding))+" "+(model.bounds.bottom-(2*padding));
	path+=" L "+(model.bounds.right-(2*padding))+" "+(model.bounds.top+padding);
	path+=" L "+(model.bounds.left+left)+" "+(model.bounds.top+padding);
	path+=" L "+(model.bounds.left+left)+" "+(model.bounds.bottom-(2*padding));
	path+=" Z";
	model.box.path=path;
	},

initBounds:function(){
	model.bounds={
		bottom:window.innerHeight,
		right:window.innerWidth,
		top:0,
		left:0
		}
	},

initPaper:function(){
	model.paper=Raphael(model.bounds.left,model.bounds.top,model.bounds.right,model.bounds.bottom);
	},

save:function(){
	store.set(model.appName,model);
	console.log("model saved!");
	console.log(store.get(model.appName));
	},
	
load: function(){
	if (!store.get(model.appName)){
		controller.save();
		console.log("new model saved!");
		console.log(store.get(model.appName));
		}
	else {
		model=store.get(model.appName);
		console.log("model retrieved!");
		console.log(model);
		}
	}
};
