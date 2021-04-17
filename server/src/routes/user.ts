import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function makeUser(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  const { prisma } = app
  app.post<{ Body: { email: string } }>(
    '/signup',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const result = await prisma.user.create({
        data: {
          email: email,
        },
      })

      reply.send(result)
    }
  )

  // TODO schema
  app.get<{ Params: { id: string } }>(
    '/user/:id/cards',
    {},
    async (request, reply) => {
      const { id } = request.params
      const cards = await prisma.card.findMany({
        where: { ownerId: Number(id) },
      })
      reply.send(cards)
    }
  )
}
