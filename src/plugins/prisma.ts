import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import type { PrismaClient as PrismaClientType } from '@prisma/client'
// TODO look into this to fix this issue: https://stackoverflow.com/questions/44058101/typescript-declare-third-party-modules
// @ts-ignore: silly lack of common js or support or something
import pkg from '@prisma/client'
const { PrismaClient } = pkg

// TODO put this in a spot that makes more sense probably
declare module 'fastify' {
  export interface FastifyInstance {
    prisma: PrismaClientType
    isUserAllowed: (token: string) => Promise<string | void>
    config: {
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
    }
  }
}

const prismaPlugin: FastifyPluginCallback = (app: FastifyInstance, _, done) => {
  const prisma: PrismaClientType = new PrismaClient()
  // use decorator to share prisma instance across application
  app.decorate('prisma', prisma)
  done()
}

export default fastifyPlugin(prismaPlugin, {
  name: 'prismaClient',
})
