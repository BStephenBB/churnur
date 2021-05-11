import fastify from 'fastify'
import App from './app'

const app = fastify({ logger: true }) // only pretty print in dev

// app.register(import('./app'))
app.register(App)

const port = process.env.PORT || '3000'
app.listen(port)
