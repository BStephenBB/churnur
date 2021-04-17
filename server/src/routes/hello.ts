import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function hello(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.get('/', async () => {
    return { hello: 'world!!' }
  })
}
