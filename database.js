const admin = require("firebase-admin");

let serviceAccount;
// HEROKU
// heroku.com, configvars -> key = PRIVATE_KEY, VALUE -> All den hemliga infon från private key
if( process.env.PRIVATE_KEY ){
	serviceAccount = JSON.parse( process.env.PRIVATE_KEY )
} else {
	serviceAccount = require("./Firebase-private-key.json")
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function getDatabase() {
	return admin.firestore()
}

module.exports = getDatabase