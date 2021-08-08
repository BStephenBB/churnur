export type Card = {
  id: number
  name: string
  creditLimit: number | null
  totalSpend: number | null
  minimumSpendingRequirement: number | null
  signupBonusDueDate: string | null
  outstandingBalance: number | null
  annualFee: number | null
  annualFeeDate: string | null
  applicationDate: string | null
  approvalDate: string | null
  lastChargeDate: string | null
}

export type Cards = Card[]
