/* ============================ NODE CLASS ============================ */

function node(task){
	this.id = task['id'];
	this.name =  task['name'];
	this.cost = task['cost'];
	this.dependencies = task['dependencies'];
	this.parents = [];
	this.childs = [];	
	this.minTime = 0;
	this.maxTime = null;
}

node.prototype.hasChilds = function(){
	return this.childs.length > 0;
}

node.prototype.addChild = function(node){
	this.childs.push(node);	
}

node.prototype.addParent = function(node){
	this.parents.push(node);	
}

/* ============================ TREE CLASS ============================ */

function tree(){
	this.root = [];
	this.items = [];
}

tree.prototype.isEmpty = function(){
	return 	this.root.length == 0;
}

tree.prototype.add = function(task){
	var res = 0; // res will contain the successfull time's number for the add
	var newNode = new node(task);
	if(newNode.dependencies.length == 0){ // if the task doesn't have any dependencies 
		this.root.push(newNode); // we add the new root
		return 0;
	}
	else{
		for(var i=0; i<this.root.length; ++i) // We through all of the root node 
			res += this.addRec(this.root[i], newNode);	
	}
}

tree.prototype.addRec = function(node, newNode){
	if(isIn(newNode.dependencies, node.id)){
		newNode.addParent(node);
		
		var newTime = parseInt(node.minTime) + parseInt(node.cost) // we compute the min time level for this branch
		if(newTime >= newNode.minTime){ // we actualize the new min time and the new max time if it's necessary
			newNode.minTime = newTime;
			newNode.maxTime = newTime;
			this.actualizeMaxTime(newNode); // we actualize the max time, started from the new node
		}
		
		node.addChild(newNode);		
	}
	
	if(node.hasChilds()){
		for(var i=0; i<node.childs.length; ++i) // we through all of the actual node's childs
			this.addRec(node.childs[i], newNode);
	}	
	else
		return 0; // not add the new node with success in this branch
}

tree.prototype.actualizeMaxTime = function(node){
	if(node.parents.length == 0) // if the node is one of the tree's root
		return 0;
	else{
		for(var i=0; i<node.parents.length; ++i){ // we through all of the parent's node
			var newTime = parseInt(node.maxTime) - parseInt(node.parents[i].cost); // we compute the new max time
			if(node.parents[i].maxTime == null || newTime <= node.parents[i].maxTime) // we actualize the new max time if it's necessary
				node.parents[i].maxTime = newTime;
				
			return this.actualizeMaxTime(node.parents[i]); // we compute the max time recursively for all of the parent's node
		}	
	}
}

tree.prototype.makeItems = function(){
	for(var i=0; i<this.root.length; ++i){
		this.makeItemsRec(this.root[i]);	
	}
}

tree.prototype.makeItemsRec = function(node){
	this.items.push({ 
					id: node.id,  
					parents: node.dependencies, 
					title: node.name, 
					label: "Design", 
					et: node.minTime, 
					lt: node.maxTime, 
					itemTitleColor: "#4b0082" });
	

	for(var i=0; i<node.childs.length; ++i){
		this.makeItemsRec(node.childs[i]);	
	}
	
	return 0;
}
