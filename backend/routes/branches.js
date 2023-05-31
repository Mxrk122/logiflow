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

// obtener los builings
router.get('/getBuildings/', async (req, res) => {
  const response = await session.run('MATCH (u:Building) RETURN (u)');
  const buildings = response.records.map((record) => record.get('u').properties);
  res.json(buildings);
});



// Eliminar la relación "Building owns Vehicle"
router.post('/landing/deleteVehicleOwnship', async (req, res) => {
  let { vehicleId } = req.body;
  vehicleId = parseInt(vehicleId, 10); 
  try {
    // Buscar el vehículo por su ID
    const response = await session.run(
      'MATCH (b:Building)-[r:OWNS]->(v:Vehicle) WHERE v.vehicleId = $vehicleId RETURN b',
      { vehicleId: vehicleId }
    );

    if (response.records.length > 0) {
      const building = response.records[0].get('b');

      // Eliminar la relación "own" entre la empresa y el vehículo
      await session.run(
        'MATCH (b:Building)-[r:OWNS]->(v:Vehicle) WHERE v.vehicleId = $vehicleId DELETE r',
        { vehicleId: vehicleId }
      );

      res.status(200).json({ message: 'Relación eliminada exitosamente.' });
    } else {
      res.status(404).json({ message: 'No se encontró la relación entre la empresa y el vehículo.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar la relación.' });
  }
});

// obtener los vehiculos
router.get('/landing/vehicleOwns/getVehicles', async (req, res) => {
  const response = await session.run('MATCH (b:Building)-[:OWNS]->(v:Vehicle) RETURN v');
  const vehicles = response.records.map((record) => record.get('v').properties);
  res.json(vehicles);
});

router.post('/addVehicle', async (req, res) => {
  const { brand, capacity, model, type, year, buildingName } = req.body;

  try {
    const response = await session.run(`
      MATCH (u:Vehicle)
      RETURN COALESCE(MAX(u.vehicleId), 0) + 1 AS maxId
    `);
    const maxId = response.records[0].get('maxId').toNumber();

    const result = await session.run(
      `
      CREATE (v:Asset:Vehicle {
        year: $year,
        model: $model,
        vehicleId: $maxId,
        type: $type,
        brand: $brand,
        capacity: $capacity
      })
      RETURN v
    `,
      { year, model, maxId, type, brand, capacity }
    );

    const vehicleNode = result.records[0].get('v');

    const branchResponse = await session.run(`
      MATCH (b:Branch)
      WHERE b.name = $buildingName
      RETURN b
    `, { buildingName });

    const branchNode = branchResponse.records[0].get('b');

    await session.run(`
      MATCH (v:Vehicle), (b:Branch)
      WHERE ID(v) = $vehicleId AND ID(b) = $branchId
      MERGE (b)-[:OWNS]->(v)
    `, { vehicleId: vehicleNode.identity, branchId: branchNode.identity });

    res.json(vehicleNode.properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al agregar el vehículo' });
  }
});

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
