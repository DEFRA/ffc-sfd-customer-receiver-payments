const { paymentsDatabase } = require('./database')

const cosmos = async () => {
  const cosmos = {}
  cosmos.paymentsDatabase = await paymentsDatabase()
  return cosmos
}

module.exports = cosmos
