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

// Crear usuario
router.post('/:create/', async (req, res) => {

  const response = await session.run('MATCH (u: User) RETURN MAX(toInteger(u.userId)) as maxId');
  const record = response.records[0];
  console.log(record)
  const maxId = record.get('maxId').toNumber() + 1;

  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const result = await session.run(`
    CREATE (u:User {
      id: $maxId,
      username: $username,
      password: $password,
      firstname: $firstname,
      lastname: $lastname,
      gender: $gender,
      phone: $phone
    }) RETURN u
  `, { username: username, password: password, firstname: firstname, lastname: lastname, gender: gender, phone: phone, maxId: maxId });
  const createdUser = result.records.map((record) => record.get('u').properties);
  res.json(createdUser[0]);

});

module.exports = router
