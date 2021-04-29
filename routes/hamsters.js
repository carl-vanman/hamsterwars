const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()
const { postObjValidator, putObjValidator, makeArray } = require('../utils.js')
const properties = [ 'age', 'defeats', 'favFood', 'games', 'imgName', 'loves', 'name', 'wins' ];

//GET /hamsters
router.get('/', async (req, res) => {
	const hamstersRef = db.collection('hamsters')
	let items
	try {
		const snapshot = await hamstersRef.get()
		if( snapshot.empty ){
			res.sendStatus(404)
			//res.send([])
			return
		}
		items = makeArray(snapshot)
		res.status(200).send(items)
	}catch( error ){
		res.status(500).send(error.message)
	}
})

//GET /hamsters/random
router.get('/random', async (req, res) => {
	const hamstersRef = db.collection('hamsters')
	let items, random
	try {
		const snapshot = await hamstersRef.get()
		if( snapshot.empty ){
			res.sendStatus(404)
			//res.send([])
			return
		}
		items = makeArray(snapshot)
		random = Math.floor(Math.random() * items.length)
		res.status(200).send(items[random])
	}catch( error ){
		res.status(500).send(error.message)
	}
})

//GET /hamsters/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = db.collection('hamsters').doc(id)
	let data
	try {
		const doc = await docRef.get()
		if( !doc.exists ) {
			res.status(404).send(`Hamster with id: ${id} doesn't exist`)
			return
		}
		data = doc.data()
		res.status(200).send(data)
	}catch( error ){
		res.status(500).send(error.message)
	}
})

//POST /hamsters
router.post('/', async (req, res) => {
	const obj = req.body
	try {
		if( !postObjValidator(obj, properties) ) {
			res.sendStatus(400)
			return
		}
		const docRef = await db.collection('hamsters').add(obj)
		res.status(200).send({id: docRef.id})
	}catch( error ){
		res.status(500).send(error.message)
	}
})

// PUT /hamsters/:id
router.put('/:id', async (req, res) => {
	const id = req.params.id
	const obj = req.body
	const docRef = db.collection('hamsters').doc(id)
	try {
		const doc = await docRef.get()
		if( !putObjValidator(obj, properties) || !Object.keys(obj).length ){
			res.sendStatus(400)
			return
		}else if( !doc.exists ){
			res.sendStatus(404)
			return
		}
		await docRef.set( obj, {merge: true} )
		res.sendStatus(200)
	}catch( error ){
		res.status(500).send(error.message)
	}
})

// DELETE /hamsters/:id
router.delete('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = db.collection('hamsters').doc(id)
	try {
		let doc = await docRef.get()
		if( !id ){
			res.sendStatus(400)
			return
		}
		if( !doc.exists ){
			res.sendStatus(404)
			return
		}
		await docRef.delete()
		res.sendStatus(200)
	}catch( error ){
		res.status(500).send(error.message)
	}
})

module.exports = router

