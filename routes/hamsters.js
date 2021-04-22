const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()
const { postObjValidator, putObjValidator, makeArray} = require('../utils.js')

//GET /hamsters
router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters')
	const snapshot = await hamstersRef.get()

	if( snapshot.empty ){
		res.send([])
		return
	}

	let items = makeArray(snapshot)
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
	let items = makeArray(snapshot)
	let random = Math.floor(Math.random() * items.length)
	res.send(items[random])
})

//GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = await db.collection('hamsters').doc(id).get()

	if( !docRef.exists ) {
		res.status(404).send(`Hamster with id: ${id} doesn't exist`)
		return
	}
	const data = docRef.data()
	res.send(data)
})

//POST /hamsters
router.post('/', async (req, res) => {
	const obj = req.body

	//kontroll av obj
	if( !postObjValidator(obj) ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('hamsters').add(obj)

	res.status(200).send(docRef.id)
})

// PUT /hamsters/:id
router.put('/:id', async (req, res) => {
	let id = req.params.id
	let obj = req.body
	let docRef = await db.collection('hamsters').doc(id).get()

	if (!putObjValidator(obj) || !id || !Object.keys(obj).length){
		res.sendStatus(400)
		return
	}

	if(!docRef.exists) {
		res.sendStatus(404)
		return
	}
	
	docRef = db.collection('hamsters').doc(id)
	await docRef.set(obj, {merge: true})
	res.sendStatus(200)
})

// DELETE /hamsters/:id



module.exports = router

