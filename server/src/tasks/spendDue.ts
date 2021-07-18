// import { MailService as SendMail } from '@sendgrid/mail'
import SendMail from '@sendgrid/mail'
import { isSameDay, subWeeks } from 'date-fns'
import type { PrismaClient as PrismaClientType } from '@prisma/client'
// TODO look into this to fix this issue: https://stackoverflow.com/questions/44058101/typescript-declare-third-party-modules
// @ts-ignore: silly lack of common js or support or something
import pkg from '@prisma/client'
const { PrismaClient } = pkg

// const prisma: PrismaClientType = new PrismaClient()

// for each user, get their cards
// for each card, check if they have outstanding spend --> if they do, send reminder

// const getAllUsers = async function () {
//   // get all users
//   const users = await prisma.user.findMany({
//     include: {
//       cards: true,
//     },
//   })
//   // console.log(JSON.stringify(users))

//   for (let i = 0; i < users.length; i++) {
//     const cards = users[i].cards
//     const cardsToWarnAbout = []
//     for (let j = 0; j < cards.length; j++) {
//       const { totalSpend, minimumSpendingRequirement, signupBonusDueDate } =
//         cards[j]
//       if (signupBonusDueDate && totalSpend && minimumSpendingRequirement) {
//         const today = new Date()
//         const bonusDate = new Date(signupBonusDueDate)
//         const twoWeeksBeforeBonusDate = subWeeks(bonusDate, 2)
//         const isTwoWeeksBefore = isSameDay(today, twoWeeksBeforeBonusDate)
//         if (totalSpend < minimumSpendingRequirement && isTwoWeeksBefore) {
//           cardsToWarnAbout.push(cards[j])
//         }
//       }
//     }
//     console.log(cardsToWarnAbout)
//     // now that we have all cards for the user w/ those cards and the user we can build the email
//   }
// }

const key =
  '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'

// send test email

SendMail.setApiKey(key)
const message = {
  to: 'sbrownbourne@gmail.com',
  from: 'reminders@churnur.com',
  subject: 'testing',
  text: 'hello from node js',
  html: '<strong>sup</strong>',
}

SendMail.send(message)
  .then(() => {
    console.log('sent mail')
  })
  .catch((error: unknown) => {
    console.error(error)
  })

// getAllUsers()
// prisma.$disconnect()
