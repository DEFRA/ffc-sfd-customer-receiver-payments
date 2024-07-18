const { paymentsDatabase } = require('./database')

const cosmosInstance = async () => {
  try {
    const cosmos = {}
    cosmos.paymentsDatabase = await paymentsDatabase()
    return cosmos
  } catch (error) {
    console.error('Error creating Cosmos instance:', error)
  }
}
module.exports = cosmosInstance
