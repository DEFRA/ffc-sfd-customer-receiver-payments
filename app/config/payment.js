const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  paymentQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object()
  },
  receiverSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().allow('subscription')
  }
})

const config = {
  paymentQueue: {
    host: process.env.MESSAGE_HOST,
    username: process.env.MESSAGE_USER,
    password: process.env.MESSAGE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === PRODUCTION,
    appInsights:
      process.env.NODE_ENV === PRODUCTION
        ? require('applicationinsights')
        : undefined
  },
  receiverSubscription: {
    address: process.env.PAYMENTS_SUBSCRIPTION_ADDRESS,
    topic: process.env.PAYMENTS_TOPIC_ADDRESS,
    type: 'subscription'
  }
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The messaging config is invalid. ${result.error.message}`)
}

const receiverSubscription = {
  ...result.value.paymentQueue,
  ...result.value.receiverSubscription
}

module.exports = { receiverSubscription }
