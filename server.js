const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt: jwt } = require('express-jwt')
const path = require("path")


process.env.SECRET


app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  'mongodb+srv://switch86:noah@cluster0.7py63yo.mongodb.net/?retryWrites=true&w=majority',
() => console.log('Connected to DB')
)
.catch( err => console.log(err))


app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/issues', require('./routes/issuesRouter.js'))


app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))})

app.listen(8000, () => {
  console.log(`Server running on local port 8000`)
})