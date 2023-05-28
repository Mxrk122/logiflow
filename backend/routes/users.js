require('dotenv').config()

const express = require('express')
const router = express.Router()

const { getSession } = require('../session')
const session = getSession()

router.get('/', async (req, res) => {
  const result = await session.run('MATCH (u: User) RETURN u')
  result.records.forEach((record) => {
    console.log(record.get('u').properties)
  })
  res.send('All users.')
})

module.exports = router
