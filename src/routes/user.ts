import type { FastifyInstance, FastifyServerOptions } from 'fastify'

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
      const { prisma } = app

      const result = await prisma.user.create({
        data: {
          email: email,
        },
      })

      reply.send(result)
    }
  )
}
