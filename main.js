import { startServer } from './server'

startServer(3000)
  .then(() => {
    console.log('All systems go')
  })
  .catch(e => {
    console.error('Uncaught error in startup')
    console.error(e)
    console.trace(e)
    process.exit()
  })
