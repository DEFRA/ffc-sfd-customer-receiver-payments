const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().required(),
  key: Joi.string().required(),
  paymentsDatabase: Joi.string().required(),
  paymentsContainer: Joi.string().required()
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  paymentsDatabase: process.env.COSMOS_PAYMENTS_DATABASE,
  paymentsContainer: process.env.COSMOS_PAYMENTS_CONTAINER
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
