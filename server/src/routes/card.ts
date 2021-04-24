import type { FastifyInstance, FastifyServerOptions } from 'fastify'
import type { Card } from '@prisma/client'
import { request } from 'undici'

// all CRUD options for cards
export default async function card(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.post<{
    Body: {
      userId: number
      cardName: string
      creditLimit?: number
      totalSpend?: number
      minimumSpendingRequirement?: number
      signupBonusDueDate?: string
    }
  }>(
    '/card',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            userId: { type: 'number', required: true },
            cardName: { type: 'string', required: true },
            creditLimit: { type: 'number', required: false },
            totalSpend: { type: 'number', required: false },
            minimumSpendingRequirement: { type: 'number', required: false },
            signupBonusDueDate: { type: 'string', required: false },
          },
        },
      },
    },
    async (request, reply) => {
      // TODO user id won't be needed once we attach the user to each request by default
      const {
        userId,
        cardName,
        creditLimit,
        totalSpend,
        minimumSpendingRequirement,
        signupBonusDueDate,
      } = request.body // TODO rest of card options here, figure out how to save dates
      const { prisma } = app

      const newCard = await prisma.card.create({
        data: {
          ownerId: userId,
          name: cardName,
          creditLimit: creditLimit,
          totalSpend: totalSpend,
          minimumSpendingRequirement: minimumSpendingRequirement,
          signupBonusDueDate: signupBonusDueDate,
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
