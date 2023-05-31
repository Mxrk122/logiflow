require('dotenv').config()

const express = require('express')
const router = express.Router()

const { getSession } = require('../session')
const session = getSession()

// Crear usuario
router.post('/:create/', async (req, res) => {

  const response = await session.run('MATCH (u: Building) RETURN MAX(toInteger(u.branchId)) as maxId');
  const record = response.records[0];

  const maxId = record.get('maxId').toNumber() + 1;
  const name = req.body.name;
  const type = req.body.type;
  const owns = req.body.ownsBuilding;

  const result = await session.run(`
    CREATE (u:Building {
      branchId: $maxId,
      name: $name,
      type: $type,
      ownsBuilding: $owns
    }) RETURN u
  `, { name: name, type: type, owns: owns, maxId: maxId});
  const createdUser = result.records.map((record) => record.get('u').properties);
  res.json(createdUser[0]);

});



module.exports = router
