import React, { useReducer, useRef } from 'react'
import styled from 'styled-components'
import type { OverlayTriggerState } from '@react-stately/overlays'
import { Button, Text } from './index'
import { InputTypes, Input } from './Input'
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
import { useQueryClient } from 'react-query'
import { api } from '../utils'

// TODO use react query w/ mutations for this...probably? And will need to invalidate RQ cards cache
const updateCard = async (
  cardData: {
    id: number
    name?: string
    creditLimit?: number
    totalSpend?: number
    minimumSpendingRequirement?: number
    signupBonusDueDate?: string
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
  } = result

  updateCardData({
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
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
  } = await result
  addNewCard({
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
  })
}

const ModalTitleWrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.space4};
  background: ${({ theme }) => theme.color.gray1};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 6px 6px 0 0;
`

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.space4};
  display: grid;
  width: ${({ theme }) => theme.space(150)};
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${({ theme }) => theme.space5};
  grid-row-gap: ${({ theme }) => theme.space4};

  > div:first-child {
    grid-column-start: span 2;
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
        alignItems: 'center',
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
          }}
        >
          <ModalTitleWrapper>
            <Text {...titleProps} size={4}>
              {title}
            </Text>
          </ModalTitleWrapper>

          {children}
        </div>
      </FocusScope>
    </div>
  )
}

export type CardRepresentation = {
  name: string
  limit: string
  totalSpend: string
  minimumSpendingRequirement: string
  signupBonusDate: string
}

const emptyCard: CardRepresentation = {
  name: '',
  limit: '',
  totalSpend: '',
  minimumSpendingRequirement: '',
  signupBonusDate: '',
}

const isValidCard = (card: CardRepresentation) => {
  return Object.values(card).every((value) => value !== '')
}

export enum CardActionType {
  SET_NAME = 'UPDATE_NAME',
  SET_LIMIT = 'UPDATE_LIMIT',
  SET_TOTAL_SPEND = 'UPDATE_TOTAL_SPEND',
  SET_MINIMUM_SPENDING_REQUIREMENT = 'SET_MINIMUM_SPENDING_REQUIREMENT',
  SET_SIGNUP_BONUS_DATE = 'SET_SIGNUP_BONUS_DATE',
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

export function Modal({ state }: { state: OverlayTriggerState }) {
  const [card, dispatchCardAction] = useReducer(cardReducer, emptyCard)

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const closeAndClearModal = () => {
    state.close()
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

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => {
        if (isCompleteInformation) {
          const {
            name,
            limit,
            totalSpend,
            minimumSpendingRequirement,
            signupBonusDate,
          } = card
          addCard(
            {
              cardName: name.trim(),
              creditLimit: limit.trim() ? Number(limit.trim()) : undefined,
              totalSpend: totalSpend.trim()
                ? Number(totalSpend.trim())
                : undefined,
              minimumSpendingRequirement: minimumSpendingRequirement.trim()
                ? Number(minimumSpendingRequirement.trim())
                : undefined,
              signupBonusDueDate: signupBonusDate.trim()
                ? formatISO(new Date(signupBonusDate))
                : undefined,
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
              <ModalBody>
                <Input
                  label="Card Name"
                  placeholder="ex: Chase Sapphire Reserve"
                  value={card.name}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_NAME,
                      payload: event.target.value,
                    })
                  }}
                />
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
                  /* onChange={(event) => { */
                  /*   dispatchCardAction({ */
                  /*     type: CardActionType.SET_SIGNUP_BONUS_DATE, */
                  /*     payload: event.target.value, */
                  /*   }) */
                  /* }} */
                />
              </ModalBody>
              <ActionPanel>
                <Button onClick={closeAndClearModal}>CANCEL</Button>
                <Button
                  {...closeButtonProps}
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
  padding: ${({ theme }) => theme.space3} ${({ theme }) => theme.space4};
  border-top: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 0 0 6px 6px;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space2};
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

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => {
        if (isCompleteInformation && cardId !== null) {
          const {
            name,
            limit,
            totalSpend,
            minimumSpendingRequirement,
            signupBonusDate,
          } = card
          updateCard(
            {
              id: cardId,
              name: name.trim() ?? undefined,
              creditLimit: limit.trim() ? Number(limit.trim()) : undefined,
              totalSpend: totalSpend.trim()
                ? Number(totalSpend.trim())
                : undefined,
              minimumSpendingRequirement: minimumSpendingRequirement.trim()
                ? Number(minimumSpendingRequirement.trim())
                : undefined,
              signupBonusDueDate: signupBonusDate.trim()
                ? formatISO(new Date(signupBonusDate))
                : undefined,
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
              <ModalBody>
                <Input
                  label="Card Name"
                  placeholder="ex: Chase Sapphire Reserve"
                  value={card.name}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_NAME,
                      payload: event.target.value,
                    })
                  }}
                />
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
                  // onChange={(event) => {
                  //   dispatchCardAction({
                  //     type: CardActionType.SET_SIGNUP_BONUS_DATE,
                  //     payload: event.target.value,
                  //   })
                  // }}
                />
              </ModalBody>
              <ActionPanel>
                <Button onClick={closeAndClearModal}>CANCEL</Button>
                <Button
                  {...closeButtonProps}
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
