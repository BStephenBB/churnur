export type Card = {
  id: number
  name: string
  creditLimit: number
  totalSpend: number
  minimumSpendingRequirement: number
  signupBonusDueDate: string
}

export type Cards = Card[]
