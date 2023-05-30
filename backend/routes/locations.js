require('dotenv').config()

const express = require('express')
const router = express.Router()

const { getSession } = require('../session')
const session = getSession()

router.get('/', async (req, res) => {
  const result = await session.run('MATCH (l: Location) RETURN l')
  const locations = result.records.map((record) => record.get('l').properties)
  res.json(locations)
})

module.exports = router
