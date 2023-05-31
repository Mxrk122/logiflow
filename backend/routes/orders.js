require('dotenv').config()

const express = require('express')
const router = express.Router()

const { getSession } = require('../session')
const session = getSession()

router.post('/create', async (req, res) => {
  const response = await session.run('MATCH (o: Order) RETURN MAX(toInteger(o.orderId)) as maxId')
  const record = response.records[0]

  const userId = parseInt(req.body.userId, 10)
  const orderId = parseInt(record.get('maxId').toNumber() + 1, 10)
  const date = new Date().toDateString()
  const totalAmount = req.body.amount
  const paymentStatus = true
  const products = req.body.products.split(',')
  const entryDate = new Date().toDateString()
  const priority = req.body.priority
  const isUrgent = priority === 5
  const isFragile = req.body.isFragile

  const userBranch = await session.run(`
    MATCH (u: User {userId: $userId}) - [r:LIVES_IN] -> (l: Location)
    MATCH (ll: Location {locationId: l.locationId}) <- [lc:LOCATED_IN] - (b: Branch)
    RETURN b
  `, { userId })
  const branch = userBranch.records.map((record) => record.get('b').properties)
  const branchId = (typeof branch[0].branchId === "object") ? branch[0].branchId.low : branch[0].branchId

  const branchVehicles = await session.run(`
    MATCH (b: Branch {branchId: $branchId}) - [:OWNS] -> (v: Vehicle)
    RETURN v
  `, { branchId })
  const vehicles = branchVehicles.records.map((record) => record.get('v').properties)
  const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)]
  const vehicleId = (typeof vehicle.vehicleId === "object") ? vehicle.vehicleId.low : vehicle.vehicleId

  console.log(vehicleId)

  const orderCreation = await session.run(`
    CREATE (o: Order {
      orderId: $orderId,
      date: $date,
      paymentStatus: $paymentStatus,
      totalAmount: $totalAmount,
      products: $products
    }) RETURN o
  `, { orderId, date, paymentStatus, totalAmount, products })
  const createdOrder = orderCreation.records.map((record) => record.get('o').properties)[0]
  const shippingId = orderId

  const shippingCreation = await session.run(`
    CREATE (s: Shipping {
      shippingId: $shippingId,
      status: $paymentStatus,
      isFragile: $isFragile,
      products: $products
    }) RETURN s
  `, { shippingId, paymentStatus, isFragile, products })
  const createdShipping = shippingCreation.records.map((record) => record.get('s').properties)[0]

  const makesAnCreation = await session.run(`
    MATCH (u: User {userId: $userId})
    MATCH (o: Order {orderId: $orderId})
    CREATE (u) - [m:MAKES_AN] -> (o)
    RETURN m
  `, { userId, orderId })
  const createdMakesAn = makesAnCreation.records.map((record) => record.get('m').properties)[0]

  const orderEntryCreation = await session.run(`
    MATCH (o: Order {orderId: $orderId})
    MATCH (b: Branch {branchId: $branchId})
    CREATE (o) - [oe:ORDER_ENTRY {entryDate: $entryDate, orderPriority: $priority, isUrgent: $isUrgent}] -> (b)
    RETURN oe
  `, { orderId, branchId, entryDate, priority, isUrgent })
  const createdOrderEntry = orderEntryCreation.records.map((record) => record.get('oe').properties)[0]

  const deliversCreation = await session.run(`
    MATCH (v: Vehicle {vehicleId: $vehicleId})
    MATCH (s: Shipping {shippingId: $shippingId})
    CREATE (v) - [d:DELIVERS {deliveryDate: $date, estimatedArrival: $date}] -> (s)
    RETURN d
  `, { vehicleId, shippingId, date })
  const createdDelivers = deliversCreation.records.map((record) => record.get('d').properties)[0]

  const goesToCreation = await session.run(`
    MATCH (s: Shipping {shippingId: $shippingId})
    MATCH (u: User {userId: $userId})
    CREATE (s) - [gt:GOES_TO {expectedDate: $date, isExpress: $isUrgent}] -> (u)
    RETURN gt
  `, { shippingId, userId, date, isUrgent })
  const createdGoesTo = goesToCreation.records.map((record) => record.get('gt').properties)[0]

  res.json({ createdOrder, createdShipping, createdMakesAn, createdOrderEntry, createdDelivers, createdGoesTo })
})

module.exports = router
