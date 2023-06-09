require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.get('/', async (req, res) => {
  res.json({
    message: 'Welcome to Logiflow API',
    statusCode: 200,
  })
})

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const branchesRouter = require('./routes/branches')
app.use('/branches', branchesRouter)

const locationsRouter = require('./routes/locations')
app.use('/locations', locationsRouter)

const ordersRouter = require('./routes/orders')
app.use('/orders', ordersRouter)

app.listen(process.env.SERVER_PORT || 4000, () => console.log('Listening...'))
