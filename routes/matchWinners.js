const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()
const { makeArray } = require('../utils.js')

//GET /matchWinners/:id
router.get('/:id', async (req, res) => {
	const hamsterId = req.params.id
	const hamsterRef = db.collection('hamster').doc(hamsterId)
	const matchRef = db.collection('matches')
	let items
	try {
		// const hamster = await hamsterRef.get()
		// if( !hamster.exists ){
		// 	console.log('hamster exist, 400')
		// 	res.status(404).send(`Hamster with id: ${hamsterId}, was not found`) //404?
		// 	return
		// }
		const snapshot = await matchRef.where('winnerId', '==', hamsterId).get()
		if( snapshot.empty ){
			console.log('hamster no won, 404')
			res.status(404).send(`Hamster with id: ${hamsterId}, have not yet won any matches.`)
			return
		}
		items = makeArray(snapshot)
		res.status(200).send(items)
	}catch( error ){
		res.status(500).send(error.message)
	}
})

module.exports = router