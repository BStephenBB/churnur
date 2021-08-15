import React, { useReducer, useRef, useState } from 'react'
import styled from 'styled-components'
import type { OverlayTriggerState } from '@react-stately/overlays'
import { Button, Text } from './index'
import { InputTypes, Input } from './Input'
import { ComboBox } from './Combobox'
import { Item } from '@react-stately/collections'
import { formatISO } from 'date-fns'
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from '@react-aria/overlays'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { useButton } from '@react-aria/button'
import { Card, Cards } from '../types'
import { cards } from '../constants'
import { useQueryClient } from 'react-query'
import { api } from '../utils'

const processMoney = (money: string) => {
  const trimmed = money.trim()
  return trimmed ? Number(trimmed.replace(/\,/g, '')) : undefined
}

const processDate = (date: string) => {
  return date.trim() ? formatISO(new Date(date)) : undefined
}

// TODO use react query w/ mutations for this...probably? And will need to invalidate RQ cards cache
const updateCard = async (
  cardData: {
    id: number
    name?: string
    creditLimit?: number
    totalSpend?: number
    minimumSpendingRequirement?: number
    signupBonusDueDate?: string
    outstandingBalance?: number
    annualFee?: number
    annualFeeDate?: string
    applicationDate?: string
    approvalDate?: string
    lastChargeDate?: string
  },
  updateCardData: (card: Card) => void
) => {
  const result = await api.PATCH('/card', cardData)
  const {
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
    outstandingBalance,
    annualFee,
    annualFeeDate,
    applicationDate,
    approvalDate,
    lastChargeDate,
  } = result

  updateCardData({
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
    outstandingBalance,
    annualFee,
    annualFeeDate,
    applicationDate,
    approvalDate,
    lastChargeDate,
  })
}

// TODO use react query w/ mutations for this...probably? And will need to invalidate RQ cards cache
// TODO yea use a RQ mutation for this eventually
const addCard = async (
  cardData: {
    cardName: string
    creditLimit?: number
    totalSpend?: number
    minimumSpendingRequirement?: number
    signupBonusDueDate?: string
    outstandingBalance?: number
    annualFee?: number
    annualFeeDate?: string
    applicationDate?: string
    approvalDate?: string
    lastChargeDate?: string
  },
  addNewCard: (card: Card) => void
) => {
  const result = await api.POST('/card', cardData)
  const {
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
    outstandingBalance,
    annualFee,
    annualFeeDate,
    applicationDate,
    approvalDate,
    lastChargeDate,
  } = result
  // } = await result
  addNewCard({
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
    outstandingBalance,
    annualFee,
    annualFeeDate,
    applicationDate,
    approvalDate,
    lastChargeDate,
  })
}

const ModalTitleWrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.space4};
  background: ${({ theme }) => theme.color.gray1};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 6px 6px 0 0;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: ${({ theme }) => theme.space3};
  }
`

// TODO setting the max height via style prop instead of styled component seems like it may be more performant; consider
const ModalBody = styled.div<{ isExpanded: boolean }>`
  padding: ${({ theme }) => theme.space4};
  padding-bottom: ${({ theme }) => theme.space5};
  display: grid;
  width: ${({ theme }) => theme.space(150)};
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${({ theme }) => theme.space5};
  grid-row-gap: ${({ theme }) => theme.space4};
  transition: max-height 0.2s ease;
  max-height: ${(props) => (props.isExpanded ? '800px' : '300px')};

  > div:first-child {
    grid-column-start: span 2;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: ${({ theme }) => theme.space3};
    padding-bottom: ${({ theme }) => theme.space5};
    grid-column-gap: ${({ theme }) => theme.space3};
    grid-row-gap: ${({ theme }) => theme.space3};
    max-height: ${(props) => (props.isExpanded ? '500px' : '250px')};
    width: ${({ theme }) => theme.space(140)};
  }
`

function ModalDialog(props: {
  title: string
  children: React.ReactElement
  isOpen: boolean
  onClose: () => void
  isDismissable: boolean
  role: 'dialog'
}) {
  const { title, children } = props

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = useRef(null)
  const { overlayProps } = useOverlay(props, ref)

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll()
  const { modalProps } = useModal()

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog(props, ref)

  /* @keyframes slide-down { */
  /* 0% { */
  /*   opacity: 0; */
  /*   transform: translateY(-10px); */
  /* } */
  /* 100% { */
  /*   opacity: 1; */
  /*   transform: translateY(0); */
  /* } */
  /* } */
  /* .slide-down[data-reach-menu-list], */
  /* .slide-down[data-reach-menu-items] { */
  /* border-radius: 5px; */
  /* animation: slide-down 0.2s ease; */
  /* } */

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            // TODO use css var when we can
            background: 'white',
            borderRadius: '6px',
            marginTop: '10vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ModalTitleWrapper>
            <Text {...titleProps} size={4} mdSize={3}>
              {title}
            </Text>
          </ModalTitleWrapper>

          {children}
        </div>
      </FocusScope>
    </div>
  )
}

// TODO fix types (some are numbers, and some should prob? be null)
export type CardRepresentation = {
  name: string
  limit: string
  totalSpend: string
  minimumSpendingRequirement: string
  signupBonusDate: string
  outstandingBalance: string
  annualFee: string
  annualFeeDate: string
  applicationDate: string
  approvalDate: string
  lastChargeDate: string
}

const emptyCard: CardRepresentation = {
  name: '',
  limit: '',
  totalSpend: '',
  minimumSpendingRequirement: '',
  signupBonusDate: '',
  outstandingBalance: '',
  annualFee: '',
  annualFeeDate: '',
  applicationDate: '',
  approvalDate: '',
  lastChargeDate: '',
}

const isValidCard = (card: CardRepresentation) => {
  return card.name !== ''
}

export enum CardActionType {
  SET_NAME = 'UPDATE_NAME',
  SET_LIMIT = 'UPDATE_LIMIT',
  SET_TOTAL_SPEND = 'UPDATE_TOTAL_SPEND',
  SET_MINIMUM_SPENDING_REQUIREMENT = 'SET_MINIMUM_SPENDING_REQUIREMENT',
  SET_SIGNUP_BONUS_DATE = 'SET_SIGNUP_BONUS_DATE',
  SET_OUTSTANDING_BALANCE = 'SET_OUTSTANDING_BALANCE',
  SET_ANNUAL_FEE = 'SET_ANNUAL_FEE',
  SET_ANNUAL_FEE_DATE = 'SET_ANNUAL_FEE_DATE',
  SET_APPLICATION_DATE = 'SET_APPLICATION_DATE',
  SET_APPROVAL_DATE = 'SET_APPROVAL_DATE',
  SET_LAST_CHARGE_DATE = 'SET_LAST_CHARGE_DATE',
  CLEAR = 'CLEAR',
  SET_CARD = 'SET_CARD',
}

// so we know clean type doesn't come w/ a string as payload. Can make others more specific if we need to
// TODO really should just enumerate all of the other options
type CardAction =
  | { type: CardActionType.CLEAR }
  | { type: CardActionType.SET_CARD; payload: CardRepresentation }
  | {
      type: CardActionType.SET_NAME
      payload: string
    }
  | {
      type: CardActionType.SET_LIMIT
      payload: string
    }
  | {
      type: CardActionType.SET_TOTAL_SPEND
      payload: string
    }
  | {
      type: CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT
      payload: string
    }
  | {
      type: CardActionType.SET_SIGNUP_BONUS_DATE
      payload: string
    }
  | {
      type: CardActionType.SET_OUTSTANDING_BALANCE
      payload: string
    }
  | {
      type: CardActionType.SET_ANNUAL_FEE
      payload: string
    }
  | {
      type: CardActionType.SET_ANNUAL_FEE_DATE
      payload: string
    }
  | {
      type: CardActionType.SET_APPLICATION_DATE
      payload: string
    }
  | {
      type: CardActionType.SET_APPROVAL_DATE
      payload: string
    }
  | {
      type: CardActionType.SET_LAST_CHARGE_DATE
      payload: string
    }

function cardReducer(previousState: CardRepresentation, action: CardAction) {
  switch (action.type) {
    case CardActionType.SET_NAME:
      return { ...previousState, name: action.payload }
    case CardActionType.SET_LIMIT:
      return { ...previousState, limit: action.payload }
    case CardActionType.SET_TOTAL_SPEND:
      return { ...previousState, totalSpend: action.payload }
    case CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT:
      return { ...previousState, minimumSpendingRequirement: action.payload }
    case CardActionType.SET_SIGNUP_BONUS_DATE:
      return { ...previousState, signupBonusDate: action.payload }
    case CardActionType.SET_OUTSTANDING_BALANCE:
      return { ...previousState, outstandingBalance: action.payload }
    case CardActionType.SET_ANNUAL_FEE:
      return { ...previousState, annualFee: action.payload }
    case CardActionType.SET_ANNUAL_FEE_DATE:
      return { ...previousState, annualFeeDate: action.payload }
    case CardActionType.SET_APPLICATION_DATE:
      return { ...previousState, applicationDate: action.payload }
    case CardActionType.SET_APPROVAL_DATE:
      return { ...previousState, approvalDate: action.payload }
    case CardActionType.SET_LAST_CHARGE_DATE:
      return { ...previousState, lastChargeDate: action.payload }
    case CardActionType.CLEAR:
      return emptyCard
    case CardActionType.SET_CARD:
      return action.payload
    default:
      // maybe throw an error here?
      // for now, just return the old state
      return previousState
  }
}

const MoreButton = styled.button`
  border: 1px solid ${({ theme }) => theme.color.gray2};
  background: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.shadow.medium};
  height: ${({ theme }) => theme.space5};
  align-self: center;
  position: absolute;
  top: -${({ theme }) => theme.space3};
  transform: translateX(-50%);
  left: 50%;
  z-index: 1;
  border-radius: 100px;
  padding: 0 ${({ theme }) => theme.space3};
  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
    margin-left: ${({ theme }) => theme.space1};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.gray1};
  }

  &:active {
    transform: translateX(-50%) scale(1.04);
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.blue3};
    outline: none;
  }

  transition: background-color 0.15s ease, border-color 0.15s ease,
    transform 0.15s ease;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    height: ${({ theme }) => theme.space(7)};
    padding: 0 ${({ theme }) => theme.space(3)};
    font-size: 15px;
  }
`

export function Modal({ state }: { state: OverlayTriggerState }) {
  const [card, dispatchCardAction] = useReducer(cardReducer, emptyCard)
  const [isExpanded, setIsExpanded] = useState(false)

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const closeAndClearModal = () => {
    state.close()
    setIsExpanded(false)
    dispatchCardAction({ type: CardActionType.CLEAR })
  }

  const isCompleteInformation = isValidCard(card)

  const queryClient = useQueryClient()

  const addNewCard = (card: Card) => {
    queryClient.setQueryData<Cards>('cards', (oldData) => {
      if (oldData === undefined) {
        return [card]
      } else {
        return [...oldData, card]
      }
    })
  }

  const { buttonProps: createCardButtonProps } = useButton(
    {
      onPress: () => {
        if (isCompleteInformation) {
          const {
            name,
            limit,
            totalSpend,
            minimumSpendingRequirement,
            signupBonusDate,
            outstandingBalance,
            annualFee,
            annualFeeDate,
            applicationDate,
            approvalDate,
            lastChargeDate,
          } = card
          addCard(
            {
              cardName: name.trim(),
              creditLimit: processMoney(limit),
              totalSpend: processMoney(totalSpend),
              minimumSpendingRequirement: processMoney(
                minimumSpendingRequirement
              ),
              signupBonusDueDate: processDate(signupBonusDate),
              outstandingBalance: processMoney(outstandingBalance),
              annualFee: processMoney(annualFee),

              annualFeeDate: processDate(annualFeeDate),
              applicationDate: processDate(applicationDate),
              approvalDate: processDate(approvalDate),
              lastChargeDate: processDate(lastChargeDate),
            },
            addNewCard
          )
          state.close()
          dispatchCardAction({ type: CardActionType.CLEAR })
        }
      },
    },
    closeButtonRef
  )

  return (
    <>
      {state.isOpen ? (
        <OverlayContainer>
          <ModalDialog
            title="Enter card information"
            isOpen={state.isOpen}
            onClose={() => {
              state.close()
              dispatchCardAction({ type: CardActionType.CLEAR })
            }}
            isDismissable={true}
            role="dialog"
          >
            <>
              <ModalBody isExpanded={isExpanded}>
                <ComboBox
                  label="Card Name"
                  allowsCustomValue={true}
                  defaultItems={cards}
                  placeholder="ex: Chase Sapphire Reserve"
                  inputValue={card.name}
                  onInputChange={(value: string) => {
                    dispatchCardAction({
                      type: CardActionType.SET_NAME,
                      payload: value,
                    })
                  }}
                >
                  {(item: any) => <Item>{item.name}</Item>}
                </ComboBox>
                <Input
                  label="Card Limit"
                  type={InputTypes.DOLLAR}
                  placeholder="ex: 3000.00"
                  value={card.limit}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_LIMIT,
                      payload: event.target.value,
                    })
                  }}
                />
                <Input
                  label="Total Spend"
                  type={InputTypes.DOLLAR}
                  placeholder="ex: 4321.12"
                  value={card.totalSpend}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_TOTAL_SPEND,
                      payload: event.target.value,
                    })
                  }}
                />
                <Input
                  label="Minimum Spending Requirement"
                  type={InputTypes.DOLLAR}
                  placeholder="ex: 8000.00"
                  value={card.minimumSpendingRequirement}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT,
                      payload: event.target.value,
                    })
                  }}
                />
                <Input
                  label="Signup Bonus Due Date"
                  type={InputTypes.DATE}
                  placeholder="mm/dd/yyyy"
                  value={card.signupBonusDate}
                  onChange={() => {}}
                  setDate={(date: string) => {
                    dispatchCardAction({
                      type: CardActionType.SET_SIGNUP_BONUS_DATE,
                      payload: date,
                    })
                  }}
                />
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Outstanding Balance"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DOLLAR}
                    placeholder="ex: 445.00"
                    value={card.outstandingBalance}
                    onChange={(event) => {
                      dispatchCardAction({
                        type: CardActionType.SET_OUTSTANDING_BALANCE,
                        payload: event.target.value,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Annual Fee"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DOLLAR}
                    placeholder="ex: 200.00"
                    value={card.annualFee}
                    onChange={(event) => {
                      dispatchCardAction({
                        type: CardActionType.SET_ANNUAL_FEE,
                        payload: event.target.value,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Annual Fee Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.annualFeeDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_ANNUAL_FEE_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Application Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.applicationDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_APPLICATION_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Approval Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.approvalDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_APPROVAL_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Last Charge Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.lastChargeDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_LAST_CHARGE_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
              </ModalBody>
              <ActionPanel>
                <ExpandButton
                  onClick={() => {
                    // TODO probably clear all values here, and make it so inputs can't be tabbed to
                    setIsExpanded((old) => !old)
                  }}
                  isExpanded={isExpanded}
                />
                <Button onClick={closeAndClearModal}>CANCEL</Button>
                <Button
                  {...createCardButtonProps}
                  ref={closeButtonRef}
                  disabled={!isCompleteInformation}
                  variant="PRIMARY"
                >
                  CREATE CARD
                </Button>
              </ActionPanel>
            </>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}

const ActionPanel = styled.div`
  display: flex;
  background: ${({ theme }) => theme.color.gray1};
  padding: ${({ theme }) => theme.space5} ${({ theme }) => theme.space4}
    ${({ theme }) => theme.space3};
  border-top: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 0 0 6px 6px;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space2};

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: ${({ theme }) => theme.space3};
  }
`

export const useCardReducer = () => {
  return useReducer(cardReducer, emptyCard)
}

// TODO think of good way to dedupe these modals
export function EditCardModal({
  state,
  cardReducerResult,
  cardId,
}: {
  state: OverlayTriggerState
  cardReducerResult: [CardRepresentation, React.Dispatch<CardAction>]
  cardId: number | null
}) {
  const [card, dispatchCardAction] = cardReducerResult
  const [isExpanded, setIsExpanded] = useState(false)

  const saveButtonRef = useRef<HTMLButtonElement>(null)

  const closeAndClearModal = () => {
    state.close()
    dispatchCardAction({ type: CardActionType.CLEAR })
  }

  const isCompleteInformation = isValidCard(card)

  const queryClient = useQueryClient()

  const updateCardData = (card: Card) => {
    queryClient.setQueryData<Cards>('cards', (oldData) => {
      if (oldData === undefined) {
        return [card]
      } else {
        return oldData.map((oldCard) => {
          if (oldCard.id === card.id) {
            return card
          } else {
            return oldCard
          }
        })
      }
    })
  }

  const { buttonProps: updateCardButtonProps } = useButton(
    {
      onPress: () => {
        if (isCompleteInformation && cardId !== null) {
          const {
            name,
            limit,
            totalSpend,
            minimumSpendingRequirement,
            signupBonusDate,
            outstandingBalance,
            annualFee,
            annualFeeDate,
            applicationDate,
            approvalDate,
            lastChargeDate,
          } = card
          updateCard(
            {
              id: cardId,
              name: name.trim(),
              creditLimit: processMoney(limit),
              totalSpend: processMoney(totalSpend),
              minimumSpendingRequirement: processMoney(
                minimumSpendingRequirement
              ),
              signupBonusDueDate: processDate(signupBonusDate),
              outstandingBalance: processMoney(outstandingBalance),
              annualFee: processMoney(annualFee),

              annualFeeDate: processDate(annualFeeDate),
              applicationDate: processDate(applicationDate),
              approvalDate: processDate(approvalDate),
              lastChargeDate: processDate(lastChargeDate),
            },
            updateCardData
          )
          state.close()
          dispatchCardAction({ type: CardActionType.CLEAR })
        }
      },
    },
    saveButtonRef
  )

  return (
    <>
      {state.isOpen ? (
        <OverlayContainer>
          <ModalDialog
            title="Update card information"
            isOpen={state.isOpen}
            onClose={() => {
              state.close()
              dispatchCardAction({ type: CardActionType.CLEAR })
            }}
            isDismissable={true}
            role="dialog"
          >
            <>
              <ModalBody isExpanded={isExpanded}>
                <ComboBox
                  // TODO figure out a way to make this select the input on click too
                  label="Card Name"
                  allowsCustomValue={true}
                  defaultItems={cards}
                  placeholder="ex: Chase Sapphire Reserve"
                  inputValue={card.name}
                  onInputChange={(value: string) => {
                    dispatchCardAction({
                      type: CardActionType.SET_NAME,
                      payload: value,
                    })
                  }}
                >
                  {(item: any) => <Item>{item.name}</Item>}
                </ComboBox>
                <Input
                  label="Card Limit"
                  type={InputTypes.DOLLAR}
                  placeholder="ex: 3000.00"
                  value={card.limit}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_LIMIT,
                      payload: event.target.value,
                    })
                  }}
                />
                <Input
                  label="Total Spend"
                  type={InputTypes.DOLLAR}
                  placeholder="ex: 4321.12"
                  value={card.totalSpend}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_TOTAL_SPEND,
                      payload: event.target.value,
                    })
                  }}
                />
                <Input
                  label="Minimum Spending Requirement"
                  type={InputTypes.DOLLAR}
                  placeholder="ex: 8000.00"
                  value={card.minimumSpendingRequirement}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT,
                      payload: event.target.value,
                    })
                  }}
                />
                <Input
                  label="Signup Bonus Due Date"
                  type={InputTypes.DATE}
                  placeholder="mm/dd/yyyy"
                  value={card.signupBonusDate}
                  onChange={() => {}}
                  setDate={(date: string) => {
                    dispatchCardAction({
                      type: CardActionType.SET_SIGNUP_BONUS_DATE,
                      payload: date,
                    })
                  }}
                />
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Outstanding Balance"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DOLLAR}
                    placeholder="ex: 445.00"
                    value={card.outstandingBalance}
                    onChange={(event) => {
                      dispatchCardAction({
                        type: CardActionType.SET_OUTSTANDING_BALANCE,
                        payload: event.target.value,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Annual Fee"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DOLLAR}
                    placeholder="ex: 200.00"
                    value={card.annualFee}
                    onChange={(event) => {
                      dispatchCardAction({
                        type: CardActionType.SET_ANNUAL_FEE,
                        payload: event.target.value,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Annual Fee Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.annualFeeDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_ANNUAL_FEE_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Application Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.applicationDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_APPLICATION_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Approval Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.approvalDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_APPROVAL_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
                <div style={{ opacity: isExpanded ? '1' : '0' }}>
                  <Input
                    label="Last Charge Date"
                    tabIndex={isExpanded ? undefined : -1}
                    type={InputTypes.DATE}
                    placeholder="mm/dd/yyyy"
                    value={card.lastChargeDate}
                    onChange={() => {}}
                    setDate={(date: string) => {
                      dispatchCardAction({
                        type: CardActionType.SET_LAST_CHARGE_DATE,
                        payload: date,
                      })
                    }}
                  />
                </div>
              </ModalBody>
              <ActionPanel>
                <ExpandButton
                  onClick={() => {
                    // TODO probably clear all values here, and make it so inputs can't be tabbed to
                    setIsExpanded((old) => !old)
                  }}
                  isExpanded={isExpanded}
                />
                <Button onClick={closeAndClearModal}>CANCEL</Button>
                <Button
                  {...updateCardButtonProps}
                  ref={saveButtonRef}
                  disabled={!isCompleteInformation}
                  variant="PRIMARY"
                >
                  SAVE CHANGES
                </Button>
              </ActionPanel>
            </>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}

const ExpandButton = ({
  onClick,
  isExpanded,
}: {
  onClick: () => void
  isExpanded: boolean
}) => {
  return (
    <MoreButton onClick={onClick}>
      {isExpanded ? 'less' : 'more'}
      {isExpanded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      )}
    </MoreButton>
  )
}
