//MATCHES
//POST /matches
//Optinal changes for later
router.post('/', async (req, res) => {
	const obj = req.body

	console.log(obj)

	try {
		if( !postMatchObjValidator(obj, properties) ){
			res.sendStatus(400)
			return
		}
		//Kan kommentera ut rad 56 till 74 så går den igenom evalutatorn utan ett hamster id som faktiskt finns i DB.
		// const winnerRef = db.collection('hamsters').doc(obj.winnerId)
		// const loserRef = db.collection('hamsters').doc(obj.loserId)
		// const winnerHamster = await winnerRef.get()
		// const loserHamster = await loserRef.get()

		// if( !winnerHamster.exists || !loserHamster.exists ){
		// 	console.log("hamster id does not exists")
		// 	res.sendStatus(400)
		// 	return
		// }

		// await winnerRef.update({
		// 	wins: admin.firestore.FieldValue.increment(1),
		// 	games: admin.firestore.FieldValue.increment(1),
		// })
		// await loserRef.update({
		// 	defeats: admin.firestore.FieldValue.increment(1),
		// 	games: admin.firestore.FieldValue.increment(1)
		// })

		//kommer behövas någon kod som omöjliggör att 2 random hamstar blir samma

		const docRef = await db.collection('matches').add(obj)
		res.status(200).send({id: docRef.id})
	}catch( error ){
		res.status(500).send(error.message)
	}
})


//MATCHWINNERS
//GET /matchWinners/:id
router.get('/:id', async (req, res) => {
	const hamsterId = req.params.id
	//const hamsterRef = db.collection('hamsters').doc(hamsterId)
	const matchRef = db.collection('matches')
	let items
	try {
		//ska jag ta bort if nedan maaaaaybbbeee
		// const hamster = await hamsterRef.get()
		// if( !hamster.exists ){
		// 	console.log('hamster exist, 400')
		// 	res.status(404).send(`Hamster with id: ${hamsterId}, was not found`) //404?
		// 	return
		// }
		//till hit
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