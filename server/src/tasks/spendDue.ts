import SendMail from '@sendgrid/mail'
import { isSameDay, subWeeks } from 'date-fns'
import type { PrismaClient as PrismaClientType } from '@prisma/client'
// TODO look into this to fix this issue: https://stackoverflow.com/questions/44058101/typescript-declare-third-party-modules
// @ts-ignore: silly lack of common js or support or something
import pkg from '@prisma/client'
const { PrismaClient } = pkg
import dotEnv from 'dotenv'

dotEnv.config()

const getUsersAndCardsToEmail = async function () {
  // get all users
  const prisma: PrismaClientType = new PrismaClient()
  const users = await prisma.user.findMany({
    include: {
      cards: true,
    },
  })
  prisma.$disconnect()

  const usersAndCards = []

  for (let i = 0; i < users.length; i++) {
    const cards = users[i].cards
    const cardsToWarnAbout = []
    for (let j = 0; j < cards.length; j++) {
      const { totalSpend, minimumSpendingRequirement, signupBonusDueDate } =
        cards[j]
      if (signupBonusDueDate && totalSpend && minimumSpendingRequirement) {
        const today = new Date()
        const bonusDate = new Date(signupBonusDueDate)
        const twoWeeksBeforeBonusDate = subWeeks(bonusDate, 2)
        const isTwoWeeksBefore = isSameDay(today, twoWeeksBeforeBonusDate)
        if (
          totalSpend.lessThan(minimumSpendingRequirement) &&
          isTwoWeeksBefore
        ) {
          cardsToWarnAbout.push(cards[j])
        }
      }
    }
    if (cardsToWarnAbout.length > 0) {
      usersAndCards.push({
        name: users[i].firstName,
        email: users[i].email,
        cards: cardsToWarnAbout,
      })
    }
  }

  return usersAndCards
}

const key = process.env.SENDGRID_API_KEY as string
SendMail.setApiKey(key)

const sendReminders = async () => {
  const usersAndCards = await getUsersAndCardsToEmail()
  for (let i = 0; i < usersAndCards.length; i++) {
    const { name, email, cards } = usersAndCards[i]
    const cardsText = cards.reduce(
      (previous, current) =>
        `${previous}${current.name}: $${
          current.minimumSpendingRequirement && current.totalSpend
            ? current.minimumSpendingRequirement
                .minus(current.totalSpend)
                .toDecimalPlaces(2)
                .toFixed(2)
            : ''
        }<br/>`,
      ''
    )
    const html = `Hi ${name},<br/><br/>You have card(s) that have not had their minimum spending requirement(s) met yet, which is due in 2 weeks. Here are the card(s) and the outstanding amount(s):<br/><br/>${cardsText}`

    const message: SendMail.MailDataRequired = {
      to:
        process.env.NODE_ENV === 'production'
          ? email
          : 'sbrownbourne@gmail.com',
      from: {
        name: 'Churnur',
        email: 'reminders@churnur.com',
      },
      subject: 'Send Reminder',
      // text: 'hello from node js',
      html: html,
      replyTo: 'sbrownbourne@gmail.com',
    }
    SendMail.send(message)
      .then(() => {
        console.log('sent mail')
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }
}
sendReminders()
