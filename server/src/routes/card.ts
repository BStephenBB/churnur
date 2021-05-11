import type { FastifyInstance, FastifyServerOptions } from 'fastify'

// all CRUD options for cards
export default async function card(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.addHook('onRequest', app.authorize)
  const { prisma } = app
  app.post<{
    Body: {
      cardName: string
      creditLimit?: number
      totalSpend?: number
      minimumSpendingRequirement?: number
      signupBonusDueDate?: string
    }
  }>(
    '/card',
    // TODO unify schema types
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            cardName: { type: 'string' },
            creditLimit: { type: 'number' },
            totalSpend: { type: 'number' },
            minimumSpendingRequirement: { type: 'number' },
            signupBonusDueDate: { type: 'string' },
          },
          required: ['cardName'],
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      // TODO user id won't be needed once we attach the user to each request by default
      const userId = request.user.id
      const {
        cardName,
        creditLimit,
        totalSpend,
        minimumSpendingRequirement,
        signupBonusDueDate,
      } = request.body // add more options here as needed
      // const { prisma } = app

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

  app.patch<{
    Body: {
      id: number
      name?: string
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
            id: { type: 'number' },
            name: { type: 'string' },
            creditLimit: { type: 'number' },
            totalSpend: { type: 'number' },
            minimumSpendingRequirement: { type: 'number' },
            signupBonusDueDate: { type: 'string' },
          },
          required: ['id'],
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      // TODO obviously clean this up once user is already there --> also remember to not pass it in from FE
      const { id, ...bodyWithoutId } = request.body
      // const card = await prisma.card.
      const card = await prisma.card.update({
        where: { id: id },
        data: bodyWithoutId,
      })
      reply.send(card)
    }
  )

  app.get<{ Params: { id: string } }>(
    '/card/:id',
    {}, // TODO schema
    async (request, rely) => {
      const { id } = request.params
      // const { prisma } = app
      const card = await prisma.card.findUnique({ where: { id: Number(id) } })

      rely.send(card)
    }
  )

  // TODO schema
  // get cards for current user
  app.get('/cards', {}, async (request, reply) => {
    const id = request.user.id
    // TODO sort by creation date, but seems to do that by default so not urgent
    const cards = await prisma.card.findMany({
      where: { ownerId: id },
      orderBy: {
        createdAt: 'asc',
      },
    })
    reply.send(cards)
  })
}
