const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()
const { postObjValidator, putObjValidator, makeArray} = require('../utils.js')


//GET /matches
router.get('/', async (req, res) => {
	const matchesRef = db.collection('matches')
	const snapshot = await matchesRef.get()

	if( snapshot.empty ){
		res.send([])
		return
	}

	let items = makeArray(snapshot)
	res.send(items)
})

//GET /matches/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = await db.collection('matches').doc(id).get()

	if( !docRef.exists ) {
		res.sendStatus(404)
		return
	}
	const data = docRef.data()
	res.send(data)
})

//POST /matches
router.post('/', async (req, res) => {
	const obj = req.body

	//kontroll av obj
	if( !postObjValidator(obj) ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('matches').add(obj)

	res.status(200).send(docRef.id)
})

module.exports = router