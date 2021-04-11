import type { FastifyInstance, FastifyServerOptions } from 'fastify'
// TODO add back when https://github.com/prisma/prisma/issues/4816 is resolved
// import { PrismaClient } from '@prisma/client'
import type { PrismaClient as PrismaClientType } from '@prisma/client'
// @ts-ignore: silly lack of common js or support or something
import pkg from '@prisma/client'
const { PrismaClient } = pkg

// TODO probably put this one place and share it?
const prisma: PrismaClientType = new PrismaClient()

export default async function makeUser(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
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
}
