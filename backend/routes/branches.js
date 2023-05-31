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

router.post('/create', async (req, res) => {
  const response = await session.run('MATCH (u: Building) RETURN MAX(toInteger(u.branchId)) as maxId')
  const record = response.records[0]
  const maxId = parseInt(record.get('maxId').toNumber() + 1, 10)
  const name = req.body.name
  const type = req.body.type
  const owns = req.body.ownsBuilding

  const result = await session.run(`
    CREATE (u: Branch:Building {
      branchId: $maxId,
      name: $name,
      type: $type,
      ownsBuilding: $owns
    }) RETURN u
  `, { name: name, type: type, owns: owns, maxId: maxId})
  const createdUser = result.records.map((record) => record.get('u').properties)
  res.json(createdUser[0])
})

module.exports = router
