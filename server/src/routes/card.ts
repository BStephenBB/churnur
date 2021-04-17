import type { FastifyInstance, FastifyServerOptions } from 'fastify'
import type { Card } from '@prisma/client'
import { request } from 'undici'

// all CRUD options for cards
export default async function card(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.post<{ Body: { userId: number; cardName: string } }>(
    '/card',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            userId: { type: 'number' },
            cardName: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      // TODO user id won't be needed once we attach the user to each request by default
      const { userId, cardName } = request.body // TODO rest of card options here, figure out how to save dates
      const { prisma } = app

      const newCard = await prisma.card.create({
        data: {
          ownerId: userId,
          name: cardName,
        },
      })

      reply.send(newCard)
    }
  )

  app.get<{ Params: { id: string } }>(
    '/card/:id',
    {}, // TODO schema
    async (request, rely) => {
      const { id } = request.params
      const { prisma } = app
      const card = await prisma.card.findUnique({ where: { id: Number(id) } })

      rely.send(card)
    }
  )
}
