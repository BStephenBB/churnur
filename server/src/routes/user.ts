import type { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function makeUser(
  app: FastifyInstance,
  options: FastifyServerOptions
) {
  // const { prisma } = app
  // app.post<{ Body: { email: string } }>(
  //   '/signup',
  //   {
  //     schema: {
  //       body: {
  //         type: 'object',
  //         properties: {
  //           email: { type: 'string' },
  //         },
  //       },
  //     },
  //   },
  //   async (request, reply) => {
  //     const { email } = request.body
  //     const result = await prisma.user.create({
  //       data: {
  //         email: email,
  //       },
  //     })
  //     reply.send(result)
  //   }
  // )
  // app.addHook('onRequest', app.authorize)
  // TODO schema
  // app.get<{ Params: { id: string } }>(
  //   '/user/:id/cards',
  //   {},
  //   async (request, reply) => {
  //     const id = request.user.id
  //     // TODO sort by creation date, but seems to do that by default so not urgent
  //     const cards = await prisma.card.findMany({
  //       where: { ownerId: id },
  //     })
  //     reply.send(cards)
  //   }
  // )
}
