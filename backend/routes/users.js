require('dotenv').config()

const express = require('express')
const router = express.Router()

const { getSession } = require('../session')
const session = getSession()

router.get('/', async (req, res) => {
  const result = await session.run('MATCH (u: User) RETURN u')
  const users = result.records.map((record) => record.get('u').properties)
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const result = await session.run(`
    MATCH (u: User {userId: $userId}) RETURN u
  `, { userId: userId })
  const user = result.records.map((record) => record.get('u').properties)
  res.json(user[0])
})

router.get('/:id/lives-in', async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const result = await session.run(`
    MATCH (u: User {userId: $userId}) - [r:LIVES_IN] -> (l: Location) RETURN u, r, l
  `, { userId: userId })
  const foundLocation = result.records.map((record) => {
    return {
      user: record.get('u').properties,
      relationship: record.get('r').properties,
      location: record.get('l').properties
    }
  })
  res.json(foundLocation[0])
})

function parseOrders(orders) {
  // Verificar si totalAmount tiene las propiedades low y high
  if ('low' in orders.totalAmount && 'high' in orders.totalAmount) {
    return {
      ...orders,
      totalAmount: orders.totalAmount.low,
    };
  }
  return orders;
}

// Obtener todos los shippings relacionados al userId actual
router.get('/:id/my-shippings', async (req, res) => {
  const userId = parseInt(req.params.id,10)
  const result = await session.run(`
    MATCH (u:User {userId: $userId})-[:RECEIVES]->(s:Shipping)
    OPTIONAL MATCH (assetVehicle:Asset:Vehicle)-[:DELIVERS]->(s)
    OPTIONAL MATCH (branchBuilding:Branch:Building)-[:OWNS]->(assetVehicle)
    RETURN s, coalesce(assetVehicle, {}) as assetVehicle, coalesce(branchBuilding, {}) as branchBuilding
  `, { userId: userId })

  const shippings = result.records.map((record) => {
    const shipping = record.get('s').properties
    const assetVehicle = record.get('assetVehicle') ? record.get('assetVehicle').properties : null
    const branchBuilding = record.get('branchBuilding') ? record.get('branchBuilding').properties : null

    return {
      shipping,
      assetVehicle,
      branchBuilding,
      // orders
    }
  })

  res.json(shippings)
})

router.get('/:username/:password', async (req, res) => {
  const username = req.params.username
  const password = req.params.password
  const result = await session.run(`
    MATCH (u: User {
      username: $username,
      password: $password
    }) RETURN u
  `, { username: username, password: password })
  const foundUser = result.records.map((record) => record.get('u').properties)
  res.json(foundUser[0])
})

router.post('/create', async (req, res) => {
  const response = await session.run('MATCH (u: User) RETURN MAX(toInteger(u.userId)) as maxId')
  const record = response.records[0]
  const maxId = parseInt(record.get('maxId').toNumber() + 1, 10)

  const username = req.body.username
  const password = req.body.password
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const gender = req.body.gender
  const phone = req.body.phone
  const admin = req.body.admin
  const result = await session.run(`
    CREATE (u: User {
      userId: $maxId,
      username: $username,
      password: $password,
      firstName: $firstname,
      lastName: $lastname,
      gender: $gender,
      phone: $phone,
      admin: $admin
    }) RETURN u
  `, { username: username, password: password, firstname: firstname, lastname: lastname, gender: gender, phone: phone, maxId: maxId,
  admin: admin })
  const createdUser = result.records.map((record) => record.get('u').properties)
  res.json(createdUser[0])
})

router.post('/config-address', async (req, res) => {
  const userId = parseInt(req.body.userId, 10)
  const address = req.body.location
  const exactAddress = req.body.address
  const since = req.body.since
  const result = await session.run(`
    MATCH (u: User {userId: $userId})
    MATCH (l: Location {address: $address})
    CREATE (u) - [r:LIVES_IN {exactAddress: $exactAddress, since: $since}] -> (l)
    RETURN r
  `, { userId, address, exactAddress, since })
  const createdAddress = result.records.map((record) => record.get('r').properties)
  res.json(createdAddress[0])
})

//Borrar un usuario
router.post('/delete/:id', async (req, res) => {
  const nodeId = req.params.id;

  try {
    const result = await session.run(`MATCH (n:User {userId: ${nodeId}})-[r]-() DETACH DELETE n, r`);
    console.log(`MATCH (n:User {userId: ${nodeId}})-[r]-() DETACH DELETE n, r`)
    console.log(result.summary.counters)

    const query = `MATCH (n:User {userId: ${nodeId}}) DELETE n`;
    console.log(query)
    const result2 = await session.run(query);

    console.log(result2.summary.counters)
    res.status(200).json({ message: `Nodo con ID ${nodeId} eliminado` });
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: 'Error al eliminar el nodo' });
  }
})

router.patch('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const username = req.body.username
  const phone = req.body.phone

  const result = await session.run(`
    MATCH (u: User {userId: $userId})
    SET u.username = $username, u.phone = $phone
    RETURN u
  `, { userId, username, phone })
  const updatedUser = result.records.map((record) => record.get('u').properties)
  res.json(updatedUser[0])
})

router.patch('/:id/lives-in', async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const exactAddress = req.body.address
  const since = req.body.since

  const result = await session.run(`
    MATCH (u: User) - [l:LIVES_IN] -> (loc: Location)
    WHERE u.userId = $userId
    SET l.exactAddress = $exactAddress, l.since = $since
    RETURN l
  `, { userId, exactAddress, since })
  const updatedAddress = result.records.map((record) => record.get('l').properties)
  res.json(updatedAddress[0])
})

module.exports = router
