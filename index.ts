import fastify from 'fastify'

const app = fastify({ logger: true }) // only pretty print in dev

app.register(import('./app.js'))

app.listen(3000)
