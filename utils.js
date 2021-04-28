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
		}else if(typeof obj[element] === "number" && obj[element] < 0){
			result = false
			break;
		} else {
			console.log(`POST HAMSTER object Property: ${element}, with value: ${obj[element]}, passed validation`)
		}
	}
	return result
}

function postMatchObjValidator(obj, arr) {
	const properties = arr
	let result = true

	for (let i = 0; i < properties.length; i++) {
		const element = properties[i];

		if(!obj.hasOwnProperty(element) ){
			result = false
			break;
		}else if(typeof obj[element] !== "string"){
			result = false
			break;
		}else{
			console.log(`POST MATCH object Property: ${element}, with value: ${obj[element]}, passed validation`)
		}
	}
	return result
}

function putObjValidator(obj, arr){
	const properties = arr
	let result = true
	for (const property in obj) {

		if(!properties.includes(property) ){
			result = false
			break;
		}else if(typeof obj[property] !== "string" && typeof obj[property] !== "number"){
			result = false
			break;
		}else if(typeof obj[property] === "number" && obj[property] < 0){
			result = false
			break;
		}else{
			console.log(`PUT object Property: ${property}, with value: ${obj[property]}, passed validation`)
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
	makeArray: makeArray,
	postMatchObjValidator: postMatchObjValidator
}