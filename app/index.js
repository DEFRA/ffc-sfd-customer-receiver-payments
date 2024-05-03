
const init = async () => {
  console.log('Running receiver service for payments')
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
