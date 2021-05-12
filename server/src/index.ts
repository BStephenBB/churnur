import fastify from 'fastify'

const app = fastify({ logger: true }) // only pretty print in dev

app.register(require('./app.js'))

const port = process.env.PORT || '3000'
app.listen(port)
