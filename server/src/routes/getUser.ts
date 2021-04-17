import type { FastifyInstance, FastifyServerOptions } from 'fastify'

type Params = {
  id: string
}

// TODO consolidate user routes

export default async function getUser(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.get<{ Params: Params }>(
    '/user/:id',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              id: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { prisma } = app
      const { id } = request.params

      const result = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      })

      reply.send(result)
    }
  )
}
