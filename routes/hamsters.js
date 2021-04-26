const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()
const { postObjValidator, putObjValidator, makeArray} = require('../utils.js')
const properties = ['age', 'defeats', 'favFood', 'games', 'imgName', 'loves', 'name', 'wins'];


//GET /hamsters
router.get('/', async (req, res) => {
	try {
		const hamstersRef = db.collection('hamsters')
		const snapshot = await hamstersRef.get()

		if( snapshot.empty ){
			res.send([])
			return
		}

		let items = makeArray(snapshot)
		res.send(items)
	} catch (error) {
		res.status(500).send(error.message)
	}
})

//GET /hamsters/random
router.get('/random', async (req, res) =>{
	try {
		const hamstersRef = db.collection('hamsters')
		const snapshot = await hamstersRef.get()
		
		if( snapshot.empty ){
			res.send([])
			return
		}
		let items = makeArray(snapshot)
		let random = Math.floor(Math.random() * items.length)
		res.status(200).send(items[random])
	} catch (error) {
		res.status(500).send(error.message)
	}
})

//GET /hamsters/:id
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id
		const docRef = db.collection('hamsters').doc(id)
		const doc = await docRef.get()

		if( !doc.exists ) {
			res.status(404).send(`Hamster with id: ${id} doesn't exist`)
			return
		}
		const data = doc.data()
		res.status(200).send(data)
	} catch (error) {
		res.status(500).send(error.message)
	}
})

//POST /hamsters
router.post('/', async (req, res) => {
	try {
		const obj = req.body
		//kontroll av obj
		//global variable properties
		if( !postObjValidator(obj, properties) ) {
			res.sendStatus(400)
			return
		}

		const docRef = await db.collection('hamsters').add(obj)

		res.status(200).send({id: docRef.id})
	} catch (error) {
		res.status(500).send(error.message)
	}
})

// PUT /hamsters/:id
router.put('/:id', async (req, res) => {
	try {
		const id = req.params.id
		const obj = req.body
		const docRef = db.collection('hamsters').doc(id)
		const doc = await docRef.get()

		//global variable properties
		if ( !putObjValidator(obj, properties) || !Object.keys(obj).length ){
			console.log('400')
			res.sendStatus(400)
			return
		}
		else if ( !doc.exists) {
			console.log('404')
			res.sendStatus(404)
			return
		}
		//await docRef.update(obj)
		await docRef.set(obj, {merge: true})
		console.log('200')
		res.sendStatus(200)

	} catch (error) {
		res.status(500).send(error.message)
	}
})

// DELETE /hamsters/:id
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id
		let docRef = await db.collection('hamsters').doc(id).get()
		console.log(id)
	
		// skickar ej statuskod om man inte skickar med ett id
		if( !id ) {
			res.sendStatus(400)
			return
		}
	
		if(!docRef.exists) {
			res.sendStatus(404)
			return
		}
	
		await db.collection('hamsters').doc(id).delete()
		res.sendStatus(200)
	} catch (error) {
		res.status(500).send(error.message)
	}
})


module.exports = router

