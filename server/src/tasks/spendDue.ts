import type { PrismaClient as PrismaClientType } from '@prisma/client'
// TODO look into this to fix this issue: https://stackoverflow.com/questions/44058101/typescript-declare-third-party-modules
// @ts-ignore: silly lack of common js or support or something
import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma: PrismaClientType = new PrismaClient()

// for each user, get their cards
// for each card, check if they have outstanding spend --> if they do, send reminder
//

const getAllUsers = async function () {
  // get all users
  const users = await prisma.user.findMany({
    include: {
      cards: true,
    },
  })
  console.log(JSON.stringify(users))

  // send test email
}

getAllUsers()
