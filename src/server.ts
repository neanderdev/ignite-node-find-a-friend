import { app } from './app'

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('👾 Server is listening on port 3333!')
  })
