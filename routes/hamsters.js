const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()

//GET /hamsters
router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters')
	const snapshot = await hamstersRef.get()

	if( snapshot.empty ){
		res.send([])
		return
	}

	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push( data )
	})
	res.send(items)
})

//GET /hamsters/random
router.get('/random', async (req, res) =>{
	const hamstersRef = db.collection('hamsters')
	const snapshot = await hamstersRef.get()
	
	if( snapshot.empty ){
		res.send([])
		return
	}
	//let random = NumMath.floor(Math.random() * snapshot.length)
	res.send(snapshot)
})


module.exports = router