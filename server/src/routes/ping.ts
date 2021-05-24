import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function makeUser(
  app: FastifyInstance,
  _: FastifyServerOptions
) {
  app.get(
    '/ping',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (_, reply) => {
      reply.send({ message: 'pong' })
    }
  )
}
