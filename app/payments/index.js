const util = require('util')
const { paymentConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { saveToCosmos } = require('./save-to-cosmos')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message:', message.body)
    await saveToCosmos(message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let paymentsReceiver //eslint-disable-line
  const receiverAction = (message) => handleMessage(message, paymentsReceiver)
  paymentsReceiver = new MessageReceiver(
    paymentConfig.receiverSubscription,
    receiverAction
  )
  await paymentsReceiver.subscribe()
  console.info('Payments receiver is ready to consume messages')
}

module.exports = { startMessaging }
