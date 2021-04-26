const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters.js')
const matches = require('./routes/matches.js')

const PORT = process.env.PORT || 1339
const staticFolder = path.join(__dirname, 'static')
const staticImgFolder = path.join(__dirname, 'img')

//Middleware
app.use( express.json() )
app.use( cors() )
app.use( express.static(staticFolder) )
app.use( express.static(staticImgFolder) )

app.use((req, res, next) =>{
	console.log(`${req.method} ${req.url}`, req.params);
	next()
})

// Routes
app.get('/', (req, res) => {
	res.send('Firebase hamsterwars-assignment')
})

// REST API for /hamsters
app.use('/hamsters', hamsters)
app.use('/matches', matches)

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})