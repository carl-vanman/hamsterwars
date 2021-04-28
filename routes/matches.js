const getDatabase = require('../database.js')
const db = getDatabase()
const admin = require('firebase-admin')

const express = require('express')
const router = express.Router()
const { postMatchObjValidator, makeArray } = require('../utils.js')
const properties = [ 'winnerId','loserId' ];

//GET /matches
router.get('/', async (req, res) => {
	const matchesRef = db.collection('matches')
	let items
	try {
		const snapshot = await matchesRef.get()
		if( snapshot.empty ){
			res.sendStatus(404)
			return
		}
		items = makeArray(snapshot)
		res.status(200).send(items)
	}catch(error){
		res.status(500).send(error.message)
	}
})

//GET /matches/:id
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = db.collection('matches').doc(id)
	try {
		const doc = await docRef.get()
		if( !doc.exists ){
			res.sendStatus(404)
			return
		}
		const data = doc.data()
		res.send(data)	
	} catch( error ){
		res.status(500).send(error.message)
	}
})

//POST /matches
router.post('/', async (req, res) => {
	const obj = req.body

	console.log(obj)

	try {
		if( !postMatchObjValidator(obj, properties) ){
			res.sendStatus(400)
			return
		}

		// const winnerRef = db.collection('hamsters').doc(obj.winnerId)
		// const loserRef = db.collection('hamsters').doc(obj.loserId)
		// const winnerHamster = await winnerRef.get()
		// const loserHamster = await loserRef.get()

		// if( !winnerHamster.exists || !loserHamster.exists ){
		// 	console.log("hamster id does not exists")
		// 	res.status(400)
		// 	return
		// }

		// await winnerRef.update({
		// 	wins: admin.firestore.FieldValue.increment(1)
		// })
		// await loserRef.update({
		// 	defeats: admin.firestore.FieldValue.increment(1)
		// })

		const docRef = await db.collection('matches').add(obj)
		res.status(200).send({id: docRef.id})
	}catch( error ){
		res.status(500).send(error.message)
	}
})

//DELETE /matches/:id
router.delete('/:id', async (req, res) => {
	const id = req.params.id
	const docRef = db.collection('matches').doc(id)
	try {
		const doc = await docRef.get()

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