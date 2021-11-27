const deepComparison = (objectA, objectB) => {
	const areObjects = isObject(objectA) && isObject(objectB)

	if(areObjects){
		const keyA = Object.keys(objectA);
		const keyB = Object.keys(objectB);
	
		if(keyA.length !== keyB.length)
			return false;

		if(keyA.length === 0)
			return true;

		var allVaild = true;

		for(const key of keyA){
			allVaild = deepComparison(objectA[key], objectB[key]) && allVaild;
		}

		return allVaild;
	}
	else{
		return objectA === objectB;
	}
	
}

const isObject = (object) => {
	return object != undefined && object != null && typeof object === 'object';
}

export default deepComparison;