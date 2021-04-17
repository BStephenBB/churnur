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
      console.log(request.body)
      const { userId, cardName } = request.body
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
}
