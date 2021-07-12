import type { FastifyInstance, FastifyServerOptions } from 'fastify'

type Params = {
  id: string
}

export default async function spendDueDateReminder(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.get<{ Params: Params }>(
    '/remind-spend-due',
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
    async (request, reply) => {
      //
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

type Params = {
  id: string
}

export default async function spendDueDateReminder(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  app.get<{ Params: Params }>(
    '/remind-spend-due',
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
    async (request, reply) => {
      //
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
