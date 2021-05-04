import React, { useReducer, useRef } from 'react'
import type { OverlayTriggerState } from '@react-stately/overlays'
import { Button } from './index'
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
  const result = await window.fetch(`http://localhost:3000/card`, {
    method: 'PATCH',
    headers: {
      /* 'Access-Control-Allow-Origin': '*', */
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(cardData),
  })
  const {
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
  } = await result.json()
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
  const result = await window.fetch(`http://localhost:3000/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(cardData),
  })
  const {
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
  } = await result.json()
  addNewCard({
    id,
    name,
    creditLimit,
    minimumSpendingRequirement,
    totalSpend,
    signupBonusDueDate,
  })
}

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
            background: 'white',
            color: 'black',
            padding: 30,
            borderRadius: '8px',
          }}
        >
          <h3 {...titleProps} style={{ marginTop: 0 }}>
            {title}
          </h3>
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
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                Card Name:
                <input
                  placeholder="ex: Chase Sapphire Reserve"
                  value={card.name}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_NAME,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Card Limit:
                <input
                  placeholder="ex: 3000.00"
                  value={card.limit}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_LIMIT,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Total Spend:
                <input
                  placeholder="ex: 4321.12"
                  value={card.totalSpend}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_TOTAL_SPEND,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Minimum Spending Requirement:
                <input
                  placeholder="ex: 8000.00"
                  value={card.minimumSpendingRequirement}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Signup Bonus Due Date:
                <input
                  placeholder="yyyy-mm-dd"
                  value={card.signupBonusDate}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_SIGNUP_BONUS_DATE,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <Button
                {...closeButtonProps}
                ref={closeButtonRef}
                disabled={!isCompleteInformation}
              >
                Create card
              </Button>
            </form>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}

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

  const closeButtonRef = useRef<HTMLButtonElement>(null)

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
    closeButtonRef
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
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <label>
                Card Name:
                <input
                  placeholder="ex: Chase Sapphire Reserve"
                  value={card.name}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_NAME,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Card Limit:
                <input
                  placeholder="ex: 3000.00"
                  value={card.limit}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_LIMIT,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Total Spend:
                <input
                  placeholder="ex: 4321.12"
                  value={card.totalSpend}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_TOTAL_SPEND,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Minimum Spending Requirement:
                <input
                  placeholder="ex: 8000.00"
                  value={card.minimumSpendingRequirement}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_MINIMUM_SPENDING_REQUIREMENT,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <label>
                Signup Bonus Due Date:
                <input
                  placeholder="yyyy-mm-dd"
                  value={card.signupBonusDate}
                  onChange={(event) => {
                    dispatchCardAction({
                      type: CardActionType.SET_SIGNUP_BONUS_DATE,
                      payload: event.target.value,
                    })
                  }}
                />
              </label>
              <Button
                {...closeButtonProps}
                ref={closeButtonRef}
                disabled={!isCompleteInformation}
              >
                Save changes
              </Button>
            </form>
          </ModalDialog>
        </OverlayContainer>
      ) : null}
    </>
  )
}
