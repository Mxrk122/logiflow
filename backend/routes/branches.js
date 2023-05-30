require('dotenv').config()

const express = require('express')
const router = express.Router()

const { getSession } = require('../session')
const session = getSession()

router.get('/', async (req, res) => {
  const result = await session.run('MATCH (b: Branch) RETURN b')
  const branches = result.records.map((record) => record.get('b').properties)
  res.json(branches)
})

router.get('/:id', async (req, res) => {
  const branchId = parseInt(req.params.id, 10)
  const result = await session.run(`
    MATCH (b: Branch {branchId: $branchId}) RETURN b
  `, { branchId: branchId })
  const branch = result.records.map((record) => record.get('b').properties)
  res.json(branch)
})

module.exports = router
