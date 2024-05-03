const cosmosClient = require('./client')
const { cosmosConfig } = require('../config')

const paymentsDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.paymentsDatabase
    })

    await database.containers.createIfNotExists({
      id: cosmosConfig.paymentsContainer
    })

    console.log(`A CosmosDB database has been created: ${database.id}.`)

    return database
  } catch (error) {
    console.error('Error creating Cosmos instance:', error)
  }
}

module.exports = { paymentsDatabase }
