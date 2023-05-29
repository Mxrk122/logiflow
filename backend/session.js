const neo4j = require('neo4j-driver')

const driver = neo4j.driver(
  process.env.NEO4J_CONNECTION_URL,
  neo4j.auth.basic(
    process.env.NEO4J_CONNECTION_USERNAME,
    process.env.NEO4J_CONNECTION_PASSWORD
  )
)

const getSession = () => driver.session()

module.exports = { driver, getSession }