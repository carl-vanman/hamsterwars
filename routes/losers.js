const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()
const { makeArray } = require('../utils.js')

//GET /losers
router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters')
	let items
	try {
		const snapshot = await hamstersRef.where('defeats', '>=', 0).orderBy('defeats', 'desc').limit(5).get();
		if( snapshot.empty ){
			res.status(404).send('Sorry, no hamsters was found at the moment')
			return
		}

		items = makeArray(snapshot)
		res.status(200).send(items)
	}catch( error ){
		res.status(500).send(error.message)
	}
})

module.exports = router