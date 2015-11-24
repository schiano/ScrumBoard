
function isIn(array, value){
	//alert('is in function , value : ' + value);
	for(var i=0; i<array.length; ++i){
		//alert('elmt : ' + array[i])
		if(array[i] == value)
			return true;	
	}
	return false;
}
