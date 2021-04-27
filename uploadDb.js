//Run 1time with node in Terminal to upload data.json to firestore
// $ node uploadDb.js
const getDatabase = require('./database.js')
const db = getDatabase()

//import data.json and save to variable. JS format
const jsonData = require('./data.json')

function uploadFirestore() {
	if (!Array.isArray(jsonData)){
		console.log('Json file was rejected')
	return
	}
	jsonData.forEach((obj) => {
		db.collection('hamsters').add({
			id: obj.id,
			name: obj.name,
			age: obj.age,
			favFood: obj.favFood,
			loves: obj.loves,
			imgName: obj.imgName,
			wins: obj.wins,
			defeats: obj.defeats,
			games: obj.games
		}).then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
	});
}

uploadFirestore();