import type { FastifyInstance, FastifyServerOptions } from 'fastify'

// all CRUD options for cards
export default async function card(
  app: FastifyInstance,
  _: FastifyServerOptions
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
      outstandingBalance?: number
      annualFee?: number
      annualFeeDate?: string
      applicationDate?: string
      approvalDate?: string
      lastChargeDate?: string
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
            outstandingBalance: { type: 'number' },
            annualFee: { type: 'number' },
            annualFeeDate: { type: 'string' },
            applicationDate: { type: 'string' },
            approvalDate: { type: 'string' },
            lastChargeDate: { type: 'string' },
          },
          required: ['cardName'],
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.id
      const {
        cardName,
        creditLimit,
        totalSpend,
        minimumSpendingRequirement,
        signupBonusDueDate,
        outstandingBalance,
        annualFee,
        annualFeeDate,
        applicationDate,
        approvalDate,
        lastChargeDate,
      } = request.body // add more options here as needed

      const newCard = await prisma.card.create({
        data: {
          ownerId: userId,
          name: cardName,
          creditLimit: creditLimit,
          totalSpend: totalSpend,
          minimumSpendingRequirement: minimumSpendingRequirement,
          signupBonusDueDate: signupBonusDueDate,
          outstandingBalance: outstandingBalance,
          annualFee: annualFee,
          annualFeeDate: annualFeeDate,
          applicationDate: applicationDate,
          approvalDate: approvalDate,
          lastChargeDate: lastChargeDate,
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
      outstandingBalance?: number
      annualFee?: number
      annualFeeDate?: string
      applicationDate?: string
      approvalDate?: string
      lastChargeDate?: string
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
            outstandingBalance: { type: 'number' },
            annualFee: { type: 'number' },
            annualFeeDate: { type: 'string' },
            applicationDate: { type: 'string' },
            approvalDate: { type: 'string' },
            lastChargeDate: { type: 'string' },
          },
          required: ['id'],
          additionalProperties: false,
        },
      },
    },
    async (request, reply) => {
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
