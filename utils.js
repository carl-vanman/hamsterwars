function postObjValidator(obj, arr){
	const properties = arr
	let result = true;

	for (let i = 0; i < properties.length; i++) {
		const element = properties[i];
		if(!obj.hasOwnProperty(element)){
		result = false
			break;
		}else if(typeof obj[element] !== "string" && typeof obj[element] !== "number"){
			result = false
			break;
		}else if(typeof obj[element] === "number"){
			if(obj[element] < 0) {
				result = false
				break;
			}
		}
	}
	return result
}

function putObjValidator(obj, arr){
	const properties = arr
	let result = true
	for (const property in obj) {
		if( !properties.includes(property) ){
			result = false
			break;
		}else if(typeof obj[property] !== "string" && typeof obj[property] !== "number"){
			result = false
			break;
		}else if(typeof obj[property] === "number"){
			if(obj[property] < 0) {
				result = false
				break;
			}
		}
	}
	return result
}

function makeArray(input) {
	let items = []
	input.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push( data )
	})
	return items
}

module.exports = {
	postObjValidator: postObjValidator,
	putObjValidator: putObjValidator,
	makeArray: makeArray
}