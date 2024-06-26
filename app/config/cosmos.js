const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().optional(),
  key: Joi.string().optional(),
  paymentsDatabase: Joi.string().default('ffc-sfd-customer-receiver-payments'),
  paymentsContainer: Joi.string().default('payments-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  paymentsDatabase: 'ffc-sfd-customer-receiver-payments',
  paymentsContainer: 'payments-container'
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
